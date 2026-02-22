// Datos de los productos con categorías
const productos = [
  {
    nombre: "Libro 1",
    precio: "$10.000",
    descripcion: "",
    imagen: "./img/libro (1).webp",
    categoria: "LIBROS",
    contacto: "300 742 5078"
  },
  {
    nombre: "Libro 2",
    precio: "$10.000",
    descripcion: "",
    imagen: "./img/libro (2).webp",
    categoria: "LIBROS",
    contacto: "300 742 5078"
  },
  {
    nombre: "Libro 3",
    precio: "$15.000",
    descripcion: "",
    imagen: "./img/libro (3).webp",
    categoria: "LIBROS",
    contacto: "300 742 5078"
  },
  {
    nombre: "Libro 4",
    precio: "$20.000",
    descripcion: "",
    imagen: "./img/libro (4).webp",
    categoria: "LIBROS",
    contacto: "300 742 5078"
  },
  {
    nombre: "Libro 5",
    precio: "$20.000",
    descripcion: "",
    imagen: "./img/libro (5).webp",
    categoria: "LIBROS",
    contacto: "300 742 5078"
  },
  {
    nombre: "Libro 6",
    precio: "$15.000",
    descripcion: "",
    imagen: "./img/libro (6).webp",
    categoria: "LIBROS",
    contacto: "300 742 5078"
  },
  {
    nombre: "Libro 7",
    precio: "$15.000",
    descripcion: "",
    imagen: "./img/libro (7).webp",
    categoria: "LIBROS",
    contacto: "300 742 5078"
  },
  {
    nombre: "Libro 8",
    precio: "$15.000",
    descripcion: "",
    imagen: "./img/libro (8).webp",
    categoria: "LIBROS",
    contacto: "300 742 5078"
  },
  {
    nombre: "Libro 9",
    precio: "$15.000",
    descripcion: "",
    imagen: "./img/libro (9).webp",
    categoria: "LIBROS",
    contacto: "300 742 5078"
  },
  {
    nombre: "Libro 10",
    precio: "$15.000",
    descripcion: "",
    imagen: "./img/libro (10).webp",
    categoria: "LIBROS",
    contacto: "300 742 5078"
  },
  {
    nombre: "Libro 11",
    precio: "$15.000",
    descripcion: "",
    imagen: "./img/libro (11).webp",
    categoria: "LIBROS",
    contacto: "300 742 5078"
  },
  {
    nombre: "Libro 12",
    precio: "$15.000",
    descripcion: "",
    imagen: "./img/libro (12).webp",
    categoria: "LIBROS",
    contacto: "300 742 5078"
  },
  {
    nombre: "Libro 13",
    precio: "$15.000",
    descripcion: "",
    imagen: "./img/libro (13).webp",
    categoria: "LIBROS",
    contacto: "300 742 5078"
  },
  {
    nombre: "Libro 14",
    precio: "$15.000",
    descripcion: "",
    imagen: "./img/libro (14).webp",
    categoria: "LIBROS",
    contacto: "300 742 5078"
  },
  {
    nombre: "Libro 15",
    precio: "$15.000",
    descripcion: "",
    imagen: "./img/libro (15).webp",
    categoria: "LIBROS",
    contacto: "300 742 5078"
  }


];

// Variables globales
let productosFiltrados = productos;
let paginaActual = 1;
const productosPorPagina = 9;

