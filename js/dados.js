/* =====================================
   LINKCONTAS — Fonte única de dados
   =====================================
   Cadastro estruturado das empresas.
   Usado pelo catálogo (index), pela página Sobre (estatísticas)
   e como referência para as páginas de empresa.

   REGRA: nenhum endereço oficial é inventado. As URLs vêm do
   cadastro original do projeto; a data de verificação é a data
   em que a página da empresa foi atualizada/gerada.

   Campos por empresa:
     id           identificador estável
     nome         nome oficial de exibição
     categoria    energia | agua | telefone | internet | consultas
      categorias   lista com categorias adicionais (opcional) — a empresa passa a
                   aparecer também nesses filtros (ex.: telefonia vende internet)
     sigla        duas letras (fallback quando não há logo)
     cor          cor da marca (usada no avatar do cartão)
     logo         caminho do logo em assets/logos (opcional)
     pagina       página interna da empresa (opcional)
     url          site oficial / portal do cliente
     urlPagamento canal direto de 2ª via / pagamento (quando específico)
     tipoCanal    rótulo honesto do destino do botão principal
     descricao    descrição curta
     alcance      'nacional' | 'estadual' | 'regional'
     estados      UFs atendidas ([] quando não confirmado)
     regiao       região principal (Sudeste, Sul, Nordeste, Nacional...)
     aliases      apelidos/siglas para a busca (sem acento ajuda, a busca normaliza)
     verificado   data da última atualização da página/registro (AAAA-MM-DD)
     canais       outros canais oficiais confirmados (telefone/whatsapp/app)
   ===================================== */

