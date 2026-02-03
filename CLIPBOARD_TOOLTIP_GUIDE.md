# Guía de Implementación: Clipboard.js + Tooltip Personalizado

Esta guía documenta la implementación de clipboard.js con un tooltip personalizado que replica exactamente el diseño del componente `ToolTip.jsx` de React.

## 📦 1. Carga del Plugin

### Ubicación: `<head>` del HTML

El plugin clipboard.js se carga desde CDN en la sección `<head>` del archivo HTML:

```html
<!-- Clipboard.js -->
<script src="https://cdn.jsdelivr.net/npm/clipboard@2/dist/clipboard.min.js"></script>
```

**Archivo:** `dist-vanilla/itineraries-tooltip.html` (línea ~23)

### ¿Por qué clipboard.js?

- ✅ **Ligero**: Solo 3kb gzipped
- ✅ **Sin dependencias**: No requiere jQuery ni frameworks
- ✅ **Cross-browser**: Funciona en todos los navegadores modernos
- ✅ **Mobile-friendly**: Soporte táctil automático
- ✅ **Fallback integrado**: Para navegadores antiguos

---

## 🎨 2. Customización del Tooltip

### Estructura HTML - Estilos Exactos de `ToolTip.jsx`

El tooltip se replica en HTML vanilla con los mismos estilos que el componente React ubicado en `src/dsys/ToolTip.jsx`:

#### Tooltip Mobile (debajo del botón)

```html
<div 
  id="tooltip-mobile" 
  class="opacity-0 pointer-events-none transition-opacity duration-300 block lg:hidden absolute bg-[#CDE9FF] text-[#31363A] p-4 rounded-xl text-base leading-6 z-50 shadow-lg"
  style="top: calc(100% + 14px); left: 50%; transform: translateX(-50%); white-space: nowrap;"
>
  ¡Enlace copiado!
  
  <!-- Arrow pointing up -->
  <span
    aria-hidden="true"
    style="
      position: absolute;
      top: -14px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 14px solid #CDE9FF;
      pointer-events: none;
    "
  ></span>
</div>
```

#### Tooltip Desktop (a la izquierda del botón)

```html
<div 
  id="tooltip-desktop" 
  class="opacity-0 pointer-events-none transition-opacity duration-300 hidden lg:block absolute bg-[#CDE9FF] text-[#31363A] p-4 rounded-xl text-base leading-6 z-50 shadow-lg"
  style="right: calc(100% + 14px); top: 50%; transform: translateY(-50%); white-space: nowrap;"
>
  ¡Enlace copiado!
  
  <!-- Arrow pointing right -->
  <span
    aria-hidden="true"
    style="
      position: absolute;
      right: -14px;
      top: 50%;
      transform: translateY(-50%);
      width: 0;
      height: 0;
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
      border-left: 14px solid #CDE9FF;
      pointer-events: none;
    "
  ></span>
</div>
```

### 🎨 Propiedades Customizables del Tooltip

| Propiedad | Valor | Descripción |
|-----------|-------|-------------|
| **Background** | `#CDE9FF` | Color de fondo del tooltip |
| **Text Color** | `#31363A` | Color del texto |
| **Padding** | `p-4` (16px) | Espaciado interno |
| **Border Radius** | `rounded-xl` | Bordes redondeados |
| **Arrow Height** | `14px` | Altura de la flecha |
| **Arrow Width** | `8px` | Ancho de la flecha |
| **Spacing** | `14px` | Distancia del tooltip al botón |
| **Duration** | `2000ms` | Tiempo visible antes de ocultarse |
| **Transition** | `300ms` | Duración de la animación fade |

### Modificar el mensaje del tooltip

Cambiar el texto en ambos tooltips:

```html
<!-- Cambiar de -->
¡Enlace copiado!

<!-- A -->
¡URL copiada al portapapeles!
```

### Modificar colores

Para cambiar el esquema de colores, actualizar en ambos tooltips:

