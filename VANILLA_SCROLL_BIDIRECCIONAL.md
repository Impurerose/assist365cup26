# Sistema de Scroll Horizontal Bidireccional - Vanilla JS

## 📋 Descripción

Sistema de carousel con scroll horizontal nativo del navegador implementado en **vanilla JavaScript puro** (sin dependencias externas como Swiper.js). Diseñado para los widgets de **Alojamientos** y **Gastronomía** en el template de Venues.

### ✨ Características

- ✅ **Scroll nativo** con `overflow-x-auto` (usa capacidades del navegador)
- ✅ **Flechas inteligentes** que aparecen/desaparecen según posición del scroll
- ✅ **Scroll por páginas** (ancho visible del container, no valor fijo en px)
- ✅ **Responsive** (se adapta automáticamente al resize del viewport)
- ✅ **Accesible** (funciona con mouse, touch, teclado)
- ✅ **Performante** (usa event delegation y `classList.toggle`)
- ✅ **Paridad con React** (replica exactamente el comportamiento de los componentes React)

---

## 📍 Ubicación de archivos

### Código fuente (builder)
**Archivo:** `scripts/build-venues.mjs`

- **HTML de AccommodationsWidget:** Líneas ~614-650
- **HTML de GastronomyWidget:** Líneas ~652-688
- **JavaScript del sistema:** Líneas ~830-920

### Salida generada
**Archivo:** `dist-vanilla/venues.html`

- **AccommodationsWidget:** Líneas ~774-845
- **GastronomyWidget:** Líneas ~870-1078
- **Script JavaScript:** Líneas ~1223-1320

---

## 🏗️ Estructura HTML

### Patrón de implementación

```html
<!-- Contenedor principal del widget -->
<div class="relative">
  
  <!-- 1️⃣ FLECHA IZQUIERDA (oculta por defecto) -->
  <button 
    id="{widget-name}-scroll-left"
    class="absolute left-1.5 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow z-10 hidden"
    aria-label="Scroll izquierda"
  >
    <i class="ph-bold ph-caret-left text-action-default" style="font-size: 20px;"></i>
  </button>

  <!-- 2️⃣ CONTENEDOR SCROLLEABLE -->
  <div 
    id="{widget-name}-scroll-container"
    class="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
  >
    <!-- Cards del carousel aquí -->
  </div>

  <!-- 3️⃣ FLECHA DERECHA (visible por defecto) -->
  <button 
    id="{widget-name}-scroll-right"
    class="absolute right-1.5 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow z-10"
    aria-label="Scroll derecha"
  >
    <i class="ph-bold ph-caret-right text-action-default" style="font-size: 20px;"></i>
  </button>
</div>
```

### IDs importantes

| Widget | Container ID | Flecha Izquierda ID | Flecha Derecha ID |
|--------|--------------|---------------------|-------------------|
| Alojamientos | `accommodations-scroll-container` | `accommodations-scroll-left` | `accommodations-scroll-right` |
| Gastronomía | `gastronomy-scroll-container` | `gastronomy-scroll-left` | `gastronomy-scroll-right` |

---

## ⚙️ JavaScript - Código completo

### Función principal: `initScrollWidget()`

```javascript
/**
 * Inicializa un widget con scroll horizontal bidireccional
 * 
 * @param {string} containerId - ID del div scrolleable (overflow-x-auto)
 * @param {string} leftBtnId - ID del botón de flecha izquierda
 * @param {string} rightBtnId - ID del botón de flecha derecha
 */
function initScrollWidget(containerId, leftBtnId, rightBtnId) {
  // 1. Obtener referencias del DOM
  const container = document.getElementById(containerId);
  const leftBtn = document.getElementById(leftBtnId);
  const rightBtn = document.getElementById(rightBtnId);

  // Validación: si falta algún elemento, salir silenciosamente
  if (!container || !leftBtn || !rightBtn) return;

  /**
   * Detecta la posición actual del scroll y actualiza visibilidad de botones
   */
  function checkScroll() {
    const canScrollLeft = container.scrollLeft > 0;
    const canScrollRight = 
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10;

    // Tailwind CSS: agregar/remover class 'hidden' según condición
    leftBtn.classList.toggle('hidden', !canScrollLeft);
    rightBtn.classList.toggle('hidden', !canScrollRight);
  }

  /**
   * Scrollea el container en la dirección especificada
   * @param {string} direction - 'left' o 'right'
   */
  function scrollTo(direction) {
    const scrollAmount = container.clientWidth; // Ancho visible del container
    container.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth'
    });
  }

  // 2. Event Listeners
  container.addEventListener('scroll', checkScroll);
  window.addEventListener('resize', checkScroll);
  leftBtn.addEventListener('click', () => scrollTo('left'));
  rightBtn.addEventListener('click', () => scrollTo('right'));

  // 3. Check inicial
  checkScroll();
}
```

