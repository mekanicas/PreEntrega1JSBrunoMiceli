const recomendaciones = [
  ["Solana USDT", "BNB USDT", "BTC USDT", "USDT USDT"],
  ["ETHERUM USDT", "BTC USDT", "USDT USDT"],
  ["BTC USDT", "USDT USDT"],
];

// Array que contiene las rutas de las imágenes
const imagenesInversor = [
  "./media/inversorReservado.jpg",
  "./media/inversorIntermedio.jpg",
  "./media/inversorAgresivo.jpg",
];

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
    <input type="text" id="objetivo_inversion" name="objetivo_inversion" placeholder="Ingrese su objetivo de inversión"><br>

    <input type="submit" value="Enviar">
  `;
  contenedorFormulario.appendChild(formulario);

  // Ocultar las imágenes al cargar la página
  ocultarImagenesInversor();

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

    ocultarImagenesInversor();

    formulario.style.display = "none";
    mostrarMensajePersonalizado(mensajePersonalizado);

    mostrarImagenInversorEnMensaje(tipoInversor);
  });

  function mostrarImagenInversorEnMensaje(tipoInversor) {
    const index = obtenerIndiceTipoInversor(tipoInversor);
    const imagen = document.createElement("img");
    imagen.src = imagenesInversor[index];
    imagen.alt = tipoInversor;
    imagen.width = 100;
    contenedorTexto.appendChild(imagen);
  }

  function obtenerIndiceTipoInversor(tipoInversor) {
    switch (tipoInversor) {
      case "reservado":
        return 0;
      case "intermedio":
        return 1;
      case "agresivo":
        return 2;
      default:
        return -1;
    }
  }

  function ocultarImagenesInversor() {
    const imagenes = document.querySelectorAll("img");
    imagenes.forEach((imagen) => {
      imagen.style.display = "none";
    });
  }

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
    switch (tipoInversor) {
      case "reservado":
        return { recomendaciones: recomendaciones[0] };
      case "intermedio":
        return { recomendaciones: recomendaciones[1] };
      case "agresivo":
        return { recomendaciones: recomendaciones[2] };
      default:
        return { recomendaciones: [] };
    }
  }

  function mostrarMensajeError(mensaje) {
    contenedorTexto.innerHTML = `<p style="color: red;">${mensaje}</p>`;
  }

  function mostrarMensajePersonalizado(mensaje) {
    contenedorTexto.innerHTML = mensaje;
    contenedorTexto.style.display = "block";
  }
  // Estilo para formulario
  contenedorTexto.classList.add("styleForForm");
});
