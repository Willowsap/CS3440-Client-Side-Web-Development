class QEP {
    constructor() {
        this.state = {
            title : "QEP Site",
            sections : {
                language : {
                    name : "Search for People by Language",
                    searchChoices : {
                        "Language" : [
                            "Fake language 1",
                            "Fake language 2",
                            "Fake language 3",
                            "Fake language 4",
                            "Fake language 5",
                            "Fake language 6",
                            "Fake language 7",
                        ],
                        "Department" : [
                            "Fake department 1",
                            "Fake department 2",
                            "Fake department 3",
                            "Fake department 4",
                            "Fake department 5",
                            "Fake department 6",
                            "Fake department 7",
                        ]
                    },
                    dataHeaders : [
                        "First Name",
                        "Last Name",
                        "Language",
                        "Level of Proficiency",
                        "Email"
                    ],
    
                },
                other :  {
                    name : "Search for People by Academic Affiliation, County, and Last Name",
                    searchChoices : {
                        "Academic Department" : [
                            "Fake List Item",
                            "Fake List Item",
                            "Fake List Item",
                        ],
                        "Academic College " : [
                            "Fake List Item",
                            "Fake List Item",
                            "Fake List Item",
                        ],
                        "Country" : [
                            "Fake Country 1",
                            "Fake Country 2",
                            "Fake Country 3",
                            "Fake Country 4",
                            "Fake Country 5",
                            "Fake Country 6",
                        ],
                        "Last Name" : [
                            "Fake Last Name 1",
                            "Fake Last Name 2",
                            "Fake Last Name 3",
                            "Fake Last Name 4",
                            "Fake Last Name 5",
                            "Fake Last Name 6",
                        ],
                    },
                    dataHeaders : [
                        "First Name",
                        "Last Name",
                        "College",
                        "Department",
                        "Country",
                        "Travelled (Y/N)",
                        "Project",
                        "Partner Institutions"
                    ]
                },
                studyAbroad : {
                    name : "Search for Available Study Abroad Opportunities",
                    searchChoices : {
                        "Term" : [
                            "Fake List Item",
                            "Fake List Item",
                            "Fake List Item",
                        ],
                        "Program Name" : [
                            "Fake List Item",
                            "Fake List Item",
                            "Fake List Item",
                        ],
                        "Country" : [
                            "Fake List Item",
                            "Fake List Item",
                            "Fake List Item",
                        ],
                        "Dates" : [
                            "Fake List Item",
                            "Fake List Item",
                            "Fake List Item",
                        ],
                    },
                    dataHeaders : [
                        "Term",
                        "Program Name",
                        "Country",
                        "College",
                        "Dept.",
                        "Dates",
                        "Credits Avail."
                    ]   
                }
            },
            
        }
    }
    topbar() {
        let topbar = document.createElement('nav');
        topbar.setAttribute('id', 'topbar')
        let title = document.createElement('h1');
        title.appendChild(document.createTextNode(this.state.title));

        let tabs = document.createElement('ul');
        tabs.setAttribute('id', 'topTabs');

        let _this = this;
        for (let key in this.state.sections) {
            if (key != "title") {
                let tab = document.createElement('li');
                let tabButton = document.createElement('button');
                tabButton.setAttribute('class', 'tabButton');
                tabButton.appendChild(document.createTextNode(this.state.sections[key].name));
                tabButton.onclick = function() {
                    _this.showTab(key)
                }
                tab.appendChild(tabButton);
                tabs.appendChild(tab);
            }
        }
        topbar.appendChild(title);
        topbar.appendChild(tabs);
        return topbar;
    }
    languageSearchArticle() {
        let languageSearchArticle = document.createElement('article');
        languageSearchArticle.setAttribute('id', 'language');
        languageSearchArticle.setAttribute('class', 'mainArticle');
        languageSearchArticle.appendChild(this.buildSearchBar(this.state.sections.language.searchChoices))
        languageSearchArticle.appendChild(this.buildResultsTable(this.state.sections.language.dataHeaders));
        return languageSearchArticle;
    }
    otherSearchArticle() {
        let otherSearchArticle = document.createElement('article');
        otherSearchArticle.setAttribute('id', 'other');
        otherSearchArticle.setAttribute('class', 'mainArticle');
        otherSearchArticle.appendChild(this.buildSearchBar(this.state.sections.other.searchChoices))
        otherSearchArticle.appendChild(this.buildResultsTable(this.state.sections.other.dataHeaders));
        return otherSearchArticle;
    }
    studyAbroadArticle() {
        let studyAbroadSearchArticle = document.createElement('article');
        studyAbroadSearchArticle.setAttribute('id', 'studyAbroad');
        studyAbroadSearchArticle.setAttribute('class', 'mainArticle');
        studyAbroadSearchArticle.appendChild(this.buildSearchBar(this.state.sections.studyAbroad.searchChoices))
        studyAbroadSearchArticle.appendChild(this.buildResultsTable(this.state.sections.studyAbroad.dataHeaders));
        return studyAbroadSearchArticle;
    }
    buildSearchBar(info) {
        let searchBar = document.createElement('div');
        searchBar.setAttribute('class', 'searchBar');
        let buttonSection = document.createElement('div');
        buttonSection.setAttribute('id', 'buttonSearchSection');
        let listSection = document.createElement('div');
        listSection.setAttribute('id', 'listSearchSection');
        for (let key in info) {
            let dropDownButton = document.createElement('button');
            dropDownButton.setAttribute('class', 'dropDownButton');
            dropDownButton.appendChild(document.createTextNode(key));
            dropDownButton.onmouseover = function() {
                document.getElementById(key+"list").style.display = "inline";
            }
            dropDownButton.onmouseout = function() {
                document.getElementById(key+"list").style.display = "none";
            }
            buttonSection.appendChild(dropDownButton);
            let list = document.createElement('ul');
            list.setAttribute('class', 'dropDownList');
            list.setAttribute('id', key + "list");
            for (let i = 0; i < info[key].length; i++) {
                let listItem = document.createElement('li');
                listItem.appendChild(document.createTextNode(info[key][i]));
                list.appendChild(listItem);
            }
            listSection.appendChild(list);
        }
        searchBar.appendChild(buttonSection);
        searchBar.appendChild(listSection);
        return searchBar;
    }
    buildResultsTable(info) {
        let table = document.createElement('table');
        table.setAttribute('class', 'infoTable');

        let headerRow = document.createElement('tr');
        headerRow.setAttribute('class', 'headerRow');
        for (let heading in info) {
            let item = document.createElement('th');
            item.appendChild(document.createTextNode(info[heading]));
            headerRow.appendChild(item);
        }
        table.appendChild(headerRow);

        let numRows = 6;
        for (let i = 0; i < numRows; i++) {
            let row = document.createElement('tr');
            for (let j = 0; j < info.length; j++) {
                let item = document.createElement('td');
                item.appendChild(document.createTextNode(i + " " + j));
                row.appendChild(item);
            }
            table.appendChild(row);
        }
        return table;
    }
    showTab(key) {
        for (let section in this.state.sections) {
            if (section == key) {
                document.getElementById(section).style.display = "flex";
            } else {
                document.getElementById(section).style.display = "none";
            }
        }
    }
    load() {
        let contentWrapper = document.createElement('div');
        contentWrapper.setAttribute('id', 'contentWrapper');
        contentWrapper.appendChild(this.languageSearchArticle());
        contentWrapper.appendChild(this.otherSearchArticle());
        contentWrapper.appendChild(this.studyAbroadArticle());
        document.body.appendChild(this.topbar());
        document.body.appendChild(contentWrapper);
    }
}
site = new QEP();
site.load(); 