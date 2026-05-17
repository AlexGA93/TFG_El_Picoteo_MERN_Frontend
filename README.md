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
