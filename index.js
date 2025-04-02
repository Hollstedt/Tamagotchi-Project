// console.log("I am a trapped Tamagotchi. Hello? Help.");

let boxOfTamagotchis = [];
let currentPet = null;
let hardMode = false;


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
                let disableAnimal = document.querySelector(`.animal-select option[value="${this.animalType.toLowerCase().replace(' ', '')}"]`);
                
                this.energy = 0;
                this.fullness = 0;
                this.happiness = 0;
                
                activityLog.innerHTML = `<p>${this.name} just ran away.</p>` + activityLog.innerHTML;

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

    clamp(value, lowerLimit, upperLimit) {
        return Math.min(Math.max(value, lowerLimit), upperLimit);
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
        if (hardMode) {
            this.energy += 50;
            this.happiness -= 5;
            this.fullness -= 10;
            this.setLimit();
        } else {
            super.nap();
        }
    }
}

class Tamagotchi2 extends Tamagotchi {
    constructor (name) {
        super (name, "Tamagotchi 2");
    }

    eat() {
        if (hardMode) {
            this.fullness += 40;
            this.happiness += 5;
            this.energy -= 20;
            this.setLimit();
        } else {
            super.eat();
        }
    }
}

class Tamagotchi3 extends Tamagotchi {
    constructor (name) {
        super (name, "Tamagotchi 3");
    }
    play() {
        if (hardMode) {
            this.happiness += 40;
            this.fullness -= 20;
            this.energy -= 10;
            this.setLimit();
        } else {
            super.play();
        }
    }
}

class Tamagotchi4 extends Tamagotchi {
    constructor (name) {
        super (name, "Tamagotchi 4");
    }
    nap() {
        if (hardMode) {
            this.energy += 60;
            this.happiness -= 15;
            this.fullness -= 10;
            this.setLimit();
        } else {
            super.nap();
        }
    }
}


let submitBtn = document.querySelector(".create-btn");
let tamagotchiField = document.querySelector(".display-area");
let activityLog = document.querySelector(".log-area");

submitBtn.addEventListener ("click", function() {
    let inputValue = document.querySelector(".name-input").value;
    let selectValue = document.querySelector(".animal-select").value;
    let selectedAnimal = document.querySelector(`.animal-select option[value="${selectValue}"]`);

    if (selectedAnimal.disabled) {
        alert(`Ditt djur har "sprungit iväg"!`);
        return;
    }
    
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

let napBtn = document.querySelector(".nap-btn");
let playBtn = document.querySelector(".play-btn");
let eatBtn = document.querySelector(".eat-btn");
let hardModeBtn = document.querySelector("#hardModeBtn");


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