# -*- coding: utf-8 -*-
"""Roda todos os gates de verificação do LinkContas.

Uso:  python verificacoes/rodar-todos.py
Sai com código != 0 se qualquer gate falhar (para usar em CI/revisão).
"""
import os
import subprocess
import sys

try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

AQUI = os.path.dirname(os.path.abspath(__file__))
GATES = [
    ("verificar.py", "JSON dos artigos + links internos + marcadores"),
    ("varredura.py", "Varredura geral (versoes, sitemap, links, schemas)"),
    ("valida-jsonld.py", "Todo JSON-LD dos HTML valido"),
    ("checagem-adsense.py", "Requisitos de qualidade AdSense (figuras, fontes, datas)"),
    ("auditoria-conteudo.py", "Auditoria de repeticao/boilerplate do conteudo"),
]


def main():
    falhas = []
    for arquivo, desc in GATES:
        caminho = os.path.join(AQUI, arquivo)
        print("\n=== %s — %s ===" % (arquivo, desc))
        if not os.path.exists(caminho):
            print("AUSENTE")
            falhas.append(arquivo)
            continue
        r = subprocess.run([sys.executable, caminho], capture_output=True,
                           text=True, encoding="utf-8", errors="replace")
        saida = (r.stdout or "") + (r.stderr or "")
        print(saida.strip())
        if r.returncode != 0:
            falhas.append(arquivo)

    print("\n=== RESUMO ===")
    if falhas:
        print("GATES COM FALHA:", ", ".join(falhas))
        return 1
    print("Todos os gates passaram.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
