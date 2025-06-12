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
