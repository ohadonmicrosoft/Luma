# Contribution Guidelines for Luma E-commerce Platform

Thank you for your interest in contributing to the Luma e-commerce platform! This document provides guidelines and standards for contributing to the project.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Coding Standards](#coding-standards)
5. [Pull Request Process](#pull-request-process)
6. [Component Development Guidelines](#component-development-guidelines)
7. [Testing Guidelines](#testing-guidelines)
8. [Documentation Guidelines](#documentation-guidelines)

## Code of Conduct

We are committed to providing a welcoming and inclusive experience for everyone. Please read and follow our Code of Conduct to help us maintain a positive community.

- Respect all team members and contributors
- Use inclusive language
- Be patient and understanding when providing feedback
- Focus on the best interests of the project
- Accept constructive feedback gracefully

## Getting Started

### Prerequisites

- Node.js v18+
- npm v9+
- Basic knowledge of React, TypeScript, and Tailwind CSS

### Setting Up the Project

1. Fork the repository
2. Clone your fork locally
3. Install dependencies:

```bash
cd frontend
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Start Storybook (for component development):

```bash
npm run storybook
```

## Development Workflow

1. **Pick an Issue**: Start by selecting an open issue to work on, or create a new issue if you've found a bug or want to suggest a feature.

2. **Create a Branch**: Create a new branch for your changes:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-description
```

3. **Implement Changes**: Make your changes following the coding standards described below.

4. **Test Your Changes**: Ensure your changes are properly tested.

5. **Create Pull Request**: Submit a pull request with a clear description.

## Coding Standards

### General Guidelines

- Use TypeScript for all new code
- Follow the established component architecture
- Use functional components with hooks
- Keep components focused on a single responsibility
- Document your code with comments for complex logic
- Follow the DRY (Don't Repeat Yourself) principle

### TypeScript Standards

- Use explicit type annotations for function parameters
- Create interfaces for component props
- Avoid using `any` type
- Use enums for predefined sets of values
- Use type guards when narrowing types

Example:

```tsx
// Good
interface ButtonProps {
  variant: "primary" | "secondary" | "tertiary";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  children: React.ReactNode;
}

// Bad
interface ButtonProps {
  variant: any;
  size: any;
  onClick: any;
  children: any;
}
```

### Component Standards

- Create one component per file
- Export the component as the default export
- Include a JSDoc comment at the top of the component
- Organize props in a logical order
- Destructure props in the function signature
- Use meaningful prop and variable names

Example:

```tsx
/**
 * Button Component
 *
 * A customizable button component with various styles and sizes.
 */
export interface ButtonProps {
  // Props definition...
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  ...props
}) => {
  // Component implementation...
};

export default Button;
```

### CSS Standards (with Tailwind)

- Use the `cn` utility for conditional classes
- Follow mobile-first approach for responsive design
- Group related classes together
- Use semantic class names when creating custom classes
- Prefer Tailwind classes over custom CSS

Example:

```tsx
<button
  className={cn(
    "px-4 py-2 rounded-md font-medium transition-colors",
    "focus:outline-none focus:ring-2 focus:ring-primary-500",
    variant === "primary" && "bg-primary-600 text-white hover:bg-primary-700",
    variant === "secondary" &&
      "bg-white text-primary-600 border border-primary-600",
    disabled && "opacity-50 cursor-not-allowed"
  )}
>
  {children}
</button>
```

## Pull Request Process

1. **Create a Pull Request**: Submit your changes through a pull request to the main repository.

2. **PR Description**: Include a clear description of the changes, reference related issues, and provide any necessary context.

3. **Code Review**: Wait for code review from maintainers. Be responsive to feedback and make requested changes.

4. **CI/CD Checks**: Ensure that all automated checks pass before requesting a review.

5. **Approval and Merge**: Once approved, your PR will be merged by a maintainer.

### PR Title Format

Follow this format for PR titles:

- `feat: Add new feature`
- `fix: Resolve issue with component`
- `docs: Update documentation`
- `style: Improve component styling`
- `refactor: Restructure code without behavior changes`
- `test: Add or update tests`
- `chore: Update build process or tools`

## Component Development Guidelines

When developing new components or enhancing existing ones:

1. **Start with Storybook**: Design and test your component in isolation using Storybook.

2. **Component Structure**:

   - Clear props interface with JSDoc comments
   - Sensible defaults for optional props
   - Logical internal structure

3. **Accessibility**:

   - Ensure keyboard navigation
   - Add appropriate ARIA attributes
   - Test with screen readers if possible
   - Maintain proper color contrast

4. **RTL Support**:

   - Use the DirectionContext
   - Implement RTL-specific styling where needed
   - Test in both LTR and RTL modes

5. **Responsiveness**:
   - Mobile-first approach
   - Test at all breakpoints
   - Consider touch interfaces

## Testing Guidelines

### Types of Tests

- **Storybook Visual Testing**: Develop stories for all component variants and states.

- **Unit Tests**: Write unit tests for utility functions and complex component logic.

- **Integration Tests**: Test component interactions where necessary.

- **Accessibility Tests**: Run a11y checks on components.

### Testing Standards

- Write tests that focus on component behavior, not implementation details
- Test edge cases and error states
- Keep tests simple and focused
- Use meaningful test descriptions
- Avoid test interdependence

## Documentation Guidelines

### Component Documentation

For every component, provide:

1. **Overview**: Brief description of what the component does and when to use it.

2. **Props**: Document all props with types and descriptions.

3. **Examples**: Provide usage examples for common scenarios.

4. **Accessibility**: Document any accessibility considerations.

5. **RTL Support**: Document any RTL-specific behavior.

### Code Comments

- Use JSDoc comments for functions and components
- Add inline comments for complex logic
- Avoid redundant comments that simply repeat the code

### Example of Good Documentation

```tsx
/**
 * TextField Component
 *
 * A form control that allows users to input text with validation support.
 *
 * @example
 * <TextField
 *   label="Email"
 *   placeholder="Enter your email"
 *   type="email"
 *   required
 *   error="Please enter a valid email"
 * />
 */
export interface TextFieldProps {
  /**
   * The label displayed above the input
   */
  label: string;

  /**
   * The input type (text, email, password, etc.)
   * @default "text"
   */
  type?: string;

  /**
   * Error message to display when validation fails
   */
  error?: string;

  // ... other props
}
```

## Conclusion

Thank you for contributing to the Luma e-commerce platform! By following these guidelines, you help maintain a high-quality, consistent codebase. If you have any questions, please don't hesitate to reach out to the project maintainers.
