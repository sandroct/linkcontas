# -*- coding: utf-8 -*-
"""Valida JSON-LD de todos os HTML e conta schema Article."""
import glob
import io
import json
import os
import re

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
bad = []
arts = 0
for f in glob.glob(os.path.join(BASE, "*.html")):
    nome = os.path.basename(f)
    if nome.startswith("template-"):
        continue  # templates contem placeholders @@...@@, nao JSON valido
    t = io.open(f, encoding="utf-8").read()
    for s in re.findall(r'<script type="application/ld\+json">(.*?)</script>', t, re.S):
        try:
            json.loads(s)
        except Exception as e:
            bad.append((os.path.basename(f), str(e)[:80]))
    if '"@type": "Article"' in t or '"@type":"Article"' in t:
        arts += 1
print("JSON-LD invalido:", bad)
print("paginas com Article schema:", arts)

import sys
if bad:
    sys.exit(1)
