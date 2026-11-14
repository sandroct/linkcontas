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
    logo: 'assets/logos/enel.png',
    pagina: 'enel-sp.html',
    cor: '#E2001A',
    sigla: 'EN',
    icone: '⚡',
    descricao: 'Conta de luz — São Paulo (link pode variar por estado)'
  },
  {
    id: 'light',
    nome: 'Light',
    categoria: 'energia',
    url: 'https://agenciavirtual.light.com.br/portal/',
    urlPagamento: 'https://agenciavirtual.light.com.br/portal/',
    logo: 'assets/logos/light.png',
    pagina: 'light.html',
    página: 'light.html',
    cor: '#F58220',
    sigla: 'LI',
    icone: '⚡',
    descricao: 'Conta de luz — Rio de Janeiro'
  },
  {
    id: 'cemig',
    nome: 'CEMIG',
    categoria: 'energia',
    url: 'https://atende.cemig.com.br/Login',
    urlPagamento: 'https://atende.cemig.com.br/Login',
    logo: 'assets/logos/cemig.png',
    pagina: 'cemig.html',
    página: 'cemig.html',
    cor: '#003A70',
    sigla: 'CM',
    icone: '⚡',
    descricao: 'Conta de luz — Minas Gerais'
  },
  {
    id: 'cpfl',
    nome: 'CPFL Energia',
    categoria: 'energia',
    url: 'https://cpflb2cprd.b2clogin.com/cpflb2cprd.onmicrosoft.com/b2c_1a_signup_signin_mfa_front/oauth2/v2.0/authorize?p=B2C_1A_SIGNUP_SIGNIN_MFA_FRONT&client_id=17d5831d-6741-4670-8085-d1d34e37aec1&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fwww.cpfl.com.br%2Fb2c-auth%2Freceive-token&scope=17d5831d-6741-4670-8085-d1d34e37aec1%20offline_access&response_type=code&prompt=login&response_mode=query',
    urlPagamento: 'https://cpflb2cprd.b2clogin.com/cpflb2cprd.onmicrosoft.com/b2c_1a_signup_signin_mfa_front/oauth2/v2.0/authorize?p=B2C_1A_SIGNUP_SIGNIN_MFA_FRONT&client_id=17d5831d-6741-4670-8085-d1d34e37aec1&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fwww.cpfl.com.br%2Fb2c-auth%2Freceive-token&scope=17d5831d-6741-4670-8085-d1d34e37aec1%20offline_access&response_type=code&prompt=login&response_mode=query',
    logo: 'assets/logos/cpfl.png',
    pagina: 'cpfl.html',
    pagina: 'cpfl.html',
    pagina: 'cpfl.html',
    pagina: 'cpfl.html',
    página: 'cpfl.html',
    cor: '#0033A0',
    sigla: 'CP',
    icone: '⚡',
    descricao: 'Conta de luz — São Paulo e outras regiões'
  },
  {
    id: 'edp',
    nome: 'EDP',
    categoria: 'energia',
    url: 'https://www.edponline.com.br/para-sua-casa/login',
    urlPagamento: 'https://www.edponline.com.br/para-sua-casa/login',
    logo: 'assets/logos/edp.png',
    pagina: 'edp.html',
    página: 'edp.html',
    cor: '#E30613',
    sigla: 'ED',
    icone: '⚡',
    descricao: 'Conta de luz — Espírito Santo e São Paulo'
  },
  {
    id: 'ceee',
    nome: 'CEEE',
    categoria: 'energia',
    url: 'https://ceee.equatorialenergia.com.br/#!',
    urlPagamento: 'https://ceee.equatorialenergia.com.br/#!',
    logo: 'assets/logos/ceee.png',
    pagina: 'ceee.html',
    página: 'ceee.html',
    cor: '#00539F',
    sigla: 'CS',
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
    logo: 'assets/logos/claro.png',
    pagina: 'claro.html',
    página: 'claro.html',
    cor: '#DA291C',
    sigla: 'CL',
    icone: '📱',
    descricao: 'Telefone fixo, móvel e internet'
  },
  {
    id: 'vivo',
    nome: 'Vivo',
    categoria: 'telefone',
    url: 'https://app.vivo.com.br/web',
    urlPagamento: 'https://app.vivo.com.br/web',
    logo: 'assets/logos/vivo.png',
    pagina: 'vivo.html',
    página: 'vivo.html',
    cor: '#6A1B9A',
    sigla: 'VI',
    icone: '📱',
    descricao: 'Telefone, internet e TV'
  },
  {
    id: 'tim',
    nome: 'TIM',
    categoria: 'telefone',
    url: 'https://meutim.onelink.me/0IuD/u3fep93q',
    urlPagamento: 'https://meutim.onelink.me/0IuD/u3fep93q',
    logo: 'assets/logos/tim.png',
    pagina: 'tim.html',
    página: 'tim.html',
    cor: '#0F4C81',
    sigla: 'TI',
    icone: '📱',
    descricao: 'Telefone móvel e internet'
  },
  {
    id: 'oi',
    nome: 'Oi',
    categoria: 'telefone',
    url: 'https://www.oi.com.br/minha-oi/',
    urlPagamento: 'https://www.oi.com.br/minha-oi/',
    logo: 'assets/logos/oi.png',
    cor: '#F75B00',
    sigla: 'OI',
    icone: '📱',
    descricao: 'Telefone fixo, móvel e internet'
  },

  // Água e esgoto
  {
    id: 'sabesp',
    nome: 'Sabesp',
    categoria: 'agua',
    url: 'https://novaagenciavirtual.sabesp.com.br/',
    urlPagamento: 'https://novaagenciavirtual.sabesp.com.br/',
    logo: 'assets/logos/sabesp.png',
    pagina: 'sabesp.html',
    página: 'sabesp.html',
    cor: '#004B8D',
    sigla: 'SA',
    icone: '💧',
    descricao: 'Conta de água — São Paulo'
  },
  {
    id: 'copasa',
    nome: 'Copasa',
    categoria: 'agua',
    url: 'https://copasaportalprd.azurewebsites.net/Copasa.Portal/Login/Index',
    urlPagamento: 'https://copasaportalprd.azurewebsites.net/Copasa.Portal/Login/Index',
    logo: 'assets/logos/copasa.png',
    pagina: 'copasa.html',
    página: 'copasa.html',
    cor: '#0055A5',
    sigla: 'CO',
    icone: '💧',
    descricao: 'Conta de água — Minas Gerais'
  },
  {
    id: 'cedae',
    nome: 'CEDAE',
    categoria: 'agua',
    url: 'https://agenciavirtual.cedae.com.br/csp?id=csp_segunda_via',
    urlPagamento: 'https://agenciavirtual.cedae.com.br/csp?id=csp_segunda_via',
    logo: 'assets/logos/cedae.png',
    pagina: 'cedae.html',
    página: 'cedae.html',
    cor: '#003DA5',
    sigla: 'CD',
    icone: '💧',
    descricao: 'Conta de água — Rio de Janeiro'
  },
  {
    id: 'sanepar',
    nome: 'Sanepar',
    categoria: 'agua',
    url: 'https://auth-cs.identidadedigital.pr.gov.br/centralautenticacao/login.html?response_type=code&client_id=1019c8091693ef5c5f55970346633f92&redirect_uri=https%3A%2F%2Fclientes.sanepar.com.br%2Fopenid-connect%2Fcentral&scope=null&state=EytqGemPy_rKobGvpWHsBxsCPMONo95TW6Sg_tjy2pc&urlCert=https://certauth-cs.identidadedigital.pr.gov.br&dnsCidadao=https://cidadao-cs.identidadedigital.pr.gov.br/centralcidadao&loginPadrao=btnCentral&labelCentral=CPF&modulosDeAutenticacao=btnGovbr,btnCertificado,btnCpf,btnGoogle,btnCentral&urlLogo=https%3A%2F%2Fclientes.sanepar.com.br%2Fsites%2Fportalcliente%2Ffiles%2FLogo-Sanepar-Hor-Azul.png&acesso=2091&tokenFormat=jwt&exibirLinkAutoCadastro=true&exibirLinkRecuperarSenha=true&exibirLinkAutoCadastroCertificado=false&exibirAviso=true&captcha=false',
    urlPagamento: 'https://auth-cs.identidadedigital.pr.gov.br/centralautenticacao/login.html?response_type=code&client_id=1019c8091693ef5c5f55970346633f92&redirect_uri=https%3A%2F%2Fclientes.sanepar.com.br%2Fopenid-connect%2Fcentral&scope=null&state=EytqGemPy_rKobGvpWHsBxsCPMONo95TW6Sg_tjy2pc&urlCert=https://certauth-cs.identidadedigital.pr.gov.br&dnsCidadao=https://cidadao-cs.identidadedigital.pr.gov.br/centralcidadao&loginPadrao=btnCentral&labelCentral=CPF&modulosDeAutenticacao=btnGovbr,btnCertificado,btnCpf,btnGoogle,btnCentral&urlLogo=https%3A%2F%2Fclientes.sanepar.com.br%2Fsites%2Fportalcliente%2Ffiles%2FLogo-Sanepar-Hor-Azul.png&acesso=2091&tokenFormat=jwt&exibirLinkAutoCadastro=true&exibirLinkRecuperarSenha=true&exibirLinkAutoCadastroCertificado=false&exibirAviso=true&captcha=false',
    logo: 'assets/logos/sanepar.png',
    pagina: 'sanepar.html',
    pagina: 'sanepar.html',
    pagina: 'sanepar.html',
    pagina: 'sanepar.html',
    página: 'sanepar.html',
    cor: '#003DA5',
    sigla: 'SN',
    icone: '💧',
    descricao: 'Conta de água — Paraná'
  },

  // Internet / TV
  {
    id: 'gigamaisfibra',
    nome: 'Giga Mais Fibra',
    categoria: 'internet',
    url: 'https://sso.gigamaisfibra.com.br/auth/realms/gigamaisfibra/protocol/openid-connect/auth?client_id=central-do-assinante&redirect_uri=https%3A%2F%2Fcentral-assinante.gigamaisfibra.com.br%2F&state=39905a12-b4a7-4c8a-8f72-907e48512e0e&response_mode=fragment&response_type=code&scope=openid&nonce=56e49886-464e-4f8d-8a39-1f8f40b704ad',
    urlPagamento: 'https://sso.gigamaisfibra.com.br/auth/realms/gigamaisfibra/protocol/openid-connect/auth?client_id=central-do-assinante&redirect_uri=https%3A%2F%2Fcentral-assinante.gigamaisfibra.com.br%2F&state=39905a12-b4a7-4c8a-8f72-907e48512e0e&response_mode=fragment&response_type=code&scope=openid&nonce=56e49886-464e-4f8d-8a39-1f8f40b704ad',
    logo: 'assets/logos/gigamaisfibra.png',
    pagina: 'gigamaisfibra.html',
    pagina: 'gigamaisfibra.html',
    pagina: 'gigamaisfibra.html',
    pagina: 'gigamaisfibra.html',
    página: 'gigamaisfibra.html',
    cor: '#00A859',
    sigla: 'GM',
    icone: '📺',
    descricao: 'Internet fibra ótica'
  },
  {
    id: 'sky',
    nome: 'SKY',
    categoria: 'internet',
    url: 'https://www.sky.com.br/minha-sky/login',
    urlPagamento: 'https://www.sky.com.br/minha-sky/login',
    logo: 'assets/logos/sky.png',
    pagina: 'sky.html',
    página: 'sky.html',
    cor: '#003A70',
    sigla: 'SK',
    icone: '📺',
    descricao: 'TV por assinatura e internet'
  },
  {
    id: 'algar',
    nome: 'Algar Telecom',
    categoria: 'internet',
    url: 'https://algar.com.br/AreaCliente/portal-usuario/minhas-faturas.html/',
    urlPagamento: 'https://algar.com.br/AreaCliente/portal-usuario/minhas-faturas.html/',
    pagina: 'algar.html',
    página: 'algar.html',
    cor: '#F26522',
    sigla: 'AL',
    icone: '📺',
    descricao: 'Internet, telefone e TV'
  },

  // Consultas / Pendências
  {
    id: 'serasa',
    nome: 'Serasa',
    categoria: 'consultas',
    url: 'https://www.serasa.com.br/',
    urlPagamento: 'https://www.serasa.com.br/',
    pagina: 'serasa.html',
    página: 'serasa.html',
    cor: '#0092DF',
    sigla: 'SE',
    icone: '🔍',
    descricao: 'Consulte pendências e negocie dívidas'
  }
];

