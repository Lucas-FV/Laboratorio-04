
// --------------------------------------------------------
// Configuração Global do Chart.js
// --------------------------------------------------------
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.color = '#64748b';
Chart.defaults.scale.grid.color = '#f1f5f9';

// Paleta de Cores Padrão
const corAzulPrincipal = '#3b82f6';
const corAzulSecundario = '#94a3b8';
const corAzulDestaque = '#2563eb';
const corVermelhaAlerta = '#ef4444'; // Usada para destacar outliers e alertas


function switchTab(event, tabId) {
    // 1. Esconde todas as abas
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));

    // 2. Remove a classe 'active' de todos os botões
    const btns = document.querySelectorAll('.nav-btn');
    btns.forEach(btn => btn.classList.remove('active'));

    // 3. Mostra a aba clicada e marca o botão correspondente como ativo
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// --------------------------------------------------------
// 1. Rosca (Detecção)
// --------------------------------------------------------
new Chart(document.getElementById('detectionChart'), {
    type: 'doughnut',
    data: {
        labels: ['Claude Co-authorship', 'GitHub Copilot', 'Claude Config', 'VSCode Settings', 'VSCode Extensions'],
        datasets: [{
            data: [67, 54, 21, 16, 14],
            backgroundColor: ['#3b82f6', '#60a5fa', '#93c5fd', '#cbd5e1', '#e2e8f0'],
            borderWidth: 0,
            hoverOffset: 4
        }]
    },
    options: { 
        responsive: true, 
        maintainAspectRatio: false, 
        cutout: '75%', 
        plugins: { legend: { position: 'right' } } 
    }
});

// --------------------------------------------------------
// 2. Barras (Distribuição AI Score)
// --------------------------------------------------------
new Chart(document.getElementById('aiScoreChart'), {
    type: 'bar',
    data: {
        labels: ['Baixo (0-2)', 'Médio (3-5)', 'Alto (6-8)', 'Muito Alto (9-13)'],
        datasets: [{
            label: 'Qtd. de Repositórios',
            data: [8, 62, 26, 9],
            backgroundColor: corAzulPrincipal,
            borderRadius: 6
        }]
    },
    options: { 
        responsive: true, 
        maintainAspectRatio: false, 
        plugins: { legend: { display: false } }, 
        scales: { x: { grid: { display: false } } } 
    }
});

// --------------------------------------------------------
// 3. Bolhas (Dispersão - Idade x Estrelas x Nível de IA)
// --------------------------------------------------------
const scatterData = [
    {x: 9.8, y: 220710, r: 7.5}, {x: 14.0, y: 87397, r: 3.0}, {x: 7.4, y: 82887, r: 4.5}, {x: 7.5, y: 160227, r: 12.0}, 
    {x: 14.2, y: 68467, r: 7.5}, {x: 15.7, y: 65968, r: 4.5}, {x: 16.2, y: 61542, r: 4.5}, {x: 6.5, y: 56247, r: 9.0}, 
    {x: 9.4, y: 60804, r: 10.5}, {x: 15.2, y: 53954, r: 4.5}, {x: 9.0, y: 49807, r: 7.5}, {x: 15.7, y: 48653, r: 4.5}, 
    {x: 6.7, y: 44438, r: 19.5}, {x: 11.1, y: 45280, r: 12.0}, {x: 16.2, y: 43387, r: 9.0}, {x: 9.2, y: 72575, r: 4.5}, 
    {x: 15.7, y: 43770, r: 16.5}, {x: 6.3, y: 42261, r: 9.0}, {x: 9.7, y: 99610, r: 13.5}, {x: 12.6, y: 86919, r: 18.0}
];

new Chart(document.getElementById('scatterChart'), {
    type: 'bubble',
    data: {
        datasets: [{
            label: 'Repositórios Analisados',
            data: scatterData,
            backgroundColor: 'rgba(59, 130, 246, 0.5)', 
            borderColor: corAzulPrincipal,
            borderWidth: 1
        }]
    },
    options: {
        responsive: true, 
        maintainAspectRatio: false,
        scales: {
            x: { title: { display: true, text: 'Idade (Anos)' } },
            y: { title: { display: true, text: 'Popularidade (Estrelas)' } }
        }
    }
});

// --------------------------------------------------------
// 4. RQ1: Índice de Manutenibilidade (Médias)
// --------------------------------------------------------
new Chart(document.getElementById('rq1Chart'), {
    type: 'bar',
    data: {
        labels: ['Baixo', 'Médio', 'Alto', 'Muito Alto'],
        datasets: [
            { label: 'MI Médio (Pré-IA)', data: [66.49, 62.34, 64.66, 69.25], backgroundColor: corAzulSecundario, borderRadius: 4 },
            { label: 'MI Médio (Pós-IA)', data: [61.23, 60.94, 64.31, 68.77], backgroundColor: corAzulPrincipal, borderRadius: 4 }
        ]
    },
    options: { responsive: true, maintainAspectRatio: false, scales: { y: { min: 40 } } }
});

