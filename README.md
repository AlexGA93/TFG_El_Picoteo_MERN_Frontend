# TFG El Picoteo - Frontend (Angular)

Aplicación frontend del proyecto **El Picoteo** para la gestión interna (dashboard, inventario, recetas, ventas, gastos, sala) y la parte pública (welcome, menú y carrito).

## Stack

- Angular 19
- TypeScript
- RxJS
- PrimeNG + PrimeIcons
- Tailwind CSS + Bootstrap
- ngx-translate (i18n ES/EN)
- Lucide Angular (iconografía)

## Requisitos

- Node.js 18+ (recomendado 20 LTS)
- npm 9+
- Backend del proyecto MERN corriendo en local

## Instalación y arranque

```bash
npm install
npm run start
```

La app arranca por defecto en:

- Frontend: `http://localhost:4200`
- API (configurada): `http://localhost:5000/api`

Configuración actual de entorno:

- `src/env/environment.ts`
- `baseUrl: "http://localhost:5000/api"`

## Scripts disponibles

- `npm run start`: levanta servidor de desarrollo (`ng serve`)
- `npm run build`: compila para producción (`dist/`)
- `npm run watch`: build en modo watch para desarrollo
- `npm run test`: tests unitarios con Karma/Jasmine
- `npm run tauri:dev`: arranca la app en modo escritorio (Tauri + Angular dev server)
- `npm run tauri:build`: genera instalables/binarios de escritorio con Tauri

## Generar app de escritorio con Tauri (Linux y Windows)

### 1) Dependencias comunes

```bash
npm install
npm install @tauri-apps/api
npm install -D @tauri-apps/cli
```

Instalar Rust (si no lo tienes):

```bash
curl https://sh.rustup.rs -sSf | sh
source "$HOME/.cargo/env"
rustc --version
cargo --version
```

### 2) Configuración inicial de Tauri (solo primera vez)

```bash
npx tauri init
```

Valores recomendados para este proyecto:

- `devUrl`: `http://localhost:4200`
- `beforeDevCommand`: `npm run start`
- `beforeBuildCommand`: `npm run build`
- `frontendDist`: `../dist/tfg-el-picoteo-mern-frontend/browser`

### 3) Linux: prerrequisitos del sistema

En Debian/Ubuntu:

```bash
sudo apt update
sudo apt install -y \
  build-essential \
  curl \
  wget \
  file \
  libxdo-dev \
  libssl-dev \
  libayatana-appindicator3-dev \
  librsvg2-dev
```

En Arch Linux:

```bash
sudo pacman -Syu --needed \
  base-devel \
  curl \
  wget \
  file \
  libxdo \
  openssl \
  libayatana-appindicator \
  librsvg
```

Probar en local:

```bash
npm run tauri:dev
```

Generar binarios/instalables:

```bash
npm run tauri:build
```

Salida esperada en:

- `src-tauri/target/release/bundle/`

### 4) Windows: prerrequisitos del sistema

Instalar:

1. **Microsoft Visual Studio C++ Build Tools** (Desktop development with C++)
2. **WebView2** (normalmente ya viene en Windows 11)
3. **Rust (MSVC toolchain)** con `rustup`

Probar en local (PowerShell/CMD):

```bash
npm run tauri:dev
```

Generar `.msi`/`.exe`:

```bash
npm run tauri:build
```

Salida esperada en:

- `src-tauri\target\release\bundle\`

### 5) Nota importante sobre cross-compilación

Genera cada instalable en su sistema destino:

- Build de Linux desde Linux
- Build de Windows desde Windows

La cross-compilación entre ambos sistemas no es el flujo recomendado para este proyecto.

## Instalar los paquetes generados por Tauri

Actualmente el build Linux está configurado para generar:

- `.deb` (Debian/Ubuntu)
- `.rpm` (Fedora/RHEL/openSUSE)

Rutas de salida:

- `src-tauri/target/release/bundle/deb/`
- `src-tauri/target/release/bundle/rpm/`

### Debian/Ubuntu (instalar `.deb`)

```bash
cd src-tauri/target/release/bundle/deb
sudo apt install ./elpicoteo_0.1.0_amd64.deb
```

Alternativa:

```bash
sudo dpkg -i elpicoteo_0.1.0_amd64.deb
sudo apt -f install
```

### Fedora/RHEL/openSUSE (instalar `.rpm`)

Fedora/RHEL:

```bash
cd src-tauri/target/release/bundle/rpm
sudo dnf install ./elpicoteo-0.1.0-1.x86_64.rpm
```

openSUSE:

```bash
cd src-tauri/target/release/bundle/rpm
sudo zypper install ./elpicoteo-0.1.0-1.x86_64.rpm
```

### Arch Linux

Arch no instala `.deb` de forma nativa. Opciones recomendadas:

1. Generar e instalar un paquete nativo de Arch (PKGBUILD) para el proyecto.
2. Usar el binario compilado directamente:

```bash
./src-tauri/target/release/app
```

Opciones no recomendadas para producción (solo pruebas):

- Convertir `.deb` con `debtap`.
- Convertir `.rpm/.deb` con `alien`.

Si necesitas, en un siguiente paso puedo prepararte un `PKGBUILD` mínimo para instalarlo bien en Arch con `makepkg -si`.

## Procedimiento oficial para Arch Linux

Este proyecto ya incluye empaquetado nativo Arch en `packaging/arch/PKGBUILD`.

### 1) Preparar dependencias (una sola vez)

```bash
sudo pacman -Syu --needed \
  base-devel \
  nodejs npm \
  rustup \
  webkit2gtk-4.1 \
  gtk3
