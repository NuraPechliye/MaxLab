// misturas.js - lógica de mistura de reagentes (MaxLab)

// Nomes amigáveis para exibir no resultado
const nomes = {
    H2O: "Água",
    CH3COOH: "Vinagre",
    NaHCO3: "Bicarbonato de Sódio",
    NaCl: "Sal",
    C12H22O11: "Açúcar",
    HCl: "Ácido Clorídrico",
    NaOH: "Hidróxido de Sódio",
    CuSO4: "Sulfato de Cobre",
    AgNO3: "Nitrato de Prata",
    C2H5OH: "Etanol"
};

// Nomes amigáveis para as condições escolhidas no novo select
const nomesCondicao = {
    ambiente: "Temperatura Ambiente",
    quente: "Alta Temperatura (Aquecer)",
    frio: "Baixa Temperatura (Resfriar)",
    agitar: "Agitar / Misturar Vigorosamente",
    repouso: "Repouso (sem agitar)"
};

// Reações conhecidas. A chave é sempre "A-B" com A e B em ordem alfabética.
// Cada entrada tem: tipo (classificação), equacao (quando há reação química) e observacao (o que se vê/acontece).
const reacoes = {
    "CH3COOH-NaHCO3": {
        tipo: "Reação ácido-base com liberação de gás",
        equacao: "CH₃COOH + NaHCO₃ → CH₃COONa + H₂O + CO₂↑",
        observacao: "Forte efervescência imediata: o ácido acético reage com o bicarbonato liberando bolhas de gás carbônico (CO₂). Ao final, restam acetato de sódio dissolvido e água. É a clássica reação usada em experimentos de 'vulcão'. Reação exotérmica leve."
    },
    "HCl-NaHCO3": {
        tipo: "Reação ácido-base com liberação de gás",
        equacao: "NaHCO₃ + HCl → NaCl + H₂O + CO₂↑",
        observacao: "Efervescência intensa e rápida devido à liberação de CO₂, mais vigorosa que com o vinagre por se tratar de um ácido forte. Ao final da reação, obtém-se cloreto de sódio dissolvido em água."
    },
    "HCl-NaOH": {
        tipo: "Neutralização ácido forte-base forte",
        equacao: "HCl + NaOH → NaCl + H₂O",
        observacao: "Reação de neutralização completa e altamente exotérmica (libera bastante calor, o recipiente pode esquentar). O resultado final é uma solução de cloreto de sódio (sal de cozinha) com pH neutro (≈7), sem gás ou precipitado visível."
    },
    "CH3COOH-NaOH": {
        tipo: "Neutralização ácido fraco-base forte",
        equacao: "CH₃COOH + NaOH → CH₃COONa + H₂O",
        observacao: "Neutralização exotérmica, porém mais branda que com HCl. O produto é acetato de sódio dissolvido em água, com pH final ligeiramente básico (>7) devido à hidrólise do íon acetato."
    },
    "CuSO4-NaOH": {
        tipo: "Reação de precipitação (dupla troca)",
        equacao: "CuSO₄ + 2NaOH → Cu(OH)₂↓ + Na₂SO₄",
        observacao: "Formação imediata de um precipitado gelatinoso azul-claro de hidróxido de cobre II (Cu(OH)₂), que se deposita no fundo do recipiente. A solução perde a cor azul intensa original do sulfato de cobre."
    },
    "AgNO3-NaCl": {
        tipo: "Reação de precipitação (dupla troca)",
        equacao: "AgNO₃ + NaCl → AgCl↓ + NaNO₃",
        observacao: "Formação instantânea de um precipitado branco leitoso de cloreto de prata (AgCl), insolúvel em água. Esse precipitado escurece gradualmente quando exposto à luz, por fotodecomposição em prata metálica."
    },
    "AgNO3-HCl": {
        tipo: "Reação de precipitação (dupla troca)",
        equacao: "AgNO₃ + HCl → AgCl↓ + HNO₃",
        observacao: "Formação imediata de um precipitado branco e coalhado de cloreto de prata (AgCl), enquanto ácido nítrico (HNO₃) permanece dissolvido na solução. O precipitado também escurece com a exposição à luz."
    },
    "AgNO3-NaHCO3": {
        tipo: "Reação de precipitação com liberação de gás",
        equacao: "2AgNO₃ + 2NaHCO₃ → Ag₂CO₃↓ + 2NaNO₃ + H₂O + CO₂↑",
        observacao: "Formação de um precipitado esbranquiçado/amarelo-claro de carbonato de prata (Ag₂CO₃), acompanhada de uma leve liberação de gás carbônico."
    },
    "H2O-NaCl": {
        tipo: "Dissolução física (sem reação química)",
        equacao: "NaCl (s) → Na⁺ (aq) + Cl⁻ (aq)",
        observacao: "O sal se dissolve completamente, dissociando-se em íons sódio e cloreto. Forma-se uma solução salina transparente, sem mudança de cor, com leve liberação de calor (processo exotérmico de hidratação)."
    },
    "C12H22O11-H2O": {
        tipo: "Dissolução física (sem reação química)",
        equacao: "C₁₂H₂₂O₁₁ (s) → C₁₂H₂₂O₁₁ (aq)",
        observacao: "O açúcar se dissolve completamente por meio de pontes de hidrogênio com a água, sem se dissociar em íons (é uma molécula, não um sal). Resulta em uma solução transparente e doce."
    },
    "C2H5OH-H2O": {
        tipo: "Miscibilidade física (sem reação química)",
        equacao: "C₂H₅OH (l) + H₂O (l) → mistura homogênea",
        observacao: "O etanol se mistura à água em qualquer proporção (miscibilidade total), formando uma solução homogênea e transparente. O processo é exotérmico e pode haver uma leve contração de volume total."
    },
    "CuSO4-H2O": {
        tipo: "Dissolução física (sem reação química)",
        equacao: "CuSO₄ (s) → Cu²⁺ (aq) + SO₄²⁻ (aq)",
        observacao: "O sulfato de cobre se dissolve formando uma solução azul intensa, cor característica do íon cobre II hidratado [Cu(H₂O)₆]²⁺. A solução resultante é levemente ácida."
    },
    "AgNO3-H2O": {
        tipo: "Dissolução física (sem reação química)",
        equacao: "AgNO₃ (s) → Ag⁺ (aq) + NO₃⁻ (aq)",
        observacao: "O nitrato de prata se dissolve completamente, formando uma solução incolor. É sensível à luz: com o tempo, pode escurecer levemente devido à decomposição em prata metálica."
    },
    "H2O-NaOH": {
        tipo: "Dissolução física fortemente exotérmica",
        equacao: "NaOH (s) → Na⁺ (aq) + OH⁻ (aq)",
        observacao: "A soda cáustica se dissolve rapidamente, dissociando-se totalmente. O processo libera bastante calor (o recipiente pode ficar bem quente) e resulta em uma solução fortemente básica, com pH acima de 12."
    },
    "H2O-HCl": {
        tipo: "Diluição fortemente exotérmica",
        equacao: "HCl (g/aq) + H₂O (l) → H₃O⁺ (aq) + Cl⁻ (aq)",
        observacao: "O ácido se dissocia totalmente na água (ácido forte), liberando bastante calor no processo. O resultado é uma solução ácida diluída, com pH baixo."
    },
    "CH3COOH-H2O": {
        tipo: "Diluição (sem reação química)",
        equacao: "CH₃COOH (l) ⇌ CH₃COO⁻ (aq) + H⁺ (aq)",
        observacao: "O vinagre se dilui na água. Por ser um ácido fraco, apenas parte das moléculas se dissocia, resultando em uma solução ácida mais fraca (pH moderadamente ácido, entre 3 e 5)."
    },
    "H2O-NaHCO3": {
        tipo: "Dissolução física (sem reação química)",
        equacao: "NaHCO₃ (s) → Na⁺ (aq) + HCO₃⁻ (aq)",
        observacao: "O bicarbonato se dissolve completamente na água, sem liberação de gás (não há ácido presente). A solução final fica levemente básica, com pH próximo de 8."
    },
    "CH3COOH-NaCl": {
        tipo: "Sem reação química",
        equacao: null,
        observacao: "O sal é inerte diante do ácido fraco: apenas se dissolve na solução de vinagre, sem alterar sua acidez de forma significativa e sem formar precipitado ou gás."
    },
    "C12H22O11-CH3COOH": {
        tipo: "Sem reação química",
        equacao: null,
        observacao: "O açúcar simplesmente se dissolve na solução ácida do vinagre, formando uma mistura doce e azeda, sem qualquer reação química entre eles."
    },
    "CH3COOH-HCl": {
        tipo: "Mistura de ácidos (sem reação entre si)",
        equacao: null,
        observacao: "Os dois ácidos se misturam livremente. Como o HCl é um ácido forte e o CH₃COOH é fraco, a acidez final da mistura é dominada pelo ácido clorídrico, resultando em uma solução mais fortemente ácida."
    },
    "CH3COOH-CuSO4": {
        tipo: "Sem reação significativa",
        equacao: null,
        observacao: "O vinagre não reage de forma perceptível com o sulfato de cobre nessas condições. A solução permanece azul, apenas com leve aumento da acidez."
    },
    "AgNO3-CH3COOH": {
        tipo: "Possível precipitação parcial",
        equacao: "CH₃COOH + AgNO₃ → CH₃COOAg↓ (parcial) + HNO₃",
        observacao: "Em concentrações mais altas pode surgir um leve precipitado esbranquiçado de acetato de prata, pouco solúvel em água. Em soluções diluídas, a reação é pouco perceptível."
    },
    "C2H5OH-CH3COOH": {
        tipo: "Reação de esterificação (Fischer)",
        equacao: "CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O",
        observacao: "Formação de acetato de etila, um éster de cheiro adocicado e frutado característico, além de água. Em condições de laboratório, essa reação costuma ser lenta e reversível, sendo acelerada com aquecimento e catalisador ácido."
    },
    "NaCl-NaHCO3": {
        tipo: "Sem reação química",
        equacao: null,
        observacao: "Ambos os sais se dissolvem juntos na água, sem qualquer reação entre si. A solução final contém os íons Na⁺, Cl⁻ e HCO₃⁻ dissolvidos lado a lado."
    },
    "C12H22O11-NaHCO3": {
        tipo: "Sem reação química",
        equacao: null,
        observacao: "O açúcar se dissolve normalmente junto ao bicarbonato, sem qualquer alteração química perceptível entre as duas substâncias."
    },
    "NaHCO3-NaOH": {
        tipo: "Sem reação química",
        equacao: null,
        observacao: "Ambas as substâncias são básicas, então apenas se somam em solução, aumentando a alcalinidade geral. Não há formação de precipitado nem liberação de gás."
    },
    "CuSO4-NaHCO3": {
        tipo: "Reação de precipitação com liberação de gás",
        equacao: "CuSO₄ + 2NaHCO₃ → CuCO₃↓ + Na₂SO₄ + H₂O + CO₂↑",
        observacao: "Formação de um precipitado esverdeado-azulado (semelhante à malaquita) de carbonato básico de cobre, acompanhado de uma pequena liberação de bolhas de gás carbônico."
    },
    "C2H5OH-NaHCO3": {
        tipo: "Sem reação química (baixa solubilidade)",
        equacao: null,
        observacao: "O bicarbonato de sódio se dissolve pouco em etanol, permanecendo parcialmente em suspensão no fundo do recipiente. Não há reação química perceptível."
    },
    "C12H22O11-NaCl": {
        tipo: "Sem reação química",
        equacao: null,
        observacao: "Sal e açúcar se dissolvem juntos na água, formando uma solução salgada e doce ao mesmo tempo, sem qualquer interação química entre eles."
    },
    "HCl-NaCl": {
        tipo: "Sem reação química (efeito do íon comum)",
        equacao: null,
        observacao: "O cloreto de sódio se dissolve na solução ácida sem reagir quimicamente com o HCl. Pode ocorrer uma leve redução na solubilidade do sal devido ao efeito do íon comum (Cl⁻), mas sem formação de precipitado visível."
    },
    "NaCl-NaOH": {
        tipo: "Sem reação química",
        equacao: null,
        observacao: "O sal se dissolve normalmente na solução básica, sem reagir com o hidróxido de sódio. A solução permanece básica devido ao NaOH."
    },
    "CuSO4-NaCl": {
        tipo: "Sem reação química",
        equacao: null,
        observacao: "Não há formação de precipitado, pois tanto o cloreto de cobre quanto o sulfato de sódio (possíveis produtos de troca) são solúveis em água. A solução permanece azul, apenas com os quatro íons dissolvidos juntos."
    },
    "C2H5OH-NaCl": {
        tipo: "Baixa solubilidade (sem reação química)",
        equacao: null,
        observacao: "O sal de cozinha é pouco solúvel em etanol, permanecendo majoritariamente não dissolvido, formando um sólido no fundo do recipiente ou uma suspensão leitosa."
    },
    "C12H22O11-HCl": {
        tipo: "Dissolução com possível hidrólise lenta",
        equacao: "C₁₂H₂₂O₁₁ + H₂O --[HCl]--> Glicose + Frutose",
        observacao: "O açúcar se dissolve na solução ácida. Em contato prolongado com o ácido forte (especialmente se aquecido), a sacarose pode sofrer hidrólise lenta, quebrando-se em glicose e frutose (inversão do açúcar). Em mistura rápida à temperatura ambiente, o efeito visível é apenas a dissolução."
    },
    "C12H22O11-NaOH": {
        tipo: "Sem reação imediata perceptível",
        equacao: null,
        observacao: "O açúcar se dissolve na solução básica sem reação visível à temperatura ambiente. Apenas com aquecimento prolongado poderiam ocorrer reações de degradação (caramelização/decomposição), o que não ocorre em mistura simples e fria."
    },
    "C12H22O11-CuSO4": {
        tipo: "Sem reação visível (sacarose é açúcar não redutor)",
        equacao: null,
        observacao: "Diferente de açúcares redutores (como a glicose), a sacarose não reage com o sulfato de cobre para formar precipitados coloridos (como no teste de Fehling/Benedict). O açúcar apenas se dissolve, e a solução permanece azul."
    },
    "AgNO3-C12H22O11": {
        tipo: "Sem reação visível (sacarose é açúcar não redutor)",
        equacao: null,
        observacao: "A sacarose não reduz o nitrato de prata à temperatura ambiente (isso exigiria condições específicas, como no teste de Tollens com açúcares redutores). O açúcar apenas se dissolve na solução."
    },
    "C12H22O11-C2H5OH": {
        tipo: "Baixa solubilidade (sem reação química)",
        equacao: null,
        observacao: "O açúcar tem baixa solubilidade em etanol puro, dissolvendo-se apenas parcialmente e deixando a mistura turva, com resíduos sólidos visíveis."
    },
    "HCl-CuSO4": {
        tipo: "Sem reação química significativa",
        equacao: null,
        observacao: "Não ocorre reação visível relevante: o cloreto de cobre formado (hipoteticamente) é solúvel, então não há precipitado. A solução permanece azul e passa a ser ácida."
    },
    "C2H5OH-HCl": {
        tipo: "Sem reação química (mistura ácida)",
        equacao: null,
        observacao: "O ácido se dissolve no etanol, formando uma solução ácida alcoólica. Não há reação perceptível à temperatura ambiente nessas condições simples."
    },
    "NaOH-C2H5OH": {
        tipo: "Dissolução com formação parcial de sal",
        equacao: "NaOH + C₂H₅OH ⇌ C₂H₅ONa + H₂O",
        observacao: "O hidróxido de sódio se dissolve no etanol (menos facilmente que na água), podendo formar uma pequena quantidade de etóxido de sódio. O processo é levemente exotérmico e resulta em uma solução básica alcoólica."
    },
    "AgNO3-CuSO4": {
        tipo: "Sem reação significativa",
        equacao: null,
        observacao: "O sulfato de prata formado (hipoteticamente) é apenas ligeiramente solúvel; em soluções diluídas normalmente não se observa precipitado, e a mistura permanece azulada, com os íons coexistindo em solução."
    },
    "C2H5OH-CuSO4": {
        tipo: "Baixa solubilidade (sem reação química)",
        equacao: null,
        observacao: "O sulfato de cobre se dissolve mal em etanol, resultando em uma suspensão turva com leve tom azulado e sólido não dissolvido no fundo."
    },
    "AgNO3-C2H5OH": {
        tipo: "Baixa solubilidade / sensibilidade à luz",
        equacao: null,
        observacao: "O nitrato de prata tem solubilidade limitada em etanol puro, dissolvendo-se apenas parcialmente. A solução resultante é sensível à luz e pode escurecer com o tempo devido à formação de prata metálica."
    }
};

