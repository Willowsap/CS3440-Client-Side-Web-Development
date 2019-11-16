const colleges = {
    Health: "Beaver College of Health Sciences",
    Science: "College of Arts and Sciences",
    Arts: "College of Fine and Applied Arts",
    Music: "Hayes School of Music",
    Education: "Reich College of Education",
    Business: "Walker College of Business",
    Honors: "Honors College"
};
const departments = {
    ANT: {Name: "Anthropology", College: colleges["Science"]},
    ART: {Name: "Art", College: colleges["Arts"]},
    BIO: {Name: "Biology", College: colleges["Science"]},
    BUS: {Name: "Business", College: colleges["Business"]},
    CJ : {Name: "Criminal Justica", College: colleges["Science"]},
    COM: {Name: "Communication", College: colleges["Arts"]},
    ENG: {Name: "English", College: colleges["Science"]},
    FER: {Name: "Fermentation Sciences", College: colleges["Science"]},
    FIN: {Name: "Finance", College: colleges["Business"]},
    GER: {Name: "German", College: colleges["Science"]},
    GHY: {Name: "Geography", College: colleges["Science"]},
    GLY: {Name: "Geology", College: colleges["Science"]},
    HIS: {Name: "History", College: colleges["Science"]},
    HON: {Name: "Honors", College: colleges["Honors"]},
    HOS: {Name: "Hospitality and Tourism Management", College: colleges["Business"]},
    HPC: {Name: "Human Development and Psychological Counselling", College: colleges["Education"]},
    HPE: {Name: "Health and Physical Education", College: colleges["Health"]},
    IND: {Name: "Industrial Design", College: colleges["Arts"]},
    INT: {Name: "Interior Design", College: colleges["Arts"]},
    ITC: {Name: "Instructional Technology", College: colleges["Education"]},
    LES: {Name: "Leadership and Educational Studies", College: colleges["Education"]},
    LLC: {Name: "Languages, Literatures, and Cultures", College: colleges["Science"]},
    MAT: {Name: "Mathematical Sciences", College: colleges["Science"]},
    MBA: {Name: "Business Administration", College: colleges["Business"]},
    MKT: {Name: "Marketing", College: colleges["Business"]},
    MUS: {Name: "Music", College: colleges["Music"]},
    PHL: {Name: "Philosophy", College: colleges["Science"]},
    PSY: {Name: "Psychology", College: colleges["Science"]},
    REL: {Name: "Religion", College: colleges["Science"]},
    RM:  {Name: "Recreation Management", College: colleges["Health"]},
    SAA: {Name: "Student Affairs Administration", College: colleges["Education"]},
    SCM: {Name: "Supply Chain Management", College: colleges["Business"]},
    SD:  {Name: "Sustainable Development", College: colleges["Arts"]},
    SNH: {Name: "Spanish", College: colleges["Science"]},
    SOC: {Name: "Sociology", College: colleges["Science"]},
    STBE:{Name: "Sustainable Technology and the Built Enviornment", College: colleges["Arts"]},
    SW:  {Name: "Social Work", College: colleges["Health"]},
    THR: {Name: "Theater", College: colleges["Arts"]},
    WRC: {Name: "Watauga Residential College", College: colleges["Honors"]}
};
const terms = {
    "Spring": "Spring 2020",
    "Summer I": "Summer I 2020",
    "Summer II": "Summer II 2020",
    "Fall": "Fall 2020"
};
const countries = {
    AU: "Australia",
    AT: "Austria",
    BE: "Belgium",
    BZ: "Belize",
    BM: "Bermuda",
    BR: "Brazil",
    CA: "Canada",
    CAR: "Caribbean",
    CN: "China",
    CR: "Costa Rica",
    HR: "Croatia",
    CU: "Cuba",
    CZ: "Czech Republic",
    DO: "Dominican Republic",
    FR: "France",
    DE: "Germany",
    GH: "Ghana",
    GR: "Greece",
    GT: "Guatemala",
    HK: "Hong Kong",
    HU: "Hungary",
    IN: "India",
    IS: "Iceland",
    IT: "Italy",
    JP: "Japan",
    MX: "Mexico",
    NL: "Netherlands",
    PE: "Peru",
    PL: "Poland",
    ZA: "South Africa",
    ES: "Spain",
    UG: "Uganda",
    GB: "United Kingdom",
    VN: "Vietnam",
};
const levels = {
    UG: "Undergraduate",
    GR: "Graduate"
}
class Person {
    constructor(fname, lname, language, proficiency, email, 
        department, country, travelled, project, partnerInstitutions) {
        this.state = {
            "First Name": fname,
            "Last Name": lname,
            "Language": language,
            "Level of Proficiency": proficiency,
            "Email": email,
            "College": departments[department]["College"],
            "Department": departments[department]["Name"],
            "Country": countries[country],
            "Travelled (Y/N)": travelled,
            "Project": project,
            "Partner Institutions": partnerInstitutions
        };
    }
    getLastName() {
        return this.state["Last Name"];
    }
    getLanguage() {
        return this.state["Language"];
    }
    getDisplayData(keys) {
        let displayData = [];
        for (let i = 0; i < keys.length; i++) {
            displayData.push(this.state[keys[i]]);
        }
        return displayData;
    }
}
class Program {
    constructor(term, name, countries, colleges, departments, dates, levels, credits) {
        this.state = {
            "Term" : term,
            "Program Name" : name,
            "Country" : countries,
            "College" : colleges,
            "Dept." : departments,
            "Dates" : dates,
            "Level" : levels,
            "Credits Avail" : credits,
        };
        if (this.state["Dates"][0] == "UG") console.log(this.state["Program Name"]);
    }
    getCountryNames() {
        let names = [];
        for (let i = 0; i < this.state["Country"].length; i++) {
            names.push(countries[this.state["Country"][i]]);
        }
        return names;
    }
    getName() {
        return this.state["Program Name"];
    }
    getTerm() {
        return terms[this.state["Term"]];
    }
    getDates() {
        return this.state["Dates"][0] + " - " + this.state["Dates"][1];
    }
    getCountriesString() {
        let countries = this.getCountryNames();
        let countriesString = "";
        for (let i = 0; i < countries.length; i++) {
            countriesString += countries[i];
            if (i != countries.length - 1) {
                countriesString += ", ";
            }
        }
        return countriesString;
    }
    getCollegesString() {
        let collegesString = "";
        for (let i = 0; i < this.state["College"].length; i++) {
            collegesString += this.state["College"][i];
            if (i != this.state["College"].length - 1) {
                collegesString += ", ";
            }
        }
        return collegesString;
    }
    getDepartmentsString() {
        let departmentsString = "";
        for (let i = 0; i < this.state["Dept."].length; i++) {
            departmentsString += this.state["Dept."][i];
            if (i != this.state["Dept."].length - 1) {
                departmentsString += ", ";
            }
        }
        return departmentsString;
    }
    getCreditsAvail() {
        return this.state["Credits Avail"];
    }
    getDisplayList() {
        let displayList = [];
        displayList.push(this.getTerm());
        displayList.push(this.getName());
        displayList.push(this.getCountriesString());
        displayList.push(this.getCollegesString());
        displayList.push(this.getDepartmentsString());
        displayList.push(this.getDates());
        displayList.push(this.getCreditsAvail());
        return displayList;
    }
}
const programs = [
    // Spring
    new Program("Spring", "Service & Community in Rural Dominican Republic", 
        ["DO"], ["Science"], ["LOC", "SOC"],["01/03/2020", "01/11/2020"],["UG"], 1),
    new Program("Spring", "Intercultural Experience: Mexico", 
        ["MX"], ["Arts"], ["COM"],["03/06/2020", "03/14/2020"],["UG"], 3),
    new Program("Spring", "iASE Dominican Republic: Grassroots Community Development and Cross-Cultural Connections", 
        ["DO"], ["Science"], ["LLC"],["03/07/2020", "03/14/2020"],["UG"], 1),
    new Program("Spring", "Education for Liberation and Sustainability in Indigenous Guatemala", 
        ["GT"], ["Honors"], ["HON"],["03/07/2020", "03/14/2020"],["UG"], 3),
    new Program("Spring", "iASE Belize: Sustainable Agroforestry and Community Development", 
        ["BZ"], ["Education"], [],["03/07/2020", "03/14/2020"],["UG"], 1),
    new Program("Spring", "Business, Society & Sustainability in the Yucatán, Mexico", 
        ["MX"], ["Business"], ["BUS", "MBA"],["03/07/2020", "03/14/2020"],["UG", "GR"], 3),
    new Program("Spring", "iASE Costa Rica: Conservation, Organic Farming, and Ecotourism", 
        ["CR"], ["Science"], ["LLC"],["03/07/2020", "03/14/2020"],["UG"], 1),
    new Program("Spring", "UK Finance", 
        ["GB"], ["Business"], ["FIN"],["03/07/2020", "03/14/2020"],["UG"], 3),
    new Program("Spring", "Student Affairs Administration in the United Kingdom", 
        ["GB"], ["Education"], ["SAA"],["04/16/2020", "04/29/2020"],["GR"], 3),
    new Program("Spring", "Bermuda Finance", 
        ["BM"], ["Business"], ["FIN"],["05/10/2020", "05/16/2020"],["UG"], 3),
    new Program("Spring", "Secret Codes of World War II", 
        ["GB"], ["Science"], ["MAT"],["05/13/2020", "05/24/2020"],["UG"], 2),
    // Summer I
    new Program("Summer I", "Angers Summer Business Program", 
        ["FR"], ["Business"], ["BUS", "FIN", "MKT"],["05/20/2020", "06/19/2020"],["UG"], 9),
    new Program("Summer I", "Leadership and Culture-Barcelona: Leadership in Social Movements", 
        ["ES"], ["Education"], ["HPC"],["05/10/2020", "05/21/2020"],["UG"], 3),
    new Program("Summer I", "War in Europe: The Eastern Front", 
        ["DE", "HU", "PL", "CZ"], ["Science"], ["SOC", "HIS"],["05/26/2020", "06/17/2020"],["UG"], 6),
    new Program("Summer I", "Global Context for Accounting - International Business in Asia Pacific", 
        ["AU"], ["Business"], ["BUS", "MBA"],["05/09/2020", "05/24/2020"],["UG", "GR"], 3),
    new Program("Summer I", "The Languages & Cultures of Northern Spain", 
        ["ES"], ["Science"], ["SNH"],["05/24/2020", "06/24/2020"],["UG"], 6),
    new Program("Summer I", "Endogenous Development in Ghana", 
        ["GH"], ["Arts"], ["SD"],["05/23/2020", "06/29/2020"],["UG"], 6),
    new Program("Summer I", "Spain LLC", 
        ["ES"], ["Science"], ["LLC"],["05/25/2020", "06/25/2020"],["UG"], 6),
    new Program("Summer I", "Climate Change, Glaciers, and Water Resources", 
        ["PE"], ["Science"], ["GHY"],["06/10/2020", "06/26/2020"],["UG"], 6),
    new Program("Summer I", "Appropriate Technology in Peru", 
        ["PE"], ["Arts"], ["STBE"],["06/11/2020", "06/28/2020"],["UG", "GR"], 6),
    new Program("Summer I", "Music and Reconstruction of South Africa", 
        ["ZA"], ["Music"], ["MUS"],["05/10/2020", "05/25/2020"],["UG"], 3),
    new Program("Summer I", "Documenting Dutch Culture", 
        ["NL"], ["Arts"], ["COM"],["05/16/2020", "06/06/2020"],["UG"], 6),
    new Program("Summer I", "Universita di Padua Bioarchaeological Field School", 
        ["IT"], ["Science"], ["ANT"],["06/24/2020", "07/20/2020"],["UG"], 6),
    new Program("Summer I", "Biological Investigations in Vietnam", 
        ["VN"], ["Science"], ["BIO"],["05/12/2020", "06/04/2020"],["UG", "GR"], 6),
    new Program("Summer I", "Global Supply Chain, Logistics, and Analytics", 
        ["IN"], ["Business"], ["SCM", "MBA"],["05/11/2020", "05/24/2020"],["UG", "GR"], 3),
    new Program("Summer I", "Prague Interdisciplinary Design Studio", 
        ["CZ"], ["Arts"], ["IND"],["05/25/2020", "06/29/2020"],["UG"], 6),
    new Program("Summer I", "Cuba: Past, Present, and Future", 
        ["CU"], ["Honors", "Science"], ["HON", "WRC"],["06/06/2020", "06/17/2020"],["UG"], 6),
    new Program("Summer I", "Love, Sex and Power", 
        ["FR", "IT"], ["Science"], ["REL", "PHL"],["05/29/2020", "06/19/2020"],["UG"], 6),
    new Program("Summer I", "Arctic Field Ecology", 
        ["CA"], ["Science"], ["BIO"],["06/03/2020", "06/19/2020"],["UG"], 3),
    new Program("Summer I", "Germany's Great Cities: Trier and Berlin", 
        ["DE"], ["Science"], ["GER"],["05/12/2020", "06/09/2020"],["UG"], 3),
    new Program("Summer I", "Italy Summer Field Geology", 
        ["IT"], ["Science"], ["GLY"],["05/16/2020", "06/27/2020"],["UG"], 6),
    new Program("Summer I", "Crossing Borders: Higher Education & Technology in the New Europe", 
        ["AT"], ["Education"], ["ITC"],["05/10/2020", "05/18/2020"],["GR"], 6),
    new Program("Summer I", "Fermented Foods and Beverages of the World", 
        ["GR"], ["Science"], ["FER"],["06/12/2020", "06/25/2020"],["UG"], 3),
    new Program("Summer I", "Cruise Line Industry in the Caribbean", 
        ["CAR"], ["Health"], ["RM"],["05/10/2020", "05/17/2020"],["UG"], 3),
    new Program("Summer I", "Theatre in Europe, Past and Present", 
        ["GB"], ["Arts"], ["THR"],["05/11/2020", "06/01/2020"],["UG"], 6),
    new Program("Summer I", "Brazil: Energy, Ecology, and Environment", 
        ["BR"], ["Business"], ["BUS", "MBA"],["05/11/2020", "05/23/2020"],["UG", "GR"], 3),
    new Program("Summer I", "Art Spain", 
        ["ES"], ["Arts"], ["ART"],["05/26/2020", "06/16/2020"],["UG"], 6),
    new Program("Summer I", "International Experience: Japan", 
        ["JP"], ["Business"], ["MBA", "BUS"],["05/11/2020", "05/20/2020"],["UG", "GR"], 3),
    new Program("Summer I", "Uganda: A Local to Global Experience", 
        ["UG"], ["Health"], ["SW"],["06/12/2020", "07/04/2020"],["UG", "GR"], 6),
    new Program("Summer I", "Holland Fellows", 
        ["CN", "HK"], ["Business"], ["BUS"],["05/12/2020", "05/28/2020"],["UG"], 3),
    new Program("Summer I", "Exploring Youth Sexual Health Culture and Sexuality Education in England", 
        ["GB"], ["Health"], ["HPE"],["06/13/2020", "06/21/2020"],["UG"], 3),
    new Program("Summer I", "Poland Communication",
        ["PL"], ["Arts"], ["COM"],["05/12/2020", "06/09/2020"],["UG"], 6),
    new Program("Summer I", "Human Development and Creative Writing in Croatia", 
        ["HR"], ["Science"], ["ENG", "PSY"],["06/07/2020", "07/05/2020"],["UG"], 6),
    new Program("Summer I", "Advertising, Media, and Business in China", 
        ["CN"], ["Arts"], ["COM"],["05/12/2020", "06/01/2020"],["UG"], 6),
    new Program("Summer I", "Architecture and Design from Paris to Amsterdam", 
        ["FR", "BE", "NL"], ["Arts"], ["IND", "INT"],["05/13/2020", "06/04/2020"],["UG"], 6),
    // Summer II
    new Program("Summer II", "Animal Based Tourism: A Sampler Within the UK", 
        ["GB"], ["Business"], ["HOS"],["07/23/2020", "08/03/2020"],["UG"], 3),
    new Program("Summer II", "Renaissance London", 
        ["GB"], ["Science"], ["ENG"],["07/06/2020", "07/27/2020"],["UG"], 6),
    new Program("Summer II", "Race & Justice in South Africa and the US", 
        ["ZA"], ["Science"], ["CJ"],["07/10/2020", "08/01/2020"],["UG"], 6),
    new Program("Summer II", "Comparative Study of Educational Systems of NC and Free State", 
        ["ZA"], ["Education"], ["LES"],["07/08/2020", "07/27/2020"],["GR"], 3),
    new Program("Summer II", "Land of Fire and Ice", 
        ["IS"], ["Science"], ["GLY", "HPC"],["07/22/2020", "08/06/2020"],["UG"], 4),
]
const people = [
    new Person("Claire", "Carrfield", "Farsi", "Fluent", "Carrfieldcg@notreallyapp.edu", 
        "SW", "AT", "N", "Research", "Daymark Recovery Services"),
    new Person("Jenny", "Ratford", "German", "Proficient", "Ratfordjj@notreallyapp.edu", 
        "MAT", "DE", "Y", "Conference", "None"),
    new Person("Lura", "Jasper", "Japanese", "Fluent", "Jasperlv@notreallyapp.edu", 
        "ANT", "JP", "Y", "Research", "None"),
    new Person("Iris", "Wendland", "Danish", "Native Speaker", "Wendlandia@notreallyapp.edu", 
        "BUS", "NL", "Y", "Visiting Professor", "None"),
    new Person("Lup", "Lopez", "Spanish", "Native Speaker", "Lopezll@notreallyapp.edu", 
        "GHY", "PE", "N", "Teaching", "None"),
    new Person("Jenny", "Calendar", "French", "Fluent", "Calendarjp@notreallyapp.edu", 
        "LES", "FR", "N", "Teaching", "None"),
    new Person("Kareena", "Rizen", "Russian", "Proficient", "Rizenkp@notreallyapp.edu", 
        "WRC", "CZ", "Y", "Research", "None"),
    new Person("Amahle", "Vashawn", "French", "Native Speaker", "Vashawnak@notreallyapp.edu", 
        "PHL", "ZA", "Y", "Conference", "None"),
    new Person("Yumi", "Rokujou", "Chinese", "Proficient", "Rokujouyi@notreallyapp.edu", 
        "MUS", "HK", "Y", "Conference", "None"),
    new Person("Nanami", "Erisa", "Korean", "Proficient", "Erisang@notreallyapp.edu", 
        "BIO", "CN", "N", "Research", "None"),
]
class QEP {
    constructor() {
        let study
        this.state = {
            title : "Office of the Quality Enhancement Plan",
            subtitle: "Appalchian State University",
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
            sections : {
                home : {
                    imageUrl: "../images/qep-logo-white.png",
                    pdfTitle: "QEP Official Documentation",
                    pdfImgUrl: "../images/qep_cover_revised.png",
                    pdfUrl: "https://qep.appstate.edu/sites/qep.appstate.edu/files/QEP-report-final_0.pdf",
                },
                language : {
                    name : "Search for People by Language",
                    searchChoices: {
                        "Language" : this.getLanguages(),
                        "Department": this.getDepartments()
                    },
                    info : {
                        dataHeaders : [
                            "First Name",
                            "Last Name",
                            "Language",
                            "Level of Proficiency",
                            "Email"
                        ],
                        data : this.getLanguageDisplayData()
                    }
                },
                other :  {
                    name : "Search for People by Academic Affiliation, County, and Last Name",
                    searchChoices : {
                        "Academic Department": this.getDepartments(),
                        "Academic College ": this.getColleges(),
                        "Country" : this.getCountryList(),
                        "Last Name" : this.getLastNames(),
                    },
                    info : {
                        dataHeaders : [
                            "First Name",
                            "Last Name",
                            "College",
                            "Department",
                            "Country",
                            "Travelled (Y/N)",
                            "Project",
                            "Partner Institutions"
                        ],
                        data : this.getOtherDisplayData()
                    }
                },
                studyAbroad : {
                    name : "Search for Available Study Abroad Opportunities",
                    searchChoices : {
                        "Term": this.getTermList(),
                        "Program Name": this.getProgramNameList(),
                        "Country": this.getCountryList(),
                        "Dates": this.getDateList()
                    },
                    info : {
                        dataHeaders : [
                            "Term",
                            "Program Name",
                            "Country",
                            "College",
                            "Dept.",
                            "Dates",
                            "Credits Avail."
                        ],
                        data : this.getStudyAbroadDisplayList()
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
        title.appendChild(document.createTextNode(this.state.title));
        let subtitle = document.createElement('h2');
        subtitle.appendChild(document.createTextNode(this.state.subtitle));
        titleSection.appendChild(title);
        titleSection.appendChild(subtitle);
        titleSection.onclick = function() {
            let articles = document.querySelectorAll('.mainArticle');
            for (let i = 0; i < articles.length; i++) {
                if (articles[i].id == "home") {
                    articles[i].style.display = "flex";
                } else {
                    articles[i].style.display = "none";
                }
            }
        }
        
        let tabs = document.createElement('ul');
        tabs.setAttribute('id', 'topTabs');

        let _this = this;
        for (let key in this.state.sections) {
            if (key != "home") {
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
    homeArticle() {
        let homeArticle = document.createElement('article');
        homeArticle.setAttribute('id', 'home');
        homeArticle.setAttribute('class', 'mainArticle');
        homeArticle.style.display = "flex";
        let homeImg = document.createElement('img');
        homeImg.setAttribute('id', 'homeImg');
        homeImg.src = this.state.sections.home.imageUrl;

        let pdfSection = document.createElement('div');
        pdfSection.setAttribute('id', 'pdfSection');
        let pdfTitle = document.createElement('h2');
        pdfTitle.appendChild(document.createTextNode(this.state.sections.home.pdfTitle));
        let pdfLink = document.createElement('a');
        pdfLink.setAttribute('id', 'pdfLink');
        pdfLink.href = this.state.sections.home.pdfUrl;
        let pdfImg = document.createElement('img');
        pdfImg.setAttribute('id', 'pdfImg');
        pdfImg.src = this.state.sections.home.pdfImgUrl;
        pdfLink.appendChild(pdfImg);

        pdfSection.appendChild(pdfTitle);
        pdfSection.appendChild(pdfLink);

        homeArticle.appendChild(homeImg);
        homeArticle.appendChild(pdfSection);
        return homeArticle;
    }
    languageSearchArticle() {
        let languageSearchArticle = document.createElement('article');
        languageSearchArticle.setAttribute('id', 'language');
        languageSearchArticle.setAttribute('class', 'mainArticle');
        languageSearchArticle.appendChild(this.buildSearchBar(this.state.sections.language.searchChoices))
        languageSearchArticle.appendChild(this.buildResultsTable(this.state.sections.language.info));
        return languageSearchArticle;
    }
    otherSearchArticle() {
        let otherSearchArticle = document.createElement('article');
        otherSearchArticle.setAttribute('id', 'other');
        otherSearchArticle.setAttribute('class', 'mainArticle');
        otherSearchArticle.appendChild(this.buildSearchBar(this.state.sections.other.searchChoices))
        otherSearchArticle.appendChild(this.buildResultsTable(this.state.sections.other.info));
        return otherSearchArticle;
    }
    studyAbroadArticle() {
        let studyAbroadSearchArticle = document.createElement('article');
        studyAbroadSearchArticle.setAttribute('id', 'studyAbroad');
        studyAbroadSearchArticle.setAttribute('class', 'mainArticle');
        let searchTypes = this.state.sections.studyAbroad.searchChoices;
        studyAbroadSearchArticle.appendChild(this.buildSearchBar(this.state.sections.studyAbroad.searchChoices))
        studyAbroadSearchArticle.appendChild(this.buildResultsTable(this.state.sections.studyAbroad.info));
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
        for (let heading in info.dataHeaders) {
            let item = document.createElement('th');
            item.appendChild(document.createTextNode(info.dataHeaders[heading]));
            headerRow.appendChild(item);
        }
        table.appendChild(headerRow);

        for (let i = 0; i < info.data.length; i++) {
            let row = document.createElement('tr');
            for (let j = 0; j < info.data[i].length; j++) {
                let item = document.createElement('td');
                item.appendChild(document.createTextNode(
                    info.data[i][j]
                ));
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
    getCountryList() {
        let countryList = [];
        for (let i = 0; i < programs.length; i++) {
            let countryNames = programs[i].getCountryNames();
            for (let j = 0; j < countryNames.length; j++) {
                if (!this.inList(countryList, countryNames[j])) {
                    countryList.push(countryNames[j]);
                }
            }
        }
        return countryList;
    }
    getProgramNameList() {
        let programList = [];
        for (let i = 0; i < programs.length; i++) {
            programList.push(programs[i].getName());
        }
        return programList;
    }
    getTermList() {
        let termList = [];
        for (let i = 0; i < programs.length; i++) {
            let term = programs[i].getTerm();
            if (!this.inList(termList, term)) {
                termList.push(term);
            }
        }
        return termList;
    }
    getDateList() {
        let dateList = [];
        for (let i = 0; i < programs.length; i++) {
            let dates = programs[i].getDates();
            if (!this.inList(dateList, dates)) {
                dateList.push(dates);
            }
        }
        return dateList;
    }
    getColleges() {
        let collegeList = [];
        for (let key in colleges) {
            collegeList.push(colleges[key]);
        }
        return collegeList;
    }
    getDepartments() {
        let departmentList = [];
        for (let key in departments) {
            departmentList.push(departments[key]["Name"]);
        }
        return departmentList;
    }
    getLastNames() {
        let lastNames = [];
        for (let i = 0; i < people.length; i++) {
            if (!this.inList(lastNames, people[i].getLastName())) {
                lastNames.push(people[i].getLastName());
            }
        }
        return lastNames;
    }
    getLanguages() {
        let languages = [];
        for (let i = 0; i < people.length; i++) {
            if (!this.inList(languages, people[i].getLanguage())) {
                languages.push(people[i].getLanguage());
            }
        }
        return languages;
    }
    inList(list, word) {
        for (let i = 0; i < list.length; i++) {
            if (list[i] == word) {
                return true;
            }
        }
        return false;
    }
    getLanguageDisplayData() {
        let displayData = [];
        let keys = [
            "First Name",
            "Last Name",
            "Language",
            "Level of Proficiency",
            "Email"
        ];
        for (let i = 0; i < people.length; i++) {
            displayData.push(people[i].getDisplayData(keys));
        }
        return displayData;
    }
    getOtherDisplayData() {
        let displayData = [];
        let keys = [
            "First Name",
            "Last Name",
            "College",
            "Department",
            "Country",
            "Travelled (Y/N)",
            "Project",
            "Partner Institutions"
        ];
        for (let i = 0; i < people.length; i++) {
            displayData.push(people[i].getDisplayData(keys));
        }
        return displayData;
    }
    getStudyAbroadDisplayList() {
        let programDisplayList = [];
        for (let i = 0; i < programs.length; i++) {
            programDisplayList.push(programs[i].getDisplayList());
        }
        return programDisplayList;
    }
    
    load() {
        let contentWrapper = document.createElement('div');
        contentWrapper.setAttribute('id', 'contentWrapper');
        contentWrapper.appendChild(this.homeArticle());
        contentWrapper.appendChild(this.languageSearchArticle());
        contentWrapper.appendChild(this.otherSearchArticle());
        contentWrapper.appendChild(this.studyAbroadArticle());
        document.body.appendChild(this.topbar());
        document.body.appendChild(this.pageBlockHeader());
        document.body.appendChild(contentWrapper);
        document.body.appendChild(this.footer());
    }
}
site = new QEP();
site.load(); 