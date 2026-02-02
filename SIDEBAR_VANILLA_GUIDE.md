# Guía de Ubicación del Sidebar - Versión Vanilla

## 📍 Ubicación del HTML del Sidebar

El sidebar está implementado en `dist-vanilla/itineraries.html` y se encuentra **inmediatamente después del `<header>`** y **antes del `<main>`**.

### Estructura:

```
<header>...</header>   ← Header Bar (línea 1-93)
  
<!-- SIDEBAR OVERLAY -->  ← Línea 96
<!-- SIDEBAR PANEL -->    ← Línea 99
  
<main>...</main>        ← Contenido principal (línea 145+)
```

---

## 🎨 HTML del Sidebar

### 1. Overlay del Sidebar (Línea 96)
```html
<!-- Sidebar Overlay -->
<div id="sidebar-overlay" class="fixed inset-0 bg-black/50 z-[9998] opacity-0 pointer-events-none transition-opacity duration-300"></div>
```

**Características:**
- ID: `sidebar-overlay`
- Z-index: `z-[9998]` (por encima del mapa)
- Estado inicial: Invisible (`opacity-0 pointer-events-none`)

---

### 2. Panel del Sidebar (Líneas 99-143)
```html
<!-- Sidebar Panel -->
<div id="sidebar-panel" class="fixed top-0 right-0 h-full w-[358px] sm:w-[400px] bg-white shadow-2xl z-[9999] transform translate-x-full transition-transform duration-300 ease-in-out">
  <!-- Header -->
  <div class="flex items-center justify-end p-4 pb-0">
    <button id="sidebar-close" class="flex items-center justify-center w-10 h-10 text-action-default hover:text-bg-alt-secondary transition-colors" aria-label="Cerrar menú">
      <i class="ph-bold ph-x" style="font-size: 24px;"></i>
    </button>
  </div>

  <!-- Body -->
  <div class="px-4 flex flex-col gap-8">
    <!-- Menu Options -->
    <ul class="flex flex-col">
      <li>
        <a href="/mainpage.html" class="w-full lg:w-fit">
          <button type="button" class="...">
            <i class="ph-duotone ph-soccer-ball flex-shrink-0" style="..."></i>
            <span>Explorar partidos</span>
          </button>
        </a>
      </li>
      <li>
        <a href="/itineraries.html" class="w-full lg:w-fit">
          <button type="button" class="...">
            <i class="ph-duotone ph-airplane-tilt flex-shrink-0" style="..."></i>
            <span>Explorar itinerarios</span>
          </button>
        </a>
      </li>
    </ul>

    <!-- Compartir button -->
    <button id="sidebar-share" class="inline-flex items-center justify-center gap-2 px-4 py-[10px] h-[48px] w-fit text-lg font-semibold rounded-xl bg-brand-primary text-white hover:bg-bg-alt-secondary transition-colors">
      <span>Compartir</span>
      <i class="ph-bold ph-paper-plane-tilt" style="font-size: 16px;"></i>
    </button>
  </div>
</div>
```

**Características:**
- ID: `sidebar-panel`
- Z-index: `z-[9999]` (máximo, por encima del overlay y mapa)
- Ancho: `w-[358px]` mobile, `sm:w-[400px]` tablet+
- Estado inicial: Fuera de pantalla (`translate-x-full`)
- Animación: `transition-transform duration-300 ease-in-out`

---

## ⚙️ JavaScript para Toggle del Sidebar

### Ubicación: Líneas 1803-1846

