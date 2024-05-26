# Fleet Management Software API
![zach-vessels-utMdPdGDc8M-unsplash](https://firebasestorage.googleapis.com/v0/b/laboratoria-945ea.appspot.com/o/fleet-management-api-java%2Fthumb.jpg?alt=media)

## Resumen del Proyecto

En este proyecto he construido la API REST de un Fleet Management Software para consultar las ubicaciones de los vehículos de una empresa de taxis en Beijing, China. Esta API maneja las ubicaciones de casi 10 mil taxis, proporcionando un acceso eficiente y rápido a los datos de ubicación en tiempo real.

## Criterios de Aceptación del Proyecto

Nuestra clienta ha instalado dispositivos GPS en sus taxis, que utilizan señales satelitales para determinar con precisión las coordenadas geográficas del taxi. Los requisitos del proyecto incluyen:

- **Cargar la información de archivos SQL a una base de datos PostgreSQL**.
- **Desarrollar una API REST que permita consultar, mediante peticiones HTTP, la información almacenada en la base de datos**.

## Historias de Usuaria

### Historia de Usuaria 1: Cargar Información a Base de Datos

**Descripción**: Como desarrolladora, quiero cargar la información almacenada en archivos SQL a una base de datos PostgreSQL para facilitar su consulta y análisis.

**Criterios de Aceptación**:
- Se debe implementar el siguiente diagrama de relaciones entre las tablas.
- La tabla de `trajectories` se debe crear con un `id` que se incremente automáticamente (SERIAL).

**Definición de Terminado**:
- La base de datos tiene creada la tabla de `taxis`.
- La tabla de `taxis` tiene cargada la data de taxis.
- La base de datos tiene creada la tabla de `trajectories`.
- La tabla de `trajectories` tiene cargada la data de trayectorias.

### Historia de Usuaria 2: Endpoint Listado de Taxis

**Descripción**: Como clienta de la API REST, requiero un endpoint para listar todos los taxis.

**Criterios de Aceptación**:
- El endpoint responde con `id` y `placa` de cada taxi.
- El endpoint debe paginar los resultados.

**Definición de Terminado**:
- Documentación en Swagger especificando método HTTP, URL, parámetros, encabezados, códigos HTTP de respuesta y cuerpo.
- Code review por al menos una compañera.
- El código del endpoint está en un repositorio de GitHub.
- El endpoint cuenta con tests unitarios y E2E.

### Historia de Usuaria 3: Endpoint Historial de Ubicaciones

**Descripción**: Como clienta de la API REST, requiero un endpoint para consultar todas las ubicaciones de un taxi dado el `id` y una `fecha`.

**Criterios de Aceptación**:
- El endpoint responde con `id` del taxi, `fecha`, `latitud`, `longitud` y `timestamp` (fecha y hora).
- El endpoint debe paginar los resultados.

**Definición de Terminado**:
- Documentación en Swagger especificando método HTTP, URL, parámetros, encabezados, códigos HTTP de respuesta y cuerpo.
- Code review por al menos una compañera.
- El código del endpoint está en un repositorio de GitHub.
- El endpoint cuenta con tests unitarios y E2E.

### Historia de Usuaria 4: Endpoint Última Ubicación

**Descripción**: Como clienta de la API REST, requiero un endpoint para consultar la última ubicación reportada por cada taxi.

**Criterios de Aceptación**:
- El endpoint responde con `id`, `placa`, `latitud`, `longitud` y `timestamp` (fecha y hora) de cada taxi.
- El endpoint debe paginar los resultados.

**Definición de Terminado**:
- Documentación en Swagger especificando método HTTP, URL, parámetros, encabezados, códigos HTTP de respuesta y cuerpo.
- Code review por al menos una compañera.
- El código del endpoint está en un repositorio de GitHub.
- El endpoint cuenta con tests unitarios y E2E.

## Tecnologías Utilizadas

- **Node.js**: Plataforma de desarrollo utilizada para construir la API.
- **TypeScript**: Lenguaje utilizado para añadir tipos estáticos y mejorar la calidad del código.
- **Express**: Framework de Node.js utilizado para construir el servidor y manejar las rutas.
- **Prisma**: ORM (Object-Relational Mapping) utilizado para interactuar con la base de datos PostgreSQL.
- **PostgreSQL**: Sistema de gestión de bases de datos utilizado para almacenar las ubicaciones de los taxis.
- **Swagger**: Herramienta utilizada para documentar la API y proporcionar una interfaz interactiva para probar los endpoints.
- **Jest**: Framework de pruebas utilizado para realizar pruebas unitarias y de integración.
- **Supertest**: Librería utilizada para realizar pruebas de endpoints HTTP.
- **Nodemailer**: Módulo para Node.js utilizado para enviar correos electrónicos con reportes.
- **json2xls**: Librería utilizada para convertir respuestas JSON en archivos Excel.

## Instalación y Uso

1. Clona el repositorio: `git clone https://github.com/tuusuario/fleet-management-api.git`
2. Instala las dependencias: `npm install`
3. Configura las variables de entorno en un archivo `.env`
4. Ejecuta las migraciones de Prisma: `npx prisma migrate dev`
5. Inicia el servidor: `npm run dev`
6. Accede a la documentación de la API en `http://localhost:3001/docs`

## Contribuciones

Si deseas contribuir a este proyecto, por favor sigue estos pasos:
1. Haz un fork del repositorio.
2. Crea una rama para tu feature (`git checkout -b feature/nueva-feature`).
3. Haz commit de tus cambios (`git commit -m 'Añadir nueva feature'`).
4. Haz push a la rama (`git push origin feature/nueva-feature`).
5. Abre un Pull Request.

## Contacto

Para cualquier consulta, no dudes en contactarme en [mile_fall@hotmail.com](mailto:mile_fall@hotmail.com).
