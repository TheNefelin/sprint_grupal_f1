const cars = document.querySelectorAll(".race-speedway .race-car");

if(cars) {  
    fetch("/js/simulacion.json")
    .then(data => data.json())
    .then(dt => {
        
        dt.forEach((e, i) => {
   
            cars.forEach((car, index) => {
                setTimeout(() => {
                    const pos = e.filter(s => s.id == index + 1);
                    car.style = `--i:${pos[0].id - 1};--x:${-pos[0].dist};`
                }, 500 * i);
            });
        });
    });
};

