function anioActual(){
    let anioAct = new Date().getFullYear();
    document.getElementById("anioActual").textContent = anioAct;
    return null
}

//Chequea si la fecha es valida
function esFechaValida(unDia, unMes, unAnio){
    // Convierto los valores ingresados a enteros
    dia = parseInt(unDia);
    mes = parseInt(unMes);
    anio = parseInt(unAnio);

    // Verifico que todos sean números positivos
    if (dia <= 0 || mes <= 0 || anio <= 0) return false;
    // Verifico que mes no sea mayor a 12 y dia no sea mayor a 31
    if (mes > 12 || dia > 31) return false;

    // Creo dicha fecha con el objeto Date, JavaScript corrige fechas inválidas
    let fecha = new Date(anio, mes - 1, dia);
    // luego comparo con los valores originales, si la fecha es válida los valores originales van a coincidir
    let actual = new Date();
    return (
        fecha.getFullYear() === anio &&
        fecha.getMonth() === mes - 1 &&
        fecha.getDate() === dia &&
        fecha <= actual  // Verifico que la fecha de nacimiento no sea mayor a la fecha actual
    );
}

function contieneLetYNum(cadena){
    let esUsuario = true;
    let i = 0;
    while (i < cadena.length && esUsuario){
        let char = cadena[i];
        if (char >= '0' && char <= '9'){
        esUsuario = true;
        } else if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')){
        esUsuario = true;
            }else if (char == '.' || char == '-' || char == '_'){
            esUsuario = true;
                }else{
                esUsuario = false;
                };
        i = i + 1;
        
    }
    if (esUsuario) return true;
    return false;
}

function contieneLetras(cadena){
    let esUsuario = true;
    let i = 0;
    while (i < cadena.length && esUsuario){
        let char = cadena[i];
        if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || (char == ' ')){
            esUsuario = true;
        }else{
            esUsuario = false;
        };
        i = i + 1;
        
    }
    if (esUsuario) return true;
    return false;
}

function contraseniaValida(cadena){
    if (cadena.length > 7){
        return true;
    } 
    return false
}

function esEmailValido(email) {
    let dominio, usuario = false;
    let sepDir = email.split("@");
    console.log(sepDir[1]);
    if (sepDir.length==2){
        switch (true){
        case /.com$/.test(sepDir[1]): dominio = true;
        console.log("entro");
        break;
        case /.ar$/.test(sepDir[1]): dominio = true;
        break;
        case /.gov$/.test(sepDir[1]): dominio = true;
        break;
        case /.org$/.test(sepDir[1]): dominio = true;
        break;
        default: dominio = false;
        }
        console.log(dominio);
        usuario = contieneLetYNum(sepDir[0]);
        console.log(usuario);
    }else{
        return false;
    };
    return dominio && usuario   
}

function esNombreValido(cadena){
    let soloLetras = contieneLetras(cadena);
    if (soloLetras){
        return true;
    }
    return false
}

function verificaNroDoc(nro){
    if (isNaN(nro) || nro < 1000000 || nro > 99999999){
        return false;
    }else{
        return true;
    }
}

function validarIngreso(){
    // Capturo los datos ingresados
    let tipoDoc = document.getElementById("tipo_doc");
    let nroDoc = document.getElementById("nro_doc");
    let clave = document.getElementById("clave");
    
    tipoDoc.style.border = "";
    tipoDoc.style.backgroundColor = "";
    let ingresoTipoDoc = false;
    if (tipoDoc.value == ""){
        tipoDoc.style.border = "2px solid red";
        tipoDoc.style.backgroundColor = "#ffe6e6";
    }else{     
        ingresoTipoDoc = true;
    }

    nroDoc.style.border = "";
    nroDoc.style.backgroundColor = "";
    let unNro = parseInt(nroDoc.value); 
    let esNroValido = verificaNroDoc(unNro);
    if (!esNroValido){
        nroDoc.style.border = "2px solid red";
        nroDoc.style.backgroundColor = "#ffe6e6";
    }
    
    clave.style.border = "";
    clave.style.backgroundColor = "";
    let claveValida = contraseniaValida(clave.value);
    if (!claveValida){
        clave.style.border = "2px solid red";
        clave.style.backgroundColor = "#ffe6e6";
    }

    if (ingresoTipoDoc && esNroValido && claveValida){

        let socios = JSON.parse(localStorage.getItem("socios")) || [];
        console.log(socios);
        const socioValido = socios.find(s => s.nroDoc === nroDoc.value && s.clave === clave.value);
        console.log(socios[0]);
        console.log(socios[1]);
        console.log(socios[2]);
        console.log(socios[3]);
        
        if (socioValido){
            localStorage.setItem("socioActivo", JSON.stringify(socioValido));
            window.location.href = "pagina-socios.html"; // Redirige al portal "pagina-socios.html";
        }else{
            alert("Número de documento o contraseña incorrectos.");
        }
    }else{
        alert("Los datos ingresados no son válidos")
    }
}

