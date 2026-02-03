# Migración de Assets de Figma a CDN

## 📊 Análisis de Assets de Figma

Este documento identifica todos los assets alojados en servidores de Figma que deben ser migrados a un CDN propio para mejorar performance, disponibilidad y control.

---

## 🎯 Objetivo

Migrar todas las imágenes desde:
```
https://www.figma.com/api/mcp/asset/{asset-id}
```

Hacia un CDN propio (por ejemplo):
```
https://assistcdn.s3.us-west-1.amazonaws.com/assets/wc2026/{tipo}/{nombre}.{ext}
```

---

## 📦 Inventario de Assets por ID

### Asset 1: Logo Aerolínea (Principal)
- **ID**: `c8f98591-ffd7-4846-9d97-65ea101be8e0`
- **Tipo**: Logo de aerolínea (placeholder)
- **Formato sugerido**: PNG o SVG
- **Uso**: 16+ instancias
- **Archivos afectados**:
  - `src/templates/ItinerariesTemplate.jsx` (12 usos)
  - `src/templates/VenuesTemplate.jsx` (4 usos)
  - `dist-vanilla/itineraries.html` (12 usos)
  - `dist-vanilla/venues.html` (4 usos)
- **Ubicación sugerida en CDN**: 
  ```
  https://assistcdn.s3.us-west-1.amazonaws.com/assets/wc2026/airlines/placeholder-airline.png
  ```

---

### Asset 2: Foto Hotel (Placeholder)
- **ID**: `ab043acf-c0ad-4656-ad5a-a118d3c9f470`
- **Tipo**: Imagen de hotel (placeholder)
- **Formato sugerido**: JPG o WebP
- **Uso**: 6+ instancias
- **Archivos afectados**:
  - `src/templates/VenuesTemplate.jsx` (6 usos)
  - `dist-vanilla/venues.html` (6 usos)
- **Ubicación sugerida en CDN**: 
  ```
  https://assistcdn.s3.us-west-1.amazonaws.com/assets/wc2026/hotels/placeholder-hotel.jpg
  ```

---

### Asset 3: Foto Restaurante (Placeholder)
- **ID**: `ec478964-b6ac-42fd-afb8-1ab0f2cfd236`
- **Tipo**: Imagen de restaurante (placeholder)
- **Formato sugerido**: JPG o WebP
- **Uso**: 6+ instancias
- **Archivos afectados**:
  - `dist-vanilla/venues.html` (6 usos)
- **Ubicación sugerida en CDN**: 
  ```
  https://assistcdn.s3.us-west-1.amazonaws.com/assets/wc2026/restaurants/placeholder-restaurant.jpg
  ```

---

### Asset 4: Logo Tripadvisor (Hoteles)
- **ID**: `4c00910f-dc59-45ea-a2c4-99c5ffc8c166`
- **Tipo**: Logo de Tripadvisor
- **Formato sugerido**: SVG o PNG
- **Uso**: 2+ instancias
- **Archivos afectados**:
  - `src/components/AccommodationsWidget.jsx`
  - `dist-vanilla/venues.html`
- **Ubicación sugerida en CDN**: 
  ```
  https://assistcdn.s3.us-west-1.amazonaws.com/assets/wc2026/brands/tripadvisor-logo.svg
  ```

---

### Asset 5: Logo Tripadvisor (Restaurantes)
- **ID**: `3060ac03-c769-4735-a92e-a66647d4b7d2`
- **Tipo**: Logo de Tripadvisor (puede ser el mismo que Asset 4)
- **Formato sugerido**: SVG o PNG
- **Uso**: 2+ instancias
- **Archivos afectados**:
  - `src/components/GastronomyWidget.jsx`
  - `dist-vanilla/venues.html`
- **Ubicación sugerida en CDN**: 
  ```
  https://assistcdn.s3.us-west-1.amazonaws.com/assets/wc2026/brands/tripadvisor-logo.svg
  ```
- **Nota**: Verificar si es idéntico al Asset 4

---

