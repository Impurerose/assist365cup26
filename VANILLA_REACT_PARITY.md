# Paridad HTML: Vanilla Build ↔ React Template

**Objetivo:** Hacer que el HTML generado por `build-vanilla.mjs` sea 100% idéntico al template de React en `App.jsx`.

---

## Problemas Identificados

### 1. **SidePanel - Estructura de Doble Wrapper**

**❌ Vanilla Actual:**
```html
<div id="side-panel" class="rounded-l-xl flex flex-col p-6 w-full lg:w-[467px] h-[640px] bg-[rgba(81,90,96,0.06)]">
  <!-- Contenido directo -->
</div>
```

**✅ React Target:**
```jsx
<div className="bg-brand-darkening w-full lg:max-w-[467px]">
  <div className="mx-auto lg:mx-0 rounded-l-xl flex flex-col lg:px-4 pt-4 lg:pt-6 lg:p-6 w-full max-w-[368px] lg:max-w-full lg:w-[467px] h-[640px]">
    {children}
  </div>
</div>
```

**Cambios necesarios:**
- ✅ Agregar wrapper exterior `bg-brand-darkening w-full lg:max-w-[467px]`
- ✅ Cambiar padding: `p-6` → `lg:px-4 pt-4 lg:pt-6 lg:p-6`
- ✅ Agregar `max-w-[368px] lg:max-w-full`
- ✅ Agregar `mx-auto lg:mx-0`

---

### 2. **TeamSelection - Container y Estructura**

**❌ Vanilla Actual:**
```html
<div id="initial-state">
  <div class="flex flex-col items-start mb-6 mt-32">
    <h2 class="text-lg font-semibold text-[#0059BA]">
      Seleccioná tu equipo para explorar tu camino a la gran final 2026
    </h2>
  </div>
  <div id="teams-grid" class="grid grid-cols-2 gap-3"></div>
</div>
```

**✅ React Target:**
```jsx
<div className="max-w-[360px] lg:max-w-[316px] w-full mx-auto">
  <div className="flex flex-col mb-6 mt-6 lg:mt-32">
    <h2 className="text-xl lg:text-2xl font-semibold text-text-decorative-darker leading-snug">
      Seleccioná tu equipo y explorá el camino a la final
    </h2>
  </div>
  <div className="grid grid-cols-2 gap-4 w-full">
    {/* TeamCards */}
  </div>
  <div className="mt-6">
    <Select placeholder="Otro equipo" />
  </div>
</div>
```

**Cambios necesarios:**
- ✅ Agregar wrapper `max-w-[360px] lg:max-w-[316px] w-full mx-auto`
- ✅ Cambiar título: `text-lg` → `text-xl lg:text-2xl`
- ✅ Cambiar texto: "...gran final 2026" → "...camino a la final"
- ✅ Agregar responsive margin: `mt-32` → `mt-6 lg:mt-32`
- ✅ Remover `items-start` del contenedor de título
- ✅ Cambiar grid gap: `gap-3` → `gap-4`
- ✅ Agregar `<select>` con placeholder "Otro equipo" y `mt-6`

---

### 3. **TeamCard - Clases y Sizing**

**❌ Vanilla Actual:**
```javascript
<button class="bg-white rounded-lg p-4 flex items-center gap-3 hover:shadow-md transition-shadow cursor-pointer">
  <span class="text-3xl">${team.flag}</span>
  <span class="font-semibold text-gray-800">${team.name}</span>
</button>
```

**✅ React Target:**
```jsx
<button className="bg-white rounded-xl px-4 py-3 flex items-center gap-3 w-full lg:w-[150px] hover:shadow-md transition-shadow">
  <span className="text-[32px] leading-none">{team.flag}</span>
  <span className="font-semibold text-[#31363A] text-base">{team.name}</span>
</button>
```

**Cambios necesarios:**
- ✅ `rounded-lg` → `rounded-xl`
- ✅ `p-4` → `px-4 py-3`
- ✅ Agregar `w-full lg:w-[150px]`
- ✅ `text-3xl` → `text-[32px] leading-none`
- ✅ `text-gray-800` → `text-[#31363A] text-base`
- ✅ Remover `cursor-pointer`

---

### 4. **Button variant="alt" - Estilos Incorrectos**

**❌ Vanilla Actual:**
```html
<button class="bg-white border-2 border-[#C2DFFF] text-[#31363A] font-semibold rounded-xl px-4 py-2 flex-1 hover:border-[#006FE8]">
  Primeros
</button>
```

