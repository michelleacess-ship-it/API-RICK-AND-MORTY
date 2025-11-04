const API_URL = 'https://rickandmortyapi.com/api/character';
const container = document.getElementById('characterContainer');
const searchInput = document.getElementById('searchInput');

// Função para buscar personagens
async function fetchCharacters(name = '') {
  try {
    const response = await fetch(`${API_URL}?name=${name}`);
    if (!response.ok) throw new Error('Personagem não encontrado');
    const data = await response.json();
    displayCharacters(data.results);
  } catch (error) {
    container.innerHTML = `<p style="text-align:center;">Nenhum personagem encontrado.</p>`;
  }
}

// Função para exibir personagens
function displayCharacters(characters) {
  container.innerHTML = characters
    .map(character => `
      <div class="card">
        <img src="${character.image}" alt="${character.name}">
        <div class="card-content">
          <h2>${character.name}</h2>
          <div class="status">
            <span class="status-dot ${character.status}"></span>
            <span>${character.status} - ${character.species}</span>
          </div>
        </div>
      </div>
    `)
    .join('');
}

// Evento de busca
searchInput.addEventListener('input', e => {
  const query = e.target.value.trim();
  fetchCharacters(query);
});

// Carrega os personagens iniciais
fetchCharacters();