(function () {
  'use strict';

  var CATEGORIAS = [
    { chave: 'energia',   label: 'Energia elétrica',  icone: 'raio',     desc: 'Conta de luz' },
    { chave: 'agua',      label: 'Água e esgoto',     icone: 'gota',     desc: 'Conta de água' },
    { chave: 'telefone',  label: 'Telefone e celular', icone: 'celular', desc: 'Fixo, móvel e planos' },
    { chave: 'internet',  label: 'Internet e TV',     icone: 'wifi',     desc: 'Banda larga e TV' },
    { chave: 'consultas', label: 'Consultas e pendências', icone: 'lupa', desc: 'Dívidas e score' }
  ];

  var REGIOES = [
    { chave: 'norte',     label: 'Norte' },
    { chave: 'nordeste',  label: 'Nordeste' },
    { chave: 'centro-oeste', label: 'Centro-Oeste' },
    { chave: 'sudeste',   label: 'Sudeste' },
    { chave: 'sul',       label: 'Sul' },
    { chave: 'nacional',  label: 'Nacional' }
  ];

  var EMPRESAS = [
    {
      id: 'enel', nome: 'Enel Distribuição', categoria: 'energia',
      sigla: 'EN', cor: '#E2001A', logo: 'assets/logos/enel.png',
      pagina: 'enel-sp.html',
      url: 'https://www.enel.com.br/content/enel-br/pt-saopaulo/login.html',
      urlPagamento: 'https://www.enel.com.br/content/enel-br/pt-saopaulo/login.html',
      tipoCanal: 'Portal do cliente — 2ª via e pagamento',
      descricao: 'Conta de luz — São Paulo (o link pode variar por estado)',
      alcance: 'estadual', estados: ['SP'], regiao: 'sudeste',
      aliases: ['enel', 'enel sao paulo', 'enel sp', 'enel distribuicao', 'luz sao paulo'],
      verificado: '2026-11-12',
      canais: []
    },
    {
      id: 'light', nome: 'Light', categoria: 'energia',
      sigla: 'LI', cor: '#F58220', logo: 'assets/logos/light.png',
      pagina: 'light.html',
      url: 'https://agenciavirtual.light.com.br/portal/',
      urlPagamento: 'https://agenciavirtual.light.com.br/portal/',
      tipoCanal: 'Agência Virtual — 2ª via e pagamento',
      descricao: 'Conta de luz — Rio de Janeiro',
      alcance: 'estadual', estados: ['RJ'], regiao: 'sudeste',
      aliases: ['light', 'luz rio', 'luz rio de janeiro'],
      verificado: '2026-11-13',
      canais: [
        { tipo: 'telefone', rotulo: 'Telefone', valor: '0800 021 0196 (SAC, 24 horas)' },
        { tipo: 'whatsapp', rotulo: 'WhatsApp', valor: '(21) 99981-6059 (assistente Lia)' }
      ]
    },
    {
      id: 'cemig', nome: 'CEMIG', categoria: 'energia',
      sigla: 'CM', cor: '#003A70', logo: 'assets/logos/cemig.png',
      pagina: 'cemig.html',
      url: 'https://atende.cemig.com.br/Login',
      urlPagamento: 'https://atende.cemig.com.br/Login',
      tipoCanal: 'Portal do cliente — 2ª via e pagamento',
      descricao: 'Conta de luz — Minas Gerais',
      alcance: 'estadual', estados: ['MG'], regiao: 'sudeste',
      aliases: ['cemig', 'luz minas', 'luz minas gerais'],
      verificado: '2026-11-13',
      canais: [
        { tipo: 'telefone', rotulo: 'Telefone', valor: '116 (em Minas Gerais) ou 0800 721 0116 (de outros estados)' },
        { tipo: 'whatsapp', rotulo: 'WhatsApp', valor: '(31) 3506-1160' }
      ]
    },
    {
      id: 'cpfl', nome: 'CPFL Energia', categoria: 'energia',
      sigla: 'CP', cor: '#0033A0', logo: 'assets/logos/cpfl.png',
      pagina: 'cpfl.html',
      url: 'https://www.cpfl.com.br',
      urlPagamento: 'https://www.cpfl.com.br',
      tipoCanal: 'Site oficial — acesso à área do cliente',
      descricao: 'Conta de luz — São Paulo, Rio Grande do Sul e outras regiões',
      alcance: 'estadual', estados: ['SP', 'RS'], regiao: 'sudeste',
      aliases: ['cpfl', 'cpfl energia', 'cpfl paulista', 'piratininga', 'rge', 'luz interior'],
      verificado: '2026-11-13',
      canais: [
        { tipo: 'telefone', rotulo: 'Telefone', valor: 'CPFL Paulista: 0800 010 10 10 | Piratininga: 0800 010 25 70 | Santa Cruz: 0800 772 21 96 | RGE: 0800 970 09 00' }
      ]
    },
    {
      id: 'edp', nome: 'EDP', categoria: 'energia',
      sigla: 'ED', cor: '#E30613', logo: 'assets/logos/edp.png',
      pagina: 'edp.html',
      url: 'https://www.edponline.com.br/para-sua-casa/login',
      urlPagamento: 'https://www.edponline.com.br/para-sua-casa/login',
      tipoCanal: 'Portal do cliente — 2ª via e pagamento',
      descricao: 'Conta de luz — Espírito Santo e São Paulo',
      alcance: 'estadual', estados: ['ES', 'SP'], regiao: 'sudeste',
      aliases: ['edp', 'edp espirito santo', 'edp sao paulo', 'luz espirito santo'],
      verificado: '2026-11-13',
      canais: [
        { tipo: 'telefone', rotulo: 'Telefone', valor: 'São Paulo: 0800 721 0123 | Espírito Santo: 0800 721 0707 (24 horas)' },
        { tipo: 'whatsapp', rotulo: 'WhatsApp', valor: 'São Paulo: (11) 93465-2888 | Espírito Santo: (27) 99772-2549' }
      ]
    },
    {
      id: 'ceee', nome: 'CEEE Equatorial', categoria: 'energia',
      sigla: 'CS', cor: '#00539F', logo: 'assets/logos/ceee.png',
      pagina: 'ceee.html',
      url: 'https://ceee.equatorialenergia.com.br/',
      urlPagamento: 'https://ceee.equatorialenergia.com.br/',
      tipoCanal: 'Portal do cliente — 2ª via e pagamento',
      descricao: 'Conta de luz — Rio Grande do Sul',
      alcance: 'estadual', estados: ['RS'], regiao: 'sul',
      aliases: ['ceee', 'ceee equatorial', 'equatorial', 'luz rio grande do sul', 'luz rs'],
      verificado: '2026-11-13',
      canais: [
        { tipo: 'telefone', rotulo: 'Telefone', valor: '0800 721 2333 (24 horas, no Rio Grande do Sul)' },
        { tipo: 'whatsapp', rotulo: 'WhatsApp', valor: '(51) 3382-5500 (assistente Clara)' }
      ]
    },
    {
      id: 'sabesp', nome: 'Sabesp', categoria: 'agua',
      sigla: 'SA', cor: '#004B8D', logo: 'assets/logos/sabesp.png',
      pagina: 'sabesp.html',
      url: 'https://novaagenciavirtual.sabesp.com.br/',
      urlPagamento: 'https://novaagenciavirtual.sabesp.com.br/',
      tipoCanal: 'Agência Virtual — 2ª via e pagamento',
      descricao: 'Conta de água — São Paulo',
      alcance: 'estadual', estados: ['SP'], regiao: 'sudeste',
      aliases: ['sabesp', 'agua sao paulo', 'agua sp'],
      verificado: '2026-11-13',
      canais: [
        { tipo: 'telefone', rotulo: 'Telefone', valor: '0800 055 0195 (24 horas)' },
        { tipo: 'whatsapp', rotulo: 'WhatsApp', valor: '(11) 3388-8000 (assistente Sani)' }
      ]
    },
    {
      id: 'copasa', nome: 'Copasa', categoria: 'agua',
      sigla: 'CO', cor: '#0055A5', logo: 'assets/logos/copasa.png',
      pagina: 'copasa.html',
      url: 'https://copasaportalprd.azurewebsites.net/Copasa.Portal/Login/Index',
      urlPagamento: 'https://copasaportalprd.azurewebsites.net/Copasa.Portal/Login/Index',
      tipoCanal: 'Portal do cliente — 2ª via e pagamento',
      descricao: 'Conta de água — Minas Gerais',
      alcance: 'estadual', estados: ['MG'], regiao: 'sudeste',
      aliases: ['copasa', 'agua minas', 'agua minas gerais'],
      verificado: '2026-11-13',
      canais: [
        { tipo: 'telefone', rotulo: 'Telefone', valor: '0800 0300 115 (ou disque 115)' },
        { tipo: 'whatsapp', rotulo: 'WhatsApp', valor: '(31) 99770-7000' }
      ]
    },
    {
      id: 'cedae', nome: 'CEDAE', categoria: 'agua',
      sigla: 'CD', cor: '#003DA5', logo: 'assets/logos/cedae.png',
      pagina: 'cedae.html',
      url: 'https://agenciavirtual.cedae.com.br/csp?id=csp_segunda_via',
      urlPagamento: 'https://agenciavirtual.cedae.com.br/csp?id=csp_segunda_via',
      tipoCanal: 'Agência Virtual — 2ª via e pagamento',
      descricao: 'Conta de água — Rio de Janeiro',
      alcance: 'estadual', estados: ['RJ'], regiao: 'sudeste',
      aliases: ['cedae', 'agua rio', 'agua rio de janeiro', 'aguas do rio'],
      verificado: '2026-11-13',
      canais: [
        { tipo: 'telefone', rotulo: 'Telefone', valor: '0800 28 21 195 (SAC, 24 horas)' },
        { tipo: 'whatsapp', rotulo: 'WhatsApp', valor: '0800 195 0 195 (Águas do Rio, onde a concessão mudou)' }
      ]
    },
    {
      id: 'sanepar', nome: 'Sanepar', categoria: 'agua',
      sigla: 'SN', cor: '#003DA5', logo: 'assets/logos/sanepar.png',
      pagina: 'sanepar.html',
      url: 'https://clientes.sanepar.com.br/',
      urlPagamento: 'https://clientes.sanepar.com.br/',
      tipoCanal: 'Portal do cliente — 2ª via e pagamento',
      descricao: 'Conta de água — Paraná',
      alcance: 'estadual', estados: ['PR'], regiao: 'sul',
      aliases: ['sanepar', 'agua parana'],
      verificado: '2026-11-13',
      canais: [
        { tipo: 'telefone', rotulo: 'Telefone', valor: '0800 200 0115' },
        { tipo: 'whatsapp', rotulo: 'WhatsApp', valor: '(41) 99544-0115 (assistente Sane)' }
      ]
    },
    {
      id: 'claro', nome: 'Claro', categoria: 'telefone', categorias: ['internet'],
      sigla: 'CL', cor: '#DA291C', logo: 'assets/logos/claro.png',
      pagina: 'claro.html',
      url: 'https://minhaclaro.claro.com.br/acesso-rapido/',
      urlPagamento: 'https://minhaclaro.claro.com.br/acesso-rapido/',
      tipoCanal: 'Minha Claro — acesso rápido',
      descricao: 'Telefone fixo, móvel e internet',
      alcance: 'nacional', estados: [], regiao: 'nacional',
      aliases: ['claro', 'minha claro', 'claro movel', 'claro fixo', 'claro internet'],
      verificado: '2026-11-13',
      canais: [
        { tipo: 'telefone', rotulo: 'Telefone', valor: 'Celular: 1052 | Banda larga, TV e fixo: 10621 | TV via satélite: 10699' },
        { tipo: 'whatsapp', rotulo: 'WhatsApp', valor: '(11) 99991-0621' }
      ]
    },
    {
      id: 'vivo', nome: 'Vivo', categoria: 'telefone', categorias: ['internet'],
      sigla: 'VI', cor: '#6A1B9A', logo: 'assets/logos/vivo.png',
      pagina: 'vivo.html',
      url: 'https://app.vivo.com.br/web',
      urlPagamento: 'https://app.vivo.com.br/web',
      tipoCanal: 'Portal do cliente — 2ª via e pagamento',
      descricao: 'Telefone, internet e TV',
      alcance: 'nacional', estados: [], regiao: 'nacional',
      aliases: ['vivo', 'vivo movel', 'vivo fibra', 'vivo internet', 'telefonica'],
      verificado: '2026-11-13',
      canais: [
        { tipo: 'telefone', rotulo: 'Telefone', valor: '103 15 (de qualquer telefone) ou *8486 (do celular Vivo)' },
        { tipo: 'whatsapp', rotulo: 'WhatsApp', valor: '(11) 99915-1515 (assistente Aura)' }
      ]
    },
    {
      id: 'tim', nome: 'TIM', categoria: 'telefone', categorias: ['internet'],
      sigla: 'TI', cor: '#0F4C81', logo: 'assets/logos/tim.png',
      pagina: 'tim.html',
      url: 'https://meutim.onelink.me/0IuD/u3fep93q',
      urlPagamento: 'https://meutim.onelink.me/0IuD/u3fep93q',
      tipoCanal: 'Meu TIM — acesso rápido',
      descricao: 'Telefone móvel e internet',
      alcance: 'nacional', estados: [], regiao: 'nacional',
      aliases: ['tim', 'meu tim', 'tim movel', 'tim live', 'tim internet'],
      verificado: '2026-11-13',
      canais: [
        { tipo: 'telefone', rotulo: 'Telefone', valor: '*144 (do celular TIM) ou 1056 (de qualquer telefone)' },
        { tipo: 'whatsapp', rotulo: 'WhatsApp', valor: '41 4141-4141' }
      ]
    },
    {
      id: 'oi', nome: 'Oi', categoria: 'telefone', categorias: ['internet'],
      sigla: 'OI', cor: '#F75B00', logo: 'assets/logos/oi.png',
      pagina: 'oi.html',
      url: 'https://www.oi.com.br/minha-oi/',
      urlPagamento: 'https://www.oi.com.br/minha-oi/',
      tipoCanal: 'Minha Oi — 2ª via e pagamento',
      descricao: 'Telefone fixo, móvel e internet',
      alcance: 'nacional', estados: [], regiao: 'nacional',
      aliases: ['oi', 'minha oi', 'oi movel', 'oi fibra', 'oi fixo'],
      verificado: '2026-11-13',
      canais: [
        { tipo: 'telefone', rotulo: 'Telefone', valor: 'Fixo e fibra: 103 31 | Móvel: 1057' },
        { tipo: 'whatsapp', rotulo: 'WhatsApp', valor: '(31) 3131-3131 (assistente Joice)' }
      ]
    },
    {
      id: 'gigamaisfibra', nome: 'Giga Mais Fibra', categoria: 'internet',
      sigla: 'GM', cor: '#00A859', logo: 'assets/logos/gigamaisfibra.png',
      pagina: 'gigamaisfibra.html',
      url: 'https://central-assinante.gigamaisfibra.com.br/',
      urlPagamento: 'https://sso.gigamaisfibra.com.br/auth/realms/gigamaisfibra/protocol/openid-connect/auth?client_id=central-do-assinante',
      tipoCanal: 'Central do assinante — 2ª via e pagamento',
      descricao: 'Internet fibra ótica',
      alcance: 'regional', estados: [], regiao: null,
      aliases: ['giga mais fibra', 'gigamaisfibra', 'giga fibra', 'giga+ fibra'],
      verificado: '2026-11-13',
      canais: []
    },
    {
      id: 'sky', nome: 'SKY', categoria: 'internet',
      sigla: 'SK', cor: '#003A70', logo: 'assets/logos/sky.png',
      pagina: 'sky.html',
      url: 'https://www.sky.com.br/minha-sky/login',
      urlPagamento: 'https://www.sky.com.br/minha-sky/login',
      tipoCanal: 'Minha SKY — 2ª via e pagamento',
      descricao: 'TV por assinatura e internet',
      alcance: 'nacional', estados: [], regiao: 'nacional',
      aliases: ['sky', 'minha sky', 'sky tv', 'sky banda larga'],
      verificado: '2026-11-13',
      canais: [
        { tipo: 'telefone', rotulo: 'Telefone', valor: '10611 (SAC)' },
        { tipo: 'whatsapp', rotulo: 'WhatsApp', valor: '3003-1180' }
      ]
    },
    {
      id: 'algar', nome: 'Algar Telecom', categoria: 'internet', categorias: ['telefone'],
      sigla: 'AL', cor: '#F26522',
      pagina: 'algar.html',
      url: 'https://algar.com.br/AreaCliente/portal-usuario/minhas-faturas.html/',
      urlPagamento: 'https://algar.com.br/AreaCliente/portal-usuario/minhas-faturas.html/',
      tipoCanal: 'Área do cliente — minhas faturas',
      descricao: 'Internet, telefone e TV',
      alcance: 'regional', estados: [], regiao: null,
      aliases: ['algar', 'algar telecom'],
      verificado: '2026-11-13',
      canais: [
        { tipo: 'telefone', rotulo: 'Telefone', valor: '103 12 (SAC, 24 horas)' },
        { tipo: 'whatsapp', rotulo: 'WhatsApp', valor: '(34) 99884-0123' }
      ]
    },
    {
      id: 'serasa', nome: 'Serasa', categoria: 'consultas',
      sigla: 'SE', cor: '#0092DF',
      pagina: 'serasa.html',
      url: 'https://www.serasa.com.br/',
      urlPagamento: 'https://www.serasa.com.br/',
      tipoCanal: 'Site oficial — consultas e negociação',
      descricao: 'Consulte pendências e negocie dívidas',
      alcance: 'nacional', estados: [], regiao: 'nacional',
      aliases: ['serasa', 'serasa limpa nome', 'consulta', 'pendencia', 'pendências', 'divida', 'dívida', 'negociacao', 'score', 'cpf', 'spc'],
      verificado: '2026-11-13',
      canais: [
        { tipo: 'telefone', rotulo: 'Telefone', valor: '3003-6300 (segunda a sexta, 8h às 20h)' },
        { tipo: 'whatsapp', rotulo: 'WhatsApp', valor: '(11) 99575-2096 (atendimento automático)' }
      ]
    },
    {
      id: 'energisa', nome: 'Energisa', categoria: 'energia',
      sigla: 'EG', cor: '#E4002B', pagina: 'energisa.html',
      url: 'https://servicos.energisa.com.br/segunda-via',
      urlPagamento: 'https://servicos.energisa.com.br/segunda-via',
      tipoCanal: 'Agência Digital — 2ª via e pagamento',
      descricao: 'Conta de luz — MG, SP, MT, MS, PB, SE, TO, RO e AC',
      alcance: 'nacional', estados: ['MG', 'SP', 'MT', 'MS', 'PB', 'SE', 'TO', 'RO', 'AC'], regiao: 'nacional',
      aliases: ['energisa', 'gisa', 'energisa mg', 'energisa 2 via', 'segunda via energisa'],
      verificado: '2026-11-16',
      canais: [
        { tipo: 'telefone', rotulo: 'Telefone', valor: 'MG 0800 032 0196 | MT 0800 6464 196 | MS 0800 722 7272 | PB 0800 083 0196 | SE 0800 079 0196 | TO 0800 721 3330 | RO 0800 647 0120 | AC 0800 647 7196' }
      ]
    },
    {
      id: 'coelba', nome: 'Neoenergia Coelba', categoria: 'energia',
      sigla: 'CB', cor: '#005CA9', pagina: 'coelba.html',
      url: 'https://agenciavirtual.neoenergia.com',
      urlPagamento: 'https://agenciavirtual.neoenergia.com',
      tipoCanal: 'Agência Virtual — 2ª via e pagamento',
      descricao: 'Conta de luz — Bahia',
      alcance: 'estadual', estados: ['BA'], regiao: 'nordeste',
      aliases: ['coelba', 'neoenergia coelba', 'neoenergia bahia', 'coelba 2 via', 'coelba segunda via'],
      verificado: '2026-11-16',
      canais: [
        { tipo: 'telefone', rotulo: 'Telefone', valor: '116 (central de teleatendimento)' },
        { tipo: 'whatsapp', rotulo: 'WhatsApp', valor: '(71) 3370-6350' }
      ]
    },
    {
      id: 'celpe', nome: 'Neoenergia Celpe', categoria: 'energia',
      sigla: 'CE', cor: '#F58220', pagina: 'celpe.html',
      url: 'https://neoenergia.com/web/pernambuco/segunda-via-de-conta',
      urlPagamento: 'https://neoenergia.com/web/pernambuco/segunda-via-de-conta',
      tipoCanal: 'Site oficial — 2ª via e pagamento',
      descricao: 'Conta de luz — Pernambuco',
      alcance: 'estadual', estados: ['PE'], regiao: 'nordeste',
      aliases: ['celpe', 'neoenergia celpe', 'neoenergia pernambuco', 'celpe 2 via', 'celpe segunda via'],
      verificado: '2026-11-16',
      canais: [
        { tipo: 'telefone', rotulo: 'Telefone', valor: '116 (central de teleatendimento)' },
        { tipo: 'whatsapp', rotulo: 'WhatsApp', valor: '(81) 3217-6990' }
      ]
    },
    {
      id: 'celesc', nome: 'Celesc', categoria: 'energia',
      sigla: 'CC', cor: '#003DA5', pagina: 'celesc.html',
      url: 'https://celesc.com.br/segunda-via',
      urlPagamento: 'https://celesc.com.br/segunda-via',
      tipoCanal: 'Site oficial — 2ª via e pagamento',
      descricao: 'Conta de luz — Santa Catarina',
      alcance: 'estadual', estados: ['SC'], regiao: 'sul',
      aliases: ['celesc', 'celesc 2 via', 'celesc segunda via', 'luz santa catarina'],
      verificado: '2026-11-16',
      canais: [
        { tipo: 'telefone', rotulo: 'Telefone', valor: '0800 048 0120 (atendimento comercial)' },
        { tipo: 'whatsapp', rotulo: 'WhatsApp', valor: '(48) 99860-0067' }
      ]
    },
    {
      id: 'embasa', nome: 'Embasa', categoria: 'agua',
      sigla: 'EM', cor: '#0055A5', pagina: 'embasa.html',
      url: 'https://atendimentovirtual.embasa.ba.gov.br',
      urlPagamento: 'https://atendimentovirtual.embasa.ba.gov.br',
      tipoCanal: 'Atendimento Virtual — 2ª via e pagamento',
      descricao: 'Conta de água — Bahia',
      alcance: 'estadual', estados: ['BA'], regiao: 'nordeste',
      aliases: ['embasa', 'embasa 2 via', 'embasa segunda via', 'agua bahia'],
      verificado: '2026-11-16',
      canais: [
        { tipo: 'telefone', rotulo: 'Telefone', valor: '0800 055 0195' },
        { tipo: 'whatsapp', rotulo: 'WhatsApp', valor: '(71) 9717-0999' }
      ]
    },
    {
      id: 'brisanet', nome: 'Brisanet', categoria: 'internet', categorias: ['telefone'],
      sigla: 'BR', cor: '#00A859', pagina: 'brisanet.html',
      url: 'https://brisacliente.brisanet.com.br/',
      urlPagamento: 'https://brisacliente.brisanet.com.br/',
      tipoCanal: 'Brisacliente — área do cliente',
      descricao: 'Internet fibra ótica — Nordeste',
      alcance: 'regional', estados: [], regiao: 'nordeste',
      aliases: ['brisanet', 'brisacliente', 'brisanet 2 via', 'brisanet fatura'],
      verificado: '2026-11-16',
      canais: [
        { tipo: 'telefone', rotulo: 'Telefone', valor: '10517 (SAC)' },
        { tipo: 'whatsapp', rotulo: 'WhatsApp', valor: '(84) 98111-8525' }
      ]
    }
  ];

  window.LC = {
    categorias: CATEGORIAS,
    regioes: REGIOES,
    empresas: EMPRESAS
  };
})();