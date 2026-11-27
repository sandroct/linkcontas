# -*- coding: utf-8 -*-
"""Auditoria de conteúdo: sinais que um revisor do AdSense veria."""
import io
import glob
import os
import re
import collections

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

faq_site = 0
faq_tot = 0
imgs = 0
autoria = 0
alvo = 0
for f in glob.glob(os.path.join(BASE, "*.html")):
    t = io.open(f, encoding="utf-8").read()
    faq_site += t.count("Este site")
    faq_tot += len(re.findall(r"<details", t))
    imgs += len(re.findall(r"<img", t))
    if "Revisado" in t or "autor" in t.lower():
        autoria += 1
    if "alerta-golpe" in t:
        alvo += 1

print("menções 'Este site':", faq_site, "| <details> total:", faq_tot)
print("<img> total em HTMLs:", imgs)
print("páginas com menção autor/revisão:", autoria)
print("páginas com alerta-golpe:", alvo)

# duplicação de frases de abertura entre artigos
aberturas = collections.Counter()
for f in sorted(glob.glob(os.path.join(BASE, "*.html"))):
    t = io.open(f, encoding="utf-8").read()
    m = re.search(r'<h1[^>]*>([^<]+)</h1>', t)
    if m:
        aberturas[m.group(1)] += 1
dups = [h for h, n in aberturas.items() if n > 1]
print("H1s duplicados:", len(dups))

# frases repetitivas em >=10 artigos
frase_art = collections.Counter()
artigos = [a for a in glob.glob(os.path.join(BASE, "*.html"))
           if os.path.basename(a) not in ("index.html", "artigos.html")]
for f in artigos:
    t = io.open(f, encoding="utf-8").read()
    for frase in ("Este site", "Página atualizada em", "Ver todas as empresas",
                  "Escolha a sua empresa", "Este artigo ajudou", "Todos os artigos do LinkContas",
                  "Perguntas frequentes do site"):
        if frase in t:
            frase_art[frase] += 1
print("artigos no total:", len(artigos))
for frase, n in frase_art.most_common():
    print("   %-35s em %d artigos" % (frase, n))
