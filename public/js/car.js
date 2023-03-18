const sim = [
    {pasos: [{index: 0, dist: 0}, {index: 1, dist: 0}]},
    {pasos: [{index: 0, dist: 1}, {index: 1, dist: 3}]},
    {pasos: [{index: 0, dist: 2}, {index: 1, dist: 6}]},
    {pasos: [{index: 0, dist: 4}, {index: 1, dist: 7}]},
    {pasos: [{index: 0, dist: 7}, {index: 1, dist: 8}]},
    {pasos: [{index: 0, dist: 10}, {index: 1, dist: 9}]},
    {pasos: [{index: 0, dist: 13}, {index: 1, dist: 11}]},
    {pasos: [{index: 0, dist: 13}, {index: 1, dist: 11}]},
    {pasos: [{index: 0, dist: 15}, {index: 1, dist: 14}]},
    {pasos: [{index: 0, dist: 18}, {index: 1, dist: 16}]},
];

if(document.querySelector(".race-speedway")) {       
    sim.forEach((e, i) => {
        const promesa = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 200 * i);
        });
    
        promesa.then(() => {
            const cars = document.querySelectorAll(".race-speedway .race-car");
            cars.forEach((car, index) => {
                const pos = e.pasos.filter(s => s.index == index);
                car.style = `--i:${pos[0].index};--x:${-pos[0].dist};`
            });
        });
    });
};

