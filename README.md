# LinkContas — Site Central de Contas

Site elegante e acessível que centraliza links oficiais para pagamento de contas de consumo (luz, água, telefone, internet, etc.).

> **💙 Criando SITES E APPS para ajudar a população. Fazer o bem é o meu lema.**

## ✨ Funcionalidades

- **Busca em tempo real** por nome da empresa
- **Filtro por categoria** (Energia, Telefone, Água, Internet, Consultas)
- **Links diretos** para área de login/pagamento de cada empresa
- **Telefone e WhatsApp oficiais** na página de cada empresa (pesquisados nos sites oficiais)
- **Serasa**: consulta de pendências e negociação de dívidas (categoria "Consultas")
- **Tema claro e escuro** com escolha do usuário (salvo automaticamente)
- **Design responsivo** (funciona bem no celular)
- **Acessibilidade para idosos** (botões grandes, fonte maior, links abrem em nova aba)
- **Faixa "Doações / Cafézinho"** no rodapé da página inicial (chave Pix com botão de copiar)
- **Formulário de feedback** na página de contato (nome, assunto, descrição) — entregue por e-mail ao administrador + mural local com auto-limpeza de 30 dias
- **Área do administrador** no contato (login `admin`) para apagar mensagens de teste/impróprias salvas no navegador
- **Espaços para anúncios** (Ezoic já integrado em todas as páginas)

## 📁 Estrutura

```
linkcontas/
├── index.html          (página principal com toggle de tema + faixa de doações)
├── sobre.html
├── contato.html        (e-mail + formulário/chat de feedback + área admin)
├── termos.html
├── privacidade.html
├── css/
│   └── style.css       (estilos elegantes com tema claro/escuro + doações)
├── js/
│   └── script.js       (empresas, busca, filtro, toggle de tema)
├── robots.txt          (permite indexação + aponta para o sitemap)
├── sitemap.xml         (mapa do site para o Google)
├── ads.txt             (Google AdSense ativo; Ezoic entra quando o painel liberar)
├── paginas de empresa  (enel-sp, light, cemig, cpfl, edp, ceee, claro, vivo,
│                        tim, oi, sabesp, copasa, cedae, sanepar, sky, algar, serasa)
└── README.md           (este arquivo)
```

## 📨 Feedback: como funciona

1. O visitante preenche nome, assunto e descrição e clica em **Enviar feedback**.
2. A mensagem é entregue por e-mail ao administrador (serviço gratuito FormSubmit — **na 1ª mensagem é preciso clicar no link "Ativar formulário"** recebido em alessandrobr2012@gmail.com).
3. A mensagem também aparece no mural da própria página, salva no navegador, e é **apagada automaticamente após 30 dias**.
4. O administrador entra em **"Área do administrador"** (usuário `admin`) para apagar mensagens individuais ou limpar o mural. Como o site é estático, essa senha é só uma porta de tela — a segurança real é a senha do e-mail.

## 📞 Contatos das empresas (verifique periodicamente)

Cada página de empresa tem um bloco "Outras formas oficiais" com **Telefone** e **WhatsApp** pesquisados nos sites oficiais (ex.: Enel 0800 72 72 120 + WhatsApp Elena; Sabesp 0800 055 0195 + WhatsApp Sani). Como mudanças acontecem, revise os números a cada trimestre.

## 🚀 Como publicar gratuitamente (GitHub Pages)

