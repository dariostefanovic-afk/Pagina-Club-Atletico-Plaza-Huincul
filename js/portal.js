
document.addEventListener("DOMContentLoaded", () => { 
  const socio = JSON.parse(localStorage.getItem("socioActivo"));
 
    console.log(socio.nombre);
  document.getElementById("nombreSocio").textContent = socio.nombre;
  document.getElementById("nroDocSocio").textContent = socio.nroDoc;

  // Mostrar plan guardado
  const plan = socio.plan;
  console.log(socio.plan);
  if (plan != " ") {
    document.getElementById("planGuardado").textContent = `Plan actual: $${plan}`;
  }

  // Mostrar actividades guardadas
  const actividades = socio.actividades || [];
  mostrarActividades(actividades);
}); 

const socio = JSON.parse(localStorage.getItem("socioActivo"));
const socios = JSON.parse(localStorage.getItem("socios")) || [];

function actualizarSocioActivo() {
  const index = socios.findIndex(s => s.nroDoc === socio.nroDoc);
  socios[index] = socio;
  localStorage.setItem("socios", JSON.stringify(socios));
  localStorage.setItem("socioActivo", JSON.stringify(socio));
}

function guardarPlan() {
  const plan = document.getElementById("planCuota").value;
  socio.plan = plan;
  console.log(socio.plan);
  actualizarSocioActivo();
  document.getElementById("planGuardado").textContent = `Plan actual: $${plan}`;
}

function guardarActividades() {
  const seleccionadas = Array.from(document.querySelectorAll(".actividades input:checked"))
    .map(input => input.value);
    socio.actividades = seleccionadas;
    console.log(socio.actividades);
    actualizarSocioActivo();
  mostrarActividades(seleccionadas);
}

function mostrarActividades(lista) {
  const ul = document.getElementById("listaActividades");
  ul.innerHTML = "";
  lista.forEach(act => {
    const li = document.createElement("li");
    li.textContent = act;
    ul.appendChild(li);
  });
}

function cerrarSesion() {
  localStorage.removeItem("socioActivo");
  window.location.href = "portalSocios.html";
}

function darDeBaja() {
  const socioActivo = JSON.parse(localStorage.getItem("socioActivo"));
  if (!socioActivo) return;

  if (confirm("¿Estás seguro de que querés darte de baja como socio del Club?")) {
    // Eliminar al socio de la lista general
    let socios = JSON.parse(localStorage.getItem("socios")) || [];
    socios = socios.filter(s => s.nroDoc !== socioActivo.nroDoc);
    localStorage.setItem("socios", JSON.stringify(socios));

    // Eliminar datos relacionados
    localStorage.removeItem("socioActivo");
    localStorage.removeItem("planCuota");
    localStorage.removeItem("actividades");

    alert("Tu cuenta ha sido dada de baja.");
    window.location.href = "portalSocios.html";
  }
}

