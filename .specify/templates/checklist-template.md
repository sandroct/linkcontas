# Checklist de Revisão: [NOME DA FEATURE]

**Propósito**: [o que este checklist cobre]
**Criado**: [DATA]
**Feature**: [link para spec.md]

**Nota**: checklist revisado por humano/agente revisor antes do deploy.
**Semântica dos marcadores**: `[x]` = critério de qualidade REVISADO e satisfeito.
`[x]` **não** significa que a implementação está pronta — é gate de requisitos.
Marcar `[x]` só depois que a revisão confirmar; deixar `[ ]` se precisar de
esclarecimento, correção ou avaliação.

<!--
  Os itens abaixo são EXEMPLOS de estrutura. Gere os itens reais a partir de:
  - spec.md (histórias + critérios de sucesso)
  - plan.md (Constitution Check + requisitos)
  - tasks.md (o que foi implementado)
  NÃO manter itens de exemplo no checklist final.
-->

## Conteúdo e confiança (Art. VI)

- [ ] CHK001 Texto útil e autêntico, nada de keyword stuffing ou cópia
- [ ] CHK002 Fontes oficiais listadas (ANEEL/ANATEL/ANA/BCB/Consumidor.gov.br…)
- [ ] CHK003 Data de verificação e selo de revisão editorial presentes
- [ ] CHK004 Schemas `Article`/`FAQPage`/`BreadcrumbList` válidos no JSON-LD
- [ ] CHK005 Variação de marca "Link Contas" (com espaço) preservada on-page

## Preservação e estrutura (Art. I e III)

- [ ] CHK006 Conteúdo base (textos do mantenedor, FAQ, rodapé) preservado
- [ ] CHK007 Nenhuma mudança não solicitada ("melhorias" extras evitadas)
- [ ] CHK008 HTML gerado alterado apenas via fonte (JSON/template) + regeneração
- [ ] CHK009 Nenhum marcador `@@...@@` sobrando em página publicada
- [ ] CHK010 Nenhum link interno/assets quebrado na varredura

## Design e responsividade (Art. IV)

- [ ] CHK011 Estilos seguem o Design System (sem `style=` inline)
- [ ] CHK012 Bump de `?v=` em CSS/JS alterado
- [ ] CHK013 Layout conferido em 390px (mobile) e desktop
- [ ] CHK014 Tema claro e escuro sem regressão

## Terceiros e privacidade (Art. V)

- [ ] CHK015 GTM/AdSense/Ezoic/CMP/FormSubmit/ads.txt/Pix intocados
- [ ] CHK016 Nenhum dado sensível (nome, CPF, senha, dados bancários) coletado
- [ ] CHK017 Links apontam apenas para domínios oficiais

## Verificação e deploy (Art. II)

- [ ] CHK018 `python verificacoes/rodar-todos.py` saiu com exit 0
- [ ] CHK019 Teste manual no servidor local (desktop + 390px) concluído
- [ ] CHK020 Páginas novas/alteradas no `sitemap.xml` (se houver URL nova)
- [ ] CHK021 `HANDOFF.md` atualizado com a rodada
- [ ] CHK022 Pós-deploy: Pages `built` + conteúdo conferido no ar

## Notas

- Itens numerados sequencialmente para referência fácil
- Achados ficam inline, com link para o arquivo/linha relevante
- Itens não revisados permanecem `[ ]` — nunca marcar por suposição