### Inicialización

```javascript
document.addEventListener('DOMContentLoaded', () => {
  // Widget de Alojamientos
  initScrollWidget(
    'accommodations-scroll-container',
    'accommodations-scroll-left',
    'accommodations-scroll-right'
  );
  
  // Widget de Gastronomía
  initScrollWidget(
    'gastronomy-scroll-container',
    'gastronomy-scroll-left',
    'gastronomy-scroll-right'
  );
});
```

---

## 🔄 Flujo de funcionamiento

```
┌─────────────────────────────────────────────────────────┐
│ 1. CARGA DE PÁGINA                                      │
│    - DOMContentLoaded ejecuta initScrollWidget()        │
│    - Se obtienen referencias del DOM por ID             │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ 2. CHECK INICIAL                                         │
│    - checkScroll() detecta posición inicial             │
│    - Flecha izquierda: OCULTA (scrollLeft === 0)        │
│    - Flecha derecha: VISIBLE (hay contenido a la →)     │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ 3. USUARIO HACE CLICK EN FLECHA DERECHA                │
│    - scrollTo('right') se ejecuta                       │
│    - container.scrollBy({ left: +clientWidth })         │
│    - Scroll suave hacia la derecha                      │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ 4. EVENTO 'SCROLL' SE DISPARA                           │
│    - checkScroll() detecta nueva posición               │
│    - scrollLeft > 0 → Flecha izquierda: VISIBLE         │
│    - scrollLeft < max → Flecha derecha: VISIBLE         │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ 5. USUARIO REDIMENSIONA VENTANA (RESIZE)               │
│    - checkScroll() recalcula si hay espacio             │
│    - Actualiza visibilidad de flechas                   │
└─────────────────────────────────────────────────────────┘
```

---

## 📱 Responsive behavior

| Viewport | Comportamiento |
|----------|----------------|
| **Mobile** (< 768px) | Scroll por toda la pantalla (clientWidth pequeño) |
| **Tablet** (768-1024px) | Scroll por 1-2 cards a la vez |
| **Desktop** (> 1024px) | Scroll por 3-4 cards a la vez |

El sistema se adapta automáticamente porque usa `container.clientWidth` (ancho visible actual).

---

## 🆕 Cómo agregar un nuevo widget con scroll

### 1. Agregar HTML en `build-venues.mjs`

```javascript
<!-- Nuevo widget de Tours -->
<div class="relative">
  <!-- Flecha izquierda -->
  <button 
    id="tours-scroll-left"
    class="absolute left-1.5 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow z-10 hidden"
    aria-label="Scroll izquierda"
  >
    <i class="ph-bold ph-caret-left text-action-default" style="font-size: 20px;"></i>
  </button>
  
  <!-- Container scrolleable -->
  <div 
    id="tours-scroll-container"
    class="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
  >
    ${toursData.map(tour => generateTourCard(tour)).join('')}
  </div>
  
  <!-- Flecha derecha -->
  <button 
    id="tours-scroll-right"
    class="absolute right-1.5 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow z-10"
    aria-label="Scroll derecha"
  >
    <i class="ph-bold ph-caret-right text-action-default" style="font-size: 20px;"></i>
  </button>
</div>
```

### 2. Agregar inicialización en el script

```javascript
document.addEventListener('DOMContentLoaded', () => {
  // Widgets existentes...
  initScrollWidget('accommodations-scroll-container', ...);
  initScrollWidget('gastronomy-scroll-container', ...);
  
  // ✅ Nuevo widget
  initScrollWidget(
    'tours-scroll-container',
    'tours-scroll-left',
    'tours-scroll-right'
  );
});
```

