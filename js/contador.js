/* =====================================
   LINKCONTAS — Contador de visitas e cliques
   =====================================
   - Contagem LOCAL (localStorage): exibe números na tela rapidamente
   - Contagem GLOBAL (Google Analytics 4): visitas e cliques reais de todo o mundo
     (visíveis no painel do Google Analytics; basta configurar o MEASUREMENT_ID abaixo)
   ===================================== */

// ---------------- CONFIGURAÇÃO ----------------
// Substitua pelo seu Measurement ID do Google Analytics (ex: G-XXXXXXXXXX)
// Veja instruções no final deste arquivo.
const GA_MEASUREMENT_ID = ''; // ex: 'G-1234567890'

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

// ---------------- CONTAGEM GLOBAL (Google Analytics 4) ----------------
function carregarGoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) return; // não configurado; ignora

  // Inseri o script gtag dinamicamente
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID);

  // Registra visita de página
  gtag('event', 'page_view', {
    page_title: document.title,
    page_location: window.location.href
  });
}

// Registra clique em empresa (envia para o GA global)
function registrarCliqueGlobal(idEmpresa, nomeEmpresa) {
  if (!GA_MEASUREMENT_ID || typeof gtag === 'undefined') return;
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
