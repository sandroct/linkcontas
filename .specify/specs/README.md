# Especificações vivas

Cada feature/rodada delimitada fica em `NNN-nome-curto/`:

```text
001-nome-curto/
├── spec.md                 # O QUE/POR QUÊ  (/speckit.specify)
├── plan.md                 # COMO + Constitution Check  (/speckit.plan)
├── tasks.md                # tarefas por história  (/speckit.tasks)
├── research.md             # fase 0 (se houver)
├── data-model.md           # fase 1 (se mexer em dados)
├── contracts/              # fase 1 (se houver)
├── quickstart.md           # cenários de validação
└── checklists/             # requirements.md / review.md
```

Numeração sequencial de 3 dígitos. A feature ativa é registrada em
`../feature.json` (`feature_directory`).

O fluxo completo está em `AGENTS.md` (raiz) e as regras em
`../memory/constitution.md`.
