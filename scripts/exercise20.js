class LemonadeStand {
    /*
     * Constructs the lemonade stand.
     * Initializes state.
     */
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
                "Price per Glass" : 2.00,
                "Glasses of Lemonade" : 0,
                "Income" : 0
            },
            recipe : {
                "Lemons" : 6,
                "Gallons of Water" : 1,
                "Cups of Sugar" : 1,
                "Empty Glasses" : 8,
                "Glasses Produced" : 8
            },
            sellMoreMax : 12

        };
        this.setLemons(lemons);
        this.setGallonsOfWater(gallonsOfWater);
        this.setCupsOfSugar(cupsOfSugar);
        this.setEmptyGlasses(emptyGlasses);
        this.setPrice(price);
    }

    /* 
     * Makes on batch of lemonade.
     * Recipe stored in state.
     */
    makeLemonade() {
        if (this.insufficientIngredients()) {
            return 0;
        }
        this.updateIngredients({
            "Lemons" : -1 * this.state.recipe["Lemons"],
            "Gallons of Water" : -1 * this.state.recipe["Gallons of Water"],
            "Cups of Sugar" : -1 * this.state.recipe["Cups of Sugar"],
            "Empty Glasses" : -1 * this.state.recipe["Empty Glasses"]
        })
        this.updateBusinessInfo({
            "Glasses of Lemonade" : this.getGlassesOfLemonade() + this.state.recipe["Glasses Produced"]
        })
        return this.state.sellMoreMax;
    }

    /*
     * Sells one glass of lemonade.
     * Returns 1 if the glass is sold.
     */
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

    /*
     * Sells a specified number of glasses of lemonade.
     * Returns the number of glasses sold.
     * Will not sell more than the max allowed as specified in the state
     * Will sell as many as possible when the number is too high.
     */
    sellMoreLemonade(amount) {
        amount = amount > this.state.sellMoreMax ? this.state.sellMoreMax : amount;
        let glassesSold = 0;
        for (let i = 0; i < amount; i++) {
            if (this.sellLemonade()) {
                glassesSold += 1;
            } else break;
        }
        return glassesSold;
    }

    /*
     * Displays a table of all the ingredients.
     * Displays within given element with given id
     */
    showIngredients() {
        // initialize table
        let ingredientTable = document.createElement('table');

        // add caption
        let tableCaption = document.createElement('h2');
        tableCaption.appendChild(document.createTextNode("Inventory"));

        // add table content
        for (const ingredient in this.state.ingredients) {
            let tableRow = document.createElement('tr');
            let tableColumn1 = document.createElement('td');
            let tableColumn2 = document.createElement('td');

            tableColumn1.appendChild(document.createTextNode(ingredient));
            tableColumn2.appendChild(document.createTextNode(this.state.ingredients[ingredient]));
            tableColumn2.setAttribute("class", "number");
            tableColumn2.setAttribute("id", ingredient);

            tableRow.appendChild(tableColumn1);
            tableRow.appendChild(tableColumn2);
            ingredientTable.appendChild(tableRow);
        }

        // make the article, add the table, and put it in the body
        let ingredientArticle = document.createElement('article');
        ingredientArticle.setAttribute("id", "ingredients");
        ingredientArticle.appendChild(tableCaption);
        ingredientArticle.appendChild(ingredientTable);

        document.getElementById("infoSection").appendChild(ingredientArticle);
    }

    /*
     * Displays a list of admin info
     * Displays within given element with given id
     */
    showAdmin() {
        // create header 
        let adminHeader = document.createElement('h2');
        adminHeader.appendChild(document.createTextNode("Admin"));

        // create admin info list
        let adminList = document.createElement('ul');
        for (const info in this.state.businessInfo) {
            let adminItem = document.createElement('li');
            let printedInfo = this.state.businessInfo[info];
            if (info == "Price per Glass" || "Income") {
                printedInfo = "$" + parseFloat(Math.round(printedInfo * 100) / 100).toFixed(2);
            }
            adminItem.appendChild(document.createTextNode(info + ": " + printedInfo));
            adminItem.setAttribute('id', info);
            adminList.appendChild(adminItem);
        }
        
        let adminArticle = document.createElement('article');
        adminArticle.setAttribute("id", "admin");
        adminArticle.appendChild(adminHeader);
        adminArticle.appendChild(adminList);

        document.getElementById("infoSection").appendChild(adminArticle);
    }

    /**
     * Updates a particular ingredient's display
     * @param {String} id 
     */
    updateInventory(id) {
        let info = false;
        if (this.state.ingredients.hasOwnProperty(id)) {
            info = this.state.ingredients[id];
        } else if (this.state.businessInfo.hasOwnProperty(id)) {
            info = this.state.businessInfo[id];
            if (id == "Price per Glass" || id == "Income") {
                info = "$" + parseFloat(Math.round(
                    info * 100) / 100).toFixed(2);
            }
            info = id + ": " + info;
        }
        if (info) {
            document.getElementById(id).replaceChild(
                document.createTextNode(info),
                document.getElementById(id).firstChild,
            );
        }
        
    }
    /* =========================================================
     *      HELPER METHODS
     * =========================================================
     */

    /*
     * Updates the ingredients in the state.
     * parameter should be an object in the form
     * { ingredientKey : quantity }
     * where ingredientKey must be one of the ingredients in the state
     */
    updateIngredients(ingredients, replace) {
        for (const ingredient in ingredients) {
            if (this.state.ingredients.hasOwnProperty(ingredient)){
                this.state.ingredients[ingredient] = replace
                    ? ingredients[ingredient] < 0 ? 0 : ingredients[ingredient]
                    : ingredients[ingredient] + this.state.ingredients[ingredient] < 0 ? 0 : ingredients[ingredient] + this.state.ingredients[ingredient];
            }
        }
    }

    /*
     * Updates the admin info in the state.
     * parameter should be an object in the form
     * { infoKey : quantity }
     * where infoKey must be one of the keys in businessInfo in the state
     */
    updateBusinessInfo(businessInfo) {
        for (const info in businessInfo) {
            if (this.state.businessInfo.hasOwnProperty(info)){
                this.state.businessInfo[info] = businessInfo[info] < 0 
                    ? 0 : businessInfo[info];
            }
        }
    }

    /*
     * Returns true if there are not enough ingredients
     * to make a batch of lemonade.
     */
    insufficientIngredients() {
        if (this.state.ingredients["Lemons"] < this.state.recipe["Lemons"] ||
            this.state.ingredients["Gallons of Water"] < this.state.recipe["Gallons of Water"] ||
            this.state.ingredients["Cups of Sugar"] < this.state.recipe["Cups of Sugar"] ||
            this.state.ingredients["Empty Glasses"] < this.state.recipe["Empty Glasses"]) {
            return true;
        }
        return false;
    }

    /*
     * Returns an object with each of the ingredients that do not have enough.
     * Returned object in the form:
     * { ingredient : requiredAmount }
     */
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

    /* Mutator Methods */
    setLemons(lemons) {this.updateIngredients({"Lemons" : lemons}, true)}
    setGallonsOfWater(gallonsOfWater) {this.updateIngredients({"Gallons of Water" : gallonsOfWater}, true)}
    setCupsOfSugar(cupsOfSugar) {this.updateIngredients({"Cups of Sugar" : cupsOfSugar}, true)}
    setEmptyGlasses(emptyGlasses) {this.updateIngredients({"Empty Glasses" : emptyGlasses}, true)}
    setGlassesOfLemonade(glassesOfLemonade) {this.updateBusinessInfo({"Glasses of Lemonade" : glassesOfLemonade}, true)}
    setPrice(price) {this.updateBusinessInfo({"Price per Glass" : price})}
    setIncome(income) {this.updateBusinessInfo({"Income" : income}, true)}

    /* Accessor Methods */
    getLemons() {return this.state.ingredients["Lemons"];}
    getGallonsOfWater() {return this.state.ingredients["Gallons of Water"];}
    getCupsOfSugar() {return this.state.ingredients["Cups of Sugar"];}
    getEmptyGlasses() {return this.state.ingredients["Empty Glasses"];}
    getGlassesOfLemonade() {return this.state.businessInfo["Glasses of Lemonade"];}
    getPrice() {return this.state.businessInfo["Price per Glass"];}
    getIncome() {return this.state.businessInfo["Income"];}
    getRecipe() {return this.state.recipe;}
    getMaxToSell() {return this.state.sellMoreMax;}
}


