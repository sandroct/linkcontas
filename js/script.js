/* =====================================
   LINKCONTAS — Script
   ===================================== */

const empresas = [
  // Energia elétrica
  {
    id: 'enel',
    nome: 'Enel Distribuição',
    categoria: 'energia',
    url: 'https://www.enel.com.br/content/enel-br/pt-saopaulo/login.html',
    urlPagamento: 'https://www.enel.com.br/content/enel-br/pt-saopaulo/login.html',
    icone: '⚡',
    descricao: 'Conta de luz — São Paulo (link pode variar por estado)'
  },
  {
    id: 'light',
    nome: 'Light',
    categoria: 'energia',
    url: 'https://agenciavirtual.light.com.br/portal/',
    urlPagamento: 'https://agenciavirtual.light.com.br/portal/',
    icone: '⚡',
    descricao: 'Conta de luz — Rio de Janeiro'
  },
  {
    id: 'cemig',
    nome: 'CEMIG',
    categoria: 'energia',
    url: 'https://atende.cemig.com.br/Login',
    urlPagamento: 'https://atende.cemig.com.br/Login',
    icone: '⚡',
    descricao: 'Conta de luz — Minas Gerais'
  },
  {
    id: 'cpfl',
    nome: 'CPFL Energia',
    categoria: 'energia',
    url: 'https://cpflb2cprd.b2clogin.com/cpflb2cprd.onmicrosoft.com/b2c_1a_signup_signin_mfa_front/oauth2/v2.0/authorize?p=B2C_1A_SIGNUP_SIGNIN_MFA_FRONT&client_id=17d5831d-6741-4670-8085-d1d34e37aec1&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fwww.cpfl.com.br%2Fb2c-auth%2Freceive-token&scope=17d5831d-6741-4670-8085-d1d34e37aec1%20offline_access&response_type=code&prompt=login&response_mode=query',
    urlPagamento: 'https://cpflb2cprd.b2clogin.com/cpflb2cprd.onmicrosoft.com/b2c_1a_signup_signin_mfa_front/oauth2/v2.0/authorize?p=B2C_1A_SIGNUP_SIGNIN_MFA_FRONT&client_id=17d5831d-6741-4670-8085-d1d34e37aec1&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fwww.cpfl.com.br%2Fb2c-auth%2Freceive-token&scope=17d5831d-6741-4670-8085-d1d34e37aec1%20offline_access&response_type=code&prompt=login&response_mode=query',
    icone: '⚡',
    descricao: 'Conta de luz — São Paulo e outras regiões'
  },
  {
    id: 'edp',
    nome: 'EDP',
    categoria: 'energia',
    url: 'https://www.edponline.com.br',
    urlPagamento: 'https://www.edponline.com.br',
    icone: '⚡',
    descricao: 'Conta de luz — Espírito Santo e São Paulo'
  },
  {
    id: 'cee',
    nome: 'CEEE',
    categoria: 'energia',
    url: 'https://www.ceee.com.br',
    urlPagamento: 'https://www.ceee.com.br',
    icone: '⚡',
    descricao: 'Conta de luz — Rio Grande do Sul'
  },

  // Telefone / Celular
  {
    id: 'claro',
    nome: 'Claro',
    categoria: 'telefone',
    url: 'https://minhaclaro.claro.com.br/acesso-rapido/',
    urlPagamento: 'https://minhaclaro.claro.com.br/acesso-rapido/',
    icone: '📱',
    descricao: 'Telefone fixo, móvel e internet'
  },
  {
    id: 'vivo',
    nome: 'Vivo',
    categoria: 'telefone',
    url: 'https://app.vivo.com.br/web',
    urlPagamento: 'https://app.vivo.com.br/web',
    icone: '📱',
    descricao: 'Telefone, internet e TV'
  },
  {
    id: 'tim',
    nome: 'TIM',
    categoria: 'telefone',
    url: 'https://www.tim.com.br/meu-tim',
    urlPagamento: 'https://www.tim.com.br/meu-tim',
    icone: '📱',
    descricao: 'Telefone móvel e internet'
  },
  {
    id: 'oi',
    nome: 'Oi',
    categoria: 'telefone',
    url: 'https://www.oi.com.br',
    urlPagamento: 'https://www.oi.com.br',
    icone: '📱',
    descricao: 'Telefone fixo, móvel e internet'
  },

  // Água e esgoto
  {
    id: 'sabesp',
    nome: 'Sabesp',
    categoria: 'agua',
    url: 'https://www.sabesp.com.br/agenciavirtual',
    urlPagamento: 'https://www.sabesp.com.br/agenciavirtual',
    icone: '💧',
    descricao: 'Conta de água — São Paulo'
  },
  {
    id: 'copasa',
    nome: 'Copasa',
    categoria: 'agua',
    url: 'https://www.copasa.com.br',
    urlPagamento: 'https://www.copasa.com.br',
    icone: '💧',
    descricao: 'Conta de água — Minas Gerais'
  },
  {
    id: 'cedae',
    nome: 'CEDAE',
    categoria: 'agua',
    url: 'https://www.cedae.com.br',
    urlPagamento: 'https://www.cedae.com.br',
    icone: '💧',
    descricao: 'Conta de água — Rio de Janeiro'
  },
  {
    id: 'sanepar',
    nome: 'Sanepar',
    categoria: 'agua',
    url: 'https://www.sanepar.com.br',
    urlPagamento: 'https://www.sanepar.com.br',
    icone: '💧',
    descricao: 'Conta de água — Paraná'
  },

  // Internet / TV
  {
    id: 'sky',
    nome: 'SKY',
    categoria: 'internet',
    url: 'https://www.sky.com.br',
    urlPagamento: 'https://www.sky.com.br',
    icone: '📺',
    descricao: 'TV por assinatura e internet'
  },
  {
    id: 'algar',
    nome: 'Algar Telecom',
    categoria: 'internet',
    url: 'https://www.algartelecom.com.br',
    urlPagamento: 'https://www.algartelecom.com.br',
    icone: '📺',
    descricao: 'Internet, telefone e TV'
  }
];

