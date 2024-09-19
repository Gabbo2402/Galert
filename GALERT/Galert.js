class Galert extends HTMLDivElement{
    constructor(){
        super();
        this.style.backgroundColor  = "#fefefe";
		this.style.margin = "20px auto";
		this.style.padding = "20px";
		this.style.border = "1px solid #888";
		this.style.width = "80%";
        this.style.maxHeight = "90%";
        this.style.overflowY = "auto";
    };
};

class GalertText  extends HTMLParagraphElement{
    constructor(){
		super();
	};
    setPText(text){
		this.innerText=text;
	};
};

class GalertButton extends HTMLButtonElement{
    constructor(){
		super();
	};
    setBText(text){
        this.innerText=text;
    };
    addClose(){
        this.addEventListener("click", chiudialert);
    };
};

class GalertList extends HTMLUListElement{
    constructor(){
		super();
	};
    setlist(dati){
        dati.forEach(element => {
            var li = document.createElement("li");
		    li.textContent= element;
		    li.addEventListener("click", selectElement);
		    this.appendChild(li);
        });
    };
    setListMulti(dati){
        dati.forEach(element => {
            var li = document.createElement("li");
		    li.textContent= element;
		    li.addEventListener("click", selectMultiElement);
		    this.appendChild(li);
        });
    };
};

