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
          ${pagina ? '<span class="dica-pagina">📖 Como pagar</span>' : ''}
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
  termoBusca = e.target.value.toLowerCase().trim();
  renderEmpresas();
});

temaToggle.addEventListener('click', alternarTema);

// ========== INICIALIZAÇÃO ==========

carregarTema();
renderCategorias();
renderEmpresas();
