'use strict'
console.log('app start');

const cards = document.querySelector('#cards')

let characters = []

function generateRandomNumbers(min, max, count) {
    let randomNumbers = [];
    for (let i = 0; i < count; i++) {
        let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        randomNumbers.push(randomNumber);
    }
    return randomNumbers;
}



async function fetchCharacters() {
    const randomNumbers = generateRandomNumbers(0, 800, 6)
    const responce = await fetch(`https://rickandmortyapi.com/api/character/${randomNumbers}`);
    console.log({ responce });
    const data = await responce.json();
    characters = data
    showCharacters()
}

fetchCharacters()


function showCharacters() {
    characters.forEach(async (character) => {
        const episodeName = await FetchEpisodeName(character.episode[0])
        character.episodeName = episodeName
        generateMarkup(character)
    })
}

async function FetchEpisodeName(link) {
    const responce = await fetch(link);
    const data = await responce.json();
    return data.name
}



function generateMarkup(char) {
    console.log(char);

    const markup = `
    <div class="imginfo">
            <img src="${char.image}" alt="Undefined" class="image1">
            <div class="info34">
                <h2 class="stat">${char.name}</h2>
                <span class="status"><span class="status__icon"></span>&#128308 Dead - Alien</span>
                <br>
                <br>
                <span class="text-gray">Last known location:</span>
                <br>
                <a href="https://rickandmortyapi.com/api/location/120" rel="noopener noreferrer" target="_blank" class="loc1">${char.location.name}</a>
                <br>
                <br>
                <span class="text-gray">First seen in:</span>
                <br>
                <a href="https://rickandmortyapi.com/api/episode/49" rel="noopener noreferrer" target="_blank" class="loc1">${char.episodeName}</a>
            </div>
        </div>
    `

    cards.insertAdjacentHTML('beforeend', markup)
}
