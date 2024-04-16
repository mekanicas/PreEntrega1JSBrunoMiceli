let url = 'https://api.binance.com/api/v3/ticker/price?symbols=["BTCUSDT","BNBUSDT"]';
let mostrar_datos = document.getElementById('mostrar_datos');


let binanceApi = () => {
  fetch(url).then((resp) => resp.json()).then(data =>{
    console.log(data);
    let datoUno = data[0];
    let precioUno = parseFloat(datoUno.price).toFixed(2);
    let datoDos = data[1];
    let precioDos = parseFloat(datoDos.price).toFixed(2);
    mostrar_datos.innerHTML = `<h2>${datoUno.symbol}</h2>
    <h1>${precioUno}</h1>
    <br>
    <h2>${datoDos.symbol}</h2>
    <h1>${precioDos}</h1>`
  })
};

window.addEventListener('load', binanceApi);

const nombreUsuario = document.getElementById("nombreUsuario");
const logoutButtom = document.getElementById("logoutButtom");

document.addEventListener("DOMContentLoaded", function (event) {
  const content = document.querySelector(".content");

  if (content) {
    content.classList.add("hidden");
    setTimeout(function () {
      const loaderWrapper = document.querySelector(".loader-wrapper");
      if (loaderWrapper) {
        loaderWrapper.style.display = "none";
      }
      content.classList.add("hidden");
      content.classList.remove("hidden");
    }, 3000);
  }
});

//Implementación de JSON
const recomendaciones = {
  reservado: ["Solana", "BNB", "BTC", "USDT"],
  intermedio: ["ETHERUM", "BTC", "USDT"],
  agresivo: ["BTC", "USDT"],
};

const usernamevalue = localStorage.getItem("username");
nombreUsuario.innerHTML = `¡Hola ${usernamevalue}!`;

logoutButtom.addEventListener("click", () => {
  localStorage.removeItem("username");
  localStorage.removeItem("password");
  window.location.reload();
});

//Redireccionamiento a el login.html si no esta logueado
if (!usernamevalue) {
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", function () {
  const contenedorFormulario = document.getElementById("contenedorFormulario");
  const contenedorTexto = document.createElement("div");
  contenedorFormulario.appendChild(contenedorTexto);

  contenedorTexto.style.display = "none";

  const formulario = document.createElement("form");
  formulario.id = "formularioInversor";
  formulario.innerHTML = `
    <h2>1. ¿Qué tipo de inversor se considera?</h2>
    <input type="radio" id="reservado" name="tipo_inversor" value="reservado">
    <label for="reservado">Reservado</label><br>
    <input type="radio" id="intermedio" name="tipo_inversor" value="intermedio">
    <label for="intermedio">Intermedio</label><br>
    <input type="radio" id="agresivo" name="tipo_inversor" value="agresivo">
    <label for="agresivo">Agresivo</label><br>

    <h2>2. ¿Cuánto capital tiene para invertir?</h2>
    <label for="capital_inversion">Ingrese la cantidad de capital a invertir : </label><br>
    <input type="number" id="capital_inversion" name="capital_inversion" min="0" step="1">

    <h2>3. ¿Cuál es su objetivo de inversión?</h2>
    <input  type="text" id="objetivo_inversion" name="objetivo_inversion" placeholder="Ingrese su objetivo de inversión"><br>

    <input class="mt-4 SubmitButtom" type="submit" value="Enviar">
  `;
  contenedorFormulario.appendChild(formulario);

  formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    const selectorDeInversor = document.querySelector(
      'input[name="tipo_inversor"]:checked'
    );
    const capitalInversion = document.getElementById("capital_inversion").value;
    const objetivoInversion =
      document.getElementById("objetivo_inversion").value;

    if (!selectorDeInversor || !capitalInversion || !objetivoInversion) {
      mostrarMensajeError(
        "Debe seleccionar todas las opciones y especificar el capital y el objetivo de inversión"
      );
      return;
    }
    const tipoInversor = selectorDeInversor.value;
    const mensajePersonalizado = generarMensajePersonalizado(
      tipoInversor,
      capitalInversion,
      objetivoInversion
    );
    formulario.style.display = "none";
    mostrarMensajePersonalizado(mensajePersonalizado);
  });
  function generarMensajePersonalizado(
    tipoInversor,
    capitalInversion,
    objetivoInversion
  ) {
    const { recomendaciones: recs } = obtenerRecomendacion(tipoInversor);
    let inversionPorCripto = capitalInversion / recs.length;
    let recomendacionesTexto = `Basándonos en tu perfil de inversor ${tipoInversor} y un capital de ${capitalInversion}, te recomendamos la siguiente distribución:\n`;

    recs.forEach((cripto) => {
      recomendacionesTexto += `- Invertir ${inversionPorCripto.toFixed(
        2
      )} en ${cripto}\n`;
    });

    return `
    Tu objetivo de inversión es: ${objetivoInversion}<br><br>
    
    ${recomendacionesTexto}<br><br>

    Recuerda:<br>
    - Esta es solo una recomendación general.<br><br>

    - Consulta con un asesor financiero para obtener una recomendación personalizada.<br><br>

    - Investiga y comprende los riesgos antes de invertir.
    `;
  }

  function obtenerRecomendacion(tipoInversor) {
    return { recomendaciones: recomendaciones[tipoInversor] || [] };
  }
  function mostrarMensajeError(mensaje) {
    contenedorTexto.innerHTML = `<p style="color: red;">${mensaje}</p>`;
    contenedorTexto.style.display = "block";
  }
  function mostrarMensajePersonalizado(mensaje) {
    contenedorTexto.innerHTML = mensaje;
    contenedorTexto.style.display = "block";
    contenedorTexto.classList.add("styleForForm");
  }
});
