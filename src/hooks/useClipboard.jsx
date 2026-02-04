import { useState } from 'react';

/**
 * Hook para copiar texto al portapapeles
 * 
 * @param {Object} options - Opciones de configuración
 * @param {number} options.timeout - Tiempo en ms para resetear el estado (default: 2000)
 * @returns {Object} - { isCopied, copyToClipboard }
 * 
 * @example
 * const { isCopied, copyToClipboard } = useClipboard();
 * 
 * const handleShare = async () => {
 *   const success = await copyToClipboard(window.location.href);
 *   if (success) {
 *     console.log('URL copiada');
 *   }
 * };
 */
export function useClipboard({ timeout = 2000 } = {}) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async (text) => {
    try {
      // Usar la API moderna de clipboard
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      
      // Resetear el estado después del timeout
      setTimeout(() => {
        setIsCopied(false);
      }, timeout);
      
      console.log('✅ Enlace copiado:', text);
      return true;
    } catch (error) {
      console.error('❌ Error al copiar:', error);
      
      // Fallback para navegadores que no soportan la API
      try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        const success = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (success) {
          setIsCopied(true);
          setTimeout(() => {
            setIsCopied(false);
          }, timeout);
          console.log('✅ Enlace copiado (fallback):', text);
          return true;
        }
      } catch (fallbackError) {
        console.error('❌ Error en fallback:', fallbackError);
      }
      
      setIsCopied(false);
      return false;
    }
  };

  return { isCopied, copyToClipboard };
}
