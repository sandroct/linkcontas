# Gerador de paginas de empresas — LinkContas
# Le dados-empresas-*.json e gera os HTML + atualiza script.js
$ErrorActionPreference = "Stop"
$base = $PSScriptRoot

# ---------- Template ----------
$TemplateTopo = @'
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>@@TITULO@@</title>
  <meta name="description" content="@@METADESC@@">
  <link rel="canonical" href="https://linkcontas.com.br/@@ARQUIVO@@">
  <meta property="og:title" content="@@TITULO@@">
  <meta property="og:description" content="@@METADESC@@">
  <meta property="og:type" content="article">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/pagina-empresa.css">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
@@FAQSJSON@@
    ]
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://linkcontas.com.br/" },
      { "@type": "ListItem", "position": 2, "name": "@@CATEGORIALABEL@@", "item": "https://linkcontas.com.br/#categorias" },
      { "@type": "ListItem", "position": 3, "name": "@@NOMECURTO@@" }
    ]
  }
  </script>
</head>
<body>
'@

$TemplateCabecalho = @'
  <header class="header">
    <div class="container header-inner">
      <a class="logo" href="index.html" style="text-decoration:none">
        <span class="logo-icon">
          <svg class="logo-boleto" viewBox="0 0 32 36" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="2" width="26" height="32" rx="4" fill="#ffffff" stroke="#1d4ed8" stroke-width="2.5"/>
            <rect x="8" y="8" width="16" height="2.6" rx="1.3" fill="#2563eb"/>
            <rect x="8" y="13.5" width="11" height="2.2" rx="1.1" fill="#cbd5e1"/>
            <rect x="8" y="17.8" width="14" height="2.2" rx="1.1" fill="#e2e8f0"/>
            <g class="barcode">
              <rect x="8" y="23" width="2.4" height="8" fill="#0f172a"/>
              <rect x="11.8" y="23" width="1.4" height="8" fill="#0f172a"/>
              <rect x="14.6" y="23" width="3" height="8" fill="#0f172a"/>
              <rect x="19" y="23" width="1.4" height="8" fill="#0f172a"/>
              <rect x="21.8" y="23" width="2.4" height="8" fill="#0f172a"/>
            </g>
          </svg>
        </span>
        <span class="logo-text">LinkContas</span>
      </a>
      <div class="user-actions">
        <button id="tema-toggle" class="btn-tema" aria-label="Alternar tema claro/escuro" title="Alternar tema">
          <span class="icone-tema">&#127769;</span>
        </button>
        <a href="sobre.html" class="btn btn-outline">Sobre</a>
      </div>
    </div>
  </header>

  <div class="container pagina-empresa">
    <nav class="breadcrumb" aria-label="Voce esta aqui">
      <a href="index.html">Inicio</a>
      <span class="breadcrumb-separador">&gt;</span>
      <a href="index.html#categorias">@@CATEGORIALABEL@@</a>
      <span class="breadcrumb-separador">&gt;</span>
      <span>@@NOMECURTO@@</span>
    </nav>

    <article class="artigo">
      <h1>@@H1@@</h1>
      <span class="atualizacao">&#128197; Pagina atualizada em 12 de novembro de 2026</span>
@@INTRO@@
      <a class="cta-principal" href="@@URLBOTAO@@" target="_blank" rel="noopener noreferrer">
        &#9889; @@TEXTOBOTAO@@
      </a>
      <p class="cta-nota">O botao abre uma nova aba, para voce nao perder esta pagina.</p>
@@OBSERVACAO@@
      <h2>O que voce precisa ter em maos antes de clicar</h2>
      <p>Separe estas informacoes. Assim voce resolve tudo em poucos minutos, sem levantar para procurar papel:</p>
      <ul>
@@DOCUMENTOS@@
      </ul>

      <h2>Passo a passo facil para tirar e pagar a conta</h2>
      <p>Siga estas etapas com calma. Sao poucos passos e voce pode voltar nesta pagina quantas vezes quiser:</p>
      <ol>
@@PASSOS@@
      </ol>

      <h2>Outras formas oficiais de pedir a conta (WhatsApp e Telefone)</h2>
      <p>Se voce prefere falar com uma pessoa, existem canais oficiais de atendimento:</p>
      <div class="canal-oficial">
        <p>&#9742; <strong>Telefone:</strong> @@TELEFONE@@</p>
        <p>&#128172; <strong>WhatsApp:</strong> @@WHATSAPP@@</p>
        <p>&#128241; <strong>Aplicativo:</strong> procure pelo nome da empresa na loja de aplicativos do celular. E gratuito e oficial.</p>
      </div>
      <p><strong>Atencao:</strong> a empresa <strong>nunca</strong> pede a senha do seu banco, nem por telefone, nem por WhatsApp. Se alguem pedir, desligue &mdash; e golpe.</p>

      <h2>Atencao: 3 dicas para nao cair em golpe</h2>
      <div class="alerta-golpe">