```javascript
// ========================================================================
// SIDEBAR TOGGLE
// ========================================================================
const sidebarOverlay = document.getElementById('sidebar-overlay');
const sidebarPanel = document.getElementById('sidebar-panel');
const hamburgerButton = document.getElementById('hamburger-button');
const sidebarClose = document.getElementById('sidebar-close');
const sidebarShare = document.getElementById('sidebar-share');

function openSidebar() {
  sidebarOverlay.classList.remove('pointer-events-none', 'opacity-0');
  sidebarPanel.classList.remove('translate-x-full');
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  sidebarOverlay.classList.add('pointer-events-none', 'opacity-0');
  sidebarPanel.classList.add('translate-x-full');
  document.body.style.overflow = '';
}

hamburgerButton?.addEventListener('click', openSidebar);
sidebarClose?.addEventListener('click', closeSidebar);
sidebarOverlay?.addEventListener('click', closeSidebar);

// Compartir desde sidebar
sidebarShare?.addEventListener('click', () => {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    closeSidebar();
    // Mostrar tooltip brevemente
    const tooltipMobile = document.getElementById('tooltip-mobile');
    const tooltipDesktop = document.getElementById('tooltip-desktop');
    if (window.innerWidth < 1024) {
      tooltipMobile?.classList.remove('hidden');
      setTimeout(() => tooltipMobile?.classList.add('hidden'), 2000);
    } else {
      tooltipDesktop?.classList.remove('hidden');
      setTimeout(() => tooltipDesktop?.classList.add('hidden'), 2000);
    }
  });
});
```

**Funciones principales:**
1. `openSidebar()` - Abre el sidebar y previene scroll del body
2. `closeSidebar()` - Cierra el sidebar y restaura scroll del body
3. Event listeners para hamburger, botón cerrar (X), overlay y compartir

---

## 🔧 IDs Importantes

| Elemento | ID | Ubicación |
|----------|-----|-----------|
| Overlay | `sidebar-overlay` | Línea 96 |
| Panel | `sidebar-panel` | Línea 99 |
| Botón Cerrar (X) | `sidebar-close` | Línea 103 |
| Botón Compartir Sidebar | `sidebar-share` | Línea 137 |
| Botón Hamburguesa | `hamburger-button` | HeaderBar (línea ~85) |

---

## 📦 Para Copiar el Sidebar a Otro Template

### 1. Copiar HTML (2 bloques)
```html
<!-- Después del </header> y antes del <main> -->

<!-- Sidebar Overlay -->
<div id="sidebar-overlay" ...></div>

<!-- Sidebar Panel -->
<div id="sidebar-panel" ...>
  ...todo el contenido...
</div>
```

### 2. Copiar JavaScript
```javascript
// Dentro del <script> principal, antes del closing </script>

// ========================================================================
// SIDEBAR TOGGLE
// ========================================================================
// ...todo el código de toggle...
```

### 3. Agregar Hamburger Button al Header
```html
<!-- En el HeaderBar, lado derecho después del botón Compartir -->
<button id="hamburger-button" class="flex lg:hidden items-center justify-center w-9 h-9 text-action-default hover:text-bg-alt-secondary transition-colors" aria-label="Abrir menú">
  <i class="ph-bold ph-list" style="font-size: 24px;"></i>
</button>
```

---

## 🎯 Build Script

El sidebar se genera desde: `scripts/build-itineraries.mjs`

**Función generadora:** `generateSidebar()` (línea ~201)

Para aplicar a otro template, copiar:
1. La función `generateSidebar()`
2. Llamar `${generateSidebar()}` después de `${generateHeaderBar()}`
3. Copiar el JavaScript del sidebar al final del script

---

## ✅ Checklist de Implementación

- [ ] HTML del overlay copiado después del `</header>`
- [ ] HTML del panel sidebar copiado después del overlay
- [ ] JavaScript de toggle copiado en el `<script>` principal
- [ ] Botón hamburguesa agregado al HeaderBar
- [ ] IDs correctos (`sidebar-overlay`, `sidebar-panel`, `sidebar-close`, etc.)
- [ ] Z-index apropiado (`z-[9998]` overlay, `z-[9999]` panel)
- [ ] Iconos de Phosphor incluidos (`ph-x`, `ph-soccer-ball`, `ph-airplane-tilt`, `ph-list`)