const categorias = [
  { chave: 'todos', label: 'Todas' },
  { chave: 'energia', label: 'Energia Elétrica', icone: '⚡' },
  { chave: 'telefone', label: 'Telefone / Celular', icone: '📱' },
  { chave: 'agua', label: 'Água / Esgoto', icone: '💧' },
  { chave: 'internet', label: 'Internet / TV', icone: '📺' },
  { chave: 'consultas', label: 'Consultas / Pendências', icone: '🔍' }
];

// Ícones SVG por categoria (Lucide)
const ICONES_CATEGORIA = {
  todos: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
  energia: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
  telefone: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/></svg>',
  agua: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.7 6.7 8a7.5 7.5 0 1 0 10.6 0z"/></svg>',
  internet: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5a10 10 0 0 1 14 0"/><path d="M8.5 16a5 5 0 0 1 7 0"/><path d="M12 19.5h.01"/></svg>',
  consultas: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>'
};

// Dicas rotativas
const DICAS = [
  'Todos os botões abrem o site da empresa em uma <strong>nova aba</strong>, para você não perder esta página.',
  'Use a busca acima para encontrar sua empresa rapidamente — funciona até sem acentos.',
  'Clique nas categorias (Energia, Água, Telefone, Internet, Consultas) para filtrar as empresas.',
  'O relógio mostra o horário oficial de Brasília — útil para saber se o atendimento está aberto.',
  'No modo escuro, o site economiza bateria em telas OLED e cansa menos a vista à noite.',
  'Suas empresas mais acessadas aparecem na seção "Estatísticas" — personalize sua experiência.',
  'A chave Pix de doações é aleatória e aceita transferência de qualquer banco.',
  'Todas as empresas listadas têm links oficiais — nunca pedimos senha nem dados bancários.',
  'Se não achar sua empresa, clique em "Contato" no topo e nos avise — adicionamos rapidinho.',
  'O site funciona offline parcialmente: favoritos e dicas ficam salvos no seu navegador.'
];

