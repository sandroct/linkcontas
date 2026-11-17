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
- **Enter na busca → rolar até o card (novo)**: `irParaPrimeiroCard()` em `site.js` — ao dar Enter no campo de busca, se houver resultado a página alinha o primeiro card 24px abaixo do header (`scrollTo` suave, respeita `prefers-reduced-motion`, não rola se o card já está confortavelmente visível) e aplica `.card-destaque` por 2,4s (anel azul + `card-pisca`). Sem resultado: não rola. Testado: Enel/Vivo/Sabesp/CEMIG rolam e destacam; "zzz" não rola; card já visível não pula.
- **Filtro por multi-categoria (novo)**: campo opcional `categorias` (array) em `dados.js` — a empresa aparece na categoria principal **e** nas secundárias. Aplicado: Claro, Vivo, TIM, Oi (`telefone` + `internet`) e Algar Telecom (`internet` + `telefone`). Resultado: "Telefone e celular" = 5 empresas, "Internet e TV" = 7 (antes 4 e 3). `filtrarEmpresas()` usa `empresaNaCategoria()` e `renderSobreCategorias()` (página Sobre) usa a mesma lógica — números batem entre catálogo e Sobre.

### Páginas institucionais
- `index.html`, `sobre.html`, `contato.html`, `faq.html`, `termos.html`, `privacidade.html`: charset único, 0 estilos inline (exceto honeypot do contato), âncoras `index.html#...`, `<main id="conteudo">`.
- **Nova página `doacao.html`**: hero "Doação", bloco Pix (chave + botão copiar com fallback `execCommand`), "Como doar em 3 passos", "Para que serve sua doação" (3 cards), FAQ com 5 itens (`<details>`), link "Doação" no rodapé próprio, canonical/OG próprios, assets `style.css?v=24` + `site.js?v=4`.
- **Link "Doação" adicionado à coluna Links do rodapé das 25 páginas restantes** (script `add-link-doacao.py`).
- **Link "Doação" também no menu do topo** das 26 páginas: nav desktop (`nav-principal`, com `nav-link`) e menu mobile (`menu-mobile`) — script `add-menu-doacao.py`; em `doacao.html` o item entra marcado como `ativo`. Testado em 1280px (7 itens, folga de 152px), 900px (limite onde a nav aparece; folga de 25px, sem transbordo) e <900px (nav esconde, hambúrguer mostra).
- `sitemap.xml`: `<loc>https://linkcontas.com.br/doacao.html</loc>` inserido (agora 25 locs).

### Rolagem e filtros (QA feito no navegador)
- Categoria "Água e esgoto": 4 empresas, lista para em `top:84`; Estado "Minas Gerais": 2 empresas (CEMIG, Copasa), `top:84`; com lista já alinhada não pula.
- Favoritos: clicar coração → `.ativo` + `aria-pressed=true` + `localStorage ["enel"]` + SVG `rgb(225,29,72)`; chip "Favoritos 4" → lista só com os 4; desfavoritar com filtro ativo atualiza; combinação com categoria → estado vazio correto; "Limpar filtros" restaura tudo (18 empresas, chip inativo, estado vazio oculto).
- `doacao.html`: título/h1/chave Pix corretos, 5 FAQ, 3 passos, botão copiar mostra "Copiado!" por 2s, navegação rodapé (faq → doacao) OK.
- Mobile 390px (iframe): chip favoritos 160px dentro da tela, `min-height` 44px, chips com `wrap`; card/tag/h3 OK.
- Tema escuro do chip ativo: fundo `#fb7185` + texto `#0f172a` (override aplicado — branco sobre rosa claro tinha contraste fraco); tema claro de volta restaurado no localStorage de teste.
- Varredura final (`varredura-final.py`, agora checa `?v=24`/`?v=4`, link de doação no rodapé e `doacao.html` no sitemap): **NENHUM problema** (aviso "sitemap sem index" é falso positivo — home está como `/`).

### Versionamento de cache
- `css/style.css?v=24`, `js/site.js?v=5`, `dados.js?v=2`, `contador.js?v=2`, `pagina-empresa.css?v=1` em todas as 26 páginas (scripts `bump-v.py` / `bump-v24.py` / `bump2.py`). `v=24` inclui override de contraste do chip no tema escuro; `site.js?v=5` + `dados.js?v=2` trazem o Enter na busca e o multi-filtro. Só 5 páginas carregam `dados.js` (index, sobre, contato, faq, doacao) — as de empresa são estáticas.

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
- Commit `cd136d9` — "Menu do topo: adiciona link Doacao (desktop + mobile) em todas as paginas". Verificado ao vivo: nav com 7 itens em `/`, `/faq.html` e `/doacao.html`; em `doacao.html` o item entra com `nav-link ativo`.
- Para publicar mudanças futuras: `git add -A && git commit -m "..." && git push` (Pages redesenha sozinho).

