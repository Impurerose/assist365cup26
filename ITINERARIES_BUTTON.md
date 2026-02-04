# Botón "Mirá cómo llegar a cada partido" - Documentación

## 📍 Ubicación del Componente

**React**: [`src/templates/MainPageTemplate.jsx`](src/templates/MainPageTemplate.jsx) (línea ~117-140)

**Script Vanilla**: [`scripts/build-mainpage.mjs`](scripts/build-mainpage.mjs) (línea ~75-93)

**Output HTML**: [`dist-vanilla/mainpage.html`](dist-vanilla/mainpage.html)

---

## 💡 Propósito

Botón que redirige al usuario al template de **Itinerarios**, donde puede ver el camino a la final de su equipo seleccionado, con información de vuelos y sedes.

---

## 🎨 Especificaciones de Diseño

### Estilo Visual
- **Tipo**: Tertiary (texto sin fondo, sin borde)
- **Color**: Brand primary (`#006FE8`)
- **Hover**: Alt secondary (`#0059BA`)
- **Tamaño**: Large (48px desktop, 36px mobile)
- **Ícono**: Avión inclinado (ph-airplane-tilt, duotone)
- **Posición ícono**: Izquierda

### Comportamiento
- Click → Navega a `itineraries.html` (vanilla) o cambia template (React)
- Hover → Cambia color de texto e ícono
- Focus → Ring azul de 4px

---

## 📐 Estructura React

### Código Completo

```jsx
<Button
  classes="mt-4"
  color="tertiary"
  icon={<AirplaneTiltIcon size={16} />}
  iconPosition="left"
  onClick={() => {
    if (typeof window !== "undefined") {
      const isVanilla = !document.getElementById("root");
      if (isVanilla) {
        window.location.href = "itineraries.html";
      } else {
        window.history.pushState({}, "", "?template=itineraries");
        window.dispatchEvent(new PopStateEvent("popstate"));
      }
    }
  }}
>
  Mirá cómo llegar a cada partido
</Button>
```

### Props del Componente Button

| Prop | Valor | Descripción |
|------|-------|-------------|
| `classes` | `"mt-4"` | Margin top 16px |
| `color` | `"tertiary"` | Estilo sin fondo ni borde |
| `icon` | `<AirplaneTiltIcon size={16} />` | Ícono de avión |
| `iconPosition` | `"left"` | Ícono a la izquierda del texto |
| `onClick` | `function` | Handler de navegación |
| `children` | `string` | Texto del botón |

### Clases Aplicadas (por Button.jsx)

**Desde color="tertiary"**:
```jsx
'text-brand-primary hover:text-bg-alt-secondary active:text-action-pressed focus:border-bg-alt-secondary focus:text-bg-alt-secondary focus:border-transparent focus:ring-border-primary focus:ring-opacity-100'
```

**Desde size="large" (default)**:
```jsx
'text-base py-[6px] h-[36px] lg:text-lg lg:py-[10px] lg:h-[48px]'
```

**Base classes**:
```jsx
'whitespace-nowrap overflow-hidden text-ellipsis font-semibold rounded-xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-offset-0'
```

**Layout**:
```jsx
'inline-flex items-center justify-center gap-2 px-4 w-full lg:w-fit'
```

---

## 📐 Estructura HTML Vanilla

### Código Completo

```html
<button 
  class="mt-4 inline-flex items-center justify-center gap-2 px-4 py-2 h-12 text-lg font-semibold rounded-xl text-brand-primary hover:text-bg-alt-secondary active:text-action-pressed focus:outline-none focus:ring-4 focus:ring-border-primary transition-all duration-300 w-full lg:w-fit"
  onclick="window.location.href='itineraries.html'"
  style="font-family: 'Titillium Web', sans-serif;"
>
  <i class="ph-duotone ph-airplane-tilt" style="font-size: 16px;"></i>
  <span>Mirá cómo llegar a cada partido</span>
</button>
```

### Clases Tailwind Detalladas

| Clase | Valor CSS | Descripción |
|-------|-----------|-------------|
| `mt-4` | `margin-top: 16px` | Separación del contenido superior |
| `inline-flex` | `display: inline-flex` | Layout flexbox inline |
| `items-center` | `align-items: center` | Centrado vertical |
| `justify-center` | `justify-content: center` | Centrado horizontal |
| `gap-2` | `gap: 8px` | Espacio entre ícono y texto |
| `px-4` | `padding: 0 16px` | Padding horizontal |
| `py-2` | `padding: 8px 0` | Padding vertical |
| `h-12` | `height: 48px` | Altura fija (desktop) |
| `text-lg` | `font-size: 18px` | Tamaño de texto |
| `font-semibold` | `font-weight: 600` | Negrita semibold |
| `rounded-xl` | `border-radius: 12px` | Bordes redondeados |
| `text-brand-primary` | `color: #006FE8` | Color azul principal |
| `hover:text-bg-alt-secondary` | `color: #0059BA` | Color hover |
| `active:text-action-pressed` | `color: #004494` | Color al hacer click |
| `focus:outline-none` | `outline: none` | Sin outline nativo |
| `focus:ring-4` | `box-shadow` | Ring de 4px en focus |
| `focus:ring-border-primary` | `color: #C5D4E6` | Color del ring |
| `transition-all` | `transition: all` | Transición suave |
| `duration-300` | `300ms` | Duración de transición |
| `w-full` | `width: 100%` | Ancho completo (mobile) |
| `lg:w-fit` | `width: fit-content` | Ancho ajustado (desktop) |

### Ícono Phosphor

