export default {
    // TODO: add missing info translations
    en: {
        translation: {
            nav: {
                home: 'Home',
                gallery: 'Gallery',
                search: 'Search',
                searchAI: 'AI',
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
                usernameRequired: 'Username is required',
                emailRequired: 'Email is required',
                invalidEmail: 'Invalid email address',
                passwordRequired: 'Password is required',
                passwordLength: 'Password must be at least 8 characters',
                confirmPasswordRequired: 'Please confirm your password',
                passwordsDoNotMatch: 'The passwords do not match',
                registerButton: 'Register',
                loginButton: 'Login',
                registerFailed: 'Registration failed. Please try again.',
                loggingIn: 'Logging in...',
                or: 'or',
                continueAsGuest: 'Continue as Guest',
                uploadWithoutAccount: 'Upload without account',
                tempFilesNote: 'Note: Files will be temporary',
                loginError: 'An error occurred during login',
                joinPixelshift: 'Join PixelShift',
                loginToPixelshift: 'Login to PixelShift',
                redirectingHome:
                    'Registration successful! Redirecting to home...',
            },
            home: {
                upload: 'Upload an image',
                or: 'OR',
                search: 'View images',
                description: `PixelShift is a platform that allows you to upload your
                        images, free of charge, to our servers for safekeep or
                        for sharing with your friends. We offer the ability to
                        save permanently or for a period of time. You can also
                        choose when to delete them.`,
                faq: {
                    title: 'Frequently Asked Questions',
                    questions: [
                        {
                            question: 'What is PixelShift?',
                            answer: 'PixelShift is a platform that allows you to upload, store, and share your images. We offer both permanent and temporary storage options with customizable privacy settings.',
                        },
                        {
                            question: 'How does image compression work?',
                            answer: 'Our compression technology optimizes your images by reducing file size while maintaining visual quality. You can adjust the quality level (1-100) to find the perfect balance between size and clarity.',
                        },
                        {
                            question: 'Is PixelShift free to use?',
                            answer: 'Yes! PixelShift offers a free tier with generous limits. We also offer a premium subscription for users who need additional features and higher upload limits.',
                        },
                        {
                            question: 'How long are temporary images stored?',
                            answer: 'Temporary images are stored for 7 days after upload. After this period, they will be automatically deleted from our servers.',
                        },
                        {
                            question: 'Can I delete my uploaded images?',
                            answer: 'Absolutely! You have full control over your content. You can delete any of your uploaded images at any time from your profile or image detail page.',
                        },
                    ],
                },
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
                temporary: 'Temporary',
                permanent: 'Permanent',
                storageType: 'Storage type',
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
                searchAI: 'IA',
                upload: 'Subir',
                login: 'Iniciar sesión',
                register: 'Registrarse',
                profile: 'Perfil',
                settings: 'Ajustes',
                logout: 'Cerrar sesión',
            },
            auth: {
                username: 'Usuario',
                email: 'Correo electrónico',
                password: 'Contraseña',
                confirmPassword: 'Confirmar contraseña',
                required: 'Este campo es obligatorio',
                loginSuccess: 'Sesión iniciada correctamente',
                registerSuccess: 'Registro completado correctamente',
                usernameRequired: 'El nombre de usuario es obligatorio',
                emailRequired: 'El correo electrónico es obligatorio',
                invalidEmail: 'Dirección de correo electrónico inválida',
                passwordRequired: 'La contraseña es obligatoria',
                passwordLength:
                    'La contraseña debe tener al menos 8 caracteres',
                confirmPasswordRequired: 'Por favor confirma tu contraseña',
                passwordsDoNotMatch: 'Las contraseñas no coinciden',
                registerButton: 'Registrarse',
                loginButton: 'Iniciar sesión',
                registerFailed:
                    'El registro falló. Por favor, inténtalo de nuevo.',
                loggingIn: 'Iniciando sesión...',
                or: 'o',
                continueAsGuest: 'Continuar como Invitado',
                uploadWithoutAccount: 'Subir sin cuenta',
                tempFilesNote: 'Nota: Los archivos serán temporales',
                loginError: 'Ocurrió un error durante el inicio de sesión',
                joinPixelshift: 'Únete a PixelShift',
                loginToPixelshift: 'Iniciar sesión en PixelShift',
                redirectingHome: '¡Registro exitoso! Redirigiendo al inicio...',
            },
            home: {
                upload: 'Subir una imagen',
                or: 'O',
                search: 'Ver imagenes',
                description: `PixelShift es una plataforma que te permite subir tus imagenes
                de forma totalmente gratuita para guardar en nuestros servidores o compartir con tus amigos. PixelShift te permite
                guardar las imagenes de forma permanente o temporalmente. Tambien puedes eliminar imagenes cuando tu decidas.`,
                faq: {
                    title: 'Preguntas Frecuentes',
                    questions: [
                        {
                            question: '¿Qué es PixelShift?',
                            answer: 'PixelShift es una plataforma que te permite subir, almacenar y compartir tus imágenes. Ofrecemos opciones de almacenamiento permanente y temporal con ajustes de privacidad personalizables.',
                        },
                        {
                            question:
                                '¿Cómo funciona la compresión de imágenes?',
                            answer: 'Nuestra tecnología de compresión optimiza tus imágenes reduciendo el tamaño del archivo mientras mantiene la calidad visual. Puedes ajustar el nivel de calidad (1-100) para encontrar el equilibrio perfecto entre tamaño y claridad.',
                        },
                        {
                            question: '¿Es PixelShift gratis?',
                            answer: 'Sí! PixelShift ofrece un nivel gratuito con límites generosos. También ofrecemos una suscripción premium para usuarios que necesitan características adicionales y límites de carga más altos.',
                        },
                        {
                            question:
                                '¿Cuánto tiempo se almacenan las imágenes temporales?',
                            answer: 'Las imágenes temporales se almacenan durante 7 días después de la carga. Después de este periodo, se eliminarán automáticamente de nuestros servidores.',
                        },
                        {
                            question: '¿Puedo eliminar mis imágenes subidas?',
                            answer: 'Por supuesto! Tienes control total sobre tu contenido. Puedes eliminar cualquiera de tus imágenes subidas en cualquier momento desde tu perfil o página de detalles de la imagen.',
                        },
                    ],
                },
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
                temporary: 'Temporal',
                permanent: 'Permanente',
                storageType: 'Tipo de almacenamiento',
            },
            common: {
                loading: 'Cargando...',
                error: 'Ha ocurrido un error',
            },
        },
    },
}
