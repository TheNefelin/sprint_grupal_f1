import * as func from "./utils/funciones.js";
import * as fs from "fs"

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

let arr = ["Termino", "Accidente con resultado de muerte","Falla en Vehiculo"];
let freq = [79,1,20];
let i;
let n = arr.length;
let estado = [];
let resultado ='';
let puestos = ''

for (i = 0; i < 20; i++){
    resultado = myRand(arr, freq, n)+'\n';
    estado.push(resultado);
}
fs.promises.writeFile("./resultados.json", estado);