let dicaAtual = 0;
let dicaTimer = null;

function mostrarDica(indice) {
  const el = document.getElementById('dica-texto');
  if (!el || !DICAS[indice]) return;
  el.style.opacity = '0';
  setTimeout(() => {
    el.innerHTML = DICAS[indice];
    el.style.opacity = '1';
  }, 150);
}

function proximaDica() {
  dicaAtual = (dicaAtual + 1) % DICAS.length;
  mostrarDica(dicaAtual);
  reiniciarTimer();
}

function reiniciarTimer() {
  if (dicaTimer) clearTimeout(dicaTimer);
  dicaTimer = setTimeout(proximaDica, 8000);
}

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
let termoBuscaExibicao = '';

// ========== TEMA CLARO / ESCURO ==========

function carregarTema() {
  const temaSalvo = localStorage.getItem('linkcontas-tema');
  const temaSistema = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'escuro'
    : 'claro';
  const tema = temaSalvo || temaSistema;
  aplicarTema(tema);
}

// Ícones SVG do tema (Lucide: sol / lua)
const SVG_SOL = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.9 4.9 1.4 1.4"/><path d="m17.7 17.7 1.4 1.4"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.3 17.7-1.4 1.4"/><path d="m19.1 4.9-1.4 1.4"/></svg>';
const SVG_LUA = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

