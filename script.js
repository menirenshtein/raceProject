const numOfCars = document.getElementById("amountOfCars");
const startRaceBtn = document.getElementById("RaceStart");
const mainDiv = document.getElementById("mainContainer");

startRaceBtn.addEventListener('click', (() => {
    const num = numOfCars.value;
    startRace(num);
}));

function startRace(num) {
    // Clear the main container before starting a new race
    // mainDiv.innerHTML = '';

    for (let i = 0; i < num; i++) {
        const raceLine = document.createElement("div");
        const finishLine = document.createElement("div");
        const image = document.createElement("img");

        image.setAttribute("class", "carImage");
        image.setAttribute("id", `carImage${i}`); 
        finishLine.setAttribute("class", "endOfRoad");
        raceLine.setAttribute("class", "raceRoad");

        image.src = `./carsImg/car${i+1}.png`;
        image.style.height = "45px";
        image.style.width = "60px";
        image.style.position = "relative"; 
        image.style.left = "0px"; 

        raceLine.appendChild(image);
        raceLine.style.display = 'flex';
        raceLine.appendChild(finishLine);
        mainDiv.appendChild(raceLine);
    }

    const now = Date.now(); 
    Race(now);
}

let imageCars = [
    {
        carImage: "./carsImg/car1.png",
        correctPosition: 0,
        status: "In Race"
    },
    {
        carImage: "./carsImg/car2.png",
        correctPosition: 0,
        status: "In Race"
    },
    {
        carImage: "./carsImg/car3.png",
        correctPosition: 0,
        status: "In Race"
    },
    {
        carImage: "./carsImg/car4.png",
        correctPosition: 0,
        status: "In Race"
    }
];

function Race(startTime) {
    const intervalId = setInterval(() => MoveCar(startTime), getRandomIntInclusive(1, 2) * 20);

    let finishedCount = 0;
    const checkFinish = setInterval(() => {
        finishedCount = imageCars.filter(car => car.status === "Finish").length;
        if (finishedCount === imageCars.length) {
            clearInterval(intervalId);
            clearInterval(checkFinish); 
        }
    }, 100);
}

function MoveCar(startTime) {
    for (let i = 0; i < numOfCars.value; i++) {
        const img = document.getElementById(`carImage${i}`);
        if (imageCars[i].correctPosition >= 1798) {
            if (imageCars[i].status !== "Finish") {
                imageCars[i].status = "Finish";
                const Win = document.createElement("div");
                Win.innerText = `Car ${i + 1} won in ${((Date.now() - startTime) / 1000).toFixed(2)} seconds! 🏆`;
                Win.setAttribute("id", `Winner${i}`);
                mainDiv.appendChild(Win);
            }
        } else {
            imageCars[i].correctPosition += getRandomIntInclusive(1, 10);
            img.style.left = `${imageCars[i].correctPosition}px`;
        }
    }
}

function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}
