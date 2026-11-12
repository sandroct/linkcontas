/* =====================================
   LINKCONTAS â€” Script
   ===================================== */

const empresas = [
  // Energia elÃ©trica
  {
    id: 'enel',
    nome: 'Enel DistribuiÃ§Ã£o',
    categoria: 'energia',
    url: 'https://www.enel.com.br/content/enel-br/pt-saopaulo/login.html',
    urlPagamento: 'https://www.enel.com.br/content/enel-br/pt-saopaulo/login.html',
    logo: 'assets/logos/enel.png',
    cor: '#E2001A',
    sigla: 'EN',
    icone: 'âš¡',
    descricao: 'Conta de luz â€” SÃ£o Paulo (link pode variar por estado)'
  },
  {
    id: 'light',
    nome: 'Light',
    categoria: 'energia',
    url: 'https://agenciavirtual.light.com.br/portal/',
    urlPagamento: 'https://agenciavirtual.light.com.br/portal/',
    logo: 'assets/logos/light.png',
    cor: '#F58220',
    sigla: 'LI',
    icone: 'âš¡',
    descricao: 'Conta de luz â€” Rio de Janeiro'
  },
  {
    id: 'cemig',
    nome: 'CEMIG',
    categoria: 'energia',
    url: 'https://atende.cemig.com.br/Login',
    urlPagamento: 'https://atende.cemig.com.br/Login',
    logo: 'assets/logos/cemig.png',
    cor: '#003A70',
    sigla: 'CM',
    icone: 'âš¡',
    descricao: 'Conta de luz â€” Minas Gerais'
  },
  {
    id: 'cpfl',
    nome: 'CPFL Energia',
    categoria: 'energia',
    url: 'https://cpflb2cprd.b2clogin.com/cpflb2cprd.onmicrosoft.com/b2c_1a_signup_signin_mfa_front/oauth2/v2.0/authorize?p=B2C_1A_SIGNUP_SIGNIN_MFA_FRONT&client_id=17d5831d-6741-4670-8085-d1d34e37aec1&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fwww.cpfl.com.br%2Fb2c-auth%2Freceive-token&scope=17d5831d-6741-4670-8085-d1d34e37aec1%20offline_access&response_type=code&prompt=login&response_mode=query',
    urlPagamento: 'https://cpflb2cprd.b2clogin.com/cpflb2cprd.onmicrosoft.com/b2c_1a_signup_signin_mfa_front/oauth2/v2.0/authorize?p=B2C_1A_SIGNUP_SIGNIN_MFA_FRONT&client_id=17d5831d-6741-4670-8085-d1d34e37aec1&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fwww.cpfl.com.br%2Fb2c-auth%2Freceive-token&scope=17d5831d-6741-4670-8085-d1d34e37aec1%20offline_access&response_type=code&prompt=login&response_mode=query',
    logo: 'assets/logos/cpfl.png',
    cor: '#0033A0',
    sigla: 'CP',
    icone: 'âš¡',
    descricao: 'Conta de luz â€” SÃ£o Paulo e outras regiÃµes'
  },
  {
    id: 'edp',
    nome: 'EDP',
    categoria: 'energia',
    url: 'https://www.edponline.com.br/para-sua-casa/login',
    urlPagamento: 'https://www.edponline.com.br/para-sua-casa/login',
    logo: 'assets/logos/edp.png',
    cor: '#E30613',
    sigla: 'ED',
    icone: 'âš¡',
    descricao: 'Conta de luz â€” EspÃ­rito Santo e SÃ£o Paulo'
  },
  {
    id: 'ceee',
    nome: 'CEEE',
    categoria: 'energia',
    url: 'https://ceee.equatorialenergia.com.br/#!',
    urlPagamento: 'https://ceee.equatorialenergia.com.br/#!',
    logo: 'assets/logos/ceee.png',
    cor: '#00539F',
    sigla: 'CS',
    icone: 'âš¡',
    descricao: 'Conta de luz â€” Rio Grande do Sul'
  },

  // Telefone / Celular
  {
    id: 'claro',
    nome: 'Claro',
    categoria: 'telefone',
    url: 'https://minhaclaro.claro.com.br/acesso-rapido/',
    urlPagamento: 'https://minhaclaro.claro.com.br/acesso-rapido/',
    logo: 'assets/logos/claro.png',
    cor: '#DA291C',
    sigla: 'CL',
    icone: 'ðŸ“±',
    descricao: 'Telefone fixo, mÃ³vel e internet'
  },
  {
    id: 'vivo',
    nome: 'Vivo',
    categoria: 'telefone',
    url: 'https://app.vivo.com.br/web',
    urlPagamento: 'https://app.vivo.com.br/web',
    logo: 'assets/logos/vivo.png',
    cor: '#6A1B9A',
    sigla: 'VI',
    icone: 'ðŸ“±',
    descricao: 'Telefone, internet e TV'
  },
  {
    id: 'tim',
    nome: 'TIM',
    categoria: 'telefone',
    url: 'https://meutim.onelink.me/0IuD/u3fep93q',
    urlPagamento: 'https://meutim.onelink.me/0IuD/u3fep93q',
    logo: 'assets/logos/tim.png',
    cor: '#0F4C81',
    sigla: 'TI',
    icone: 'ðŸ“±',
    descricao: 'Telefone mÃ³vel e internet'
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
    icone: 'ðŸ“±',
    descricao: 'Telefone fixo, mÃ³vel e internet'
  },

  // Ãgua e esgoto
  {
    id: 'sabesp',
    nome: 'Sabesp',
    categoria: 'agua',
    url: 'https://novaagenciavirtual.sabesp.com.br/',
    urlPagamento: 'https://novaagenciavirtual.sabesp.com.br/',
    logo: 'assets/logos/sabesp.png',
    cor: '#004B8D',
    sigla: 'SA',
    icone: 'ðŸ’§',
    descricao: 'Conta de Ã¡gua â€” SÃ£o Paulo'
  },
  {
    id: 'copasa',
    nome: 'Copasa',
    categoria: 'agua',
    url: 'https://copasaportalprd.azurewebsites.net/Copasa.Portal/Login/Index',
    urlPagamento: 'https://copasaportalprd.azurewebsites.net/Copasa.Portal/Login/Index',
    logo: 'assets/logos/copasa.png',
    cor: '#0055A5',
    sigla: 'CO',
    icone: 'ðŸ’§',
    descricao: 'Conta de Ã¡gua â€” Minas Gerais'
  },
  {
    id: 'cedae',
    nome: 'CEDAE',
    categoria: 'agua',
    url: 'https://agenciavirtual.cedae.com.br/csp?id=csp_segunda_via',
    urlPagamento: 'https://agenciavirtual.cedae.com.br/csp?id=csp_segunda_via',
    logo: 'assets/logos/cedae.png',
    cor: '#003DA5',
    sigla: 'CD',
    icone: 'ðŸ’§',
    descricao: 'Conta de Ã¡gua â€” Rio de Janeiro'
  },
  {
    id: 'sanepar',
    nome: 'Sanepar',
    categoria: 'agua',
    url: 'https://auth-cs.identidadedigital.pr.gov.br/centralautenticacao/login.html?response_type=code&client_id=1019c8091693ef5c5f55970346633f92&redirect_uri=https%3A%2F%2Fclientes.sanepar.com.br%2Fopenid-connect%2Fcentral&scope=null&state=EytqGemPy_rKobGvpWHsBxsCPMONo95TW6Sg_tjy2pc&urlCert=https://certauth-cs.identidadedigital.pr.gov.br&dnsCidadao=https://cidadao-cs.identidadedigital.pr.gov.br/centralcidadao&loginPadrao=btnCentral&labelCentral=CPF&modulosDeAutenticacao=btnGovbr,btnCertificado,btnCpf,btnGoogle,btnCentral&urlLogo=https%3A%2F%2Fclientes.sanepar.com.br%2Fsites%2Fportalcliente%2Ffiles%2FLogo-Sanepar-Hor-Azul.png&acesso=2091&tokenFormat=jwt&exibirLinkAutoCadastro=true&exibirLinkRecuperarSenha=true&exibirLinkAutoCadastroCertificado=false&exibirAviso=true&captcha=false',
    urlPagamento: 'https://auth-cs.identidadedigital.pr.gov.br/centralautenticacao/login.html?response_type=code&client_id=1019c8091693ef5c5f55970346633f92&redirect_uri=https%3A%2F%2Fclientes.sanepar.com.br%2Fopenid-connect%2Fcentral&scope=null&state=EytqGemPy_rKobGvpWHsBxsCPMONo95TW6Sg_tjy2pc&urlCert=https://certauth-cs.identidadedigital.pr.gov.br&dnsCidadao=https://cidadao-cs.identidadedigital.pr.gov.br/centralcidadao&loginPadrao=btnCentral&labelCentral=CPF&modulosDeAutenticacao=btnGovbr,btnCertificado,btnCpf,btnGoogle,btnCentral&urlLogo=https%3A%2F%2Fclientes.sanepar.com.br%2Fsites%2Fportalcliente%2Ffiles%2FLogo-Sanepar-Hor-Azul.png&acesso=2091&tokenFormat=jwt&exibirLinkAutoCadastro=true&exibirLinkRecuperarSenha=true&exibirLinkAutoCadastroCertificado=false&exibirAviso=true&captcha=false',
    logo: 'assets/logos/sanepar.png',
    cor: '#003DA5',
    sigla: 'SN',
    icone: 'ðŸ’§',
    descricao: 'Conta de Ã¡gua â€” ParanÃ¡'
  },

  // Internet / TV
  {
    id: 'gigamaisfibra',
    nome: 'Giga Mais Fibra',
    categoria: 'internet',
    url: 'https://sso.gigamaisfibra.com.br/auth/realms/gigamaisfibra/protocol/openid-connect/auth?client_id=central-do-assinante&redirect_uri=https%3A%2F%2Fcentral-assinante.gigamaisfibra.com.br%2F&state=39905a12-b4a7-4c8a-8f72-907e48512e0e&response_mode=fragment&response_type=code&scope=openid&nonce=56e49886-464e-4f8d-8a39-1f8f40b704ad',
    urlPagamento: 'https://sso.gigamaisfibra.com.br/auth/realms/gigamaisfibra/protocol/openid-connect/auth?client_id=central-do-assinante&redirect_uri=https%3A%2F%2Fcentral-assinante.gigamaisfibra.com.br%2F&state=39905a12-b4a7-4c8a-8f72-907e48512e0e&response_mode=fragment&response_type=code&scope=openid&nonce=56e49886-464e-4f8d-8a39-1f8f40b704ad',
    logo: 'assets/logos/gigamaisfibra.png',
    cor: '#00A859',
    sigla: 'GM',
    icone: 'ðŸ“º',
    descricao: 'Internet fibra Ã³tica'
  },
  {
    id: 'sky',
    nome: 'SKY',
    categoria: 'internet',
    url: 'https://www.sky.com.br/minha-sky/login',
    urlPagamento: 'https://www.sky.com.br/minha-sky/login',
    logo: 'assets/logos/sky.png',
    cor: '#003A70',
    sigla: 'SK',
    icone: 'ðŸ“º',
    descricao: 'TV por assinatura e internet'
  },
  {
    id: 'algar',
    nome: 'Algar Telecom',
    categoria: 'internet',
    url: 'https://algar.com.br/AreaCliente/portal-usuario/minhas-faturas.html/',
    urlPagamento: 'https://algar.com.br/AreaCliente/portal-usuario/minhas-faturas.html/',
    logo: 'assets/logos/algar.png',
    cor: '#F26522',
    sigla: 'AL',
    icone: 'ðŸ“º',
    descricao: 'Internet, telefone e TV'
  }
];

