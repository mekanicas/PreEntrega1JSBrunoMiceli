const recomendaciones = [
  ["Solana USDT", "BNB USDT", "BTC USDT", "USDT USDT"],
  ["ETHERUM USDT", "BTC USDT", "USDT USDT"],
  ["BTC USDT", "USDT USDT"],
];

document.addEventListener("DOMContentLoaded", function () {
  const contenedorFormulario = document.getElementById("contenedorFormulario");
  const contenedorTexto = document.createElement("div");
  contenedorFormulario.appendChild(contenedorTexto);

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
    <label for="numero">Ingrese la cantidad de capital a invertir : </label><br>
    <input type="number" id="capital_inversion" name="capital_inversion" min="0" step="1">

    <h2>3. ¿Cuál es su objetivo de inversión?</h2>
    <input type="text" id="objetivo_inversion" name="objetivo_inversion" placeholder="Ingrese su objetivo de inversión"><br>

    <input type="submit" value="Enviar">
  `;

  contenedorFormulario.appendChild(formulario);

  formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    const selectorDeInversor = document.querySelector('input[name="tipo_inversor"]:checked');
    const capitalInversion = document.getElementById("capital_inversion").value;
    const objetivoInversion = document.getElementById("objetivo_inversion").value;

    if (!selectorDeInversor || !capitalInversion || !objetivoInversion) {
      mostrarMensajeError("Debe seleccionar todas las opciones y especificar el capital y el objetivo de inversión");
      return;
    }

    const tipoInversor = selectorDeInversor.value;
    const mensajePersonalizado = generarMensajePersonalizado(
      tipoInversor,
      capitalInversion,
      objetivoInversion
    );

    formulario.style.display = 'none';
    mostrarMensajePersonalizado(mensajePersonalizado);
  });

  function generarMensajePersonalizado(tipoInversor, capitalInversion, objetivoInversion) {
    const { recomendaciones: recs } = obtenerRecomendacion(tipoInversor);
    let inversionPorCripto = capitalInversion / recs.length;
    let recomendacionesTexto = `Basándonos en tu perfil de inversor ${tipoInversor} y un capital de ${capitalInversion}, te recomendamos la siguiente distribución:\n`;

    recs.forEach((cripto) => {
      recomendacionesTexto += `- Invertir ${inversionPorCripto.toFixed(2)} en ${cripto}\n`;
    });

    return `
    Tu objetivo de inversión es: ${objetivoInversion}
    
    ${recomendacionesTexto}

    Recuerda:
    - Esta es solo una recomendación general.
    - Consulta con un asesor financiero para obtener una recomendación personalizada.
    - Investiga y comprende los riesgos antes de invertir.
    `;
  }

  function obtenerRecomendacion(tipoInversor) {
    switch (tipoInversor.toUpperCase()) {
      case "RESERVADO":
        return { recomendaciones: recomendaciones[2] };
      case "INTERMEDIO":
        return { recomendaciones: recomendaciones[1] };
      case "AGRESIVO":
        return { recomendaciones: recomendaciones[0] };
      default:
        return { recomendaciones: [] };
    }
  }

  function mostrarMensajeError(mensaje) {
    contenedorTexto.innerHTML = `<p style="color: red;">${mensaje}</p>`;
  }

  function mostrarMensajePersonalizado(mensaje) {
    const contenedorMensaje = document.createElement("div");
    contenedorMensaje.innerHTML = mensaje;
    contenedorTexto.appendChild(contenedorMensaje);
    contenedorTexto.style.display = 'block';
  }
});
