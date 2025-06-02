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
                pagination: {
                    previous: 'Previous',
                    next: 'Next',
                    page: 'Page {{current}} of {{total}}',
                },
                dateRange: {
                    all: 'All time',
                    today: 'Today',
                    week: 'This week',
                    month: 'This month',
                },
                back: 'Back to gallery',
            },
            profile: {
                title: 'User Profile',
                info: 'Account Information',
                username: 'Username',
                email: 'Email Address',
                status: 'Account Status',
                premium: 'Premium',
                free: 'Free',
                statistics: 'Statistics',
                uploads: 'Total Uploads',
                noUploads: 'No uploads yet',
                recentUploads: 'Recent Uploads',
                viewAll: 'View all images',
                upgradeAccount: 'Upgrade Account',
            },
            info: {
                first: {
                    title: 'Secure Image Storage',
                    description:
                        'Store your images securely in the cloud. Access them from anywhere, anytime. Share with friends or keep them private - you have full control.',
                },
                second: {
                    title: 'Optimized Compression',
                    description:
                        'Choose the perfect balance between quality and file size. Our advanced compression technology ensures your images look great while saving space.',
                },
                third: {
                    title: 'Privacy Controls',
                    description:
                        'Decide who can see your images. Make them public, keep them private, or share with specific people. You control your content.',
                },
            },
            footer: {
                yourTrustedPlatform:
                    'Your trusted platform for image storage and compression.',
                links: 'Links',
                contactInfo: 'Contact Information',
                allRightsReserved: 'All rights reserved.',
                github: 'GitHub',
                email: 'Email',
            },
            imageDetail: {
                uploadedBy: 'Uploaded by',
                premium: 'Premium',
                edit: 'Edit',
                save: 'Save',
                cancel: 'Cancel',
                delete: 'Delete',
                deleteConfirm: 'Are you sure you want to delete this image?',
                quality: 'Quality',
                uploaded: 'Uploaded',
                addDescription: 'Add a description...',
                relatedImages: 'Related Images',
                imageNotFound: 'Image not found',
                loading: 'Loading...',
                failedToLoad: 'Failed to load image',
                failedToUpdate: 'Failed to update image',
                failedToDelete: 'Failed to delete image',
            },
            common: {
                loading: 'Loading...',
                error: 'An error occurred',
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
                pagination: {
                    previous: 'Anterior',
                    next: 'Siguiente',
                    page: 'Página {{current}} de {{total}}',
                },
                dateRange: {
                    all: 'Todas',
                    today: 'Hoy',
                    week: 'Esta semana',
                    month: 'Este mes',
                },
                back: 'Volver a la galería',
            },
            profile: {
                title: 'Perfil de Usuario',
                info: 'Información de la Cuenta',
                username: 'Nombre de Usuario',
                email: 'Correo Electrónico',
                status: 'Estado de la Cuenta',
                premium: 'Premium',
                free: 'Gratuita',
                statistics: 'Estadísticas',
                uploads: 'Total de Subidas',
                noUploads: 'Aún no hay subidas',
                recentUploads: 'Subidas Recientes',
                viewAll: 'Ver todas las imágenes',
                upgradeAccount: 'Mejorar Cuenta',
            },
            info: {
                first: {
                    title: 'Almacenamiento Seguro',
                    description:
                        'Guarda tus imágenes de forma segura en la nube. Accede a ellas desde cualquier lugar, en cualquier momento. Compártelas con amigos o mantenlas privadas - tú tienes el control total.',
                },
                second: {
                    title: 'Compresión Optimizada',
                    description:
                        'Elige el equilibrio perfecto entre calidad y tamaño de archivo. Nuestra tecnología de compresión avanzada garantiza que tus imágenes se vean geniales mientras ahorras espacio.',
                },
                third: {
                    title: 'Control de Privacidad',
                    description:
                        'Decide quién puede ver tus imágenes. Hazlas públicas, mantenlas privadas o compártelas con personas específicas. Tú controlas tu contenido.',
                },
            },
            footer: {
                yourTrustedPlatform:
                    'Tu plataforma de confianza para almacenamiento y compresión de imágenes.',
                links: 'Enlaces',
                contactInfo: 'Información de Contacto',
                allRightsReserved: 'Todos los derechos reservados.',
                github: 'GitHub',
                email: 'Correo Electrónico',
            },
            imageDetail: {
                uploadedBy: 'Subido por',
                premium: 'Premium',
                edit: 'Editar',
                save: 'Guardar',
                cancel: 'Cancelar',
                delete: 'Eliminar',
                deleteConfirm:
                    '¿Estás seguro de que quieres eliminar esta imagen?',
                quality: 'Calidad',
                uploaded: 'Subida',
                addDescription: 'Añadir una descripción...',
                relatedImages: 'Imágenes relacionadas',
                imageNotFound: 'Imagen no encontrada',
                loading: 'Cargando...',
                failedToLoad: 'Error al cargar la imagen',
                failedToUpdate: 'Error al actualizar la imagen',
                failedToDelete: 'Error al eliminar la imagen',
            },
            common: {
                loading: 'Cargando...',
                error: 'Ha ocurrido un error',
            },
        },
    },
}
