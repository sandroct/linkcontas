---
description: Criar o plano de implementação a partir da spec (COMO).
---

## Pré-requisitos

- `spec.md` existe na feature ativa (`.specify/feature.json` →
  `feature_directory`; senão, rode `/speckit.specify` primeiro).
- Leiou a constituição `.specify/memory/constitution.md`.

## Execução

1. **Leia** `spec.md` (histórias, requisitos, critérios de sucesso).
2. **Pesquise o código real**: localize onde cada requisito será implementado
   (geradores `gerar-artigos.py`/`gerar-paginas-v3.py`, templates `template-*.html`,
   fontes `dados-*.json`, CSS `css/style.css`/`css/pagina-empresa.css`, JS,
   páginas manuais). Use grep/glob — não adivinhe caminhos.
3. **Copie** `.specify/templates/plan-template.md` para `plan.md` na feature e
   preencha:
   - Resumo, Contexto técnico (dados reais do projeto)
   - **Constitution Check**: responda cada Art. I–VI com `[x]` (passou) ou
     detalhe a violação — **gate antes de qualquer codificação**
   - Estrutura do projeto (caminhos reais)
   - Tabela de rastreabilidade: cada FR/SC → arquivo → como testar
4. Se houver violação a justificar, preencha "Registro de complexidade" —
   senão, remova a seção.
5. Se a feature mexer em dados, gere também `data-model.md`; se houver
   contrato de API/JSON, crie `contracts/`. Só se aplicável.

## Relatório final

- Resultado do Constitution Check (PASSOU / violações justificadas)
- Arquivos que serão alterados e como serão testados
- Próximo passo: `/speckit.tasks`
