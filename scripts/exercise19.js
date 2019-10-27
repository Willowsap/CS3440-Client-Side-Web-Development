class LemonadeStand {

    constructor(lemons, gallonsOfWater, cupsOfSugar, emptyGlasses, price) {
        // initialize state
        this.state = {
            ingredients : {
                "Lemons" : 0 ,
                "Gallons of Water" : 0,
                "Cups of Sugar" : 0 ,
                "Empty Glasses" : 0
            },
            businessInfo : {
                "Glasses of Lemonade" : 0,
                "Income" : 0,
                "Price" : 0
            },
            recipe : {
                "Lemons" : 6,
                "Gallons of Water" : 1,
                "Cups of Sugar" : 1,
                "Empty Glasses" : 8,
                "Glasses Produced" : 8
            }
        };
        this.setLemons(lemons);
        this.setGallonsOfWater(gallonsOfWater);
        this.setCupsOfSugar(cupsOfSugar);
        this.setEmptyGlasses(emptyGlasses);
        this.setPrice(price);
    }

    makeLemonade() {
        if (this.insufficientIngredients()) {
            return 0;
        }
        this.updateIngredients({
            "Lemons" : this.getLemons() - this.state.recipe["Lemons"],
            "Gallons of Water" : this.getGallonsOfWater() - this.state.recipe["Gallons of Water"],
            "Cups of Sugar" : this.getCupsOfSugar() - this.state.recipe["Cups of Sugar"],
            "Empty Glasses" : this.getEmptyGlasses() - this.state.recipe["Empty Glasses"]
        })
        this.updateBusinessInfo({
            "Glasses of Lemonade" : this.getGlassesOfLemonade() + this.state.recipe["Glasses Produced"]
        })
        return 8;
    }

    sellLemonade() {
        if (!this.getGlassesOfLemonade() && !this.makeLemonade()) {
            return 0;
        }
        this.updateBusinessInfo({
            "Glasses of Lemonade" : this.getGlassesOfLemonade() - 1,
            "Income" : this.getIncome() + this.getPrice()
        });
        return 1;
    }

    sellMoreLemonade(amount) {
        amount = amount > 8 ? 8 : amount;
        let glassesSold = 0;
        for (let i = 0; i < amount; i++) {
            if (this.sellLemonade()) {
                glassesSold += 1;
            } else {
                break;
            }
        }
        return glassesSold;
    }

    showIngredients(id) {
        let ingredientTable = "<table><caption>Ingredients</caption>";
        for (const ingredient in this.state.ingredients) {
            ingredientTable += "<tr><td>";
            ingredientTable += ingredient;
            ingredientTable += "</td><td class='number'>";
            ingredientTable += this.state.ingredients[ingredient];
            ingredientTable += "</td></tr>"
        }
        ingredientTable += "</table>"
        document.getElementById(id).innerHTML = ingredientTable;
    }

    showAdmin(id) {
        let adminSection = "<h1>Admin</h1>";
        adminSection += "<ul>";
        for (const info in this.state.businessInfo) {
            adminSection += "<li>";
            adminSection += info;
            adminSection += ": ";
            adminSection += this.state.businessInfo[info];
            adminSection += "</li>";
        }
        adminSection += "</ul>";
        document.getElementById(id).innerHTML = adminSection;
    }

    updateIngredients(ingredients) {
        for (const ingredient in ingredients) {
            if (this.state.ingredients.hasOwnProperty(ingredient)){
                this.state.ingredients[ingredient] = ingredients[ingredient] < 0 
                    ? 0 : ingredients[ingredient];
            }
        }
    }

    updateBusinessInfo(businessInfo) {
        for (const info in businessInfo) {
            if (this.state.businessInfo.hasOwnProperty(info)){
                this.state.businessInfo[info] = businessInfo[info] < 0 
                    ? 0 : businessInfo[info];
            }
        }
    }

    setLemons(lemons) {
        this.updateIngredients({"Lemons" : lemons})
    }

    setGallonsOfWater(gallonsOfWater) {
        this.updateIngredients({"Gallons of Water" : gallonsOfWater})
    }

    setCupsOfSugar(cupsOfSugar) {
        this.updateIngredients({"Cups of Sugar" : cupsOfSugar})
    }

    setEmptyGlasses(emptyGlasses) {
        this.updateIngredients({"Empty Glasses" : emptyGlasses})
    }

    setGlassesOfLemonade(glassesOfLemonade) {
        this.updateBusinessInfo({"Glasses of Lemonade" : glassesOfLemonade})
    }

    setPrice(price) {
        this.updateBusinessInfo({"Price" : price})        
    }

    setIncome(income) {
        this.updateBusinessInfo({"Income" : income})        
    }

    getLemons() {
        return this.state.ingredients["Lemons"];
    }

    getGallonsOfWater() {
        return this.state.ingredients["Gallons of Water"];
    }

    getCupsOfSugar() {
        return this.state.ingredients["Cups of Sugar"];
    }

    getEmptyGlasses() {
        return this.state.ingredients["Empty Glasses"];
    }

    getGlassesOfLemonade() {
        return this.state.businessInfo["Glasses of Lemonade"];
    }

    getPrice() {
        return this.state.businessInfo["Price"];
    }

    getIncome() {
        return this.state.businessInfo["Income"];
    }

    getRecipe() {
        return this.state.recipe;
    }

    insufficientIngredients() {
        if (this.state.ingredients["Lemons"] < this.state.recipe["Lemons"] ||
            this.state.ingredients["Gallons of Water"] < this.state.recipe["Gallons of Water"] ||
            this.state.ingredients["Cups of Sugar"] < this.state.recipe["Cups of Sugar"] ||
            this.state.ingredients["Empty Glasses"] < this.state.recipe["Empty Glasses"]) {
            return true;
        }
        return false;
    }

    ingredientsNeeded() {
        let ingredients = {};
        let required = 0;
        for (const ingredient in this.state.ingredients) {
            required = this.state.recipe[ingredient] - this.state.ingredients[ingredient];
            if (required > 0) {
                ingredients[ingredient] = required;
            }
        }
        return ingredients;
    }
    
}

