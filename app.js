let rolActual = 'usuario';
let miMapa = null;
let markersLayer = null;

// locationsData is loaded from data.js

function crearMarcador(loc, originalIndex) {
    const markerHtmlStyles = `
        background-color: ${loc.color};
        width: 1.5rem;
        height: 1.5rem;
        display: block;
        left: -0.75rem;
        top: -0.75rem;
        position: relative;
        border-radius: 3rem 3rem 0;
        transform: rotate(45deg);
        border: 2px solid #FFFFFF;
        box-shadow: 0 4px 6px rgba(0,0,0,0.3);
    `;
    
    const customIcon = L.divIcon({
        className: "custom-pin",
        iconAnchor: [0, 24],
        labelAnchor: [-6, 0],
        popupAnchor: [0, -24],
        html: `<span style="${markerHtmlStyles}"></span>`
    });
    
    let popupContent = `<div style="text-align:center; padding-bottom:4px;">`;
    popupContent += `<b style="font-size:14px; color:#1E293B; display:block; margin-bottom:4px;">${loc.name}</b>`;
    popupContent += `<span style="color:#64748B; font-size:11px; display:block;">Horario: ${loc.horario}</span>`;
    popupContent += `<span style="color:#439B8F; font-weight:600; font-size:11px; display:block; margin-top:2px;">Últ. act: ${loc.lastUpdate}</span>`;
    
    if (loc.type !== 'puntos_verdes') {
        popupContent += `<button onclick="abrirStock(${originalIndex})" style="margin-top:10px; background: #2D8B71; color: white; border: none; padding: 6px 14px; border-radius: 8px; font-weight: 600; font-size: 13px; cursor: pointer; box-shadow: 0 2px 4px rgba(45,139,113,0.3); width: 100%;">Ver Stock</button>`;
    }
    
    popupContent += `</div>`;
    
    return L.marker([loc.lat, loc.lng], {icon: customIcon}).bindPopup(popupContent);
}

function filtrarMapa(categoria) {
    if (!miMapa) {
        // If map isn't initialized yet, we must force the view to open
        document.querySelectorAll('.nav-item')[1].click(); // Click "Buscar"
    }
    
    // Esperamos un poquito por si el mapa se acaba de inicializar
    setTimeout(() => {
        if (markersLayer) {
            miMapa.removeLayer(markersLayer);
        }
        
        markersLayer = L.layerGroup().addTo(miMapa);
        
        const filtrados = locationsData.filter(loc => loc.type === categoria);
        
        filtrados.forEach(loc => {
            const originalIndex = locationsData.indexOf(loc);
            crearMarcador(loc, originalIndex).addTo(markersLayer);
        });
        
        if (filtrados.length > 0) {
            const group = new L.featureGroup(markersLayer.getLayers());
            miMapa.fitBounds(group.getBounds(), {padding: [30, 30], maxZoom: 15});
        }
    }, 150);
}

function abrirStock(index) {
    const loc = locationsData[index];
    const modal = document.getElementById('modal-stock');
    const title = document.getElementById('modal-stock-title');
    const list = document.getElementById('modal-stock-list');
    
    title.textContent = "Stock: " + loc.name;
    list.innerHTML = "";
    
    loc.stock.forEach(item => {
        const row = document.createElement('div');
        row.style.cssText = "display: flex; justify-content: space-between; align-items: center; padding: 16px; background: #F8FAFC; border-radius: 16px; border: 1px solid #E2E8F0;";
        
        const isLow = item.qty === 'Agotado' || item.qty === 'Lleno';
        const qtyColor = isLow ? '#EF4444' : '#2D8B71';
        
        row.innerHTML = `
            <span style="font-weight: 600; color: #1E293B; font-size: 15px;">${item.item}</span>
            <span style="font-weight: 700; color: ${qtyColor}; font-size: 15px;">${item.qty}</span>
        `;
        list.appendChild(row);
    });
    
    modal.style.display = 'flex';
}

function cerrarStock() {
    document.getElementById('modal-stock').style.display = 'none';
}

function buscarProducto(query) {
    const contenedor = document.getElementById('resultados-busqueda');
    if (!query || query.trim().length === 0) {
        contenedor.style.display = 'none';
        return;
    }
    
    query = query.toLowerCase().trim();
    const resultados = [];
    
    locationsData.forEach((loc, locIndex) => {
        loc.stock.forEach(stockItem => {
            if (stockItem.item.toLowerCase().includes(query)) {
                resultados.push({
                    locIndex: locIndex,
                    tienda: loc.name,
                    item: stockItem.item,
                    qty: stockItem.qty
                });
            }
        });
    });
    
    if (resultados.length > 0) {
        contenedor.innerHTML = '';
        resultados.forEach(res => {
            const div = document.createElement('div');
            div.style.cssText = "padding: 12px 16px; border-bottom: 1px solid #F1F5F9; cursor: pointer; display: flex; flex-direction: column;";
            div.onclick = () => seleccionarProducto(res.locIndex);
            
            div.innerHTML = `
                <span style="font-weight: 600; color: #1E293B; font-size: 14px;">${res.item}</span>
                <span style="color: #64748B; font-size: 12px;">En: ${res.tienda} • <b style="color: #2D8B71;">${res.qty}</b></span>
            `;
            
            contenedor.appendChild(div);
        });
        contenedor.style.display = 'block';
    } else {
        contenedor.innerHTML = '<div style="padding: 12px 16px; color: #64748B; font-size: 13px; text-align: center;">No se encontraron resultados</div>';
        contenedor.style.display = 'block';
    }
}

function seleccionarProducto(locIndex) {
    document.getElementById('resultados-busqueda').style.display = 'none';
    document.getElementById('input-busqueda').value = '';
    
    if (!miMapa) {
        document.querySelectorAll('.nav-item')[1].click(); // Forzamos abrir vista mapa si no está
    }
    
    setTimeout(() => {
        if (markersLayer) {
            miMapa.removeLayer(markersLayer);
        }
        markersLayer = L.layerGroup().addTo(miMapa);
        
        const loc = locationsData[locIndex];
        const marker = crearMarcador(loc, locIndex).addTo(markersLayer);
        
        miMapa.setView([loc.lat, loc.lng], 16);
        
        setTimeout(() => {
            marker.openPopup();
        }, 300);
    }, 150);
}

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
        
        // Initialize or adjust the Leaflet map when 'vista-buscar' is active
        if (viewId === 'vista-buscar') {
            if (!miMapa) {
                // Initialize map centered in Concepción
                miMapa = L.map('map-concepcion').setView([-36.826279, -73.049774], 14);
                
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; OpenStreetMap contributors'
                }).addTo(miMapa);
            }
            
            // Allow container to render before invalidating size
            setTimeout(() => {
                if(miMapa) miMapa.invalidateSize();
            }, 100);
        }
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