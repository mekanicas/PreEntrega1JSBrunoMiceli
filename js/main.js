const TASA_INTERES_ANUAL = 0.1;
const recomendaciones = [
  ["Solana USDT", "BNB USDT", "BTC USDT", "USDT USDT"], // Recomendaciones para inversor agresivo
  ["ETHERUM USDT", "BTC USDT", "USDT USDT"], // Recomendaciones para inversor intermedio
  ["BTC USDT", "USDT USDT"], // Recomendaciones para inversor reservado
];
const multiplicadores = [
  [5, 3, 1, 1], // Multiplicadores para inversor agresivo
  [4, 4, 2], // Multiplicadores para inversor intermedio
  [5, 5], // Multiplicadores para inversor reservado
];

document.addEventListener("DOMContentLoaded", function () {
  const contenedorFormulario = document.getElementById("contenedorFormulario");
  const contenedorTexto = document.createElement("div");
  contenedorFormulario.appendChild(contenedorTexto);

  const formulario = document.createElement("form");
  formulario.id = "formularioInversor";
  formulario.action = "/submit_encuesta";
  formulario.method = "post";

  formulario.innerHTML = `
    <h2>1. ¿Qué tipo de inversor se considera?</h2>
    <input type="radio" id="reservado" name="tipo_inversor" value="reservado">
    <label for="reservado">Reservado</label><br>
    <input type="radio" id="intermedio" name="tipo_inversor" value="intermedio">
    <label for="intermedio">Intermedio</label><br>
    <input type="radio" id="agresivo" name="tipo_inversor" value="agresivo">
    <label for="agresivo">Agresivo</label><br>

    <h2>2. ¿Cuánto capital tiene para invertir?</h2>
    <input type="radio" id="entre_100_500" name="capital_inversion" value="entre_100_500">
    <label for="entre_100_500">Entre $100 y $500</label><br>
    <input type="radio" id="entre_500_1000" name="capital_inversion" value="entre_500_1000">
    <label for="entre_500_1000">Entre $500 y $1000</label><br>
    <input type="radio" id="mas_de_1500" name="capital_inversion" value="mas_de_1500">
    <label for="mas_de_1500">$1500 o más</label><br>

    <h2>3. ¿Cuál es su objetivo de inversión?</h2>
    <input type="text" id="objetivo_inversion" name="objetivo_inversion" placeholder="Ingrese su objetivo de inversión"><br>

    <input type="submit" value="Enviar">
  `;

  contenedorFormulario.appendChild(formulario);

  formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    const selectorDeInversor = document.querySelector(
      'input[name="tipo_inversor"]:checked'
    );
    const selectorDeCapital = document.querySelector(
      'input[name="capital_inversion"]:checked'
    );
    const objetivoInversion =
      document.getElementById("objetivo_inversion").value;

    if (!selectorDeInversor || !selectorDeCapital || !objetivoInversion) {
      mostrarMensajeError("Debe seleccionar todas las opciones");
      return;
    }
    formulario.style.display = "none";

    const tipoInversor = obtenerTipoInversor(selectorDeInversor.value);
    const capitalInversion = obtenerCapitalInversion(selectorDeCapital.value);
    const mensajePersonalizado = generarMensajePersonalizado(
      tipoInversor,
      capitalInversion,
      objetivoInversion
    );

    contenedorTexto.innerHTML = mensajePersonalizado;
  });

  function obtenerTipoInversor(valor) {
    switch (valor) {
      case "reservado":
        return "Reservado";
      case "intermedio":
        return "Intermedio";
      case "agresivo":
        return "Agresivo";
      default:
        return "";
    }
  }

  function obtenerCapitalInversion(valor) {
    switch (valor) {
      case "entre_100_500":
        return "Entre $100 y $500";
      case "entre_500_1000":
        return "Entre $500 y $1000";
      case "mas_de_1500":
        return "$1500 o más";
      default:
        return "";
    }
  }

  function generarMensajePersonalizado(
    tipoInversor,
    capitalInversion,
    objetivoInversion
  ) {
    const { recomendaciones: recs, multiplicadores: mults } =
      obtenerRecomendacion(tipoInversor);
    let recomendacionesTexto = `Te recomendamos invertir en:
    
    \n`;
    for (let i = 0; i < recs.length; i++) {
      recomendacionesTexto += `${recs[i]} con un multiplicador de ${mults[i]}\n`;
    }

    return `
    Si tu objetivo es : ${objetivoInversion} Y eres un inversor ${tipoInversor} con un capital de ${capitalInversion}
    desde Miceli's Capital :

    ${recomendacionesTexto}

    Recuerda:

    - Esta es solo una recomendación general.
    - Es importante que consultes con un asesor financiero de nuestro equipo para obtener una recomendación personalizada.
    - Investiga y comprende los riesgos antes de invertir.
    `;
  }

  function obtenerRecomendacion(tipoInversor) {
    switch (tipoInversor.toUpperCase()) {
      case "RESERVADO":
        return {
          recomendaciones: recomendaciones[2],
          multiplicadores: multiplicadores[2],
        };
      case "INTERMEDIO":
        return {
          recomendaciones: recomendaciones[1],
          multiplicadores: multiplicadores[1],
        };
      case "AGRESIVO":
        return {
          recomendaciones: recomendaciones[0],
          multiplicadores: multiplicadores[0],
        };
      default:
        return null;
    }
  }

  function mostrarMensajeError(mensaje) {
    contenedorTexto.innerHTML = `<p style="color: red;">${mensaje}</p>`;
  }
});
