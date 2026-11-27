# Plano de Implementação: [FEATURE]

**Branch**: `NNN-nome-da-feature` | **Data**: [DATA] | **Spec**: [link]

**Input**: Especificação em `.specify/specs/NNN-nome-da-feature/spec.md`

**Nota**: este modelo é preenchido pelo comando/plano da feature; a definição
descreve o fluxo de execução.

## Resumo

[Extrair da spec: requisito principal + abordagem técnica, com a pesquisa
correspondente]

## Contexto técnico

<!-- Substitua pelos detalhes reais do projeto. Estrutura apenas indicativa. -->

**Linguagem/versão**: HTML5 + CSS3 + JavaScript (ES6) estático · scripts de
geração em Python 3.11 (sem framework)

**Dependências primárias**: nenhuma de runtime no browser (Google Fonts via
`<link>`; GTM/AdSense/Ezoic já integrados — não tocar)

**Armazenamento**: N/A (dados em JSON versionados: `dados-artigos.json`,
`dados-empresas-*.json`, `js/dados.js`)

**Testes**: `python verificacoes/rodar-todos.py` (5 gates) + teste manual no
servidor local `python -m http.server 8749` (desktop + 390px) +
checagem pós-deploy no ar

**Plataforma alvo**: GitHub Pages (`https://linkcontas.com.br/`), navegadores
modernos mobile-first

**Tipo de projeto**: site estático gerado (páginas de empresa e artigos por
template; institucionais manuais)

**Metas de performance**: LCP rápido em 4G; logos otimizados (já -74% na
Etapa 3); `defer` nos scripts; imagens SVG/PNG com `loading="lazy"`

**Restrições**: não alterar integrações de terceiros (Art. V); preservar
conteúdo base (Art. I); URLs indexadas não mudam; bump de `?v=` em CSS/JS
alterado

**Escala/escopo**: 72 HTMLs publicados, 72 URLs no sitemap, 40 guias gerados,
~30 páginas de empresa

## Constitution Check

*GATE: precisa passar antes da pesquisa/fase 0. Rever após o desenho (fase 1).*

- [ ] **Art. I — Conteúdo base**: a mudança preserva textos/estrutura existente
      e não reconstrói o que já funciona? Redesign só se pedido?
- [ ] **Art. II — Verificação**: os gates `verificacoes/rodar-todos.py` cobrem
      esta mudança (serão atualizados se nascer algo novo)? Plano inclui teste
      local e checagem pós-deploy?
- [ ] **Art. III — Fonte única**: a mudança mexe na fonte certa (JSON/gerador)
      em vez de editar HTML gerado à mão? Regeneração prevista?
- [ ] **Art. IV — Design System**: estilos novos seguem as classes/variáveis
      existentes, sem `style=` inline? Bump de `?v=` previsto?
- [ ] **Art. V — Terceiros**: nenhuma integração (GTM/AdSense/Ezoic/CMP/
      FormSubmit/ads.txt/Pix) é tocada?
- [ ] **Art. VI — Confiança/SEO**: schemas continuam válidos, datas/fontes de
      verificação mantidas, marca "Link Contas" preservada?

**Resultado**: [PASSOU | VIOLAÇÕES justificadas abaixo]

## Estrutura do projeto

### Documentação (esta feature)

```text
.specify/specs/NNN-nome-da-feature/
├── plan.md              # este arquivo
├── research.md          # fase 0 (se houver)
├── data-model.md        # fase 1 (se mexer em dados)
├── quickstart.md        # cenários de validação
├── contracts/           # fase 1 (se houver)
└── tasks.md             # fase 2 (gerado depois)
```

### Código-fonte (raiz do repositório)

```text
index.html                 # home (manual)
artigos.html               # hub de guias (manual)
sobre.html / faq.html / ... # institucionais (manuais)
como-*.html                # guias gerados (NÃO editar à mão)
<empresa>.html             # páginas de empresa geradas (NÃO editar à mão)
template-*.html            # templates dos geradores (EDITÁVEIS)
dados-artigos.json         # fonte dos guias
dados-empresas-*.json      # fonte das empresas
veja_tambem.py             # fonte única do "Veja também"
gerar-artigos.py           # gerador de guias
gerar-paginas-v3.py        # gerador de páginas de empresa
css/style.css              # Design System (bump ?v=)
css/pagina-empresa.css     # páginas internas (bump ?v=)
js/dados.js · js/site.js · js/contador.js
verificacoes/*.py          # gates de qualidade
assets/artigos/*.svg       # ilustrações por categoria
sitemap.xml · robots.txt · ads.txt
```

**Decisão de estrutura**: [qual estrutura foi escolhida e por que, referindo
os caminhos reais acima]

## Rastreabilidade

| Requisito | Onde será implementado | Como será testado |
|---|---|---|
| FR-001 | [arquivo] | [gate/verificação] |
| SC-001 | [arquivo] | [gate/verificação] |

## Registro de complexidade

> Preencher **APENAS** se o Constitution Check tiver violações a justificar.

| Violação | Por que é necessário | Alternativa mais simples rejeitada porque |
|---|---|---|
| [ex.: editar HTML gerado] | [necessidade atual] | [por que regenerar não bastou] |
