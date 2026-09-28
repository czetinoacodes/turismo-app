## INFORMACIÓN GENERAL - DESCRIPCIÓN DEL PROYECTO

ACOTOURS es una plataforma digital desarrollada para ACODES, S.A. de C.V., especializada en turismo nacional e internacional. 

El sitio funciona como portal informativo donde los usuarios pueden explorar viajes disponibles, visualizando detalles como destino, horarios, servicio de transporte, capacidad de pasajeros y estado actual de cada excursión. Todos los viajes incluyen botones de contacto directo por WhatsApp para reservas e información adicional.

**Funcionalidades actuales:**
- Catálogo de viajes con información completa
- Búsqueda y exploración de destinos
- Contacto directo por WhatsApp
- Interfaz responsiva y moderna

**Mejoras futuras:**
- Panel de administrador para publicar viajes
- Galería de fotos por viaje
- Filtrado por estado de viaje
- Sistema de reservas online

## Características
- Visualización de destinos turísticos
- Búsqueda y filtrado de viajes
- Información detallada de cada viaje (fecha, hora, precio, etc.)
- Interfaz responsiva y moderna
- Gestión de datos con Supabase

## Tecnologías Utilizadas
- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Hosting**: Vercel
- **Almacenamiento**: Supabase Storage (imágenes)

## Requisitos Previos
- Node.js 18+ instalado
- npm o yarn
- Cuenta en Supabase
- Cuenta en Vercel (para deploy)

## Instalación Local

### 1. Clonar el repositorio

```bash
git clone https://github.com/CarlosZetino36/turismo-app.git
cd acotours
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_SUPABASE_URL=*credenciales de SUPABASE*
NEXT_PUBLIC_SUPABASE_ANON_KEY=*credenciales de SUPABASE*
SUPABASE_SERVICE_ROLE_KEY=*credenciales de SUPABASE*
```

**¿Dónde obtener las claves?**
- [Supabase](https://supabase.com)
- Settings → API → Project URL y Anon key

### 4. Ejecutar en desarrollo
```bash
npm run dev
```

Abrir http://localhost:3000 en el navegador.