const ls = new LemonadeStand(15,3,4,20,1.5);
reload();
addEventListeners();

function reload(errorCauser) {
    setErrorMessage(errorCauser);
    ls.showIngredients("ingredients");
    ls.showAdmin("admin");
}

function makeLemonade() {
    glassesMade = ls.makeLemonade();
    error = glassesMade === 0 ? "make" : "";
    reload(error);
}

function sellLemonade() {
    if(event.srcElement.id != "sellInput") {
        glassesSold = ls.sellMoreLemonade(Number(document.getElementById("sellInput").value));
        if(glassesSold < Number(document.getElementById("sellInput").value)
            && Number(document.getElementById("sellInput").value) <= 8) {
            notEnoughLemonade(glassesSold);
        } else if (Number(document.getElementById("sellInput").value) > 8) {
            triedToSellToManyGlassesAtOnce(glassesSold);
        }
        document.getElementById("sellInput").value = "1";
        reload();
    }
}

function changePrice() {
    if(event.srcElement.id != "priceInput") {
        ls.setPrice(Number(document.getElementById("priceInput").value));
        document.getElementById("priceInput").value = ls.getPrice();
        reload();
    }
}

function addLemons(event) {
    if(event.srcElement.id != "lemonsInput") {
        ls.setLemons(ls.getLemons() + Number(document.getElementById("lemonsInput").value));
        document.getElementById("lemonsInput").value = "";
        reload();
    }
}

function addGallonsOfWater() {
    if(event.srcElement.id != "gallonsOfWaterInput") {
        ls.setGallonsOfWater(ls.getGallonsOfWater() + Number(document.getElementById("gallonsOfWaterInput").value));
        document.getElementById("gallonsOfWaterInput").value = "";
        reload();
    }
}

function addCupsOfSugar() {
    if(event.srcElement.id != "cupsOfSugarInput") {
        ls.setCupsOfSugar(ls.getCupsOfSugar() + Number(document.getElementById("cupsOfSugarInput").value));
        document.getElementById("cupsOfSugarInput").value = "";
        reload();
    }
}

function addEmptyGlasses() {
    if(event.srcElement.id != "emptyGlassesInput") {
        ls.setEmptyGlasses(ls.getEmptyGlasses() + Number(document.getElementById("emptyGlassesInput").value));
        document.getElementById("emptyGlassesInput").value = "";
        reload();
    }
}

function setErrorMessage(errorCauser) {
    let requiredIngredients = ls.ingredientsNeeded();
    let message = "";
    if ((!ls.getGlassesOfLemonade() || errorCauser == "make") && Object.entries(requiredIngredients).length) {
        message = "<h2>Error: Need more Ingredients</h2>";
        message += "<h3>Ingredients Required:</h3>";
        message += "<ul>"
        for (const ingredient in requiredIngredients) {
            message += "<li>";
            message += requiredIngredients[ingredient];
            message += (" " + ingredient);
            message += "</li>";
        }
        message += "</ul>"
    }
    document.getElementById("error").innerHTML = message;
}

function addEventListeners() {
    const lemonInput = document.getElementById("lemonsInput");
    const waterInput = document.getElementById("gallonsOfWaterInput");
    const sugarInput = document.getElementById("cupsOfSugarInput");
    const glassesInput = document.getElementById("emptyGlassesInput");
    const priceInput = document.getElementById("priceInput");
    const sellInput = document.getElementById("sellInput");

    lemonInput.addEventListener("keyup", function(event) {
        if (event.keyCode === 13)
            document.getElementById("lemonButton").click();
    });
    waterInput.addEventListener("keyup", function(event) {
        if (event.keyCode === 13)
            document.getElementById("waterButton").click();
    });
    sugarInput.addEventListener("keyup", function(event) {
        if (event.keyCode === 13)
            document.getElementById("sugarButton").click();
    });
    glassesInput.addEventListener("keyup", function(event) {
        if (event.keyCode === 13)
            document.getElementById("glassesButton").click();
    });
    priceInput.addEventListener("keyup", function(event) {
        if (event.keyCode === 13)
            document.getElementById("priceButton").click();
    });
    sellInput.addEventListener("keyup", function(event) {
        if (event.keyCode === 13)
            document.getElementById("priceButton").click();
    });
}

function notEnoughLemonade(glassesSold) {
    message = "<h3>Not enough lemonade.<br>";
    message += glassesSold;
    message += " glasses sold.</h3>"
    message += "<button onClick=dismissSellError() class='dismissButton'>Okay</button>";
    document.getElementById("sellError").innerHTML = message;
}

function triedToSellToManyGlassesAtOnce(glassesSold) {
    message = "<h3>Cannot sell more than 8 glasses at once.<br>";
    message += glassesSold;
    message += " glasses sold.</h3>";
    message += "<button onClick=dismissSellError() class='dismissButton'>Okay</button>";
    document.getElementById("sellError").innerHTML = message;
}

function dismissSellError() {
    document.getElementById("sellError").innerHTML = "";
}