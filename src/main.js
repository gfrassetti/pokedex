const container = document.querySelector('.pokemons-container')
const cards = $('.card');
const nextPage = $('#next');
const previousPage = $('#previous');
const searchInput = $('#search-input');
const searchBtn = $('#search-btn');
let offset = 1;
let limit = 23;

previousPage.on('click', () => {
    if (offset != 1)
    {
        offset -= 24;
        removeCards(container);
        fetchPokemons(offset, limit);
    }
})

nextPage.on('click', () => {
    offset += 24;
    removeCards(container);
    fetchPokemons(offset, limit);
})

searchBtn.on('click', () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${searchInput.val()}`)
        .then(response => response.json())
        .then(responseJSON => {
        searchPokemon(responseJSON);           
        })
        .catch(error => console.error("Fallo", error))
})

function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => response.json())
        .then(responseJSON => {
            createCard(responseJSON)
        })
        .catch(error => console.error("Fallo", error))
}

function fetchPokemons(offset, limit){
    for (let i = offset; i <= offset + limit; i++)
    {
        fetchPokemon(i);
    }
}

function createCard(responseJSON)
{
    let name = responseJSON.name;
    const div = document.createElement('div');
    const overlay = document.createElement('div');
    const title = document.createElement('h3');
    const numberId = document.createElement('h5');
    if (responseJSON.id >= 10)
    {
        numberId.textContent = '#0' + responseJSON.id
    }
    else {
        numberId.textContent = '#00' + responseJSON.id
    }
    if (responseJSON.id >= 100)
    {
        numberId.textContent = '#' + responseJSON.id
    }


    title.textContent = name
    title.id = 'pokemon-name'
    overlay.className = 'overlay'
    const img = document.createElement('img');
    img.className = 'pokemon'
    div.className = 'card'

    div.id = responseJSON.name
    img.src = `${responseJSON.sprites.other.dream_world.front_default}`

    container.append(div)
    div.append(img)
    div.append(overlay)
    overlay.append(title)
    overlay.append(numberId)

}

function removeCards(parent)
{
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

fetchPokemons(offset, limit)
