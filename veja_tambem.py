# -*- coding: utf-8 -*-
"""
Bloco "Veja também" das páginas de empresa — LinkContas (Etapa 3 SEO).
=======================================================================
Fonte única usada por:
  - gerar-paginas-v3.py  (substitui a marca @@VEJATAMBEM@@ do template)
  - inserção em massa nas 24 páginas já publicadas

Regra de relevância:
  - energia   -> os 4 artigos de conta de luz + índice de artigos
  - agua/telefone/internet -> 2 empresas irmãs da mesma categoria (girando
    a escolha para variar os links entre as páginas) + índice de artigos
  - consultas (e categorias futuras) -> índice de artigos + FAQ
"""
import os

ARTIGOS_LUZ = [
    ("como-tirar-2-via-conta-de-luz.html",
     "Como tirar a 2ª via da conta de luz pela internet"),
    ("como-pagar-conta-de-luz-atrasada.html",
     "Como pagar a conta de luz atrasada sem cortar a energia"),
    ("como-contestar-conta-de-luz.html",
     "Como contestar uma conta de luz alta ou errada"),
    ("como-transferir-conta-de-luz-para-outro-nome.html",
     "Como transferir a conta de luz para o nome de outra pessoa"),
    ("artigos.html", "Ver todos os artigos do LinkContas"),
]

IRMAOS = {
    "agua": [
        ("sabesp.html", "Sabesp — conta de água em São Paulo"),
        ("copasa.html", "Copasa — conta de água em Minas Gerais"),
        ("cedae.html", "CEDAE — conta de água no Rio de Janeiro"),
        ("sanepar.html", "Sanepar — conta de água no Paraná"),
        ("embasa.html", "Embasa — conta de água na Bahia"),
    ],
    "telefone": [
        ("claro.html", "Claro — telefone e internet"),
        ("vivo.html", "Vivo — telefone e internet"),
        ("tim.html", "TIM — telefone e internet"),
        ("oi.html", "Oi — telefone e internet"),
    ],
    "internet": [
        ("gigamaisfibra.html", "Giga Mais Fibra — internet fibra"),
        ("sky.html", "SKY — internet e TV"),
        ("algar.html", "Algar Telecom — internet e telefone"),
        ("brisanet.html", "Brisanet — internet em Pernambuco"),
    ],
}


def montar_veja_tambem(categoria_slug, arquivo):
    """Retorna o HTML do bloco (sem linha em branco no fim).

    categoria_slug: ex. 'energia' (campo categoriaSlug dos JSONs)
    arquivo: ex. 'sabesp.html' (usado para girar a escolha das irmãs)
    """
    cat = (categoria_slug or "").strip().lower()
    arq = os.path.basename(arquivo or "")

    if cat == "energia":
        links = list(ARTIGOS_LUZ)
    elif cat in IRMAOS:
        grupo = IRMAOS[cat]
        idx = next((i for i, (f, _) in enumerate(grupo) if f == arq), 0)
        n = len(grupo)
        links = [
            grupo[(idx + 1) % n],
            grupo[(idx + 2) % n],
            ("artigos.html", "Ver todos os artigos do LinkContas"),
        ]
    else:
        links = [
            ("artigos.html", "Ver todos os artigos do LinkContas"),
            ("faq.html", "Perguntas frequentes do LinkContas"),
        ]

    itens = "\n".join(
        '          <li><a href="%s">%s</a></li>' % (href, texto)
        for href, texto in links
    )
    return (
        "        <h2>Veja também</h2>\n"
        '        <ul class="lista-veja-tambem">\n'
        + itens + "\n"
        "        </ul>"
    )