## 💰 Google AdSense (15/11/2026)
- Snippet instalado no `<head>` das **26 páginas** (após o GTM), conta `ca-pub-2674220962143682` — scripts `add-adsense.py` e `fix-adsense-id.py`. Verificado: o loader do AdSense (`show_ads_impl_fy2021.js`) é puxado, cards continuam funcionando.
- ⚠️ **ID corrigido:** a conta correta é `pub-2674220962143682` (16 dígitos) — confirmado pela URL do painel (`.../u/0/pub-2674220962143682/sites/detail/url=linkcontas.com.br`), pela linha de ads.txt do painel e pelo snippet. O `ads.txt` original (commit `732df0a`, 13/11) tinha um dígito a mais (`pub-26774220962143682`) e esse erro foi propagado ao snippet. Corrigido nos 26 HTMLs + ads.txt (script `fix-adsense-id.py`).
- `ads.txt` **já estava publicado** (`google.com, pub-2674220962143682, DIRECT, f08c47fec0942fa0`) — o painel marcava "Não encontrado" só porque o robô ainda não tinha relido (leva até 48h após o deploy do arquivo).
- **Verificação concluída (15/11/2026 17h10):** painel mostra ✅ "Verifique a propriedade do site" + ✅ "Revisão solicitada" — o site entrou na fila de análise (prazo informado pelo Google: 2 dias a 4 semanas; aviso por e-mail quando aprovar). Próximo passo do usuário: preencher **Pagamentos** (banco/Pix + CPF/CNPJ) para não travar o primeiro pagamento; depois da aprovação, atentar ao PIN pelos correios.
- README corrigido: o texto antigo citava `div.ad-placeholder` que **nunca existiram** no HTML; agora documenta o snippet real.
- Varredura final passa a exigir `ca-pub-26774220962143682` em toda página.

## 🔎 SEO — expansão (16/11/2026)
- **6 novas empresas publicadas** (`dados-empresas-4.json` + `gerar-paginas-v3.py`): **Energisa**, **Neoenergia Coelba** (BA), **Neoenergia Celpe** (PE), **Celesc** (SC), **Embasa** (BA), **Brisanet** (Nordeste). URLs e telefones verificados em fontes oficiais (ANEEL, sites das empresas). Catálogo: **24 empresas** (era 18); sitemap com **31 URLs**.
- Filtros atualizados: Energia 10, Água 5, Internet e TV 8, Telefone 6. Energisa aparece nos 9 estados que atende (filtro por estado de MG mostra CEMIG + Copasa + Energisa); Brisanet entra em Internet e Telefone.
- Gerador atualizado: injeta `FAQPage` automaticamente nas regenerações.
- Faltou no 1º write do JSON os campos `telefone`/`whatsapp` — corrigido (`fix-json4.py`); as 6 páginas mostram os canais oficiais.
- `dados.js?v=3` (novo catálogo). Páginas antigas regeneradas (data "verificado em" passou para 16/11/2026).
- Obs: dados originais têm acentos faltando em alguns textos (ex.: "conta de agua", "pendencias") — mantido fiel à fonte; revisar quando o usuário quiser.

## ✍️ SEO — artigos "como fazer" (etapa 2 — 16/11/2026)
- **4 artigos publicados** (long-tail, público idoso/iniciante):
  1. `como-tirar-2-via-conta-de-luz.html` — "Como tirar a 2ª via da conta de luz pela internet"
  2. `como-pagar-conta-de-luz-atrasada.html` — "Como pagar a conta de luz atrasada sem cortar a energia"
  3. `como-contestar-conta-de-luz.html` — "Como contestar uma conta de luz alta ou errada"
  4. `como-transferir-conta-de-luz-para-outro-nome.html` — "Como transferir a conta de luz para o nome de outra pessoa"
