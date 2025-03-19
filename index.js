// console.log("I am a trapped Tamagotchi. Hello? Help.");

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

    countdowntimer() {
        ///// I AM HERE, going to add countdown timer onclick submitBtn
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

    abilities() {
        return `This one is a sleeper! Gets much more energy from sleeping.`
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
});