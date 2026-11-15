# HANDOFF — LinkContas (pague-facil)

> Documento de progresso para continuidade entre sessões de agente.
> **Atualizado em: 15/11/2026 (rodada 3)**

## 🎯 Objetivo
Deixar o site LinkContas elegante, profissional, funcional e responsivo (mobile + desktop), preservando a base/conteúdo existente (sem reconstruir do zero).

## ✅ O que foi feito (concluído)

### Auditoria
- Auditoria completa das 24 páginas + CSS/JS/JSON/scripts/ativos; todos os bugs identificados e corrigidos.

### Design System
- `css/style.css` reescrito (Design System v3): marca navy `#0f2c62` + azul `#2563eb`, Manrope (títulos) + Inter (corpo), tema claro/escuro via `data-tema="escuro"`, classes institucionais, `#msg-contato.sucesso/.erro`, `.estado-card.ativo`, `.header.sombra`, responsivo + `prefers-reduced-motion`.
- Correções de card: `.categoria-tag` em fluxo normal (era `absolute` e cobria o nome), `h3` com `-webkit-line-clamp: 2` + `overflow-wrap: anywhere` (nomes completos: "Enel Distribuição", "CEEE Equatorial", "CPFL Energia").
- Doações deduplicadas: só a seção `#doacoes` dedicada; coluna do rodapé, `.footer-pix`, `.footer-dica` e `btn-copiar-doacao-rodape` removidos (CSS órfão apagado).
- Novo: `.chip-favoritos` (coração preenchido, tom vermelho `--cor-perigo`), `.chip-contagem` (badge do contador de favoritos).

### Páginas de empresa
- 16 páginas regeneradas com encoding limpo a partir de `dados-empresas-*.json` via **`gerar-paginas-v3.py`** + **`template-pagina-empresa.html`** (UTF-8 externo — PowerShell 5.1 lê .ps1 como ANSI e causa mojibake): light, cemig, cpfl, edp, ceee, sabesp, cedae, claro, vivo, tim, oi, gigamaisfibra, sky, algar, sanepar, serasa.
- `enel-sp.html` e `copasa.html` são manuais (fora da regeneração): corrigidos com `corrigir-manuais.py`.
- Verificado: zero mojibake, zero marcadores `@@`, `pagina-empresa.css` vinculado em todas.

### JS (`js/site.js` v4)
- Cards com `.card-header`, `.btn-favorito` (`.ativo`, `aria-pressed`, salvo em `lc-favoritos`), sigla do logo como fallback, guarda do contador, `renderSobreCategorias()`.
- **`rolarParaLista()`**: ao clicar em chip de categoria ou card de estado, a página rola suave até `#grid-empresas` parando em `top: 84px` (abaixo do header fixo); **não rola** se a lista já está visível; respeita `prefers-reduced-motion`.
- **Filtro de favoritos (novo)**: chip "Favoritos" (com badge de contagem) em `#categorias-lista`; liga/desliga `soFavoritos` de forma **independente** — combina com categoria/estado/busca; `filtrarEmpresas()` inclui `matchFav`; estado vazio próprio ("Nenhuma empresa favoritada — Toque no coração…"); `toggleFavorito()` re-renderiza lista + chip; `haFiltroAtivo()` centraliza a visibilidade do "Limpar filtros".

### Páginas institucionais
- `index.html`, `sobre.html`, `contato.html`, `faq.html`, `termos.html`, `privacidade.html`: charset único, 0 estilos inline (exceto honeypot do contato), âncoras `index.html#...`, `<main id="conteudo">`.
- **Nova página `doacao.html`**: hero "Doação", bloco Pix (chave + botão copiar com fallback `execCommand`), "Como doar em 3 passos", "Para que serve sua doação" (3 cards), FAQ com 5 itens (`<details>`), link "Doação" no rodapé próprio, canonical/OG próprios, assets `style.css?v=24` + `site.js?v=4`.
- **Link "Doação" adicionado à coluna Links do rodapé das 25 páginas restantes** (script `add-link-doacao.py`).
- `sitemap.xml`: `<loc>https://linkcontas.com.br/doacao.html</loc>` inserido (agora 25 locs).

