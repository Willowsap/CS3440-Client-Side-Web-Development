function inList(list, word) {
    if (!list) return false;
    for (let i = 0; i < list.length; i++) {
        list[i] += '';
        word += '';   
        if (list[i].toLowerCase() == word.toLowerCase())
            return true;
    }
    return false;
}
function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}
class DataItem {
    constructor(data) {
        this.state = data;
    }
    getDisplayData() {
        let displayData = [];
        for (let item in this.state) {
            displayData.push(this.state[item]);
        }
        return displayData;
    }
    getKeys() {
        let keys = [];
        for (let item in this.state) {
            keys.push(item);
        }
        return keys;
    }
}
class Table {
    constructor(id, headerData, rowData, classes, excludedDisplays) {
        this.state = {
            id : id,
            classes : classes,
            headerRow: this.createHeaderRow(headerData, excludedDisplays),
            headerData : headerData,
            contentRows : this.createContentRows(rowData, headerData, id, excludedDisplays),
            rowData : rowData,
        };
        this.HTMLrepresentation = this.buildHTMLrepresentation();
    }
    createHeaderRow(headerData, excludedDisplays) {
        let headerRow = document.createElement('tr');
        for (let i = 0; i < headerData.length; i++) {
            if (inList(excludedDisplays, headerData[i])) continue;
            let header = document.createElement('th');
            header.appendChild(document.createTextNode(headerData[i]));
            headerRow.appendChild(header);
        }
        return headerRow;
    }
    createContentRows(rowData, headerData, id, excludedDisplays) {
        let contentRows = [];
        for (let i = 0; i < rowData.length; i++) {
            let row = document.createElement('tr');
            for (let j = 0; j < rowData[i].length; j++) {
                if (inList(excludedDisplays, headerData[j])) continue;
                let item = document.createElement('td');
                item.setAttribute('class', id + headerData[j] + 'item');
                item.appendChild(document.createTextNode(
                    rowData[i][j]
                ));
                row.appendChild(item);
            }
            contentRows.push(row);
        }
        return contentRows;
    }
    buildHTMLrepresentation() {
        let table = document.createElement('table');
        table.setAttribute('id', this.state.id);
        table.setAttribute('class', this.state.classes);
        table.appendChild(this.state.headerRow);
        for (let i = 0; i < this.state.contentRows.length; i++) {
            table.appendChild(this.state.contentRows[i]);
        }
        return table;
    }
    getTableHTML() {
        return this.HTMLrepresentation;
    }
    displayRows(reqs) {
        let displaySome = false;
        for (let i = 0; i < this.state.rowData.length; i++) {
            this.state.contentRows[i].style.display = "none";
            let failsTest = false;
            rowLoop:
            for (let key in reqs) {
                for (let j = 0; j < this.state.rowData[i].length; j++) {
                    if (key == this.state.headerData[j]) {
                        if (key == "Proficiency") {
                            if ((reqs[key] == "Med" && this.state.rowData[i][j] == "Low")
                                || (reqs[key] == "High" && this.state.rowData[i][j] != "High")) {
                                failsTest = true;
                                break rowLoop;
                            }
                        }
                        else if (reqs[key] != this.state.rowData[i][j]) {
                            failsTest = true;
                            break rowLoop;
                        }
                        break;
                    }
                }
            }
            if(!failsTest && !jQuery.isEmptyObject(reqs)) {
                this.state.contentRows[i].style.display = "flex";
                displaySome = true;
            }
        }
        if (displaySome) this.state.headerRow.style.display = "flex";
        else this.state.headerRow.style.display = "none";
        this.color();
    }
    color() {
        let count = 0;
        for (let i = 0; i < this.state.contentRows.length; i++) {
            if (this.state.contentRows[i].style.display != "none") {
                if (++count % 2 == 0) {
                    this.state.contentRows[i].style.backgroundColor = "#e3e3e3";
                } else {
                    this.state.contentRows[i].style.backgroundColor = "#ffffff"
                }
            }
        }
    }
}
class SearchButton {
    constructor(type, category, value, list, page) {
        this.state = {
            type : type,
            category : category,
            value : value,
            list : list,
            page : page,
            selected : false,
        }
        this.HTMLrepresentation = this.buildHTMLrepresentation();
    }
    buildHTMLrepresentation() {
        let _this = this;
        let listItem = document.createElement('li');
        listItem.setAttribute('class', 'searchButton deselectedButton');
        listItem.appendChild(document.createTextNode(this.state.value));
        listItem.onclick = function() {
            if (_this.state.selected) {
                _this.state.page.removeFromDisplay(_this.state.type, _this.state.category, _this.state.value);
                _this.deselect();
            } else {
                _this.state.page.addToDisplay(_this.state.type, _this.state.category, _this.state.value);
                _this.select();
            }
        }
        return listItem;
    }
    getButtonHTML() {
        return this.HTMLrepresentation;
    }
    deselect() {
        this.state.selected = false;
        this.HTMLrepresentation.setAttribute('class', 'searchButton deselectedButton')
    }
    select() {
        for(let i = 0; i < this.state.list.length; i++) {
            this.state.list[i].deselect();
        }
        this.state.selected = true;
        this.HTMLrepresentation.setAttribute('class', 'searchButton selectedButton')
    }
}
class SearchBar {
    constructor(id, searchTypes, classes, page) {
        this.state = {
            id : id,
            searchTypes : searchTypes,
            classes : classes,
            searchButtons : {},
            page : page,
        }
        this.HTMLrepresentation = this.buildHTMLrepresentation();
    }
    buildHTMLrepresentation() {
        let searchBar = document.createElement('div');
        searchBar.setAttribute('id', this.state.id);
        searchBar.setAttribute('class', this.state.classes);

        let buttonSection = document.createElement('div');
        buttonSection.setAttribute('class', 'buttonSearchSection');
        let listSection = document.createElement('div');
        listSection.setAttribute('class', 'listSearchSection');

        for (let key in this.state.searchTypes) {
            this.state.searchButtons[key] = [];
            let dropDownButton = document.createElement('button');
            dropDownButton.setAttribute('class', 'dropDownButton');
            dropDownButton.appendChild(document.createTextNode(key));
            dropDownButton.onmouseover = function() {
                let lists = document.querySelectorAll(".dropDownList");
                for(let i = 0; i < lists.length; i++) {
                    if (lists[i].id == key+"list") {
                        lists[i].style.display = "inline";
                    } else {
                        lists[i].style.display = "none";
                    }
                }
            }
            buttonSection.appendChild(dropDownButton);
            let list = document.createElement('ul');
            list.setAttribute('class', 'dropDownList');
            list.setAttribute('id', key + "list");
            for (let i = 0; i < this.state.searchTypes[key].length; i++) {
                let listItem = new SearchButton(this.state.id, key, this.state.searchTypes[key][i], this.state.searchButtons[key], this.state.page);
                list.appendChild(listItem.getButtonHTML());
                this.state.searchButtons[key].push(listItem);
            }
            listSection.appendChild(list);
        }
        searchBar.appendChild(buttonSection);
        searchBar.appendChild(listSection);
        return searchBar;
    }
    getSearchBarHTML() {
        return this.HTMLrepresentation;
    }
    
}
class QEP {
    constructor() {
        this.data = this.createData();
        this.state = {
            topbar : {
                title : "Office of the Quality Enhancement Plan",
                subtitle: "Appalchian State University",
            },
            footer: {
                linkList : {
                    "Home" : "https://qep.appstate.edu",
                    "MyASU" : "https://myasu.appstate.edu",
                    "Support" : "https://support.appstate.edu",
                    "Webmaster" : "https://webservices.appstate.edu",
                    "Emergency Info" : "https://emergency.appstate.edu",
                    "Policy" : "https://policy.appstate.edu/Policy_Manual",
                    "Disclaimer" : "https://www.appstate.edu/disclaimer/",
                    "EO Policy" : "https://policy.appstate.edu/Equal_Opportunity",
                    "Login" : "https://qep.appstate.edu/user",
                    "Text Only" : "http://assistive.usablenet.com/tt/referrer",
                },
                copyright : "© Appalachian State University 2019. All rights reserved.",
                rightImage : {
                    url : "../images/footer-logo.gif",
                    link : "https://www.appstate.edu",
                }
            },
            pages : {
                home : {
                    imageUrl: "../images/qep-logo-white.png",
                    pdfTitle: "QEP Official Documentation",
                    pdfImgUrl: "../images/qep_cover_revised.png",
                    pdfUrl: "https://qep.appstate.edu/sites/qep.appstate.edu/files/QEP-report-final_0.pdf",
                },
                searchPages : {
                    language : {
                        title : "Search for People by Language",
                        id : "language",
                        table : this.buildTable("language"),
                        searchBar : this.buildSearchBar("language",
                            ["Language", "Proficiency"]),
                        display : {}
                    },
                    project :  {
                        title : "Search for People by Academic Affiliation, County, and Last Name",
                        id : "project",
                        table : this.buildTable("project"),
                        searchBar : this.buildSearchBar("project",
                            ["Last Name", "Academic College", "Academic Department", "Country"]),
                        display : {}
                    },
                    studyAbroad : {
                        title : "Search for Available Study Abroad Opportunities",
                        id : "studyAbroad",
                        table : this.buildTable("studyAbroad"),
                        searchBar : this.buildSearchBar("studyAbroad",
                            ["Term", "Program Name", "Country", "Dates"]),
                        display : {}
                    }
                }
            },
            
        }
    }
    topbar() {
        let topbar = document.createElement('nav');
        topbar.setAttribute('id', 'topbar')

        let titleSection = document.createElement('div');
        titleSection.setAttribute('id', 'titleSection')
        let title = document.createElement('h1');
        title.appendChild(document.createTextNode(this.state.topbar.title));
        let subtitle = document.createElement('h2');
        subtitle.appendChild(document.createTextNode(this.state.topbar.subtitle));
        titleSection.appendChild(title);
        titleSection.appendChild(subtitle);
        titleSection.onclick = function() {
            let articles = document.querySelectorAll('.mainArticle');
            for (let i = 0; i < articles.length; i++) {
                if (articles[i].id == "home") articles[i].style.display = "flex";
                else  articles[i].style.display = "none";
            }
        }
        
        let tabs = document.createElement('ul');
        tabs.setAttribute('id', 'topTabs');

        let _this = this;
        for (let key in this.state.pages.searchPages) {
                let tab = document.createElement('li');
            let tabButton = document.createElement('button');
            tabButton.setAttribute('class', 'tabButton');
            tabButton.appendChild(document.createTextNode(this.state.pages.searchPages[key].title));
            tabButton.onclick = function() {
                _this.showTab(key)
            }
            tab.appendChild(tabButton);
            tabs.appendChild(tab);
        }
        topbar.appendChild(titleSection);
        topbar.appendChild(tabs);
        return topbar;
    }
    footer() {
        let footer = document.createElement('div');
        footer.setAttribute('id', 'footer');
        let footerLeftWrapper = document.createElement('div');
        footerLeftWrapper.setAttribute('id', 'footerLeftWrapper');
        let footerLinkListWrapper = document.createElement('div');
        footerLinkListWrapper.setAttribute('id', 'footerLinklistWrapper');
        let footerLinkList = document.createElement('ul');
        footerLinkList.setAttribute('id', 'footerLinkList');
        for (let key in this.state.footer.linkList) {
            let listItem = document.createElement('li');
            let link = document.createElement('a');
            link.href = this.state.footer.linkList[key];
            link.text = key;
            listItem.appendChild(link);
            footerLinkList.appendChild(listItem);
        }
        footerLinkListWrapper.appendChild(footerLinkList);
        let footerCopyright = document.createElement('div');
        footerCopyright.setAttribute('id', 'footerCopyright');
        footerCopyright.appendChild(document.createTextNode(this.state.footer.copyright));
        footerLeftWrapper.appendChild(footerLinkListWrapper);
        footerLeftWrapper.appendChild(footerCopyright);

        let footerRightWrapper = document.createElement('div');
        footerRightWrapper.setAttribute('id', 'footerRightWrapper');
        let footerLogo = document.createElement('img');
        footerLogo.src = this.state.footer.rightImage.url;
        footerRightWrapper.appendChild(footerLogo);

        footer.appendChild(footerLeftWrapper);
        footer.appendChild(footerRightWrapper);
        return footer;
    }
    pageBlockHeader() {
        let pageBlockHeader = document.createElement('div');
        pageBlockHeader.setAttribute('id', 'pageBlockHeader');
        return pageBlockHeader;
    }
    homePage(homeData) {
        let homeArticle = document.createElement('article');
        homeArticle.setAttribute('id', 'home');
        homeArticle.setAttribute('class', 'mainArticle');
        homeArticle.style.display = "flex";
        let homeImg = document.createElement('img');
        homeImg.setAttribute('id', 'homeImg');
        homeImg.src = homeData.imageUrl;

        let pdfSection = document.createElement('div');
        pdfSection.setAttribute('id', 'pdfSection');
        let pdfTitle = document.createElement('h2');
        pdfTitle.appendChild(document.createTextNode(homeData.pdfTitle));
        let pdfLink = document.createElement('a');
        pdfLink.setAttribute('id', 'pdfLink');
        pdfLink.href = homeData.pdfUrl;
        let pdfImg = document.createElement('img');
        pdfImg.setAttribute('id', 'pdfImg');
        pdfImg.src = homeData.pdfImgUrl;
        pdfLink.appendChild(pdfImg);

        pdfSection.appendChild(pdfTitle);
        pdfSection.appendChild(pdfLink);

        homeArticle.appendChild(homeImg);
        homeArticle.appendChild(pdfSection);
        return homeArticle;
    }
    buildSearchBar(id, searchTypes) {
        let searchData = {};
        for (let i = 0; i < searchTypes.length; i++) {
            searchData[searchTypes[i]] = this.data[id]["searchBy"][searchTypes[i]];
        }
        return new SearchBar(id, searchData, "searchBar", this);
    }
    buildTable(id) {
        let excludedDisplays = [];
        if (id == "language") {
            excludedDisplays.push("WebPage");
        } else if (id == "project") {
            excludedDisplays.push("Collaboration");
            excludedDisplays.push("Location");
        } else if (id == "studyAbroad") {
            excludedDisplays.push("Availability");
        }
        return new Table(id, this.getHeaderData(id), this.getDisplayData(id), "infoTable", excludedDisplays);
    }
    buildSearchPage(searchData) {
        let searchPage = document.createElement('article');
        searchPage.setAttribute('id', searchData.id);
        searchPage.setAttribute('class', 'mainArticle');
        let searchBarWrapper = document.createElement('section');
        searchBarWrapper.setAttribute('class', 'searchBarWrapper');
        searchBarWrapper.appendChild(searchData.searchBar.getSearchBarHTML())
        let tableWrapper = document.createElement('section');
        tableWrapper.setAttribute('class', 'tableWrapper');
        tableWrapper.appendChild(searchData.table.getTableHTML());
        searchPage.appendChild(searchBarWrapper);
        searchPage.appendChild(tableWrapper);
        return searchPage;
    }
    showTab(key) {
        if (key != "home ") document.getElementById("home").style.display = "none";
        else document.getElementById("home").style.display = "flex";
        for (let section in this.state.pages.searchPages) {
            if (section == key) document.getElementById(section).style.display = "flex";
            else document.getElementById(section).style.display = "none";
        }
    }
    getHeaderData(type) {
        return this.data[type].list[0].getKeys();
    }
    getDisplayData(type) {
        let displayData = [];
        let displayList = this.data[type].list;
        for (let i = 0; i < displayList.length; i++)
            displayData.push(displayList[i].getDisplayData());
        return displayData;
    }
    createData() {
        let data = {
            language : {
                list : [],
                searchBy : {}
            },
            project : {
                list : [],
                searchBy : {}
            },
            studyAbroad : {
                list : [],
                searchBy : {}
            }
        }
        for (let i = 0; i < language.result.length; i++) {
            let item = this.formatLanguage(language.result[i]);
            data.language.list.push(new DataItem(item));
            for (let key in item) {
                if (!inList(data.language.searchBy[key], item[key])) {
                    if (!data.language.searchBy[key]) data.language.searchBy[key] = [];
                    data.language.searchBy[key].push(item[key]);
                }
            }
        }
        for (let i = 0; i < project.result.length; i++) {
            let item = this.formatProject(project.result[i]);
            data.project.list.push(new DataItem(item));
            for (let key in item) {
                if (!inList(data.project.searchBy[key], item[key])) {
                    if (!data.project.searchBy[key]) data.project.searchBy[key] = [];
                    data.project.searchBy[key].push(item[key]);
                }
            }
        }
        for (let i = 0; i < study_abroad.result.length; i++) {
            let item = this.formatStudyAbroad(study_abroad.result[i]);
            data.studyAbroad.list.push(new DataItem(item));
            for (let key in item) {
                if (!inList(data.studyAbroad.searchBy[key], item[key])) {
                    if (!data.studyAbroad.searchBy[key]) data.studyAbroad.searchBy[key] = [];
                    data.studyAbroad.searchBy[key].push(item[key]);
                }
            }
        }
        return data;
    }
    formatLanguage(item) {
        return {
            "First Name" : item["Firstname"],
            "Last Name" : item["Lastname"],
            "Language": item["Language"],
            "Proficiency": capitalize(item["Proficiency"]),
            "Email": item["Email"],
            "WebPage": item["WebPage"]
        }
    }
    formatProject(item) {
        return {
            "First Name" : item["Firstname"],
            "Last Name" : item["Lastname"],
            "Academic Department" : item["AcademicDepartment"],
            "Academic College" : item["AcademicCollege"],
            "Country" : item["Country"],
            "Travelled (Y/N)" : item["Travelled"],
            "Project Description" : item["Country"] + " - " + item["Collaboration"]
                + (item["Location"] ? (" - " + item["Location"]) : ""),
            "Collaboration" : item["Collaboration"],
            "Location" : item["Location"]
        }
    }
    formatStudyAbroad(item) {
        return {
            "Term": item["Term"],
            "Program Name": item["ProgramName"],
            "Country": item["Country"],
            "College": item["College"],
            "Department": item["Department"],
            "Dates": item["Dates"],
            "Level": item["Level"],
            "Credits": item["Credits"].toString(),
            "Availability": item["Availability"]
        }
    }
    addToDisplay(type, attribute, value) {
        this.state.pages.searchPages[type].display[attribute] = value;
        this.state.pages.searchPages[type].table.displayRows(
            this.state.pages.searchPages[type].display
        );
    }
    removeFromDisplay(type, attribute) { 
        delete this.state.pages.searchPages[type].display[attribute];
        this.state.pages.searchPages[type].table.displayRows(
            this.state.pages.searchPages[type].display
        );
    }
    load() {
        let contentWrapper = document.createElement('div');
        contentWrapper.setAttribute('id', 'contentWrapper');
        contentWrapper.appendChild(this.homePage(this.state.pages.home));
        for (let section in this.state.pages.searchPages) {
            contentWrapper.appendChild(this.buildSearchPage(this.state.pages.searchPages[section]));
        }
        document.body.appendChild(this.topbar());
        document.body.appendChild(this.pageBlockHeader());
        document.body.appendChild(contentWrapper);
        document.body.appendChild(this.footer());
    }
}
site = new QEP();
site.load(); 