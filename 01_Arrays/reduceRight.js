let letras = ["a", "b", "c", "d"]

let letrasIn = letras.reduceRight((acc, actual) => acc + actual, "")
console.log(letrasIn)