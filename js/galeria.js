function abrirLightbox(img) {
  const lightbox = document.getElementById("lightbox");
  const imagen = document.getElementById("imagenAmpliada");

  imagen.src = img.src;
  lightbox.style.display = "flex";
}

function cerrarLightbox() {
  document.getElementById("lightbox").style.display = "none";
}