@@DICAS@@
      </div>

      <h2>Perguntas frequentes</h2>
      <div class="faq">
@@FAQSHTML@@
      </div>

      <div class="ajudou" id="ajudou">
        <h3>Este artigo ajudou voce?</h3>
        <div class="ajudou-botoes" id="ajudou-botoes">
          <button class="ajudou-btn" data-resposta="sim">&#128578; Sim, me ajudou</button>
          <button class="ajudou-btn nao" data-resposta="nao">&#128533; Nao, preciso de mais ajuda</button>
        </div>
      </div>

      <div class="nav-empresas">
        <a href="index.html">&larr; Ver todas as empresas</a>
        <a href="contato.html">Enviar sugestao ou duvida &rarr;</a>
      </div>
    </article>
  </div>
'@

$TemplateRodape = @'
  <footer class="footer">
    <div class="container footer-inner">
      <div class="footer-col">
        <h4>LinkContas</h4>
        <p>Central de links para os sites oficiais de empresas de contas de consumo.</p>
        <p class="footer-lema">&#128153; Criando SITES E APPS para ajudar a populacao.<br>Fazer o bem e o meu lema.</p>
      </div>
      <div class="footer-col">
        <h4>Links</h4>
        <ul>
          <li><a href="index.html">Todas as empresas</a></li>
          <li><a href="sobre.html">Sobre</a></li>
          <li><a href="termos.html">Termos de Uso</a></li>
          <li><a href="privacidade.html">Politica de Privacidade</a></li>
          <li><a href="contato.html">Contato</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Aviso legal</h4>
        <p>O LinkContas e um indicador de links. Nao somos responsaveis pelos conteudos, valores ou servicos das empresas terceiras. Sempre confirme os dados no site oficial da concessionaria.</p>
      </div>
    </div>
    <div class="container">
      <div class="copyright">
        &copy; 2026 LinkContas. Todos os direitos reservados.
      </div>
    </div>
  </footer>

  <script>
    (function () {
      var salvo = localStorage.getItem('linkcontas-tema');
      var sistema = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'escuro' : 'claro';
      var tema = salvo || sistema;
      var html = document.documentElement;
      var icone = document.querySelector('.icone-tema');

      function aplicar(t) {
        if (t === 'escuro') { html.setAttribute('data-tema', 'escuro'); icone.textContent = '☀'; }
        else { html.removeAttribute('data-tema'); icone.textContent = '🌙'; }
      }
      aplicar(tema);

      document.getElementById('tema-toggle').addEventListener('click', function () {
        var escuro = html.getAttribute('data-tema') === 'escuro';
        if (escuro) { aplicar('claro'); localStorage.setItem('linkcontas-tema', 'claro'); }
        else { aplicar('escuro'); localStorage.setItem('linkcontas-tema', 'escuro'); }
      });
    })();

    (function () {
      var box = document.getElementById('ajudou');
      var botoes = document.getElementById('ajudou-botoes');
      if (!box || !botoes) return;
      botoes.querySelectorAll('.ajudou-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var sim = btn.getAttribute('data-resposta') === 'sim';
          botoes.remove();
          var msg = document.createElement('p');
          msg.className = 'ajudou-obrigado';
          msg.textContent = sim
            ? 'Obrigado pelo seu feedback! Ficamos felizes em ajudar. 💙'
            : 'Obrigado por avisar! Vamos melhorar. Se precisar, fale com a gente na pagina de Contato.';
          box.appendChild(msg);
        });
      });
    })();
  </script>
</body>
</html>
'@

# ---------- Geracao ----------
$arquivosJson = @("dados-empresas-1.json", "dados-empresas-2.json")
$geradas = 0

