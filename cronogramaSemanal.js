
        // --- 1. SEUS DADOS (Edite aqui) ---
        const cronogramaSemanal = [
            {
                id: "monday",
                title: "Segunda-feira",
                tasks: [
                    { start: "05:30", end: "06:00", activity: "Acordar / Café" },
                    { start: "06:00", end: "07:30", activity: "Treino (Push)" },
                    { start: "08:00", end: "12:00", activity: "Trabalho (Dev)" },
                    { start: "12:00", end: "13:00", activity: "Almoço (Dieta)" },
                    { start: "13:00", end: "18:00", activity: "Trabalho" },
                    { start: "22:00", end: "23:00", activity: "Dormir" }
                ]
            },
            {
                id: "tuesday",
                title: "Terça-feira",
                tasks: [
                    { start: "06:00", end: "07:30", activity: "Treino (Pull)" },
                    { start: "08:00", end: "18:00", activity: "Trabalho" },
                    { start: "19:00", end: "21:00", activity: "Estudos Web" }
                ]
            },
            {
                id: "wednesday",
                title: "Quarta-feira",
                tasks: [
                    { start: "06:00", end: "07:30", activity: "Treino (Legs)" },
                    { start: "20:00", end: "22:00", activity: "Game Coop" }
                ]
            }
            // Copie e cole os blocos acima para adicionar Quinta, Sexta, etc.
        ];

        // --- 2. LÓGICA DE GERAÇÃO (Não precisa mexer muito) ---
        const container = document.getElementById('schedule-container');

        cronogramaSemanal.forEach(day => {
            const card = document.createElement('div');
            card.className = 'cardDay';
            card.id = day.id;

            // Gera as listas de parágrafos
            const startHTML = day.tasks.map(t => `<p>${t.start}</p>`).join('');
            const endHTML   = day.tasks.map(t => `<p>${t.end}</p>`).join('');
            const actHTML   = day.tasks.map(t => `<p title="${t.activity}">${t.activity}</p>`).join(''); 
            // Dica: adicionei title="" acima. Se passar o mouse na tarefa, mostra o nome completo.

            card.innerHTML = `
                <h2>${day.title}</h2>
                
                <div class="header-colunas">
                    <span style="width:20%; text-align:center">Início</span>
                    <span style="width:20%; text-align:center">Fim</span>
                    <span style="width:60%; padding-left:10px">Atividade</span>
                </div>

                <div class="atividades-wrapper">
                    <div class="col-inicio">${startHTML}</div>
                    <div class="col-fim">${endHTML}</div>
                    <div class="col-atividade">${actHTML}</div>
                </div>
            `;

            container.appendChild(card);
        });