// --------------------------------------------------------
// Configuração Global do Chart.js
// --------------------------------------------------------
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.color = '#64748b';
Chart.defaults.scale.grid.color = '#f1f5f9';

// Paleta de Cores Padrão
const corAzulPrincipal = '#3b82f6';
const corAzulSecundario = '#94a3b8';

// --------------------------------------------------------
// 1. Gráfico de Métodos de Detecção (Rosca)
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
        maintainAspectRatio: false, // Fundamental para não cortar
        cutout: '75%',
        plugins: { legend: { position: 'right' } }
    }
});

// --------------------------------------------------------
// 2. Gráfico de Níveis de IA (Barras Verticais)
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
// 3. RQ1: Índice de Manutenibilidade (MI)
// --------------------------------------------------------
new Chart(document.getElementById('rq1Chart'), {
    type: 'bar',
    data: {
        labels: ['Baixo (0-2)', 'Médio (3-5)', 'Alto (6-8)', 'Muito Alto (9-13)'],
        datasets: [
            {
                label: 'MI Médio (Pré-IA)',
                data: [66.49, 62.34, 64.66, 69.25],
                backgroundColor: corAzulSecundario,
                borderRadius: 4
            },
            {
                label: 'MI Médio (Pós-IA)',
                data: [61.23, 60.94, 64.31, 68.77],
                backgroundColor: corAzulPrincipal,
                borderRadius: 4
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { 
            x: { grid: { display: false } }, 
            y: { min: 40 } // Começa em 40 para destacar a variação
        }
    }
});

// --------------------------------------------------------
// 4. RQ2: Estabilidade e Commits Corretivos (Fix Rate)
// --------------------------------------------------------
new Chart(document.getElementById('rq2Chart'), {
    type: 'bar',
    data: {
        labels: ['Taxa de Fix (%)', 'Taxa de Revert (%)'],
        datasets: [
            {
                label: 'Pré-IA',
                data: [42.5, 1.2],
                backgroundColor: corAzulSecundario,
                borderRadius: 4
            },
            {
                label: 'Pós-IA',
                data: [46.8, 1.9],
                backgroundColor: corAzulPrincipal,
                borderRadius: 4
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { x: { grid: { display: false } } }
    }
});

// --------------------------------------------------------
// 5. RQ3: Tempo Médio de Resolução (MTTR) - Barras Horizontais
// --------------------------------------------------------
new Chart(document.getElementById('rq3Chart'), {
    type: 'bar',
    data: {
        labels: ['Repositórios IA Baixa/Média', 'Repositórios IA Alta'],
        datasets: [
            {
                label: 'Horas de Resolução (Pré-IA)',
                data: [745, 920], 
                backgroundColor: corAzulSecundario,
                borderRadius: 4
            },
            {
                label: 'Horas de Resolução (Pós-IA)',
                data: [610, 805], 
                backgroundColor: corAzulPrincipal,
                borderRadius: 4
            }
        ]
    },
    options: {
        indexAxis: 'y', // Inverte os eixos para o formato horizontal
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { grid: { display: false } } }
    }
});