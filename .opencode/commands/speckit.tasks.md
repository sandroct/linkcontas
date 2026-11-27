---
description: Gerar a lista de tarefas a partir do plano e da spec.
---

## Pré-requisitos

- `plan.md` e `spec.md` existem na feature ativa (`.specify/feature.json`).

## Execução

1. **Leia** `plan.md` + `spec.md` (e `research.md`/`data-model.md`/`contracts/`
   se existirem — confira com
   `python .specify/scripts/check-prerequisites.py --include-tasks`).
2. **Copie** `.specify/templates/tasks-template.md` para `tasks.md` na feature.
3. Substitua os exemplos por tarefas **reais**, derivadas das histórias:
   - Formato `[ID] [P?] [História] Descrição com caminho exato de arquivo`
   - Agrupado por história (H1=P1 primeiro, depois H2, H3)
   - Fase 1 Setup (baseline verde: rodar gates) → Fase 2 Fundacional →
     histórias → Polimento (bump `?v=`, `HANDOFF.md`, `sitemap.xml`)
   - Em toda história: tarefa de regenerar (se gerador envolvido) + rodar
     `python verificacoes/rodar-todos.py` + teste manual local (desktop/390px)
   - Marque `[P]` só em tarefas de arquivos diferentes, sem dependência
4. Inclua a ordem de execução e checkpoints (nunca subir com gate vermelho).

## Relatório final

- Número de tarefas por história, caminho do `tasks.md`
- Próximo passo: `/speckit.implement`
