const TASA_INTERES_ANUAL = 0.1; //Se define la tasa de interés esperada a largo plazo, en este caso un año.

function recomendarInversion() {
  let inversorBucle = true;
  let nombreUsuario = prompt("Ingrese su nombre");
  console.log(nombreUsuario);
  alert("Hola que tal " + nombreUsuario);

  // Arrays de recomendaciones de inversión y rendimientos esperados
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

  // Función para buscar y filtrar las recomendaciones y multiplicadores
  function buscarRecomendacionesYMultiplicadores(tipoInversor) {
    switch (tipoInversor.toUpperCase()) {
      case "A":
        return {
          recomendaciones: recomendaciones[0],
          multiplicadores: multiplicadores[0],
        };
      case "B":
        return {
          recomendaciones: recomendaciones[1],
          multiplicadores: multiplicadores[1],
        };
      case "C":
        return {
          recomendaciones: recomendaciones[2],
          multiplicadores: multiplicadores[2],
        };
      default:
        return null;
    }
  }

  while (inversorBucle) {
    let tipoDeInversor =
      prompt(`¿${nombreUsuario} , qué tipo de inversor se considera?

  - A : Inversor Agresivo (No le tengo miedo al mercado)
  - B : Inversor Intermedio (Busco ganarle a la inflación)
  - C : Inversor Reservado (No me gusta arriesgarme, invierto poco dinero)

  `);
    console.log(tipoDeInversor);
    let datoUsdt = parseFloat(prompt("¿Cuántos USDT posee en su cuenta?"));
    console.log(datoUsdt);

    let resultado10 = datoUsdt * 0.1;
    let rendimientoEsperado = parseInt(resultado10 * TASA_INTERES_ANUAL);

    // Buscar recomendaciones y multiplicadores según el tipo de inversor
    const recomendacionYMultiplicador =
      buscarRecomendacionesYMultiplicadores(tipoDeInversor);

    if (recomendacionYMultiplicador) {
      const { recomendaciones, multiplicadores } = recomendacionYMultiplicador;
      alert(
        `Ya que eres un inversor ${tipoDeInversor} desde Miceli's Capital te recomendamos invertir en :
  
  ${recomendaciones
    .map(
      (recomendacion, index) =>
        `⭕${recomendacion} ${resultado10 * multiplicadores[index]}`
    )
    .join("\n")}
  
  Tu rendimiento esperado anual sería aproximadamente ${rendimientoEsperado} USDT.
  
  Te deseamos mucha suerte en tu criptocamino`
      );
      inversorBucle = false;
    } else {
      alert(
        "Veo que ingresaste un número/letra que no está entre las opciones, te pido que por favor regreses y elijas entre las opciones en pantalla 👍"
      );
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  recomendarInversion();

  let textoNosotros = document.getElementById("textoNosotros");

  textoNosotros.innerText =
    "Miceli's Capital es tu puerta de entrada al emocionante mundo de las criptomonedas. Nuestro equipo de expertos está dedicado a hacer crecer tu capital de manera inteligente y estratégica mediante inversiones en criptomonedas. Con años de experiencia en los mercados financieros y un profundo conocimiento del ecosistema criptográfico, estamos aquí para ayudarte a alcanzar tus objetivos financieros.";
  console.log(textoNosotros.innerText);
});
