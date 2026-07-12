// Ejemplo: mostrar mensaje de bienvenida en consola
document.addEventListener("DOMContentLoaded", () => {
    console.log("Página CAPH cargada correctamente.");
});

function anioActual(){
    let anioAct = new Date().getFullYear();
    document.getElementById("anioActual").textContent = anioAct;
    return null
}

document.addEventListener("DOMContentLoaded", () => {
  const boton = document.getElementById("verMasBtn");
  const noticiasOcultas = document.querySelectorAll(".noticia.oculto");

  boton.addEventListener("click", () => {
    noticiasOcultas.forEach(noticia => noticia.style.display = "block");
    boton.style.display = "none"; // Oculta el botón después de mostrar todo
  });
});
