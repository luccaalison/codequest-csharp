# Smoke test for the execution API. Usage: pwsh server/smoke-test.ps1 [baseUrl]
param([string]$BaseUrl = "http://localhost:5239")

$ErrorActionPreference = "Stop"

function Invoke-Case {
    param([string]$Label, [hashtable]$Body)
    $json = $Body | ConvertTo-Json -Depth 8
    $sw = [System.Diagnostics.Stopwatch]::StartNew()
    $res = Invoke-RestMethod -Uri "$BaseUrl/api/execute" -Method Post -Body $json -ContentType "application/json"
    $sw.Stop()
    Write-Host "=== $Label ($($sw.ElapsedMilliseconds) ms wall) ===" -ForegroundColor Cyan
    Write-Host "  success=$($res.success) compiled=$($res.compiled) passed=$($res.passedCount)/$($res.totalCount) compileMs=$($res.compileMs)"
    if ($res.rejectionReason) { Write-Host "  rejected: $($res.rejectionReason)" -ForegroundColor Yellow }
    foreach ($d in $res.diagnostics) { Write-Host "  [$($d.severity) $($d.id)] linha $($d.line): $($d.message)" -ForegroundColor DarkYellow }
    foreach ($r in $res.results) {
        $color = if ($r.passed) { "Green" } else { "Red" }
        Write-Host "  - $($r.name): passed=$($r.passed) exit=$($r.exitCode) timedOut=$($r.timedOut) ($($r.durationMs) ms)" -ForegroundColor $color
        if (-not $r.passed) {
            Write-Host "      esperado: $($r.expected -replace "`n", '\n')"
            Write-Host "      obtido  : $($r.actual -replace "`n", '\n')"
            if ($r.stderr) { Write-Host "      stderr  : $($r.stderr.Split("`n")[0])" }
        }
    }
    Write-Host ""
}

Write-Host "Health: $((Invoke-RestMethod -Uri "$BaseUrl/api/health").status)`n"

Invoke-Case "Passa todos os testes" @{
    code  = @'
using System;

class Program
{
    static void Main()
    {
        string nome = Console.ReadLine();
        Console.WriteLine($"Ola, {nome}!");
    }
}
'@
    tests = @(
        @{ name = "Maria"; stdin = "Maria"; expectedStdout = "Ola, Maria!" },
        @{ name = "Joao";  stdin = "Joao";  expectedStdout = "Ola, Joao!" }
    )
}

Invoke-Case "Falha em um teste" @{
    code  = @'
class Program
{
    static void Main() => Console.WriteLine(2 + 2);
}
'@
    tests = @(@{ name = "soma"; expectedStdout = "5" })
}

Invoke-Case "Erro de compilacao" @{
    code  = @'
class Program
{
    static void Main() { int x = "texto"; }
}
'@
    tests = @(@{ name = "qualquer"; expectedStdout = "" })
}

Invoke-Case "Laco infinito (timeout)" @{
    code      = @'
class Program
{
    static void Main() { while (true) { } }
}
'@
    timeoutMs = 2000
    tests     = @(@{ name = "trava"; expectedStdout = "fim" })
}

Invoke-Case "Bloqueado pelo guard" @{
    code  = @'
using System.Diagnostics;

class Program
{
    static void Main() => Process.Start("calc.exe");
}
'@
    tests = @(@{ name = "seguranca"; expectedStdout = "" })
}

Invoke-Case "Excecao em tempo de execucao" @{
    code  = @'
class Program
{
    static void Main()
    {
        int[] valores = { 1, 2, 3 };
        Console.WriteLine(valores[10]);
    }
}
'@
    tests = @(@{ name = "indice"; expectedStdout = "4" })
}