### Asset 6: Imagen General (VenuesSelection)
- **ID**: `d572076a-02db-4aa8-86e5-8eb7985c131b`
- **Tipo**: Ilustración o mapa
- **Formato sugerido**: PNG, JPG o SVG
- **Uso**: 1 instancia
- **Archivos afectados**:
  - `src/templates/VenuesSelectionTemplate.jsx`
- **Ubicación sugerida en CDN**: 
  ```
  https://assistcdn.s3.us-west-1.amazonaws.com/assets/wc2026/illustrations/venues-hero.png
  ```

---

## 📂 Estructura Sugerida en CDN

```
assistcdn.s3.us-west-1.amazonaws.com/
└── assets/
    └── wc2026/
        ├── airlines/
        │   ├── placeholder-airline.png
        │   ├── airline-logo-1.png
        │   ├── airline-logo-2.png
        │   └── ...
        ├── hotels/
        │   ├── placeholder-hotel.jpg
        │   ├── hotel-1.jpg
        │   ├── hotel-2.jpg
        │   └── ...
        ├── restaurants/
        │   ├── placeholder-restaurant.jpg
        │   ├── restaurant-1.jpg
        │   ├── restaurant-2.jpg
        │   └── ...
        ├── brands/
        │   ├── tripadvisor-logo.svg
        │   └── ...
        └── illustrations/
            ├── venues-hero.png
            └── ...
```

---

## 🔍 Archivos a Modificar

### Templates React (src/)

#### 1. src/templates/ItinerariesTemplate.jsx
**Líneas afectadas**: ~89-234  
**Cambios**: 12 instancias del logo de aerolínea
```jsx
// Antes:
logo: "https://www.figma.com/api/mcp/asset/c8f98591-ffd7-4846-9d97-65ea101be8e0"

// Después:
logo: "https://assistcdn.s3.us-west-1.amazonaws.com/assets/wc2026/airlines/placeholder-airline.png"
```

---

#### 2. src/templates/VenuesTemplate.jsx
**Líneas afectadas**: ~82-165  
**Cambios**: 
- 4 logos de aerolíneas
- 6 fotos de hoteles

```jsx
// Aerolíneas:
logo: "https://assistcdn.s3.us-west-1.amazonaws.com/assets/wc2026/airlines/placeholder-airline.png"

// Hoteles:
image: "https://assistcdn.s3.us-west-1.amazonaws.com/assets/wc2026/hotels/placeholder-hotel.jpg"
```

---

#### 3. src/templates/VenuesSelectionTemplate.jsx
**Líneas afectadas**: ~88  
**Cambios**: 1 imagen de ilustración

```jsx
src: "https://assistcdn.s3.us-west-1.amazonaws.com/assets/wc2026/illustrations/venues-hero.png"
```

---

### Components React (src/components/)

#### 4. src/components/AccommodationsWidget.jsx
**Líneas afectadas**: ~56  
**Cambios**: 1 logo de Tripadvisor

```jsx
src: "https://assistcdn.s3.us-west-1.amazonaws.com/assets/wc2026/brands/tripadvisor-logo.svg"
```

---

#### 5. src/components/GastronomyWidget.jsx
**Líneas afectadas**: ~56  
**Cambios**: 1 logo de Tripadvisor

```jsx
src: "https://assistcdn.s3.us-west-1.amazonaws.com/assets/wc2026/brands/tripadvisor-logo.svg"
```

---

### Build Scripts

#### 6. scripts/build-itineraries.mjs
**Búsqueda**: `figma.com/api/mcp/asset`  
**Acción**: Actualizar datos hardcoded que generan el HTML

---

#### 7. scripts/build-venues.mjs
**Búsqueda**: `figma.com/api/mcp/asset`  
**Acción**: Actualizar datos hardcoded que generan el HTML

---

### Archivos Vanilla Build (dist-vanilla/)

#### 8. dist-vanilla/itineraries.html
**Líneas afectadas**: ~258, 276, 514, 539, 780, 805, 1046, 1071, 1312, 1337, 1537, 1562  
**Cambios**: 12 logos de aerolíneas

---