// Descrições para quando a pessoa escolhe a mesma substância nos dois campos
const mesmaSubstancia = {
    H2O: "Você apenas juntou duas porções de água. Não há nenhuma reação: o resultado é simplesmente o dobro do volume de água.",
    CH3COOH: "Você juntou duas porções de vinagre. Não há reação nova: apenas o dobro da quantidade da mesma solução ácida.",
    NaHCO3: "Você juntou duas porções de bicarbonato de sódio. Sem água ou ácido presentes, não há reação: apenas mais bicarbonato sólido/dissolvido.",
    NaCl: "Você juntou duas porções de sal. Não há reação: apenas o dobro da quantidade do mesmo sal.",
    C12H22O11: "Você juntou duas porções de açúcar. Não há reação: apenas o dobro da quantidade da mesma substância.",
    HCl: "Você juntou duas porções de ácido clorídrico. Não há reação nova: apenas uma solução mais concentrada do mesmo ácido.",
    NaOH: "Você juntou duas porções de hidróxido de sódio. Não há reação nova: apenas uma solução mais concentrada da mesma base.",
    CuSO4: "Você juntou duas porções de sulfato de cobre. Não há reação: apenas uma solução azul mais concentrada da mesma substância.",
    AgNO3: "Você juntou duas porções de nitrato de prata. Não há reação nova: apenas uma solução mais concentrada do mesmo composto.",
    C2H5OH: "Você juntou duas porções de etanol. Não há reação: apenas o dobro da quantidade do mesmo líquido."
};

