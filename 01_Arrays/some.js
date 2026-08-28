let edades = [8, 11, 12, 12, 14, 24, 56, 23, 17, 18, 19, 32]
let TFedadPar = edades.some(x => x % 2 == 0)
console.log(TFedadPar)

let edades2 = [24, 42, 56, 98, 66, 16]
let TFedadImpar = edades2.some(y => y % 2 !==0)
console.log(TFedadImpar)