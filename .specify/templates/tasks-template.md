---
description: "Modelo de lista de tarefas para implementação de feature"
---

# Tarefas: [NOME DA FEATURE]

**Input**: Documentos de design em `.specify/specs/NNN-nome-da-feature/`

**Pré-requisitos**: plan.md (obrigatório), spec.md (obrigatório para histórias
de usuário), research.md, data-model.md, contracts/

**Testes**: os gates `verificacoes/` são OBRIGATÓRIOS em toda feature
(Art. II da constituição). Testes de unidade extra só se a spec pedir.

**Organização**: tarefas agrupadas por história de usuário, para implementar e
testar cada uma de forma independente.

## Formato: `[ID] [P?] [História] Descrição`

- **[P]**: pode rodar em paralelo (arquivos diferentes, sem dependências)
- **[História]**: a qual história pertence (ex.: H1, H2, H3)
- Incluir os **caminhos exatos** dos arquivos na descrição

## Convenções de caminho

- Site estático: caminhos relativos à raiz do repositório
  (`como-*.html`, `css/style.css`, `dados-artigos.json`, …)
- HTML gerado: alterar o **JSON/template** e rodar o gerador
  (`python gerar-artigos.py` / `python gerar-paginas-v3.py`)

<!--
  IMPORTANTE: as tarefas abaixo são EXEMPLOS. O plano real deve substituí-las
  por tarefas derivadas de spec.md (histórias + prioridades), plan.md
  (requisitos/entidades) e contracts/. Não manter exemplos no tasks.md final.
-->

## Fase 1: Setup (infraestrutura compartilhada)

**Purpose**: preparar o terreno sem quebrar nada

- [ ] T001 Criar branch/pasta da feature em `.specify/specs/NNN-…/`
- [ ] T002 [P] Confirmar baseline verde: `python verificacoes/rodar-todos.py`

---

## Fase 2: Fundacional (bloqueia todas as histórias)

**Purpose**: base que DEVE estar pronta antes de qualquer história

**⚠️ CRÍTICO**: nenhuma história começa até esta fase terminar

- [ ] T003 Atualizar a fonte de dados (JSON/gerador) se a feature mexer em dados
- [ ] T004 [P] Ajustar templates (`template-artigo.html` /
      `template-pagina-empresa.html`) se o layout comum mudar

**Checkpoint**: fundação pronta — as histórias podem começar

---

## Fase 3: História do usuário 1 — [Título] (Prioridade: P1) 🎯 MVP

**Goal**: [o que esta história entrega]

**Teste independente**: [como verificar sozinha]

### Implementação para H1

- [ ] T005 [P] [H1] Criar/ajustar [arquivo] em [caminho]
- [ ] T006 [H1] Implementar [comportamento] em [arquivo] (depende de T005)
- [ ] T007 [H1] Regenerar páginas afetadas (gerador aplicável)
- [ ] T008 [H1] Rodar `python verificacoes/rodar-todos.py` e corrigir
- [ ] T009 [H1] Teste manual no servidor local (desktop + 390px + tema escuro)

**Checkpoint**: H1 funcional e testável isoladamente

---

## Fase 4: História do usuário 2 — [Título] (Prioridade: P2)

**Goal**: [descrição]

**Teste independente**: [como verificar]

- [ ] T010 [P] [H2] [tarefa com caminho]
- [ ] T011 [H2] [tarefa com caminho]

**Checkpoint**: H1 e H2 funcionam de forma independente

---

## Fase 5: História do usuário 3 — [Título] (Prioridade: P3)

**Goal**: [descrição]

**Teste independente**: [como verificar]

- [ ] T012 [P] [H3] [tarefa com caminho]
- [ ] T013 [H3] [tarefa com caminho]

**Checkpoint**: todas as histórias funcionam de forma independente

---

## Fase N: Polimento e concerns transversais

**Purpose**: melhorias que afetam várias histórias

- [ ] TXXX [P] Bump de cache (`?v=`) em CSS/JS alterado
- [ ] TXXX Atualizar `HANDOFF.md` com a rodada
- [ ] TXXX [P] Página nova no `sitemap.xml` (se houver URL nova)
- [ ] TXXX Rodar quickstart/validação completa (gate final)

---

## Dependências e ordem de execução

### Entre fases

- **Setup (Fase 1)**: sem dependências
- **Fundacional (Fase 2)**: depende do Setup — **bloqueia todas as histórias**
- **Histórias (Fase 3+)**: dependem da Fase 2; podem ir em paralelo ou em
  ordem de prioridade (P1 → P2 → P3)
- **Polish (final)**: depende das histórias desejadas

### Dentro de cada história

- Fonte de dados/template **antes** do gerador
- Gerador **antes** da regeneração dos HTML
- Regeneração **antes** dos gates
- Gates verdes **antes** do commit/push

### Oportunidades de paralelismo

- Tarefas `[P]` de arquivos diferentes rodam juntas
- Histórias diferentes podem ser feitas em paralelo (não há conflito de
  dependência entre elas após a Fase 2)

---

## Estratégia de implementação

### MVP primeiro (só H1)

1. Fases 1 e 2
2. Fase 3 (H1)
3. **PARAR E VALIDAR**: gates + teste manual da H1
4. Publicar se aprovado

### Entrega incremental

1. Setup + Fundacional
2. H1 → testar → publicar (MVP)
3. H2 → testar → publicar
4. H3 → testar → publicar

---

## Notas

- Commit após cada tarefa ou grupo lógico (`git -c core.safecrlf=false commit`)
- Parar em qualquer checkpoint para validar a história
- Evitar: tarefas vagas, conflito no mesmo arquivo, dependências entre histórias
- **Nunca subir com gate vermelho** (Art. II)