class GalertCamp extends HTMLInputElement{
    constructor(){
		super();
	};
};
//Funzione per Creare il contenitore del Galert
function createGalertCont(){
    GalertCont=document.createElement("div");
    GalertCont.style.display = "block";
    GalertCont.style.background="rgba(0,0,0,0.3)";
	GalertCont.style.position = "fixed";
	GalertCont.style.zIndex = "5";
	GalertCont.style.width = "100%";
	GalertCont.style.height = "100%";
	GalertCont.style.left = "0";
	GalertCont.style.top = "0";
    GalertCont.id="galertCont";
};
//Funzione per chiudere l'alert ed annullare
function chiudialert(){
	document.body.lastChild.remove();
    element_selected=undefined;
    selected_elements=[];
};
//Funzione per selezionare gli elementi della lista dei Galert3
var element_selected=undefined;
function selectElement(){
	if(element_selected==undefined){
        element_selected = this.textContent;
	}
	else if(element_selected==this.textContent){
		element_selected=undefined;
	}
	else{
		element_selected=this.textContent;
	}
};
//Funzione per selezionare più di un elemento nei Galert4
var selected_elements=[];
function selectMultiElement(){
	if (selected_elements.indexOf(this.textContent)==-1)
		selected_elements.push(this.textContent);
	else
    selected_elements.splice(selected_elements.indexOf(this.textContent),1);	
}
//Funzione Per Galert Avviso Generico(Tipo1) Dati[0]=Testo
function creaGalertTipo1(dati){
    //Creo Il div che contiene Galert
    createGalertCont();
    //Creo il Galert
    if(customElements.get('g-alert') === undefined)
        customElements.define("g-alert", Galert, {extends:"div"});
    GALERT = document.createElement("div","g-alert");
    //Creo il testo del Galert
    if(customElements.get('g-text') === undefined)
        customElements.define("g-text", GalertText, {extends:"p"});
    GALERTTEXT = document.createElement("p","g-text");
    GALERTTEXT.setPText(dati[0]);
    //Creo un bottone e ci associo la funzione chiudi alert
    if(customElements.get('g-button') === undefined)
        customElements.define("g-button", GalertButton, {extends:"button"});
    GALERTBUTTON1 = document.createElement("button","g-button");
    GALERTBUTTON1.addClose();
    GALERTBUTTON1.setBText("Ok");
    //Aggiungo i nodi al programma
    GALERT.appendChild(GALERTTEXT);
    GALERT.appendChild(GALERTBUTTON1);
    GalertCont.appendChild(GALERT);
    document.body.appendChild(GalertCont);
};
//Funzione Per Galert OK o Annulla(Tipo2) Dati[0]=Testo Dati[1]=Funzione_Si
function creaGalertTipo2(dati){
    //Creo Il div che contiene Galert
    createGalertCont();
    //Creo il Galert
    if(customElements.get('g-alert') === undefined)
        customElements.define("g-alert", Galert, {extends:"div"});
    GALERT = document.createElement("div","g-alert");
    //Creo il testo del Galert
    if(customElements.get('g-text') === undefined)
        customElements.define("g-text", GalertText, {extends:"p"});
    GALERTTEXT = document.createElement("p","g-text");
    GALERTTEXT.setPText(dati[0]);
    //Creo un bottone e ci associo la funzione chiudi alert
    if(customElements.get('g-button') === undefined)
        customElements.define("g-button", GalertButton, {extends:"button"});
    GALERTBUTTON1 = document.createElement("button","g-button");
    GALERTBUTTON1.addClose();
    GALERTBUTTON1.setBText("Close");
    //Creo il secondo bottone e ci associo la funzione che gli viene passata in dati
    GALERTBUTTON2 = document.createElement("button","g-button");
    GALERTBUTTON2.addEventListener("click",dati[1]);
    GALERTBUTTON2.setBText("Ok");
    //Aggiungo i nodi al programma
    GALERT.appendChild(GALERTTEXT);
    GALERT.appendChild(GALERTBUTTON1);
    GALERT.appendChild(GALERTBUTTON2);
    GalertCont.appendChild(GALERT);
    document.body.appendChild(GalertCont);
};
//Funzione Per Galert Selezione unica da lista(Tipo3) Dati[0]=Testo Dati[1]=Funzione_Scegli Dati[2]=Elementi_Lista
function creaGalertTipo3(dati){
    //Creo Il div che contiene Galert
    createGalertCont();
    //Creo il Galert
    if(customElements.get('g-alert') === undefined)
        customElements.define("g-alert", Galert, {extends:"div"});
    GALERT = document.createElement("div","g-alert");
    //Creo il testo del Galert
    if(customElements.get('g-text') === undefined)
        customElements.define("g-text", GalertText, {extends:"p"});
    GALERTTEXT = document.createElement("p","g-text");
    GALERTTEXT.setPText(dati[0]);
    //Creo un bottone e ci associo la funzione chiudi alert
    if(customElements.get('g-button') === undefined)
        customElements.define("g-button", GalertButton, {extends:"button"});
    GALERTBUTTON1 = document.createElement("button","g-button");
    GALERTBUTTON1.addClose();
    GALERTBUTTON1.setBText("Close");
    //Creo il secondo bottone e ci associo la funzione che gli viene passata in dati
    GALERTBUTTON2 = document.createElement("button","g-button");
    //Se il bottone viene premuto ed è stato selezionato un elemento della lista esegue la funzione in Dati[1] e chiude il Galert altrimenti manda un Galert1 che informa della necessità di selezionare qualcosa
    GALERTBUTTON2.addEventListener("click", function ischosen(){
        if(element_selected != undefined){
            dati[1](element_selected);
            chiudialert();
        }
        else
            creaGalertTipo1(["Devi selezionare almeno un elemento per eseguire la funzione scegli"]);
    });
    GALERTBUTTON2.setBText("Select");
    //Creo la lista e la riempio con ciò che sta in dati[2]
    if(customElements.get('g-list') === undefined)
		customElements.define("g-list", GalertList, {extends:"ul"});
    GALERTLIST = document.createElement("ul","g-list");
    GALERTLIST.setlist(dati[2]);
    //Aggiungo i nodi al programma
    GALERT.appendChild(GALERTTEXT);
    GALERT.appendChild(GALERTLIST);
    GALERT.appendChild(GALERTBUTTON1);
    GALERT.appendChild(GALERTBUTTON2);
    GalertCont.appendChild(GALERT);
    document.body.appendChild(GalertCont);
};
//Funzione per Galert selezione multipla da lista(Tipo4) Dati[0]=Testo Dati[1]=Funzione_Scegli Dati[2]=Elementi_Lista Dati[3]=Flag_almeno_uno(Default true)
function creaGalertTipo4(dati){
    //Controllo per il flag_Almeno_Uno
    if(dati.includes(false)){
		flagAlmenoUno=false;
	}
	else
		flagAlmenoUno=true;
    //Creo Il div che contiene Galert
    createGalertCont();
    //Creo il Galert
    if(customElements.get('g-alert') === undefined)
        customElements.define("g-alert", Galert, {extends:"div"});
    GALERT = document.createElement("div","g-alert");
    //Creo il testo del Galert
    if(customElements.get('g-text') === undefined)
        customElements.define("g-text", GalertText, {extends:"p"});
    GALERTTEXT = document.createElement("p","g-text");
    GALERTTEXT.setPText(dati[0]);
    //Creo un bottone e ci associo la funzione chiudi alert
    if(customElements.get('g-button') === undefined)
        customElements.define("g-button", GalertButton, {extends:"button"});
    GALERTBUTTON1 = document.createElement("button","g-button");
    GALERTBUTTON1.addClose();
    GALERTBUTTON1.setBText("Close");
    //Creo il secondo bottone e ci associo la funzione che gli viene passata in dati
    GALERTBUTTON2 = document.createElement("button","g-button");
    GALERTBUTTON2.addEventListener("click", function selezionatoSI(){
		if(selected_elements.length>0 && flagAlmenoUno==true){
			dati[1](selected_elements);
            chiudialert();
        }
		else if(selected_elements.length==0 && flagAlmenoUno==true)
			creaGalertTipo1(["Devi selezionare almeno un elemento per eseguire la funzione scegli"]);
		else{
			dati[1](selected_elements);
            chiudialert();
        }
	});
    GALERTBUTTON2.setBText("Select");
    //Creo la lista e la riempio con ciò che sta in dati[2]
    if(customElements.get('g-list') === undefined)
		customElements.define("g-list", GalertList, {extends:"ul"});
    GALERTLIST = document.createElement("ul","g-list");
    GALERTLIST.setListMulti(dati[2]);
    //Aggiungo i nodi al programma
    GALERT.appendChild(GALERTTEXT);
    GALERT.appendChild(GALERTLIST);
    GALERT.appendChild(GALERTBUTTON1);
    GALERT.appendChild(GALERTBUTTON2);
    GalertCont.appendChild(GALERT);
    document.body.appendChild(GalertCont);
};
//Funzione per Galert inserisci stringa(Tipo5) Dati[0]=Testo Dati[1]=Funzione_Ok Dati[2]=Requisiti_Stringa
function creaGalertTipo5(dati){
    //Creo Il div che contiene Galert
    createGalertCont();
    //Creo il Galert
    if(customElements.get('g-alert') === undefined)
        customElements.define("g-alert", Galert, {extends:"div"});
    GALERT = document.createElement("div","g-alert");
    //Creo il testo del Galert
    if(customElements.get('g-text') === undefined)
        customElements.define("g-text", GalertText, {extends:"p"});
    GALERTTEXT = document.createElement("p","g-text");
    GALERTTEXT.setPText(dati[0]);
    //Creo un bottone e ci associo la funzione chiudi alert
    if(customElements.get('g-button') === undefined)
        customElements.define("g-button", GalertButton, {extends:"button"});
    GALERTBUTTON1 = document.createElement("button","g-button");
    GALERTBUTTON1.addClose();
    GALERTBUTTON1.setBText("Close");
    //Creo il campo di input in cui l'utente scriverà
    if(customElements.get('g-input') === undefined)
		customElements.define("g-input", GalertCamp, {extends:"input"});
    GALERTINPUT = document.createElement("input","g-input");
    //Creo il secondo bottone che una volta premuto controlla la stringa scritta dall'utente con i requisiti stringa e se li rispetta fa partire la funione in Dati[1]
    GALERTBUTTON2 = document.createElement("button", "g-button");
	GALERTBUTTON2.addEventListener("click", function rispettaRequisiti(){
		switch(dati[2]){
			case 'solo char':
				var regex=/^[a-zA-Z]+$/; 
				if(regex.test(GALERTINPUT.value)==true){
					dati[1]();
                    chiudialert();
                }
				else
					creaGalertTipo1(['Scrivi una sequenza di soli caratteri']);
			break;
			case 'solo alfanum':
				var regex=/^[a-zA-Z0-9]+$/;
				if(regex.test(GALERTINPUT.value)==true){
					dati[1]();
                    chiudialert();
                }
				else
					creaGalertTipo1(['Scrivi una sequenza di soli alfanumerici']);
			break;
			case 'numerico':
				var regex=/^[0-9]+$/;
				if(regex.test(GALERTINPUT.value)==true){
					dati[1]();
                    chiudialert();
                }
				else
					creaGalertTipo1(['Scrivi una sequenza di soli interi']);
			break;
			case 'qualsiasi':
					dati[1]();
                    chiudialert();
			break;
		};
	});
    GALERTBUTTON2.setBText("Ok");
    GALERT.appendChild(GALERTTEXT);
    GALERT.appendChild(GALERTINPUT);
    GALERT.appendChild(GALERTBUTTON1);
    GALERT.appendChild(GALERTBUTTON2);
    GalertCont.appendChild(GALERT);
    document.body.appendChild(GalertCont);
};
//Funzione per Galert inserisci stringa(Tipo6) Dati[0]=Testo Dati[1]=Funzione_Scegli Dati[2]=Parametri_Ricerca Dati[3]=Dataset
function creaGalertTipo6(dati){
    //Creo Il div che contiene Galert
    createGalertCont();
    //Creo il Galert
    if(customElements.get('g-alert') === undefined)
        customElements.define("g-alert", Galert, {extends:"div"});
    GALERT = document.createElement("div","g-alert");
    //Creo il testo del Galert
    if(customElements.get('g-text') === undefined)
        customElements.define("g-text", GalertText, {extends:"p"});
    GALERTTEXT = document.createElement("p","g-text");
    GALERTTEXT.setPText(dati[0]);
    //Creo un bottone e ci associo la funzione chiudi alert
    if(customElements.get('g-button') === undefined)
        customElements.define("g-button", GalertButton, {extends:"button"});
    GALERTBUTTON1 = document.createElement("button","g-button");
    GALERTBUTTON1.addClose();
    GALERTBUTTON1.setBText("Close");
    //Creo la lista e la riempio con ciò che viene returnato da QUASI
    if(customElements.get('g-list') === undefined)
		customElements.define("g-list", GalertList, {extends:"ul"});
    GALERTLIST = document.createElement("ul","g-list");
    /*Se la lista è di un solo elemento non la si crea e si seleziona automaticamente l'elemento;
    if(dati[2].length>1)
        GALERTLIST.setListMulti(dati[2]);
    else
        element_selected=dati[2];*/
    //Creo il campo di input in cui l'utente scriverà
    if(customElements.get('g-input') === undefined)
		customElements.define("g-input", GalertCamp, {extends:"input"});
    GALERTINPUT = document.createElement("input","g-input");
    //Creo il pulsante che inizia la ricerca solo se viene selezionato un elemento della lista o in caso contrario comunica l'errore tramite Galert1
    GALERTBUTTON2 = document.createElement("button","g-button");
    //var proprieta;
    var comando;
    var risricerca=[];
    GALERTBUTTON2.addEventListener("click", function research(){
        comando=GALERTINPUT.value+"--"+dati[2];
        risricerca= QUASI(comando,dati[3]);
        GALERTLIST.setlist(risricerca);
        GALERT.appendChild(GALERTLIST);
        //Creo il secondo bottone e ci associo la funzione che gli viene passata in dati
        GALERTBUTTON3 = document.createElement("button","g-button");
        //Se il bottone viene premuto ed è stato selezionato un elemento della lista esegue la funzione in Dati[1] e chiude il Galert altrimenti manda un Galert1 che informa della necessità di selezionare qualcosa
        GALERTBUTTON3.addEventListener("click", function ischosen(){
            if(element_selected != undefined){
                dati[1](element_selected);
                chiudialert();
            }
            else
                creaGalertTipo1(["Devi selezionare almeno un elemento per eseguire la funzione scegli"]);
        });
        GALERTBUTTON3.setBText("Select");
        GALERT.appendChild(GALERTBUTTON3);
    });
    GALERTBUTTON2.setBText("Search");
    GALERT.appendChild(GALERTTEXT);
    GALERT.appendChild(GALERTINPUT);
    GALERT.appendChild(GALERTBUTTON1);
    GALERT.appendChild(GALERTBUTTON2);
    GalertCont.appendChild(GALERT);
    document.body.appendChild(GalertCont);
};