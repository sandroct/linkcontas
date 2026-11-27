# -*- coding: utf-8 -*-
"""Checagem final da rodada AdSense: figuras, fontes, schema, secoes novas."""
import glob
import io
import json
import os
import re

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
erros = []

# 1. assets SVG existem
for c in ("energia", "agua", "telecom", "consultas"):
    p = os.path.join(BASE, "assets", "artigos", c + ".svg")
    if not os.path.exists(p):
        erros.append("asset ausente: " + p)

# 2. contagem de Article schema
arts = [f for f in glob.glob(os.path.join(BASE, "*.html"))
        if os.path.basename(f) not in ("template-artigo.html", "template-pagina-empresa.html")]
com_artigo_schema = 0
for f in arts:
    t = io.open(f, encoding="utf-8").read()
    if '"@type": "Article"' in t:
        com_artigo_schema += 1

# 3. so artigos (dados-artigos.json) precisam de figura+fontes+Article
with io.open(os.path.join(BASE, "dados-artigos.json"), encoding="utf-8") as fh:
    dados = json.load(fh)
for a in dados:
    t = io.open(os.path.join(BASE, a["arquivo"]), encoding="utf-8").read()
    for marca, label in (("artigo-figura", "figura"), ("fontes-lista", "fontes"),
                         ('"@type": "Article"', "Article schema"),
                         ("Revisão editorial", "selo revisao")):
        if marca not in t:
            erros.append(a["arquivo"] + ": sem " + label)
    m = re.search(r'<img src="(assets/artigos/[^"]+)"', t)
    if not m or not os.path.exists(os.path.join(BASE, m.group(1))):
        erros.append(a["arquivo"] + ": img com caminho invalido")

# 4. secoes novas
idx = io.open(os.path.join(BASE, "index.html"), encoding="utf-8").read()
if "Conteúdo revisado, com fonte e data" not in idx:
    erros.append("index.html: secao editorial ausente")
sob = io.open(os.path.join(BASE, "sobre.html"), encoding="utf-8").read()
if "metodologia editorial" not in sob.lower() and "Como produzimos e revisamos" not in sob:
    erros.append("sobre.html: metodologia ausente")
hub = io.open(os.path.join(BASE, "artigos.html"), encoding="utf-8").read()
if "metodologia editorial" not in hub:
    erros.append("artigos.html: nota de curadoria ausente")

# 5. nenhum placeholder sobrando fora dos templates
for f in glob.glob(os.path.join(BASE, "*.html")):
    if os.path.basename(f).startswith("template-"):
        continue
    if re.search(r"@@[A-Z]+@@", io.open(f, encoding="utf-8").read()):
        erros.append(os.path.basename(f) + ": placeholder sobrando")

print("artigos com Article schema:", com_artigo_schema, "/", len(arts))
print("ERROS:", erros if erros else "nenhum")
