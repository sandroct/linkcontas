# -*- coding: utf-8 -*-
"""Verificacao pos-geracao: links internos dos artigos + integridade do JSON."""
import glob
import io
import json
import os
import re

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

with io.open(os.path.join(BASE, "dados-artigos.json"), encoding="utf-8") as fh:
    dados = json.load(fh)
print("JSON ok, artigos:", len(dados))

arqs = set(os.path.basename(p) for p in glob.glob(os.path.join(BASE, "*.html")))
arts = glob.glob(os.path.join(BASE, "como-*.html"))
quebrados = []
marcadores = []
for f in arts:
    txt = io.open(f, encoding="utf-8").read()
    if re.search(r"@@[A-Z]+@@", txt):
        marcadores.append(os.path.basename(f))
    for h in re.findall(r'href="([^"]+)"', txt):
        if h.startswith(("http", "mailto:", "#")):
            continue
        alvo = h.split("#")[0].split("?")[0]  # ignora cache-bust ?v=N
        if not alvo:
            continue
        caminho = os.path.join(BASE, alvo.replace("/", os.sep))
        if not os.path.exists(caminho):
            quebrados.append((os.path.basename(f), h))

print("marcadores sobrando:", marcadores)
print("links quebrados:", len(quebrados))
for b in quebrados:
    print("  ", b)

# checa estrutura de cada artigo novo
faltando = []
for a in dados:
    for k in ("intro", "secoes", "faqs", "vejaTambem"):
        if not a.get(k):
            faltando.append((a["id"], k))
    if len(a.get("faqs", [])) < 4:
        faltando.append((a["id"], "poucas faqs"))
print("estrutura incompleta:", faltando)

import sys
if quebrados or marcadores or faltando:
    sys.exit(1)