// --------------------------------------------------------
// 5. RQ1: Verbosidade (Linhas de Código Alteradas)
// --------------------------------------------------------
new Chart(document.getElementById('rq1LinesChart'), {
    type: 'bar',
    data: {
        labels: ['Baixo', 'Médio', 'Alto', 'Muito Alto'],
        datasets: [
            { label: 'Linhas por Commit (Pré)', data: [198, 629, 510, 703], backgroundColor: corAzulSecundario, borderRadius: 4 },
            { label: 'Linhas por Commit (Pós)', data: [242, 569, 559, 1155], backgroundColor: corAzulDestaque, borderRadius: 4 } 
        ]
    },
    options: { responsive: true, maintainAspectRatio: false }
});

// --------------------------------------------------------
// 6. RQ1: BOXPLOT Distribuição do MI
// --------------------------------------------------------
const miPreArray = [42, 51, 62, 64, 66, 68, 70, 75, 88]; 
const miPosArray = [38, 48, 58, 60, 62, 65, 68, 71, 85];

new Chart(document.getElementById('boxplotMI'), {
    type: 'boxplot',
    data: {
        labels: ['MI Geral (Pré-IA)', 'MI Geral (Pós-IA)'],
        datasets: [{
            label: 'Índice de Manutenibilidade (MI)',
            data: [miPreArray, miPosArray],
            backgroundColor: ['rgba(148, 163, 184, 0.5)', 'rgba(59, 130, 246, 0.5)'],
            borderColor: [corAzulSecundario, corAzulPrincipal],
            borderWidth: 2,
            itemRadius: 3, 
            outlierBackgroundColor: corVermelhaAlerta 
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { title: { display: true, text: 'Pontuação MI' } } }
    }
});

// --------------------------------------------------------
// 7. RQ2: Fix e Revert Rate
// --------------------------------------------------------
new Chart(document.getElementById('rq2Chart'), {
    type: 'bar',
    data: {
        labels: ['Taxa de Fix (%)', 'Taxa de Revert (%)'],
        datasets: [
            { label: 'Pré-IA', data: [42.5, 1.2], backgroundColor: corAzulSecundario, borderRadius: 4 },
            { label: 'Pós-IA', data: [46.8, 1.9], backgroundColor: corAzulPrincipal, borderRadius: 4 }
        ]
    },
    options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false } 
});

// --------------------------------------------------------
// 8. RQ3: MTTR (Tempo Médio de Resolução)
// --------------------------------------------------------
new Chart(document.getElementById('rq3Chart'), {
    type: 'bar',
    data: {
        labels: ['IA Baixa/Média', 'IA Alta'],
        datasets: [
            { label: 'MTTR Pré-IA (Horas)', data: [745, 920], backgroundColor: corAzulSecundario, borderRadius: 4 },
            { label: 'MTTR Pós-IA (Horas)', data: [610, 805], backgroundColor: corAzulPrincipal, borderRadius: 4 }
        ]
    },
    options: { responsive: true, maintainAspectRatio: false }
});

// --------------------------------------------------------
// 9. RQ3: BOXPLOT Dispersão do MTTR
// --------------------------------------------------------
const mttrPreArray = [120, 350, 600, 750, 800, 950, 1100, 1400, 2200];
const mttrPosArray = [80, 200, 450, 600, 680, 820, 900, 1100, 1800];

new Chart(document.getElementById('boxplotMTTR'), {
    type: 'boxplot',
    data: {
        labels: ['Horas (Pré-IA)', 'Horas (Pós-IA)'],
        datasets: [{
            label: 'Tempo de Resolução',
            data: [mttrPreArray, mttrPosArray],
            backgroundColor: ['rgba(148, 163, 184, 0.5)', 'rgba(59, 130, 246, 0.5)'],
            borderColor: [corAzulSecundario, corAzulPrincipal],
            borderWidth: 2,
            itemRadius: 3,
            outlierBackgroundColor: corVermelhaAlerta
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { title: { display: true, text: 'Total de Horas' } } }
    }
});

// --------------------------------------------------------
// 10. RQ3: Tendência de Abertura de Issues (Gráfico de Linhas)
// --------------------------------------------------------
new Chart(document.getElementById('rq3IssuesChart'), {
    type: 'line', 
    data: {
        labels: ['Baixo', 'Médio', 'Alto', 'Muito Alto'], 
        datasets: [
            {
                label: 'Issues/Mês (Pré-IA)',
                data: [79, 286, 124, 335],
                borderColor: corAzulSecundario,
                backgroundColor: corAzulSecundario,
                tension: 0.3,
                fill: false
            },
            {
                label: 'Issues/Mês (Pós-IA)',
                data: [7, 45, 61, 387], 
                borderColor: corAzulPrincipal,
                backgroundColor: corAzulPrincipal,
                tension: 0.3, 
                fill: false,
                borderWidth: 3
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: { mode: 'index', intersect: false } 
        }
    }
});
