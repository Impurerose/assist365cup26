# Botón "Mirá cómo llegar a cada partido" - Vanilla Implementation

## HTML del Botón Generado

```html
<button 
  class="mt-4 inline-flex items-center justify-center gap-2 px-4 py-2 h-12 text-lg font-semibold rounded-xl text-brand-primary hover:text-bg-alt-secondary active:text-action-pressed focus:outline-none focus:ring-4 focus:ring-border-primary transition-all duration-300 w-full lg:w-fit" 
  style="font-family: 'Titillium Web', sans-serif;"
  onclick="window.location.href = 'itineraries.html'">
  <i class="ph-duotone ph-airplane-tilt" style="font-size: 16px;"></i>
  <span>Mirá cómo llegar a cada partido</span>
</button>
```

## Ubicación en el Código Fuente

El botón se genera dinámicamente mediante JavaScript en:

**Archivo**: `scripts/build-vanilla.mjs`  
**Líneas**: 878-886  
**Función**: `initAllSections()`

## Ubicación en el DOM

- **Contenedor padre**: `#matches-section-2`
- **Posición**: Se agrega al final del contenedor después de renderizar los partidos
- **Método de inserción**: `appendChild()` - se ejecuta después de `section2.innerHTML = renderMatchesContainer(...)`

## Archivo HTML Resultante

**Archivo**: `dist-vanilla/mainpage.html`  
**Elemento DOM**: El botón se crea dinámicamente cuando se ejecuta `initAllSections()` al cargar la página

## Comportamiento

- **Click**: Navega a `itineraries.html`
- **Estilos**: Botón terciario (solo texto, sin fondo ni borde)
- **Ícono**: Phosphor icon `ph-airplane-tilt` (duotone, 16px)
- **Responsive**: `w-full` en mobile, `lg:w-fit` en desktop

## Notas Importantes

⚠️ El botón NO está en el HTML estático de `mainpage.html`. Se crea dinámicamente mediante JavaScript para evitar que sea eliminado cuando `section2.innerHTML` se actualiza con el contenido de los partidos.

✅ Para modificar el botón, editar `scripts/build-vanilla.mjs` líneas 878-886 y ejecutar:
```bash
npm run build:vanilla && npm run build:mainpage
```
