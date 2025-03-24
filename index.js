// console.log("I am a trapped Tamagotchi. Hello? Help.");

let boxOfTamagotchis = [];
let currentPet = null;

class Tamagotchi {
    constructor (name, animalType, energy = 50, fullness = 50, happiness = 50) {
        this.name = name;
        this.animalType = animalType;
        this.energy = energy;
        this.fullness = fullness;
        this.happiness = happiness;
    }

    nap() {
        this.energy += 40;
        this.happiness -= 10;
        this.fullness -= 10;

        this.setLimit();
    }
    
    play() {
        this.happiness += 30;
        this.fullness -= 10;
        this.energy -= 10;

        this.setLimit();
    }
    
    eat() {
        this.fullness += 30;
        this.happiness += 5;
        this.energy -= 15;

        this.setLimit();
    }

    startTimer() {
        this.timer = setInterval(() => {
            this.energy -= 15;
            this.fullness -= 15;
            this.happiness -= 15;

            this.setLimit();
            
            if (this.energy <= 0 || this.fullness <= 0 || this.happiness <= 0) {
                clearInterval(this.timer)
                this.energy = 0;
                this.fullness = 0;
                this.happiness = 0;
                activityLog.innerHTML = `${this.name} just ran away.` + activityLog.innerHTML;
                let disableAnimal = document.querySelector(`#animalSelect option[value="${this.animalType.toLowerCase().replace(' ', '')}"]`);
                if (disableAnimal) {
                    disableAnimal.disabled = true;
                }
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

    clamp(num, lower, upper) {
        return Math.min(Math.max(num, lower), upper);
    }

    setLimit() {
        this.energy = this.clamp(this.energy, 0, 100);
        this.fullness = this.clamp(this.fullness, 0, 100);
        this.happiness = this.clamp(this.happiness, 0, 100);
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

        this.setLimit();
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

        this.setLimit();
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

        this.setLimit();
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

        this.setLimit();
    }
}


let submitBtn = document.querySelector("#nameInputBtn");
let tamagotchiField = document.querySelector(".textArea");
let activityLog = document.querySelector(".activity-log");

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

    currentPet = newPet;
    
    boxOfTamagotchis.push(newPet);
});

let napBtn = document.querySelector("#napBtn");
let playBtn = document.querySelector("#playBtn");
let eatBtn = document.querySelector("#eatBtn");

napBtn.addEventListener ("click", () => {
    if (currentPet) {
        currentPet.nap();
        currentPet.updateDisplay();
        activityLog.innerHTML = `<p>You took a nap with ${currentPet.name}</p>` + activityLog.innerHTML;
    }
});

playBtn.addEventListener ("click", () => {
    if (currentPet) {
        currentPet.play();
        currentPet.updateDisplay();
        activityLog.innerHTML = `<p>You played with ${currentPet.name}</p>` + activityLog.innerHTML;
    }
});

eatBtn.addEventListener ("click", () => {
    if (currentPet) {
        currentPet.eat();
        currentPet.updateDisplay();
        activityLog.innerHTML = `<p>${currentPet.name} had a little snack</p>` + activityLog.innerHTML;
    }
});