const container = $('.pokemons-container')
const cards = $('.card');
let id = 1;

function fetchCard() {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => response.json())
        .then(responseJSON => {
            createCard(responseJSON)
        })
}

function createCard(responseJSON)
{
    let name = responseJSON.name;
    let div = document.createElement('div');
    div.className = 'card'
    div.id = responseJSON.name
    div.style.backgroundImage = `url(${responseJSON.sprites.other.dream_world.front_default})`
    div.style.color = 'rgba(71, 121, 94, .9)'


    const title = document.createElement('h3');
    title.nodeValue = name

    container.append(div)
    div.appendChild(title)


}

fetchCard() 