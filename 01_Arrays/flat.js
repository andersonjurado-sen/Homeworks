let x = [1, 3, 4, 5, [5, 6, 9], [1, 2], 3]
let x2 = x.flat()
console.log(x2)

let y = [1, 3, 4, [5, [5, [6, 9]]], [1, 2], 3]
let y2 = y.flat(2)
console.log(y2)

let z = [1, 3, 4, [5, [5, [6, 9]]], [1, 2], 3]
let z2 = y.flat(Infinity)
console.log(z2)