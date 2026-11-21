# Río Magangué 🚢

Aplicación web de gestión del transporte fluvial del puerto de Magangué, Bolívar (Colombia).  
Caso práctico universitario de integración continua.

## Stack

- **Vite + React + TypeScript** (mobile-first, max 480 px)
- **Sin backend**: datos en `localStorage`
- **Pruebas**: Vitest + Testing Library + jsdom
- **CI/CD**: GitHub Actions → GitHub Pages

## Comandos

```bash
npm install        # instalar dependencias
npm run dev        # servidor de desarrollo (localhost:5173)
npm test           # ejecutar pruebas una sola vez
npm run test:watch # pruebas en modo observador
npm run build      # compilar para producción
npm run coverage   # cobertura de pruebas
```

## Usuarios de prueba

| Usuario      | Contraseña    | Rol       |
|--------------|---------------|-----------|
| `pasajero`   | `pasajero123` | Pasajero  |
| `operador220`| `operador123` | Operador  |
| `taquilla`   | `taquilla123` | Taquilla  |
| `admin`      | `admin123`    | Admin     |

## Regla del código de embarcación `#NNN`

El código es `"#"` seguido de 3 dígitos. `#000` no es válido.

| Rango       | Tipo      |
|-------------|-----------|
| #001 – #199 | FLOTA     |
| #200 – #599 | CHALUPA   |
| #600 – #899 | CARGUERA  |
| #900 – #999 | RESERVADO |

## Embarcaciones de ejemplo

| Código | Nombre            | Tipo     | Destino  | Precio   |
|--------|-------------------|----------|----------|----------|
| #012   | Expreso del Río   | FLOTA    | Mompox   | $25.000  |
| #098   | La Mojanera       | FLOTA    | Majagual | $30.000  |
| #220   | Rápido 220        | CHALUPA  | Mompox   | $35.000  |
| #231   | La Achiera        | CHALUPA  | Achí     | $30.000  |
| #305   | Veloz del Sur     | CHALUPA  | Pinillos | $32.000  |
| #605   | Don Chepe         | CARGUERA | Mompox   | —        |
| #720   | La Bodeguera      | CARGUERA | Majagual | —        |

## Colores

| Variable   | Uso                        |
|------------|----------------------------|
| `#0B4F6C`  | Azul río (primario)        |
| `#2E8B57`  | Verde (lista para zarpar)  |
| `#F2A900`  | Ámbar (embarcando)         |
| `#C0392B`  | Rojo (errores)             |
