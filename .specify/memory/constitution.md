<!--
RELATÓRIO DE SINCRONIA
======================
Mudança de versão: (template não ratificado) → 1.0.0
Justificativa: primeira ratificação de uma constituição concreta para o
  projeto LinkContas, derivada das regras já praticadas e documentadas no
  HANDOFF.md (o código existente continua sendo a referência de verdade).
Princípios definidos:
  I.   Preservar o conteúdo base (o site é o ativo)
  II.  Verificação obrigatória antes e depois (NÃO NEGOCIÁVEL)
  III. Fonte única + geradores (nunca editar HTML gerado sem regenerar)
  IV.  Design System único e versionado
  V.   Integrações de terceiros intocáveis
  VI.  Confiança: SEO, AdSense e privacidade do usuário
Seções adicionadas:
  - Restrições de segurança e privacidade
  - Fluxo de trabalho e gates de qualidade
  - Governança
Templates revisados para alinhamento:
  ✅ .specify/templates/spec-template.md — sem tokens de constituição; OK
  ✅ .specify/templates/plan-template.md — "Constitution Check" populado por I–VI
  ✅ .specify/templates/tasks-template.md — fases acomodam tarefas de verificação
Follow-ups: nenhum.
-->

# Constituição — LinkContas (Link Contas)

Site estático de centralização de **links oficiais** para contas de consumo
(luz, água, telefone, internet, consultas) + **40 guias práticos**. Esta
constituição é vinculante para **toda mudança** — funcional, de conteúdo, de
layout ou de script — e governa o plano de implementação de cada feature.

## Princípios

### I. Preservar o conteúdo base (o site é o ativo)

- **Nunca quebrar o site.** Toda rodada é "sem quebrar nada, sempre melhorando":
  corrigir bugs e evoluir, nunca reconstruir por reconstruir.
- O conteúdo existente (textos do usuário, FAQ, rodapé, aviso legal) é
  **preservado**; só muda com autorização explícita do mantenedor.
- Redesigns experimentais (ex.: novo hero) **não são reaplicados** sem perguntar.
- Escopo mínimo: a mudança entrega o pedido, sem "melhorias" não solicitadas.

### II. Verificação obrigatória antes e depois (NÃO NEGOCIÁVEL)

- **Antes do commit**: `python verificacoes/rodar-todos.py` deve sair com
  `Todos os gates passaram.` (exit 0). Os gates cobrem: JSON dos artigos +
  links internos, varredura geral (versões de cache, sitemap, schemas),
  JSON-LD válido, requisitos de qualidade AdSense e auditoria de repetição.
- **Layout/JS novo**: teste no servidor local
  (`python -m http.server 8749` na raiz) em desktop e 390px antes de subir.
- **Depois do push**: Pages com status `built` + conferência do conteúdo no ar.
- Se um gate falhar, conserta-se a mudança — **não se desliga o gate**.

### III. Fonte única + geradores

- Artigos: `dados-artigos.json` → `gerar-artigos.py` + `template-artigo.html`.
  Empresas: `dados-empresas-*.json` → `gerar-paginas-v3.py` +
  `template-pagina-empresa.html`.
- "Veja também" das páginas de empresa: `veja_tambem.py` é a fonte única.
- `artigos.html` (índice de guias) e páginas institucionais são **manuais**.
- Nunca editar à mão um HTML gerado sem atualizar a fonte e regenerar —
  a próxima regeneração apagaria a mudança.

### IV. Design System único e versionado

- `css/style.css` (Design System) e `css/pagina-empresa.css`; **bump de `?v=`**
  em toda mudança de CSS para invalidar cache (hoje: `style.css?v=27`,
  `pagina-empresa.css?v=3`).
- Paleta navy `#0f2c62` + azul `#2563eb`, tipografia Manrope/Inter, tema
  claro/escuro via `data-tema`; sem `style=` inline; responsivo a partir de 390px.

### V. Integrações de terceiros intocáveis

- GTM `GTM-KTZBMW3W`, GA4 `G-252SNCK2VK`, AdSense `ca-pub-2674220962143682`,
  Ezoic/CMP, FormSubmit, `ads.txt` e a chave Pix **não são alterados nem
  removidos** sem ordem direta do mantenedor — são monetização/medição.
- Scripts próprios: `js/dados.js`, `js/site.js`, `js/contador.js` (carregar
  com `defer` quando já carregarem assim).

### VI. Confiança: SEO, AdSense e privacidade do usuário

- Cada guia mantém: **fontes oficiais** (ANEEL, ANATEL, ANA, BCB,
  Consumidor.gov.br…), **data de verificação visível**, **selo de revisão
  editorial** e schemas `Article` + `FAQPage` + `BreadcrumbList` válidos.
- Variação de marca **"Link Contas" (com espaço)** presente on-page e em
  `alternateName` do schema Organization.
- Nada que viole as políticas do Google: conteúdo próprio e útil, sem
  keyword stuffing, sem cloaking, sem redirecionamento duvidoso.
- **Privacidade**: o site não pede nome, CPF, senha ou dados bancários; não
  gera nem recebe pagamentos; leva o usuário sempre ao site oficial.

## Restrições de segurança e privacidade

- Links apontam apenas para domínios oficiais das empresas; qualquer link
  novo de terceiro passa por revisão.
- Conteúdo de golpe/alerta (`alerta-golpe`) é obrigatório nos guias de
  pagamento — nunca orientar o usuário a pagar fora do site oficial.
- Dados de doação (chave Pix) são públicos por definição e não mudam de valor
  sem aviso.

## Fluxo de trabalho e gates de qualidade

- Mudança delimitada segue o fluxo SDD adaptado (ver `AGENTS.md`):
  **constituição → especificação → plano → tarefas → implementação → convergência**.
- Gates de qualidade: `verificacoes/rodar-todos.py` (pré-commit) e a checagem
  pós-deploy (Pages `built` + conteúdo no ar).
- Deploy = `git add -A && git commit && git push` na branch `main`
  (GitHub Pages). Working tree limpo após cada rodada.
- Especificações vivem em `.specify/specs/NNN-nome-da-feature/`.

## Governança

- Esta constituição prevalece sobre convenções avulsas onde conflitarem; os
  padrões do código existente continuam sendo referência.
- **Emendas**: alterar este documento exige justificativa escrita, aprovação
  do mantenedor, bump de versão e atualização do Relatório de Sinronia acima.
- **Versionamento (SemVer de governança)**: MAJOR = remoção/redefinição de
  princípio; MINOR = novo princípio/seção; PATCH = esclarecimentos.
- Violações de um "DEVE" são resolvidas mudando o plano/tarefa — nunca
  diluindo o princípio.

**Versão**: 1.0.0 | **Ratificada**: 2026-11-27 | **Última emenda**: —
