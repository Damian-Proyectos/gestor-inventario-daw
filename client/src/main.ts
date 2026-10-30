// Definimos las interfaces tipadas para TypeScript
interface Producto {
  id?: number;
  nombre: string;
  precio: number | string;
  color?: string;
  categoria?: string;
}

interface APIRespuesta {
  success: boolean;
  data: Producto[];
}

const tablaProductos = document.getElementById('tabla-productos') as HTMLTableSectionElement;
const productForm = document.getElementById('product-form') as HTMLFormElement;

// Función para obtener y pintar los productos desde el Backend
async function cargarProductos(): Promise<void> {
  try {
    const respuesta = await fetch('http://localhost:3000/api/products');
    const resultado: APIRespuesta = await respuesta.json();

    if (resultado.success) {
      renderizarTabla(resultado.data);
    }
  } catch (error) {
    console.error('Error al conectar con la API:', error);
  }
}

// Función para renderizar filas en la tabla HTML
function renderizarTabla(productos: Producto[]): void {
  tablaProductos.innerHTML = '';
  productos.forEach((p) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${p.id}</td>
      <td><strong>${p.nombre}</strong></td>
      <td>${p.precio} €</td>
      <td>${p.color || '-'}</td>
      <td>${p.categoria || '-'}</td>
    `;
    tablaProductos.appendChild(fila);
  });
}

// Evento para enviar el formulario y registrar un nuevo producto mediante POST
productForm.addEventListener('submit', async (e: Event) => {
  e.preventDefault();

  const nombre = (document.getElementById('nombre') as HTMLInputElement).value;
  const precio = (document.getElementById('precio') as HTMLInputElement).value;
  const color = (document.getElementById('color') as HTMLInputElement).value;
  const categoria = (document.getElementById('categoria') as HTMLInputElement).value;

  const nuevoProducto: Producto = {
    nombre,
    precio: Number(precio),
    color: color || undefined,
    categoria: categoria || undefined
  };

  try {
    const respuesta = await fetch('http://localhost:3000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevoProducto)
    });

    if (respuesta.ok) {
      productForm.reset();
      cargarProductos(); // Recarga la tabla automáticamente tras guardar
    } else {
      console.error('Error al guardar el producto en la base de datos');
    }
  } catch (error) {
    console.error('Error de red al intentar crear el producto:', error);
  }
});

// Carga inicial al abrir la página
cargarProductos();