/*
 * Dados do PMRR Porto Alegre
 * Fonte: Relatório PMRR Porto Alegre — versão 2 (2026), Universidade Federal do
 * Rio Grande do Sul, em parceria com a Secretaria Nacional de Periferias
 * (Ministério das Cidades) e apoio da Prefeitura Municipal de Porto Alegre.
 * Mapeamento integrado PMRR-POA, SGB e DEMHAB/PMPA (IBGE, 2022).
 */

window.PMRR = (function () {

  // ===== Síntese geral — 204 setores nas áreas prioritárias =====
  const sintese = {
    setores: 204,
    pessoas: 8591,
    edificacoes: 3438,
    grau: {
      r3: { setores: 169, pessoas: 5497, edificacoes: 2302 },
      r4: { setores: 35, pessoas: 3094, edificacoes: 1136 }
    }
  };

  // ===== Tipologia dos processos perigosos (204 setores) =====
  const tipologia = [
    { tipo: "Hidrológicos", valor: 121, cor: "#2f8f9d" },
    { tipo: "Geodinâmicos", valor: 71, cor: "#b5651d" },
    { tipo: "Geodinâmicos + hidrológicos", valor: 12, cor: "#6a994e" }
  ];

  // ===== As 4 regiões prioritárias =====
  const regioes = [
    {
      id: "ilhas",
      nome: "Região das Ilhas", local: "Ilha Grande dos Marinheiros",
      setores: 27, pessoas: 2150, edificacoes: 854,
      r3: 11, r4: 16, processo: "100% hidrológicos (inundações)",
      lat: -30.000, lng: -51.270, cor: "#1b7a5a",
      contexto: {
        caracterizacao: "Conjunto de 16 ilhas no Delta do Jacuí (criado em 1944). A Ilha Grande dos Marinheiros está dentro de duas áreas de proteção ambiental estaduais.",
        fisica: "Planície flúvio-lagunar com solos saturados e de baixa capacidade de suporte. É o local mais exposto da cidade a inundações — sempre o primeiro a ser atingido — e não está protegido pelo sistema de diques.",
        urbano: "Depende da precipitação em toda a Região Hidrográfica do Guaíba (84,6 mil km²) e pode ser potencializado por ventos do quadrante sul."
      }
    },
    {
      id: "norte",
      nome: "Região Norte", local: "Bairro Santa Rosa de Lima",
      setores: 7, pessoas: 2202, edificacoes: 933,
      r3: 6, r4: 1, processo: "100% hidrológicos (inundações, enxurradas e alagamentos)",
      lat: -29.992, lng: -51.135, cor: "#2a9d72",
      contexto: {
        caracterizacao: "Área rural até meados do século XX, com ocupação acelerada a partir dos anos 1970 e expansão recente (pós-2002) sobre áreas de várzea inundável.",
        fisica: "Planície de inundação (várzea) do Arroio Feijó, afluente do Rio Gravataí. Topografia plana e mal drenada, desprotegida pelo sistema de diques metropolitanos.",
        urbano: "Ocupação em consolidação sobre área de risco, com infraestrutura de drenagem ineficiente para o tipo de ameaça. Fortemente atingida na inundação de maio de 2024."
      }
    },
    {
      id: "leste",
      nome: "Região Leste", local: "Bairros Bom Jesus e Jardim Carvalho",
      setores: 56, pessoas: 1574, edificacoes: 628,
      r3: 50, r4: 6, processo: "17 hidrológicos · 30 geodinâmicos · 9 combinados",
      lat: -30.050, lng: -51.160, cor: "#155c47",
      contexto: {
        caracterizacao: "Ocupações irregulares iniciadas na década de 1950 (Bom Jesus) e em meados do século XX (Jardim Carvalho), em processo de urbanização espontâneo e desordenado.",
        fisica: "Topografia acidentada sobre morros graníticos, com declividades íngremes, na Bacia do Arroio Dilúvio. Solos saprolíticos suscetíveis à erosão.",
        urbano: "Urbanização densa, construções precárias e acessos críticos (becos estreitos, pontilhões improvisados e escadarias sem proteção). Drenagem comprometida por ocupações e acúmulo de resíduos nos cursos d'água."
      }
    },
    {
      id: "partenon",
      nome: "Região Partenon", local: "Partenon, Cel. Aparício Borges, Vila São José e Vila João Pessoa",
      setores: 114, pessoas: 2665, edificacoes: 1023,
      r3: 102, r4: 12, processo: "70 hidrológicos · 41 geodinâmicos · 3 combinados",
      lat: -30.066, lng: -51.172, cor: "#103b30",
      contexto: {
        caracterizacao: "Origem histórica no século XIX, com intensa expansão urbana recente (2002–2025) sobre encostas e margens de arroios — vetor de crescimento desordenado.",
        fisica: "Relevo acidentado de morros, na área central da Bacia do Arroio Dilúvio, com destaque para o Arroio Moinho e seus afluentes, de declividade acentuada e resposta hidrológica rápida.",
        urbano: "Ocupação sobre vertentes, padrão construtivo baixo e acessos extremamente críticos. Sistema de drenagem ineficiente e cursos d'água contaminados por esgoto."
      }
    }
  ];

  // ===== Processos perigosos (Cartilha PMRR-POA) =====
  const processosPerigosos = [
    { icone: "🌊", nome: "Inundações", desc: "Transbordamento dos rios, geralmente com baixas velocidades, em que a água invade as planícies ocupadas. As inundações do Guaíba dependem das chuvas em uma grande área do Estado e, em geral, podem ser previstas com dias de antecedência." },
    { icone: "💧", nome: "Enxurradas", desc: "Processos de alta velocidade em arroios e córregos dos bairros íngremes, com elevado poder destrutivo e alto risco à vida. Lixo e intervenções mal feitas agravam o perigo. São causadas por chuvas intensas e localizadas, de difícil previsão." },
    { icone: "🏚️", nome: "Alagamentos", desc: "Ocorrem quando a água da chuva se acumula em ruas e áreas urbanas por falhas no sistema de drenagem (bueiros, pontilhões, canalizações etc.)." },
    { icone: "⛰️", nome: "Escorregamentos e queda de blocos", desc: "Escorregamentos de cortes e aterros, quedas de muros e de blocos em áreas íngremes, associados a chuvas intensas, cortes muito inclinados e má drenagem. Podem trazer risco à vida." },
    { icone: "🪨", nome: "Erosão", desc: "Remoção do solo pela água, especialmente em áreas sem proteção. Causa descalçamento de muros junto a arroios e de fundações de casas, além da instabilização de blocos de rocha." }
  ];

  // ===== Soluções: medidas estruturais (tipos) =====
  const solucoesEstruturais = [
    { icone: "🪜", nome: "Escada de chuva", desc: "Estrutura que conduz a água da chuva de forma controlada, reduzindo a velocidade e possíveis erosões." },
    { icone: "🛢️", nome: "Bacias de amortecimento", desc: "Armazenam temporariamente a água da chuva e reduzem alagamentos a jusante." },
    { icone: "🗑️", nome: "Armadilhas de lixo", desc: "Estruturas que retêm resíduos sólidos, evitando entupimentos e alagamentos." },
    { icone: "🧱", nome: "Muros de contenção", desc: "Construídos com gabião, pedra ou concreto para conter o solo e evitar escorregamentos." },
    { icone: "🏠", nome: "Moradias elevadas", desc: "Casas construídas acima do nível de inundação para reduzir danos." }
  ];

  // ===== Soluções: medidas não estruturais (Cartilha) =====
  const solucoesNaoEstruturais = [
    "Núcleos Comunitários de Proteção e Defesa Civil (NUPDEC)",
    "Plano de ação comunitário articulado ao Plano de Contingência Municipal",
    "Sistemas de alerta e alarme",
    "Atividades educativas sobre o território e os riscos (inclusive na rede de ensino)",
    "Monitoramento e fiscalização das obras e da ocupação urbana",
    "Cartas Geotécnicas de Aptidão à Urbanização",
    "Assessoria técnica (ATHIS) para melhorias das moradias"
  ];

  // ===== Como a comunidade pode participar (Cartilha) =====
  const participacao = [
    { icone: "📢", titulo: "Comunicar situações de risco", desc: "Informar a Defesa Civil sobre entulho em arroios, queda de margens e barrancos, rachaduras em muros e moradias e ocupações inadequadas." },
    { icone: "🔔", titulo: "Ficar atento aos alertas", desc: "Acompanhar os avisos da Defesa Civil, respeitar orientações em emergências e não compartilhar informações falsas." },
    { icone: "🤝", titulo: "Participar de organizações", desc: "Integrar NUPDECs, reuniões e oficinas, contribuindo com o conhecimento local e criando redes de apoio." },
    { icone: "🧹", titulo: "Cuidar das moradias e do entorno", desc: "Não jogar lixo em arroios, valas e bocas de lobo; manter a drenagem desobstruída; evitar aterros mal construídos." }
  ];

  // ===== Critérios de escolha das áreas prioritárias =====
  const criterios = [
    {
      icone: "⚠️",
      titulo: "Ameaça iminente à vida",
      desc: "Áreas onde os processos hidrológicos ou geodinâmicos representam ameaça iminente à vida dos moradores."
    },
    {
      icone: "📍",
      titulo: "Histórico de ocorrências",
      desc: "Locais com registro histórico e frequência de eventos extremos, confirmados por danos observados e pelo relato das comunidades."
    },
    {
      icone: "🗂️",
      titulo: "Carência de intervenção planejada",
      desc: "Áreas sem projetos urbanísticos aprovados ou sem recursos alocados no curto prazo, que demandam a atuação do poder público."
    }
  ];

  // ===== Processo participativo =====
  const processo = { total: 50, audiencias: 2, oficinas: 33, caminhadas: 15 };

  // ===== Medidas estruturais priorizadas (tabela de priorização) =====
  // tipo: G = geotécnica, H = hidrológica
  // intervencao = nome real da obra; local = bairro/arroio (com o setor entre parênteses)
  const medidas = [
    { id: "G1", intervencao: "Contenção e estabilização de encosta", local: "Jardim Carvalho (091)", setor: "091/01", grau: "R4", bairro: "Jardim Carvalho", tipo: "G", domicilios: 4, custo: 62011.19, remocoes: 0, lat: -30.0525, lng: -51.1662 },
    { id: "G2", intervencao: "Contenção e estabilização de encosta", local: "Partenon (150)", setor: "150/01-04", grau: "R4", bairro: "Partenon", tipo: "G", domicilios: 19, custo: 649941.28, remocoes: 0, lat: -30.0588, lng: -51.1764 },
    { id: "G3", intervencao: "Contenção de encosta", local: "Vila São José (117)", setor: "117/01", grau: "R4", bairro: "Vila São José", tipo: "G", domicilios: 10, custo: 877855.64, remocoes: 2, lat: -30.0701, lng: -51.1702 },
    { id: "G4", intervencao: "Contenção e estabilização de encosta", local: "Jardim Carvalho (094)", setor: "094/09", grau: "R4", bairro: "Jardim Carvalho", tipo: "G", domicilios: 3, custo: 489648.84, remocoes: 0, lat: -30.0548, lng: -51.1690 },
    { id: "G5", intervencao: "Contenção e estabilização de encosta", local: "Partenon (105/01)", setor: "105/01", grau: "R3", bairro: "Partenon", tipo: "G", domicilios: 4, custo: 22576.27, remocoes: 0, lat: -30.0572, lng: -51.1748 },
    { id: "G6", intervencao: "Contenção e estabilização de encosta", local: "Jardim Carvalho (095)", setor: "095/01", grau: "R3", bairro: "Jardim Carvalho", tipo: "G", domicilios: 24, custo: 349609.68, remocoes: 0, lat: -30.0560, lng: -51.1700 },
    { id: "G7", intervencao: "Contenção e estabilização de encosta", local: "Partenon (105/02-04)", setor: "105/02-04", grau: "R3", bairro: "Partenon", tipo: "G", domicilios: 39, custo: 1140344.85, remocoes: 0, lat: -30.0576, lng: -51.1752 },
    { id: "H1", intervencao: "Rede de drenagem pluvial", local: "Partenon (150)", setor: "150/01-04", grau: "R4", bairro: "Partenon", tipo: "H", domicilios: 50, custo: 1611137.96, remocoes: 0, lat: -30.0590, lng: -51.1766 },
    { id: "H2", intervencao: "Rede de drenagem e reassentamento", local: "Arroio Moinho — Cel. Ap. Borges / V. João Pessoa (123)", setor: "123/01-44", grau: "R4", bairro: "Cel. Aparício Borges / V. João Pessoa", tipo: "H", domicilios: 451, custo: 18760773.34, remocoes: 15, lat: -30.0690, lng: -51.1680 },
    { id: "H3", intervencao: "Rede de drenagem pluvial", local: "Vila São José (121)", setor: "121/02; 04-11", grau: "R4", bairro: "Vila São José / Cel. Aparício Borges", tipo: "H", domicilios: 101, custo: 5016829.04, remocoes: 3, lat: -30.0660, lng: -51.1738 },
    { id: "H4", intervencao: "Bacia de amortecimento e estabilização de margens", local: "Bom Jesus — Arroio Riacho Doce (110)", setor: "110/01-08", grau: "R4", bairro: "Bom Jesus", tipo: "H", domicilios: 178, custo: 11979854.67, remocoes: 17, lat: -30.0470, lng: -51.1500 },
    { id: "H5", intervencao: "Bacia de amortecimento e reassentamento", local: "Bom Jesus — Arroio Mem de Sá (109)", setor: "109/01-04", grau: "R4", bairro: "Bom Jesus", tipo: "H", domicilios: 164, custo: 12267179.01, remocoes: 18, lat: -30.0445, lng: -51.1545 },
    { id: "H6", intervencao: "Rede de drenagem e reassentamento", local: "Jardim Carvalho (094)", setor: "094 (vários)", grau: "R4", bairro: "Jardim Carvalho", tipo: "H", domicilios: 155, custo: 14621133.26, remocoes: 11, lat: -30.0545, lng: -51.1692 },
    { id: "H7", intervencao: "Estabilização de margens", local: "Jardim Carvalho (091)", setor: "091/02; 03; 05", grau: "R4", bairro: "Jardim Carvalho", tipo: "H", domicilios: 5, custo: 482800.61, remocoes: 1, lat: -30.0528, lng: -51.1664 },
    { id: "H8", intervencao: "Drenagem superficial", local: "Vila São José (117)", setor: "117/16; 23", grau: "R3", bairro: "Vila São José", tipo: "H", domicilios: 45, custo: 139248.40, remocoes: 0, lat: -30.0680, lng: -51.1720 },
    { id: "H9", intervencao: "Escadas hidráulicas e estabilização de margens", local: "Vila São José (119)", setor: "119/01-03; 07-08", grau: "R3", bairro: "Vila São José / Cel. Aparício Borges", tipo: "H", domicilios: 52, custo: 305659.26, remocoes: 0, lat: -30.0670, lng: -51.1730 },
    { id: "H10", intervencao: "Drenagem pluvial", local: "Jardim Carvalho — Beco Souza Costa (090)", setor: "090/01", grau: "R3", bairro: "Jardim Carvalho", tipo: "H", domicilios: 4, custo: 79050.35, remocoes: 0, lat: -30.0510, lng: -51.1640 },
    { id: "H11", intervencao: "Rede de drenagem pluvial", local: "Partenon (106)", setor: "106/01", grau: "R3", bairro: "Partenon", tipo: "H", domicilios: 80, custo: 2386837.81, remocoes: 0, lat: -30.0575, lng: -51.1750 },
    { id: "H12", intervencao: "Drenagem e pavimentação de becos", local: "Jardim Carvalho (092)", setor: "092 (vários)", grau: "R3", bairro: "Jardim Carvalho", tipo: "H", domicilios: 65, custo: 2519443.52, remocoes: 0, lat: -30.0535, lng: -51.1675 },
    { id: "H13", intervencao: "Rede de drenagem pluvial", local: "Jardim Carvalho (095)", setor: "095/02", grau: "R3", bairro: "Jardim Carvalho", tipo: "H", domicilios: 10, custo: 473893.48, remocoes: 0, lat: -30.0562, lng: -51.1702 },
    { id: "H14", intervencao: "Galeria de by-pass", local: "Vila São José (055)", setor: "055/01-02", grau: "R3", bairro: "Vila São José", tipo: "H", domicilios: 35, custo: 2108423.10, remocoes: 0, lat: -30.0700, lng: -51.1690 },
    { id: "H15", intervencao: "Rede de drenagem pluvial", local: "Cel. Aparício Borges (122)", setor: "122/02; 03", grau: "R3", bairro: "Cel. Aparício Borges", tipo: "H", domicilios: 59, custo: 3583063.00, remocoes: 3, lat: -30.0655, lng: -51.1755 },
    { id: "H16", intervencao: "Rede de drenagem pluvial", local: "Cel. Aparício Borges (051)", setor: "051/01-05", grau: "R3", bairro: "Cel. Aparício Borges", tipo: "H", domicilios: 41, custo: 4767876.49, remocoes: 3, lat: -30.0650, lng: -51.1745 },
    { id: "H17", intervencao: "Bacia de amortecimento e reassentamento", local: "Vila João Pessoa (054)", setor: "054/01-04", grau: "R3", bairro: "Vila João Pessoa", tipo: "H", domicilios: 25, custo: 4032407.51, remocoes: 7, lat: -30.0730, lng: -51.1660 }
  ];

  const medidasResumo = {
    total: 24, hidrologicas: 17, geotecnicas: 7,
    investimento: 88727598.56,
    domicilios: 1623,
    custoMedio: 54668.88,
    remocoes: 80,
    menor: { valor: 22576.27, setor: "105/01", bairro: "Partenon" },
    maior: { valor: 18760773.34, setor: "123/01-44", local: "Arroio Moinho" }
  };

  // ===== As 4 etapas do PMRR =====
  const etapas = [
    { n: 1, titulo: "Planejamento da execução", desc: "Constituição da equipe, formação do Comitê Gestor Municipal e definição dos métodos e do cronograma." },
    { n: 2, titulo: "Mobilização, oficinas e mapeamento", desc: "Definição das áreas prioritárias, oficinas comunitárias e mapeamento e setorização dos riscos." },
    { n: 3, titulo: "Plano e ações estruturais e não estruturais", desc: "Proposição e detalhamento das intervenções nas áreas prioritárias, com estimativas de custos." },
    { n: 4, titulo: "Relatório final e sumário executivo", desc: "Audiência pública e entrega dos produtos ao Ministério das Cidades e à Prefeitura." }
  ];

  // ===== Os produtos do PMRR =====
  const produtos = [
    { icone: "🗺️", titulo: "Mapas de perigo e risco", publico: "Defesa Civil e gestão pública", desc: "Mapeamento e setorização das áreas de risco geológico e hidrológico, com levantamento de alta resolução (inclusive por drone)." },
    { icone: "📘", titulo: "Cartilha de comunicação de riscos", publico: "Sociedade em geral", desc: "Material em linguagem acessível sobre os processos perigosos, as medidas de prevenção e como as comunidades podem participar." },
    { icone: "🏗️", titulo: "Medidas estruturais e não estruturais", publico: "Poder público", desc: "Propostas de obras (drenagem, contenção, bacias de amortecimento) e de ações de gestão, alerta e organização comunitária." },
    { icone: "🤝", titulo: "Processo participativo", publico: "Comunidades e lideranças", desc: "50 atividades com moradores, lideranças, agentes de saúde e subprefeituras, integrando o conhecimento local ao diagnóstico técnico." }
  ];

  // ===== Materiais / downloads =====
  const materiais = [
    { titulo: "Cartilha do PMRR (PDF)", url: "https://drive.google.com/file/d/1hhIp-rgB69nEqpDgWXFWDolauF07OCnL/view" },
    { titulo: "Relatório PMRR — Etapa 2, Volume 1 (PDF)", url: "https://drive.google.com/file/d/1IFJY8X4Q54Zs9vYAqF-nNI2KWTnxVutG/view" },
    { titulo: "Relatório PMRR — Etapa 2, Volume 2 (PDF)", url: "https://drive.google.com/file/d/1Ub5YUW9pBDZEpcVy5Fh9t5O3vhjcniko/view" },
    { titulo: "Pasta do projeto PMRR no Google Drive", url: "https://drive.google.com/drive/folders/1-b2_Btctn2KLY8N_KeEZaMou86f1FOfJ" }
  ];

  // ===== Telefones úteis (Cartilha PMRR-POA) =====
  const contatos = [
    { nome: "Emergências / Defesa Civil", tel: "199" },
    { nome: "Corpo de Bombeiros", tel: "193" },
    { nome: "SAMU", tel: "192" },
    { nome: "Central do Cidadão (PMPA)", tel: "156" }
  ];

  // ===== Créditos =====
  const creditos = {
    instituicao: "Universidade Federal do Rio Grande do Sul (UFRGS)",
    parceria: "Secretaria Nacional de Periferias (Ministério das Cidades) · apoio da Prefeitura Municipal de Porto Alegre",
    periodo: "março/2024 a março/2026"
  };

  return {
    sintese, tipologia, regioes, criterios, processo,
    processosPerigosos, solucoesEstruturais, solucoesNaoEstruturais, participacao,
    medidas, medidasResumo,
    etapas, produtos, materiais, contatos, creditos
  };
})();
