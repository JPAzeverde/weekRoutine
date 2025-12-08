document.addEventListener('DOMContentLoaded', () => {
    // --- Configurações e Constantes ---
    const PIXELS_PER_MINUTE = 3;
    const APP_KEY = 'weeklyPlannerEvents'; // Chave para o LocalStorage

    // --- Estado Global ---
    let events = JSON.parse(localStorage.getItem(APP_KEY)) || [];
    let currentEditingId = null; // null = criando novo, ID = editando
    let tempSubtasks = []; // Armazena sub-tarefas enquanto o modal está aberto

    // --- Elementos do DOM ---
    const modal = document.getElementById('event-modal');
    const form = document.getElementById('event-form');
    const btnAddEvent = document.getElementById('btn-add-event');
    const btnCloseModal = document.getElementById('btn-close-modal');
    const btnDeleteEvent = document.getElementById('btn-delete-event');
    const btnAddSubtask = document.getElementById('btn-add-subtask');
    const subTasksListEl = document.getElementById('sub-tasks-list');
    
    // --- Inicialização ---
    initTimeLabels();
    renderEvents();

    // --- Funções de Renderização Auxiliares ---

    // Gera os rótulos de hora na lateral (00:00 - 23:00)
    function initTimeLabels() {
        const timeColumn = document.getElementById('time-labels');
        timeColumn.innerHTML = '';
        
        for (let i = 0; i < 24; i++) {
            const label = document.createElement('div');
            label.className = 'time-label';
            // Formata 0h, 1h... 23h
            label.textContent = `${i.toString().padStart(2, '0')}:00`;
            timeColumn.appendChild(label);
        }
    }

    // Converte hora "HH:MM" para minutos totais do dia (0-1439)
    function timeToMinutes(timeStr) {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return (hours * 60) + minutes;
    }

    // --- Motor de Renderização de Eventos ---
    function renderEvents() {
        // Limpa eventos atuais do DOM
        document.querySelectorAll('.day-content').forEach(col => col.innerHTML = '');

        events.forEach(event => {
            const startMin = timeToMinutes(event.start);
            const endMin = timeToMinutes(event.end);
            const duration = endMin - startMin;

            if (duration <= 0) return; // Proteção contra horários inválidos

            // Cálculos Visuais
            const topPosition = startMin * PIXELS_PER_MINUTE;
            const height = duration * PIXELS_PER_MINUTE;

            // Criação do Elemento
            const eventEl = document.createElement('div');
            eventEl.className = 'event-block';
            eventEl.dataset.category = event.category;
            eventEl.style.top = `${topPosition}px`;
            eventEl.style.height = `${height}px`;

            // Conteúdo Interno
            // Conta sub-tarefas concluídas
            const completedSubs = event.subtasks ? event.subtasks.filter(s => s.completed).length : 0;
            const totalSubs = event.subtasks ? event.subtasks.length : 0;
            const subTaskIndicator = totalSubs > 0 ? ` (${completedSubs}/${totalSubs})` : '';

            eventEl.innerHTML = `
                <div class="event-title">${event.title}${subTaskIndicator}</div>
                <div class="event-time">${event.start} - ${event.end}</div>
            `;

            // Evento de Clique para Editar
            eventEl.addEventListener('click', (e) => {
                e.stopPropagation(); // Evita bugs de clique
                openModal(event);
            });

            // Inserir na coluna correta
            const dayColumn = document.querySelector(`.day-column[data-day="${event.day}"] .day-content`);
            if (dayColumn) {
                dayColumn.appendChild(eventEl);
            }
        });
    }

    // --- Manipulação do Modal ---

    function openModal(event = null) {
        modal.classList.remove('hidden');
        
        if (event) {
            // Modo Edição
            document.getElementById('modal-title').innerText = "Editar Atividade";
            currentEditingId = event.id;
            document.getElementById('title').value = event.title;
            document.getElementById('day-select').value = event.day;
            document.getElementById('category').value = event.category;
            document.getElementById('start-time').value = event.start;
            document.getElementById('end-time').value = event.end;
            
            // Carregar sub-tarefas
            tempSubtasks = event.subtasks ? JSON.parse(JSON.stringify(event.subtasks)) : [];
            
            btnDeleteEvent.classList.remove('hidden');
        } else {
            // Modo Criação
            document.getElementById('modal-title').innerText = "Nova Atividade";
            currentEditingId = null;
            form.reset();
            tempSubtasks = [];
            btnDeleteEvent.classList.add('hidden');
        }
        renderSubtasksInModal();
    }

    function closeModal() {
        modal.classList.add('hidden');
    }

    // --- Lógica de Sub-tarefas no Modal ---

    function renderSubtasksInModal() {
        subTasksListEl.innerHTML = '';
        tempSubtasks.forEach((sub, index) => {
            const li = document.createElement('li');
            li.className = `sub-task-item ${sub.completed ? 'completed' : ''}`;
            
            li.innerHTML = `
                <span style="cursor:pointer">${sub.name}</span>
                <button type="button" class="btn-danger" style="padding: 2px 6px; font-size: 0.7rem;">X</button>
            `;

            // Toggle Complete ao clicar no texto
            li.querySelector('span').addEventListener('click', () => {
                tempSubtasks[index].completed = !tempSubtasks[index].completed;
                renderSubtasksInModal();
            });

            // Remover item
            li.querySelector('button').addEventListener('click', () => {
                tempSubtasks.splice(index, 1);
                renderSubtasksInModal();
            });

            subTasksListEl.appendChild(li);
        });
    }

    btnAddSubtask.addEventListener('click', () => {
        const typeSelect = document.getElementById('sub-task-type');
        const newItem = {
            name: typeSelect.value, // Pega o valor do select (Deslocamento, Alimentação...)
            completed: false
        };
        tempSubtasks.push(newItem);
        renderSubtasksInModal();
    });

    // --- Listeners de Eventos ---

    btnAddEvent.addEventListener('click', () => openModal());
    btnCloseModal.addEventListener('click', closeModal);
    
    // Fechar modal clicando fora
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Salvar (Criar ou Atualizar)
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const day = document.getElementById('day-select').value;
        const category = document.getElementById('category').value;
        const start = document.getElementById('start-time').value;
        const end = document.getElementById('end-time').value;

        // Validação simples de tempo
        if (timeToMinutes(end) <= timeToMinutes(start)) {
            alert('O horário de fim deve ser maior que o início.');
            return;
        }

        const eventData = {
            id: currentEditingId || Date.now().toString(),
            title,
            day,
            category,
            start,
            end,
            subtasks: tempSubtasks
        };

        if (currentEditingId) {
            // Atualizar existente
            const index = events.findIndex(ev => ev.id === currentEditingId);
            if (index !== -1) events[index] = eventData;
        } else {
            // Criar novo
            events.push(eventData);
        }

        saveToLocalStorage();
        renderEvents();
        closeModal();
    });

    // Excluir Evento
    btnDeleteEvent.addEventListener('click', () => {
        if (currentEditingId) {
            if(confirm('Tem certeza que deseja excluir esta atividade?')) {
                events = events.filter(ev => ev.id !== currentEditingId);
                saveToLocalStorage();
                renderEvents();
                closeModal();
            }
        }
    });

    // Persistência
    function saveToLocalStorage() {
        localStorage.setItem(APP_KEY, JSON.stringify(events));
    }
});