const categorias = [
  { chave: 'todos', label: 'Todas' },
  { chave: 'energia', label: 'Energia ElÃ©trica', icone: 'âš¡' },
  { chave: 'telefone', label: 'Telefone / Celular', icone: 'ðŸ“±' },
  { chave: 'agua', label: 'Ãgua / Esgoto', icone: 'ðŸ’§' },
  { chave: 'internet', label: 'Internet / TV', icone: 'ðŸ“º' }
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
    iconeTema.textContent = 'â˜€ï¸';
    localStorage.setItem('linkcontas-tema', 'escuro');
  } else {
    html.removeAttribute('data-tema');
    iconeTema.textContent = 'ðŸŒ™';
    localStorage.setItem('linkcontas-tema', 'claro');
  }
}

function alternarTema() {
  const html = document.documentElement;
  const estaEscuro = html.hasAttribute('data-tema');
  aplicarTema(estaEscuro ? 'claro' : 'escuro');
}

// ========== RENDERIZAÃ‡ÃƒO ==========

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
    // Badge colorido com a sigla da marca fica atrÃ¡s; a logo real aparece por cima quando carrega
    const logoTipo = `
      <div class="logo-empresa" style="background: ${emp.cor}">
        <span class="logo-sigla">${emp.sigla}</span>
        ${emp.logo ? `<img src="${emp.logo}" alt="${emp.nome}" loading="lazy" onerror="this.style.display='none'">` : ''}
      </div>
    `;

    return `
      <a href="${link}" target="_blank" rel="noopener noreferrer" class="card-empresa">
        <div class="card-header">
          ${logoTipo}
          <div class="empresa-info">
            <h3>${emp.nome}</h3>
            <p>${emp.descricao}</p>
          </div>
        </div>
        <div class="categoria-tag tag-${emp.categoria}">${emp.categoria === 'energia' ? 'Energia' : emp.categoria === 'telefone' ? 'Telefone' : emp.categoria === 'agua' ? 'Ãgua' : 'Internet'}</div>
        <div class="card-footer">
          <span class="btn-acessar">Pagar conta â†—</span>
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

// ========== INICIALIZAÃ‡ÃƒO ==========

carregarTema();
renderCategorias();
renderEmpresas();
