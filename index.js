// console.log("I am a trapped Tamagotchi. Hello? Help.");

let boxOfTamagotchis = [];

class Tamagotchi {
    constructor (name, animalType, energy, fullness, happiness) {
        this.name = name;
        this.animalType = animalType;
        this.energy = 50;
        this.fullness = 50;
        this.happiness = 50;
    }

    nap() {
        this.energy += 40;
        this.happiness -= 10;
        this.fullness -= 10;
    }
    
    play() {
        this.happiness += 30;
        this.fullness -= 10;
        this.energy -= 10;
    }
    
    eat() {
        this.fullness += 30;
        this.happiness += 5;
        this.energy -= 15;
    }

    startTimer() {
        this.timer = setInterval(() => {
            this.energy -= 15;
            this.fullness -= 15;
            this.happiness -= 15;
            
            if (this.energy <= 0 || this.fullness <= 0 || this.happiness <= 0) {
                clearInterval(this.timer)
                this.energy = 0;
                this.fullness = 0;
                this.happiness = 0;
            }

            tamagotchiField.innerHTML = `
            <p>Name: ${this.name}</p>
            <p>Type: ${this.animalType}</p>
            <p>Energy: ${this.energy}</p>
            <p>Fullness: ${this.fullness}</p>
            <p>Happiness: ${this.happiness}</p>
            `;

        }, 1000);
    }
    
    updateDisplay() {
        tamagotchiField.innerHTML = `
            <p>Name: ${this.name}</p>
            <p>Type: ${this.animalType}</p>
            <p>Energy: ${this.energy}</p>
            <p>Fullness: ${this.fullness}</p>
            <p>Happiness: ${this.happiness}</p>
        `;
    }
}

class Tamagotchi1 extends Tamagotchi {
    constructor (name) {
        super (name, "Tamagotchi 1");
    }
    
    nap() {
        this.energy += 50;
        this.happiness -= 5;
        this.fullness -= 10;
    }
}

class Tamagotchi2 extends Tamagotchi {
    constructor (name) {
        super (name, "Tamagotchi 2");
    }
    eat() {
        this.fullness += 40;
        this.happiness += 5;
        this.energy -= 20;
    }
}

class Tamagotchi3 extends Tamagotchi {
    constructor (name) {
        super (name, "Tamagotchi 3");
    }
    play() {
        this.happiness += 40;
        this.fullness -= 20;
        this.energy -= 10;
    }
}

class Tamagotchi4 extends Tamagotchi {
    constructor (name) {
        super (name, "Tamagotchi 4");
    }
    nap() {
        this.energy += 60;
        this.happiness -= 15;
        this.fullness -= 10;
    }
}


let submitBtn = document.querySelector("#nameInputBtn");
let tamagotchiField = document.querySelector(".textArea");

submitBtn.addEventListener ("click", function() {
    let inputValue = document.querySelector("#nameInput").value;
    let selectValue = document.querySelector("#animalSelect").value;
    
    let newPet;   
    if (selectValue === "tamagotchi1") {
        newPet = new Tamagotchi1(inputValue)
    } else if (selectValue === "tamagotchi2") {
        newPet = new Tamagotchi2(inputValue)
    } else if (selectValue === "tamagotchi3") {
        newPet = new Tamagotchi3(inputValue)
    } else if (selectValue === "tamagotchi4") {
        newPet = new Tamagotchi4(inputValue)
    }
    
    tamagotchiField.innerHTML = `
    <p>Name: ${newPet.name}</p>
    <p>Type: ${newPet.animalType}</p>
    <p>Energy: ${newPet.energy}</p>
    <p>Fullness: ${newPet.fullness}</p>
    <p>Happiness: ${newPet.happiness}</p>
    `;

    newPet.startTimer();
    
    let napBtn = document.querySelector("#napBtn");
    let playBtn = document.querySelector("#playBtn");
    let eatBtn = document.querySelector("#eatBtn");

    napBtn.addEventListener ("click", () => {
        newPet.nap();
        newPet.updateDisplay();
    });

    playBtn.addEventListener ("click", () => {
        newPet.play();
        newPet.updateDisplay();
    });

    eatBtn.addEventListener ("click", () => {
        newPet.eat();
        newPet.updateDisplay();
    });
    
    boxOfTamagotchis.push(newPet);
});