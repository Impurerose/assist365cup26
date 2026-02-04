# Share Button en el Mapa - Implementación Vanilla

## 📍 Ubicación del Share Button en el Mapa

### Archivo
[dist-vanilla/itineraries-tooltip.html](dist-vanilla/itineraries-tooltip.html)

### Estructura HTML

El share button está ubicado dentro del contenedor del mapa, posicionado de forma **absoluta** en la esquina inferior derecha.

```html
<!-- Líneas 273-318 -->
<div class="lg:max-w-[792px] mx-auto">
  <!-- Mapa -->
  
  <div class="relative rounded-2xl overflow-hidden w-full lg:w-[715px] h-[640px] mb-6">
    <!-- Botón flotante de compartir sobre el mapa -->
    <div class="absolute bottom-3 right-3 z-50">
      <!-- Tooltip del botón del mapa -->
      <div 
        id="tooltip-map" 
        class="opacity-0 pointer-events-none transition-opacity duration-300 absolute bg-[#CDE9FF] text-[#31363A] p-4 rounded-xl text-base leading-6 z-50 shadow-lg"
        style="bottom: calc(100% + 14px); right: 0; white-space: nowrap;"
      >
        ¡Enlace copiado!
        
        <!-- Arrow pointing down -->
        <span
          aria-hidden="true"
          style="
            position: absolute;
            bottom: -14px;
            right: 16px;
            width: 0;
            height: 0;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-top: 14px solid #CDE9FF;
            pointer-events: none;
          "
        ></span>
      </div>
      
      <button 
        id="map-share-button"
        data-clipboard-text=""
        class="inline-flex items-center justify-center gap-2 px-4 py-2 h-10 text-base font-semibold rounded-xl bg-brand-primary text-white hover:bg-bg-alt-secondary transition-colors shadow-lg">
        <i class="ph ph-paper-plane-tilt" style="font-size: 20px; font-weight: bold;"></i>
      </button>
    </div>
    <div id="map" class="w-full h-full"></div>
  </div>
</div>
```

## 🎯 Jerarquía de Contenedores

```
<div class="lg:max-w-[792px] mx-auto">           ← Contenedor principal del mapa
  └─ <div class="relative ... h-[640px] mb-6">   ← Contenedor del mapa con position: relative
      ├─ <div class="absolute bottom-3 right-3 z-50">  ← Share button container (absolute)
      │   ├─ <div id="tooltip-map">                     ← Tooltip del mapa
      │   └─ <button id="map-share-button">             ← Share button
      └─ <div id="map" class="w-full h-full"></div>     ← Mapa Leaflet
```

## 🎨 Características de Diseño

### Posicionamiento
- **Container**: `position: absolute; bottom: 12px; right: 12px; z-index: 50`
- **Sobre el mapa**: Flotante en la esquina inferior derecha
- **Z-index alto**: Asegura que está por encima del mapa Leaflet

### Clases del Botón
```css
inline-flex items-center justify-center gap-2 
px-4 py-2 h-10 text-base font-semibold rounded-xl 
bg-brand-primary text-white 
hover:bg-bg-alt-secondary transition-colors 
shadow-lg
```

### Tooltip del Mapa
- **Posición**: Aparece **arriba** del botón (`bottom: calc(100% + 14px)`)
- **Flecha**: Apunta hacia abajo (hacia el botón)
- **Color**: `bg-[#CDE9FF]` con texto `text-[#31363A]`
- **Animación**: `opacity-0` → `opacity-100` por 2 segundos

## 💻 JavaScript - Implementación

