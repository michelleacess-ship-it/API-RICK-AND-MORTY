const API_URL = 'https://rickandmortyapi.com/api/character';
const container = document.getElementById('characterContainer');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const loading = document.getElementById('loading');
const erro = document.getElementById('erro');

// Buscar personagens
async function fetchCharacters(name = '') {
  container.innerHTML = '';
  erro.style.display = 'none';
  loading.style.display = 'block';

  try {
    const response = await fetch(`${API_URL}?name=${name}`);
    if (!response.ok) throw new Error('Personagem não encontrado');
    const data = await response.json();
    if (data.results.length === 0) throw new Error('Nenhum personagem encontrado');
    displayCharacters(data.results);
  } catch (error) {
    erro.style.display = 'block';
    erro.textContent = 'Nenhum personagem encontrado.';
  } finally {
    loading.style.display = 'none';
  }
}

// Exibir personagens
function displayCharacters(characters) {
  container.innerHTML = characters
    .map(
      (character) => `
      <div class="card">
        <img src="${character.image}" alt="${character.name}">
        <div class="card-content">
          <h2>${character.name}</h2>
          <div class="status">
            <span class="status-dot ${character.status}"></span>
            <span><strong>${character.status}</strong> - ${character.species}</span>
          </div>
          <p class="location"><strong>Last known location:</strong><br>${character.location.name}</p>
          <p class="episode"><strong>First seen in:</strong><br>${character.origin.name}</p>
        </div>
      </div>
    `
    )
    .join('');
}

// Evento do botão
searchButton.addEventListener('click', () => {
  const query = searchInput.value.trim();
  fetchCharacters(query);
});

// Carregar personagens iniciais
fetchCharacters();
