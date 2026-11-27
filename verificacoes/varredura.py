# -*- coding: utf-8 -*-
"""Varredura de consistência — LinkContas (era Etapa 3).
Checa: versões de cache/defer, favicon PNG, menu/rodapé Artigos,
'mojibake', marcas @@ sobrando, seção Veja também, links internos
quebrados, sitemap x arquivos, schemas dos artigos.
Uso: python varredura-etapa3.py   (imprime problemas; exit 1 se houver)
"""
import io, os, re, sys, glob, json

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
problemas = []
avisos = []

def ler(p):
    with io.open(p, encoding="utf-8", newline="") as f:
        return f.read()

htmls = sorted(glob.glob(os.path.join(ROOT, "*.html")))
raiz = [p for p in htmls if not os.path.basename(p).startswith("template-")]
templates = [p for p in htmls if os.path.basename(p).startswith("template-")]
empresa_pages = ["enel-sp","light","cemig","cpfl","edp","ceee","sabesp","copasa",
                 "cedae","sanepar","claro","vivo","tim","oi","gigamaisfibra","sky",
                 "algar","serasa","energisa","coelba","celpe","celesc","embasa","brisanet"]

print(f"HTMLs: {len(raiz)} na raiz + {len(templates)} templates")

for p in raiz:
    nome = os.path.basename(p)
    t = ler(p)

    # --- versões / defer ---
    if 'js/site.js?v=6" defer' not in t:
        problemas.append(f"{nome}: site.js sem v6/defer")
    if 'js/contador.js?v=2" defer' not in t:
        problemas.append(f"{nome}: contador.js sem defer")
    if 'js/dados.js?v=' in t and 'js/dados.js?v=3" defer' not in t:
        problemas.append(f"{nome}: dados.js sem v3/defer")
    if re.search(r'site\.js\?v=[^6]', t):
        problemas.append(f"{nome}: site.js com versao antiga")
    if 'css/style.css?v=27' not in t:
        problemas.append(f"{nome}: style.css sem v27")
    if 'css/pagina-empresa.css?v=3' not in t and 'pagina-empresa.css' in t:
        problemas.append(f"{nome}: pagina-empresa.css sem v3")

    # --- favicon PNG ---
    for icon in ("favicon-32.png", "favicon-48.png", "icon-192.png"):
        if icon not in t:
            problemas.append(f"{nome}: sem {icon}")

    # --- menu/rodapé Artigos ---
    if t.count('href="artigos.html"') < 2:
        problemas.append(f"{nome}: menos de 2 links para artigos.html")

    # --- marcas e mojibake ---
    if re.search(r"@@[A-Z]+@@", t):
        problemas.append(f"{nome}: marca @@ sobrando")
    for lixo in ("Ã§", "Ã£", "Ã©", "Äƒ", "â€", "ï¿½"):
        if lixo in t:
            problemas.append(f"{nome}: mojibake {lixo!r}")

    # --- canonical ---
    if 'rel="canonical"' not in t:
        avisos.append(f"{nome}: sem canonical")

    # --- links internos quebrados ---
    for href in re.findall(r'href="([^"#?]+\.html)[^"]*"', t):
        if href.startswith("http"):
            continue
        if not os.path.exists(os.path.join(ROOT, href)):
            problemas.append(f"{nome}: link quebrado -> {href}")

# --- Veja também nas 24 ---
for nome in empresa_pages:
    p = os.path.join(ROOT, nome + ".html")
    if not os.path.exists(p):
        problemas.append(f"{nome}.html: PAGINA AUSENTE")
        continue
    t = ler(p)
    if "lista-veja-tambem" not in t:
        problemas.append(f"{nome}.html: sem secao Veja também")
    if "<h2>Veja também</h2>" not in t:
        problemas.append(f"{nome}.html: sem h2 Veja também")

# --- templates com as marcas do gerador ---
tpl = ler(os.path.join(ROOT, "template-pagina-empresa.html"))
for marca in ("@@VEJATAMBEM@@", "@@FAQSHTML@@", "@@INTRO@@"):
    if marca not in tpl:
        problemas.append(f"template-pagina-empresa: sem {marca}")
if 'site.js?v=6" defer' not in tpl:
    problemas.append("template-pagina-empresa: site.js sem v6/defer")

# --- sitemap x arquivos ---
sm = ler(os.path.join(ROOT, "sitemap.xml"))
locs = re.findall(r"<loc>(https://linkcontas\.com\.br/[^<]*)</loc>", sm)
for loc in locs:
    caminho = loc.replace("https://linkcontas.com.br/", "").strip() or "index.html"
    if caminho.endswith("/"):
        caminho += "index.html"
    if not os.path.exists(os.path.join(ROOT, caminho)):
        problemas.append(f"sitemap aponta para arquivo inexistente: {caminho}")
print(f"sitemap: {len(locs)} URLs")

# --- artigos: schema FAQPage + breadcrumb ---
for art in ("como-tirar-2-via-conta-de-luz", "como-pagar-conta-de-luz-atrasada",
            "como-contestar-conta-de-luz",
            "como-transferir-conta-de-luz-para-outro-nome", "artigos"):
    p = os.path.join(ROOT, art + ".html")
    if not os.path.exists(p):
        problemas.append(f"{art}.html: AUSENTE")
        continue
    t = ler(p)
    if "FAQPage" not in t and art != "artigos":
        problemas.append(f"{art}.html: sem FAQPage")
    if "BreadcrumbList" not in t:
        avisos.append(f"{art}.html: sem BreadcrumbList")

# --- assets essenciais ---
for a in ("og.png", "favicon-32.png", "favicon-48.png", "icon-192.png",
          "icon-512.png", "favicon.svg", "manifest.webmanifest",
          "js/site.js", "js/contador.js", "js/dados.js",
          "css/style.css", "css/pagina-empresa.css", "veja_tambem.py"):
    if not os.path.exists(os.path.join(ROOT, a)):
        problemas.append(f"asset ausente: {a}")

# --- site.js: alt nos logos ---
sj = ler(os.path.join(ROOT, "js", "site.js"))
if 'alt="Logo da ' not in sj:
    problemas.append("js/site.js: sem alt nos logos dos cards")

# --- resultado ---
print()
for a in avisos:
    print("AVISO:", a)
if problemas:
    print(f"\n*** {len(problemas)} PROBLEMAS ***")
    for x in problemas:
        print(" -", x)
    sys.exit(1)
print("NENHUM problema encontrado.")