- Infra nova: `dados-artigos.json` (fonte), `gerar-artigos.py` (gerador com FAQPage automático), `template-artigo.html` (head/header/footer idênticos ao site), `artigos.html` (índice, schema CollectionPage).
- **Links internos**: rodapé "Artigos" em **todas** as 38 páginas; seção "Artigos" na home (4 cards estáticos); bloco "Veja também" em cada artigo (cross-links artigo↔artigo↔páginas de empresa); breadcrumb Início > Artigos > página.
- Cada artigo: H1 + 5–6 H2s + 5 FAQs com **FAQPage schema** (JSON validado no navegador) + BreadcrumbList de 3 níveis.
- `css/style.css` → **v25** (novas classes `.logo-azul`, `.secao-nota` — sem `style=` inline; varredura zera). Sitemap: **36 URLs** (índice + 4 artigos).
- Bugs corrigidos no caminho: `<title>` duplicado no template de artigo; caractere cirílico "о" infiltrado no JSON; `2²`→`2ª` no título do índice; placeholder `@@ARQUIVO@@` no og:url do índice.
- **Menu superior com "Artigos"** (desktop + mobile, 38 páginas; `ativo` nas 5 páginas de artigo). `style.css` → **v26**: fix do botão "Ler artigo" invisível (regra `.artigo a` pintava o link de azul por cima do branco — `:not(.btn-acessar)` no `pagina-empresa.css`, v2) + media query 900–1120px para o menu de 8 itens não apertar.

## 📋 Próximos passos / pendências
1. ~~README.md — estrutura atualizada~~ ✅ **Feito**.
2. ~~Página de doação própria + link no rodapé~~ ✅ **Feito**: `doacao.html` criada, link nas 26 páginas, no sitemap e testada.
3. ~~Filtro de favoritos~~ ✅ **Feito**: chip "Favoritos" com contador, combinável, testado desktop + 390px.
4. ~~Teste de subida real em produção~~ ✅ **Feito** (15/11): commit `0da4916` pushado, Pages `built`, todas as URLs 200, home testada no navegador. Restam apenas: registrar/posicionar `doacao.html` no **Search Console** e conferir GTM/GA4/Ezoic recebendo dados do domínio real.
5. ~~Arquivo solto `C:\Users\Alessandro\Documents\PROJETOS\enel-sp.html`~~ ✅ **Feito**: era um arquivo **vazio (0 bytes)** de 13/11/2026, excluído; a página real do projeto (`pague-facil/enel-sp.html`, 17 KB) foi preservada.
6. Decidir sobre scripts legados (`gerar-paginas-v2.ps1`, `validar*.ps1`, `patch-html*.ps1`) — mantidos por segurança, podem ser apagados com autorização.
7. Conteúdo com acentos faltando nos JSONs originais (ex.: FAQ "Este site e a Light?") — é texto do usuário, não alterado.
8. Considerar melhorias: PWA service worker, Schema.org FAQPage em `faq.html`/`doacao.html` (páginas de empresa **e artigos** já têm), Lighthouse/SEO. **Etapa 3 do plano SEO**: velocidade (comprimir logos, lazy-load, defer) + alt nos logos + mais links "Veja também" nas páginas de empresa.
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
| `css/style.css` | Design System v3 — **v25** (cards, doações, favoritos, `.logo-azul`, `.secao-nota`) |
| `css/pagina-empresa.css` | Estilos do artigo (completo) |
| `js/site.js` | **v5** — cards/favoritos/filtros/rolarParaLista/Enter-na-busca |
| `doacao.html` | Página de doação (Pix + 3 passos + FAQ), link no rodapé de todas as páginas |
| `gerar-paginas-v3.py` + `template-pagina-empresa.html` | Regeneração das páginas de empresa (22) |
| `gerar-artigos.py` + `template-artigo.html` + `dados-artigos.json` | Regeneração dos 4 artigos + `artigos.html` (índice) |
| `dados-empresas-1/2/3/4.json` | Fonte dos dados das empresas |
| `HANDOFF.md` | Este documento |
| `index.html` | Home (limpa) |
| `enel-sp.html`, `copasa.html` | Manuais (corrigidos) |

## 🛠️ Scripts de apoio (temp — fora do projeto)
| Script | Função |
|---|---|
| `bump-v.py` / `bump-v24.py` | Bump de cache-bust em todas as páginas (último: v24/v4) |
| `add-link-doacao.py` | Insere `<li>Doação</li>` na coluna Links do rodapé |
| `varredura-final.py` | Varredura de consistência (mojibake, versões, doações, rodapé, sitemap) |
