/* =====================================
   LINKCONTAS — site.js (v2)
   Tema, menu, busca, filtros, catálogo,
   favoritos, histórico, seção da Sobre.
   ===================================== */
(function () {
  'use strict';

  // ---------- Normalização de texto (português) ----------
  function normalizar(txt) {
    return String(txt)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')      // remove acentos
      .toLowerCase()
      .trim();
  }

  // ---------- Referências DOM ----------
  var gridLista = document.getElementById('grid-empresas-lista');
  var estadoVazio = document.getElementById('estado-vazio');
  var busca = document.getElementById('busca');
  var buscaClear = document.getElementById('busca-clear');
  var listaCategorias = document.getElementById('categorias-lista');
  var gridEstados = document.getElementById('grid-estados');
  var contagemEl = document.getElementById('contagem');
  var btnLimparFiltros = document.getElementById('btn-limpar-filtros');
  var temaToggle = document.getElementById('tema-toggle');
  var iconeTema = document.querySelector('.icone-tema');
  var btnVoltarTopo = document.getElementById('btn-voltar-topo');

  // ---------- Estado ----------
  var categoriaAtiva = 'todos';
  var estadoAtivo = null;
  var termoBusca = '';
  var soFavoritos = false; // filtro de favoritos (independente dos demais)

  // Qualquer filtro ativo precisa manter o botão "Limpar filtros" visível.
  function haFiltroAtivo() {
    return termoBusca !== '' || categoriaAtiva !== 'todos' ||
      estadoAtivo !== null || soFavoritos;
  }
  var favoritos = JSON.parse(localStorage.getItem('lc-favoritos') || '[]');
  var historico = JSON.parse(localStorage.getItem('lc-historico') || '[]');

  // ---------- Temas ----------
  var SVG_LUA = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  var SVG_SOL = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.9 4.9 1.4 1.4"/><path d="m17.7 17.7 1.4 1.4"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.3 17.7-1.4 1.4"/><path d="m19.1 4.9-1.4 1.4"/></svg>';

  function aplicarTema(tema) {
    var html = document.documentElement;
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

  function carregarTema() {
    var salvo = localStorage.getItem('linkcontas-tema');
    var sistema = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'escuro' : 'claro';
    aplicarTema(salvo || sistema);
  }

  function alternarTema() {
    var escuro = document.documentElement.getAttribute('data-tema') === 'escuro';
    aplicarTema(escuro ? 'claro' : 'escuro');
  }

  // ---------- Utilitários ----------
  function estadoNome(sigla) {
    var map = {
      AC: 'Acre', AL: 'Alagoas', AP: 'Amapá', AM: 'Amazonas', BA: 'Bahia',
      CE: 'Ceará', DF: 'Distrito Federal', ES: 'Espírito Santo', GO: 'Goiás',
      MA: 'Maranhão', MT: 'Mato Grosso', MS: 'Mato Grosso do Sul', MG: 'Minas Gerais',
      PA: 'Pará', PB: 'Paraíba', PR: 'Paraná', PE: 'Pernambuco', PI: 'Piauí',
      RJ: 'Rio de Janeiro', RN: 'Rio Grande do Norte', RS: 'Rio Grande do Sul',
      RO: 'Rondônia', RR: 'Roraima', SC: 'Santa Catarina', SP: 'São Paulo',
      SE: 'Sergipe', TO: 'Tocantins'
    };
    return map[sigla] || sigla;
  }

  function fmtCategoria(chave) {
    var cat = LC.categorias.find(function (c) { return c.chave === chave; });
    return cat ? cat.label : chave;
  }

  // ---------- Favoritos ----------
  function toggleFavorito(id) {
    var idx = favoritos.indexOf(id);
    if (idx >= 0) favoritos.splice(idx, 1);
    else favoritos.push(id);
    localStorage.setItem('lc-favoritos', JSON.stringify(favoritos));
    renderEmpresas();
    renderCategorias(); // atualiza o contador do chip "Favoritos"
  }

  function ehFavorito(id) {
    return favoritos.indexOf(id) >= 0;
  }

  // ---------- Histórico ----------
  function adicionarHistorico(id) {
    historico = historico.filter(function (x) { return x !== id; });
    historico.unshift(id);
    if (historico.length > 10) historico.pop();
    localStorage.setItem('lc-historico', JSON.stringify(historico));
  }

  function limparHistorico() {
    historico = [];
    localStorage.setItem('lc-historico', '[]');
  }

  // ---------- Filtragem ----------
  function filtrarEmpresas() {
    return LC.empresas.filter(function (emp) {
      var matchCat = categoriaAtiva === 'todos' || emp.categoria === categoriaAtiva;
      var matchEst = estadoAtivo === null || (emp.estados && emp.estados.indexOf(estadoAtivo) >= 0);
      var matchFav = !soFavoritos || ehFavorito(emp.id);
      var alvo = normalizar(emp.nome + ' ' + (emp.descricao || '') + ' ' + (emp.sigla || '') + ' ' + (emp.aliases || []).join(' ') + ' ' + (emp.estados || []).join(' '));
      var matchBusca = !termoBusca || alvo.indexOf(termoBusca) >= 0;
      return matchCat && matchEst && matchFav && matchBusca;
    });
  }

  // ---------- Rolagem até a lista ao usar filtros ----------
  // Alinha a seção da lista no topo (respeitando o header fixo).
  // Só rola quando a lista ainda não está confortavelmente visível,
  // para não tirar o usuário do lugar se ele já está olhando os cards.
  function rolarParaLista() {
    var secao = document.getElementById('grid-empresas');
    if (!secao || typeof secao.scrollIntoView !== 'function') return;

    var rect = secao.getBoundingClientRect();
    var headerH = 84; // mesmo valor do scroll-margin-top das seções
    var alinhada = rect.top <= headerH + 40 && rect.bottom > headerH + 120;
    if (alinhada) return;

    var semAnimacao = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    secao.scrollIntoView({
      behavior: semAnimacao ? 'auto' : 'smooth',
      block: 'start'
    });
  }

  // ---------- Render ----------
  function renderCategorias() {
    if (!listaCategorias) return;
    var chips = [
      { chave: 'todos', label: 'Todas', icone: 'todos' },
      { chave: 'energia', label: 'Energia elétrica', icone: 'energia' },
      { chave: 'agua', label: 'Água e esgoto', icone: 'agua' },
      { chave: 'telefone', label: 'Telefone e celular', icone: 'telefone' },
      { chave: 'internet', label: 'Internet e TV', icone: 'internet' },
      { chave: 'consultas', label: 'Consultas e pendências', icone: 'consultas' },
      { chave: 'favoritos', label: 'Favoritos', icone: 'favoritos' }
    ];

    var icones = {
      todos: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
      energia: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
      agua: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.7 6.7 8a7.5 7.5 0 1 0 10.6 0z"/></svg>',
      telefone: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/></svg>',
      internet: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5a10 10 0 0 1 14 0"/><path d="M8.5 16a5 5 0 0 1 7 0"/><path d="M12 19.5h.01"/></svg>',
      consultas: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
      favoritos: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>'
    };

    listaCategorias.innerHTML = chips.map(function (cat) {
      var ativo = cat.chave === 'favoritos'
        ? (soFavoritos ? 'ativo' : '')
        : (categoriaAtiva === cat.chave && !soFavoritos ? 'ativo' : '');
      var pressionado = ativo === 'ativo';
      var qtd = cat.chave === 'favoritos' && favoritos.length > 0
        ? ' <span class="chip-contagem">' + favoritos.length + '</span>'
        : '';
      return '<button class="chip-categoria' + (cat.chave === 'favoritos' ? ' chip-favoritos' : '') + ' ' + ativo + '" data-categoria="' + cat.chave + '" aria-pressed="' + pressionado + '">' +
        '<span class="chip-ico">' + (icones[cat.icone] || '') + '</span>' + cat.label + qtd +
        '</button>';
    }).join('');

    listaCategorias.querySelectorAll('.chip-categoria').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (btn.dataset.categoria === 'favoritos') {
          // Filtro de favoritos: liga/desliga sem mexer nos demais filtros.
          soFavoritos = !soFavoritos;
        } else {
          categoriaAtiva = btn.dataset.categoria;
          estadoAtivo = null;
        }
        btnLimparFiltros.classList.toggle('oculto', !haFiltroAtivo());
        renderCategorias();
        renderEstados();
        renderEmpresas();
        rolarParaLista();
      });
    });
  }

  function renderEstados() {
    if (!gridEstados) return;
    var estados = [];
    LC.empresas.forEach(function (emp) {
      (emp.estados || []).forEach(function (uf) {
        if (estados.indexOf(uf) < 0) estados.push(uf);
      });
    });
    estados.sort();

    gridEstados.innerHTML = estados.map(function (uf) {
      var ativo = estadoAtivo === uf ? 'ativo' : '';
      return '<button class="estado-card ' + ativo + '" data-estado="' + uf + '" aria-pressed="' + (ativo === 'ativo') + '">' + estadoNome(uf) + '</button>';
    }).join('');

    gridEstados.querySelectorAll('.estado-card').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var uf = btn.dataset.estado;
        estadoAtivo = (estadoAtivo === uf) ? null : uf;
        categoriaAtiva = 'todos';
        btnLimparFiltros.classList.toggle('oculto', !haFiltroAtivo());
        renderCategorias();
        renderEstados();
        renderEmpresas();
        rolarParaLista();
      });
    });
  }

  function renderEmpresas() {
    if (!gridLista) return;
    var filtradas = filtrarEmpresas();

    if (contagemEl) contagemEl.textContent = filtradas.length + ' empresa' + (filtradas.length !== 1 ? 's' : '');

    if (filtradas.length === 0) {
      if (estadoVazio) {
        estadoVazio.classList.remove('oculto');
        var tit = estadoVazio.querySelector('h3');
        var txt = estadoVazio.querySelector('p');
        if (soFavoritos && termoBusca === '' && categoriaAtiva === 'todos' && estadoAtivo === null) {
          if (tit) tit.textContent = 'Nenhuma empresa favoritada';
          if (txt) txt.textContent = 'Toque no coração de um card para salvá-lo aqui.';
        } else if (tit && txt) {
          tit.textContent = 'Nenhuma empresa encontrada';
          txt.textContent = 'Tente outro nome, categoria ou estado.';
        }
      }
      gridLista.innerHTML = '';
      return;
    }
    if (estadoVazio) estadoVazio.classList.add('oculto');

    gridLista.innerHTML = filtradas.map(function (emp) {
      var link = emp.urlPagamento || emp.url;
      var pagina = emp.pagina || null;
      var destino = pagina || link;
      var externo = !pagina;
      var fav = ehFavorito(emp.id);

      // Sigla sempre renderizada (fallback garantido);
      // o logo, se existir, fica por cima e se remove ao falhar.
      var logoHtml = '<span class="logo-sigla">' + (emp.sigla || '?') + '</span>';
      if (emp.logo) {
        logoHtml += '<img src="' + emp.logo + '" alt="" loading="lazy" ' +
          'style="position:absolute; inset:0;" onerror="this.remove()">';
      }

      return '<article class="card-empresa">' +
        '<div class="card-header">' +
        '<div class="logo-empresa" style="background: ' + emp.cor + '; position: relative;">' + logoHtml + '</div>' +
        '<div class="empresa-info">' +
        '<div class="categoria-tag">' + fmtCategoria(emp.categoria) + '</div>' +
        '<h3>' + emp.nome + '</h3>' +
        '<p>' + emp.descricao + '</p>' +
        '</div>' +
        '</div>' +
        '<div class="card-footer">' +
        '<a href="' + destino + '" class="btn-acessar" data-empresa="' + emp.id + '" ' + (externo ? 'target="_blank" rel="noopener noreferrer"' : '') + '>' +
        (externo ? 'Acessar site oficial ↗' : 'Ver página da empresa') +
        '</a>' +
        '<button class="btn-favorito' + (fav ? ' ativo' : '') + '" aria-label="' + (fav ? 'Remover dos favoritos' : 'Adicionar aos favoritos') + ' ' + emp.nome + '" aria-pressed="' + fav + '" data-favorito="' + emp.id + '">' +
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>' +
        '</button>' +
        '</div>' +
        '</article>';
    }).join('');

    // eventos de clique nos cards (histórico + favorito)
    gridLista.querySelectorAll('[data-empresa]').forEach(function (a) {
      a.addEventListener('click', function () {
        adicionarHistorico(a.dataset.empresa);
        if (window.linkcontas && window.linkcontas.contador &&
            typeof window.linkcontas.contador.cliqueEmpresa === 'function') {
          var nomeEl = a.closest('.card-empresa').querySelector('h3');
          window.linkcontas.contador.cliqueEmpresa(a.dataset.empresa, nomeEl ? nomeEl.textContent : '');
        }
      });
    });
    gridLista.querySelectorAll('[data-favorito]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorito(btn.dataset.favorito);
      });
    });
  }

  // ---------- Seção de categorias na página Sobre ----------
  function renderSobreCategorias() {
    var alvo = document.getElementById('sobre-categorias');
    if (!alvo || typeof LC === 'undefined' || !LC.empresas) return;

    var icones = {
      energia: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
      agua: '<path d="M12 2.7 6.7 8a7.5 7.5 0 1 0 10.6 0z"/>',
      telefone: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
      internet: '<path d="M5 12.5a10 10 0 0 1 14 0"/><path d="M8.5 16a5 5 0 0 1 7 0"/><path d="M12 19.5h.01"/>',
      consultas: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>'
    };

    var html = LC.categorias.map(function (cat) {
      var empresas = LC.empresas.filter(function (e) { return e.categoria === cat.chave; });
      if (empresas.length === 0) return '';

      var links = empresas.map(function (emp) {
        var pagina = emp.pagina || (emp.urlPagamento || emp.url);
        var externo = !emp.pagina;
        return '<li><a href="' + pagina + '"' +
          (externo ? ' target="_blank" rel="noopener noreferrer"' : '') +
          '>' + emp.nome + '</a></li>';
      }).join('');

      return '<div class="categoria-bloco">' +
        '<div class="categoria-bloco-topo">' +
        '<span class="categoria-bloco-ico"><svg viewBox="0 0 24 24" aria-hidden="true">' +
        (icones[cat.chave] || icones.consultas) + '</svg></span>' +
        '<div>' +
        '<h3>' + cat.label + '</h3>' +
        '<span class="categoria-bloco-qtd">' + empresas.length +
        ' empresa' + (empresas.length !== 1 ? 's' : '') + '</span>' +
        '</div>' +
        '</div>' +
        '<ul>' + links + '</ul>' +
        '</div>';
    }).join('');

    alvo.innerHTML = html || '<p>Nenhuma categoria cadastrada até o momento.</p>';
  }

  // ---------- Busca ----------
  function mostrarOuEsconderLimpar() {
    if (!buscaClear) return;
    if (termoBusca.length > 0) {
      buscaClear.classList.add('visible');
    } else {
      buscaClear.classList.remove('visible');
    }
    btnLimparFiltros.classList.toggle('oculto', !haFiltroAtivo());
  }

  function limparBusca() {
    if (!busca) return;
    busca.value = '';
    termoBusca = '';
    mostrarOuEsconderLimpar();
    renderEmpresas();
    busca.focus();
  }

  if (busca) {
    busca.addEventListener('input', function (e) {
      termoBusca = normalizar(e.target.value);
      mostrarOuEsconderLimpar();
      renderEmpresas();
    });
  }

  if (buscaClear) {
    buscaClear.addEventListener('click', limparBusca);
  }

  if (btnLimparFiltros) {
    btnLimparFiltros.addEventListener('click', function () {
      termoBusca = '';
      categoriaAtiva = 'todos';
      estadoAtivo = null;
      soFavoritos = false;
      if (busca) busca.value = '';
      mostrarOuEsconderLimpar();
      renderCategorias();
      renderEstados();
      renderEmpresas();
    });
  }

  // ---------- Tema ----------
  if (temaToggle) {
    temaToggle.addEventListener('click', alternarTema);
  }

  // ---------- Menu mobile ----------
  var menuToggle = document.getElementById('menu-toggle');
  var menuMobile = document.getElementById('menu-mobile');
  if (menuToggle && menuMobile) {
    menuToggle.addEventListener('click', function () {
      var aberto = menuMobile.classList.toggle('aberto');
      menuToggle.setAttribute('aria-expanded', aberto ? 'true' : 'false');
      menuToggle.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    });
    menuMobile.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menuMobile.classList.remove('aberto');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Abrir menu');
      });
    });
  }

  // ---------- Voltar ao topo ----------
  if (btnVoltarTopo) {
    window.addEventListener('scroll', function () {
      var visivel = window.scrollY > 300;
      btnVoltarTopo.classList.toggle('visivel', visivel);
    });
    btnVoltarTopo.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---------- Sombra do header ao rolar ----------
  var header = document.querySelector('.header');
  var ultima = -1;
  function atualizarSombra() {
    if (!header) return;
    var topo = window.scrollY || document.documentElement.scrollTop;
    if (topo === ultima) return;
    ultima = topo;
    header.classList.toggle('sombra', topo > 8);
  }
  window.addEventListener('scroll', atualizarSombra, { passive: true });
  atualizarSombra();

  // ---------- Inicialização ----------
  carregarTema();
  renderCategorias();
  renderEstados();
  renderEmpresas();
  renderSobreCategorias();
})();