```html
<i class="ph-duotone ph-airplane-tilt" style="font-size: 16px;"></i>
```

- **Clase**: `ph-duotone ph-airplane-tilt`
- **Estilo**: Duotone (dos tonos)
- **Tamaño**: 16px
- **Librería**: Phosphor Icons Web

---

## 🎯 Contexto de Uso en MainPage

### Ubicación en el Template

El botón aparece en la **Sección 2** del MainPage, después de `MatchesContainer`:

```html
<!-- SECTION 2: Placeholder + All Matches -->
<div class="gap-6 w-full flex flex-col lg:flex-row items-center lg:items-start justify-center bg-bg-secondary">
  <!-- Imagen Placeholder -->
  <div class="text-2xl">
    <img src="https://placehold.co/715x640" alt="Placeholder" />
  </div>
  
  <!-- Side Panel -->
  <div class="bg-brand-darkening w-full lg:max-w-[467px]">
    <div id="matches-section-2" class="...">
      <!-- MatchesContainer aquí -->
    </div>
    
    <!-- ⬇️ BOTÓN INSERTADO AQUÍ ⬇️ -->
    <button onclick="window.location.href='itineraries.html'">
      <i class="ph-duotone ph-airplane-tilt"></i>
      <span>Mirá cómo llegar a cada partido</span>
    </button>
  </div>
</div>
```

### Posición Visual

- **Mobile/Tablet**: Debajo de las cards de partidos, full width
- **Desktop**: Debajo de las cards de partidos, width ajustado al contenido

---

## 🔧 Cómo se Genera (Script Build)

### En `build-mainpage.mjs` (línea ~75-93)

```javascript
// Agregar botón "Mirá cómo llegar a cada partido" en la sección 2
const itinerariesButton = `
                <button 
                  class="mt-4 inline-flex items-center justify-center gap-2 px-4 py-2 h-12 text-lg font-semibold rounded-xl text-brand-primary hover:text-bg-alt-secondary active:text-action-pressed focus:outline-none focus:ring-4 focus:ring-border-primary transition-all duration-300 w-full lg:w-fit"
                  onclick="window.location.href='itineraries.html'"
                  style="font-family: 'Titillium Web', sans-serif;"
                >
                  <i class="ph-duotone ph-airplane-tilt" style="font-size: 16px;"></i>
                  <span>Mirá cómo llegar a cada partido</span>
                </button>`;

// Insertar el botón después del matches-section-2
mainpageContent = mainpageContent.replace(
  /(id="matches-section-2"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>)/,
  `$1${itinerariesButton}\n              </div>\n            </div>`
);
```

**Método**: Regex replace para insertar después de `matches-section-2`

---

## 🔄 Funcionalidad

### React (onClick handler)

```javascript
onClick={() => {
  if (typeof window !== "undefined") {
    const isVanilla = !document.getElementById("root");
    if (isVanilla) {
      window.location.href = "itineraries.html";
    } else {
      window.history.pushState({}, "", "?template=itineraries");
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
  }
}}
```

**Lógica**:
1. Verifica si está en entorno browser
2. Detecta si es vanilla (sin `<div id="root">`)
3. **Vanilla**: Redirige a `itineraries.html`
4. **React**: Cambia URL a `?template=itineraries` y dispara evento popstate

### Vanilla (onclick inline)

```html
onclick="window.location.href='itineraries.html'"
```

**Lógica**: Redirige directamente a `itineraries.html`

---

## 🔄 Regenerar el Build

Para actualizar el HTML después de modificar el script:

```bash
npm run build:mainpage
```

**Output**: `dist-vanilla/mainpage.html`

---

## ✅ Validación

### Visual
1. Abrir `dist-vanilla/mainpage.html`
2. Scroll hasta la Sección 2 (después del primer mapa)
3. Verificar que aparece el botón con el ícono de avión
4. Hacer click → debe redirigir a `itineraries.html`

### Búsqueda en código
```bash
grep -n "Mirá cómo llegar" dist-vanilla/mainpage.html
```

Debe devolver una línea con el botón.

### Estilos
- **Mobile**: Botón full width, texto 18px, altura 48px
- **Desktop**: Botón width fit-content
- **Hover**: Texto cambia de `#006FE8` a `#0059BA`
- **Focus**: Ring azul claro de 4px

---

## 📝 Notas Técnicas

- ✅ Paridad React ↔ Vanilla garantizada
- ✅ Usa color tertiary del design system (sin fondo ni borde)
- ✅ Ícono Phosphor duotone (dos tonos)
- ✅ Responsive: full width mobile, fit desktop
- ✅ Navegación funcional en ambas versiones
- ⚠️ En React, requiere manejo de templates o router
- ⚠️ No editar directamente `mainpage.html`, modificar `build-mainpage.mjs`
- ⚠️ El botón se inserta vía regex, sensible a cambios en estructura HTML

---

## 🔗 Archivos Relacionados

- **React Component**: [`src/dsys/Button.jsx`](src/dsys/Button.jsx)
- **Template**: [`src/templates/MainPageTemplate.jsx`](src/templates/MainPageTemplate.jsx)
- **Build Script**: [`scripts/build-mainpage.mjs`](scripts/build-mainpage.mjs)
- **Output**: [`dist-vanilla/mainpage.html`](dist-vanilla/mainpage.html)
- **Destino**: [`dist-vanilla/itineraries.html`](dist-vanilla/itineraries.html)

---

**Última actualización**: Febrero 2026  
**Tipo de botón**: Tertiary (text-only)  
**Ícono**: Phosphor Airlines Tilt (duotone)
