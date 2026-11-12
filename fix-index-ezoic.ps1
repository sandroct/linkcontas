$ErrorActionPreference = "Stop"
$base = $PSScriptRoot
$placeholder = "<script>ezstandalone.cmd.push(function () { ezstandalone.showAds(); });</script>"

$caminho = Join-Path $base "index.html"
$html = [System.IO.File]::ReadAllText($caminho, [System.Text.Encoding]::UTF8)

# Substitui qualquer conteudo do ad-placeholder pelo snippet (regex, sem depender do texto)
$padrao = '<div class="ad-placeholder">[^<]*</div>'
$novo = '<div class="ad-placeholder">' + $placeholder + '</div>'
$contas = ([regex]::Matches($html, $padrao)).Count
$html = [regex]::Replace($html, $padrao, $novo)

[System.IO.File]::WriteAllText($caminho, $html, (New-Object System.Text.UTF8Encoding($false)))
Write-Host "Espacos substituidos: $contas"
$depois = ([regex]::Matches($html, "showAds")).Count
Write-Host "showAds no index agora: $depois"
