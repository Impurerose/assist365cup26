# NoFlightsCard - Documentación Vanilla HTML

## 📍 Ubicación en el Código

**Output HTML**: [`dist-vanilla/itineraries.html`](dist-vanilla/itineraries.html) (línea ~1042)

**Script generador**: [`scripts/build-itineraries.mjs`](scripts/build-itineraries.mjs) (línea ~1042-1050)

**Componente React (referencia)**: [`src/components/NoFlightsCard.jsx`](src/components/NoFlightsCard.jsx)

---

## 🎨 Diseño Figma

**Node ID**: `630-5629`  
**URL**: https://www.figma.com/design/5a0Qgo5TxNHdSDpvxWFLiv/World-Cup-Map?node-id=630-5629&m=dev

---

## 💡 Propósito

Card que se muestra cuando **no hay vuelos disponibles** para una ruta específica en el template de Itinerarios (versión HTML vanilla).

---

## 📐 Estructura HTML Vanilla

### Código Completo

```html
<!-- Card de "no hay vuelos disponibles" -->
<div class="w-[360px] h-[88px] rounded-xl p-4 flex items-center justify-center gap-1" style="background-color: rgba(81, 90, 96, 0.06);">
  <div class="shrink-0 w-4 h-4">
    <img src="https://assistcdn.s3.us-west-1.amazonaws.com/assets/wc2026/emptyIcon.png" class="w-4 h-4" alt="No flights" />
  </div>
  <p class="text-sm text-text-default leading-5 pl-1" style="font-family: 'Titillium Web', sans-serif;">
    No encontramos vuelos disponibles para esta ruta.
  </p>
</div>
```

### Clases Tailwind

| Clase | Valor CSS | Descripción |
|-------|-----------|-------------|
| `w-[360px]` | `width: 360px` | Ancho fijo |
| `h-[88px]` | `height: 88px` | Alto fijo |
| `rounded-xl` | `border-radius: 12px` | Bordes redondeados |
| `p-4` | `padding: 16px` | Padding interno |
| `flex` | `display: flex` | Layout flexbox |
| `items-center` | `align-items: center` | Centrado vertical |
| `justify-center` | `justify-content: center` | Centrado horizontal |
| `gap-1` | `gap: 4px` | Espacio entre elementos |

### Contenedor Principal
```html
<div class="w-[360px] h-[88px] rounded-xl p-4 flex items-center justify-center gap-1" 
     style="background-color: rgba(81, 90, 96, 0.06);">
```
- **Background inline**: `rgba(81, 90, 96, 0.06)` - brand-darkening con 6% opacidad
- **Dimensiones**: 360×88px
- **Layout**: Flex centrado horizontal y verticalmente

### Ícono
```html
<div class="shrink-0 w-4 h-4">
  <img src="https://assistcdn.s3.us-west-1.amazonaws.com/assets/wc2026/emptyIcon.png" 
       class="w-4 h-4" 
       alt="No flights" />
</div>
```
- **Tamaño**: 16×16px
- **Asset**: PNG optimizado en CDN
- **Icono**: Cámara tachada (empty state)

### Texto
```html
<p class="text-sm text-text-default leading-5 pl-1" 
   style="font-family: 'Titillium Web', sans-serif;">
  No encontramos vuelos disponibles para esta ruta.
</p>
```
- **Font**: Titillium Web
- **Tamaño**: 14px (text-sm)
- **Color**: #31363A (text-text-default)
- **Line height**: 20px (leading-5)
- **Padding left**: 4px (pl-1)

---

## 🔧 Cómo se Genera (Script Build)

### Ubicación en build-itineraries.mjs

**Línea ~1042-1050** dentro de la función `generateItineraryMatchCard()`:

```javascript
${flights && flights.length > 0 ? `
  <!-- Cards de vuelos normales -->
  <div class="w-[360px] rounded-xl p-4 flex flex-col gap-2" style="background-color: rgba(81, 90, 96, 0.06);">
    ${flights.slice(0, 2).map(flight => /* ... */)}
  </div>
` : `
  <!-- Card de "no hay vuelos disponibles" -->
  <div class="w-[360px] h-[88px] rounded-xl p-4 flex items-center justify-center gap-1" style="background-color: rgba(81, 90, 96, 0.06);">
    <!-- Ícono y texto -->
  </div>
`}
```

### Datos de Ejemplo

En `ITINERARY_DATA.matches` del script:

```javascript
{
  phase: 'Semi',
  city: { name: 'Kansas city (USA)', number: 3, lat: 39.0997, lng: -94.5786 },
  match: {
    team1: { name: 'Argentina', flag: '🇦🇷' },
    team2: { name: 'A definir', flag: null },
    date: 'Sábado 11 de julio',
    time: { local: '21:00 h (AR)', venue: '19:00 h (KSK)' }
  },
  flights: [] // ← Array vacío = muestra NoFlightsCard
}
```

**Condición**: Si `flights` es `[]`, `null`, o `undefined` → muestra la empty card.

---

## 🎯 Contexto de Uso en itineraries.html

La card aparece dentro de la estructura de un `ItineraryMatchCard`:

```html
<div class="grid grid-cols-[auto_1fr] lg:grid-cols-[368px_auto_1fr] gap-0 lg:gap-6">
  <!-- Columna 1: Match Card (desktop) -->
  <div class="hidden lg:block">...</div>
  
  <!-- Columna 2: MapPin + Conector -->
  <div class="flex flex-col items-center gap-2">...</div>
  
  <!-- Columna 3: Nombre ciudad + Cards -->
  <div class="flex flex-col gap-2 min-w-0">
    <!-- Nombre ciudad -->
    <span class="text-text-default text-xl font-semibold">Kansas city (USA)</span>
    
    <!-- ⬇️ AQUÍ SE INSERTA LA EMPTY CARD ⬇️ -->
    <div class="w-[360px] h-[88px] rounded-xl p-4 flex items-center justify-center gap-1" 
         style="background-color: rgba(81, 90, 96, 0.06);">
      <!-- contenido -->
    </div>
  </div>
</div>
```

---

## 🔄 Regenerar el Build

Para actualizar el HTML después de modificar el script:

```bash
npm run build:itineraries
```

**Output**: `dist-vanilla/itineraries.html`

---

## ✅ Validación

### Visual
1. Abrir `dist-vanilla/itineraries.html`
2. Buscar la sección de "Kansas city (USA)" (ciudad #3)
3. Verificar que aparece la card gris con el mensaje de "no vuelos"

### Búsqueda en código
```bash
grep -n "No encontramos vuelos" dist-vanilla/itineraries.html
```

Debe devolver la línea ~1048 con el mensaje.

---

## 📝 Notas Técnicas

- ✅ Paridad React ↔ Vanilla garantizada
- ✅ Mismo ancho que cards de vuelos (360px)
- ✅ Altura fija para mantener consistencia visual
- ✅ Ícono optimizado (PNG en CDN, no SVG inline)
- ✅ Tipografía Titillium Web aplicada inline
- ✅ Background con transparencia inline (no clase Tailwind)
- ⚠️ No editar directamente `itineraries.html`, modificar `build-itineraries.mjs`

---

**Última actualización**: Febrero 2026  
**Diseñado según**: Figma node 630-5629