### Rolagem e filtros (QA feito no navegador)
- Categoria "Água e esgoto": 4 empresas, lista para em `top:84`; Estado "Minas Gerais": 2 empresas (CEMIG, Copasa), `top:84`; com lista já alinhada não pula.
- Favoritos: clicar coração → `.ativo` + `aria-pressed=true` + `localStorage ["enel"]` + SVG `rgb(225,29,72)`; chip "Favoritos 4" → lista só com os 4; desfavoritar com filtro ativo atualiza; combinação com categoria → estado vazio correto; "Limpar filtros" restaura tudo (18 empresas, chip inativo, estado vazio oculto).
- `doacao.html`: título/h1/chave Pix corretos, 5 FAQ, 3 passos, botão copiar mostra "Copiado!" por 2s, navegação rodapé (faq → doacao) OK.
- Mobile 390px (iframe): chip favoritos 160px dentro da tela, `min-height` 44px, chips com `wrap`; card/tag/h3 OK.
- Tema escuro do chip ativo: fundo `#fb7185` + texto `#0f172a` (override aplicado — branco sobre rosa claro tinha contraste fraco); tema claro de volta restaurado no localStorage de teste.
- Varredura final (`varredura-final.py`, agora checa `?v=24`/`?v=4`, link de doação no rodapé e `doacao.html` no sitemap): **NENHUM problema** (aviso "sitemap sem index" é falso positivo — home está como `/`).

### Versionamento de cache
- `css/style.css?v=24`, `js/site.js?v=4`, `dados.js?v=1`, `contador.js?v=2`, `pagina-empresa.css?v=1` em todas as 26 páginas (scripts `bump-v.py` / `bump-v24.py`). `v=24` foi necessário porque o CSS do chip de favoritos mudou após o bump `v=23`; inclui override de contraste do chip no tema escuro.

## 🚀 Publicação (15/11/2026)
- **Repositório:** `https://github.com/sandroct/linkcontas` (branch `main`) — **é um repo Git**, o commit anterior estava desatualizado.
- **Deploy:** GitHub Pages (build_type `legacy`, origem `main` `/`) → `https://linkcontas.com.br/` (CNAME próprio, HTTPS com certificado aprovado até 10/02/2027, `https_enforced`).
- **Commit `0da4916`** — "Redesign profissional + pagina Doacao + filtro de favoritos + FAQ" (36 arquivos). Destaques:
  - **Corrigia o repositório faltando**: `js/site.js`, `js/dados.js` e `faq.html` só existiam no disco — o site publicado estava sem o JS novo e sem a FAQ.
  - Adicionados: `doacao.html`, `HANDOFF.md`, `gerar-paginas-v3.py`, `template-pagina-empresa.html`.
  - `.gitignore` agora também ignora `gerar-paginas-v2.ps1` (legado, junto dos outros `.ps1`).
- **Build do Pages:** `building` → `built` em ~20s após o push.
- **Verificação em produção (tudo 200):** `/`, `/doacao.html`, `/faq.html`, `/js/site.js?v=4`, `/js/dados.js?v=1`, `/css/style.css?v=24`, `/sitemap.xml` (25 locs, com `doacao.html`), `robots.txt` apontando o sitemap.
- **Home ao vivo no navegador:** 18 cards, 7 chips (com "Favoritos"), 6 estados, 1 seção de doações, 0 `footer-pix`, 0 `relogio.js`, refs `?v=24`/`?v=4` corretas.
- **Search Console:** commit `70bdc34` adicionou `<meta name="google-site-verification" content="j3rjgHZNuehynatbYQonLwtoq1iP-rOb8rMxxd1Ca2Y">` no `<head>` de `index.html` (método HTML tag, enviado pelo Google). Confirmado ao vivo em `https://linkcontas.com.br/`. Falta o usuário clicar em **Verificar** no painel do Search Console e depois enviar o sitemap.
- Para publicar mudanças futuras: `git add -A && git commit -m "..." && git push` (Pages redesenha sozinho).

