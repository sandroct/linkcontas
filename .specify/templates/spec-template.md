# Especificação da Feature: [NOME DA FEATURE]

**Branch/ID**: `NNN-nome-da-feature`

**Criado**: [DATA]

**Status**: Rascunho

**Input**: Descrição do usuário: "$ARGUMENTS"

> Adaptado de `github/spec-kit` (`templates/spec-template.md`). Foco no
> **O QUE** e no **POR QUÊ** — nada de stack, APIs ou estrutura de código aqui
> (isso vai no plano). Marque tudo que for ambíguo com
> `[NEEDS CLARIFICATION: pergunta específica]` em vez de adivinhar.

## Cenários do usuário e testes *(obrigatório)*

<!-- Histórias priorizadas por jornada. Cada uma precisa ser INDEPENDENTEMENTE
     testável: implementando só ela, já entrega valor (MVP). P1 = mais crítica. -->

### História do usuário 1 — [Título curto] (Prioridade: P1)

[Descreva a jornada em linguagem simples, do ponto de vista de quem usa o site.]

**Por que esta prioridade**: [valor entregue e por que é P1]

**Teste independente**: [como validar sozinha — ex.: "abrir a home no celular
390px e concluir X"]

**Cenários de aceitação**:

1. **Dado** [estado inicial], **Quando** [ação], **Então** [resultado esperado]
2. **Dado** [estado inicial], **Quando** [ação], **Então** [resultado esperado]

---

### História do usuário 2 — [Título curto] (Prioridade: P2)

[Descrição]

**Por que esta prioridade**: [valor]

**Teste independente**: [como validar]

**Cenários de aceitação**:

1. **Dado** [estado inicial], **Quando** [ação], **Então** [resultado esperado]

---

### História do usuário 3 — [Título curto] (Prioridade: P3)

[Descrição]

**Por que esta prioridade**: [valor]

**Teste independente**: [como validar]

**Cenários de aceitação**:

1. **Dado** [estado inicial], **Quando** [ação], **Então** [resultado esperado]

---

[Adicione mais histórias conforme necessário, cada uma com prioridade]

### Casos extremos

- O que acontece em [condição de limite]? (ex.: 390px, tema escuro, sem JS)
- Como o site lida com [cenário de erro]? (ex.: link quebrado, JSON inválido)
- O que acontece se o dado de origem (JSON) estiver incompleto?

## Requisitos *(obrigatório)*

### Requisitos funcionais

- **FR-001**: O sistema DEVE [capacidade específica]
- **FR-002**: O sistema DEVE [regra verificável]
- **FR-003**: O usuário DEVE poder [interação-chave]
- **FR-004**: [Requisito ambíguo] DEVE [comportamento] [NEEDS CLARIFICATION: detalhe não especificado — X ou Y?]

### Entidades-chave *(incluir se a feature mexer em dados)*

- **[Entidade 1]**: o que representa, atributos-chave (sem implementação)
- **[Entidade 2]**: relacionamentos com outras entidades

## Critérios de sucesso *(obrigatório)*

<!-- Mensuráveis e neutros em tecnologia. -->

### Resultados mensuráveis

- **SC-001**: [métrica mensurável — ex.: "o guia carrega e é legível em 390px
  sem rolagem horizontal"]
- **SC-002**: [métrica — ex.: "`verificacoes/rodar-todos.py` sai com exit 0"]
- **SC-003**: [métrica — ex.: "nenhum link interno quebrado na varredura"]
- **SC-004**: [métrica de negócio/SEO — ex.: "página com schema Article e
  FAQPage válidos"]

## Premissas

- [Premissa sobre o usuário — ex.: "o acesso é pelo celular, na maior parte"]
- [Limite de escopo — ex.: "fora do escopo: mudar o rodapé"]
- [Dependência — ex.: "usa os dados já existentes em `dados-empresas-*.json`"]

## Fronteiras de compatibilidade *(obrigatório para site existente)*

- O que **não pode mudar**: [ex.: links oficiais, integrações de terceiros,
  URLs já indexadas no Search Console]
- Páginas afetadas: [lista de HTMLs]
- Regeneração necessária: [gerador envolvido, se houver]
