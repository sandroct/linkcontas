# Patch dos contatos + atualizacao do template
$ErrorActionPreference = "Stop"
$base = $PSScriptRoot

# Tabela de contatos (verificados em sites oficiais ou numeros publicos amplamente conhecidos)
$contatos = @{
  # ===== VERIFICADOS HOJE NOS SITES OFICIAIS =====
  "sabesp" = @{ telTexto = "0800 055 0195 (24 horas)"; telLink = "08000550195"; wppTexto = "11 3388-8000"; wppLink = "551133888000"; status = "verificado" }
  "cemig"  = @{ telTexto = "116 (em MG) ou 0800 721 0116 (outros estados)"; telLink = "116"; wppTexto = ""; status = "verificado" }
  "cedae"  = @{ telTexto = "0800 28 21 195 (24 horas)"; telLink = "08002821195"; wppTexto = ""; status = "verificado" }
  # ===== NUMEROS PUBLICOS AMPLAMENTE CONHECIDOS (confirmar depois) =====
  "enel"   = @{ telTexto = "0800 727 6512 (Sao Paulo)"; telLink = "08007276512"; wppTexto = ""; status = "publico" }
  "light"  = @{ telTexto = "0800 021 0196"; telLink = "08000210196"; wppTexto = ""; status = "publico" }
  "cpfl"   = @{ telTexto = "0800 010 0920"; telLink = "08000100920"; wppTexto = ""; status = "publico" }
  "copasa" = @{ telTexto = "115"; telLink = "115"; wppTexto = ""; status = "publico" }
  "claro"  = @{ telTexto = "1052 (de um telefone Claro) ou 106 49"; telLink = "1052"; wppTexto = ""; status = "publico" }
  "vivo"   = @{ telTexto = "1058 (de um telefone Vivo) ou *8486"; telLink = "1058"; wppTexto = ""; status = "publico" }
  "tim"    = @{ telTexto = "*144 (de um telefone TIM)"; telLink = "144"; wppTexto = ""; status = "publico" }
  "oi"     = @{ telTexto = "1057"; telLink = "1057"; wppTexto = ""; status = "publico" }
}

foreach ($arq in @("dados-empresas-1.json", "dados-empresas-2.json")) {
    $caminho = Join-Path $base $arq
    if (-not (Test-Path $caminho)) { continue }
    $json = [System.IO.File]::ReadAllText($caminho, [System.Text.Encoding]::UTF8) | ConvertFrom-Json

    foreach ($e in $json) {
        if ($contatos.ContainsKey($e.id)) {
            $c = $contatos[$e.id]
            $e | Add-Member -NotePropertyName "telefoneTexto" -NotePropertyValue $c.telTexto -Force
            $e | Add-Member -NotePropertyName "telefoneLink" -NotePropertyValue $c.telLink -Force
            if ($c.wppTexto) {
                $e | Add-Member -NotePropertyName "whatsappTexto" -NotePropertyValue $c.wppTexto -Force
                $e | Add-Member -NotePropertyName "whatsappLink" -NotePropertyValue $c.wppLink -Force
            }
            Write-Host "$($e.id): contato aplicado ($($c.status))"
        } else {
            Write-Host "$($e.id): mantido [VERIFICAR] (numero nao confirmado)"
        }
    }

    $saida = $json | ConvertTo-Json -Depth 10
    [System.IO.File]::WriteAllText($caminho, $saida, (New-Object System.Text.UTF8Encoding($false)))
}
Write-Host "=== Dados JSON atualizados ==="