## 📋 Próximos passos / pendências
1. ~~README.md — estrutura atualizada~~ ✅ **Feito**.
2. ~~Página de doação própria + link no rodapé~~ ✅ **Feito**: `doacao.html` criada, link nas 26 páginas, no sitemap e testada.
3. ~~Filtro de favoritos~~ ✅ **Feito**: chip "Favoritos" com contador, combinável, testado desktop + 390px.
4. ~~Teste de subida real em produção~~ ✅ **Feito** (15/11): commit `0da4916` pushado, Pages `built`, todas as URLs 200, home testada no navegador. Restam apenas: registrar/posicionar `doacao.html` no **Search Console** e conferir GTM/GA4/Ezoic recebendo dados do domínio real.
5. ~~Arquivo solto `C:\Users\Alessandro\Documents\PROJETOS\enel-sp.html`~~ ✅ **Feito**: era um arquivo **vazio (0 bytes)** de 13/11/2026, excluído; a página real do projeto (`pague-facil/enel-sp.html`, 17 KB) foi preservada.
6. Decidir sobre scripts legados (`gerar-paginas-v2.ps1`, `validar*.ps1`, `patch-html*.ps1`) — mantidos por segurança, podem ser apagados com autorização.
7. Conteúdo com acentos faltando nos JSONs originais (ex.: FAQ "Este site e a Light?") — é texto do usuário, não alterado.
8. Considerar melhorias: PWA service worker, Schema.org FAQPage (faq.html e doacao.html), Lighthouse/SEO.
9. Talvez exibir a contagem de favoritos no chip mesmo quando 0 (hoje some o badge, texto continua "Favoritos").

## ⚠️ Notas importantes
- Python 3.11: `C:\Users\Alessandro\AppData\Local\Programs\Python\Python311\python.exe`; só PowerShell 5.1 (sem pwsh/node). Trabalhar UTF-8 sempre via Python.
- Integrações mantidas: GTM `GTM-KTZBMW3W`, GA4 `G-252SNCK2VK`, Ezoic (erros 400 locais são esperados), FormSubmit → alessandrobr2012@gmail.com, Pix `a5dccde0-8045-4dbd-89b4-905b4e44701c`.
- Domínio canônico `https://linkcontas.com.br/`; **é o repositório git** `github.com/sandroct/linkcontas` (branch `main` = publicação via GitHub Pages). Mantendo o working tree limpo após cada rodada: `git add -A && git commit && git push`.
- Servidor local de teste: porta 8749 (background) na pasta do projeto.
- Tema do navegador de teste está "claro" no localStorage.

## 📁 Arquivos-chave
| Arquivo | Papel |
|---|---|
| `css/style.css` | Design System v3 — **v24** (cards, doações, chip favoritos) |
| `css/pagina-empresa.css` | Estilos do artigo (completo) |
| `js/site.js` | **v4** — cards/favoritos/**filtro de favoritos**/rolarParaLista/sobre-categorias |
| `doacao.html` | Página de doação (Pix + 3 passos + FAQ), link no rodapé de todas as páginas |
| `gerar-paginas-v3.py` + `template-pagina-empresa.html` | Regeneração das 16 páginas |
| `dados-empresas-1/2/3.json` | Fonte dos dados |
| `HANDOFF.md` | Este documento |
| `index.html` | Home (limpa) |
| `enel-sp.html`, `copasa.html` | Manuais (corrigidos) |

## 🛠️ Scripts de apoio (temp — fora do projeto)
| Script | Função |
|---|---|
| `bump-v.py` / `bump-v24.py` | Bump de cache-bust em todas as páginas (último: v24/v4) |
| `add-link-doacao.py` | Insere `<li>Doação</li>` na coluna Links do rodapé |
| `varredura-final.py` | Varredura de consistência (mojibake, versões, doações, rodapé, sitemap) |
