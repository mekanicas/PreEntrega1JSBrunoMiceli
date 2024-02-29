const TASA_INTERES_ANUAL = 0.1;

function recomendarInversion() {
  let inversorBucle = true;
  let nombreUsuario = prompt("Ingrese su nombre");
  console.log(nombreUsuario);
  alert("Hola que tal " + nombreUsuario);
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

         ⭕ Solana USDT ${resultado10 * 5}
         ⭕ BNB USDT ${resultado10 * 3}
         ⭕ BTC USDT ${resultado10 * 1}
         ⭕ USDT USDT ${resultado10 * 1}
         
         Tu rendimiento esperado anual sería aproximadamente ${rendimientoEsperado} USDT.
         
         Te deseamos mucha suerte en tu criptocamino`
        );
        inversorBucle = false;
        break;
      case "B":
        alert(
          `Ya que eres un inversor Intermedio desde Miceli's Capital te recomendamos invertir en :

         ⭕ ETHERUM USDT ${resultado10 * 4}
         ⭕ BTC USDT ${resultado10 * 4}
         ⭕ USDT USDT ${resultado10 * 2}
         
         Tu rendimiento esperado anual sería aproximadamente ${rendimientoEsperado} USDT.
         
         Te deseamos mucha suerte en tu criptocamino`
        );
        inversorBucle = false;
        break;
      case "C":
        alert(
          `Ya que eres un inversor Reservado desde Miceli's Capital te recomendamos invertir en :

         ⭕ BTC USDT ${resultado10 * 5}
         ⭕ USDT USDT ${resultado10 * 5}
         
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
