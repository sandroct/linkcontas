$ErrorActionPreference = "Stop"
$base = $PSScriptRoot
$htmls = Get-ChildItem -Path $base -Filter "*.html" | Where-Object { $_.Name -ne "index.html" }

$telLinks = 0
$wppLinks = 0
$semNumero = @()
$erros = 0

foreach ($h in $htmls) {
    $txt = [System.IO.File]::ReadAllText($h.FullName, [System.Text.Encoding]::UTF8)

    $tels = ([regex]::Matches($txt, 'href="tel:')).Count
    $wpps = ([regex]::Matches($txt, 'href="https://wa.me/')).Count
    $telLinks += $tels
    $wppLinks += $wpps

    if ($tels -eq 0 -and $wpps -eq 0) {
        $semNumero += $h.Name
    }

    # placeholders de telefone restantes (depois do primeiro bloco)
    $restantes = ([regex]::Matches($txt, 'Telefone:</strong> <span class="verificar-dado"')).Count
    if ($restantes -gt 0) { Write-Host "$($h.Name): ainda com placeholder de telefone" }

    # chaves CSS
    $css = [System.IO.File]::ReadAllText((Join-Path $base "css/style.css"), [System.Text.Encoding]::UTF8)
}

$css2 = [System.IO.File]::ReadAllText((Join-Path $base "css/style.css"), [System.Text.Encoding]::UTF8)
$a = ([regex]::Matches($css2, "\{")).Count; $f = ([regex]::Matches($css2, "\}")).Count
Write-Host "CSS style.css: $a / $f"
if ($a -ne $f) { $erros++ }

Write-Host "Total links tel: $telLinks | Links WhatsApp: $wppLinks"
Write-Host "Paginas com telefone clicavel: $(($htmls.Count - $semNumero.Count)) de $($htmls.Count)"
if ($semNumero.Count -gt 0) { Write-Host "Ainda sem numero (aguardando confirmacao): $($semNumero -join ', ')" }
if ($erros -eq 0) { Write-Host "=== VALIDACAO OK ===" } else { Write-Host "=== $erros PROBLEMAS ===" }
