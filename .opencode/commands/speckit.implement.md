---
description: Implementar as tarefas da feature ativa, respeitando constituição e gates.
---

## Pré-requisitos

- `tasks.md` existe na feature ativa. Confirme com
  `python .specify/scripts/check-prerequisites.py --require-tasks`.
- Leia a constituição `.specify/memory/constitution.md` e o `plan.md`.

## Execução

1. **Baseline verde**: rode `python verificacoes/rodar-todos.py` antes de
   mexer em qualquer coisa. Se já estiver vermelho, pare e conserte primeiro.
2. **Execute as tarefas em ordem** (Fase 1 → 2 → histórias → Polimento):
   - Respeite dependências; tarefas `[P]` podem ir em paralelo.
   - **Fonte única (Art. III)**: altere JSON/template e regenerere
     (`python gerar-artigos.py`, `python gerar-paginas-v3.py`,
     `python veja_tambem.py` quando aplicável) — nunca edite HTML gerado à mão.
   - **Design System (Art. IV)**: sem `style=` inline; bump de `?v=` em todo
     CSS/JS alterado; siga classes existentes.
   - **Terceiros (Art. V)**: não toque em GTM/AdSense/Ezoic/CMP/FormSubmit/
     ads.txt/Pix.
   - Marque `[x]` no tasks.md só após confirmar a tarefa.
3. **A cada grupo lógico**: `python verificacoes/rodar-todos.py` — se falhar,
   conserte a mudança, **nunca desligue o gate**.
4. **Layout/JS novo**: teste local `python -m http.server 8749` em desktop e
   390px (+ tema escuro) antes de seguir.
5. Ao terminar todas as tarefas: passe para `/speckit.converge`.

## Relatório final

- Tarefas concluídas (e quais ficaram pendentes, com motivo)
- Estado dos gates na última rodada
