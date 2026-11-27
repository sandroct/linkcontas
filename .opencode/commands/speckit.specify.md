---
description: Criar/atualizar a especificação de uma feature (O QUE e POR QUÊ).
---

## Entrada do usuário

```text
$ARGUMENTS
```

Considere obrigatoriamente a entrada antes de prosseguir. Se vazia: peça a
descrição da feature.

## Pré-verificação

1. Leia `.specify/memory/constitution.md` (princípios vinculantes).
2. Confirme que o template `.specify/templates/spec-template.md` existe.

## Execução

1. **Nome curto** (2–4 palavras, ação-substantivo, ex.: `banner-rodape`).
2. **Diretório da feature**: próximo número sequencial `NNN` em `.specify/specs/`
   (ex.: `001-nome-curto`). Crie o diretório e grave
   `.specify/feature.json` com `{"feature_directory": "specs/001-nome-curto"}`.
3. **Copie** `.specify/templates/spec-template.md` para
   `.specify/specs/NNN-nome-curto/spec.md` e preencha cada seção com detalhes
   concretos, preservando a ordem dos títulos.
4. Regras de conteúdo:
   - Foco em **O QUE/POR QUÊ** — nada de stack, APIs, caminhos de código.
   - Histórias de usuário priorizadas (P1/P2/P3), cada uma testável sozinha.
   - Cenários no formato **Dado/Quando/Então**.
   - Máximo **3** marcadores `[NEEDS CLARIFICATION: pergunta específica]`,
     só onde há múltiplas interpretações razoáveis; nos outros casos faça
     suposição razoável e documente em Premissas.
   - Critérios de sucesso mensuráveis e neutros em tecnologia.
   - Preencha "Fronteiras de compatibilidade" (URLs indexadas, integrações,
     conteúdo base — Art. I/V da constituição).
5. **Validação**: gere `.specify/specs/NNN-…/checklists/requirements.md`
   (modelo em `.specify/templates/checklist-template.md`) e marque `[x]`
   apenas o que você confirmou no texto da spec. Itens falhos → corrija a
   spec e revalide (até 3 tentativas).
6. Se restar marcador `[NEEDS CLARIFICATION]`, apresente ao usuário tabela com
   opções A/B/C + Custom e aguarde resposta antes de finalizar.

## Relatório final

- Diretório da feature, caminho do `spec.md`, resultado do checklist
- Próximo passo: `/speckit.plan`
