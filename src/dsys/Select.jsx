/**
 * Select Component
 *
 * A customizable dropdown select component with advanced positioning.
 * Adapted from @a365/ui-core for standalone use.
 *
 * @example
 * import Select from './dsys/Select';
 *
 * <Select
 *   label="Selecciona tu equipo"
 *   placeholder="Elige un equipo"
 *   options={[
 *     { id: 1, name: 'Argentina' },
 *     { id: 2, name: 'Brasil' }
 *   ]}
 *   handleSelectChange={(option) => console.log(option)}
 * />
 */

import { CaretDown } from '@phosphor-icons/react';
import classNames from 'classnames';
import React, { useRef, useState, useEffect } from 'react';

const Select = ({
  label = null,
  placeholder = '',
  fullWidth = false,
  classes = '',
  labelClasses = '',
  options = [],
  value = null,
  disabled = false,
  handleSelectChange = () => {},
  position = 'absolute',
  limit = 0, // 0 = default (4 items), >0 = custom limit
  error = null,
  ...props
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dropPosition, setDropPosition] = useState('below'); // 'below' or 'above'
  const selectRef = useRef(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    handleSelectChange(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen && selectRef.current) {
      const rect = selectRef.current.getBoundingClientRect();
      const itemHeight = 56; // altura aproximada de cada item
      const defaultLimit = 4; // límite por defecto
      const visibleItems = limit > 0 ? limit : defaultLimit;
      const spaceNeeded = Math.min(
        options.length * itemHeight,
        visibleItems * itemHeight
      );
      const spaceBelow = window.innerHeight - rect.bottom;

      if (spaceBelow < spaceNeeded && rect.top > spaceNeeded) {
        setDropPosition('above');
      } else {
        setDropPosition('below');
      }
    }
  }, [isOpen, options.length, limit]);

  useEffect(() => {
    if (value !== null && !selectedOption) {
      const defaultOption = options.find(
        (option) => (option.value ?? option.id) === value
      );
      setSelectedOption(defaultOption);
      handleSelectChange(defaultOption);
    }
  }, [value, options]);

  // Effect para limpiar la selección si la opción seleccionada ya no existe en las opciones disponibles
  useEffect(() => {
    if (selectedOption) {
      const optionStillExists = options.find(
        (option) =>
          (option.value ?? option.id) ===
          (selectedOption.value ?? selectedOption.id)
      );

      if (!optionStillExists) {
        setSelectedOption(null);
        handleSelectChange(null);
      }
    }
  }, [options, selectedOption, handleSelectChange]);

  const style_textfield_label = classNames({
    'text-sm': true,
    'text-[#31363A]': !error,
    'text-[#E0362A]': error,
  });

  const style_custom_select = classNames(
    'relative inline-block w-full rounded-xl text-base font-normal leading-6'
  );

  const style_select_selected = classNames(
    'bg-white border rounded-xl p-3 select-none transition-colors duration-300 flex justify-between items-center',
    {
      'cursor-pointer': !disabled,
      'cursor-not-allowed opacity-60 bg-gray-100': disabled,
      'hover:border-[#338CED]': !isOpen && !disabled,
      'focus:outline-none focus:border-[#C2DFFF]': isOpen && !disabled,
      'text-[#70777C]': !selectedOption,
      'border-[#C2DFFF]': !error,
      'border-[#DF563B]': error,
      'focus:outline-none focus:ring-offset-0 focus:ring-2 focus:ring-[#C2DFFF]':
        !disabled,
    }
  );

  const getMaxHeight = () => {
    const itemHeight = 56; // altura de cada item en px
    const defaultLimit = 4; // límite por defecto
    const visibleItems = limit > 0 ? limit : defaultLimit;
    return `${visibleItems * itemHeight}px`;
  };

  const style_select_items = classNames(
    'bg-white z-50 w-full rounded-xl shadow-lg overflow-y-auto',
    {
      absolute: position === 'absolute',
      relative: position === 'relative',
      'mt-1 top-full': dropPosition === 'below',
      'mb-1 bottom-full': dropPosition === 'above',
    }
  );

  const style_select_item = classNames(
    'p-4 cursor-pointer transition-colors duration-300 flex items-center gap-2',
    {
      'hover:bg-[#F2F2F2]': true,
      'bg-white': true,
    }
  );

  return (
    <>
      {label && (
        <label className={`${style_textfield_label} ${labelClasses}`}>
          {label}
        </label>
      )}
      <div className={`relative pt-1 ${classes}`}>
        <div className={style_custom_select} ref={selectRef}>
          <div
            className={style_select_selected}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            tabIndex={disabled ? -1 : 0}
            aria-disabled={disabled}
          >
            {selectedOption
              ? selectedOption.label ?? selectedOption.name
              : placeholder}

            <div>
              <CaretDown
                size={20}
                color={disabled ? '#9CA3AF' : '#31363A'}
                weight="bold"
              />
            </div>
          </div>
          {isOpen && !disabled && (
            <div
              className={style_select_items}
              style={{ maxHeight: getMaxHeight() }}
            >
              {options.map((option) => (
                <div
                  key={option.value ?? option.id}
                  onClick={() => handleOptionClick(option)}
                  className={classNames(style_select_item, {
                    'bg-[#F2F2F2] text-[#31363A]':
                      (option.value ?? option.id) ===
                      (selectedOption?.value ?? selectedOption?.id),
                  })}
                >
                  {option.label ?? option.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="flex items-center justify-start pl-3 pt-1">
          <span className="text-xs text-[#E0362A]">{error}</span>
        </div>
      )}
    </>
  );
};

export default Select;