**✅ React Target (variant="alt"):**
```jsx
<Button variant="alt">Primeros</Button>
// Genera:
<div className="">
  <button className="bg-[#BDEDE7] text-[#31363A] hover:bg-[#A8E5DD] active:bg-[#93DDD3] focus:bg-[#BDEDE7] focus:ring-[#7BD0C2] focus:ring-4 focus:outline-none w-full lg:w-fit px-4 py-[10px] h-[48px] text-lg font-semibold rounded-xl transition-all duration-300">
    Primeros
  </button>
</div>
```

**Cambios necesarios:**
- ✅ `bg-white border-2 border-[#C2DFFF]` → `bg-[#BDEDE7]`
- ✅ `py-2` → `py-[10px]`
- ✅ Agregar `h-[48px]`
- ✅ Agregar `text-lg`
- ✅ `hover:border-[#006FE8]` → `hover:bg-[#A8E5DD]`
- ✅ Agregar `focus:bg-[#BDEDE7] focus:ring-[#7BD0C2] focus:ring-4 focus:outline-none`
- ✅ Agregar `transition-all duration-300`
- ✅ Considerar wrapper `<div>` si es necesario

---

### 5. **Sections 2-6 SidePanels - Sin Wrapper**

**❌ Vanilla Actual:**
```html
<div id="matches-section-2" class="rounded-l-xl flex flex-col p-6 w-full lg:w-[467px] min-h-[640px] bg-[rgba(81,90,96,0.06)]">
  <!-- Contenido -->
</div>
```

**✅ React Target:**
```jsx
<SidePanel>
  <MatchesContainer matches={mockMatches} />
</SidePanel>
// Genera:
<div className="bg-brand-darkening w-full lg:max-w-[467px]">
  <div className="mx-auto lg:mx-0 rounded-l-xl flex flex-col lg:px-4 pt-4 lg:pt-6 lg:p-6 w-full max-w-[368px] lg:max-w-full lg:w-[467px] h-[640px]">
    <!-- Contenido -->
  </div>
</div>
```

**Cambios necesarios:**
- ✅ Aplicar mismo patrón de doble wrapper que Section 1
- ✅ `min-h-[640px]` → `h-[640px]`
- ✅ Aplicar a todas las secciones (2, 3, 4, 5, 6)

---

## Mapa de Cambios en `build-vanilla.mjs`

### **HTML Template (Líneas ~100-200)**

#### Section 1 - SidePanel Principal
```javascript
// ANTES (línea ~112):
<div id="side-panel" class="rounded-l-xl flex flex-col p-6 w-full lg:w-[467px] h-[640px] bg-[rgba(81,90,96,0.06)] bg-[url(...)]">

// DESPUÉS:
<div class="bg-brand-darkening w-full lg:max-w-[467px]">
  <div id="side-panel" class="mx-auto lg:mx-0 rounded-l-xl flex flex-col lg:px-4 pt-4 lg:pt-6 lg:p-6 w-full max-w-[368px] lg:max-w-full lg:w-[467px] h-[640px] bg-[url(...)] bg-no-repeat bg-top bg-contain">
```

#### TeamSelection (dentro de Section 1)
```javascript
// ANTES (línea ~114):
<div id="initial-state">
  <div class="flex flex-col items-start mb-6 mt-32">
    <h2 class="text-lg font-semibold text-[#0059BA]">
      Seleccioná tu equipo para explorar tu camino a la gran final 2026
    </h2>
  </div>
  <div id="teams-grid" class="grid grid-cols-2 gap-3"></div>
</div>

// DESPUÉS:
<div id="initial-state">
  <div class="max-w-[360px] lg:max-w-[316px] w-full mx-auto">
    <div class="flex flex-col mb-6 mt-6 lg:mt-32">
      <h2 class="text-xl lg:text-2xl font-semibold text-text-decorative-darker leading-snug">
        Seleccioná tu equipo y explorá el camino a la final
      </h2>
    </div>
    <div id="teams-grid" class="grid grid-cols-2 gap-4 w-full"></div>
    <div class="mt-6">
      <select id="other-team-select" class="w-full bg-white border border-border-primary rounded-xl p-3 text-base font-normal focus:outline-none focus:ring-2 focus:ring-border-primary">
        <option value="">Otro equipo</option>
      </select>
    </div>
  </div>
</div>
```