### Ubicación del código
[dist-vanilla/itineraries-tooltip.html](dist-vanilla/itineraries-tooltip.html#L1956-L2000) (líneas 1956-2000)

### Código JavaScript

```javascript
// ========================================================================
// MAP SHARE BUTTON CON CLIPBOARD.JS
// ========================================================================
const mapShareButton = document.getElementById('map-share-button');

if (mapShareButton) {
  // Establecer URL actual en el atributo data
  mapShareButton.setAttribute('data-clipboard-text', window.location.href);
  
  // Inicializar clipboard.js
  const mapClipboard = new ClipboardJS('#map-share-button');
  
  // Evento SUCCESS de clipboard.js
  mapClipboard.on('success', function(e) {
    console.log('✅ Enlace copiado desde mapa:', e.text);
    
    // Mostrar tooltip del mapa
    const mapTooltip = document.getElementById('tooltip-map');
    if (mapTooltip) {
      mapTooltip.classList.remove('opacity-0', 'pointer-events-none');
      mapTooltip.classList.add('opacity-100');
      
      setTimeout(() => {
        mapTooltip.classList.remove('opacity-100');
        mapTooltip.classList.add('opacity-0', 'pointer-events-none');
      }, 2000);
    }
    
    e.clearSelection();
  });
  
  // Evento ERROR de clipboard.js (fallback)
  mapClipboard.on('error', function(e) {
    console.error('❌ Error al copiar desde mapa');
    const fallbackMessage = /Mac/i.test(navigator.userAgent) 
      ? 'Presiona ⌘+C para copiar' 
      : 'Presiona Ctrl+C para copiar';
    alert(fallbackMessage);
  });
  
  // Cleanup al salir de la página
  window.addEventListener('beforeunload', () => {
    mapClipboard.destroy();
  });
}
```

## 📚 Dependencias

### Clipboard.js
```html
<!-- Línea 20 del HTML -->
<script src="https://cdn.jsdelivr.net/npm/clipboard@2/dist/clipboard.min.js"></script>
```

### Phosphor Icons (para el ícono del avión de papel)
```html
<!-- Línea 13 del HTML -->
<script src="https://unpkg.com/@phosphor-icons/web@2.1.1"></script>
```

## 🔄 Flujo de Funcionamiento

1. **Usuario hace clic** en el botón `#map-share-button`
2. **Clipboard.js** lee el atributo `data-clipboard-text` (URL actual)
3. **Copia al portapapeles** la URL
4. **Evento 'success'** se dispara
5. **Tooltip aparece** (`opacity-0` → `opacity-100`)
6. **Espera 2 segundos** (`setTimeout`)
7. **Tooltip desaparece** (`opacity-100` → `opacity-0`)

## 🗺️ Relación con el Mapa

### Contenedor del Mapa
```html
<div class="relative rounded-2xl overflow-hidden w-full lg:w-[715px] h-[640px] mb-6">
  <!-- Share button (absolute) -->
  <div id="map" class="w-full h-full"></div>
</div>
```

- El contenedor tiene `position: relative` para que el botón `absolute` se posicione relativo a él
- El mapa tiene `id="map"` y ocupa el 100% del contenedor
- El share button está **encima** del mapa gracias a `z-50`

## 📋 Plan de Implementación (NO APLICADO)

### Opción 1: Mantener Estructura Actual
✅ **Recomendado** - Ya está bien implementado

- Share button flotante sobre el mapa
- Tooltip específico para el botón del mapa
- JavaScript independiente con Clipboard.js
- No requiere cambios

### Opción 2: Migrar a React (Futuro)
Si se necesita migrar a React:

1. **Crear componente**: `MapShareButton.jsx`
2. **Usar hook personalizado**: `useClipboard` 
3. **Integrar con**: `ItineraryMapView.jsx`
4. **Posicionamiento**: Mantener `absolute bottom-3 right-3`

```jsx
// Ejemplo futuro
<ItineraryMapView>
  <MapShareButton 
    url={window.location.href}
    position="bottom-right"
  />
</ItineraryMapView>
```

### Opción 3: Agregar a Otros Archivos Vanilla

Archivos que podrían necesitar el mismo botón:
- [dist-vanilla/itineraries.html](dist-vanilla/itineraries.html)
- [dist-vanilla/itineraries_iteration.html](dist-vanilla/itineraries_iteration.html)

**Pasos para replicar:**
1. Copiar el HTML del botón (líneas 277-318)
2. Copiar el JavaScript (líneas 1956-2000)
3. Asegurar que Clipboard.js esté incluido
4. Ajustar IDs si hay múltiples mapas en la misma página

## 🎯 Diferencias con Share Button del Header

### Share Button del Header
- **Ubicación**: En el header, al lado del menú hamburguesa
- **ID**: `share-button`
- **Tooltip**: Diferente según breakpoint (mobile abajo, desktop izquierda)
- **Visible**: Siempre en la parte superior

### Share Button del Mapa
- **Ubicación**: Flotante sobre el mapa
- **ID**: `map-share-button`
- **Tooltip**: Siempre arriba del botón
- **Visible**: Solo cuando se muestra el mapa
- **Shadow**: Tiene `shadow-lg` para destacarse sobre el mapa

## ✅ Conclusión

El share button del mapa está **correctamente implementado** en la versión vanilla:

- ✅ Posicionamiento absoluto sobre el mapa
- ✅ Z-index adecuado para estar encima
- ✅ Tooltip específico con animación
- ✅ JavaScript con Clipboard.js
- ✅ Manejo de errores y fallbacks
- ✅ Cleanup de eventos
- ✅ Diseño responsivo

**No se requieren cambios en este momento.**