// Classifica o "tipo" da reação em uma categoria genérica, para sabermos
// como a condição escolhida (temperatura/agitação) costuma influenciá-la.
function classificarTipo(tipo) {
    const t = tipo.toLowerCase();
    if (t.includes("efervescência") || t.includes("gás")) return "gas";
    if (t.includes("precipita")) return "precipitado";
    if (t.includes("neutraliza")) return "neutralizacao";
    if (t.includes("esterificação")) return "esterificacao";
    if (t.includes("hidrólise")) return "hidrolise";
    if (t.includes("dissoluç") || t.includes("miscibil") || t.includes("diluç")) return "dissolucao";
    if (t.includes("sem reação") || t.includes("não catalogada")) return "semreacao";
    return "generico";
}

// Texto explicando o efeito de cada condição, por categoria de reação
const efeitosCondicao = {
    gas: {
        ambiente: "A liberação de gás ocorre em ritmo moderado e constante até o consumo dos reagentes.",
        quente: "O aquecimento acelera bastante a liberação do gás: as bolhas surgem mais rápido e com mais intensidade, pois o calor aumenta a velocidade da reação.",
        frio: "O resfriamento torna a liberação de gás mais lenta e discreta, já que baixas temperaturas reduzem a velocidade da reação.",
        agitar: "Agitar expõe mais rapidamente os reagentes um ao outro, acelerando o início e o pico da efervescência.",
        repouso: "Sem agitação, a reação ocorre principalmente na interface entre as substâncias, tornando a liberação de gás mais lenta e prolongada."
    },
    precipitado: {
        ambiente: "O precipitado se forma normalmente e se deposita aos poucos no fundo do recipiente.",
        quente: "O aquecimento pode aumentar a solubilidade de alguns produtos formados, reduzindo temporariamente o precipitado visível — ele pode reaparecer ao esfriar.",
        frio: "Temperaturas mais baixas costumam favorecer a formação do precipitado, já que a solubilidade de sólidos geralmente diminui com o frio.",
        agitar: "Agitar distribui o precipitado por toda a solução, deixando-a turva de forma uniforme antes de decantar.",
        repouso: "Em repouso, o precipitado se forma e sedimenta lentamente no fundo, deixando a parte superior da solução mais clara com o tempo."
    },
    neutralizacao: {
        ambiente: "A neutralização ocorre normalmente, liberando o calor característico da reação.",
        quente: "O aquecimento acelera a neutralização, tornando a liberação de calor mais rápida e perceptível.",
        frio: "O resfriamento retarda a reação, tornando a neutralização mais lenta e dissipando mais rapidamente o calor liberado.",
        agitar: "Agitar garante contato uniforme entre ácido e base, tornando a neutralização mais rápida e completa.",
        repouso: "Sem agitação, a neutralização ocorre principalmente na interface entre as soluções, sendo mais lenta até a homogeneização completa."
    },
    esterificacao: {
        ambiente: "A esterificação ocorre lentamente, com formação discreta do éster de cheiro frutado ao longo do tempo.",
        quente: "O aquecimento acelera consideravelmente a esterificação, intensificando o cheiro frutado do éster formado.",
        frio: "O resfriamento praticamente paralisa essa reação, que depende de energia térmica para ocorrer de forma perceptível.",
        agitar: "Agitar melhora o contato entre o ácido e o álcool, favorecendo a reação, embora o fator decisivo continue sendo a temperatura.",
        repouso: "Em repouso e à temperatura ambiente, a reação ocorre de forma bem lenta e gradual."
    },
    hidrolise: {
        ambiente: "A hidrólise do açúcar pelo ácido é muito lenta e praticamente imperceptível a curto prazo.",
        quente: "O aquecimento acelera bastante a hidrólise, favorecendo a quebra da sacarose em glicose e frutose.",
        frio: "O resfriamento torna essa reação ainda mais lenta, praticamente impedindo a hidrólise perceptível.",
        agitar: "A agitação garante a dissolução uniforme, mas o fator decisivo para a hidrólise continua sendo a temperatura.",
        repouso: "Em repouso, apenas a dissolução do açúcar é perceptível; a hidrólise exigiria calor e mais tempo para se tornar significativa."
    },
    dissolucao: {
        ambiente: "A dissolução ocorre de forma normal, na velocidade padrão para essas substâncias.",
        quente: "O aquecimento geralmente acelera a dissolução e aumenta a quantidade máxima que pode ser dissolvida (maior solubilidade).",
        frio: "O resfriamento torna a dissolução mais lenta e pode reduzir a quantidade máxima dissolvida, já que a solubilidade de sólidos geralmente cai com o frio.",
        agitar: "Agitar acelera bastante a dissolução, pois renova continuamente o contato entre o soluto e o solvente.",
        repouso: "Sem agitação, a dissolução ocorre apenas por difusão, sendo bem mais lenta e podendo demorar bastante para se completar."
    },
    semreacao: {
        ambiente: "As substâncias apenas se misturam ou dissolvem, sem qualquer reação química.",
        quente: "O aquecimento pode acelerar a dissolução/mistura física, mas continua não havendo reação química entre elas.",
        frio: "O resfriamento pode tornar a mistura/dissolução mais lenta, mas o comportamento continua sendo puramente físico, sem reação química.",
        agitar: "Agitar apenas acelera a homogeneização da mistura, sem provocar qualquer reação química.",
        repouso: "Em repouso, a mistura ocorre lentamente por difusão, permanecendo sem qualquer reação química."
    },
    generico: {
        ambiente: "Em temperatura ambiente, o comportamento observado é o padrão para essa combinação.",
        quente: "O aquecimento tende a acelerar qualquer processo físico envolvido (dissolução, mistura), sem alterar a natureza básica dessa combinação.",
        frio: "O resfriamento tende a tornar os processos físicos mais lentos, sem alterar a natureza básica dessa combinação.",
        agitar: "Agitar acelera a homogeneização da mistura.",
        repouso: "Em repouso, os processos ocorrem mais lentamente, por difusão."
    }
};

