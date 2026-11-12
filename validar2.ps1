$ErrorActionPreference = "Stop"
$base = $PSScriptRoot
$htmls = Get-ChildItem -Path $base -Filter "*.html" | Where-Object { $_.Name -ne "index.html" }

# Detector de mojibake: sequencia 'A' + tilde ou similar
$padraoMojibake = "Ã|â€|Â "

$erros = 0
foreach ($h in $htmls) {
    $txt = [System.IO.File]::ReadAllText($h.FullName, [System.Text.Encoding]::UTF8)

    if ($txt -match $padraoMojibake) { Write-Host "MOJIBAKE em $($h.Name)"; $erros++ }

    $scripts = [regex]::Matches($txt, '(?s)<script type="application/ld\+json">(.*?)</script>')
    if ($scripts.Count -ne 2) { Write-Host "JSON-LD ausente/incorreto em $($h.Name): $($scripts.Count)"; $erros++ }
    foreach ($s in $scripts) {
        try { $s.Groups[1].Value | ConvertFrom-Json | Out-Null } catch { Write-Host "JSON invalido em $($h.Name): $_"; $erros++ }
    }

    foreach ($tag in @("h1", "cta-principal", "breadcrumb", "faq", "ajudou")) {
        if ($txt -notmatch $tag) { Write-Host "Secao '$tag' faltando em $($h.Name)"; $erros++ }
    }

    if ($txt -match "\[VERIFICAR DADO OFICIAL\]" -eq $false) { Write-Host "Sem marcador VERIFICAR em $($h.Name) (esperado)"; }
}

# script.js
$script = [System.IO.File]::ReadAllText((Join-Path $base "js/script.js"), [System.Text.Encoding]::UTF8)
if ($script -match $padraoMojibake) { Write-Host "MOJIBAKE no script.js"; $erros++ }
$paginas = ([regex]::Matches($script, "pagina: '")).Count
Write-Host "Paginas linkadas no script.js: $paginas"
if ($paginas -lt 17) { Write-Host "ATENCAO: menos de 17 links de pagina"; $erros++ }

# CSS
$css = [System.IO.File]::ReadAllText((Join-Path $base "css/pagina-empresa.css"), [System.Text.Encoding]::UTF8)
$a = ([regex]::Matches($css, "\{")).Count; $f = ([regex]::Matches($css, "\}")).Count
Write-Host "CSS pagina-empresa: $a / $f"
if ($a -ne $f) { $erros++ }

if ($erros -eq 0) { Write-Host "=== VALIDACAO OK: $($htmls.Count) paginas, 0 erros ===" } else { Write-Host "=== $erros PROBLEMAS ENCONTRADOS ===" }