#### Sections 2-6 - Wrappers
```javascript
// ANTES (líneas ~147, 157, 167, 177, 187):
<div id="[section-id]" class="rounded-l-xl flex flex-col p-6 w-full lg:w-[467px] min-h-[640px] bg-[rgba(81,90,96,0.06)]">

// DESPUÉS (repetir para cada sección):
<div class="bg-brand-darkening w-full lg:max-w-[467px]">
  <div id="[section-id]" class="mx-auto lg:mx-0 rounded-l-xl flex flex-col lg:px-4 pt-4 lg:pt-6 lg:p-6 w-full max-w-[368px] lg:max-w-full lg:w-[467px] h-[640px]">
```

---

### **app.js Template (Líneas ~140-350)**

#### populateTeamsGrid
```javascript
// ANTES (línea ~88):
<button class="bg-white rounded-lg p-4 flex items-center gap-3 hover:shadow-md transition-shadow cursor-pointer">
  <span class="text-3xl">${team.flag}</span>
  <span class="font-semibold text-gray-800">${team.name}</span>
</button>

// DESPUÉS:
<button onclick="handleTeamSelect('${team.id}')" class="bg-white rounded-xl px-4 py-3 flex items-center gap-3 w-full lg:w-[150px] hover:shadow-md transition-shadow">
  <span class="text-[32px] leading-none">${team.flag}</span>
  <span class="font-semibold text-[#31363A] text-base">${team.name}</span>
</button>
```

#### renderFinalPathBanner - Botones
```javascript
// ANTES (línea ~265):
<button class="bg-white border-2 border-[#C2DFFF] text-[#31363A] font-semibold rounded-xl px-4 py-2 flex-1 hover:border-[#006FE8] transition-colors">
  Primeros
</button>

// DESPUÉS:
<div class="flex-1">
  <button class="bg-[#BDEDE7] text-[#31363A] hover:bg-[#A8E5DD] active:bg-[#93DDD3] focus:bg-[#BDEDE7] focus:ring-[#7BD0C2] focus:ring-4 focus:outline-none w-full px-4 py-[10px] h-[48px] text-lg font-semibold rounded-xl transition-all duration-300">
    Primeros
  </button>
</div>
```

#### Agregar populateOtherTeamSelect
```javascript
function populateOtherTeamSelect() {
  const select = document.getElementById('other-team-select');
  if (!select) return;

  select.innerHTML = '<option value="">Otro equipo</option>' + 
    TEAMS.map(t => `<option value="${t.id}">${t.flag} ${t.name}</option>`).join('');
  
  select.addEventListener('change', (e) => {
    if (e.target.value) {
      handleTeamSelect(e.target.value);
    }
  });
}
```

---

## Checklist de Implementación

- [ ] **SidePanel Section 1**: Wrapper doble + padding correcto
- [ ] **TeamSelection**: Wrapper max-w, título responsive, gap-4
- [ ] **TeamSelection**: Agregar Select "Otro equipo"
- [ ] **TeamCard**: rounded-xl, px-4 py-3, w-full lg:w-[150px], text-[32px]
- [ ] **Section 2**: Wrapper doble SidePanel
- [ ] **Section 3**: Wrapper doble SidePanel
- [ ] **Section 4**: Wrapper doble SidePanel
- [ ] **Section 5**: Wrapper doble SidePanel
- [ ] **Section 6**: Wrapper doble SidePanel
- [ ] **FinalPathBanner**: Botones variant="alt" con bg-[#BDEDE7]
- [ ] **app.js**: populateOtherTeamSelect function
- [ ] **DOMContentLoaded**: Llamar populateOtherTeamSelect()

---

## Validación Post-Implementación

1. **Visual**: Comparar screenshot React vs Vanilla
2. **HTML Inspector**: Verificar estructura de wrappers
3. **Responsive**: Probar mobile (max-w-[368px]) y desktop (lg:w-[467px])
4. **Interactividad**: Verificar que "Otro equipo" funciona
5. **Consistencia**: Todos los SidePanels con mismo patrón

---

## Notas Técnicas

- **Doble wrapper** es esencial para el responsive correcto
- **max-w-[368px]** en mobile, **lg:w-[467px]** en desktop
- **bg-brand-darkening** siempre en wrapper exterior
- **bg-[url(...)]** solo en Section 1 cuando `showBackground={true}`
- **Button variant="alt"** usa `bg-[#BDEDE7]` no border blanco
