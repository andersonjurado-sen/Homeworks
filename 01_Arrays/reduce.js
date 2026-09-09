let estudiantes = [
    {codigo: 141, nombre: "Anderson", asignatura: "Calculo 1", nota: 4.3},
    {codigo: 123, nombre: "Roberto", asignatura: "Fisica", nota: 3.8},
    {codigo: 125, nombre: "Claudia", asignatura: "Calculo 1", nota: 4.5},
    {codigo: 128, nombre: "Fredy", asignatura: "Algebra", nota: 2.6},
    {codigo: 163, nombre: "Alvaro", asignatura: "MF", nota: 4.2},
    {codigo: 198, nombre: "Fernanda", asignatura: "Algebra", nota: 4.8}
]
 let sumaNotas = estudiantes.reduce((suma, y) => suma + y.nota, 0)
 let promedioNotas = sumaNotas / estudiantes.length

 console.log(sumaNotas)
 console.log(promedioNotas)