// Función para crear el HTML de un producto
function crearProductoHTML(producto) {
  // Escapar comillas simples en los valores para evitar errores en el onclick
  const imagenEscapada = producto.imagen.replace(/'/g, "\\'");
  const nombreEscapado = producto.nombre.replace(/'/g, "\\'");
  const precioEscapado = producto.precio.replace(/'/g, "\\'");
  const descripcionEscapada = producto.descripcion.replace(/'/g, "\\'");

  // Obtener contacto del producto
  const contacto = producto.contacto;
  const contactoLimpio = contacto.replace(/\s/g, ""); // Quitar espacios para WhatsApp
  const mensajeWhatsApp = encodeURIComponent(
    `Hola, estoy interesado en: ${producto.nombre} - ${producto.precio}`,
  );
  const urlWhatsApp = `https://wa.me/57${contactoLimpio}?text=${mensajeWhatsApp}`;

  return `
        <div class="producto" onclick="abrirModal('${imagenEscapada}', '${nombreEscapado}', '${precioEscapado}', '${descripcionEscapada}')">
            <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">
            <div class="producto-info">
            <span class="producto-categoria">${producto.categoria}</span>
                <h3 class="producto-nombre">${producto.nombre}</h3>
                <p class="producto-precio">${producto.precio}</p>
                <div class="producto-contacto" onclick="event.stopPropagation();">
                    <span class="contacto-texto">📞 ${contacto}</span>
                    <a href="${urlWhatsApp}" target="_blank" class="whatsapp-icon" title="Contactar por WhatsApp">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" width="24" height="24">
                    </a>
                </div>

                <p class="producto-descripcion">${producto.descripcion}</p>


            </div>
        </div>
    `;
}

// Función para filtrar productos por categoría
function filtrarProductos(categoria) {
  if (categoria === "todas") {
    productosFiltrados = productos;
  } else {
    productosFiltrados = productos.filter(
      (producto) => producto.categoria === categoria,
    );
  }
  paginaActual = 1; // Resetear a la primera página al filtrar
  mostrarProductos();
}

// Función para calcular el número total de páginas
function obtenerTotalPaginas() {
  return Math.ceil(productosFiltrados.length / productosPorPagina);
}

// Función para obtener los productos de la página actual
function obtenerProductosPagina() {
  const inicio = (paginaActual - 1) * productosPorPagina;
  const fin = inicio + productosPorPagina;
  return productosFiltrados.slice(inicio, fin);
}

// Función para mostrar los productos en la página actual
function mostrarProductos() {
  const container = document.getElementById("productosContainer");
  const productosPagina = obtenerProductosPagina();

  if (productosPagina.length === 0) {
    container.innerHTML =
      '<p class="sin-productos">No hay productos disponibles en esta categoría.</p>';
  } else {
    container.innerHTML = productosPagina
      .map((producto) => crearProductoHTML(producto))
      .join("");
  }

  actualizarPaginacion();
}

// Función para crear los botones de paginación
function actualizarPaginacion() {
  const container = document.getElementById("paginacionContainer");
  const totalPaginas = obtenerTotalPaginas();

  if (totalPaginas <= 1) {
    container.innerHTML = "";
    return;
  }

  let html = '<div class="paginacion">';

  // Botón Anterior
  if (paginaActual > 1) {
    html += `<button class="btn-pagina" onclick="cambiarPagina(${paginaActual - 1})">« Anterior</button>`;
  } else {
    html += `<button class="btn-pagina disabled" disabled>« Anterior</button>`;
  }

  // Números de página
  const maxPaginasVisibles = 5;
  let inicio = Math.max(1, paginaActual - Math.floor(maxPaginasVisibles / 2));
  let fin = Math.min(totalPaginas, inicio + maxPaginasVisibles - 1);

  if (fin - inicio < maxPaginasVisibles - 1) {
    inicio = Math.max(1, fin - maxPaginasVisibles + 1);
  }

  if (inicio > 1) {
    html += `<button class="btn-pagina" onclick="cambiarPagina(1)">1</button>`;
    if (inicio > 2) {
      html += `<span class="puntos">...</span>`;
    }
  }

  for (let i = inicio; i <= fin; i++) {
    if (i === paginaActual) {
      html += `<button class="btn-pagina active">${i}</button>`;
    } else {
      html += `<button class="btn-pagina" onclick="cambiarPagina(${i})">${i}</button>`;
    }
  }

  if (fin < totalPaginas) {
    if (fin < totalPaginas - 1) {
      html += `<span class="puntos">...</span>`;
    }
    html += `<button class="btn-pagina" onclick="cambiarPagina(${totalPaginas})">${totalPaginas}</button>`;
  }

  // Botón Siguiente
  if (paginaActual < totalPaginas) {
    html += `<button class="btn-pagina" onclick="cambiarPagina(${paginaActual + 1})">Siguiente »</button>`;
  } else {
    html += `<button class="btn-pagina disabled" disabled>Siguiente »</button>`;
  }

  html += "</div>";
  html += `<p class="info-pagina">Página ${paginaActual} de ${totalPaginas} (${productosFiltrados.length} productos)</p>`;

  container.innerHTML = html;
}

// Función para cambiar de página
function cambiarPagina(nuevaPagina) {
  paginaActual = nuevaPagina;
  mostrarProductos();
  // Scroll suave hacia arriba
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Función para abrir el modal con la imagen ampliada
function abrirModal(imagen, nombre, precio, descripcion) {
  const modal = document.getElementById("modal");
  const imagenModal = document.getElementById("imagenModal");
  const nombreModal = document.getElementById("nombreModal");
  const precioModal = document.getElementById("precioModal");
  const descripcionModal = document.getElementById("descripcionModal");

  imagenModal.src = imagen;
  imagenModal.alt = nombre;
  nombreModal.textContent = nombre;
  precioModal.textContent = precio;
  descripcionModal.textContent = descripcion;

  modal.classList.add("mostrar");
  document.body.style.overflow = "hidden";
}

// Función para cerrar el modal
function cerrarModal() {
  const modal = document.getElementById("modal");
  modal.classList.remove("mostrar");
  document.body.style.overflow = "auto";
}

// Función para toggle del menú móvil
function toggleMenu() {
  const navMenu = document.getElementById("navMenu");
  const navToggle = document.getElementById("navToggle");

  navMenu.classList.toggle("active");
  navToggle.classList.toggle("active");
}

// Cerrar menú al hacer click en un enlace
function cerrarMenu() {
  const navMenu = document.getElementById("navMenu");
  const navToggle = document.getElementById("navToggle");

  navMenu.classList.remove("active");
  navToggle.classList.remove("active");
}

// Event listeners
document.addEventListener("DOMContentLoaded", function () {
  mostrarProductos();

  // Toggle del menú móvil
  const navToggle = document.getElementById("navToggle");
  if (navToggle) {
    navToggle.addEventListener("click", toggleMenu);
  }

  // Cerrar menú al hacer click en los enlaces
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", cerrarMenu);
  });

  // Filtro de categorías
  document
    .getElementById("filtroCategoria")
    .addEventListener("change", function (e) {
      filtrarProductos(e.target.value);
    });

  // Cerrar modal al hacer click en la X
  document.getElementById("cerrarModal").addEventListener("click", cerrarModal);

  // Cerrar modal al hacer click fuera de la imagen
  document.getElementById("modal").addEventListener("click", function (e) {
    if (e.target === this) {
      cerrarModal();
    }
  });

  // Cerrar modal con la tecla ESC
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      cerrarModal();
    }
  });
});
