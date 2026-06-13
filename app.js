let rolActual = 'usuario';

function setActive(element, viewId) {
    // 1. Quitar clase 'active' de todos los items de navegación
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    
    // 2. Poner clase 'active' al item clickeado (si existe)
    if (element) {
        element.classList.add('active');
    }

    // 3. Lista maestra de TODAS las vistas de la aplicación
    const vistas = [
        'vista-inicio', 
        'vista-buscar', 
        'vista-perfil',
        'vista-suscripciones', 
        'vista-invitaciones',
        'vista-pagos', 
        'vista-mensajes', 
        'vista-reclamos',
        'vista-verificador',
        'vista-empresa'
    ];

    // 4. Ocultar todas las vistas de manera segura (evita errores si falta alguna)
    vistas.forEach(id => {
        const vista = document.getElementById(id);
        if (vista) {
            vista.style.display = 'none';
        }
    });

    // 5. Mostrar la vista seleccionada
    const vistaSeleccionada = document.getElementById(viewId);
    if (vistaSeleccionada) {
        vistaSeleccionada.style.display = 'block';
    } else {
        console.warn("Advertencia: La vista " + viewId + " no se encontró.");
    }

    // 6. Hacer scroll automático hacia arriba de manera fluida
    const scrollContent = document.querySelector('.scroll-content');
    if (scrollContent) {
        scrollContent.scrollTop = 0;
    }
}

function cambiarRol(rol) {
    rolActual = rol;
    const body = document.body;
    
    // 1. Resetear temas
    body.classList.remove('theme-verificador', 'theme-empresa');
    
    // 2. Aplicar nuevo tema y redirigir
    if (rol === 'verificador') {
        body.classList.add('theme-verificador');
        setActive(document.querySelectorAll('.nav-item')[2], 'vista-verificador'); // Perfil index 2
    } else if (rol === 'empresa') {
        body.classList.add('theme-empresa');
        setActive(document.querySelectorAll('.nav-item')[2], 'vista-empresa'); // Perfil index 2
    } else {
        // Usuario (default)
        setActive(document.querySelectorAll('.nav-item')[2], 'vista-perfil');
    }
}

function abrirPerfil(element) {
    if (rolActual === 'verificador') {
        setActive(element, 'vista-verificador');
    } else if (rolActual === 'empresa') {
        setActive(element, 'vista-empresa');
    } else {
        setActive(element, 'vista-perfil');
    }
}