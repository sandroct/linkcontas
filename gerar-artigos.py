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

# Ilustracao de capa por categoria (SVG leve, paleta do site)
FIGURAS = {
    "energia": (
        "assets/artigos/energia.svg",
        "Ilustração de uma casa com lâmpada e medidor de energia",
        "Contas de luz: leitura da fatura, formas de pagamento e direitos do consumidor.",
    ),
    "agua": (
        "assets/artigos/agua.svg",
        "Ilustração de uma gota d'água com ondas",
        "Água: leitura do hidrômetro, vazamentos, religação e economia.",
    ),
    "telecom": (
        "assets/artigos/telecom.svg",
        "Ilustração de um celular com sinal de internet",
        "Telefonia e internet: planos, fidelidade, atendimento e regulação da ANATEL.",
    ),
    "consultas": (
        "assets/artigos/consultas.svg",
        "Ilustração de um documento com lupa e selo conferido",
        "Consultas e crédito: Serasa, negativação e regularização.",
    ),
}

# Fontes oficiais por categoria — secao "Fontes oficiais" do artigo
FONTES = {
    "energia": [
        ("ANEEL — agência reguladora de energia", "https://www.gov.br/aneel/pt-br"),
        ("Ministério de Minas e Energia", "https://www.gov.br/mme/pt-br"),
        ("Consumidor.gov.br — canal oficial de reclamações", "https://www.consumidor.gov.br/"),
    ],
    "agua": [
        ("ANA — Agência Nacional de Águas e Saneamento Básico", "https://www.gov.br/ana/pt-br"),
        ("SNIS — indicadores de saneamento do governo federal", "https://www.gov.br/ana/pt-br/assuntos/saneamento-basico/snis"),
        ("Consumidor.gov.br — canal oficial de reclamações", "https://www.consumidor.gov.br/"),
    ],
    "telecom": [
        ("ANATEL — agência reguladora de telecomunicações", "https://www.gov.br/anatel/pt-br"),
        ("Portal do Consumidor — direitos e canais de atendimento", "https://www.consumidor.gov.br/"),
        ("Consumidor.gov.br — canal oficial de reclamações", "https://www.consumidor.gov.br/"),
    ],
    "consultas": [
        ("Serasa — consulta oficial do próprio cadastro", "https://www.serasa.com.br/"),
        ("Banco Central do Brasil — pagamentos e Pix", "https://www.bcb.gov.br/"),
        ("Consumidor.gov.br — canal oficial de reclamações", "https://www.consumidor.gov.br/"),
    ],
}


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

        # Figura de capa por categoria
        cat = a.get("categoria", "consultas")
        src, alt, legenda = FIGURAS.get(cat, FIGURAS["consultas"])
        figura_html = (
            '        <figure class="artigo-figura">\n'
            '          <img src="%s" alt="%s" width="1200" height="675" loading="lazy" decoding="async">\n'
            "          <figcaption>%s</figcaption>\n"
            "        </figure>" % (src, alt, legenda)
        )

        # Fontes oficiais por categoria
        fontes = FONTES.get(cat, FONTES["consultas"])
        fontes_html = "\n".join(
            '          <li><a href="%s" target="_blank" rel="noopener noreferrer">%s</a></li>'
            % (html.escape(url, quote=True), html.escape(nome))
            for nome, url in fontes
        )
        fontes_html = (
            '        <ul class="fontes-lista">\n%s\n        </ul>\n'
            "        <p class=\"fontes-nota\">As regras do setor mudam com o tempo: "
            "confira sempre a data de verificação no topo desta página e, "
            "em caso de dúvida, use os canais oficiais acima.</p>" % fontes_html
        )

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

        # Dado estruturado Article (E-E-A-T: autor, datas de publicacao/revisao)
        data_iso = ""
        mdata = re.search(r"(\d{2})/(\d{2})/(\d{4})", str(a.get("verificado", "")))
        if mdata:
            data_iso = "%s-%s-%s" % (mdata.group(3), mdata.group(2), mdata.group(1))
        artigo_schema = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": str(a.get("h1", "")),
            "inLanguage": "pt-BR",
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://linkcontas.com.br/" + arquivo,
            },
            "image": "https://linkcontas.com.br/" + FIGURAS.get(cat, FIGURAS["consultas"])[0],
            "author": {
                "@type": "Organization",
                "name": "Redação LinkContas",
                "url": "https://linkcontas.com.br/sobre.html",
            },
            "publisher": {
                "@type": "Organization",
                "name": "LinkContas",
                "url": "https://linkcontas.com.br/",
            },
        }
        if data_iso:
            artigo_schema["datePublished"] = data_iso
            artigo_schema["dateModified"] = data_iso
        artigo_schema_json = json.dumps(artigo_schema, ensure_ascii=False, indent=2)

        substituicoes = {
            "@@TITULO@@": attr(a.get("titulo", "")),
            "@@METADESC@@": attr(a.get("metaDesc", "")),
            "@@ARQUIVO@@": attr(arquivo),
            "@@NOMECURTO@@": html.escape(a.get("nomeCurto", "")),
            "@@H1@@": a.get("h1", ""),
            "@@VERIFICADO@@": a.get("verificado", ""),
            "@@INTRO@@": intro_html,
            "@@IMAGEM@@": figura_html,
            "@@FONTES@@": fontes_html,
            "@@SECOES@@": secoes_html,
            "@@FAQSHTML@@": faqs_html,
            "@@VEJATAMBEM@@": vt_html,
            "@@SCHEMAFAQ@@": schema,
            "@@SCHEMAARTIGO@@": artigo_schema_json,
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
