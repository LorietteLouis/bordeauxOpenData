const btn = document.querySelector('button');
const errorMsg = document.querySelector('.errorMsg');
const places = document.querySelectorAll('.place')
const placeNames = document.querySelectorAll('.place-name')
const infos = document.querySelectorAll('.place-infos')
const visitors = document.querySelectorAll('.visitors')

const dataset = 'bor_frequentation_piscine_tr'

btn.addEventListener('click', onBtnClick)

async function fetchData() {
    try {
        const response = await fetch(`https://opendata.bordeaux-metropole.fr/api/records/1.0/search/?dataset=${dataset}`)

        if (!response.ok) {
            throw new Error(`Erreur: ${response.status}`)
        }

        const data = await response.json()
        // console.log(data)
        btnChange('reset')
        displayData(data);
    }
    catch (error) {
        btnChange('reset')
        errorMsg.textContent = `${error}`
    }
}


function btnChange (stateBtn){
    if (stateBtn == 'fetching'){
        btn.textContent='---'
        btn.classList.add('searching')
        
    }else if (stateBtn === 'reset'){
        btn.textContent='Refresh'
        btn.classList.remove('searching')
    }
}

function onBtnClick() {

    btnChange('fetching')
    fetchData()
}


// function displayData (data){
//     data.records.sort((x, y) => {
//         //Permet de trier les noms suivant le nombres de places restante en valeurs croissante
//         let result =  ((y.fields.fmicourante / y.fields.fmizonmax)-(x.fields.fmicourante / x.fields.fmizonmax))
//         return result
//     })
//     data.records.forEach((record, index) => {
//         let current = 0;
//         if (record.fields.fmicourante > 0) current = record.fields.fmicourante;

//         const currentPlace = places[index];
//         //Permet de donner les noms des piscines
//         const name = currentPlace.childNodes[1];
//         name.textContent = `${record.fields.etablissement_etalib} (${record.fields.fmizonlib}) : `
//         //Permet de donner le nombres de place restante en temps réelle dans les piscine.
//         const info = currentPlace.childNodes[3];
//         info.textContent = `${current} / ${record.fields.fmizonmax}`
//         record.fields.datemiseajour

//         let ratio = (current / record.fields.fmizonmax);

//         visitors[index].style.transform = `scaleX(${ratio})`
//     })
// }

function displayData (data){
    data.records.sort((x, y) => {
                let result =  ((y.fields.fmicourante / y.fields.fmizonmax)-(x.fields.fmicourante / x.fields.fmizonmax))
                 return result
    })

    data.records.forEach((record,index)=> {
        let current = 0
        if (record.fields.fmicourante > 0) current = record.fields.fmicourante

        placeNames[index].textContent = `${record.fields.etablissement_etalib} (${record.fields.fmizonlib}) : `
        infos[index].textContent = `${current} / ${record.fields.fmizonmax}`
        record.fields.datemiseajour
        let ratio = (current / record.fields.fmizonmax);

        visitors[index].style.transform = `scaleX(${ratio})`
    })
}


