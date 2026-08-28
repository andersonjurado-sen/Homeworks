let productos = [
  { nombre: "Camisa", precio: 50000 },
  { nombre: "Pantalón", precio: 80000 },
  { nombre: "Zapatos", precio: 120000 }
]

let total = 0;
productos.forEach(prod => {
  total += prod.precio;
  console.log(`${prod.nombre}: $${prod.precio}`)
})
console.log(`Total: $${total}`);