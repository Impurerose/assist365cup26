/**
 * Chip Component
 *
 * A versatile chip/tag component with multiple variants and states.
 * Adapted from @a365/ui-core for standalone use.
 *
 * @example
 * import Chip from './dsys/Chip';
 *
 * <Chip variant="default" color="primary" state="selected">
 *   Argentina
 * </Chip>
 */

import classNames from 'classnames';
import React from 'react';

const Chip = ({
  children,
  disabled = false,
  variant = 'default',
  color = 'primary',
  size = 'large',
  classes,
  padding = true,
  fullWidth = false,
  state = 'default',
  ...props
}) => {
  // Dynamic classes based on size
  const sizeClasses =
    size === 'small'
      ? 'text-base py-[6px]'
      : 'text-lg py-[10px]';

  const chipClasses = classNames(
    `font-semibold rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-0 ${sizeClasses}`,
    {
      // Padding
      'px-4': padding,
      
      // FullWidth styles
      'w-full': fullWidth,
      'cursor-pointer': !disabled,
      
      // Flex layout
      'inline-flex items-center justify-center': !fullWidth,
      'flex items-center justify-center': fullWidth,

      // Default variant and primary color - default state
      'bg-transparent border-2 border-blue-600 text-gray-500 hover:border-3 hover:border-blue-700 hover:text-gray-500 active:border-blue-800 active:text-blue-800 focus:border-blue-700 focus:text-blue-700 focus:ring-blue-700 focus:ring-opacity-100':
        variant === 'default' && color === 'primary' && !disabled && state === 'default',
        
      // Default variant and primary color - selected state
      'bg-transparent border-2 border-blue-600 text-gray-800 hover:border-3 hover:border-blue-600 hover:text-gray-800 active:border-blue-800 active:text-blue-800 focus:border-blue-700 focus:text-blue-700 focus:ring-blue-700 focus:ring-opacity-100':
        variant === 'default' && color === 'primary' && !disabled && state === 'selected',
      
      // Disabled state
      'bg-transparent border-2 border-gray-300 text-gray-400 cursor-not-allowed pointer-events-none':
        variant === 'default' && color === 'primary' && disabled,

      // Default variant and secondary color - default state
      'bg-white border-2 border-blue-600 text-blue-600 hover:border-3 hover:border-blue-700 hover:text-blue-700 active:border-blue-800 active:text-blue-800 focus:border-blue-700 focus:text-blue-700 focus:ring-blue-700 focus:ring-opacity-100':
        variant === 'default' && color === 'secondary' && !disabled && state === 'default',
        
      // Default variant and secondary color - selected state
      'bg-white border-2 border-blue-600 text-blue-600 hover:border-3 hover:border-blue-600 hover:text-gray-800 active:border-blue-800 active:text-blue-800 focus:border-blue-700 focus:text-blue-700 focus:ring-blue-700 focus:ring-opacity-100':
        variant === 'default' && color === 'secondary' && !disabled && state === 'selected',
        
      'bg-white border-2 border-gray-300 text-gray-400 cursor-not-allowed pointer-events-none':
        variant === 'default' && color === 'secondary' && disabled,

      // Default variant and tertiary color - default state
      'bg-transparent text-blue-600 hover:text-blue-700 active:text-blue-800 focus:text-blue-700 focus:ring-blue-200 focus:ring-opacity-100':
        variant === 'default' && color === 'tertiary' && !disabled && state === 'default',
        
      // Default variant and tertiary color - selected state
      'bg-transparent text-blue-600 hover:text-gray-800 active:text-blue-800 focus:text-blue-700 focus:ring-blue-200 focus:ring-opacity-100':
        variant === 'default' && color === 'tertiary' && !disabled && state === 'selected',
        
      'bg-transparent text-gray-400 cursor-not-allowed pointer-events-none':
        variant === 'default' && color === 'tertiary' && disabled,

      // Alt variant and primary color - default state
      'bg-transparent border-2 border-teal-300 text-teal-300 hover:border-3 hover:border-white hover:text-white active:bg-white active:bg-opacity-10 focus:border-teal-300 focus:ring-teal-400 focus:ring-opacity-100':
        variant === 'alt' && color === 'primary' && !disabled && state === 'default',
        
      // Alt variant and primary color - selected state
      'bg-transparent border-2 border-teal-300 text-teal-300 hover:border-3 hover:border-teal-300 hover:text-teal-300 active:bg-white active:bg-opacity-10 focus:border-teal-300 focus:ring-teal-400 focus:ring-opacity-100':
        variant === 'alt' && color === 'primary' && !disabled && state === 'selected',
        
      'bg-transparent border-2 border-gray-300 text-gray-400 cursor-not-allowed pointer-events-none':
        variant === 'alt' && color === 'primary' && disabled,
    }
  );

  // Style for component wrapper
  const wrapperClasses = classNames({
    'inline-block': !fullWidth,
    'block w-full': fullWidth,
  });

  // Style for children wrapper
  const style_childrenWrapper = classNames({
    'leading-none': true,
  });

  return (
    <div className={classNames(wrapperClasses, classes)}>
      <div
        className={chipClasses}
        {...props}
      >
        <span className={style_childrenWrapper}>{children}</span>
      </div>
    </div>
  );
};

export default Chip;