foreach ($arq in $arquivosJson) {
    $caminho = Join-Path $base $arq
    if (-not (Test-Path $caminho)) { continue }
    $json = [System.IO.File]::ReadAllText($caminho, [System.Text.Encoding]::UTF8)
    $empresas = $json | ConvertFrom-Json

    foreach ($e in $empresas) {
        # Intro: array de paragrafos
        $introHtml = ""
        foreach ($p in $e.intro) { $introHtml += "      <p>$p</p>`r`n" }
        $introHtml = $introHtml.TrimEnd("`r`n")

        # Documentos / Passos / Dicas
        $docsHtml = ""
        foreach ($d in $e.documentos) { $docsHtml += "        <li>$d</li>`r`n" }
        $docsHtml = $docsHtml.TrimEnd("`r`n")

        $passosHtml = ""
        foreach ($p in $e.passos) { $passosHtml += "        <li>$p</li>`r`n" }
        $passosHtml = $passosHtml.TrimEnd("`r`n")

        $dicasHtml = ""
        foreach ($d in $e.dicasGolpe) { $dicasHtml += "        <p>$d</p>`r`n" }
        $dicasHtml = $dicasHtml.TrimEnd("`r`n")

        # Observacao opcional
        $obsHtml = ""
        if ($e.observacao -and $e.observacao.Trim().Length -gt 0) {
            $obsHtml = "      <div class=`"obs-box`">`r`n        <p><strong>Observacao importante:</strong> $($e.observacao)</p>`r`n      </div>"
        }

        # FAQ: HTML (details) + JSON-LD
        $faqsHtml = ""
        $faqsJson = ""
        $i = 0
        foreach ($f in $e.faqs) {
            $aberto = if ($i -eq 0) { " open" } else { "" }
            $faqsHtml += "        <details$aberto>`r`n          <summary>$($f.q)</summary>`r`n          <p>$($f.a)</p>`r`n        </details>`r`n"
            $sep = if ($i -gt 0) { ",`r`n" } else { "" }
            $faqsJson += "$sep      { `"@type`": `"Question`", `"name`": `"$($f.q)`", `"acceptedAnswer`": { `"@type`": `"Answer`", `"text`": `"$($f.a)`" } }"
            $i++
        }
        $faqsHtml = $faqsHtml.TrimEnd("`r`n")

        # Nome curto (antes dos dois pontos no H1)
        $nomeCurto = ($e.h1 -split ':')[0].Trim()

        $html = $TemplateTopo + $TemplateCabecalho + $TemplateRodape
        $html = $html.Replace('@@TITULO@@', $e.titulo)
        $html = $html.Replace('@@METADESC@@', $e.metaDesc)
        $html = $html.Replace('@@ARQUIVO@@', $e.arquivo)
        $html = $html.Replace('@@CATEGORIALABEL@@', $e.categoriaLabel)
        $html = $html.Replace('@@NOMECURTO@@', $nomeCurto)
        $html = $html.Replace('@@FAQSJSON@@', $faqsJson)
        $html = $html.Replace('@@H1@@', $e.h1)
        $html = $html.Replace('@@INTRO@@', $introHtml)
        $html = $html.Replace('@@URLBOTAO@@', $e.urlBotao)
        $html = $html.Replace('@@TEXTOBOTAO@@', $e.textoBotao)
        $html = $html.Replace('@@OBSERVACAO@@', $obsHtml)
        $html = $html.Replace('@@DOCUMENTOS@@', $docsHtml)
        $html = $html.Replace('@@PASSOS@@', $passosHtml)
        $html = $html.Replace('@@DICAS@@', $dicasHtml)
        $html = $html.Replace('@@FAQSHTML@@', $faqsHtml)

        $saida = Join-Path $base $e.arquivo
        [System.IO.File]::WriteAllText($saida, $html, (New-Object System.Text.UTF8Encoding($false)))
        Write-Host "Gerado: $($e.arquivo) -> $nomeCurto"
        $geradas++
    }
}

# ---------- Atualizar script.js com os links das paginas ----------
$scriptPath = Join-Path $base "js/script.js"
$script = [System.IO.File]::ReadAllText($scriptPath, [System.Text.Encoding]::UTF8)
$alterados = 0

foreach ($arq in $arquivosJson) {
    $caminho = Join-Path $base $arq
    if (-not (Test-Path $caminho)) { continue }
    $empresas = ([System.IO.File]::ReadAllText($caminho, [System.Text.Encoding]::UTF8) | ConvertFrom-Json)
    foreach ($e in $empresas) {
        if ($script -notmatch "id: '$($e.id)'") { continue }
        if ($script -match "id: '$($e.id)'[\s\S]{0,600}?pagina:") { continue } # ja tem
        $padrao = "(id: '$($e.id)',[\s\S]*?)(    cor: ')"
        $novo = "`$1    pagina: '$($e.arquivo)',`r`n`$2"
        $script = [regex]::Replace($script, $padrao, $novo, 1)
        $alterados++
    }
}

[System.IO.File]::WriteAllText($scriptPath, $script, (New-Object System.Text.UTF8Encoding($false)))
Write-Host "script.js atualizado ($alterados empresas linkadas)"

Write-Host "=== RESUMO: $geradas paginas geradas ==="