rustup default stable
```

### 2) Instalar dependencias del proyecto

```bash
npm install
```

### 3) Generar paquete Arch

```bash
npm run arch:build
```

Este comando:

1. compila Angular + Tauri (`npm run tauri:build`)
2. copia binario e icono a `packaging/arch`
3. ejecuta `makepkg -f`

### 4) Instalar el paquete generado

```bash
sudo pacman -U packaging/arch/elpicoteo-desktop-0.1.0-1-x86_64.pkg.tar.zst
```

### 5) Ejecutar la app

```bash
elpicoteo
```

### 6) Actualizar tras cambios

```bash
npm run arch:build
sudo pacman -U packaging/arch/elpicoteo-desktop-0.1.0-1-x86_64.pkg.tar.zst
```

### 7) Desinstalar

```bash
sudo pacman -Rns elpicoteo-desktop
```

## Estructura del proyecto

```text
src/
  app/
    pages/
      public/      # rutas públicas (welcome + auth)
      private/     # rutas privadas (dashboard y módulos de gestión)
    services/      # servicios HTTP y estado de dominio
    guards/        # control de acceso por autenticación
    pipes/         # pipes personalizados (fecha, unidades, etc.)
    utils/         # helpers reutilizables
  assets/i18n/     # traducciones (es.json, en.json)
  types/           # tipados de dominio (inventario, recetas, etc.)
```

## Routing (alto nivel)

Rutas raíz definidas en `src/app/app.routes.ts`:

- `/public/*`: zona pública
- `/private/*`: zona privada
- `''` y `**`: redirigen a `/public/welcome`

### Zona pública

`src/app/pages/public/public.routes.ts`

- `auth/*`: autenticación
- `welcome/*`: páginas públicas

`src/app/pages/public/auth/auth.routes.ts`

- `login`: página de login con `guestGuard`

### Zona privada

`src/app/pages/private/private.routes.ts`

- Layout privado protegido por `authGuard`
- Módulos: `dashboard`, `recetas`, `stock`, `inventario`, `ingredientes`, `ventas`, `gastos`, `dinning-room`

## Autenticación y guards

Servicio base: `src/app/services/authentication.service.ts`

- Guarda token JWT en `localStorage` con clave `user`
- `isAuthenticated()` valida presencia de token

Guards:

- `authGuard`: protege rutas privadas (si no hay token, redirige a login)
- `guestGuard`: protege login para invitados (si hay token, redirige a `/private/dashboard`)

Flujo esperado:

1. Usuario sin token puede entrar en `/public/auth/login`.
2. Usuario con token que entra en `/public/auth/login` es redirigido a `/private/dashboard`.
3. Usuario sin token no puede navegar por `/private/*`.

## Internacionalización (i18n)

Se usa `@ngx-translate/core` con ficheros en:

- `src/assets/i18n/es.json`
- `src/assets/i18n/en.json`

Recomendaciones de mantenimiento:

- Mantener mismas claves en ambos idiomas.
- Evitar hardcodear textos en componentes si ya existen claves de traducción.

## Convenciones funcionales relevantes

- Unidades válidas de inventario/formularios: `kg`, `litros`, `unidad`, `metros`, `gramos`.
- En formularios críticos, usar selectores con catálogo cerrado para evitar datos inconsistentes.
- Tipos de dominio centralizados en `src/types`.

## Integración con backend

El frontend consume endpoints REST del backend usando servicios en `src/app/services/*`.
Antes de probar flujos funcionales (login, inventario, recetas...), verifica:

1. Backend activo en el puerto esperado.
2. `environment.baseUrl` correcto para tu entorno.
3. CORS habilitado en backend para `http://localhost:4200`.

## Checklist rápido para desarrollo

1. Levantar backend.
2. Ejecutar `npm run start`.
3. Verificar login en `/public/auth/login`.
4. Confirmar redirección a `/private/dashboard` con sesión activa.
5. Probar módulos principales privados.

## Mejoras recomendadas de documentación futura

- Añadir diagrama de arquitectura frontend-backend.
- Documentar contrato de endpoints por módulo (auth, recetas, inventario, ventas...).
- Añadir guía de despliegue (entornos staging/producción).
- Incorporar estrategia de testing (unit/integration/e2e) por feature.