function aplicarTema(tema) {
  const html = document.documentElement;

  if (tema === 'escuro') {
    html.setAttribute('data-tema', 'escuro');
    if (iconeTema) iconeTema.innerHTML = SVG_SOL;
    localStorage.setItem('linkcontas-tema', 'escuro');
  } else {
    html.removeAttribute('data-tema');
    if (iconeTema) iconeTema.innerHTML = SVG_LUA;
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
        <span class="chip-ico">${ICONES_CATEGORIA[cat.chave] || ''}</span> ${cat.label}
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

// Normaliza texto para busca: minúsculas, sem acentos, sem espaços extras
function normalizarBusca(txt) {
  return String(txt)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function renderEmpresas() {
  const filtradas = empresas.filter(emp => {
    const matchCategoria = categoriaAtiva === 'todos' || emp.categoria === categoriaAtiva;
    const alvo = normalizarBusca(
      `${emp.nome} ${emp.descricao} ${emp.sigla || ''} ${emp.categoria || ''}`
    );
    const matchBusca = !termoBusca || alvo.includes(termoBusca);
    return matchCategoria && matchBusca;
  });

  contagem.textContent = `${filtradas.length} empresa${filtradas.length !== 1 ? 's' : ''}`;
  tituloLista.textContent = termoBuscaExibicao ? `Resultados para "${termoBuscaExibicao}"` : 'Empresas';

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
    const pagina = emp.pagina || null; // página interna, quando existir
    const destinoCard = pagina || link;
    const attrsCard = pagina ? '' : ' target="_blank" rel="noopener noreferrer"';

    // Badge colorido com a sigla da marca fica atrás; a logo real aparece por cima quando carrega
    const logoTipo = `
      <div class="logo-empresa" style="background: ${emp.cor}">
        <span class="logo-sigla">${emp.sigla}</span>
        ${emp.logo ? `<img src="${emp.logo}" alt="${emp.nome}" loading="lazy" onerror="this.style.display='none'">` : ''}
      </div>
    `;

    return `
      <div class="card-empresa">
        <a href="${destinoCard}"${attrsCard} class="card-link">
          <div class="card-header">
            ${logoTipo}
            <div class="empresa-info">
              <h3>${emp.nome}</h3>
              <p>${emp.descricao}</p>
            </div>
          </div>
        </a>
        <div class="categoria-tag tag-${emp.categoria}">${emp.categoria === 'energia' ? 'Energia' : emp.categoria === 'telefone' ? 'Telefone' : emp.categoria === 'agua' ? 'Água' : emp.categoria === 'consultas' ? 'Consultas' : 'Internet'}</div>
        <div class="card-footer">
          ${pagina ? '<span class="dica-pagina"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg> Como pagar</span>' : ''}
          <a href="${link}" target="_blank" rel="noopener noreferrer" class="btn-acessar" data-empresa="${emp.id}">Pagar conta ↗</a>
        </div>
      </div>
    `;
  }).join('');

  // Vincula cliques nos botões "Pagar conta" ao contador
  document.querySelectorAll('.btn-acessar').forEach(btn => {
    btn.addEventListener('click', function () {
      const idEmpresa = this.getAttribute('data-empresa');
      const nomeEmpresa = this.closest('.card-empresa').querySelector('h3').textContent;
      if (window.linkcontas && window.linkcontas.contador) {
        window.linkcontas.contador.cliqueEmpresa(idEmpresa, nomeEmpresa);
      }
    });
  });
}

// ========== EVENTOS ==========

busca.addEventListener('input', (e) => {
  termoBuscaExibicao = e.target.value.trim();
  termoBusca = normalizarBusca(e.target.value);
  renderEmpresas();
});

temaToggle.addEventListener('click', alternarTema);

// ========== INICIALIZAÇÃO ==========

carregarTema();
renderCategorias();
renderEmpresas();

// Inicializa dica rotativa (só na home)
if (document.getElementById('dica-texto')) {
  mostrarDica(0);
  reiniciarTimer();
  document.getElementById('dica-proxima')?.addEventListener('click', proximaDica);
}

// ========== PACOTE ESSENCIAL — Polimento visual ==========

const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// 1. Animação de entrada (fade-up) nas seções
const secoesReveal = document.querySelectorAll('.reveal');
if (semMovimento || !('IntersectionObserver' in window)) {
  secoesReveal.forEach(secao => secao.classList.add('visivel'));
} else {
  const observer = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visivel');
        observer.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.12 });
  secoesReveal.forEach(secao => observer.observe(secao));
}

