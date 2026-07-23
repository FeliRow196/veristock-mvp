let rolActual = 'usuario';
let miMapa = null;
let markersLayer = null;

// Nuevas variables de estado para reservas
let saldoUsuario = 4500;
let tieneSuscripcion = true;
let usosSuscripcion = 3;
let reservaActual = null;
let misReservas = [];

function actualizarSaldoUI() {
    const texts = [document.getElementById('saldo-text'), document.getElementById('perfil-saldo-text')];
    texts.forEach(el => {
        if (el) el.textContent = "$" + saldoUsuario.toLocaleString('es-CL');
    });
}

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
        
        if (!isLow && loc.type !== 'puntos_verdes') {
            row.style.cursor = 'pointer';
            row.onclick = () => iniciarReserva(loc.name, item.item);
            row.style.boxShadow = "0 2px 4px rgba(0,0,0,0.02)";
        }
        
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

function iniciarReserva(tiendaNombre, itemName) {
    reservaActual = { tiendaNombre, itemName };
    
    document.getElementById('reserva-desc').innerHTML = `¿Deseas reservar <b>${itemName}</b> en <b>${tiendaNombre}</b>?`;
    
    const btnSaldo = document.getElementById('btn-reserva-saldo');
    const btnSuscripcion = document.getElementById('btn-reserva-suscripcion');
    
    // Verificar Saldo
    if (saldoUsuario >= 400) {
        btnSaldo.style.display = 'block';
        btnSaldo.textContent = `Pagar $400 con Saldo (Tienes $${saldoUsuario.toLocaleString('es-CL')})`;
    } else {
        btnSaldo.style.display = 'none';
    }
    
    // Verificar Suscripción
    if (tieneSuscripcion && usosSuscripcion > 0) {
        btnSuscripcion.style.display = 'block';
        btnSuscripcion.textContent = `Usar Suscripción (${usosSuscripcion} usos rest.)`;
    } else {
        btnSuscripcion.style.display = 'none';
    }
    
    document.getElementById('modal-reserva').style.display = 'flex';
}

function cerrarReserva() {
    document.getElementById('modal-reserva').style.display = 'none';
    reservaActual = null;
}

function confirmarReserva(metodo) {
    if (!reservaActual) return;
    
    if (metodo === 'saldo') {
        saldoUsuario -= 400;
        actualizarSaldoUI();
    } else if (metodo === 'suscripcion') {
        usosSuscripcion -= 1;
    }
    
    misReservas.push({
        tiendaNombre: reservaActual.tiendaNombre,
        itemName: reservaActual.itemName,
        fecha: new Date(),
        metodo: metodo
    });
    
    cerrarReserva();
    cerrarStock();
    
    setActive(document.querySelectorAll('.nav-item')[2], 'vista-mis-reservas');
    renderizarMisReservas();
}

function renderizarMisReservas() {
    const contenedor = document.getElementById('lista-mis-reservas');
    if (!contenedor) return;
    
    if (misReservas.length === 0) {
        contenedor.innerHTML = '<div style="text-align: center; padding: 24px; color: #94A3B8; font-size: 14px;">No tienes reservas activas.</div>';
        return;
    }
    
    contenedor.innerHTML = '';
    
    const reservasReversas = [...misReservas].reverse();
    
    reservasReversas.forEach((reserva) => {
        const timeString = reserva.fecha.getHours().toString().padStart(2, '0') + ':' + reserva.fecha.getMinutes().toString().padStart(2, '0');
        const metodoText = reserva.metodo === 'saldo' ? 'Pagado con saldo' : 'Usó cupo de suscripción';
        
        const card = document.createElement('div');
        card.style.cssText = "background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 16px; padding: 16px; display: flex; flex-direction: column; box-shadow: 0 4px 6px rgba(0,0,0,0.02);";
        
        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                <div>
                    <h3 style="font-size: 15px; font-weight: 700; color: #1E293B; margin: 0 0 2px 0;">${reserva.itemName}</h3>
                    <p style="font-size: 13px; color: #64748B; margin: 0;">${reserva.tiendaNombre}</p>
                </div>
                <span style="font-size: 11px; color: #94A3B8; background: #F8FAFC; padding: 4px 8px; border-radius: 8px;">${timeString}</span>
            </div>
            <p style="font-size: 11px; color: #2D8B71; font-weight: 600; margin-bottom: 12px; display: flex; align-items: center; gap: 4px;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                ${metodoText}
            </p>
            <button onclick="iniciarChatReserva('${reserva.tiendaNombre}', '${reserva.itemName}')" style="background: #F1F5F9; color: #1E293B; border: 1px solid #E2E8F0; border-radius: 12px; padding: 10px; font-weight: 600; font-size: 13px; cursor: pointer; display: flex; justify-content: center; align-items: center; gap: 8px; width: 100%;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2D8B71" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                Contactar al proveedor
            </button>
        `;
        contenedor.appendChild(card);
    });
}

function iniciarChatReserva(tiendaNombre, itemName) {
    setActive(document.querySelectorAll('.nav-item')[2], 'vista-mensajes');
    
    const container = document.getElementById('chats-container');
    if (!container) return;
    
    if (container.innerHTML.includes(`RESERVA: ${itemName}`)) {
        alert('Abriendo chat existente con ' + tiendaNombre + '...');
        return;
    }
    
    const div = document.createElement('div');
    div.style.cssText = "background: #F1FDFB; border: 1px solid #2D8B71; border-radius: 16px; padding: 16px; margin-bottom: 12px; display: flex; gap: 12px; cursor: pointer; box-shadow: 0 4px 6px rgba(45,139,113,0.1); animation: slideUp 0.3s ease-out;";
    div.onclick = () => alert('Abriendo chat con ' + tiendaNombre + '...');
    
    div.innerHTML = `
        <div style="width: 48px; height: 48px; background-color: #E2F0ED; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #2D8B71; flex-shrink: 0;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
        </div>
        <div style="flex: 1;">
            <div style="display: flex; justify-content: space-between; align-items: baseline;">
                <h4 style="font-size: 15px; font-weight: 700; color: #1E293B; margin-bottom: 2px;">${tiendaNombre}</h4>
                <span style="font-size: 11px; color: #2D8B71; font-weight: 700;">NUEVO</span>
            </div>
            <p style="font-size: 11px; color: #2D8B71; font-weight: 600; margin-bottom: 4px;">RESERVA: ${itemName}</p>
            <p style="font-size: 13px; color: #64748B; line-height: 1.4; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical;">Hola, he reservado este producto. ¿A qué hora puedo pasar a buscarlo?</p>
        </div>
    `;
    
    container.insertBefore(div, container.firstChild);
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
        'vista-empresa',
        'vista-mis-reservas'
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