/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
const container = document.querySelector(".pokemons-container");
const body = document.querySelector("body");
const nextPage = $("#next");
const previousPage = $("#previous");
const searchInput = $("#search-input");
const searchBtn = $("#search-btn");
const pager = document.querySelector(".pager");
let offset = 1;
const limit = 23;

const typeColors = {
  electric: "#FFEA70",
  normal: "#B09398",
  fire: "#FF675C",
  water: "#0596C7",
  ice: "#AFEAFD",
  rock: "#999799",
  flying: "#7AE7C7",
  grass: "#4A9681",
  psychic: "#FFC6D9",
  ghost: "#561D25",
  bug: "#A2FAA3",
  poison: "#795663",
  ground: "#D2B074",
  dragon: "#DA627D",
  steel: "#1D8A99",
  fighting: "#2F2F2F",
  default: "#2A1A1F",
};

previousPage.on("click", () => {
  if (offset != 1) {
    offset -= 24;
    removeCards(container);
    fetchPokemons(offset, limit);
  }
});

nextPage.on("click", () => {
  offset += 24;
  removeCards(container);
  fetchPokemons(offset, limit);
});

searchBtn.on("click", () => {
  fetch(
    `https://pokeapi.co/api/v2/pokemon/${searchInput.val().toLocaleLowerCase()}`
  )
    .then((response) => {
      if (response.status === 404 || searchInput.val() === "") {
        alert("This pokemon is not available");
      } else {
        return response.json();
      }
    })
    .then((responseJSON) => {
      if (responseJSON != null) {
        searchPokemon(responseJSON);
        console.log(responseJSON);
      }
    })
    .catch((error) => console.error("Fallo", error));
});

function fetchPokemon(id) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((response) => response.json())
    .then((responseJSON) => {
      createCard(responseJSON);
    })
    .catch((error) => console.error("Fallo", error));
}

function fetchPokemons(offset, limit) {
  for (let i = offset; i <= offset + limit; i++) {
    setTimeout(() => {
      fetchPokemon(i);
    }, 500);
  }
}

function createCard(responseJSON) {
  const { name } = responseJSON;
  const div = document.createElement("div");
  const overlay = document.createElement("div");
  const title = document.createElement("h3");
  const numberId = document.createElement("h5");
  if (responseJSON.id >= 10) {
    numberId.textContent = `#0${responseJSON.id}`;
  } else {
    numberId.textContent = `#00${responseJSON.id}`;
  }
  if (responseJSON.id >= 100) {
    numberId.textContent = `#${responseJSON.id}`;
  }

  title.textContent = name;
  title.id = "pokemon-name";
  overlay.className = "overlay";
  overlay.id = responseJSON.name;
  const img = document.createElement("img");
  img.className = "pokemon";
  div.className = "card";

  div.id = responseJSON.name;
  img.src = `${responseJSON.sprites.front_default}`;

  container.append(div);
  div.append(img);
  div.append(overlay);
  overlay.append(title);
  overlay.append(numberId);

  div.addEventListener("click", selectCard);
}

function removeCards(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function searchPokemon(responseJSON) {
  // Encuentra estas variables en el response y las almacena en el const
  const { abilities, types, height, weight, stats } = responseJSON;
  console.log(types[0].type.name);
  container.classList.add("oculto");
  $(".github").addClass("oculto");
  pager.className = "oculto";
  // card
  const div = document.createElement("div");
  const card = document.createElement("div");
  const title = document.createElement("h3");
  const hr = document.createElement("hr");
  const typeName = document.createElement("label");
  const abilityTitle = document.createElement("label");
  const closeCard = document.createElement("button");
  closeCard.textContent = "X";
  closeCard.className = "close-card";
  closeCard.type = "click";

  abilityTitle.textContent = "Abilities:";
  abilityTitle.style.marginRight = "30px";
  abilityTitle.className = "search-title";

  typeName.textContent = "Type:";
  typeName.className = "search-title";

  title.className = "name-searched";
  const img = document.createElement("img");
  card.className = "new-card";
  img.id = "searched-img";
  div.className = "new";
  title.textContent = responseJSON.name;
  div.id = responseJSON.name;
  img.src = `${responseJSON.sprites.other.dream_world.front_default}`;

  body.append(div);
  div.append(card);
  card.append(closeCard);
  card.append(img);
  card.append(title);
  card.append(hr);
  card.append(typeName);

  // type:
  const typeBtn = document.createElement("button");
  types.forEach((type) => {
    typeBtn.className = "btn btn-light type";
    typeBtn.textContent = type.type.name;
    card.append(typeBtn);
  });

  // abilities:
  card.append(abilityTitle);
  const divAbilities = document.createElement("div");
  divAbilities.className = "div-abilities";
  card.append(divAbilities);
  divAbilities.append(abilityTitle);

  abilities.forEach((ab) => {
    const label = document.createElement("label");
    label.textContent = ` ${ab.ability.name}`;
    label.className = "pokemon-abl";
    const ul = document.createElement("ul");
    const li = document.createElement("li");
    ul.append(li);
    li.append(label);
    divAbilities.append(li);
  });
  // characteristics:
  const characteristics = document.createElement("label");
  characteristics.textContent = "Physical characteristics: ";
  characteristics.className = "search-title";
  characteristics.style.marginLeft = "70px";
  divAbilities.append(characteristics);
  const labelHeight = document.createElement("label");
  const labelWeight = document.createElement("label");
  labelHeight.className = "pokemon-abl";
  labelWeight.className = "pokemon-abl";
  labelHeight.textContent = `Height:${height}, `;
  labelWeight.textContent = ` Weight:${weight}`;
  card.append(labelHeight);
  card.append(labelWeight);
  const breakElement = document.createElement("br");
  card.append(breakElement);

  // stats:
  console.log(responseJSON.stats);
  const labelStats = document.createElement("label");
  labelStats.textContent = "Stats:";
  labelStats.className = "search-title";
  card.append(labelStats);

  stats.forEach((stat) => {
    // hp
    const divProgress = document.createElement("div");
    divProgress.className = "progress bar";
    const divBar = document.createElement("div");
    const nameStat = document.createElement("label");
    nameStat.textContent = `${stat.stat.name}`;
    nameStat.className = "name-stat";
    divBar.className =
      "progress-bar progress-bar-striped progress-bar-animated";
    divBar.role = "progressbar";
    divBar.ariaValueNow = stat.base_stat;
    divBar.ariaValueMin = "0";
    divBar.ariaValueMax = "200";
    divBar.style.width = `${stat.base_stat / 2}%`;
    divBar.textContent = stat.base_stat;
    card.append(divProgress);
    divProgress.append(divBar);
    divProgress.append(nameStat);
  });

  closeCard.addEventListener("click", () => {
    container.classList.remove("oculto");
    $(".github").removeClass("oculto");
    div.classList.add("oculto");
    card.classList.add("oculto");
    pager.className = "row";
    searchInput.val("");
  });

  function cardColor(card) {
    const keys = Object.keys(typeColors);
    console.log(types);
    for (let i = 0; i < keys.length; i++) {
      if (types[0].type.name === keys[i]) {
        console.log(keys[i]);
        card.style.background = typeColors[types[0].type.name];
      }
    }
  }
  cardColor(card);
}

function selectCard(e) {
  const $card = e.target;
  console.log($card);
  fetch(`https://pokeapi.co/api/v2/pokemon/${$card.id}`)
    .then((response) => response.json())
    .then((responseJSON) => {
      searchPokemon(responseJSON);
    });
}

fetchPokemons(offset, limit);
