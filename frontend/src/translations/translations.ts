export default {
    // TODO: add missing info translations
    en: {
        translation: {
            nav: {
                home: 'Home',
                gallery: 'Gallery',
                search: 'Search',
                upload: 'Upload',
                login: 'Login',
                register: 'Register',
                profile: 'Profile',
                settings: 'Settings',
                logout: 'Logout',
            },
            auth: {
                username: 'Username',
                email: 'Email',
                password: 'Password',
                confirmPassword: 'Confirm Password',
                required: 'This field is required',
                loginSuccess: 'Login successful',
                registerSuccess: 'Registration successful',
            },
            home: {
                upload: 'Upload an image',
                or: 'OR',
                search: 'Search',
                description: `PixelShift is a platform that allows you to upload your
                        images, free of charge, to our servers for safekeep or
                        for sharing with your friends. We offer the ability to
                        save permanently or for a period of time. You can also
                        choose when to delete them.`,
            },
            upload: {
                title: 'Upload Image',
                name: 'Name',
                nameRequired: 'This field is required',
                description: 'Description (optional)',
                imageRequired: 'Image is required',
                quality: 'Quality (1-100)',
                qualityError: 'Quality must be between 1–100',
                savePermanently: 'Save permanently?',
                makePublic: 'Make public?',
                uploadButton: 'Upload!',
                uploading: 'Uploading...',
                refreshing: 'Refreshing token...',
                uploadComplete: 'Upload complete! Taking you to your images...',
                errors: {
                    guestLimit: 'Guests can only upload 5 images per hour',
                    freeLimit: 'Free users can only upload 25 images per hour',
                    uploadFailed: 'Upload failed. Please try again.',
                },
            },
            imageHub: {
                title: 'Image Gallery',
                filters: 'Filters',
                filterByName: 'Filter by name...',
                filterByCreator: 'Filter by creator...',
                sortBy: {
                    newest: 'Newest first',
                    oldest: 'Oldest first',
                    name: 'Name A-Z',
                },
                noImages: 'No images found matching your filters',
            },
        },
    },
    es: {
        translation: {
            nav: {
                home: 'Inicio',
                gallery: 'Galería',
                search: 'Buscar',
                upload: 'Subir',
                login: 'Iniciar sesión',
                register: 'Registrarse',
                profile: 'Perfil',
                settings: 'Ajustes',
                logout: 'Cerrar sesión',
            },
            home: {
                upload: 'Subir una imagen',
                or: 'O',
                search: 'Buscar',
                description: `PixelShift es una plataforma que te permite subir tus imagenes
                de forma totalmente gratuita para guardar en nuestros servidores o compartir con tus amigos. PixelShift te permite
                guardar las imagenes de forma permanente o temporalmente. Tambien puedes eliminar imagenes cuando tu decidas.`,
            },
            auth: {
                username: 'Usuario',
                email: 'Correo electrónico',
                password: 'Contraseña',
                confirmPassword: 'Confirmar contraseña',
                required: 'Este campo es obligatorio',
                loginSuccess: 'Sesión iniciada correctamente',
                registerSuccess: 'Registro completado correctamente',
            },
            upload: {
                title: 'Subir Imagen',
                name: 'Nombre',
                nameRequired: 'Este campo es requerido',
                description: 'Descripción (opcional)',
                imageRequired: 'La imagen es requerida',
                quality: 'Calidad (1-100)',
                qualityError: 'La calidad debe estar entre 1-100',
                savePermanently: '¿Guardar permanentemente?',
                makePublic: '¿Hacer público?',
                uploadButton: '¡Subir!',
                uploading: 'Subiendo...',
                refreshing: 'Actualizando token...',
                uploadComplete:
                    '¡Subida completada! Redirigiendo a tus imágenes...',
                errors: {
                    guestLimit:
                        'Los invitados solo pueden subir 5 imágenes por hora',
                    freeLimit:
                        'Los usuarios gratuitos solo pueden subir 25 imágenes por hora',
                    uploadFailed:
                        'Error al subir. Por favor, inténtalo de nuevo.',
                },
            },
            imageHub: {
                title: 'Galería de imágenes',
                filters: 'Filtros',
                filterByName: 'Filtrar por nombre...',
                filterByCreator: 'Filtrar por creador...',
                sortBy: {
                    newest: 'Más recientes primero',
                    oldest: 'Más antiguos primero',
                    name: 'Nombre A-Z',
                },
                noImages:
                    'No se encontraron imágenes con los filtros aplicados',
            },
        },
    },
}
