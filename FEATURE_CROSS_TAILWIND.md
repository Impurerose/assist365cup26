# FEATURE: Cross-Project Tailwind CSS Build

## Problema

El proyecto **assist365cup26** (CakePHP + Twig) utiliza CSS estático compilado de Tailwind (`webroot/assets/styles.css`), pero no tiene Tailwind CSS instalado. Cuando se agregan nuevas clases Tailwind en los templates `.twig`, estas no se compilan automáticamente porque el CSS es estático.

### Estado actual:

- **a365wc2026**: React + Vite con Tailwind CSS instalado
- **assist365cup26**: CakePHP + Twig sin Tailwind, usando CSS estático

### Necesidad:

Agregar clases Tailwind en templates Twig sin tener que instalar Tailwind en el proyecto CakePHP.

---

## Solución: Cross-Project Tailwind Build

Configurar el Tailwind CSS de **a365wc2026** para que escanee archivos del proyecto **assist365cup26** y genere el CSS compilado directamente en su carpeta `webroot/assets/`.

### Ventajas:

1. ✅ **No duplicar instalación** - Un solo Tailwind CSS para ambos proyectos
2. ✅ **Mismos tokens de diseño** - Colores, spacing, tipografía idénticos en React y Twig
3. ✅ **Watch mode** - Regeneración automática al cambiar templates Twig
4. ✅ **Paridad 100%** - Garantiza que React y Twig usen exactamente las mismas clases
5. ✅ **Mantenimiento centralizado** - Cambios en `tailwind.config.js` afectan ambos proyectos

---

## Implementación

### 1. Modificar `tailwind.config.js`

Agregar las rutas del proyecto CakePHP al array `content`:

```javascript
// tailwind.config.js en a365wc2026
export default {
  content: [
    "./index.html", 
    "./src/**/*.{js,jsx,ts,tsx}",
    "./dist-vanilla/**/*.html",
    
    // 👇 NUEVO: Escanear archivos del proyecto CakePHP
    "../assist365cup26/src/templates/**/*.{twig,html}",
    "../assist365cup26/src/webroot/assets/**/*.html"
  ],
  theme: {
    extend: {
      // ... configuración existente
    }
  }
}
```

### 2. Agregar scripts NPM

Agregar nuevos comandos en `package.json` de **a365wc2026**:

```json
{
  "scripts": {
    "build:css:cakephp": "tailwindcss -i ./src/index.css -o ../assist365cup26/src/webroot/assets/styles.css --minify",
    "watch:css:cakephp": "tailwindcss -i ./src/index.css -o ../assist365cup26/src/webroot/assets/styles.css --watch",
    "dev:full": "concurrently \"npm run dev\" \"npm run watch:css:cakephp\""
  }
}
```

### 3. Uso

#### Desarrollo:

```bash
# En a365wc2026
npm run watch:css:cakephp
```

Ahora cualquier cambio en archivos `.twig` regenerará automáticamente `styles.css` en assist365cup26.

#### Producción:

```bash
# En a365wc2026
npm run build:css:cakephp
```

Genera el CSS minificado listo para producción.

---

## Workflow Propuesto

### Escenario 1: Trabajando en React
```bash
cd /home/impurerose/dev/a365wc2026
npm run dev
```

### Escenario 2: Trabajando en Twig templates
```bash
cd /home/impurerose/dev/a365wc2026
npm run watch:css:cakephp
```

### Escenario 3: Trabajando en ambos simultáneamente
```bash
cd /home/impurerose/dev/a365wc2026
npm run dev:full
```
*(Requiere instalar `concurrently`: `npm i -D concurrently`)*

---

## Alternativa: Configuración Separada

Si se prefiere mantener configuraciones completamente independientes:

### Crear `tailwind.config.cakephp.js`

```javascript
// tailwind.config.cakephp.js en a365wc2026
export default {
  content: [
    "../assist365cup26/src/templates/**/*.{twig,html}",
    "../assist365cup26/src/webroot/assets/**/*.html"
  ],
  theme: {
    // ... misma configuración que tailwind.config.js
  }
}
```

### Scripts con configuración específica:

```json
{
  "scripts": {
    "build:css:cakephp": "tailwindcss -c ./tailwind.config.cakephp.js -i ./src/index.css -o ../assist365cup26/src/webroot/assets/styles.css --minify",
    "watch:css:cakephp": "tailwindcss -c ./tailwind.config.cakephp.js -i ./src/index.css -o ../assist365cup26/src/webroot/assets/styles.css --watch"
  }
}
```

---

## Casos de Uso

### 1. Agregar nueva clase en Twig

```twig
{# game_flight.twig #}
<div class="flex items-center gap-2 bg-brand-darkening rounded-xl p-4">
  <!-- Agregar nueva clase como lg:gap-4 -->
</div>
```

Con `watch:css:cakephp` activo, el CSS se regenera automáticamente incluyendo `lg:gap-4`.

### 2. Modificar configuración de diseño

```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      "brand-primary": "#006FE8", // Cambiar color
    }
  }
}
```

Al ejecutar `build:css:cakephp`, tanto React como Twig usan el nuevo color.

### 3. Debugging de clases

```bash
# Ver qué clases se generaron
cat ../assist365cup26/src/webroot/assets/styles.css | grep "gap-4"
```

---

## Consideraciones

### Rutas relativas
Los scripts asumen que ambos proyectos están en:
```
/home/impurerose/dev/
  ├── a365wc2026/          (React + Tailwind)
  └── assist365cup26/       (CakePHP + Twig)
```

Si la estructura cambia, ajustar rutas en:
- `tailwind.config.js` (content paths)
- `package.json` (output path en scripts)

### Performance
- El watch mode solo escanea archivos `.twig` cuando cambian
- El build completo toma ~1-2 segundos
- El CSS minificado es ~50KB (depende de clases usadas)

### Sincronización
Para mantener paridad 100% con vanilla builds:
1. Copiar configuración de `tailwind.config.js` completa
2. Usar mismo `src/index.css` como entrada
3. Regenerar CSS después de cada cambio en templates

---

## Estado de Implementación

- [ ] Modificar `tailwind.config.js` con rutas de assist365cup26
- [ ] Agregar scripts `build:css:cakephp` y `watch:css:cakephp`
- [ ] Probar regeneración con template Twig de ejemplo
- [ ] Verificar que `bg-brand-darkening` se compile correctamente
- [ ] Documentar en README principal
- [ ] Configurar en CI/CD si aplica

---

## Referencias

- Proyecto React: `/home/impurerose/dev/a365wc2026`
- Proyecto CakePHP: `/home/impurerose/dev/assist365cup26`
- CSS output: `/home/impurerose/dev/assist365cup26/src/webroot/assets/styles.css`
- Archivo actual: `FEATURE_CROSS_TAILWIND.md`

---

**Fecha de creación**: 2026-02-05  
**Estado**: Propuesta - Pendiente de implementación
