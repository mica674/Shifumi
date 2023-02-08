// Déclaration des variables
let btnVal = 0;
let cptWin = 0;
let cptLose = 0;
let cptStats = 0;
// Ciblage des élements HTML
let btn = document.querySelectorAll('button');
const resultDisplay = document.querySelector('.resultFight');
const computerGroup = document.querySelector('.computerGroup');
const computerChoice = document.querySelector('.computerChoice');
const cptGroup = document.querySelectorAll('.cptGroup');
const cptWinDisplay = document.querySelector('#cptWin');
const cptLoseDisplay = document.querySelector('#cptLose');
const cptStatsDisplay = document.querySelector('#cptStats');


// Local Storage
let currentValuesJson = {
    cptWin: 0,
    cptLose: 0
};
let currentValuesObj = localStorage.getItem("currentValues");
currentValuesJson = JSON.parse(currentValuesObj);
cptWin = currentValuesJson.cptWin;
cptLose = currentValuesJson.cptLose;
console.log(currentValuesJson);

  // Affichage des valeurs cptWin, cptLose et cptStats
            // Dès qu'une partie a été joué (gagnée ou perdue)
            if (cptWin != 0 || cptLose != 0) {
                cptGroup.forEach((e) => {
                    e.classList.remove('d-none');
                })
                cptWinDisplay.innerHTML = cptWin;
                cptLoseDisplay.innerHTML = cptLose;
                cptStatsDisplay.innerHTML = calcStats();
            }

// FONCTIONS
// Fonction du 'choix' aléatoire de l'ordinateur
function fnRandomShifumi() {
    return Math.floor(Math.random() * 5);
}

// Fonction déterminant le vainqueur du shifumi
function fnCompar(btnVal, compVal) {
    let result;
    if ((btnVal == 0 && (compVal == 2 || compVal == 4))
        || (btnVal == 1 && (compVal == 0 || compVal == 3))
        || (btnVal == 2 && (compVal == 1 || compVal == 4))
        || (btnVal == 3 && (compVal == 0 || compVal == 2))
        || (btnVal == 4 && (compVal == 1 || compVal == 3))
    ) {
        cptWin++;
        result = 'You win';
    } else if (btnVal == compVal) {
        result = 'Try again';
    } else {
        cptLose++;
        result = 'You lose';
    }
    return result;
}

// Fonction de conversion valeur -> text
function fnCompValDisplay(compVal) {
    let valueText;
    let btnClone;

    // S'il y a déjà un clone, on le supprime
    if (document.getElementById('clone')) {
        computerGroup.removeChild(document.getElementById('clone'));
    }

    // Création d'un clone du badge correspondant à la valeur de l'ordinteur
    btnClone = btn[compVal].cloneNode(true);

    // Modification des différents attributs du clone
    btnClone.value = 'computer';
    btnClone.id = 'clone';
    btnClone.classList.add('text-dark');
    btnClone.setAttribute('disabled', '');

    // Si le badge copié contient la class 'shining' il faut la remove
    if (btnClone.classList.contains('shining')) {
        btnClone.classList.remove('shining');
    };

    // On ajoute le clone en tant qu'enfant de la div class='computerGroup'
    computerGroup.appendChild(btnClone);

    return valueText;
}

// Fonction pour calculer les statistiques du joueur
function calcStats() {
    if (cptWin > 0 || cptLose > 0) {
        cptStats = (cptWin / (cptWin + cptLose) * 100).toFixed(2) + '%';
    } else {
        cptStats = '0%';
    }
    return cptStats;
}

// Fonction pour mettre en valeur le badge sélectionner par le joueur
function shineBadge(btnVal) {
    btn.forEach((button) => { button.classList.remove('shining'); });
    btn[btnVal].classList.add('shining');
}

// Création d'un écouteur d'événement au clique
// pour chaque bouton du tableau btn
btn.forEach((button) => {
    if (!button.classList.contains('reset')) {
        button.addEventListener('click', () => {
            // Appel de la fonction random
            compVal = fnRandomShifumi();
            // Affichage de la valeur de l'ordinateur
            computerChoice.value = fnCompValDisplay(compVal);

            // Affectation d'une valeur en fonction du bouton cliqué
            if (button.value == 'bois') { btnVal = 0; };
            if (button.value == 'feu') { btnVal = 1; };
            if (button.value == 'terre') { btnVal = 2; };
            if (button.value == 'metal') { btnVal = 3; };
            if (button.value == 'eau') { btnVal = 4; };

            // Appel de la fonction de mise en valeur du badge choisit
            shineBadge(btnVal);

            // Comparaison avec la valeur du random computer
            // & Affichage du résultat via l'input sélectionner
            resultDisplay.value = fnCompar(btnVal, compVal);
            // btnClone.translate(100,100);


            // Affichage des valeurs cptWin, cptLose et cptStats
            // Dès qu'une partie a été joué (gagnée ou perdue)
            if (cptWin != 0 || cptLose != 0) {
                cptGroup.forEach((e) => {
                    e.classList.remove('d-none');
                })
                cptWinDisplay.innerHTML = cptWin;
                cptLoseDisplay.innerHTML = cptLose;
                cptStatsDisplay.innerHTML = calcStats();
            }
            // else{cptGroup.forEach((e)=>{
            //     cptGroup.classList.add('d-none');}
            //     )}

            currentValuesJson.cptWin = cptWin;
            currentValuesJson.cptLose = cptLose;
            currentValuesObj = JSON.stringify(currentValuesJson);
            localStorage.setItem("currentValues", currentValuesObj);

            console.log('Win : ' + currentValuesJson.cptWin + '; Lose : ' + currentValuesJson.cptLose + '; Stats : ' + calcStats());
        })
    }
    else if (button.classList.contains('reset')) {
        button.addEventListener('click', ()=>{
            // Mise à zéro des compteurs
            cptWin = 0;
            cptLose = 0;
            cptWinDisplay.innerHTML = cptWin;
            cptLoseDisplay.innerHTML = cptLose;
            cptStatsDisplay.innerHTML = calcStats();
            // Enregistrer les valeurs de win et lose dans localStorage
            currentValuesJson.cptWin = cptWin;
            currentValuesJson.cptLose = cptLose;
            currentValuesObj = JSON.stringify(currentValuesJson);
            localStorage.setItem("currentValues", currentValuesObj);
        })
    }

})


// let stringVal = '';
// if ('0' == '0') {
//     console.log('\'\' == 0 => vrai');
//     console.log(`'0' == 0 => vrai`);
//     console.log(`'0' == '' => faux`);
// }
// if ((0,1 + 0,2) === 0,3) { //Vrai
//     console.log(0,1 + 0,2); //0 1 2
//     console.log(0,3); // 0 3
//     console.log((0,1 + 0,2)); // 2
//     console.log((0,3)); // 3
//     console.log(1,2,3); // 1 2 3
//     console.log((1,2,3)); // 3
// }else {
//     console.log('ca marche pas');
// }