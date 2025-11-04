const API_URL = 'https://rickandmortyapi.com/api/character';
const container = document.getElementById('characterContainer');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const loading = document.getElementById('loading');
const erro = document.getElementById('erro');

// Função para buscar personagens
async function fetchCharacters(name = '') {
  container.innerHTML = '';
  erro.style.display = 'none';
  loading.style.display = 'block';

  try {
    const response = await fetch(`${API_URL}?name=${name}`);
    if (!response.ok) throw new Error('Personagem não encontrado');
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      throw new Error('Nenhum personagem encontrado');
    }

    displayCharacters(data.results);
  } catch (error) {
    erro.style.display = 'block';
    erro.textContent = 'Nenhum personagem encontrado. Tente outro nome.';
  } finally {
    loading.style.display = 'none';
  }
}


function displayCharacters(characters) {
  container.innerHTML = characters
    .map(
      (character) => `
      <div class="card">
        <img src="${character.image}" alt="${character.name}">
        <div class="card-content">
          <h2>${character.name}</h2>
          <div class="status">
            <span class="status-dot ${character.status.replace(' ', '')}"></span>
            <span><strong>${character.status}</strong> - ${character.species}</span>
          </div>
          <p class="location"><strong>Última localização conhecida:</strong><br>${character.location.name}</p>
          <p class="episode"><strong>Primeira aparição:</strong><br>${character.origin.name}</p>
        </div>
      </div>
    `
    )
    .join('');
}


searchButton.addEventListener('click', () => {
  const query = searchInput.value.trim();

  if (query === '') {
    erro.style.display = 'block';
    erro.textContent = 'Por favor, digite o nome de um personagem.';
    return;
  }

  fetchCharacters(query);
});

// Permitir Enter no campo de busca
searchInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    searchButton.click();
  }
});


fetchCharacters();
