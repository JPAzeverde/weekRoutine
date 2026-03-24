// Arquivo de configuração centralizado
// Edite este arquivo para personalizar suas tarefas semanais

const CONFIG = {
    // Configurações do organizador
    horarioInicio: 0, // 00:00 (não alterar)
    horarioFim: 23,   // 23:00 (não alterar)
    
    // Tarefas pré-definidas
    // EDITE AQUI SUAS TAREFAS SEMANAIS
    tarefas: [
        // --- SEGUNDA-FEIRA ---
        { nome: "Acordar", dia: "segunda", horaInicio: "05:00", horaFim: "05:05", cor: "#4CAF50" },
        { nome: "Pré Treino", dia: "segunda", horaInicio: "05:10", horaFim: "05:30", cor: "#4CAF50" },
        { nome: "Para Academia", dia: "segunda", horaInicio: "05:50", horaFim: "06:00", cor: "#9E9E9E" },
        { nome: "Treino", dia: "segunda", horaInicio: "06:00", horaFim: "07:20", cor: "#2196F3" },
        { nome: "Para Casa", dia: "segunda", horaInicio: "07:20", horaFim: "07:30", cor: "#9E9E9E" },
        { nome: "Pós Treino", dia: "segunda", horaInicio: "07:30", horaFim: "07:50", cor: "#4CAF50" },
        { nome: "Banho", dia: "segunda", horaInicio: "07:50", horaFim: "08:20", cor: "#4CAF50" },
        { nome: "Almoçar", dia: "segunda", horaInicio: "11:00", horaFim: "11:40", cor: "#FF9800" },
        { nome: "Para Unilavras", dia: "segunda", horaInicio: "12:00", horaFim: "12:30", cor: "#9E9E9E" },
        { nome: "Estágio", dia: "segunda", horaInicio: "12:30", horaFim: "17:30", cor: "#9C27B0" },
        { nome: "Para Casa", dia: "segunda", horaInicio: "17:30", horaFim: "18:10", cor: "#9E9E9E" },
        { nome: "Jantar", dia: "segunda", horaInicio: "19:00", horaFim: "19:40", cor: "#FF9800" },
        { nome: "Banho", dia: "segunda", horaInicio: "19:40", horaFim: "20:00", cor: "#4CAF50" },
        { nome: "Lanchar", dia: "segunda", horaInicio: "21:00", horaFim: "21:20", cor: "#FF9800" },
        { nome: "Dormir", dia: "segunda", horaInicio: "21:30", horaFim: "22:00", cor: "#4CAF50" },

        // --- terca-FEIRA ---
        { nome: "Acordar", dia: "terca", horaInicio: "05:00", horaFim: "05:05", cor: "#4CAF50" },
        { nome: "Pré Treino", dia: "terca", horaInicio: "05:10", horaFim: "05:30", cor: "#4CAF50" },
        { nome: "Para Academia", dia: "terca",  horaInicio: "05:50", horaFim: "06:00", cor: "#9E9E9E"  },
        { nome: "Treino", dia: "terca", horaInicio: "06:00", horaFim: "07:20", cor: "#2196F3" },
        { nome: "Para Casa", dia: "terca", horaInicio: "07:20", horaFim: "07:30", cor: "#9E9E9E" },
        { nome: "Pós Treino", dia: "terca", horaInicio: "07:30", horaFim: "07:50", cor: "#4CAF50" },
        { nome: "Banho", dia: "terca", horaInicio: "07:50", horaFim: "08:20", cor: "#4CAF50" },
        { nome: "Almoçar", dia: "terca", horaInicio: "11:00", horaFim: "11:40", cor: "#FF9800" },
        { nome: "Para Unilavras", dia: "terca", horaInicio: "12:00", horaFim: "12:30", cor: "#9E9E9E" },
        { nome: "Estágio", dia: "terca", horaInicio: "12:30", horaFim: "17:30", cor: "#9C27B0" },
        { nome: "Para Casa", dia: "terca", horaInicio: "17:30", horaFim: "18:10", cor: "#9E9E9E" },
        { nome: "Para UFLA", dia: "terca", horaInicio: "18:30", horaFim: "19:00", cor: "#9E9E9E" },
        { nome: "Aula Libras", dia: "terca", horaInicio: "19:00", horaFim: "20:40", cor: "#19191a" },
        { nome: "Lanchar", dia: "terca", horaInicio: "20:40", horaFim: "21:00", cor: "#FF9800" },
        { nome: "Aula Estrutura de Dados", dia: "terca", horaInicio: "21:00", horaFim: "22:40", cor: "#9C27B0" },
        { nome: "Para Casa", dia: "terca", horaInicio: "22:40", horaFim: "23:10", cor: "#9E9E9E" },
        { nome: "Banho", dia: "terca", horaInicio: "23:10", horaFim: "23:20", cor: "#4CAF50" },
        { nome: "Jantar", dia: "terca", horaInicio: "23:20", horaFim: "23:50", cor: "#FF9800" },
        { nome: "Dormir", dia: "terca", horaInicio: "23:50", horaFim: "00:00", cor: "#4CAF50" },

        // --- QUARTA-FEIRA ---
        { nome: "Acordar", dia: "quarta", horaInicio: "07:00", horaFim: "07:05", cor: "#4CAF50" },
        { nome: "Pré Treino", dia: "quarta", horaInicio: "07:10", horaFim: "07:30", cor: "#4CAF50" },
        { nome: "Para Academia", dia: "quarta", horaInicio: "07:30", horaFim: "07:40", cor: "#9E9E9E" },
        { nome: "Treino", dia: "quarta", horaInicio: "07:40", horaFim: "08:50", cor: "#2196F3" },
        { nome: "Para Casa", dia: "quarta", horaInicio: "08:55", horaFim: "09:05", cor: "#9E9E9E" },
        { nome: "Pós Treino", dia: "quarta", horaInicio: "09:05", horaFim: "09:25", cor: "#4CAF50" },
        { nome: "Banho", dia: "quarta", horaInicio: "09:25", horaFim: "09:35", cor: "#4CAF50" },
        { nome: "Cozinhar", dia: "quarta", horaInicio: "10:00", horaFim: "11:00", cor: "#FF9800" },
        { nome: "Almoçar", dia: "quarta", horaInicio: "11:00", horaFim: "11:40", cor: "#FF9800" },
        { nome: "Para Unilavras", dia: "quarta", horaInicio: "12:00", horaFim: "12:30", cor: "#9E9E9E" },
        { nome: "Estágio", dia: "quarta", horaInicio: "12:30", horaFim: "17:30", cor: "#9C27B0" },
        { nome: "Para Casa", dia: "quarta", horaInicio: "17:30", horaFim: "18:10", cor: "#9E9E9E" },
        { nome: "Jantar", dia: "quarta", horaInicio: "19:00", horaFim: "19:40", cor: "#FF9800" },
        { nome: "Banho", dia: "quarta", horaInicio: "19:40", horaFim: "20:00", cor: "#4CAF50" },
        { nome: "Lanchar", dia: "quarta", horaInicio: "21:00", horaFim: "21:20", cor: "#FF9800" },
        { nome: "Dormir", dia: "quarta", horaInicio: "21:30", horaFim: "00:00", cor: "#4CAF50" },

        // --- QUINTA-FEIRA ---
        { nome: "Acordar", dia: "quinta", horaInicio: "05:00", horaFim: "05:05", cor: "#4CAF50" },
        { nome: "Pré Treino", dia: "quinta", horaInicio: "05:10", horaFim: "05:30", cor: "#4CAF50" },
        { nome: "Para Academia", dia: "quinta",  horaInicio: "05:50", horaFim: "06:00", cor: "#9E9E9E"  },
        { nome: "Treino", dia: "quinta", horaInicio: "06:00", horaFim: "07:20", cor: "#2196F3" },
        { nome: "Para Casa", dia: "quinta", horaInicio: "07:20", horaFim: "07:30", cor: "#9E9E9E" },
        { nome: "Pós Treino", dia: "quinta", horaInicio: "07:30", horaFim: "07:50", cor: "#4CAF50" },
        { nome: "Banho", dia: "quinta", horaInicio: "07:50", horaFim: "08:20", cor: "#4CAF50" },
        { nome: "Almoçar", dia: "quinta", horaInicio: "11:00", horaFim: "11:40", cor: "#FF9800" },
        { nome: "Para Unilavras", dia: "quinta", horaInicio: "12:00", horaFim: "12:30", cor: "#9E9E9E" },
        { nome: "Estágio", dia: "quinta", horaInicio: "12:30", horaFim: "17:30", cor: "#9C27B0" },
        { nome: "Para Casa", dia: "quinta", horaInicio: "17:30", horaFim: "18:10", cor: "#9E9E9E" },
        { nome: "Jantar", dia: "quinta", horaInicio: "19:00", horaFim: "19:40", cor: "#FF9800" },
        { nome: "Banho", dia: "quinta", horaInicio: "19:40", horaFim: "20:00", cor: "#4CAF50" },
        { nome: "Para UFLA", dia: "quinta", horaInicio: "20:30", horaFim: "21:00", cor: "#9E9E9E" },
        { nome: "Aula Direito e Cidadania", dia: "quinta", horaInicio: "21:00", horaFim: "22:40", cor: "#9C27B0" },
        { nome: "Para Casa", dia: "quinta", horaInicio: "22:40", horaFim: "23:10", cor: "#9E9E9E" },
        { nome: "Lanchar", dia: "quinta", horaInicio: "23:10", horaFim: "23:30", cor: "#FF9800" },
        { nome: "Dormir", dia: "quinta", horaInicio: "23:30", horaFim: "00:00", cor: "#4CAF50" },

        // --- SEXTA-FEIRA ---
        { nome: "Acordar", dia: "sexta", horaInicio: "07:00", horaFim: "07:05", cor: "#4CAF50" },
        { nome: "Pré Treino", dia: "sexta", horaInicio: "07:10", horaFim: "07:30", cor: "#4CAF50" },
        { nome: "Para Academia", dia: "sexta", horaInicio: "07:30", horaFim: "07:40", cor: "#9E9E9E" },
        { nome: "Treino", dia: "sexta", horaInicio: "07:40", horaFim: "08:50", cor: "#2196F3" },
        { nome: "Para Casa", dia: "sexta", horaInicio: "08:55", horaFim: "09:05", cor: "#9E9E9E" },
        { nome: "Pós Treino", dia: "sexta", horaInicio: "09:05", horaFim: "09:25", cor: "#4CAF50" },
        { nome: "Banho", dia: "sexta", horaInicio: "09:25", horaFim: "09:35", cor: "#4CAF50" },
        { nome: "Cozinhar", dia: "sexta", horaInicio: "10:00", horaFim: "11:00", cor: "#FF9800" },
        { nome: "Almoçar", dia: "sexta", horaInicio: "11:00", horaFim: "11:40", cor: "#FF9800" },
        { nome: "Para Unilavras", dia: "sexta", horaInicio: "12:00", horaFim: "12:30", cor: "#9E9E9E" },
        { nome: "Estágio", dia: "sexta", horaInicio: "12:30", horaFim: "17:30", cor: "#9C27B0" },
        { nome: "Para Casa", dia: "sexta", horaInicio: "17:30", horaFim: "18:10", cor: "#9E9E9E" },
        { nome: "Jantar", dia: "sexta", horaInicio: "19:00", horaFim: "19:40", cor: "#FF9800" },
        { nome: "Banho", dia: "sexta", horaInicio: "19:40", horaFim: "20:00", cor: "#4CAF50" },
        { nome: "Lanchar", dia: "sexta", horaInicio: "21:00", horaFim: "21:20", cor: "#FF9800" },
        { nome: "Dormir", dia: "sexta", horaInicio: "21:30", horaFim: "22:00", cor: "#4CAF50" },

        // --- sabado ---
        { nome: "Acordar", dia: "sabado", horaInicio: "07:30", horaFim: "07:40", cor: "#4CAF50" },
        { nome: "Pré Treino", dia: "sabado", horaInicio: "07:40", horaFim: "08:00", cor: "#4CAF50" },
        { nome: "Para Academia", dia: "sabado", horaInicio: "08:50", horaFim: "09:00", cor: "#9E9E9E" },
        { nome: "Treino", dia: "sabado", horaInicio: "09:00", horaFim: "10:20", cor: "#2196F3" },
        { nome: "Para Casa", dia: "sabado", horaInicio: "10:20", horaFim: "10:30", cor: "#9E9E9E" },
        { nome: "Pós Treino", dia: "sabado", horaInicio: "10:30", horaFim: "10:50", cor: "#4CAF50" },
        { nome: "Banho", dia: "sabado", horaInicio: "10:50", horaFim: "11:00", cor: "#4CAF50" },
        { nome: "Almoçar", dia: "sabado", horaInicio: "12:30", horaFim: "13:10", cor: "#FF9800" },
        { nome: "Lanchar", dia: "sabado", horaInicio: "15:30", horaFim: "16:00", cor: "#FF9800" },
        { nome: "Para Mercado", dia: "sabado", horaInicio: "18:20", horaFim: "18:35", cor: "#9E9E9E" },
        { nome: "Compras", dia: "sabado", horaInicio: "18:35", horaFim: "19:25", cor: "#9E9E9E" },
        { nome: "Para Casa", dia: "sabado", horaInicio: "19:25", horaFim: "19:40", cor: "#9E9E9E" },
        { nome: "Banho", dia: "sabado", horaInicio: "20:20", horaFim: "22:30", cor: "#4CAF50" },
        { nome: "Jantar", dia: "sabado", horaInicio: "21:30", horaFim: "22:10", cor: "#FF9800" },
        { nome: "Lanchar", dia: "sabado", horaInicio: "23:00", horaFim: "23:20", cor: "#FF9800" },
        { nome: "Dormir", dia: "sabado", horaInicio: "23:40", horaFim: "00:00", cor: "#4CAF50" },

        // --- DOMINGO ---
        { nome: "Acordar", dia: "domingo", horaInicio: "07:30", horaFim: "07:40", cor: "#4CAF50" },
        { nome: "Pré Treino", dia: "domingo", horaInicio: "07:40", horaFim: "08:00", cor: "#4CAF50" },
        { nome: "Para Academia", dia: "domingo", horaInicio: "08:50", horaFim: "09:00", cor: "#9E9E9E" },
        { nome: "Treino", dia: "domingo", horaInicio: "09:00", horaFim: "10:20", cor: "#2196F3" },
        { nome: "Para Casa", dia: "domingo", horaInicio: "10:20", horaFim: "10:30", cor: "#9E9E9E" },
        { nome: "Pós Treino", dia: "domingo", horaInicio: "10:30", horaFim: "10:50", cor: "#4CAF50" },
        { nome: "Banho", dia: "domingo", horaInicio: "10:50", horaFim: "11:00", cor: "#4CAF50" },
        { nome: "Almoçar", dia: "domingo", horaInicio: "12:30", horaFim: "13:10", cor: "#FF9800" },
        { nome: "Lanchar", dia: "domingo", horaInicio: "15:30", horaFim: "16:00", cor: "#FF9800" },
        { nome: "Cozinhar", dia: "domingo", horaInicio: "18:00", horaFim: "19:00", cor: "#FF9800" },
        { nome: "Banho", dia: "domingo", horaInicio: "19:50", horaFim: "20:00", cor: "#4CAF50" },
        { nome: "Jantar", dia: "domingo", horaInicio: "20:00", horaFim: "20:40", cor: "#FF9800" },
        { nome: "Cozinhar", dia: "domingo", horaInicio: "20:30", horaFim: "21:30", cor: "#FF9800" },
        { nome: "Dormir", dia: "domingo", horaInicio: "21:30", horaFim: "22:00", cor: "#4CAF50" },
    ]
};

// Função para gerar IDs únicos para as tarefas
function gerarTarefasComIds() {
    return CONFIG.tarefas.map((tarefa, index) => ({
        ...tarefa,
        id: `tarefa_${Date.now()}_${index}`
    }));
}

// Função para obter todas as tarefas configuradas
function getTarefasConfiguradas() {
    return gerarTarefasComIds();
}