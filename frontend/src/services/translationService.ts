/**
 * Translation service for managing multilingual content
 */

import { LocalizedString } from '@/types/product';
import { useTranslation } from 'next-i18next';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

/**
 * Interface for translation entry
 */
export interface TranslationEntry {
  id: string;
  namespace: string;
  key: string;
  translations: LocalizedString;
  lastUpdated: string;
}

/**
 * Get translated content with fallback
 * @param content - The localized content object
 * @param locale - The target locale
 * @param fallbackLocale - The fallback locale if target locale is not available
 * @returns The translated content or undefined if not available
 */
export function getLocalizedContent(
  content: LocalizedString | undefined,
  locale: string,
  fallbackLocale: string = 'en'
): string | undefined {
  // Handle undefined or null content
  if (!content) return '';
  
  // If exact locale match exists, return it
  if (content[locale]) return content[locale];
  
  // Try language-only match (e.g., 'en' for 'en-US')
  const langCode = locale?.split('-')?.[0] || '';
  if (langCode) {
    const langMatch = Object.keys(content).find(key => key.startsWith(langCode));
    if (langMatch && content[langMatch]) return content[langMatch];
  }
  
  // Fall back to default locale
  if (content[fallbackLocale]) return content[fallbackLocale];
  
  // Last resort: return any available translation
  const firstAvailable = Object.values(content)[0];
  return firstAvailable || '';
}

/**
 * Custom hook for localized content
 * @returns Helper functions for working with localized content
 */
export function useLocalizedContent() {
  const { i18n } = useTranslation();
  
  const getContent = (
    content: LocalizedString | undefined,
    fallbackLocale: string = 'en'
  ): string | undefined => {
    return getLocalizedContent(content, i18n.language, fallbackLocale);
  };
  
  return {
    getContent,
    currentLocale: i18n.language,
  };
}

/**
 * Get translations for a namespace
 */
export async function getTranslations(
  namespace: string,
  locale: string
): Promise<Record<string, string>> {
  try {
    const params = new URLSearchParams();
    params.append('namespace', namespace);
    params.append('locale', locale);
    
    const response = await fetch(`${API_BASE_URL}/translations?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching translations: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch translations for namespace ${namespace}:`, error);
    throw error;
  }
}

/**
 * Create new translation
 */
export async function createTranslation(
  namespace: string,
  key: string,
  translations: LocalizedString
): Promise<TranslationEntry> {
  try {
    const response = await fetch(`${API_BASE_URL}/translations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        namespace,
        key,
        translations,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Error creating translation: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to create translation:', error);
    throw error;
  }
}

/**
 * Update existing translation
 */
export async function updateTranslation(
  id: string,
  translations: LocalizedString
): Promise<TranslationEntry> {
  try {
    const response = await fetch(`${API_BASE_URL}/translations/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        translations,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Error updating translation: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to update translation with ID ${id}:`, error);
    throw error;
  }
}

/**
 * Delete translation
 */
export async function deleteTranslation(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/translations/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Error deleting translation: ${response.statusText}`);
    }
  } catch (error) {
    console.error(`Failed to delete translation with ID ${id}:`, error);
    throw error;
  }
}

/**
 * Synchronize translations from source locale to target locale
 */
export async function synchronizeTranslations(
  sourceLocale: string,
  targetLocale: string,
  namespace?: string,
  overwriteExisting: boolean = false
): Promise<{ total: number; updated: number; created: number }> {
  try {
    const params = new URLSearchParams();
    params.append('sourceLocale', sourceLocale);
    params.append('targetLocale', targetLocale);
    
    if (namespace) {
      params.append('namespace', namespace);
    }
    
    params.append('overwriteExisting', overwriteExisting.toString());
    
    const response = await fetch(`${API_BASE_URL}/translations/synchronize?${params.toString()}`, {
      method: 'POST',
    });
    
    if (!response.ok) {
      throw new Error(`Error synchronizing translations: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to synchronize translations:', error);
    throw error;
  }
}

/**
 * Export translations to JSON file
 */
export async function exportTranslations(
  locale: string,
  namespace?: string
): Promise<string> {
  try {
    const params = new URLSearchParams();
    params.append('locale', locale);
    
    if (namespace) {
      params.append('namespace', namespace);
    }
    
    const response = await fetch(`${API_BASE_URL}/translations/export?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Error exporting translations: ${response.statusText}`);
    }
    
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error(`Failed to export translations for locale ${locale}:`, error);
    throw error;
  }
}

/**
 * Import translations from JSON file
 */
export async function importTranslations(
  file: File,
  overwriteExisting: boolean = false
): Promise<{ total: number; imported: number; updated: number; errors: number }> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('overwriteExisting', overwriteExisting.toString());
    
    const response = await fetch(`${API_BASE_URL}/translations/import`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`Error importing translations: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to import translations:', error);
    throw error;
  }
} 
