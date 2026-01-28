/**
 * TextField Component
 *
 * Campo de texto básico con estilos visuales del design system.
 * Versión simplificada sin iconos ni validaciones, solo estilos de hover, border, focus, ring.
 *
 * @example
 * import TextField from './dsys/TextField';
 *
 * <TextField
 *   label="Nombre completo"
 *   placeholder="Nombre completo"
 *   fullWidth
 * />
 */

import React from 'react';

export default function TextField({
  label = null,
  placeholder = '',
  fullWidth = false,
  type = 'text',
  inputAlign = 'left',
  className = '',
  ...props
}) {
  // Clases base del input
  const inputClasses = `
    h-[48px]
    text-text-default
    text-base
    py-3
    px-3
    rounded-xl
    border
    border-border-primary
    bg-white
    transition-colors
    duration-300
    ease-in-out
    hover:border-action-hover
    focus:outline-none
    focus:border-brand-primary
    focus:ring-4
    focus:ring-border-primary
    focus:ring-opacity-100
    ${fullWidth ? 'w-full' : ''}
    ${inputAlign === 'center' ? 'text-center' : inputAlign === 'right' ? 'text-right' : 'text-left'}
    ${type === 'number' ? '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className={`${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label className="block text-sm text-text-default mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={inputClasses}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        {...props}
      />
    </div>
  );
}