function validarRegistro(){
    // Capturo los datos ingresados
    let nombre = document.getElementById("nombre");
    let apellido = document.getElementById("apellido");
    let dia = document.getElementById("dia");
    let mes = document.getElementById("mes");
    let anio = document.getElementById("anio");
    let mail = document.getElementById("email");
    let tipoDoc = document.getElementById("tipo_doc");
    let nroDoc = document.getElementById("nro_doc");
    let clave = document.getElementById("clave");

    nombre.style.border = "";
    nombre.style.backgroundColor = "";
    let nombreValido = esNombreValido(nombre.value);
    if (!nombreValido){
        nombre.style.border = "2px solid red";
        nombre.style.backgroundColor = "#ffe6e6";
        alert("El nombre ingresado es incorrecto");
    }

    apellido.style.border = "";
    apellido.style.backgroundColor = "";
    let apellidoValido = esNombreValido(apellido.value);
    if (!apellidoValido){
        apellido.style.border = "2px solid red";
        apellido.style.backgroundColor = "#ffe6e6";
        alert("El apellido ingresado es incorrecto");
    }

    let emailValido = esEmailValido(mail.value.trim());
    mail.style.border = "";
    mail.style.backgroundColor = "";
    if (!emailValido) {
        mail.style.border = "2px solid red";
        mail.style.backgroundColor = "#ffe6e6";
        alert("El email ingresado es incorrecto");
    }

    tipoDoc.style.border = "";
    tipoDoc.style.backgroundColor = "";
    let ingresoTipoDoc = false;
    if (tipoDoc.value == ""){
        tipoDoc.style.border = "2px solid red";
        tipoDoc.style.backgroundColor = "#ffe6e6";
    }else{
        ingresoTipoDoc = true;
    }

    nroDoc.style.border = "";
    nroDoc.style.backgroundColor = "";
    let unNro = parseInt(nroDoc.value); 
    let esNroValido = verificaNroDoc(unNro);
    if (!esNroValido){
        nroDoc.style.border = "2px solid red";
        nroDoc.style.backgroundColor = "#ffe6e6";
        alert("El número de documento ingresado es incorrecto");
    }

    let fechaValida = esFechaValida(dia.value, mes.value, anio.value);
    [dia, mes, anio].forEach(el => {
        el.style.border = "";
        el.style.backgroundColor = "";
        });
    if (!fechaValida){
        [dia, mes, anio].forEach(el => {
        el.style.border = "2px solid red";
        el.style.backgroundColor = "#ffe6e6";
        });
        alert("La fecha ingresada es incorrecta");
    }
    
    clave.style.border = "";
    clave.style.backgroundColor = "";
    let claveValida = contraseniaValida(clave.value);
    if (!claveValida){
        clave.style.border = "2px solid red";
        clave.style.backgroundColor = "#ffe6e6";
        alert("La contraseña ingresada debe tener mas de 7 caracteres");
    }

    if (fechaValida && emailValido && nombreValido && apellidoValido && ingresoTipoDoc && esNroValido && claveValida){
        alert("Los datos ingresados son correctos");

        let fecha = new Date(anio.value, mes.value - 1, dia.value);
        let nombre = document.getElementById("nombre").value;
        let apellido = document.getElementById("apellido").value;
        let email = document.getElementById("email").value;
        let tipoDoc = document.getElementById("tipo_doc").value;
        let nroDoc = document.getElementById("nro_doc").value;
        let clave = document.getElementById("clave").value;
        let plan = " ";
        let actividades = [];

        let socio = {nombre, apellido, email, tipoDoc, nroDoc, fecha, clave, plan, actividades};

        // Obtener lista actual o crear una nueva
        let socios = JSON.parse(localStorage.getItem("socios")) || [];
        console.log(socios);
        // Verificar si el nro de documento ya está registrado
        const existe = socios.some(s => s.nroDoc === nroDoc);
        if (existe) {
            alert("Este número de documento ya está registrado.");
            return null;
        }

        socios.push(socio);
        localStorage.setItem("socios", JSON.stringify(socios));
        console.log(socios);
        alert("Registro exitoso. Ahora podés ingresar.");
        window.location.href='socioRegistrado.html'
    }
}



