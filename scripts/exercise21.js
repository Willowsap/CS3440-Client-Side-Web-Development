class LemonadeStand {
    constructor(lemons, gallonsOfWater, cupsOfSugar, emptyGlasses, price) {
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
            sellMoreMax : 8,
            pageTitle : "The Worlds Best Bananaade"
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
        amount = amount > this.state.sellMoreMax ? this.state.sellMoreMax : amount;
        let glassesSold = 0;
        for (let i = 0; i < amount; i++) {
            if (this.sellLemonade()) {
                glassesSold += 1;
            } else break;
        }
        return glassesSold;
    }
    showIngredients() {
        let ingredientTable = document.createElement('table');

        let tableCaption = document.createElement('h2');
        tableCaption.appendChild(document.createTextNode("Inventory"));

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
        let ingredientArticle = document.createElement('article');
        ingredientArticle.setAttribute("id", "ingredients");
        ingredientArticle.appendChild(tableCaption);
        ingredientArticle.appendChild(ingredientTable);

        return ingredientArticle;
    }
    showAdmin() {
        let adminHeader = document.createElement('h2');
        adminHeader.appendChild(document.createTextNode("Admin"));

        let adminList = document.createElement('ul');
        let _this = this;
        for (const info in this.state.businessInfo) {
            let adminItem = document.createElement('li');
            let inputItem = document.createElement('input');
            let text1 = info + ": ";
            if (info == "Price per Glass" || info == "Income") {
                text1 += "$"
            }
            inputItem.setAttribute('type', 'number');
            inputItem.setAttribute('id', info + 'input');
            inputItem.setAttribute('name', info);
            inputItem.setAttribute('class', 'adminInput');
            if (info == "Price per Glass" || info == "Income")
                inputItem.setAttribute('value', parseFloat(Math.round(this.state.businessInfo[info] * 100) / 100).toFixed(2));
            else 
                inputItem.setAttribute('value', this.state.businessInfo[info]);
            if (info != "Price per Glass") {
                inputItem.setAttribute('disabled', 'true');
            } else {
                inputItem.setAttribute('min', 0.00);
                inputItem.setAttribute('step', 0.01);
                inputItem.onchange = function() {
                    this.value = parseFloat(Math.round(this.value * 100) / 100).toFixed(2);
                    _this.updateBusinessInfo({[event.target.name] : Number(event.target.value)});
                    _this.updateAll();
                }
            }
            adminItem.appendChild(document.createTextNode(text1));
            adminItem.appendChild(inputItem);
            adminList.appendChild(adminItem);
        }
        let adminArticle = document.createElement('article');
        adminArticle.setAttribute("id", "admin");
        adminArticle.appendChild(adminHeader);
        adminArticle.appendChild(adminList);

        return adminArticle;
    }
    showIngredientAdding() {
        let ingredientAddingTitle = document.createElement('h2');
        ingredientAddingTitle.appendChild(document.createTextNode("Add Ingredients"));

        let ingredientAddingArticle = document.createElement('article');
        ingredientAddingArticle.appendChild(ingredientAddingTitle);ingredientAddingArticle.setAttribute('id', 'addIngredients');
        ingredientAddingArticle.setAttribute('class', 'adminSection');

        let _this = this;
        for(const ingredient in this.state.ingredients) {
            let label = document.createElement('label');
            label.setAttribute('for', ingredient + "input");
            label.setAttribute('class', 'inputButton')

            let image = document.createElement('img');
            image.src = "../images/plus_light.png";
            image.setAttribute('class', 'plus');

            let span = document.createElement('span');
            span.setAttribute('class', 'clickable');
            span.setAttribute('id', "add" + ingredient);
            /*
            span.onmouseover = function() {
                span.previousElementSibling.src = '../images/plus_dark.png';
                span.style.color = "purple";
            };
            span.onmouseout = function() {
                span.previousElementSibling.src = '../images/plus_light.png';
                span.style.color = "blue";
            }*/
            span.appendChild(document.createTextNode("Add " + ingredient));

            let input = document.createElement('input');
            input.setAttribute('type', 'number');
            input.setAttribute('name', ingredient);
            input.setAttribute('id', ingredient + "input");
            input.setAttribute('value', 0);
            input.setAttribute('min', 0);
            input.setAttribute('class', 'addIngredient hide_me');

            label.appendChild(image);
            label.appendChild(span);
            label.appendChild(input);
            ingredientAddingArticle.appendChild(label);
        }
        return ingredientAddingArticle;
    }
    showOperations() {
        let _this = this;
        let operationsTitle = document.createElement('h2');
        operationsTitle.appendChild(document.createTextNode('Controls'));

        let operationsArticle = document.createElement('article');
        operationsArticle.setAttribute('id', 'controls');
        operationsArticle.setAttribute('class', 'adminSection');
        operationsArticle.appendChild(operationsTitle);

        let makeLemonade = document.createElement('button');
        makeLemonade.setAttribute('class', 'control');
        makeLemonade.setAttribute('id', 'makeLemonade');
        makeLemonade.appendChild(document.createTextNode('Make Lemonade'));
        
        let sellLemonade = document.createElement('button');
        sellLemonade.setAttribute('class', 'control');
        sellLemonade.setAttribute('id', 'sellLemonade');
        sellLemonade.appendChild(document.createTextNode('Sell Lemonade'));

        let sellMoreLemonade = document.createElement('button');
        sellMoreLemonade.setAttribute('class', 'control');
        sellMoreLemonade.setAttribute('id', 'sellMoreLemonade');
        sellMoreLemonade.appendChild(document.createTextNode('Sell'));

        let input = document.createElement('input');
        input.setAttribute('id', 'glassesToSell');
        input.setAttribute('name', 'Glasses to Sell');
        input.setAttribute('value', 2);
        input.setAttribute('type', 'number');
        input.setAttribute('class', 'glassesToSell');
        input.setAttribute('min', 2);
        input.setAttribute('max', this.state.sellMoreMax);
        input.onkeyup = function() {
            if (event.keyCode == 13 || event.keyCode==10) sellMoreLemonade.click();
        };
        sellMoreLemonade.appendChild(input);
        sellMoreLemonade.appendChild(document.createTextNode('Glasses'));

        operationsArticle.appendChild(makeLemonade);
        operationsArticle.appendChild(sellLemonade);
        operationsArticle.appendChild(sellMoreLemonade);
        return operationsArticle;
    }
    load() {
        let title = document.createElement('h1');
        title.setAttribute('id', 'pageTitle');
        title.appendChild(document.createTextNode(this.state.pageTitle));

        let pageWrapper = document.createElement('div');
        pageWrapper.setAttribute('id', 'pageWrapper');

        let controlSection = document.createElement('section');
        controlSection.setAttribute('id', 'controlSection');
        controlSection.setAttribute('class', 'mainSection');
        controlSection.appendChild(this.showIngredientAdding());
        controlSection.appendChild(this.showOperations());

        let infoSection = document.createElement('section');
        infoSection.setAttribute('id', 'infoSection');
        infoSection.setAttribute('class', 'mainSection');
        infoSection.appendChild(this.showAdmin());
        infoSection.appendChild(this.showIngredients());

        pageWrapper.appendChild(controlSection);
        pageWrapper.appendChild(infoSection);

        document.body.appendChild(title);
        document.body.appendChild(pageWrapper);

        this.initHidden();
        this.initSpans();
        this.initButtons();
    }
    updateInventory(id) {
        if (this.state.ingredients.hasOwnProperty(id))
            this.updateIngredientDisplay(id)
        else if (this.state.businessInfo.hasOwnProperty(id))
            this.updateBusinessDisplay(id);
    }
    updateIngredientDisplay(id) {
        document.getElementById(id).replaceChild(
            document.createTextNode(this.state.ingredients[id]),
            document.getElementById(id).firstChild,
        );
    }
    updateBusinessDisplay(id) {
        let info = this.state.businessInfo[id];
        if (id == "Price per Glass" || id == "Income")
            info = parseFloat(Math.round(info * 100) / 100).toFixed(2)
        document.getElementById(id + "input").value = info;
    }
    /* =========================================================
     *      HELPER METHODS
     * ========================================================= */
    updateAll() {
        for (const key in this.state.ingredients) {
            this.updateInventory(key);
        }
        for (const key in this.state.businessInfo) {
            if (key != "Price per Glass") {
                this.updateInventory(key);
            }
        }
    }
    updateIngredients(ingredients, replace) {
        for (const ingredient in ingredients) {
            if (this.state.ingredients.hasOwnProperty(ingredient)){
                this.state.ingredients[ingredient] = replace
                    ? ingredients[ingredient] < 0 ? 0 : ingredients[ingredient]
                    : ingredients[ingredient] + this.state.ingredients[ingredient] < 0 ? 0 : ingredients[ingredient] + this.state.ingredients[ingredient];
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

    initHidden() {
        let _this = this;
        // below is 1 line of code. above is to allow use of this in the called functions
        // it's here because I'm doing this inside of the class instead of outside
        $('.hide_me').on('click', this.showInput
            ).on('keyup', function() {
            if (event.keyCode == 13 || event.keyCode==10) {
                _this.updateIngredients({[event.target.name] : Number(event.target.value)});
                _this.updateInventory(event.target.name);
                $('.hide_me').hide();
            }
        });
    }
    showInput() {
        this.value = "";
        $('.hide_me').slideUp(500);
        $(this).slideDown(500, function() {
            this.focus();
        });
    }
    initSpans() {
        $('.clickable').on('mouseover', function(){
            this.previousElementSibling.src = '../images/plus_dark.png';
            this.style.color = "purple";
        }).on('mouseout', function() {
            this.previousElementSibling.src = '../images/plus_light.png';
            this.style.color = "blue";
        });
    }
    initButtons() {
        let _this = this;
        let buttons = $('button');
        for (let i = 0; i < buttons.length; i++) {
            switch(buttons[i].id) {
                case 'makeLemonade':
                    $(buttons[i]).on('click', function() {
                        _this.makeLemonade();
                        _this.updateAll();
                    });
                    break;
                case 'sellLemonade':
                    $(buttons[i]).on('click', function() {
                        _this.sellLemonade();
                        _this.updateAll();
                    });
                    break;
                case 'sellMoreLemonade':
                    $(buttons[i]).on('click', function() {
                        if (event.srcElement.id != "glassesToSell") {
                            _this.sellMoreLemonade(document.getElementById("glassesToSell").value); 
                            _this.updateAll();                    
                        }
                    });
                    break;
            }
        }
    }
}


/* =========================================================
 *      TESTING SECTION
 * =========================================================
 * 
 * Dear grader: the functions you are looking for are at the end
 * of the class, just above this section.
 */

function init() {
    let ls = new LemonadeStand(20,10,10,10, 2.0);
    ls.load();
}

$(init);