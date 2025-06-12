document.addEventListener('DOMContentLoaded', () => {
  // Formulario contacto
  const form = document.getElementById('contactForm');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();

    if(nombre === '' || email === '') {
      alert('Por favor, completa todos los campos.');
      return;
    }

    alert(`Gracias por contactarnos, ${nombre}! Te responderemos pronto al correo ${email}.`);

    form.reset();
  });

  // Botón volver arriba
  const btnSubir = document.getElementById('btnSubir');

  window.onscroll = function() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      btnSubir.style.display = "block";
    } else {
      btnSubir.style.display = "none";
    }
  };

  btnSubir.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Galería modal
  const modal = document.getElementById("modal");
  const imgModal = document.getElementById("imgModal");
  const caption = document.getElementById("caption");
  const cerrarModal = document.getElementById("cerrarModal");

  document.querySelectorAll('.galeria-img').forEach(img => {
    img.addEventListener('click', () => {
      modal.style.display = "block";
      imgModal.src = img.src;
      caption.textContent = img.alt;
    });
  });

  cerrarModal.addEventListener('click', () => {
    modal.style.display = "none";
  });

  // Cerrar modal si se clickea fuera de la imagen
  window.addEventListener('click', (e) => {
    if (e.target == modal) {
      modal.style.display = "none";
    }
  });
});
// script.js
function actualizarReloj() {
  const ahora = new Date();
  const hora = ahora.toLocaleTimeString();
  document.getElementById("reloj").textContent = hora;
}
setInterval(actualizarReloj, 1000);
// script.js
const imagenes = ["images/foto1.jpg", "images/foto2.jpg", "images/foto3.jpg"];
let i = 0;
setInterval(() => {
  i = (i + 1) % imagenes.length;
  document.getElementById("imgCarrusel").src = imagenes[i];
}, 3000); // cambia cada 3 segundos
// Obtener carrito guardado o iniciar vacío
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Elementos del DOM, si existen en la página actual
const listaCarrito = document.getElementById('lista-carrito');
const totalSpan = document.getElementById('total');
const btnComprar = document.getElementById('btn-comprar');

// Función para guardar carrito en localStorage
function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Agregar producto al carrito
function agregarAlCarrito(boton) {
  const card = boton.closest('.producto-card');
  const id = card.dataset.id;
  const nombre = card.dataset.nombre;
  const precio = parseFloat(card.dataset.precio);
  const existente = carrito.find(p => p.id === id);
  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({ id, nombre, precio, cantidad: 1 });
  }
  guardarCarrito();
  actualizarCarrito();
  alert(`Añadido al carrito: ${nombre}`);
}

// Eliminar producto del carrito
function eliminarProducto(index) {
  carrito.splice(index, 1);
  guardarCarrito();
  actualizarCarrito();
}

// Actualizar visualización del carrito (si la página tiene el carrito visible)
function actualizarCarrito() {
  if (!listaCarrito) return; // Si no hay lista carrito en esta página, salir
  listaCarrito.innerHTML = '';
  let total = 0;
  carrito.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}`;
    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = '❌';
    btnEliminar.onclick = () => eliminarProducto(index);
    li.appendChild(btnEliminar);
    listaCarrito.appendChild(li);
    total += item.precio * item.cantidad;
  });
  totalSpan.textContent = total.toFixed(2);
  if (btnComprar) btnComprar.disabled = carrito.length === 0;
}

// Botón comprar por WhatsApp
if (btnComprar) {
  btnComprar.addEventListener('click', () => {
    if (carrito.length === 0) return;
   let mensaje = "¡Hola! Me interesa realizar una compra en *VARIEDADES FALBAS*:%0A%0A";
carrito.forEach(item => {
  mensaje += `• ${item.nombre} x${item.cantidad} = $${(item.precio * item.cantidad).toFixed(2)}%0A`;
});
mensaje += `%0A🧾 Total a pagar: *$${totalSpan.textContent}*%0A%0A¿Está disponible para envío o retiro?`;

    const numero = '593982183115'; // Cambia al número de WhatsApp que uses
    window.open(`https://wa.me/${numero}?text=${mensaje}`, '_blank');
  });
}

// Al cargar la página, actualizar carrito (por si está visible)
document.addEventListener('DOMContentLoaded', actualizarCarrito);
function filtrarProductos() {
  const filtro = document.getElementById('buscador').value.toLowerCase();
  const productos = document.querySelectorAll('.producto-card');
  productos.forEach(producto => {
    const nombre = producto.dataset.nombre.toLowerCase();
    producto.style.display = nombre.includes(filtro) ? 'block' : 'none';
  });
}