// 2. Header ganha sombra ao rolar a página
const header = document.querySelector('.header');
let ultimaRolagem = -1;
function atualizarSombraHeader() {
  if (!header) return;
  const topo = window.scrollY || document.documentElement.scrollTop;
  if (topo === ultimaRolagem) return;
  ultimaRolagem = topo;
  header.classList.toggle('sombra', topo > 8);
}
window.addEventListener('scroll', atualizarSombraHeader, { passive: true });
atualizarSombraHeader();

// 3. Contador animado (tabular-nums no CSS mantém os dígitos alinhados)
function animarContador(elemento, alvo, duracao = 1200) {
  if (!elemento) return;
  if (semMovimento) { elemento.textContent = alvo.toLocaleString('pt-BR'); return; }
  const inicio = performance.now();
  let concluido = false;
  function passo(agora) {
    const progresso = Math.min((agora - inicio) / duracao, 1);
    const suave = 1 - Math.pow(1 - progresso, 3); // ease-out cubic
    elemento.textContent = Math.round(alvo * suave).toLocaleString('pt-BR');
    if (progresso < 1) requestAnimationFrame(passo);
    else concluido = true;
  }
  requestAnimationFrame(passo);
  // Fallback: se o navegador não disparar rAF (aba oculta), garante o valor final
  setTimeout(() => {
    if (!concluido) elemento.textContent = alvo.toLocaleString('pt-BR');
  }, duracao + 120);
}

