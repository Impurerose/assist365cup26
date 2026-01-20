# Optimización: Valores Arbitrarios → Clases Tailwind

**Objetivo:** Reemplazar valores CSS arbitrarios (e.g., `bg-[#0059BA]`) por clases definidas en `tailwind.config.js`.

---

## Beneficios

1. ✅ **Consistencia**: Un solo lugar para gestionar colores
2. ✅ **Mantenibilidad**: Cambios de branding centralizados
3. ✅ **Legibilidad**: Nombres semánticos (`bg-alt-secondary` > `bg-[#0059BA]`)
4. ✅ **Performance**: Tailwind puede optimizar mejor clases conocidas
5. ✅ **Reducción de código**: Clases más cortas en algunos casos

---

## Mapeo de Colores

### Backgrounds

| Valor Arbitrario | Clase Tailwind | Uso |
|------------------|----------------|-----|
| `bg-[#006FE8]` | `bg-brand-primary` | Botón principal |
| `bg-[#0059BA]` | `bg-alt-secondary` | Badge fase, hover states |
| `bg-[#F2F2F2]` | `bg-secondary` | Fondo de secciones |
| `bg-[rgba(81,90,96,0.06)]` | `bg-brand-darkening` | SidePanel wrapper |
| `bg-[#E3DEF9]` | `bg-brand-comp-lilac` | Fondos de íconos |
| `bg-[#6DA36F]` | `bg-success-primary` | Badge "Finalizado" |
| `bg-[#BDEDE7]` | `bg-action-alt-default` | Button variant="alt" |
| `bg-[#A8E5DD]` | *(No existe)* | Hover variant="alt" |
| `bg-[#FFFFFF]` | `bg-primary` | Blanco |

### Borders

| Valor Arbitrario | Clase Tailwind | Uso |
|------------------|----------------|-----|
| `border-[#C2DFFF]` | `border-primary` | Bordes de cards, inputs |
| `border-[#006FE8]` | `border-brand-primary` | Chips activos |

### Text

| Valor Arbitrario | Clase Tailwind | Uso |
|------------------|----------------|-----|
| `text-[#31363A]` | `text-default` | Texto general |
| `text-[#0059BA]` | `text-decorative-darker` | Títulos decorativos |
| `text-[#70777C]` | `text-lighter` | Texto secundario |

### Hovers

| Valor Arbitrario | Clase Tailwind | Uso |
|------------------|----------------|-----|
| `hover:bg-[#0059BA]` | `hover:bg-alt-secondary` | Botones primarios |
| `hover:border-[#006FE8]` | `hover:border-brand-primary` | Botones secondary |

---

## Casos Especiales

### No Reemplazables (Mantener)

```javascript
// SVG fills - MANTENER como hex
fill="#006FE8"
fill="#DDDDDD"  // No existe en config

// Inline styles - EVALUAR
style="color: #7BD0C2;"  // Podría ser className="text-icon-lighter"
style="color: #31319B;"  // Podría ser className="text-icon-darker"

// Gradientes SVG - MANTENER
<linearGradient>
  <stop stopColor="#59D3C2" />
  <stop stopColor="#006FE8" />
</linearGradient>

// Stroke opacity - MANTENER
stroke-opacity="0.1"
```

### Colores Faltantes en Config

Estos valores NO tienen equivalente en `tailwind.config.js`:

