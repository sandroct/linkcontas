---
description: Ler a constituição do LinkContas antes de qualquer mudança.
---

## Constituição do projeto

Leia `.specify/memory/constitution.md` na íntegra e resuma para o usuário,
destacando:

1. Os 6 princípios (Art. I–VI) e o que cada um proíbe/obriga
2. Os gates de qualidade obrigatórios (`python verificacoes/rodar-todos.py`)
3. As restrições de segurança e privacidade
4. A regra de emenda (quem pode mudar a constituição e como)

Se a mudança que o usuário está pedindo violar algum princípio "DEVE",
avise **antes** de implementar e proponha ajustar o plano — nunca diluir o
princípio silenciosamente.

**Input do usuário** (se houver): `$ARGUMENTS` — avalie a mudança pedida
contra a constituição e diga se ela passa no Constitution Check.
