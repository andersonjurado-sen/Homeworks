let estudiantes = [
    {codigo: 141, nombre: "Anderson", asignatura: "Calculo 1"},
    {codigo: 123, nombre: "Roberto", asignatura: "Fisica"},
    {codigo: 125, nombre: "Claudia", asignatura: "Calculo 1"},
    {codigo: 128, nombre: "Fredy", asignatura: "Algebra"},
    {codigo: 163, nombre: "Alvaro", asignatura: "MF"},
    {codigo: 198, nombre: "Fernanda", asignatura: "Algebra"}
]

let findAlgebra = estudiantes.findIndex (alg => alg.asignatura == "Algebra")
console.log(findAlgebra)

let findCalculo = estudiantes.findIndex (cal => cal.asignatura == "Calculo 1")
console.log(findCalculo)