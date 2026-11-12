# Monitor automatico do dominio linkcontas.com.br
# Quando o DNS propagar: reativa o CNAME, ativa HTTPS e valida o site.
$ErrorActionPreference = "Continue"
$repo = "C:\Users\Alessandro\Documents\PROJETOS\pague-facil"
$maxCiclos = 60      # 60 ciclos x 90s = 90 minutos
$intervalo = 90      # segundos

function Test-Dns {
    try {
        $r = Resolve-DnsName -Name "linkcontas.com.br" -Type A -Server 8.8.8.8 -Error Stop
        if ($r) { return $true }
    } catch { }
    return $false
}

$propagou = $false
for ($i = 1; $i -le $maxCiclos; $i++) {
    if (Test-Dns) {
        $hora = Get-Date -Format "HH:mm"
        Write-Host "=== DNS PROPAGOU no ciclo $i ($hora) ==="
        $r = Resolve-DnsName -Name "linkcontas.com.br" -Type A -Server 8.8.8.8 -Error Stop
        $r | ForEach-Object { Write-Host "  A: $($_.IPAddress)" }
        try {
            $c = Resolve-DnsName -Name "www.linkcontas.com.br" -Type CNAME -Server 8.8.8.8 -Error Stop
            $c | ForEach-Object { Write-Host "  CNAME www: $($_.NameHost)" }
        } catch { Write-Host "  CNAME www: ausente" }
        $propagou = $true
        break
    }
    if ($i % 5 -eq 0) { Write-Host "ciclo $i ($(Get-Date -Format 'HH:mm')): aguardando..." }
    Start-Sleep -Seconds $intervalo
}

if (-not $propagou) {
    Write-Host "=== DNS ainda NAO propagou apos 90 minutos ==="
    exit 0
}

# ---- DNS propagou: reativar o dominio no GitHub Pages ----
Set-Location $repo
Write-Host "Reativando CNAME..."
"linkcontas.com.br" | Out-File -FilePath "CNAME" -Encoding ascii -NoNewline
git add CNAME | Out-Null
git commit -m "Reativa CNAME do dominio (DNS propagado)" 2>&1 | Out-Null
git push 2>&1 | Out-Null
Write-Host "CNAME reativado e enviado. Aguardando certificado SSL do GitHub..."

$gh = "C:\Program Files\GitHub CLI\gh.exe"
for ($t = 1; $t -le 20; $t++) {
    Start-Sleep -Seconds 60
    try {
        $pages = & $gh api repos/sandroct/linkcontas/pages | ConvertFrom-Json
        $cname = $pages.cname
        $https = $pages.https_enforced
        Write-Host "  t=${t}min | cname=$cname | https_enforced=$https"
        if ($cname -eq "linkcontas.com.br") {
            if ($https -ne $true) {
                try {
                    & $gh api --method PATCH repos/sandroct/linkcontas/pages -f https_enforced=true 2>&1 | Out-Null
                    Write-Host "  HTTPS forcado ativado via PATCH"
                } catch {
                    Write-Host "  PATCH falhou, tentando endpoint especifico..."
                    try {
                        & $gh api --method POST "repos/sandroct/linkcontas/pages/https-enforcement" 2>&1 | Out-Null
                        Write-Host "  HTTPS ativado via endpoint dedicado"
                    } catch { Write-Host "  (ativar manualmente em Settings > Pages)" }
                }
            }
            break
        }
    } catch { Write-Host "  t=${t}min: aguardando reconhecimento do cname..." }
}

Write-Host "=== Teste final ==="
foreach ($u in @("https://linkcontas.com.br/","https://www.linkcontas.com.br/","https://linkcontas.com.br/enel-sp.html")) {
    try {
        $r = Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 20 -MaximumRedirection 0
        Write-Host "$u -> $($r.StatusCode)"
    } catch {
        if ($_.Exception.Response) { Write-Host "$u -> $([int]$_.Exception.Response.StatusCode)" }
        else { Write-Host "$u -> $($_.Exception.Message)" }
    }
}
Write-Host "=== MONITOR FINALIZADO ==="
