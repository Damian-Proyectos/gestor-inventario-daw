// 1. Definimos la interfaz del Producto (fundamental para TypeScript)
interface Producto {
  id: number;
  nombre: string;
  precio: string | number;
  color?: string | null;
  categoria?: string | null;
}

// Interfaz para la respuesta estructurada de nuestro Backend
interface APIRespuesta {
  success: boolean;
  data: Producto[];
}

// 2. Elemento HTML donde inyectaremos las filas
const tablaProductos = document.getElementById('tabla-productos') as HTMLTableSectionElement;

// 3. Función asíncrona con TypeScript para traer los productos de la API
async function cargarProductos(): Promise<void> {
  try {
    const respuesta = await fetch('http://localhost:3000/api/products');
    const resultado: APIRespuesta = await respuesta.json();

    if (resultado.success) {
      renderizarTabla(resultado.data);
    } else {
      console.error('Error en los datos recibidos de la API');
    }
  } catch (error) {
    console.error('Error de conexión con la API:', error);
  }
}

// 4. Función para pintar los datos en el HTML
function renderizarTabla(productos: Producto[]): void {
  tablaProductos.innerHTML = ''; // Limpiamos la tabla antes de pintar

  productos.forEach((producto: Producto) => {
    const fila = document.createElement('tr');
    
    fila.innerHTML = `
      <td>${producto.id}</td>
      <td><strong>${producto.nombre}</strong></td>
      <td>${producto.precio} €</td>
      <td>${producto.color || '-'}</td>
      <td>${producto.categoria || '-'}</td>
    `;

    tablaProductos.appendChild(fila);
  });
}

// Ejecutamos la carga al iniciar
cargarProductos();