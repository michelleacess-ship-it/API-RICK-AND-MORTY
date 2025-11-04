const API_URL = 'https://rickandmortyapi.com/api/character';
const container = document.getElementById('characterContainer');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const loading = document.getElementById('loading');
const erro = document.getElementById('erro');

async function fetchCharacters(name = '') {
  container.innerHTML = '';
  erro.style.display = 'none';
  loading.style.display = 'block';

  try {
    const response = await fetch(`${API_URL}?name=${name}`);
    if (!response.ok) throw new Error('Erro ao buscar personagem');
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      erro.style.display = 'block';
      erro.textContent = 'Nenhum personagem encontrado.';
    } else {
      displayCharacters(data.results);
    }

  } catch (error) {
    erro.style.display = 'block';
    erro.textContent = 'Falha ao buscar dados da API.';
  } finally {
    loading.style.display = 'none';
  }
}

function displayCharacters(characters) {
  container.innerHTML = characters.map(character => `
    <div class="card">
      <img src="${character.image}" alt="${character.name}">
      <h2>${character.name}</h2>
      <div class="status">
        <span class="status-dot ${character.status}"></span>
        <span>${character.status} - ${character.species}</span>
      </div>
      <p><strong>Última localização:</strong><br>${character.location.name}</p>
    </div>
  `).join('');
}

// Buscar ao clicar no botão
searchButton.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchCharacters(query);
  } else {
    erro.style.display = 'block';
    erro.textContent = 'Digite o nome de um personagem.';
  }
});

// Carrega alguns personagens automaticamente ao abrir
fetchCharacters();