const categorias = [
  { chave: 'todos', label: 'Todas' },
  { chave: 'energia', label: 'Energia Elétrica', icone: '⚡' },
  { chave: 'telefone', label: 'Telefone / Celular', icone: '📱' },
  { chave: 'agua', label: 'Água / Esgoto', icone: '💧' },
  { chave: 'internet', label: 'Internet / TV', icone: '📺' }
];

// Elementos DOM
const grid = document.getElementById('grid-empresas');
const busca = document.getElementById('busca');
const categoriaLista = document.getElementById('categorias');
const tituloLista = document.getElementById('titulo-lista');
const contagem = document.getElementById('contagem');
const temaToggle = document.getElementById('tema-toggle');
const iconeTema = document.querySelector('.icone-tema');

let categoriaAtiva = 'todos';
let termoBusca = '';

// ========== TEMA CLARO / ESCURO ==========

function carregarTema() {
  const temaSalvo = localStorage.getItem('linkcontas-tema');
  const temaSistema = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'escuro'
    : 'claro';
  const tema = temaSalvo || temaSistema;
  aplicarTema(tema);
}

function aplicarTema(tema) {
  const html = document.documentElement;

  if (tema === 'escuro') {
    html.setAttribute('data-tema', 'escuro');
    iconeTema.textContent = '☀️';
    localStorage.setItem('linkcontas-tema', 'escuro');
  } else {
    html.removeAttribute('data-tema');
    iconeTema.textContent = '🌙';
    localStorage.setItem('linkcontas-tema', 'claro');
  }
}

function alternarTema() {
  const html = document.documentElement;
  const estaEscuro = html.hasAttribute('data-tema');
  aplicarTema(estaEscuro ? 'claro' : 'escuro');
}

// ========== RENDERIZAÇÃO ==========

function renderCategorias() {
  categoriaLista.innerHTML = categorias.map(cat => {
    const ativo = categoriaAtiva === cat.chave ? 'ativo' : '';
    return `
      <button class="chip-categoria ${ativo}" data-categoria="${cat.chave}">
        ${cat.icone || ''} ${cat.label}
      </button>
    `;
  }).join('');

  categoriaLista.querySelectorAll('.chip-categoria').forEach(btn => {
    btn.addEventListener('click', () => {
      categoriaAtiva = btn.dataset.categoria;
      renderCategorias();
      renderEmpresas();
    });
  });
}

function renderEmpresas() {
  const filtradas = empresas.filter(emp => {
    const matchCategoria = categoriaAtiva === 'todos' || emp.categoria === categoriaAtiva;
    const matchBusca = emp.nome.toLowerCase().includes(termoBusca) ||
                       emp.descricao.toLowerCase().includes(termoBusca);
    return matchCategoria && matchBusca;
  });

  contagem.textContent = `${filtradas.length} empresa${filtradas.length !== 1 ? 's' : ''}`;
  tituloLista.textContent = termoBusca ? `Resultados para "${termoBusca}"` : 'Empresas';

  if (filtradas.length === 0) {
    grid.innerHTML = `
      <div class="estado-vazio" style="grid-column: 1 / -1;">
        <h3>Nenhuma empresa encontrada</h3>
        <p>Tente outro nome ou categoria.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtradas.map(emp => {
    const link = emp.urlPagamento || emp.url;

    return `
      <a href="${link}" target="_blank" rel="noopener noreferrer" class="card-empresa">
        <div class="card-header">
          <div class="logo-empresa">${emp.icone}</div>
          <div class="empresa-info">
            <h3>${emp.nome}</h3>
            <p>${emp.descricao}</p>
          </div>
        </div>
        <div class="categoria-tag">${emp.categoria === 'energia' ? 'Energia' : emp.categoria === 'telefone' ? 'Telefone' : emp.categoria === 'agua' ? 'Água' : 'Internet'}</div>
        <div class="card-footer">
          <span class="categoria-chip-rodape">${emp.categoria}</span>
          <span class="btn-acessar">Pagar conta ↗</span>
        </div>
      </a>
    `;
  }).join('');
}

// ========== EVENTOS ==========

busca.addEventListener('input', (e) => {
  termoBusca = e.target.value.toLowerCase().trim();
  renderEmpresas();
});

temaToggle.addEventListener('click', alternarTema);

// ========== INICIALIZAÇÃO ==========

carregarTema();
renderCategorias();
renderEmpresas();
