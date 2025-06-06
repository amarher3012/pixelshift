# Documentación de PixelShift

## Índice

-   [Visión General](#visión-general)
-   [Configuración del Entorno](#configuración-del-entorno)
    -   [Requisitos Previos](#requisitos-previos)
    -   [Variables de Entorno](#variables-de-entorno)
    -   [Instalación](#instalación)
-   [Arquitectura Backend](#arquitectura-backend)
    -   [Django y Django REST Framework](#django-y-django-rest-framework)
    -   [Estructura de Aplicaciones](#estructura-de-aplicaciones)
    -   [Base de Datos](#base-de-datos)
-   [Sistema de Autenticación](#sistema-de-autenticación)
    -   [JWT (JSON Web Tokens)](#jwt-json-web-tokens)
    -   [Registro y Login](#registro-y-login)
    -   [Permisos y Roles](#permisos-y-roles)
-   [Sistema de Almacenamiento](#sistema-de-almacenamiento)
    -   [AWS S3](#aws-s3)
    -   [Configuración de Almacenamiento](#configuración-de-almacenamiento)
    -   [Gestión de Archivos](#gestión-de-archivos)
-   [Funcionalidad de Compresión](#funcionalidad-de-compresión)
    -   [Niveles de Calidad](#niveles-de-calidad)
    -   [Proceso de Compresión](#proceso-de-compresión)
-   [API Endpoints](#api-endpoints)
    -   [Autenticación](#autenticación)
    -   [Compresión e Imágenes](#compresión-e-imágenes)
-   [Frontend](#frontend)
    -   [React y Componentes](#react-y-componentes)
    -   [Integración con Backend](#integración-con-backend)
    -   [Internacionalización](#internacionalización)
-   [Despliegue](#despliegue)
    -   [AWS EC2 (Backend)](#aws-ec2-backend)
    -   [AWS EC2 (Frontend)](#aws-ec2-frontend)
    -   [Configuración de Producción](#configuración-de-producción)

## Visión General

PixelShift es una plataforma web diseñada para la compresión, almacenamiento y compartición de imágenes y videos. El proyecto está dividido en dos componentes principales:

1. **Frontend**: Desarrollado en React con Tailwind CSS para la interfaz de usuario.
2. **Backend**: Construido con Django y Django REST Framework para la API.

El objetivo principal es ofrecer una alternativa simple, sin publicidad y fácil de usar a las actuales plataformas de compresión y alojamiento de imágenes.

## Configuración del Entorno

### Requisitos Previos

-   Python 3.10+
-   Node.js 16+
-   PostgreSQL 13+
-   Cuenta de AWS para EC2 y S3 (almacenamiento)

### Variables de Entorno

El backend requiere las siguientes variables de entorno:

```
TESTING=False
SECRET_KEY=tu_clave_secreta_django
DEBUG=False

POSTGRES_DB=pixelshift
POSTGRES_USER=usuario_db
POSTGRES_PASSWORD=contraseña_db

AWS_ACCESS_KEY_ID=tu_access_key_id
AWS_SECRET_ACCESS_KEY=tu_secret_access_key
AWS_S3_REGION_NAME=us-east-1
```

### Instalación

#### Backend

1. Clonar el repositorio:

    ```bash
    git clone https://github.com/amarher3012/pixelshift.git
    cd pixelshift
    ```

2. Crear un entorno virtual:

    ```bash
    python -m venv venv
    source venv/bin/activate
    ```

3. Instalar dependencias:

    ```bash
    cd backend
    pip install -r requirements.txt
    ```

4. Configurar la base de datos:

    ```bash
    python manage.py migrate
    ```

5. Iniciar el servidor:
    ```bash
    python manage.py runserver
    ```

#### Frontend

1. Instalar dependencias:

    ```bash
    cd frontend
    npm install
    ```

2. Iniciar el servidor de desarrollo:
    ```bash
    npm run dev
    ```

## Arquitectura Backend

### Django y Django REST Framework

El backend está construido utilizando Django 5.1 con Django REST Framework para la creación de APIs. La estructura principal incluye:

-   **config**: Configuración principal de Django y URLs raíz.
-   **accounts**: Aplicación para la gestión de usuarios.
-   **compression**: Aplicación para la compresión y manejo de imágenes.

### Estructura de Aplicaciones

#### Accounts

Esta aplicación maneja todo lo relacionado con usuarios:

-   Modelo de usuario personalizado
-   Autenticación y autorización
-   Gestión de perfiles

#### Compression

Esta aplicación gestiona:

-   Subida de imágenes
-   Compresión
-   Almacenamiento de imágenes

### Base de Datos

Utilizamos PostgreSQL como sistema de base de datos principal. El schema incluye:

-   **User**: Información de usuario extendida del modelo base de Django.
-   **GuestUser**: Los usuarios que no se han registrado.
-   **CompressedImage**: Las imágenes como tal con sus metadatos y nivel de compresión.

## Sistema de Autenticación

### JWT (JSON Web Tokens)

PixelShift utiliza JWT para la autenticación, gestionado a través de `rest_framework_simplejwt`. Configuraciones:

-   `ACCESS_TOKEN_LIFETIME`: 15 minutos
-   `REFRESH_TOKEN_LIFETIME`: 15 días
-   Rotación de tokens de refresco
-   Lista negra de tokens

Además el token de refresco, es enviado mediante una HTTPOnly cookie para una mayor seguridad.

### Registro y Login

El proceso de registro incluye:

1. Validación de nombre de usuario único
2. Validación de correo electrónico
3. Requisitos de contraseña segura
4. Validación de contraseña

Para el login, un usuario proporciona:

-   Nombre de usuario
-   Contraseña

El sistema devuelve un par de tokens:

-   Token de acceso para autenticación
-   Token de refresco para renovar el token de acceso

### Permisos y Roles

El sistema implementa diferentes niveles de acceso:

-   **Invitados**: Pueden ver imágenes públicas y subir un número limitado de imágenes temporales (5 por hora).
-   **Usuarios registrados**: Pueden subir hasta 25 imágenes por hora y gestionar sus propias imágenes, además eligen si son temporales o permanentes.
-   **Usuarios Premium**: Sin límites de carga y acceso a funcionalidades adicionales.

## Sistema de Almacenamiento

### AWS S3

El almacenamiento de archivos se implementa utilizando AWS S3. Esto proporciona:

-   Alta disponibilidad
-   Durabilidad de datos
-   Escalabilidad
-   Costos optimizados (solo se gasta lo que se utiliza)

### Configuración de Almacenamiento

La configuración utiliza `django-storages` con S3:

```python
STORAGES = {
    "default": {
        "BACKEND": "storages.backends.s3.S3Storage",
        "OPTIONS": {
            "bucket_name": "pixelshift-storage",
            "location": "pixelshift",
        },
    },
    "staticfiles": {
        "BACKEND": "storages.backends.s3.S3Storage",
        "OPTIONS": {
            "bucket_name": "pixelshift-storage",
            "location": "static",
        },
    },
}
```

Para entornos de desarrollo y pruebas, se puede utilizar LocalStack para simular S3 localmente.

### Gestión de Archivos

Los archivos se organizan según estas convenciones:

-   Imágenes permanentes: `/pixelshift/perm/<user_id>/<name>.webp`
-   Imágenes temporales: `/pixelshift/temp/<guest_id>/<name>.webp`
-   Archivos estáticos: `/static/...`

Toda imagen cargada pasa por un proceso de validación antes del almacenamiento.

## Funcionalidad de Compresión

### Niveles de Calidad

Los usuarios pueden especificar un nivel de calidad entre 1-100:

-   **1-30**: Compresión alta, calidad baja
-   **31-70**: Balance equilibrado
-   **71-100**: Calidad alta, compresión baja

### Proceso de Compresión

1. Se recibe la imagen original
2. Se detecta el formato
3. Se aplica la compresión según el nivel de calidad
4. Se comparan tamaños (original vs. comprimido)
5. Se almacena la versión más optimizada

## API Endpoints

### Autenticación

-   `POST /api/accounts/register/`: Registro de nuevos usuarios
-   `POST /api/accounts/login/`: Inicio de sesión
-   `POST /api/accounts/logout/`: Cierre de sesión
-   `POST /api/accounts/refresh/`: Actualización de token
-   `GET /api/accounts/profile/`: Información del perfil de usuario

### Compresión e Imágenes

-   `GET /api/compression/images/`: Lista de imágenes (filtrable)
-   `GET /api/compression/images/{id}/`: Detalles de una imagen
-   `PUT /api/compression/images/{id}/`: Actualizar información de imagen (reemplazo completo)
-   `PATCH /api/compression/images/{id}/`: Actualizar información parcial de imagen
-   `DELETE /api/compression/images/{id}/`: Eliminar imagen
-   `GET /api/compression/upload/`: Consultar información sobre carga de imágenes
-   `POST /api/compression/upload/`: Subir y comprimir una nueva imagen
-   `GET /api/compression/user-images/`: Obtener imágenes del usuario actual

También se puede ver en la propia documentación de la API mediante el siguiente [enlace](https://api.axmh.tech/api/docs/)

## Frontend

### React y Componentes

El frontend está estructurado utilizando componentes React para una arquitectura modular:

-   **Layout**: Componentes estructurales (navbar, footer, etc.)
-   **Auth**: Componentes de autenticación (login, registro, logout)
-   **AuthContext**: Contexto de autenticación para hacer esta global.
-   **Upload**: Componente de subida de imagen (llamada al endpoint de subida de imagen)

### Integración con Backend

La comunicación con el backend se realiza mediante:

-   Axios para peticiones HTTPS
-   Interceptores para gestión de tokens

### Internacionalización

El sistema implementa i18n con soporte para múltiples idiomas:

-   Inglés
-   Español

Los archivos de traducción están en `/frontend/src/translations/translations.ts`. Se podrían añadir más idiomas añadiendo a ese archivo con facilidad.

## Despliegue

### AWS EC2 (Backend)

El backend se despliega en AWS EC2 siguiendo estas prácticas:

-   Uso de Gunicorn como servidor WSGI
-   Nginx como proxy inverso
-   Certificados SSL mediante Let's Encrypt
-   Monitorización con Supervisor

### AWS EC2 (Frontend)

El frontend se despliega como el backend en una máquina EC2

### Configuración de Producción

Ajustes importantes para entorno de producción:

-   `DEBUG = False`
-   Configuración adecuada de CORS
-   Uso de variables de entorno seguras
-   Eliminación de variable `TESTING` en producción

---

_Esta documentación está sujeta a actualizaciones. Última revisión: 05/06/2025._