function popularEstatisticas() {
  const elEmpresas = document.getElementById('contador-empresas');
  const elVisitas = document.getElementById('contador-visitas');

  // Número real: total de empresas cadastradas
  if (elEmpresas) {
    animarContador(elEmpresas, empresas.length);
  }

  // Visitas: contador LOCAL honesto (navegador deste dispositivo) — nunca inventa números
  const visitas = (window.linkcontas && window.linkcontas.contador)
    ? window.linkcontas.contador.visitasLocal()
    : 0;
  if (elVisitas) animarContador(elVisitas, visitas);

  // "Suas mais acessadas": cliques salvos neste dispositivo
  const top = document.getElementById('top-empresas');
  if (!top) return;
  const cliques = (window.linkcontas && window.linkcontas.contador)
    ? window.linkcontas.contador.todosCliquesLocal()
    : {};
  const ordenadas = Object.entries(cliques)
    .filter(([, qtd]) => qtd > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  if (ordenadas.length === 0) return; // mantém a mensagem de "lista vazia"

  top.innerHTML = ordenadas.map(([id, qtd], i) => {
    const emp = empresas.find(e => e.id === id);
    if (!emp) return '';
    return `
      <div class="top-item">
        <span class="top-nome">
          <span class="logo-sigla" style="background:${emp.cor};width:26px;height:26px;border-radius:7px;display:inline-flex;align-items:center;justify-content:center;font-size:0.7rem;color:#fff;">${emp.sigla}</span>
          ${emp.nome}
        </span>
        <span class="top-vezes">${i + 1}º · ${qtd} ${qtd === 1 ? 'clique' : 'cliques'}</span>
      </div>
    `;
  }).join('');
}

popularEstatisticas();
