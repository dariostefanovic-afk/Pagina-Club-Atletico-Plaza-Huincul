document.getElementById("formContacto").addEventListener("submit", function(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const mensaje = document.getElementById("mensaje").value;

  if (nombre && email && mensaje) {
    document.getElementById("respuesta").textContent = "Mensaje enviado correctamente.";
    
  } else {
    document.getElementById("respuesta").textContent = "Por favor, completá todos los campos.";
  }
});