```html
<!-- Fondo y texto -->
class="... bg-[#TU_COLOR_FONDO] text-[#TU_COLOR_TEXTO] ..."

<!-- Color de la flecha (3 lugares) -->
border-bottom: 14px solid #TU_COLOR_FONDO;  /* Mobile - flecha arriba */
border-left: 14px solid #TU_COLOR_FONDO;    /* Desktop - flecha derecha */
```

---

## 🔧 3. Uso del Plugin

### Paso 1: Marcar el elemento trigger

Agregar el atributo `data-clipboard-text` al botón que copiará:

```html
<button 
  id="share-button" 
  data-clipboard-text=""
  class="..."
>
  <span>Compartir</span>
  <i class="ph ph-paper-plane-tilt"></i>
</button>
```

### Paso 2: Inicializar clipboard.js

En el JavaScript, inicializar el plugin y establecer la URL:

```javascript
const shareButton = document.getElementById('share-button');

if (shareButton) {
  // 1. Establecer URL actual en el atributo data
  shareButton.setAttribute('data-clipboard-text', window.location.href);
  
  // 2. Inicializar clipboard.js
  const clipboard = new ClipboardJS('#share-button');
  
  // 3. Manejar evento SUCCESS
  clipboard.on('success', function(e) {
    console.log('✅ Enlace copiado:', e.text);
    showTooltip(); // Mostrar tooltip personalizado
    e.clearSelection(); // Limpiar selección visual
  });
  
  // 4. Manejar evento ERROR (fallback)
  clipboard.on('error', function(e) {
    console.error('❌ Error al copiar');
    const fallbackMessage = /Mac/i.test(navigator.userAgent) 
      ? 'Presiona ⌘+C para copiar' 
      : 'Presiona Ctrl+C para copiar';
    alert(fallbackMessage);
  });
  
  // 5. Cleanup al salir
  window.addEventListener('beforeunload', () => {
    clipboard.destroy();
  });
}
```

### Paso 3: Función para mostrar tooltip

Función compartida que detecta el breakpoint y muestra el tooltip correcto:

```javascript
function showTooltip() {
  const isMobile = window.innerWidth < 1024;
  const activeTooltip = isMobile 
    ? document.getElementById('tooltip-mobile') 
    : document.getElementById('tooltip-desktop');
  
  if (activeTooltip) {
    // Mostrar con fade-in
    activeTooltip.classList.remove('opacity-0', 'pointer-events-none');
    activeTooltip.classList.add('opacity-100');
    
    // Auto-ocultar después de 2 segundos
    setTimeout(() => {
      activeTooltip.classList.remove('opacity-100');
      activeTooltip.classList.add('opacity-0', 'pointer-events-none');
    }, 2000);
  }
}
```

---

## 📍 4. Ubicaciones en el Código

### Archivo: `dist-vanilla/itineraries-tooltip.html`

| Sección | Líneas | Descripción |
|---------|--------|-------------|
| **CDN clipboard.js** | ~23 | Carga del plugin en `<head>` |
| **Tooltip Mobile** | ~60-80 | HTML del tooltip para mobile/tablet |
| **Tooltip Desktop** | ~82-102 | HTML del tooltip para desktop |
| **Botón Header** | ~105-110 | Botón compartir con `data-clipboard-text` |
| **Botón Sidebar** | ~127-132 | Botón sidebar con `data-clipboard-text` |
| **Función showTooltip()** | ~1794-1808 | Lógica para mostrar/ocultar tooltip |
| **Init Header Button** | ~1825-1856 | Inicialización clipboard.js (header) |
| **Init Sidebar Button** | ~1810-1823 | Inicialización clipboard.js (sidebar) |

---

## 🎯 5. Casos de Uso

### Copiar URL actual de la página

```javascript
shareButton.setAttribute('data-clipboard-text', window.location.href);
```

### Copiar texto personalizado

