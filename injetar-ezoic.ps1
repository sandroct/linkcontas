$ErrorActionPreference = "Stop"
$base = $PSScriptRoot

# Scripts de cabecalho (Step 2 - documentacao Ezoic)
$headerEzoic = @"
  <!-- Ezoic: scripts de privacidade (devem vir primeiro) -->
  <script data-cfasync="false" src="https://cmp.gatekeeperconsent.com/min.js"></script>
  <script data-cfasync="false" src="https://the.gatekeeperconsent.com/cmp.min.js"></script>
  <!-- Ezoic: script principal -->
  <script async src="//www.ezojs.com/ezoic/sa.min.js"></script>
  <script>window.ezstandalone = window.ezstandalone || {};ezstandalone.cmd = ezstandalone.cmd || [];</script>
  <script src="//ezoicanalytics.com/analytics.js"></script>
"@

$placeholder = "<script>ezstandalone.cmd.push(function () { ezstandalone.showAds(); });</script>"

$htmls = Get-ChildItem -Path $base -Filter "*.html"
$cabecalhos = 0
$positionsAdicionadas = 0

foreach ($h in $htmls) {
    $html = [System.IO.File]::ReadAllText($h.FullName, [System.Text.Encoding]::UTF8)

    # 1) Injetar cabecalho (apos o charset, mantendo ordem correta)
    if ($html -notmatch "ezojs\.com/ezoic/sa\.min\.js") {
        if ($html.Contains('<meta charset="UTF-8">')) {
            $html = $html.Replace('<meta charset="UTF-8">', "<meta charset=`"UTF-8`">`r`n$headerEzoic")
            $cabecalhos++
        }
    }

    # 2) Posicionar anuncios nos espacos reservados "Anuncio aqui" (index)
    if ($h.Name -eq "index.html") {
        $antigo = '<div class="ad-placeholder">Anuncio aqui</div>'
        if ($html.Contains($antigo)) {
            $novo = '<div class="ad-placeholder">' + $placeholder + '</div>'
            $contas = ([regex]::Matches($html, [regex]::Escape($antigo))).Count
            $html = $html.Replace($antigo, $novo)
            $positionsAdicionadas += $contas
        }
    }

    # 3) Um anuncio no fim do artigo das paginas de empresa (após FAQ, antes do feedback)
    if ($h.Name -ne "index.html" -and $h.Name -ne "contato.html" -and $h.Name -ne "sobre.html" -and $h.Name -ne "termos.html" -and $h.Name -ne "privacidade.html") {
        $alvo = '<div class="ajudou" id="ajudou">'
        if ($html.Contains($alvo) -and $html -notmatch "showAds") {
            $bloco = "      <div style=`"margin: 36px 0 8px;`">`r`n        " + $placeholder + "`r`n      </div>`r`n      " + $alvo
            $html = $html.Replace($alvo, $bloco)
            $positionsAdicionadas++
        }
    }

    [System.IO.File]::WriteAllText($h.FullName, $html, (New-Object System.Text.UTF8Encoding($false)))
}
Write-Host "Cabecalhos Ezoic injetados: $cabecalhos arquivos"
Write-Host "Posicoes de anuncio adicionadas: $positionsAdicionadas"