/* =========================================================
 *      TESTING SECTION
 * =========================================================
 */

let ls = new LemonadeStand(20,10,10,10, 2.0);
function initAdd() {
    let hideAbles = document.querySelectorAll(".hide_me");
    for (let hideAble of hideAbles) {
        hideAble.addEventListener('click', showInput);
        hideAble.addEventListener("keyup", addValue);
    }
}
function addValue(event) {
    if (event.keyCode == 13 || event.keyCode==10)
    {
        ls.updateIngredients({[event.target.name] : Number(event.target.value)});
        ls.updateInventory(event.target.name);
        hideAll();
    }
}
function updateAll() {
    for (const key in ls.state.ingredients) {
        ls.updateInventory(key);
    }
    for (const key in ls.state.businessInfo) {
        if (key != "Price per Glass") {
            ls.updateInventory(key);
        }
    }
}
function initButtons() {
    let buttons = document.querySelectorAll('button');
    for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].id == "makeLemonade") {
            buttons[i].addEventListener('click',function(){
                ls.makeLemonade(); 
                updateAll();
            }, false);
        }
        else if (buttons[i].id == "sellLemonade") {
            buttons[i].addEventListener('click',function(){
                ls.sellLemonade(); 
                updateAll();
            }, false);
        }
        else if (buttons[i].id == "sellMoreLemonade") {
            buttons[i].addEventListener('click',function() {
                if (event.srcElement.id != "glassesToSell") {
                    ls.sellMoreLemonade(document.getElementById("glassesToSell").value); 
                    updateAll();                    
                }
            }, false);
            buttons[i].firstElementChild.addEventListener("keyup", function() {
                if (event.keyCode == 13 || event.keyCode==10) buttons[i].click();
            }) 
        }
    }
}
function initSpans() {
    let spans = document.querySelectorAll('span');
    for (let ele of spans) 
    {
        ele.onmouseover = function() {
            ele.previousElementSibling.src = '../images/plus_dark.png';
            ele.style.color = "purple";
        };
        ele.onmouseout = function() {
            ele.previousElementSibling.src = '../images/plus_light.png';
            ele.style.color = "blue";
        };     
    }
}
function init() {  	
	ls.showAdmin();  
    ls.showIngredients();  
    initAdd();
    initButtons();
    initSpans();
}
function hideAll() {
    let hideAbles = document.getElementsByClassName("hide_me");
    for (let hideAble of hideAbles) {
        hideAble.style.display = "none";
    }
}
function showInput() {
    hideAll();
    this.style.display = "inline";
    this.value ="";
    this.focus();
}

init();
hideAll();