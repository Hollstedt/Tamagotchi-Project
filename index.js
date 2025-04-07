let hardMode = false;

class Tamagotchi {
    constructor (name, animalType, energy = 50, fullness = 50, happiness = 50) {
        this.name = name;
        this.animalType = animalType;
        this.energy = energy;
        this.fullness = fullness;
        this.happiness = happiness;
        this.slot = null;
        this.imageClass = "";
    }

    nap() {
        this.energy += 40;
        this.happiness -= 10;
        this.fullness -= 10;
        this.setLimit();
        this.updateDisplay();
    }
    
    play() {
        this.happiness += 30;
        this.fullness -= 10;
        this.energy -= 10;
        this.setLimit();
        this.updateDisplay();
    }
    
    eat() {
        this.fullness += 30;
        this.happiness += 5;
        this.energy -= 15;
        this.setLimit();
        this.updateDisplay();
    }

    startTimer() {
        this.timer = setInterval(() => {
            this.energy -= 15;
            this.fullness -= 15;
            this.happiness -= 15;
            this.setLimit();
    
            let slotElement = document.querySelector(`#slot${this.slot + 1}`);
            let activityLog = slotElement.querySelector(".log-area");
    
            if (this.energy <= 0 || this.fullness <= 0 || this.happiness <= 0) {
                this.energy = 0;
                this.fullness = 0;
                this.happiness = 0;
                this.updateDisplay();
                clearInterval(this.timer);
    
                activityLog.innerHTML = `<p>${this.name} har sprungit iväg på grund av misskötsel.</p>` + activityLog.innerHTML;
    
                setTimeout(() => {
                    boxOfTamagotchis[this.slot] = null;
                    slotElement.classList.remove("active");
                    slotElement.querySelector(".display-area").innerHTML = `<div class="pet-image"></div>`;
                    slotElement.querySelector(".log-area").innerHTML = "";
                }, 3000);
    
                return;
            }
    
            this.updateDisplay();
        }, 10000);
    }
    
