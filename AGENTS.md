# AGENTS.md — LinkContas (Link Contas)

Site estático de links oficiais para contas de consumo (luz, água, telefone,
internet, consultas) + 40 guias práticos. Publicado em GitHub Pages:
`https://linkcontas.com.br/`.

Este documento integra a metodologia **Spec-Driven Development (SDD)** do
[GitHub Spec Kit](https://github.com/github/spec-kit) ao projeto. A
constituição vinculante está em `.specify/memory/constitution.md` — leia-a
antes de qualquer mudança.

## Fluxo SDD adaptado (mudança delimitada)

Para toda feature/rodada nova, neste ordem:

1. **Constituição** — releia `.specify/memory/constitution.md`. Se a mudança
   violar um princípio "DEVE", mude o plano (nunca dilua o princípio).
2. **Especify (O QUE/POR QUÊ)** — crie `.specify/specs/NNN-nome-da-feature/spec.md`
   a partir de `.specify/templates/spec-template.md`. Histórias de usuário
   priorizadas (P1/P2/P3), cada uma testável de forma independente. Ambiguidade
   vira `[NEEDS CLARIFICATION: …]`, nunca adivinhação.
3. **Plan (COMO)** — crie `plan.md` a partir de `.specify/templates/plan-template.md`.
   Preencha o **Constitution Check** (gates I–VI) antes de codar.
4. **Tasks** — crie `tasks.md` a partir de `.specify/templates/tasks-template.md`.
   Agrupe por história; inclua os gates `verificacoes/` em toda história.
5. **Implement** — siga o tasks.md. Respeite a **fonte única**: alterar JSON ou
   template e regenerar (`python gerar-artigos.py`, `python gerar-paginas-v3.py`),
   nunca editar HTML gerado à mão.
6. **Converge** — até tudo sair verde:
   - `python verificacoes/rodar-todos.py` → `Todos os gates passaram.` (exit 0)
   - teste local (`python -m http.server 8749`) em desktop e 390px
   - após push: Pages `built` + conteúdo conferido no ar
   - `HANDOFF.md` atualizado
7. **Checklist** — revise com `.specify/templates/checklist-template.md`
   (marque `[x]` só o que a revisão confirmar).

Fluxos curtos (bug simples, ajuste cosmético) podem pular direto para o tasks
rápido, mas **nunca** pulam os gates do Art. II.

## Comandos equivalentes (Spec Kit → este projeto)

O ambiente não usa a CLI `specify`; os comandos viram instrução ao agente:

| Comando Spec Kit | Equivalente aqui |
|---|---|
| `/speckit.constitution` | Ler `.specify/memory/constitution.md` |
| `/speckit.specify <descrição>` | Criar `specs/NNN-…/spec.md` do template |
| `/speckit.plan` | Criar `plan.md` + Constitution Check |
| `/speckit.tasks` | Criar `tasks.md` do template |
| `/speckit.implement` | Executar tasks.md com gates |
| `/speckit.converge` | Repetir gates até verde |
| `/speckit.checklist` | Revisar com checklist-template |
| `specify extension add bug` | Corrigir: avaliar → corrigir → testar → veredito |

No OpenCode, os comandos estão instalados em `.opencode/commands/`
(`/speckit.specify`, `/speckit.plan`, `/speckit.tasks`, `/speckit.implement`,
`/speckit.converge`).

## Estrutura

```text
.specify/
├── memory/constitution.md    # regras vinculantes (Art. I–VI)
├── templates/                # spec, plan, tasks, checklist (PT)
│   └── overrides/            # sobrescritas locais (opcionais)
├── specs/NNN-nome/           # especificações vivas (spec, plan, tasks, …)
├── scripts/                  # utilitários do fluxo
└── feature.json              # feature ativa (gerada)

opencode/commands/            # comandos /speckit.* (se existir .opencode/)
verificacoes/                 # gates de qualidade (rodar-todos.py)
HANDOFF.md                    # histórico de rodadas entre sessões
```

## Ponto-chave deste projeto (brownfield)

O site já existe e é o ativo. O Spec Kit aqui **não** serve para reconstruir a
partir de specs — serve para a **próxima mudança delimitada** seguir o fluxo
(veja `docs/how-to/existing-projects.md` do Spec Kit). Regra permanente:
**preservar o conteúdo base, corrigir bugs em vez de reconstruir, verificar
antes e depois, nunca quebrar o site.**

## Referências

- Constituição: `.specify/memory/constitution.md`
- Metodologia SDD: https://github.com/github/spec-kit/blob/main/spec-driven.md
- Docs: https://github.github.io/spec-kit
- Histórico de rodadas: `HANDOFF.md`