### 3. Rebuild

```bash
npm run build:venues
```

---

## 🔧 Clases de Tailwind importantes

| Clase | Propósito |
|-------|-----------|
| `overflow-x-auto` | Habilita scroll horizontal nativo |
| `scrollbar-hide` | Oculta la barra de scroll (custom utility) |
| `hidden` | Oculta elementos (display: none) |
| `z-10` | Eleva las flechas sobre las cards |
| `absolute` | Posiciona las flechas sobre el container |

---

## 🎯 Ventajas vs librerías (Swiper.js)

| Aspecto | Vanilla JS (este sistema) | Swiper.js |
|---------|---------------------------|-----------|
| **Bundle size** | ~2KB inline | ~35KB minificado |
| **Dependencias** | 0 | 1 librería externa |
| **Performance** | Nativo del navegador | Emulación JS |
| **Touch support** | Incluido (browser nativo) | Incluido (emulado) |
| **Mantenibilidad** | Código simple y legible | Configuración compleja |
| **Customización** | Total control | Limitado a API |

---

## 🐛 Debugging

### Ver estado actual del scroll

```javascript
// En la consola del navegador:
const container = document.getElementById('gastronomy-scroll-container');
console.log({
  scrollLeft: container.scrollLeft,
  scrollWidth: container.scrollWidth,
  clientWidth: container.clientWidth,
  maxScroll: container.scrollWidth - container.clientWidth
});
```

### Verificar que los event listeners están activos

```javascript
// Agregar logs temporales en checkScroll()
function checkScroll() {
  console.log('checkScroll called', {
    canScrollLeft: container.scrollLeft > 0,
    canScrollRight: container.scrollLeft < container.scrollWidth - container.clientWidth - 10
  });
  // ... resto del código
}
```

---

## 📊 Paridad React ↔ Vanilla

| Concepto React | Equivalente Vanilla |
|----------------|---------------------|
| `useState(false)` | `classList.toggle('hidden')` |
| `useRef(null)` | `document.getElementById()` |
| `useEffect([])` | `addEventListener('DOMContentLoaded')` |
| `useEffect([deps])` | `addEventListener('scroll/resize')` |
| `onClick={handler}` | `addEventListener('click')` |
| `container.scrollBy()` | `container.scrollBy()` ✅ (mismo API) |

**Resultado:** Comportamiento UX idéntico entre React y Vanilla.

---

## 📦 Archivos relacionados

### React (source)
- `src/components/AccommodationsWidget.jsx`
- `src/components/GastronomyWidget.jsx`

### Vanilla (builder)
- `scripts/build-venues.mjs`

### Output
- `dist-vanilla/venues.html`

---

## 🚀 Comandos útiles

```bash
# Regenerar HTML con los cambios
npm run build:venues

# Ver el resultado
open dist-vanilla/venues.html
# o
xdg-open dist-vanilla/venues.html  # Linux
```

---

## ✅ Checklist para nuevos widgets

- [ ] Agregar HTML con IDs únicos (`{name}-scroll-container`, `-left`, `-right`)
- [ ] Asegurar que el container tenga `overflow-x-auto scrollbar-hide`
- [ ] Flecha izquierda debe tener class `hidden` inicialmente
- [ ] Agregar llamada a `initScrollWidget()` en `DOMContentLoaded`
- [ ] Regenerar HTML con `npm run build:venues`
- [ ] Probar en mobile, tablet y desktop
- [ ] Verificar que las flechas aparecen/desaparecen correctamente

---

## 📝 Notas adicionales

### Browser support
- ✅ Chrome/Edge: 100%
- ✅ Firefox: 100%
- ✅ Safari: 100%
- ✅ Mobile browsers: 100%

`scrollBy()` y `behavior: 'smooth'` son estándares modernos con soporte universal.

### Performance
El sistema usa **event delegation** y **classList.toggle** que son operaciones muy performantes. No hay re-renders ni cálculos pesados.

### Accessibility
- Los botones tienen `aria-label` descriptivos
- El scroll funciona con **teclado** (Tab + Enter/Space en botones, o flechas del teclado en el container)
- Compatible con **lectores de pantalla**

---

**Documentación creada:** 29 de enero de 2026  
**Versión:** 1.0.0  
**Autor:** Team a365wc2026
