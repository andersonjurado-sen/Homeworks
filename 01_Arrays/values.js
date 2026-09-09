let nombres = ["Anderson", "Roberto", "Claudia"]
let notas = [4.3, 3.8, 4.5]

let iterNombres = nombres.values()
let iterNotas = notas.values()

let resultado = []
let siguienteNombre = iterNombres.next()
let siguienteNota = iterNotas.next()

while (!siguienteNombre.done && !siguienteNota.done) {
  resultado.push(`${siguienteNombre.value}: ${siguienteNota.value}`)
  siguienteNombre = iterNombres.next()
  siguienteNota = iterNotas.next()
}
console.log(resultado)