```javascript
shareButton.setAttribute('data-clipboard-text', 'Tu texto aquí');
```

### Copiar contenido de otro elemento

```html
<!-- Input con el contenido -->
<input id="url-input" value="https://ejemplo.com" />

<!-- Botón con data-clipboard-target -->
<button 
  id="copy-btn"
  data-clipboard-target="#url-input"
>
  Copiar
</button>
```

```javascript
const clipboard = new ClipboardJS('#copy-btn');
```

### Cortar texto (solo inputs/textareas)

```html
<textarea id="text-area">Texto a cortar</textarea>

<button 
  data-clipboard-action="cut"
  data-clipboard-target="#text-area"
>
  Cortar
</button>
```

---

## 🔄 6. Ciclo de Vida

```
Usuario hace click en botón
         ↓
clipboard.js copia la URL
         ↓
Dispara evento 'success'
         ↓
showTooltip() se ejecuta
         ↓
Tooltip aparece (fade in)
         ↓
Espera 2 segundos
         ↓
Tooltip desaparece (fade out)
```

---

## 🌐 7. Soporte de Navegadores

### Clipboard.js soporta:

- ✅ Chrome 42+
- ✅ Edge 12+
- ✅ Firefox 41+
- ✅ Safari 10+
- ✅ Opera 29+
- ✅ IE 9+

### Fallback automático

Para navegadores sin soporte, clipboard.js dispara el evento `error` y podemos mostrar un mensaje:

```javascript
clipboard.on('error', function(e) {
  alert('Presiona Ctrl+C para copiar');
});
```

---

## 📝 8. Comparación: React vs Vanilla

### React (`src/dsys/ToolTip.jsx`)

```jsx
<ToolTip content="¡Enlace copiado!" alwaysVisible={true}>
  <Button onClick={handleCopy}>Compartir</Button>
</ToolTip>
```

### Vanilla JS (`dist-vanilla/itineraries-tooltip.html`)

```html
<div class="relative">
  <div id="tooltip-mobile" class="...">¡Enlace copiado!</div>
  <div id="tooltip-desktop" class="...">¡Enlace copiado!</div>
  <button id="share-button" data-clipboard-text="">Compartir</button>
</div>
```

**Resultado:** Visualmente idénticos ✅

---

## 🐛 9. Debugging

### Verificar que clipboard.js está cargado

```javascript
console.log(typeof ClipboardJS); // Debe mostrar "function"
```

### Ver qué texto se copió

```javascript
clipboard.on('success', function(e) {
  console.log('Texto copiado:', e.text);
  console.log('Acción:', e.action); // "copy" o "cut"
  console.log('Trigger:', e.trigger); // Elemento que disparó
});
```

### Verificar estado del tooltip

```javascript
const tooltip = document.getElementById('tooltip-mobile');
console.log('Clases:', tooltip.classList);
console.log('Visible:', !tooltip.classList.contains('opacity-0'));
```

---

## 📚 10. Referencias

- **Clipboard.js Docs:** https://clipboardjs.com/
- **GitHub:** https://github.com/zenorocha/clipboard.js
- **CDN Providers:** https://github.com/zenorocha/clipboard.js/wiki/CDN-Providers
- **Componente React Original:** `src/dsys/ToolTip.jsx`

---

## ✨ 11. Mejoras Futuras

### Animación de entrada/salida

```css
/* Agregar a styles.css */
.tooltip-fade-in {
  animation: fadeIn 300ms ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
```

### Soporte para múltiples botones

```javascript
// Inicializar múltiples botones a la vez
const clipboard = new ClipboardJS('.copy-btn');
```

### Analytics tracking

```javascript
clipboard.on('success', function(e) {
  // Enviar evento a Google Analytics
  gtag('event', 'share', {
    method: 'clipboard',
    content_type: 'url'
  });
});
```

---

**Última actualización:** Febrero 3, 2026  
**Mantenido por:** Equipo A365 World Cup Map