    updateDisplay() {
        let slotElement = document.querySelector(`#slot${this.slot + 1}`);
        let tamagotchiField = slotElement.querySelector(".display-area");
        
        tamagotchiField.innerHTML = `
            <div class="pet-image ${this.imageClass}"></div>
            <p><span class="label">Name:</span> ${this.name}</p>
            <p><span class="label">Animal type:</span> ${this.animalType}</p>
            <p><span class="label">Energy:</span> ${this.energy}</p>
            <p><span class="label">Fullness:</span> ${this.fullness}</p>
            <p><span class="label">Happiness:</span> ${this.happiness}</p>
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
        super (name, "The Ant");
        this.imageClass = "tamagotchi-img1";
    }
    
    nap() {
        if (hardMode) {
            this.energy += 50;
            this.happiness -= 5;
            this.fullness -= 10;
            this.setLimit();
            this.updateDisplay();
        } else {
            super.nap();
        }
    }
}

class Tamagotchi2 extends Tamagotchi {
    constructor (name) {
        super (name, "The Ant-est");
        this.imageClass = "tamagotchi-img2";
    }

    eat() {
        if (hardMode) {
            this.fullness += 40;
            this.happiness += 5;
            this.energy -= 20;
            this.setLimit();
            this.updateDisplay();
        } else {
            super.eat();
        }
    }
}

class Tamagotchi3 extends Tamagotchi {
    constructor (name) {
        super (name, "The Ant-est-est");
        this.imageClass = "tamagotchi-img3";
    }
    play() {
        if (hardMode) {
            this.happiness += 40;
            this.fullness -= 20;
            this.energy -= 10;
            this.setLimit();
            this.updateDisplay();
        } else {
            super.play();
        }
    }
}

class Tamagotchi4 extends Tamagotchi {
    constructor (name) {
        super (name, "The Aant");
        this.imageClass = "tamagotchi-img4";
    }
    nap() {
        if (hardMode) {
            this.energy += 60;
            this.happiness -= 15;
            this.fullness -= 10;
            this.setLimit();
            this.updateDisplay();
        } else {
            super.nap();
        }
    }
}

boxOfTamagotchis = [null, null, null, null];

let createBtn = document.querySelector(".create-btn");
createBtn.addEventListener("click", createNewPet);

function createNewPet() {
    let nameInput = document.querySelector(".name-input").value;
    let selectValue = document.querySelector(".animal-select").value;
    
    if (!nameInput) {
        alert("Du måste ge din Tamagotchi ett namn!");
        return;
    }
    
    let freeSlot = boxOfTamagotchis.findIndex(slot => slot === null);
    
    if (freeSlot === -1) {
        alert("Alla slots är fulla! Du kan inte skapa fler Tamagotchis just nu.");
        return;
    }
    
    let targetSlot = document.querySelector(`#slot${freeSlot + 1}`);
    let tamagotchiField = targetSlot.querySelector(".display-area");
    let activityLog = targetSlot.querySelector(".log-area");
    
    targetSlot.classList.add('active');
    
    let newPet;   
    if (selectValue === "tamagotchi1") {
        newPet = new Tamagotchi1(nameInput);
    } else if (selectValue === "tamagotchi2") {
        newPet = new Tamagotchi2(nameInput);
    } else if (selectValue === "tamagotchi3") {
        newPet = new Tamagotchi3(nameInput);
    } else if (selectValue === "tamagotchi4") {
        newPet = new Tamagotchi4(nameInput);
    }
    
    newPet.slot = freeSlot;
    
    boxOfTamagotchis[freeSlot] = newPet;
    
    tamagotchiField.innerHTML = `
    <div class="pet-image ${newPet.imageClass}"></div>
    <p><span class="label">Name:</span> ${newPet.name}</p>
    <p><span class="label">Animal type:</span> ${newPet.animalType}</p>
    <p><span class="label">Energy:</span> ${newPet.energy}</p>
    <p><span class="label">Fullness:</span> ${newPet.fullness}</p>
    <p><span class="label">Happiness:</span> ${newPet.happiness}</p>
    `;
    
    activityLog.innerHTML = `<p>${newPet.name} enjoyed life for the first time!</p>` + activityLog.innerHTML;
    
    document.querySelector(".name-input").value = "";
    
    newPet.startTimer();
}

document.querySelectorAll(".tamagotchi").forEach((slot, index) => {
    let napBtn = slot.querySelector(".nap-btn");
    let playBtn = slot.querySelector(".play-btn");
    let eatBtn = slot.querySelector(".eat-btn");
    
    napBtn.addEventListener("click", () => {
        let pet = boxOfTamagotchis[index];
        if (pet) {
            pet.nap();
            let activityLog = slot.querySelector(".log-area");
            activityLog.innerHTML = `<p>You took a nap with ${pet.name}</p>` + activityLog.innerHTML;
        }
    });
    
    playBtn.addEventListener("click", () => {
        let pet = boxOfTamagotchis[index];
        if (pet) {
            pet.play();
            let activityLog = slot.querySelector(".log-area");
            activityLog.innerHTML = `<p>You played with ${pet.name}</p>` + activityLog.innerHTML;
        }
    });
    
    eatBtn.addEventListener("click", () => {
        let pet = boxOfTamagotchis[index];
        if (pet) {
            pet.eat();
            let activityLog = slot.querySelector(".log-area");
            activityLog.innerHTML = `<p>${pet.name} had a little snack</p>` + activityLog.innerHTML;
        }
    });
});

function resetGame() {
    boxOfTamagotchis.forEach(pet => {
        if (pet && pet.timer) {
            clearInterval(pet.timer);
            
        }
    });
    
    boxOfTamagotchis = [null, null, null, null];
    
    document.querySelectorAll(".tamagotchi").forEach(slot => {
        slot.classList.remove('active');
        slot.querySelector(".display-area").innerHTML = `<div class="pet-image"></div>`;
        slot.querySelector(".log-area").innerHTML = "";
    });
    
    document.querySelector(".name-input").value = "";
}

document.querySelector(".reset-btn").addEventListener("click", resetGame);