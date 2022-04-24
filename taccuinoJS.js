const wholeNote = `
    <div class="column is-4" style="display:inline-block;min-width:200px;" id="col-@">
        <div class="box" style="box-shadow:-3px 3px 5px 3px #999;">
            <label class="label is-medium">Nota</label>
            <p class="content" id="content-nota-@" style="overflow:hidden;display:-webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;">
            
            
            </p><button class="button is-info is-small modal-button" id="modal-btn-@" data-target="modal-@" onclick="popUpModal(this)">Espandi</button><button class="button is-danger is-small" id="@-eliminaBtn" onclick="eliminaNota(this)" style="margin-left:5px;">Elimina</button>
        </div>
        <div class="modal" id="modal-@">
            <div class="modal-background"></div>
                <div class="modal-content">
                    <div class="box">
                        <p class="content" id="content-modal-@">

                        </p>
                    </div>
                </div>
                <button class="modal-close is-large" id="closeModal" onclick="pushDownModal()"></button>
        </div>
    </div>
`;

const addBtn = document.getElementById('bottone-add');
const input = document.getElementById('input-nota');

function EnableDisable() {
    let bottone = document.getElementById('bottone-add');

    if (input.value.trim() != "") {
        bottone.disabled = false;
    } else {
        bottone.disabled = true;
    }
}
const attivaDisattiva = input.addEventListener('keyup', () => {
    EnableDisable();
});

function maxChars(input) {
    let stringa = input.value;

    if (stringa.length >= 500) {
        input.value = stringa.substring(0, 499);
    }
}

//*******************************************************************************************
// ***FUNZIONI PER MODALE***

function popUpModal(questo) {
    //@param: HTML element
    //@return: none
    // accende un modal univoco per id
    let IDmodale = questo.id;
    let selettore = IDmodale.substring(IDmodale.length, IDmodale.length - 1);
    let modale = document.getElementById('modal-' + selettore);

    modale.setAttribute('class', 'modal is-active');
}

function pushDownModal() {
    //@param: none
    //@return: none
    // uccide tutti i modal attivi. (ma i modal attivi sono precisamente uno)
    let elemento = document.getElementsByClassName('modal is-active');
    elemento[0].setAttribute('class', 'modal');
}

//*******************************************************************************************
let array_note = [];
// MANIPOLAZIONE NOTE

function nuovaNota() {      //prendo lo scheletro e ci metto l'id giusto
    let nuovaNotaTemp = wholeNote;
    nuovaNotaTemp = nuovaNotaTemp.replace(/@/g, `${array_note.length - 1}`);
    return nuovaNotaTemp;
}

function addNote() {

    let container = document.getElementById('container');
    let index = array_note.length - 1;

    let notaDaAggiungere = nuovaNota();     //creo lo scheletro della nota
    container.innerHTML += notaDaAggiungere;    //lo aggiungo al container

    document.getElementById("content-nota-" + index).textContent = array_note[index];   //aggiungo il text
    document.getElementById("content-modal-" + index).textContent = array_note[index];  //aggiungo il text al modal
}

//*******************************************************************************************


addBtn.addEventListener('click', () => {   // AZIONI AL PREMERE DI AGGIUGI
    array_note.push(input.value);   //aggiunta del testo nel set di note.
    addNote();
    input.value = '';       //pulisco input field.
    EnableDisable();
});

function eliminaNota(elimina_btn) {
    array_note.splice(elimina_btn.id[0], 1);  //elimino la nota dal set di note

    let selettore = elimina_btn.id[0];

    let myDiv = document.getElementById(`col-${selettore}`);  //elimino la nota dal documento vero e proprio
    let genitore = myDiv.parentNode;
    genitore.removeChild(myDiv);
}
