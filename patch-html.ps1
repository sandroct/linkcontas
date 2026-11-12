$ErrorActionPreference = "Stop"
$base = $PSScriptRoot

$telAntigo = '<p>&#9742; <strong>Telefone:</strong> <span class="verificar-dado">[VERIFICAR DADO OFICIAL]</span> &mdash; numero do atendimento oficial.</p>'
$wppAntigo = '<p>&#128172; <strong>WhatsApp:</strong> <span class="verificar-dado">[VERIFICAR DADO OFICIAL]</span> &mdash; confirmar se existe WhatsApp oficial.</p>'

$dados = [ordered]@{
  "light.html"   = @{ telTexto = "0800 021 0196"; telHref = "08000210196" }
  "cemig.html"   = @{ telTexto = "116 (em MG) ou 0800 721 0116 (outros estados)"; telHref = "116" }
  "cpfl.html"    = @{ telTexto = "0800 010 0920"; telHref = "08000100920" }
  "sabesp.html"  = @{ telTexto = "0800 055 0195 (24 horas)"; telHref = "08000550195"; wpp = "11 3388-8000"; wppHref = "551133888000" }
  "copasa.html"  = @{ telTexto = "115"; telHref = "115" }
  "cedae.html"   = @{ telTexto = "0800 28 21 195 (24 horas)"; telHref = "08002821195" }
  "claro.html"   = @{ telTexto = "1052 (de um telefone Claro)"; telHref = "1052" }
  "vivo.html"    = @{ telTexto = "1058 (de um telefone Vivo)"; telHref = "1058" }
  "tim.html"     = @{ telTexto = "*144 (de um telefone TIM)"; telHref = "144" }
  "oi.html"      = @{ telTexto = "1057"; telHref = "1057" }
}

foreach ($arq in $dados.Keys) {
    $caminho = Join-Path $base $arq
    if (-not (Test-Path $caminho)) { Write-Host "$arq : ARQUIVO NAO EXISTE"; continue }
    $html = [System.IO.File]::ReadAllText($caminho, [System.Text.Encoding]::UTF8)
    $d = $dados[$arq]
    $mudou = $false

    $telNovo = '<p>&#9742; <strong>Telefone:</strong> <a href="tel:' + $d.telHref + '" style="color: var(--cor-primaria); font-weight: 700;">' + $d.telTexto + '</a> &mdash; atendimento oficial da empresa.</p>'
    if ($html.Contains($telAntigo)) { $html = $html.Replace($telAntigo, $telNovo); $mudou = $true }

    if ($d.wpp) {
        $wppNovo = '<p>&#128172; <strong>WhatsApp:</strong> <a href="https://wa.me/' + $d.wppHref + '" target="_blank" rel="noopener" style="color: var(--cor-sucesso); font-weight: 700;">' + $d.wpp + '</a> &mdash; WhatsApp oficial.</p>'
        if ($html.Contains($wppAntigo)) { $html = $html.Replace($wppAntigo, $wppNovo); $mudou = $true }
    }

    if ($mudou) {
        [System.IO.File]::WriteAllText($caminho, $html, (New-Object System.Text.UTF8Encoding($false)))
        Write-Host "$arq : contatos aplicados ($($d.telTexto))"
    } else {
        Write-Host "$arq : nada alterado"
    }
}
Write-Host "=== Patch de contatos finalizado ==="
