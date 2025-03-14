#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * Advanced linting helper script
 * This script provides more targeted linting capabilities and fixes
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  // Directories to lint (relative to project root)
  targetDirs: [
    'frontend/src/components',
    'frontend/src/contexts',
    'frontend/src/hooks',
    'frontend/src/lib',
    'frontend/src/pages',
    'frontend/src/services',
    'frontend/src/utils',
  ],
  // File extensions to lint
  extensions: ['.ts', '.tsx', '.js', '.jsx'],
  // Whether to auto-fix issues where possible
  fix: process.argv.includes('--fix'),
  // Whether to only check specific/recent files
  targeted: process.argv.includes('--targeted'),
  // Number of recent files to check if targeted mode
  recentFilesCount: 20,
};

// Helper functions
function runCommand(command) {
  try {
    return execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Error running command: ${command}`);
    if (!process.argv.includes('--continue-on-error')) {
      process.exit(1);
    }
  }
}

function getRecentlyModifiedFiles() {
  // Get recently modified files using git
  try {
    const gitOutput = execSync('git diff --name-only HEAD~10 HEAD', { encoding: 'utf8' });
    return gitOutput.split('\n')
      .filter(file => 
        file && 
        config.extensions.some(ext => file.endsWith(ext)) &&
        config.targetDirs.some(dir => file.startsWith(dir))
      );
  } catch (error) {
    console.warn('Could not get recently modified files from git, falling back to all files');
    return [];
  }
}

function getAllTargetFiles() {
  const allFiles = [];
  
  function walkDir(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        walkDir(filePath);
      } else if (config.extensions.some(ext => file.endsWith(ext))) {
        allFiles.push(filePath);
      }
    }
  }
  
  for (const dir of config.targetDirs) {
    if (fs.existsSync(dir)) {
      walkDir(dir);
    }
  }
  
  return allFiles;
}

// Main execution
console.log('🔍 Starting advanced linting process...');

// Determine which files to lint
let filesToLint = [];

if (config.targeted) {
  console.log('🎯 Running in targeted mode - checking recently modified files');
  filesToLint = getRecentlyModifiedFiles();
  
  if (filesToLint.length === 0) {
    console.log('No recently modified files found, falling back to all files');
    filesToLint = getAllTargetFiles();
  } else {
    console.log(`Found ${filesToLint.length} recently modified files to lint`);
  }
} else {
  // Get all files in target directories
  for (const dir of config.targetDirs) {
    if (fs.existsSync(dir)) {
      console.log(`📁 Adding files from ${dir}`);
      const filesInDir = getAllTargetFiles();
      filesToLint = [...filesToLint, ...filesInDir];
    }
  }
}

if (filesToLint.length === 0) {
  console.log('No files to lint found. Check your configuration.');
  process.exit(0);
}

// Batch files to avoid command line length limits
const batchSize = 20;
const batches = [];

for (let i = 0; i < filesToLint.length; i += batchSize) {
  batches.push(filesToLint.slice(i, i + batchSize));
}

console.log(`🔧 Processing ${filesToLint.length} files in ${batches.length} batches`);

// Process each batch
let fixedIssues = 0;

batches.forEach((batch, index) => {
  console.log(`\n🔄 Processing batch ${index + 1}/${batches.length}`);
  
  const lintCommand = `npx eslint ${batch.join(' ')} ${config.fix ? '--fix' : ''}`;
  
  try {
    execSync(lintCommand, { stdio: 'inherit' });
    console.log(`✅ Batch ${index + 1} completed successfully`);
  } catch (error) {
    if (config.fix) {
      // Count how many issues were fixed
      const output = error.output ? error.output.toString() : '';
      const fixedMatch = output.match(/(\d+) problems? \((\d+) errors?, (\d+) warnings?\)[\s\S]*?(\d+) errors? fixed/);
      
      if (fixedMatch && fixedMatch[4]) {
        fixedIssues += parseInt(fixedMatch[4], 10);
      }
    }
    
    console.log(`⚠️ Batch ${index + 1} completed with errors`);
    
    if (!process.argv.includes('--continue-on-error')) {
      console.error('Stopping due to errors. Use --continue-on-error to ignore errors.');
      process.exit(1);
    }
  }
});

console.log('\n🏁 Linting process complete!');
if (config.fix && fixedIssues > 0) {
  console.log(`🔧 Fixed ${fixedIssues} issues automatically`);
} 
