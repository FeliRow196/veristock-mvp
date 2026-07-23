const locationsData = [
    // --- FERRETERÍAS ---
    { type: 'ferreterias', name: 'Ferretería San Juan', lat: -36.822, lng: -73.045, color: '#3B82F6', lastUpdate: 'hace 10 minutos', horario: '08:30 - 18:00', 
      stock: [
          {item: 'Clavos 2"', qty: '500 g.'}, {item: 'Martillos de Carpintero', qty: '3 unid.'}, {item: 'Alicates', qty: '12 unid.'}, 
          {item: 'Taladro Inalámbrico 12V', qty: 'Agotado'}, {item: 'Silicona Transparente', qty: '20 tubos'}, {item: 'Tornillos para Madera 1"', qty: '1000 unid.'}
      ] 
    },
    { type: 'ferreterias', name: 'Sodimac Constructor Centro', lat: -36.818, lng: -73.055, color: '#3B82F6', lastUpdate: 'hace 1 hora', horario: '07:30 - 21:00', 
      stock: [
          {item: 'Cemento Melón 25kg', qty: '40 sacos'}, {item: 'Pintura Látex Blanca 1G', qty: '12 tarros'}, {item: 'Cerámica Blanca 40x40', qty: '150 cajas'},
          {item: 'Fierro Estriado 8mm', qty: '80 tiras'}, {item: 'Adhesivo Cerámico Bekron', qty: '65 sacos'}, {item: 'Tubo PVC 110mm', qty: '30 tiras'},
          {item: 'Brocha 3"', qty: '45 unid.'}, {item: 'Rodillo Esponja', qty: 'Agotado'}
      ] 
    },
    { type: 'ferreterias', name: 'Ferretería Prat', lat: -36.826, lng: -73.052, color: '#3B82F6', lastUpdate: 'hace 3 horas', horario: '09:00 - 19:00', 
      stock: [
          {item: 'Pintura Esmalte al Agua', qty: '5 tarros'}, {item: 'Thinner 1L', qty: '10 botellas'}, {item: 'Cinta Aisladora', qty: '30 rollos'},
          {item: 'Enchufe Doble', qty: '15 unid.'}, {item: 'Ampolleta LED 9W', qty: '50 unid.'}, {item: 'Interruptor Simple', qty: '22 unid.'}
      ] 
    },
    { type: 'ferreterias', name: 'Constructor Lientur', lat: -36.814, lng: -73.040, color: '#3B82F6', lastUpdate: 'hace 30 minutos', horario: '08:00 - 18:30', 
      stock: [
          {item: 'Arena Fina', qty: '15 m3'}, {item: 'Ripio', qty: '20 m3'}, {item: 'Ladrillo Fiscal', qty: '1500 unid.'},
          {item: 'Malla Acma', qty: '12 rollos'}, {item: 'Alambre Cocido', qty: '20 kg'}
      ] 
    },
    { type: 'ferreterias', name: 'Ferretería El Maestro', lat: -36.833, lng: -73.033, color: '#3B82F6', lastUpdate: 'hace 2 días', horario: '08:30 - 19:00', 
      stock: [
          {item: 'Candado 40mm', qty: '8 unid.'}, {item: 'Cadena Galvanizada', qty: '15 metros'}, {item: 'Bisagras 3"', qty: '30 unid.'},
          {item: 'Cerradura de Puerta', qty: 'Agotado'}
      ] 
    },

    // --- ALMACENES ---
    { type: 'almacenes', name: 'Almacén Don Tito', lat: -36.830, lng: -73.042, color: '#EF4444', lastUpdate: 'hace 30 minutos', horario: '07:00 - 22:00', 
      stock: [
          {item: 'Pan Marraqueta', qty: 'Agotado'}, {item: 'Leche Descremada 1L', qty: '14 cajas'}, {item: 'Huevos de campo', qty: '2 docenas'},
          {item: 'Queso Gouda Laminado', qty: '500 g.'}, {item: 'Jamón Pierna', qty: '300 g.'}, {item: 'Té Supremo 100 bolsitas', qty: '4 cajas'}
      ] 
    },
    { type: 'almacenes', name: 'Minimarket Los Andes', lat: -36.828, lng: -73.053, color: '#EF4444', lastUpdate: 'ayer', horario: '09:00 - 21:00', 
      stock: [
          {item: 'Bebida Cola 3L', qty: '6 botellas'}, {item: 'Papas Fritas Lays 250g', qty: '10 bolsas'}, {item: 'Cerveza Cristal 1.2L', qty: '15 botellas'},
          {item: 'Hielo en Bolsa 2kg', qty: 'Agotado'}, {item: 'Galletas Tritón', qty: '8 paquetes'}
      ] 
    },
    { type: 'almacenes', name: 'Providencia Express', lat: -36.820, lng: -73.048, color: '#EF4444', lastUpdate: 'hace 2 horas', horario: '08:00 - 23:00', 
      stock: [
          {item: 'Bebida Sprite 2L', qty: '12 botellas'}, {item: 'Agua Sin Gas 1.5L', qty: '20 botellas'}, {item: 'Maní Salado', qty: '15 paquetes'},
          {item: 'Pan Hallulla', qty: '3 kg'}, {item: 'Mantequilla 250g', qty: '5 panes'}, {item: 'Café Nescafé 100g', qty: '4 frascos'}
      ] 
    },
    { type: 'almacenes', name: 'Almacén La Esquina', lat: -36.825, lng: -73.035, color: '#EF4444', lastUpdate: 'hace 5 minutos', horario: '07:30 - 21:30', 
      stock: [
          {item: 'Palta Hass', qty: '2 kg'}, {item: 'Tomate Larga Vida', qty: '5 kg'}, {item: 'Cebolla', qty: '3 kg'},
          {item: 'Limones', qty: 'Agotado'}, {item: 'Fideos Carozzi 400g', qty: '20 paquetes'}, {item: 'Salsa de Tomate', qty: '18 cajas'}
      ] 
    },
    { type: 'almacenes', name: 'Supermercado Local Barrio Norte', lat: -36.812, lng: -73.050, color: '#EF4444', lastUpdate: 'hace 4 horas', horario: '08:30 - 20:30', 
      stock: [
          {item: 'Arroz Tucapel grado 2', qty: '30 bolsas'}, {item: 'Aceite de Maravilla 1L', qty: '15 botellas'}, {item: 'Azúcar Iansa 1kg', qty: '40 bolsas'},
          {item: 'Sal de Mesa', qty: '25 bolsas'}, {item: 'Detergente Omo 3kg', qty: '10 bolsas'}, {item: 'Papel Higiénico 4 rollos', qty: 'Agotado'}
      ] 
    },
    { type: 'almacenes', name: 'Minimarket San Pedro', lat: -36.840, lng: -73.105, color: '#EF4444', lastUpdate: 'hace 1 hora', horario: '09:00 - 22:00', 
      stock: [
          {item: 'Helado Savory 1L', qty: '5 casatas'}, {item: 'Jugo Watts Naranja 1.5L', qty: '12 botellas'}, {item: 'Yogurt Batido Fresa', qty: '25 unid.'},
          {item: 'Leche Cultivada', qty: '10 botellas'}
      ] 
    },

    // --- TIENDAS ---
    { type: 'tiendas', name: 'Tienda de Ropa', lat: -36.827, lng: -73.050, color: '#8B5CF6', lastUpdate: 'hace 2 horas', horario: '09:00 - 20:00', 
      stock: [
          {item: 'Poleras de Verano', qty: '15 unid.'}, {item: 'Jeans Clásicos', qty: '5 unid.'}, {item: 'Calcetines Algodón', qty: '30 pares'},
          {item: 'Chaqueta de Mezclilla', qty: 'Agotado'}, {item: 'Gorras Urbanas', qty: '12 unid.'}
      ] 
    },
    { type: 'tiendas', name: 'Zapatería Centro', lat: -36.825, lng: -73.048, color: '#8B5CF6', lastUpdate: 'hace 5 horas', horario: '10:00 - 19:30', 
      stock: [
          {item: 'Zapatos de Cuero Negro', qty: '8 pares'}, {item: 'Zapatillas Deportivas Blancas', qty: '22 pares'}, {item: 'Botines Mujer', qty: 'Agotado'},
          {item: 'Sandalias de Verano', qty: '15 pares'}, {item: 'Plantillas Ortopédicas', qty: '10 pares'}
      ] 
    },
    { type: 'tiendas', name: 'Electrónica Concepción', lat: -36.824, lng: -73.051, color: '#8B5CF6', lastUpdate: 'hace 30 minutos', horario: '10:00 - 20:00', 
      stock: [
          {item: 'Cable USB-C 1m', qty: '45 unid.'}, {item: 'Cargador Rápido 20W', qty: '15 unid.'}, {item: 'Audífonos Bluetooth', qty: '8 unid.'},
          {item: 'Lámina de Vidrio iPhone 13', qty: '20 unid.'}, {item: 'Pendrive 64GB', qty: 'Agotado'}, {item: 'Pila AAA x4', qty: '30 blísters'}
      ] 
    },
    { type: 'tiendas', name: 'Librería Estudio', lat: -36.829, lng: -73.045, color: '#8B5CF6', lastUpdate: 'hace 1 día', horario: '09:00 - 18:30', 
      stock: [
          {item: 'Cuaderno Universitario 100 hojas', qty: '150 unid.'}, {item: 'Lápiz Pasta Azul', qty: '200 unid.'}, {item: 'Destacador Amarillo', qty: '40 unid.'},
          {item: 'Cartulina de Colores', qty: '80 pliegos'}, {item: 'Pegamento en Barra 21g', qty: '35 unid.'}, {item: 'Tijeras Escolares', qty: 'Agotado'}
      ] 
    },
    { type: 'tiendas', name: 'Tienda de Mascotas', lat: -36.821, lng: -73.042, color: '#8B5CF6', lastUpdate: 'hace 45 minutos', horario: '10:00 - 19:00', 
      stock: [
          {item: 'Alimento Perro Adulto 15kg', qty: '12 sacos'}, {item: 'Alimento Gato Premium 3kg', qty: '8 sacos'}, {item: 'Arena Sanitaria 5kg', qty: '20 bolsas'},
          {item: 'Juguete Mordedor', qty: '15 unid.'}, {item: 'Pipeta Antipulgas', qty: 'Agotado'}, {item: 'Correa Retráctil 5m', qty: '4 unid.'}
      ] 
    },

    // --- PUNTOS VERDES ---
    { type: 'puntos_verdes', name: 'Punto Verde Plaza Independencia', lat: -36.826279, lng: -73.049774, color: '#22C55E', lastUpdate: 'hace 3 días', horario: 'Abierto 24 hrs', 
      stock: [
          {item: 'Contenedor Vidrio', qty: '50% Capacidad'}, {item: 'Contenedor Cartón', qty: 'Lleno'}, {item: 'Contenedor Plástico', qty: '80% Capacidad'}
      ] 
    },
    { type: 'puntos_verdes', name: 'Reciclaje Universidad de Concepción', lat: -36.829, lng: -73.038, color: '#22C55E', lastUpdate: 'hace 1 hora', horario: '08:00 - 20:00', 
      stock: [
          {item: 'Pilas y Baterías', qty: 'Disponible'}, {item: 'Plásticos PET', qty: '20% Capacidad'}, {item: 'Papel Blanco', qty: '40% Capacidad'}
      ] 
    },
    { type: 'puntos_verdes', name: 'Punto Limpio Parque Ecuador', lat: -36.823, lng: -73.040, color: '#22C55E', lastUpdate: 'ayer', horario: 'Abierto 24 hrs', 
      stock: [
          {item: 'Contenedor Vidrio', qty: 'Lleno'}, {item: 'Contenedor Aluminio', qty: '60% Capacidad'}, {item: 'Contenedor Cartón', qty: '30% Capacidad'}
      ] 
    },
    { type: 'puntos_verdes', name: 'Reciclaje San Pedro de la Paz', lat: -36.838, lng: -73.102, color: '#22C55E', lastUpdate: 'hace 5 horas', horario: '09:00 - 18:00', 
      stock: [
          {item: 'Aceite de Cocina', qty: 'Disponible'}, {item: 'Electrodomésticos Pequeños', qty: 'Lleno'}, {item: 'Plásticos Mixtos', qty: '70% Capacidad'}
      ] 
    },
    { type: 'puntos_verdes', name: 'Punto Ecológico Barrio Norte', lat: -36.808, lng: -73.048, color: '#22C55E', lastUpdate: 'hace 2 días', horario: 'Abierto 24 hrs', 
      stock: [
          {item: 'Contenedor Vidrio', qty: '10% Capacidad'}, {item: 'Latas de Conserva', qty: '25% Capacidad'}, {item: 'Tetra Pak', qty: '50% Capacidad'}
      ] 
    }
];