#### 9. dist-vanilla/venues.html
**Líneas afectadas**: 
- Aerolíneas: 619, 631, 643, 655
- Tripadvisor: 761, 938
- Hoteles: 782, 803, 824, 845, 866, 887
- Restaurantes: 958, 986, 1014, 1042, 1070, 1098

---

## 📋 Plan de Migración

### Fase 1: Preparación
- [ ] Descargar todos los assets desde Figma
- [ ] Optimizar imágenes (compresión, formato WebP cuando aplique)
- [ ] Verificar si hay duplicados (ej: 2 logos de Tripadvisor)
- [ ] Subir assets al CDN en la estructura propuesta

### Fase 2: Actualización de Código
- [ ] Crear constantes/config para URLs del CDN
- [ ] Actualizar templates React (5 archivos)
- [ ] Actualizar build scripts (2+ archivos)
- [ ] Regenerar archivos vanilla

### Fase 3: Testing
- [ ] Verificar que todas las imágenes cargan correctamente
- [ ] Probar en diferentes navegadores
- [ ] Validar performance (tiempos de carga)
- [ ] Verificar responsive images

### Fase 4: Deploy
- [ ] Deploy a staging
- [ ] QA completo
- [ ] Deploy a producción
- [ ] Monitoreo de errores 404

---

## 💡 Mejoras Sugeridas

### 1. Centralizar URLs en Config
Crear archivo `src/config/assetsConfig.js`:

```javascript
export const ASSETS_CDN = {
  airlines: {
    placeholder: 'https://assistcdn.s3.us-west-1.amazonaws.com/assets/wc2026/airlines/placeholder-airline.png',
  },
  hotels: {
    placeholder: 'https://assistcdn.s3.us-west-1.amazonaws.com/assets/wc2026/hotels/placeholder-hotel.jpg',
  },
  restaurants: {
    placeholder: 'https://assistcdn.s3.us-west-1.amazonaws.com/assets/wc2026/restaurants/placeholder-restaurant.jpg',
  },
  brands: {
    tripadvisor: 'https://assistcdn.s3.us-west-1.amazonaws.com/assets/wc2026/brands/tripadvisor-logo.svg',
  },
};
```

### 2. Usar Variables de Entorno
```javascript
const CDN_BASE_URL = import.meta.env.VITE_CDN_URL || 'https://assistcdn.s3.us-west-1.amazonaws.com';
```

### 3. Implementar Lazy Loading
```jsx
<img 
  src={ASSETS_CDN.hotels.placeholder} 
  loading="lazy"
  alt="Hotel"
/>
```

### 4. Responsive Images
```jsx
<img 
  srcSet={`
    ${ASSETS_CDN.hotels.placeholder}?w=320 320w,
    ${ASSETS_CDN.hotels.placeholder}?w=640 640w,
    ${ASSETS_CDN.hotels.placeholder}?w=1024 1024w
  `}
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

---

## ⚠️ Riesgos Identificados

1. **URLs hardcoded**: Múltiples lugares con URLs duplicadas
2. **Datos en build scripts**: Los scripts de build tienen datos hardcoded
3. **Sin fallback**: No hay imágenes de respaldo si el CDN falla
4. **Sin versionado**: Las URLs no tienen versionado (cache busting)

---

## ✅ Checklist Post-Migración

- [ ] Todas las imágenes cargan desde el CDN
- [ ] No hay referencias a `figma.com/api/mcp/asset`
- [ ] Performance mejorado (verificar con Lighthouse)
- [ ] Assets optimizados (WebP, compresión)
- [ ] Cache headers configurados en CDN
- [ ] Fallback images implementados
- [ ] Documentación actualizada

---

## 📊 Resumen Ejecutivo

| Métrica | Valor |
|---------|-------|
| **Total de assets de Figma** | 6 únicos |
| **Total de referencias** | 30+ |
| **Archivos a modificar** | 9+ |
| **Templates React** | 3 |
| **Components React** | 2 |
| **Build scripts** | 2 |
| **Archivos vanilla** | 2 |

---

**Última actualización**: 3 de febrero de 2026  
**Responsable**: Equipo de Desarrollo  
**Estado**: 🔴 Pendiente de migración
