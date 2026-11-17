# -*- coding: utf-8 -*-
"""
Gerador de artigos "como fazer" — LinkContas
==============================================
Lê dados-artigos.json (UTF-8) e gera os HTMLs de artigo usando
template-artigo.html, incluindo o dado estruturado FAQPage.

Uso:  python gerar-artigos.py
"""
import html
import io
import json
import os
import re
import sys

BASE = os.path.dirname(os.path.abspath(__file__))
TEMPLATE_PATH = os.path.join(BASE, "template-artigo.html")
DADOS_PATH = os.path.join(BASE, "dados-artigos.json")


def attr(s):
    return html.escape(str(s or ""), quote=True)


def main():
    with io.open(TEMPLATE_PATH, encoding="utf-8") as fh:
        template = fh.read()
    with io.open(DADOS_PATH, encoding="utf-8") as fh:
        artigos = json.load(fh)

    total = 0
    for a in artigos:
        arquivo = a.get("arquivo", "")
        if not arquivo:
            print("ERRO: artigo sem 'arquivo'")
            return 1

        intro_html = "\n\n        ".join(a.get("intro", []))

        partes = []
        for sec in a.get("secoes", []):
            partes.append(
                "        <h2>%s</h2>\n%s"
                % (sec.get("h2", ""), sec.get("html", ""))
            )
        secoes_html = "\n\n".join(partes)

        faq_parts = []
        for f in a.get("faqs", []):
            faq_parts.append(
                "          <details>\n"
                "            <summary>%s</summary>\n"
                "            <p>%s</p>\n"
                "          </details>" % (f.get("q", ""), f.get("a", ""))
            )
        faqs_html = "\n".join(faq_parts)

        # Veja tambem (links internos)
        vt_parts = [
            '          <li><a href="%s">%s</a></li>'
            % (html.escape(v.get("href", ""), quote=True), html.escape(v.get("texto", "")))
            for v in a.get("vejaTambem", [])
        ]
        if not vt_parts:
            vt_parts = ['          <li><a href="index.html#grid-empresas">Lista completa de empresas</a></li>']
        vt_html = "\n".join(vt_parts)

        # Dado estruturado FAQPage
        entidades = [
            {
                "@type": "Question",
                "name": str(f.get("q", "")).strip(),
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": re.sub(r"<[^>]+>", "", str(f.get("a", ""))).strip(),
                },
            }
            for f in a.get("faqs", [])
        ]
        entidades = [e for e in entidades if e["name"] and e["acceptedAnswer"]["text"]]
        schema = json.dumps(
            {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "inLanguage": "pt-BR",
                "mainEntity": entidades,
            },
            ensure_ascii=False,
            indent=2,
        )

        saida = template
        substituicoes = {
            "@@TITULO@@": attr(a.get("titulo", "")),
            "@@METADESC@@": attr(a.get("metaDesc", "")),
            "@@ARQUIVO@@": attr(arquivo),
            "@@NOMECURTO@@": html.escape(a.get("nomeCurto", "")),
            "@@H1@@": a.get("h1", ""),
            "@@VERIFICADO@@": a.get("verificado", ""),
            "@@INTRO@@": intro_html,
            "@@SECOES@@": secoes_html,
            "@@FAQSHTML@@": faqs_html,
            "@@VEJATAMBEM@@": vt_html,
            "@@SCHEMAFAQ@@": schema,
        }
        for marca, valor in substituicoes.items():
            saida = saida.replace(marca, valor)

        sobras = re.findall(r"@@[A-Z]+@@", saida)
        if sobras:
            print("ERRO em %s: marcas nao substituidas: %s" % (arquivo, sobras))
            return 1
        if "<title><title>" in saida:
            print("ERRO em %s: title duplicado" % arquivo)
            return 1

        caminho = os.path.join(BASE, arquivo)
        with io.open(caminho, "w", encoding="utf-8", newline="\n") as fh:
            fh.write(saida)
        print("Gerado: %s (%d bytes)" % (arquivo, len(saida.encode("utf-8"))))
        total += 1

    print("=== RESUMO: %d artigos gerados ===" % total)
    return 0


if __name__ == "__main__":
    sys.exit(main())