- `#DDDDDD` - Placeholder flag gray
- `#A8E5DD` - Hover state de variant="alt"
- `#93DDD3` - Active state de variant="alt"
- `#gray-800` - Usar `text-default` (#31363A) en su lugar

**Decisión:**
- Mantener como arbitrarios si no existen
- O agregar a tailwind.config.js si se usan frecuentemente

---

## Mapa de Reemplazos en `build-vanilla.mjs`

### HTML Template

```javascript
// Backgrounds
"bg-[#F2F2F2]"                → "bg-secondary"
"bg-[#006FE8]"                → "bg-brand-primary"
"bg-[#0059BA]"                → "bg-alt-secondary"
"bg-[rgba(81,90,96,0.06)]"    → "bg-brand-darkening"
"bg-[#E3DEF9]"                → "bg-brand-comp-lilac"

// Borders
"border-[#C2DFFF]"            → "border-primary"
"border-[#006FE8]"            → "border-brand-primary"

// Text
"text-[#0059BA]"              → "text-decorative-darker"
"text-[#31363A]"              → "text-default"
"text-[#70777C]"              → "text-lighter"

// Hovers
"hover:bg-[#0059BA]"          → "hover:bg-alt-secondary"
"hover:border-[#006FE8]"      → "hover:border-brand-primary"
"hover:text-[#31363A]"        → "hover:text-default"
```

### app.js Template

```javascript
// Badges
"bg-[#6DA36F]"                → "bg-success-primary"    // Badge Finalizado
"bg-[#0059BA]"                → "bg-alt-secondary"      // Badge fase

// Buttons variant="alt"
"bg-[#BDEDE7]"                → "bg-action-alt-default"

// Cards
"border-[#C2DFFF]"            → "border-primary"

// Text
"text-[#31363A]"              → "text-default"
"text-gray-800"               → "text-default"
```

---

## Instancias por Archivo

### build-vanilla.mjs - HTML Template (~18 reemplazos)

**Línea ~421**: `bg-[#F2F2F2]` → `bg-secondary` (4 veces)
**Línea ~442**: `text-[#0059BA]` → `text-decorative-darker` (2 veces)
**Línea ~448**: `bg-[#006FE8]` → `bg-brand-primary` (2 veces)
**Línea ~449**: `hover:bg-[#0059BA]` → `hover:bg-alt-secondary` (1 vez)
**Línea ~467**: `border-[#C2DFFF]` → `border-primary` (6 veces)
**Línea ~506**: `bg-[rgba(81,90,96,0.06)]` → `bg-brand-darkening` (6 veces)

### build-vanilla.mjs - app.js Template (~25 reemplazos)

**Línea ~195**: `bg-[#6DA36F]` → `bg-success-primary` (1 vez)
**Línea ~202**: `bg-[#0059BA]` → `bg-alt-secondary` (3 veces)
**Línea ~227**: `text-[#31363A]` → `text-default` (15 veces)
**Línea ~232**: `border-[#C2DFFF]` → `border-primary` (8 veces)
**Línea ~256**: `border-[#006FE8]` → `border-brand-primary` (3 veces)
**Línea ~259**: `text-[#70777C]` → `text-lighter` (3 veces)
**Línea ~273**: `bg-[#E3DEF9]` → `bg-brand-comp-lilac` (4 veces)

---

## Estrategia de Implementación

### Opción Recomendada: Buscar y Reemplazar por Categoría

**Paso 1: Backgrounds**
```javascript
"bg-[#F2F2F2]"             → "bg-secondary"
"bg-[#006FE8]"             → "bg-brand-primary"
"bg-[#0059BA]"             → "bg-alt-secondary"
"bg-[rgba(81,90,96,0.06)]" → "bg-brand-darkening"
"bg-[#E3DEF9]"             → "bg-brand-comp-lilac"
"bg-[#6DA36F]"             → "bg-success-primary"
"bg-[#BDEDE7]"             → "bg-action-alt-default"
```

**Paso 2: Borders**
```javascript
"border-[#C2DFFF]" → "border-primary"
"border-[#006FE8]" → "border-brand-primary"
```

**Paso 3: Text**
```javascript
"text-[#31363A]" → "text-default"
"text-[#0059BA]" → "text-decorative-darker"
"text-[#70777C]" → "text-lighter"
"text-gray-800"  → "text-default"
```

**Paso 4: Hovers**
```javascript
"hover:bg-[#0059BA]"      → "hover:bg-alt-secondary"
"hover:border-[#006FE8]"  → "hover:border-brand-primary"
"hover:text-[#31363A]"    → "hover:text-default"
```

**Paso 5: Focus States**
```javascript
"focus:bg-[#BDEDE7]"      → "focus:bg-action-alt-default"
"focus:ring-[#7BD0C2]"    → "focus:ring-icon-lighter"
"focus:ring-[#C2DFFF]"    → "focus:ring-border-primary"
```

---

## Checklist de Reemplazo

### Backgrounds (bg-*)
- [ ] `bg-[#F2F2F2]` → `bg-secondary` (4 instancias)
- [ ] `bg-[#006FE8]` → `bg-brand-primary` (2 instancias)
- [ ] `bg-[#0059BA]` → `bg-alt-secondary` (3 instancias)
- [ ] `bg-[rgba(81,90,96,0.06)]` → `bg-brand-darkening` (6 instancias)
- [ ] `bg-[#E3DEF9]` → `bg-brand-comp-lilac` (4 instancias)
- [ ] `bg-[#6DA36F]` → `bg-success-primary` (1 instancia)
- [ ] `bg-[#BDEDE7]` → `bg-action-alt-default` (3 instancias)

### Borders (border-*)
- [ ] `border-[#C2DFFF]` → `border-primary` (20+ instancias)
- [ ] `border-[#006FE8]` → `border-brand-primary` (3 instancias)

### Text (text-*)
- [ ] `text-[#31363A]` → `text-default` (15+ instancias)
- [ ] `text-[#0059BA]` → `text-decorative-darker` (2 instancias)
- [ ] `text-[#70777C]` → `text-lighter` (3 instancias)
- [ ] `text-gray-800` → `text-default` (1 instancia)

### Hovers (hover:*)
- [ ] `hover:bg-[#0059BA]` → `hover:bg-alt-secondary` (1 instancia)
- [ ] `hover:border-[#006FE8]` → `hover:border-brand-primary` (2 instancias)
- [ ] `hover:text-[#31363A]` → `hover:text-default` (si existe)

### Focus (focus:*)
- [ ] `focus:ring-[#7BD0C2]` → `focus:ring-icon-lighter` (si existe)
- [ ] `focus:ring-[#C2DFFF]` → `focus:ring-border-primary` (si existe)

---

## Casos No Reemplazables

```javascript
// MANTENER COMO ESTÁ:

// 1. SVG fills
fill="#006FE8"
fill="#DDDDDD"

// 2. Inline styles (evaluar caso por caso)
style="color: #7BD0C2;"
style="color: #31319B;"

// 3. Gradientes SVG
stopColor="#59D3C2"
stopColor="#006FE8"

// 4. Hover states sin equivalente
hover:bg-[#A8E5DD]  // No existe en config
active:bg-[#93DDD3]  // No existe en config
```

---

## Validación Post-Reemplazo

1. **Build**: `npm run build:vanilla`
2. **Verificar tamaño**: Comparar `dist-vanilla/` antes y después
3. **Visual check**: Abrir en navegador y verificar colores idénticos
4. **Grep check**: Buscar valores hex restantes
   ```bash
   grep -r "#[0-9A-F]\{6\}" dist-vanilla/ | grep -v "fill\|stopColor"
   ```
5. **CSS validation**: Asegurar que Tailwind generó las clases

---

## Estimación

**Total de reemplazos**: ~43
- HTML template: 18
- app.js template: 25

**Tiempo estimado**: 20-30 minutos

**Reducción de tamaño**: Mínima (~100-200 bytes)
**Mejora de mantenibilidad**: Alta 🎯