1. Crie uma conta no [GitHub](https://github.com)
2. Crie um novo repositório público chamado `linkcontas`
3. Faça upload de todos os arquivos (`index.html`, pastas `css` e `js`, demais páginas HTML)
4. No repositório, vá em **Settings → Pages**
5. Em **Build and deployment**, selecione branch `main` e pasta `/ (root)`
6. Salve. Seu site estará online em `https://seuusuario.github.io/linkcontas`

Alternativa: use **Vercel** ou **Netlify**.

## 🎨 Tema claro / escuro

O site detecta automaticamente o tema do sistema do usuário, mas permite alternar manualmente clicando no botão 🌙/☀️ no cabeçalho. A escolha é salva no navegador (localStorage) e mantida em visitas futuras.

## 💰 Monetização

O site tem espaços reservados para anúncios:

- **Google AdSense:** cole o código nos `div.ad-placeholder` (topo e rodapé)
- **Banner direto:** substitua o conteúdo do placeholder por uma imagem/link
- **Pix / "cafezinho":** já configurado em `contato.html` (chave: a5dccde0-8045-4dbd-89b4-905b4e44701c, e-mail: alessandrobr2012@gmail.com)

## 🏢 Links atuais das empresas (verifique periodicamente)

| Empresa | Categoria | Link configurado | Observação |
|---------|-----------|------------------|------------|
| Enel | Energia | `https://www.enel.com.br/content/enel-br/pt-saopaulo/login.html` | Link pode variar por estado (SP, RJ, MG, CE, GO, etc.) |
| Light | Energia | `https://agenciavirtual.light.com.br/portal/` | Rio de Janeiro |
| CEMIG | Energia | `https://www.cemig.com.br/agenciavirtual` | Minas Gerais |
| CPFL | Energia | `https://www.cpfl.com.br` | Verificar link direto de pagamento |
| EDP | Energia | `https://www.edponline.com.br` | Verificar link direto de pagamento |
| CEEE | Energia | `https://www.ceee.com.br` | Rio Grande do Sul |
| Claro | Telefone | `https://www.claro.com.br/minho-claro` | |
| Vivo | Telefone | `https://app.vivo.com.br/web` | |
| TIM | Telefone | `https://www.tim.com.br/meu-tim` | |
| Oi | Telefone | `https://www.oi.com.br` | |
| Sabesp | Água | `https://www.sabesp.com.br/agenciavirtual` | São Paulo |
| Copasa | Água | `https://www.copasa.com.br` | Minas Gerais |
| CEDAE | Água | `https://www.cedae.com.br` | Rio de Janeiro |
| Sanepar | Água | `https://www.sanepar.com.br` | Paraná |
| SKY | Internet/TV | `https://www.sky.com.br` | |
| Algar | Internet/TV | `https://www.algartelecom.com.br` | |

### ⚠️ Importante sobre os links
As URLs das áreas de login/pagamento das empresas **podem mudar com o tempo**. Verifique periodicamente se os links ainda funcionam corretamente acessando cada um pelo seu navegador. Se algum link quebrar, edite o arquivo `js/script.js` e atualize a `urlPagamento` ou a `url`.

### Como adicionar mais empresas

Edite o arquivo `js/script.js` e inclua novos objetos no array `empresas`:

```javascript
{
  id: 'nova-empresa',
  nome: 'Nome da Empresa',
  categoria: 'energia', // energia | telefone | agua | internet
  url: 'https://siteoficial.com.br',
  urlPagamento: 'https://siteoficial.com.br/login',
  icone: '⚡',
  descricao: 'Breve descrição'
}
```

Categorias válidas: `energia`, `telefone`, `agua`, `internet`.

## 👴 Acessibilidade para idosos

- Botões grandes e fáceis de tocar/clicar
- Fonte aumentada para leitura confortável
- Todos os links abrem em **nova aba** (não sai do site LinkContas)
- Contraste adequado nos dois temas (claro/escuro)

## ⚖️ Aviso legal

Este site é um **indicador de links**. Não armazena dados financeiros, não processa pagamentos e não é responsável pelos conteúdos dos sites das empresas terceiras. Sempre confirme valores e vencimentos no site oficial de cada concessionária.

## 🏷️ Registro de marca

Recomendado verificar disponibilidade do nome **LinkContas** no INPI (classes 35 e 36) antes de divulgar amplamente.