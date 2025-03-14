import React, { ReactNode } from 'react';
import { useLayout } from '@/contexts/LayoutContext';
import { useRtlUtils } from '@/utils/rtl';

interface RtlWrapperProps {
  children: ReactNode;
  className?: string;
  flipContents?: boolean;
  preserveSpacing?: boolean;
}

/**
 * A wrapper component that handles RTL styling automatically
 * 
 * @param children - The content to wrap
 * @param className - Additional CSS classes to apply
 * @param flipContents - Whether to flip the content order in RTL mode
 * @param preserveSpacing - Whether to preserve spacing classes (like space-x-*) in RTL mode
 */
export const RtlWrapper: React.FC<RtlWrapperProps> = ({
  children,
  className = '',
  flipContents = false,
  preserveSpacing = false,
}) => {
  const { isRTL } = useLayout();
  const { cx } = useRtlUtils();
  
  // Apply RTL-specific classes
  const wrapperClasses = cx(
    `rtl-wrapper ${className}`,
    '',
    flipContents ? 'flex-row-reverse' : ''
  );
  
  // Apply special handling for space-* classes if preserveSpacing is true
  const rtlClasses = isRTL && preserveSpacing 
    ? wrapperClasses.replace(/space-x-(\d+)/g, 'space-x-reverse space-x-$1') 
    : wrapperClasses;
  
  return (
    <div className={rtlClasses} data-rtl={isRTL}>
      {children}
    </div>
  );
};

/**
 * A specialized wrapper for text content that handles RTL text alignment
 */
export const RtlTextWrapper: React.FC<RtlWrapperProps> = ({
  children,
  className = '',
  flipContents = false,
  preserveSpacing = false,
}) => {
  const { isRTL } = useLayout();
  const { cx } = useRtlUtils();
  
  // Apply RTL-specific classes including text alignment
  const wrapperClasses = cx(
    `rtl-text-wrapper ${className}`,
    'text-left',
    flipContents ? 'flex-row-reverse text-right' : 'text-right'
  );
  
  // Apply special handling for space-* classes if preserveSpacing is true
  const rtlClasses = isRTL && preserveSpacing 
    ? wrapperClasses.replace(/space-x-(\d+)/g, 'space-x-reverse space-x-$1') 
    : wrapperClasses;
  
  return (
    <div className={rtlClasses} data-rtl={isRTL}>
      {children}
    </div>
  );
};

/**
 * A wrapper for form elements that handles RTL layout
 */
export const RtlFormWrapper: React.FC<RtlWrapperProps> = ({
  children,
  className = '',
  flipContents = false,
  preserveSpacing = false,
}) => {
  const { isRTL } = useLayout();
  const { cx } = useRtlUtils();
  
  // Apply RTL-specific classes for form layouts
  const wrapperClasses = cx(
    `rtl-form-wrapper ${className}`,
    '',
    flipContents ? 'flex-row-reverse [&>label]:text-right' : ''
  );
  
  // Apply special handling for space-* classes if preserveSpacing is true
  const rtlClasses = isRTL && preserveSpacing 
    ? wrapperClasses.replace(/space-x-(\d+)/g, 'space-x-reverse space-x-$1') 
    : wrapperClasses;
  
  return (
    <div className={rtlClasses} data-rtl={isRTL}>
      {children}
    </div>
  );
};

export default RtlWrapper; 
