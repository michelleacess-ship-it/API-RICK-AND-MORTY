const API_URL = 'https://rickandmortyapi.com/api/character';
const cardsContainer = document.getElementById('cards');
const inputBusca = document.getElementById('busca');
const loading = document.getElementById('loading');
const erroMsg = document.getElementById('erro');
let personagens = [];

async function carregarPersonagens() {
  try {
    loading.style.display = 'flex';
    erroMsg.style.display = 'none';
    cardsContainer.innerHTML = '';

    const resposta = await fetch(API_URL);
    const dados = await resposta.json();
    personagens = dados.results || [];

    exibirPersonagens(personagens);
  } catch (erro) {
    mostrarErro('Erro ao carregar os personagens da API.');
  } finally {
    loading.style.display = 'none';
  }
}

function exibirPersonagens(lista) {
  cardsContainer.innerHTML = '';

  if (lista.length === 0) {
    mostrarErro('Nenhum personagem encontrado.');
    return;
  }

  lista.forEach(personagem => {
    const card = document.createElement('div');
    card.classList.add('card');

    const imagem = document.createElement('img');
    imagem.src = personagem.image;
    imagem.alt = personagem.name;

    const info = document.createElement('div');
    info.classList.add('card-info');

    const nome = document.createElement('h2');
    nome.textContent = personagem.name;

    const status = document.createElement('p');
    status.textContent = `${personagem.status} - ${personagem.species}`;

    info.appendChild(nome);
    info.appendChild(status);
    card.appendChild(imagem);
    card.appendChild(info);
    cardsContainer.appendChild(card);
  });
}

function mostrarErro(msg) {
  erroMsg.innerHTML = `${msg}<br><button class="retry-btn" onclick="carregarPersonagens()">Tentar novamente</button>`;
  erroMsg.style.display = 'block';
}

// Função global para buscar por nome via console
function buscarPorNome(nome) {
  const filtrados = personagens.filter(p => p.name.toLowerCase().includes(nome.toLowerCase()));
  exibirPersonagens(filtrados);
  return filtrados;
}

inputBusca.addEventListener('input', () => {
  buscarPorNome(inputBusca.value);
});

carregarPersonagens();
