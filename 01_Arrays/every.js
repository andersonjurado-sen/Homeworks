let x = [2, 4, 6, 8, 10, 24, 86, 77, 90]
x.every(numeroPar => {
    if (numeroPar % 2 == 0){
        console.log(`${numeroPar} Es par`)
        return true;
    } else {
        console.log(`${numeroPar} No es par`)
    }
})