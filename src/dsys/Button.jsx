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

// Tamaños responsive (mobile/tablet = small, desktop = size especificado)
const SIZE_CLASSES_RESPONSIVE = {
  small: {
    default: 'text-base py-[6px] h-[36px]',
    icon: 'text-base px-2 h-[40px]',
  },
  large: {
    default: 'text-base py-[6px] h-[36px] lg:text-lg lg:py-[10px] lg:h-[48px]',
    icon: 'text-base px-2 h-[40px] lg:text-lg lg:p-3 lg:h-[52px]',
  },
};

// Variantes de estilo por tipo y color
const VARIANT_STYLES = {
  default: {
    primary: {
      active:
        'bg-brand-primary focus:bg-bg-alt-secondary text-white hover:bg-bg-alt-secondary active:bg-action-pressed focus:ring-border-primary focus:ring-opacity-100',
      disabled:
        'bg-border-secondary text-text-lighter cursor-not-allowed pointer-events-none',
    },
    secondary: {
      active:
        'border-2 border-brand-primary text-brand-primary hover:border-bg-alt-secondary hover:text-bg-alt-secondary active:border-action-pressed active:text-action-pressed focus:border-bg-alt-secondary focus:text-bg-alt-secondary focus:border-transparent focus:ring-brand-primary focus:ring-opacity-100',
      disabled:
        'border-2 border-border-secondary text-text-lighter cursor-not-allowed pointer-events-none',
    },
    tertiary: {
      active:
        'text-brand-primary hover:text-bg-alt-secondary active:text-action-pressed focus:border-bg-alt-secondary focus:text-bg-alt-secondary focus:border-transparent focus:ring-border-primary focus:ring-opacity-100',
      disabled: 'text-text-lighter cursor-not-allowed pointer-events-none',
    },
  },
  alt: {
    primary: {
      active:
        'bg-action-alt-default text-text-default hover:bg-action-alt-hover active:bg-action-alt-pressed focus:bg-action-alt-default focus:ring-icon-lighter focus:ring-opacity-100',
      disabled:
        'bg-border-lighter text-text-lighter cursor-not-allowed pointer-events-none',
    },
    secondary: {
      active:
        'bg-transparent border-2 border-white text-white hover:bg-white hover:bg-opacity-10 active:bg-white active:bg-opacity-20 focus:bg-transparent focus:ring-white focus:ring-opacity-50',
      disabled:
        'bg-transparent border-2 border-border-secondary text-text-lighter cursor-not-allowed pointer-events-none',
    },
    tertiary: {
      active:
        'bg-transparent text-action-alt-default hover:text-action-alt-hover active:text-action-alt-pressed focus:border-transparent focus:text-action-alt-default focus:ring-icon-lighter focus:ring-opacity-100',
      disabled: 'bg-transparent text-text-lighter cursor-not-allowed pointer-events-none',
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
  responsive = false,
  iconSize, // eslint-disable-line no-unused-vars -- Extraído para evitar pasarlo al DOM
  ...props
}) => {
  // Obtener clases de tamaño basado en modo y responsive
  const sizeClass = responsive
    ? SIZE_CLASSES_RESPONSIVE[size]?.[mode] || SIZE_CLASSES_RESPONSIVE.large.default
    : SIZE_CLASSES[size]?.[mode] || SIZE_CLASSES.large.default;

  // Obtener estilos de variante basado en estado
  const variantStyle = VARIANT_STYLES[variant]?.[color]?.[disabled ? 'disabled' : 'active'] || '';

  // Construir clases del botón
  const buttonClasses = classNames(
    BASE_CLASSES,
    sizeClass,
    variantStyle,
    {
      // Padding solo para modo default (responsive si aplica)
      'px-4': padding && mode === 'default' && !responsive,
      'px-2 lg:px-4': padding && mode === 'default' && responsive,

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