function getChaveReacao(a, b) {
    return [a, b].sort().join("-");
}

function obterResultado(reagente1, reagente2, condicao) {
    const titulo = `${nomes[reagente1]} (${reagente1}) + ${nomes[reagente2]} (${reagente2})<br>Condição: ${nomesCondicao[condicao]}`;

    if (reagente1 === reagente2) {
        const efeito = efeitosCondicao.generico[condicao];
        return `${titulo}<br><br>${mesmaSubstancia[reagente1]}<br><br><strong>Influência da condição escolhida:</strong> ${efeito}`;
    }

    const chave = getChaveReacao(reagente1, reagente2);
    const info = reacoes[chave];

    if (info) {
        const categoria = classificarTipo(info.tipo);
        const efeito = efeitosCondicao[categoria][condicao];

        let texto = `${titulo}<br><br><strong>Tipo de reação:</strong> ${info.tipo}`;
        if (info.equacao) {
            texto += `<br><strong>Equação:</strong> ${info.equacao}`;
        }
        texto += `<br><strong>O que acontece:</strong> ${info.observacao}`;
        texto += `<br><br><strong>Influência da condição escolhida:</strong> ${efeito}`;
        return texto;
    }

    const efeito = efeitosCondicao.semreacao[condicao];
    return `${titulo}<br><br><strong>Tipo de reação:</strong> Não catalogada<br><strong>O que acontece:</strong> Nenhuma reação visível foi identificada para essa combinação específica nas condições testadas.<br><br><strong>Influência da condição escolhida:</strong> ${efeito}`;
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#fazer form");
    const resultadoDiv = document.getElementById("resultado");
    const textoResultado = document.getElementById("textoResultado");

    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const reagente1 = form.reagente1.value;
        const reagente2 = form.reagente2.value;
        const condicao = form.condicao.value;

        const resultado = obterResultado(reagente1, reagente2, condicao);

        textoResultado.innerHTML = resultado;

        form.style.display = "none";
        resultadoDiv.style.display = "block";
    });
});

function voltar() {
    const form = document.querySelector("#fazer form");
    const resultadoDiv = document.getElementById("resultado");

    resultadoDiv.style.display = "none";
    form.style.display = "block";
    form.reset();
}
