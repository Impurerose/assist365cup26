# Overlay Blur - Ubicación y Detalles

## Descripción
Overlay fijo en el bottom de la página con efecto de degradado y backdrop-filter blur.

## Ubicación en el código

### React Source
**Archivo:** `src/templates/VenuesTemplate.jsx`  
**Líneas:** 346-352

```jsx
{/* Overlay fijo en el bottom con degradado y blur */}
<div
  className="fixed bottom-0 left-0 right-0 max-h-[750px] h-[750px] z-40 pointer-events-none"
  style={{
    background: 'linear-gradient(to top, rgba(242, 242, 242, 1) 0%, rgba(242, 242, 242, 1) 33%, rgba(242, 242, 242, 0.5) 100%)',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
  }}
/>
```

### Vanilla Build
**Archivo:** `scripts/build-venues.mjs`  
**Líneas:** ~407-413 (después del header, antes del main content)

```html
<!-- Overlay fijo en el bottom con degradado y blur -->
<div 
  class="fixed bottom-0 left-0 right-0 max-h-[750px] h-[750px] z-40 pointer-events-none"
  style="background: linear-gradient(to top, rgba(242, 242, 242, 1) 0%, rgba(242, 242, 242, 1) 33%, rgba(242, 242, 242, 0.5) 100%); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);"
></div>
```

**Output:** `dist-vanilla/venues.html`

## Propiedades CSS

### Posicionamiento
- `position: fixed` - Fijo en el viewport
- `bottom: 0` - Anclado al fondo
- `left: 0, right: 0` - Ancho completo
- `z-index: 40` - Por encima del contenido principal
- `pointer-events: none` - No interfiere con interacciones del usuario

### Dimensiones
- `max-h-[750px]` - Altura máxima de 750px
- `h-[750px]` - Altura de 750px

### Efectos Visuales

#### Degradado (linear-gradient)
- **Dirección:** `to top` (de abajo hacia arriba)
- **0%:** `rgba(242, 242, 242, 1)` - Color sólido (bg-secondary) en el fondo
- **33%:** `rgba(242, 242, 242, 1)` - Color sólido mantiene opacidad
- **100%:** `rgba(242, 242, 242, 0.5)` - Semi-transparente en la parte superior

#### Backdrop Filter
- `backdrop-filter: blur(6px)` - Difumina el contenido detrás del overlay
- `-webkit-backdrop-filter: blur(6px)` - Compatibilidad con Safari/Chrome

## Propósito
Crear un efecto visual de difuminado progresivo en la parte inferior de la página, dando profundidad y separación visual entre el contenido y el fondo.

## Estado Actual
✅ **ACTIVADO** en venues template (React + Vanilla)

## Notas
- El overlay no bloquea interacciones gracias a `pointer-events: none`
- El color RGB (242, 242, 242) corresponde al token `bg-secondary` de Tailwind
- El efecto blur funciona en navegadores modernos que soportan `backdrop-filter`
