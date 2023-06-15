'use strict'

//vytvoření pole pojištěnců
class SeznamPojistencu {

    constructor() {
        const pojistenciLS = localStorage.getItem("pojistenci");
        const myPojistenci = JSON.parse(pojistenciLS);
        this.pojistenci = (myPojistenci) ? myPojistenci : [];

        this.initForm()
        //vždy projde pole z JSON a zapíše do tabulky
        this.pojistenci.forEach((jedenPojistenec) => {
            this.vypisPojistence(jedenPojistenec)
        });
    }

    //odstranění údajů z formuláře po submitu
    clearForm = () => {
        document.getElementById('inputFirstName').value = "";
        document.getElementById('inputLastName').value = "";
        document.getElementById('inputAge').value = "";
        document.getElementById('inputTel').value = ""; 
    }

    //přidání pojištěnců do pole a JSONu z inputů
    ulozPojistence = (pojistenec) => {
       
        this.pojistenci.push(pojistenec);
        let pojistenciJSON = JSON.stringify(this.pojistenci)
        localStorage.setItem("pojistenci", pojistenciJSON)
    }

    //zapsání pojištěnců do tabulky
    vypisPojistence(pojistenec) {
        const table = document.getElementById("seznamPojistencu");   //kam

        //vytvoření buňky
        const createCell = (text) => {
            const cell = document.createElement("td");
            cell.innerText = text;
            return cell;
        }

        //vytvoření řádku
        const row = document.createElement("tr");

        //zápisy
        const nameCell = createCell(pojistenec.jmeno);
        row.appendChild(nameCell);

        const ageCell = createCell(pojistenec.vek);
        row.appendChild(ageCell);

        const telCell = createCell(pojistenec.telefon);
        row.appendChild(telCell);

        table.appendChild(row); 
    }

    //načtení dat z formuláře
    initForm = () => {
        const form = document.getElementById("form");
        const onSubmit = (event) => {
            event.preventDefault() //zajistí nepřepsání stránky po stisknutí tlačítka

            const data = new FormData(event.target);//zpracuje a předá data z formuláře jako pole
            const object = {};
            data.forEach((value, key) => object[key] = value); //projde pole dat z inputů a zapíše do object
            const pojistenec = new Pojistenec(object.firstName + " " + object.lastName, object.age, object.tel);
    
            this.ulozPojistence(pojistenec);

            this.clearForm()

            this.vypisPojistence(pojistenec)
        }
    
        form.onsubmit = onSubmit;
    }
}



