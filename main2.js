const API_URL = " http://localhost:3000";
let container = document.querySelector('.container');
let input = document.querySelector('#search');
let form = document.querySelector('#form');
let logo = document.querySelector('#logoMenu');
let favorite = document.querySelector('#pageFavorite');
let cardContainer = document.querySelector('.card-container');
let linkInfoCard = document.querySelector('.linkInfoCard');
let sectionInfo = document.querySelector('.sectionInfo');
let vistaInmueble = document.querySelector('.vistaInmueble');


const searchCards = async (_valor) => {

    try {
        let response = await fetch(API_URL + "/inmuebles")
        let data = await response.json();

        container.innerHTML = ""

        data.forEach(elemento => {
            const {id, created, type, status, price, location, address, nameAgent, photoAgent, area, garage, baths, Beds, image } = elemento
            if (type === _valor) {
                crearTarjeta(id, created, type, status, price, location, address, nameAgent, photoAgent, area, garage, baths, Beds, image);
            } else if (status === _valor) {
                crearTarjeta(id, created, type, status, price, location, address, nameAgent, photoAgent, area, garage, baths, Beds, image);
            } else if (id === _valor) {
                crearTarjeta(id, created, type, status, price, location, address, nameAgent, photoAgent, area, garage, baths, Beds, image);
            } else if (location === _valor) {
                crearTarjeta(id, created, type, status, price, location, address, nameAgent, photoAgent, area, garage, baths, Beds, image);
            }
        })
    } catch (error) {
        console.log(error);
    }
}

const searchCardsSelect = async (_valor1, _valor2) => {

    try {
        let response = await fetch(API_URL + "/inmuebles")
        let data = await response.json();

        container.innerHTML = ""

        let flag = false
        data.forEach(elemento => {
            const {id, created, type, status, price, location, address, nameAgent, photoAgent, area, garage, baths, Beds, image } = elemento
            if (_valor1 !== undefined && _valor2 !== undefined) {
                if (type === _valor1 && status === _valor2) {
                    flag = true
                    crearTarjeta(id, created, type, status, price, location, address, nameAgent, photoAgent, area, garage, baths, Beds, image);
                }
            } else {
                if (type === _valor1) {
                    crearTarjeta(id, created, type, status, price, location, address, nameAgent, photoAgent, area, garage, baths, Beds, image);
                }
                if (status === _valor1 || status === _valor2) {
                    crearTarjeta(id, created, type, status, price, location, address, nameAgent, photoAgent, area, garage, baths, Beds, image);
                }
            }
        })
    } catch (error) {
        console.log(error);
    }
}

const selectedOption = ()=>{
    let selectType = document.getElementById('selectType');
    let selectStatus = document.getElementById('selectStatus');

    let valueType = selectType.value;
    let valueStatus = selectStatus.value;

    if (valueType !== "" && valueStatus !== "") {
        searchCardsSelect(valueType, valueStatus);
    } else if (valueType && valueType !== "") {
        searchCardsSelect(valueType);
    } else if (valueStatus && valueStatus !== ""){
        searchCardsSelect(valueStatus);
        // window.location.reload();
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let valor = input.value;
    if (valor && valor !== "") {
        searchCards(valor);
    } else {
        selectedOption()
        // window.location.reload();
    }
    form.reset();
})

const traerInmuebles = async () => {
    try {
        let response = await fetch(API_URL + "/inmuebles")
        // console.log(response);
        let data = await response.json();
        return data
    } catch (error) {
        console.log(error);
    }
}
const crearTarjeta = (id, created, type, status, price, location, address, nameAgent, photoAgent, area, garage, baths, Beds, image) => {
    container.innerHTML += `
    <a href="././pages/inmueble_${id}.html" class="card-container linkInfoCard">
    <div id="${id}" class="card-container">
        <div class="img-inmueble">
            <img src="${image}" 
            alt="" 
            class="img-inmueble" />
            <div class="card-type-status">
                <div class="type-inmueble">
                ${type}
                </div>
                <div class="status-inmueble">
                FOR ${status}
                </div>
            </div>
            <div class="price-inmueble">
            ${price}
            </div>
        </div>
        <div class="card-info">
            <div class="cardInfoLocation">
            ${location}
            </div>
            <div class="cardTitle">
                <h1>${address}"</h1>
            </div>
            <div class="img-inmueble">
                <img src=${photoAgent} 
                alt="" class="photoAgent" />
                <p class="nameAgente">${nameAgent}</p>
                <p class="cardCreated">${created}</p>
            </div>
            <footer class="footerCard">
                <div class="divArea">
                    <img src=${"./img/AreaIcon.png"} 
                    alt="" class="iconCard">
                    <p class="cardTextInfo" id="C_Area">${area}</p>
                </div>
                <div class="divinfoInm">
                    <div class="footerGarage">
                        <img src=${"./img/GarageIcon.png"} 
                        alt="" 
                        class="iconCard">
                        <p class="cardTextInfo" id="C_Garage">${garage}</p>
                    </div>
                    <div class="footerBaths">
                        <img src=${"./img/BathroomIcon.png"} 
                        alt="" 
                        class="iconCard">
                        <p class="cardTextInfo" id="C_baths">${baths}</p>
                    </div>
                    <div class="footerRoom">
                        <img src=${"./img/BedroomIcon.png"} 
                        alt="" class="iconCard">
                        <p class="cardTextInfo" id="C_room">${Beds}</p>
                    </div>
                </div>
            </footer>
        </div>
    </div>
    </a>
        `
}
const showInmuebles = async () => {
    let inmuebles = await traerInmuebles();

    container.innerHTML = ""

    inmuebles.forEach(element => {
        const {id, created, type, status, price, location, address, nameAgent, photoAgent, area, garage, baths, Beds, image } = element
        crearTarjeta(id, created, type, status, price, location, address, nameAgent, photoAgent, area, garage, baths, Beds, image);
    });
}
showInmuebles()

function home() {
    location.href="./index.html"
}

logo.addEventListener('click', () => {
    showInmuebles()
})


favorite.addEventListener('click', () => {
    showInmuebles()
})


image.addEventListener('click', () => {
    infoTotalInmueble()
})


function infoTotalInmueble(param) {
    vistaInmueble.innerHTML += `
    <img class="imgInmueble1" src="../img/1.jpg" alt="">
    <div class="infoInmueble">
        <h1 class="infoInmueble1Address">272 S Rexford Dr, Beverly Hills, CA90212, USA</h1>
        <li class="ListInfoInmueble">Created: May. 13, 2022</li>
        <li class="ListInfoInmueble">Type: APARTAMENT</li>
        <li class="ListInfoInmueble">Status: RENT</li>
        <li class="ListInfoInmueble">Price: 320000000</li>
        <li class="ListInfoInmueble">Location: Beverly Hills, CA</li>
        <li class="ListInfoInmueble">Name Agent: Hellen Mattis</li>
        <li class="ListInfoInmueble">Area: 3400 Sq Ft</li>
        <li class="ListInfoInmueble">Garage: 2</li>
        <li class="ListInfoInmueble">Baths: 8</li>
        <li class="ListInfoInmueble">Rooms: 10</li>
    </div>
     `
}
