/* =====================================
   LINKCONTAS — Contador de visitas e cliques
   =====================================
   - Contagem LOCAL (localStorage): exibe números na tela rapidamente
   - Contagem GLOBAL (Google Analytics 4): visitas e cliques reais de todo o mundo
     (visíveis no painel do Google Analytics; basta configurar o MEASUREMENT_ID abaixo)
   ===================================== */

// ---------------- CONFIGURAÇÃO ----------------
// Measurement ID do Google Analytics 4 (GA4) — LinkContas
const GA_MEASUREMENT_ID = 'G-252SNCK2VK';

// ---------------- CONTAGEM LOCAL (apenas exibição na tela) ----------------
const STORAGE_VISITAS = 'linkcontas-visitas';
const STORAGE_CLIQUES = 'linkcontas-cliques-empresas';

function registrarVisitaLocal() {
  try {
    const atual = parseInt(localStorage.getItem(STORAGE_VISITAS) || '0', 10);
    localStorage.setItem(STORAGE_VISITAS, String(atual + 1));
  } catch (e) { /* silencioso */ }
}

function obterVisitasLocal() {
  try { return parseInt(localStorage.getItem(STORAGE_VISITAS) || '0', 10); }
  catch (e) { return 0; }
}

function registrarCliqueLocal(idEmpresa) {
  try {
    const cliques = JSON.parse(localStorage.getItem(STORAGE_CLIQUES) || '{}');
    cliques[idEmpresa] = (cliques[idEmpresa] || 0) + 1;
    localStorage.setItem(STORAGE_CLIQUES, JSON.stringify(cliques));
  } catch (e) { /* silencioso */ }
}

function obterCliquesLocal(idEmpresa) {
  try {
    const cliques = JSON.parse(localStorage.getItem(STORAGE_CLIQUES) || '{}');
    return cliques[idEmpresa] || 0;
  } catch (e) { return 0; }
}

function obterTodosCliquesLocal() {
  try { return JSON.parse(localStorage.getItem(STORAGE_CLIQUES) || '{}'); }
  catch (e) { return {}; }
}

// ---------------- CONTAGEM GLOBAL (Google Analytics 4 via GTM) ----------------
// O container GTM (GTM-KTZBMW3W) já está injetado em todas as páginas,
// então o gtag está disponível globalmente. Só precisamos enviar os eventos.
function carregarGoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) return;

  // Aguarda o gtag estar disponível (injetado pelo GTM)
  function tentarEnviar() {
    if (typeof gtag !== 'undefined') {
      gtag('config', GA_MEASUREMENT_ID);
      gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href
      });
    } else {
      setTimeout(tentarEnviar, 300);
    }
  }
  tentarEnviar();
}

// Registra clique em empresa (envia para o GA global via GTM)
function registrarCliqueGlobal(idEmpresa, nomeEmpresa) {
  if (typeof gtag === 'undefined') return;
  gtag('event', 'clique_empresa', {
    empresa_id: idEmpresa,
    empresa_nome: nomeEmpresa
  });
}

// ---------------- INICIALIZAÇÃO ----------------
registrarVisitaLocal();
carregarGoogleAnalytics();

// Expõe funções para uso em outros arquivos (index.html, páginas de empresa, etc.)
window.linkcontas = window.linkcontas || {};
window.linkcontas.contador = {
  visitasLocal: () => obterVisitasLocal(),
  cliquesLocal: (id) => obterCliquesLocal(id),
  todosCliquesLocal: () => obterTodosCliquesLocal(),
  cliqueEmpresa: (id, nome) => {
    registrarCliqueLocal(id);
    registrarCliqueGlobal(id, nome);
  }
};

/* ==========================================================================
   COMO CONFIGURAR O GOOGLE ANALYTICS (contagem global real):

   1. Acesse https://analytics.google.com/ e crie uma conta (gratuita).
   2. Crie uma "Propriedade" (Google Analytics 4) para linkcontas.com.br.
   3. Copie o "Measurement ID" (formato G-XXXXXXXXXX).
   4. Cole esse ID na constante GA_MEASUREMENT_ID acima (entre aspas).
   5. Publique o site. O Google Analytics começará a contar visitas reais
      de todo o mundo e os cliques em cada empresa aparecerão como eventos
      "clique_empresa" no painel > Relatórios > Eventos.

   Para ver os dados: analytics.google.com → sua propriedade → Relatórios
   ========================================================================== */
