function findCeil(arr, r, l, h) {
    let mid;
    while (l < h) {
        mid = l + ((h - l) >> 1);
        (r > arr[mid]) ? (l = mid + 1) : (h = mid);
    }
    return (arr[l] >= r) ? l : -1;
}

function myRand(arr, freq, n) {
    let prefix = [];
    let i;
    prefix[0] = freq[0];
    for (i = 1; i < n; ++i)
        prefix[i] = prefix[i - 1] + freq[i];
    let r = Math.floor((Math.random() * prefix[n - 1])) + 1;

    let indexc = findCeil(prefix, r, 0, n - 1);
    return arr[indexc];
}

export function randomprob(probj) {
    //let arr = ["Termino", "Accidente con resultado de muerte","Falla en Vehiculo"];
    let arr = [];
    let freq = [];
    let i;
    let resultado = '';

    probj.forEach(element => {
        arr.push(element.id);
        freq.push(element.prob);
    });

    resultado = myRand(arr, freq, arr.length);
    console.log(probj[resultado]);

    return probj[resultado];
}

let test = [{
    id: 0,
    situacion: "Accidente sin muerte",
    prob: 4,
    puntuacion: 0,
    vivo: true
}, {
    id: 1,
    situacion: "Accidente con muerte",
    prob: 1,
    puntuacion: 0,
    vivo: false
}, {
    id: 2,
    situacion: "Abandono por problemas tecnicos",
    prob: 10,
    puntuacion: 0,
    vivo: true
}, {
    id: 3,
    situacion: "Avance lento",
    prob: 25,
    puntuacion: 1,
    vivo: true
}, {
    id: 4,
    situacion: "Avance regular",
    prob: 40,
    puntuacion: 2,
    vivo: true
}, {
    id: 5,
    situacion: "Avance rapido",
    prob: 20,
    puntuacion: 3,
    vivo: true
}]

let arreglo = randomprob(test);