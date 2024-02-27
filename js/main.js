let inversorBucle = true;
nombreUsuario = prompt("Ingrese su nombre");
console.log(nombreUsuario);
alert("Hola que tal " + nombreUsuario);
while (inversorBucle) {
  tipoDeInversor =
    prompt(`¿${nombreUsuario} , que tipo de inversor se considera?

- A : Inversor Agresivo (No le tengo miedo al mercado)
- B : Inversor Intermedio (Busco ganarle a la inflación)
- C : Inversor Reservado (No me gusta arriesgarme invierto poco dinero)

`);
  console.log(tipoDeInversor);
  datoUsdt = prompt("¿Cuantos USDT posee en su cuenta?");
  console.log(datoUsdt);

  resultado10 = datoUsdt * 0.1;

  switch (tipoDeInversor.toUpperCase()) {
    case "A":
      alert(
        `Ya que eres un inversor agresivo desde Miceli's Capital te recomendamos invertir en :

       ⭕ Solana USDT ${resultado10 * 5}
       ⭕ BNB USDT ${resultado10 * 3}
       ⭕ BTC USDT ${resultado10 * 1}
       ⭕ USDT USDT ${resultado10 * 1}
       
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
       
       Te deseamos mucha suerte en tu criptocamino`
      );
      inversorBucle = false;
      break;
    case "C":
      alert(
        `Ya que eres un inversor Intermedio desde Miceli's Capital te recomendamos invertir en :

       ⭕ BTC USDT ${resultado10 * 5}
       ⭕ USDT USDT ${resultado10 * 5}
       
       Te deseamos mucha suerte en tu criptocamino`
      );
      inversorBucle = false;
      break;
    default:
      alert(
        "Veo que ingresaste un número/letra que no esta entre las opciones, te pido que por favor regreses y elijas entre las opciones en pantalla 👍"
      );
      break;
  }
}
