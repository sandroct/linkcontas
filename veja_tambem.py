# -*- coding: utf-8 -*-
"""
Bloco "Veja também" das páginas de empresa — LinkContas (Etapa 3 SEO).
=======================================================================
Fonte única usada por:
  - gerar-paginas-v3.py  (substitui a marca @@VEJATAMBEM@@ do template)
  - inserção em massa nas 24 páginas já publicadas

Regra de relevância:
  - energia   -> os 4 artigos de conta de luz + índice de artigos
  - agua      -> 2 irmãs + artigos de água (2ª via e atrasada) + índice
  - telefone  -> 2 irmãs + artigos de troca de operadora/cancelar + índice
  - internet  -> 2 irmãs + artigos de internet lenta/cancelar + índice
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

ARTIGOS_AGUA = [
    ("como-tirar-2-via-conta-de-agua.html",
     "Como tirar a 2ª via da conta de água pela internet"),
    ("como-pagar-conta-de-agua-atrasada.html",
     "Como pagar a conta de água atrasada sem cortar"),
    ("artigos.html", "Ver todos os artigos do LinkContas"),
]

ARTIGOS_TELEFONE = [
    ("como-trocar-de-operadora-levando-o-numero.html",
     "Como trocar de operadora levando o número"),
    ("como-cancelar-internet.html",
     "Como cancelar a internet sem dor de cabeça"),
    ("artigos.html", "Ver todos os artigos do LinkContas"),
]

ARTIGOS_INTERNET = [
    ("internet-lenta-o-que-fazer.html",
     "Internet lenta? Testes antes de trocar de plano"),
    ("como-cancelar-internet.html",
     "Como cancelar a internet sem dor de cabeça"),
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
        irmas = [grupo[(idx + 1) % n], grupo[(idx + 2) % n]]
        if cat == "agua":
            links = irmas + list(ARTIGOS_AGUA)
        elif cat == "telefone":
            links = irmas + list(ARTIGOS_TELEFONE)
        else:  # internet
            links = irmas + list(ARTIGOS_INTERNET)
    else:
        links = [
            ("como-sair-do-serasa-e-nome-negativado.html",
             "Nome negativado? Como sair do Serasa"),
            ("conta-de-luz-negativada.html",
             "Conta de luz negativada no Serasa"),
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
