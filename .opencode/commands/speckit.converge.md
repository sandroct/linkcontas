---
description: Repetir verificação até a feature convergir para verde (deploy incluído).
---

## Execução — itere até convergir

Repita os ciclos abaixo até **todos** passarem. Cada ciclo: se algo falhar,
**conserte a mudança** (não o gate), e volte ao início do ciclo.

1. **Gates**: `python verificacoes/rodar-todos.py` → deve imprimir
   `Todos os gates passaram.` (exit 0).
2. **Constitution Check** (Art. I–VI): revise o `plan.md` contra o que foi
   realmente implementado; se divergiu, atualize plano ou código.
3. **Teste local**: `python -m http.server 8749` na raiz — home, artigos,
   páginas de empresa; desktop + 390px; tema claro/escuro; links internos.
4. **Checklist de revisão**: preencha `checklists/review.md` da feature a
   partir de `.specify/templates/checklist-template.md`; `[x]` só com
   confirmação.
5. **Deploy** (se o usuário confirmar):
   - `git add -A && git -c core.safecrlf=false commit -m "…"` e `git push`
   - `gh api repos/sandroct/linkcontas/pages --jq '.status'` → `built`
   - Confira o conteúdo no ar (`https://linkcontas.com.br/`)
6. **Pós-deploy**: atualize `HANDOFF.md` com a rodada.

## Critério de convergência

- Todos os gates verdes
- Checklist sem itens críticos pendentes
- Pages `built` + conteúdo conferido no ar (se deployou)
- `HANDOFF.md` atualizado

Se após 3 ciclos ainda houver falha, pare e relate ao usuário o que falta,
com arquivo/linha exatos — não declare sucesso parcial como concluído.
