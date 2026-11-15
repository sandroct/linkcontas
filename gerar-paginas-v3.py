# -*- coding: utf-8 -*-
"""
Gerador v3 de páginas de empresa — LinkContas
==============================================
Lê os arquivos dados-empresas-*.json (UTF-8, fonte limpa) e regenera
os HTMLs usando o template externo template-pagina-empresa.html.

Motivo da v3: o gerador anterior (gerar-paginas-v2.ps1) embutia o template
num .ps1 que o PowerShell 5.1 lia como ANSI — gerando texto corrompido
(conteÃºdo, NÄƒo) em 16 páginas. Este script usa Python, que lê e grava
UTF-8 de forma confiável.

Regras:
  - copasa.html e enel-sp.html são manuais: NÃO são regenerados.
  - O conteúdo vem exclusivamente dos JSONs (nada é inventado).
  - Gravação em UTF-8 sem BOM.

Uso:  python gerar-paginas-v3.py
"""
import glob
import html
import io
import json
import os
import re
import sys
from datetime import date

BASE = os.path.dirname(os.path.abspath(__file__))
TEMPLATE_PATH = os.path.join(BASE, "template-pagina-empresa.html")

# Páginas escritas à mão — nunca sobrescrever
PULADOS = {"copasa.html", "enel-sp.html"}

MESES = [
    "janeiro", "fevereiro", "março", "abril", "maio", "junho",
    "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
]


def data_pt(hoje=None):
    d = hoje or date.today()
    return "%d de %s de %d" % (d.day, MESES[d.month - 1], d.year)


def attr(s):
    """Escapa valor para atributo HTML."""
    return html.escape(str(s or ""), quote=True)


def li(itens, tag="li"):
    return "\n".join("          <%s>%s</%s>" % (tag, it, tag) for it in itens)


def main():
    with io.open(TEMPLATE_PATH, "r", encoding="utf-8") as f:
        template = f.read()

    arquivos_json = sorted(glob.glob(os.path.join(BASE, "dados-empresas-*.json")))
    if not arquivos_json:
        print("ERRO: nenhum dados-empresas-*.json encontrado em %s" % BASE)
        return 1

    verificado = data_pt()
    geradas, puladas = 0, []

    for caminho in arquivos_json:
        with io.open(caminho, "r", encoding="utf-8") as f:
            empresas = json.load(f)

        for e in empresas:
            arquivo = e.get("arquivo")
            if not arquivo:
                continue
            if arquivo in PULADOS or os.path.basename(arquivo) in PULADOS:
                puladas.append(arquivo)
                continue

            intro_html = "\n".join("        <p>%s</p>" % p for p in e.get("intro", []))
            documentos_html = li(e.get("documentos", []))
            passos_html = li(e.get("passos", []))

            # Observação (opcional)
            obs = (e.get("observacao") or "").strip()
            if obs:
                obs_html = (
                    '        <aside class="obs-box">\n'
                    '          <span class="obs-icone" aria-hidden="true">&#9888;&#65039;</span>\n'
                    '          <div class="obs-conteudo">\n'
                    '            <strong>Observação importante</strong>\n'
                    '            <span>%s</span>\n'
                    '          </div>\n'
                    '        </aside>' % obs
                )
            else:
                obs_html = ""

            # Canais oficiais (telefone / whatsapp)
            canais = []
            tel = (e.get("telefone") or "").strip()
            zap = (e.get("whatsapp") or "").strip()
            if tel:
                canais.append(
                    '          <p><span class="canal-ico" aria-hidden="true">&#9742;</span> '
                    '<strong>Telefone:</strong> %s</p>' % tel
                )
            if zap:
                canais.append(
                    '          <p><span class="canal-ico" aria-hidden="true">&#128172;</span> '
                    '<strong>WhatsApp:</strong> %s</p>' % zap
                )
            # Compatibilidade com campo "canais" caso exista
            for c in e.get("canais", []) or []:
                valor = (c.get("valor") or "").strip()
                if not valor:
                    continue
                icone = "&#9742;" if c.get("tipo") == "telefone" else "&#128172;"
                canais.append(
                    '          <p><span class="canal-ico" aria-hidden="true">%s</span> '
                    '<strong>%s:</strong> %s</p>' % (icone, c.get("rotulo", "Canal"), valor)
                )
            if not canais:
                canais.append(
                    "          <p>Veja os canais oficiais no site da empresa.</p>"
                )
            canais_html = "\n".join(canais)

            # Dicas de golpe
            dicas_html = "\n".join(
                "          <p>%s</p>" % d for d in e.get("dicasGolpe", [])
            )

            # FAQ
            faq_parts = []
            for f in e.get("faqs", []):
                faq_parts.append(
                    "          <details>\n"
                    "            <summary>%s</summary>\n"
                    "            <p>%s</p>\n"
                    "          </details>" % (f.get("q", ""), f.get("a", ""))
                )
            faqs_html = "\n".join(faq_parts)

            h1 = e.get("h1", "")
            nome_curto = h1.split(":")[0].strip() or h1

            html_out = template
            substituicoes = {
                "@@TITULO@@": attr(e.get("titulo", "")),
                "@@METADESC@@": attr(e.get("metaDesc", "")),
                "@@ARQUIVO@@": attr(os.path.basename(arquivo)),
                "@@CATEGORIALABEL@@": html.escape(e.get("categoriaLabel", "")),
                "@@NOMECURTO@@": html.escape(nome_curto),
                "@@H1@@": h1,
                "@@VERIFICADO@@": verificado,
                "@@INTRO@@": intro_html,
                "@@URLBOTAO@@": attr(e.get("urlBotao", "")),
                "@@TEXTOBOTAO@@": html.escape(e.get("textoBotao", "")),
                "@@OBSERVACAO@@": obs_html,
                "@@DOCUMENTOS@@": documentos_html,
                "@@PASSOS@@": passos_html,
                "@@CANAIS@@": canais_html,
                "@@DICAS@@": dicas_html,
                "@@FAQSHTML@@": faqs_html,
            }
            for marca, valor in substituicoes.items():
                html_out = html_out.replace(marca, valor)

            # Nenhuma marcação reservada pode sobrar
            sobras = re.findall(r"@@[A-Z]+@@", html_out)
            if sobras:
                print("ERRO em %s: marcas não substituídas: %s" % (arquivo, sobras))
                return 1

            saida = os.path.join(BASE, os.path.basename(arquivo))
            with io.open(saida, "w", encoding="utf-8", newline="\n") as f:
                f.write(html_out)
            print("Gerado: %s" % arquivo)
            geradas += 1

    print("=== RESUMO: %d páginas geradas | puladas (manuais): %s ==="
          % (geradas, ", ".join(sorted(set(puladas))) or "nenhuma"))
    return 0


if __name__ == "__main__":
    sys.exit(main())
