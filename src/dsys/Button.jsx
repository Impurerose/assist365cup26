/**
 * Button Component
 *
 * A flexible button component that supports various styles, sizes, and layouts.
 * Adapted from @a365/ui-core for standalone use.
 *
 * @example
 * // With icon from @phosphor-icons/react
 * import { ArrowRight } from '@phosphor-icons/react';
 * import Button from './components/Button';
 *
 * <Button icon={<ArrowRight size={20} weight="bold" />} iconPosition="right">
 *   Continue
 * </Button>
 */

import React from 'react';
import classNames from 'classnames';

// ============================================
// CONSTANTES DE ESTILO
// ============================================

// Clases base comunes
const BASE_CLASSES =
  'whitespace-nowrap overflow-hidden text-ellipsis font-semibold rounded-xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-offset-0';

// Tamaños
const SIZE_CLASSES = {
  small: {
    default: 'text-base py-[6px] h-[36px]',
    icon: 'text-base px-2 h-[40px]',
  },
  large: {
    default: 'text-lg py-[10px] h-[48px]',
    icon: 'text-lg p-3 h-[52px]',
  },
};

// Variantes de estilo por tipo y color
const VARIANT_STYLES = {
  default: {
    primary: {
      active:
        'bg-[#006FE8] focus:bg-[#0059BA] text-white hover:bg-[#0059BA] active:bg-[#004A9C] focus:ring-[#C2DFFF] focus:ring-opacity-100',
      disabled:
        'bg-[#C8C9CB] text-[#70777C] cursor-not-allowed pointer-events-none',
    },
    secondary: {
      active:
        'bg-white border-2 border-[#006FE8] text-[#006FE8] hover:border-[#0059BA] hover:text-[#0059BA] active:border-[#004A9C] active:text-[#004A9C] focus:border-[#0059BA] focus:text-[#0059BA] focus:border-transparent focus:ring-[#006FE8] focus:ring-opacity-100',
      disabled:
        'bg-white border-2 border-[#C8C9CB] text-[#70777C] cursor-not-allowed pointer-events-none',
    },
    tertiary: {
      active:
        'text-[#006FE8] hover:text-[#0059BA] active:text-[#004A9C] focus:border-[#0059BA] focus:text-[#0059BA] focus:border-transparent focus:ring-[#C2DFFF] focus:ring-opacity-100',
      disabled: 'text-[#70777C] cursor-not-allowed pointer-events-none',
    },
  },
  alt: {
    primary: {
      active:
        'bg-[#BDEDE7] text-[#31363A] hover:bg-[#A8E5DD] active:bg-[#93DDD3] focus:bg-[#BDEDE7] focus:ring-[#7BD0C2] focus:ring-opacity-100',
      disabled:
        'bg-[#E0E0E0] text-[#70777C] cursor-not-allowed pointer-events-none',
    },
    secondary: {
      active:
        'bg-transparent border-2 border-white text-white hover:bg-white hover:bg-opacity-10 active:bg-white active:bg-opacity-20 focus:bg-transparent focus:ring-white focus:ring-opacity-50',
      disabled:
        'bg-transparent border-2 border-[#C8C9CB] text-[#70777C] cursor-not-allowed pointer-events-none',
    },
    tertiary: {
      active:
        'bg-transparent text-[#BDEDE7] hover:text-[#A8E5DD] active:text-[#93DDD3] focus:border-transparent focus:text-[#BDEDE7] focus:ring-[#7BD0C2] focus:ring-opacity-100',
      disabled: 'bg-transparent text-[#70777C] cursor-not-allowed pointer-events-none',
    },
  },
};

// Layout y alineación
const LAYOUT_CLASSES = {
  flex: 'flex items-center',
  align: {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
    between: 'justify-between',
  },
};

// ============================================
// COMPONENTE
// ============================================

const Button = ({
  children,
  disabled = false,
  variant = 'default',
  color = 'primary',
  size = 'large',
  fullWidth = false,
  icon = null,
  iconPosition = 'right',
  iconClass = '',
  classes = null,
  padding = true,
  cleanButton = false,
  mode = 'default',
  align = 'center',
  trackClass = '',
  iconSize, // eslint-disable-line no-unused-vars -- Extraído para evitar pasarlo al DOM
  ...props
}) => {
  // Obtener clases de tamaño basado en modo
  const sizeClass = SIZE_CLASSES[size]?.[mode] || SIZE_CLASSES.large.default;

  // Obtener estilos de variante basado en estado
  const variantStyle = VARIANT_STYLES[variant]?.[color]?.[disabled ? 'disabled' : 'active'] || '';

  // Construir clases del botón
  const buttonClasses = classNames(
    BASE_CLASSES,
    sizeClass,
    variantStyle,
    {
      // Padding solo para modo default
      'px-4': padding && mode === 'default',

      // Width
      'w-full max-w-full': fullWidth,
      'w-full lg:w-fit': !fullWidth,

      // Layout
      [LAYOUT_CLASSES.flex]: !cleanButton,
      [LAYOUT_CLASSES.align[align]]: !cleanButton && align,
      // Use gap when an icon is present for consistent spacing
      'gap-2': !cleanButton && icon,
    },
    trackClass,
  );

  // Render icon con spacing
  const renderIcon = () => {
    if (!icon) return null;

    // Rely on container gap for spacing; ensure the icon doesn't shrink
    return React.cloneElement(icon, {
      className: classNames(icon.props?.className, iconClass, 'flex-shrink-0'),
    });
  };

  return (
    <div className={`${classes || ''} ${fullWidth ? 'w-full' : ''}`}>
      <button type="button" className={buttonClasses} disabled={disabled} {...props}>
        {cleanButton ? (
          children
        ) : (
          <>
            {iconPosition === 'left' && renderIcon()}
            {children}
            {iconPosition === 'right' && renderIcon()}
          </>
        )}
      </button>
    </div>
  );
};

export default Button;
