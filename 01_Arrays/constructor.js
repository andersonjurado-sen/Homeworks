let a = 1
console.log(a.constructor)
console.log(a.constructor == Number)

let b = [1, 2, 3, 4, 5]
console.log(b.constructor)

if (b.constructor != Number){
    console.log('No, la variable b no es numero')
    return        
}