# Spinner Component - Guía de Uso

## Descripción

Componente de indicador de progreso circular (indeterminate) basado en Material Design 3. Se utiliza para mostrar estados de carga cuando el progreso no es detectable o no es necesario indicar cuánto tiempo tomará una actividad.

## Ubicación

- **Componente React**: `src/components/Spinner.jsx`
- **Estilos CSS**: `src/index.css` (líneas 255-262)

## Uso en React

### 1. Importar el componente

```jsx
import Spinner from "../components/Spinner";
```

### 2. Estructura requerida

**IMPORTANTE**: El contenedor padre debe tener `position: relative` para que el spinner se posicione correctamente.

```jsx
<div className="relative min-h-[228px]">
  {/* Overlay con spinner centrado */}
  <div className="absolute inset-0 flex items-center justify-center">
    <Spinner />
  </div>
  
  {/* Contenido que se carga */}
  <YourContent />
</div>
```

### 3. Props opcionales

```jsx
<Spinner 
  size={48}           // Tamaño en px (default: 48)
  className="..."     // Clases adicionales
/>
```

## Uso en Vanilla HTML

### Estructura completa

```html
<div class="relative min-h-[228px] bg-bg-primary rounded-3xl p-6">
  <!-- Spinner overlay (centrado absoluto) -->
  <div class="absolute inset-0 flex items-center justify-center">
    <div class="spinner-container" style="width: 48px; height: 48px;">
      <svg 
        viewBox="0 0 48 48" 
        class="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="24"
          cy="24"
          r="20"
          fill="none"
          stroke="#006FE8"
          stroke-width="4"
          stroke-linecap="round"
          stroke-dasharray="94 188"
        />
      </svg>
    </div>
  </div>
  
  <!-- Tu contenido aquí -->
  <p>Contenido que se está cargando...</p>
</div>
```

## Especificaciones técnicas

### CSS (ya incluido en `src/index.css`)

```css
@keyframes spinnerRotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.spinner-container {
  animation: spinnerRotate 1.4s linear infinite;
}
```

### Parámetros del spinner

- **Tamaño**: 48x48px (por defecto)
- **Color**: `#006FE8` (action-default)
- **Grosor del trazo**: 4px
- **Radio del círculo**: 20px
- **Duración de animación**: 1.4s
- **Tipo de animación**: linear infinite
- **Stroke linecap**: round (bordes redondeados)
- **Stroke dasharray**: `94 188` (crea el arco animado)

## Reglas importantes

### ✅ Hacer

- Siempre usar `position: relative` en el contenedor padre
- Usar `absolute inset-0` para cubrir todo el contenedor
- Centrar con `flex items-center justify-center`
- Mantener el tamaño por defecto de 48px a menos que sea necesario cambiarlo

### ❌ Evitar

- No omitir `position: relative` en el contenedor padre (el spinner no se posicionará correctamente)
- No usar `position: absolute` sin un contenedor relativo
- No modificar los valores de `stroke-dasharray` (afecta la apariencia del arco)
- No cambiar la duración de animación sin motivo (1.4s es el estándar Material Design)

## Ejemplo de implementación

Ver ejemplo real en:
- **React**: `src/templates/VenuesTemplate.jsx` (líneas 442-447)
- **Vanilla**: `scripts/build-venues.mjs` (líneas 476-495)
- **Output HTML**: `dist-vanilla/venues.html` (buscar "Clima Actual")

## Build Process

El CSS del spinner se compila automáticamente cuando ejecutas:

```bash
npm run build:venues
# o cualquier otro build de vanilla
```

El archivo `src/index.css` se compila a `dist-vanilla/assets/styles.css` incluyendo todas las animaciones del spinner.
