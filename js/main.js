const TASA_INTERES_ANUAL = 0.1;

function recomendarInversion() {
  let inversorBucle = true;
  let nombreUsuario = prompt("Ingrese su nombre");
  console.log(nombreUsuario);
  alert("Hola que tal " + nombreUsuario);

  // Definir arrays de recomendaciones de inversión y rendimientos esperados
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

    switch (tipoDeInversor.toUpperCase()) {
      case "A":
        alert(
          `Ya que eres un inversor agresivo desde Miceli's Capital te recomendamos invertir en :

         ⭕ ${recomendaciones[0][0]} ${resultado10 * multiplicadores[0][0]}
         ⭕ ${recomendaciones[0][1]} ${resultado10 * multiplicadores[0][1]}
         ⭕ ${recomendaciones[0][2]} ${resultado10 * multiplicadores[0][2]}
         ⭕ ${recomendaciones[0][3]} ${resultado10 * multiplicadores[0][3]}
         
         Tu rendimiento esperado anual sería aproximadamente ${rendimientoEsperado} USDT.
         
         Te deseamos mucha suerte en tu criptocamino`
        );
        inversorBucle = false;
        break;
      case "B":
        alert(
          `Ya que eres un inversor Intermedio desde Miceli's Capital te recomendamos invertir en :

         ⭕ ${recomendaciones[1][0]} ${resultado10 * multiplicadores[1][0]}
         ⭕ ${recomendaciones[1][1]} ${resultado10 * multiplicadores[1][1]}
         ⭕ ${recomendaciones[1][2]} ${resultado10 * multiplicadores[1][2]}
         
         Tu rendimiento esperado anual sería aproximadamente ${rendimientoEsperado} USDT.
         
         Te deseamos mucha suerte en tu criptocamino`
        );
        inversorBucle = false;
        break;
      case "C":
        alert(
          `Ya que eres un inversor Reservado desde Miceli's Capital te recomendamos invertir en :

         ⭕ ${recomendaciones[2][0]} ${resultado10 * multiplicadores[2][0]}
         ⭕ ${recomendaciones[2][1]} ${resultado10 * multiplicadores[2][1]}
         
         Tu rendimiento esperado anual sería aproximadamente ${rendimientoEsperado} USDT.
         
         Te deseamos mucha suerte en tu criptocamino`
        );
        inversorBucle = false;
        break;
      default:
        alert(
          "Veo que ingresaste un número/letra que no está entre las opciones, te pido que por favor regreses y elijas entre las opciones en pantalla 👍"
        );
        break;
    }
  }
}

recomendarInversion();
