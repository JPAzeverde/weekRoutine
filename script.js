class OrganizadorSemanal {
    constructor() {
        this.atividades = this.carregarAtividades();
        this.horarios = this.gerarHorarios();
        this.dias = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'];
        this.diasNomes = {
            'segunda': 'Segunda',
            'terca': 'Terça',
            'quarta': 'Quarta',
            'quinta': 'Quinta',
            'sexta': 'Sexta',
            'sabado': 'Sábado',
            'domingo': 'Domingo'
        };
        
        this.init();
    }
    
    gerarHorarios() {
        const horarios = [];
        for (let i = 0; i < 24; i++) {
            const hora = i.toString().padStart(2, '0');
            horarios.push(`${hora}:00`);
        }
        return horarios;
    }
    
    carregarAtividades() {
        const salvas = localStorage.getItem('atividadesSemanais');
        
        if (!salvas) {
            if (typeof CONFIG !== 'undefined') {
                const tarefasIniciais = getTarefasConfiguradas();
                this.salvarAtividades(tarefasIniciais);
                return tarefasIniciais;
            }
            return [];
        }
        
        return JSON.parse(salvas);
    }
    
    salvarAtividades(atividades = null) {
        if (atividades) {
            localStorage.setItem('atividadesSemanais', JSON.stringify(atividades));
        } else {
            localStorage.setItem('atividadesSemanais', JSON.stringify(this.atividades));
        }
    }
    
    init() {
        this.renderizarGrade();
        this.adicionarEventos();
        this.abrirModal();
    }
    
    extrairHora(horarioCompleto) {
        return horarioCompleto.split(':')[0] + ':00';
    }
    
    horaParaNumero(horaStr) {
        const [hora, minuto] = horaStr.split(':');
        return parseInt(hora) + (parseInt(minuto) / 60);
    }
    
    // Calcular o horário de início para uma célula específica
    calcularInicioNaCelula(atividade, horaCelula) {
        const horaInicioNum = this.horaParaNumero(atividade.horaInicio);
        const horaCelulaNum = this.horaParaNumero(horaCelula);
        
        // Se a atividade começa nesta célula, retorna o horário de início real
        if (horaCelulaNum <= horaInicioNum && horaCelulaNum + 1 > horaInicioNum) {
            return atividade.horaInicio;
        }
        
        // Se a atividade começou antes, retorna o início da célula
        return horaCelula;
    }
    
    // Calcular o horário de término para uma célula específica
    calcularTerminoNaCelula(atividade, horaCelula) {
        const horaFimNum = this.horaParaNumero(atividade.horaFim);
        const horaCelulaNum = this.horaParaNumero(horaCelula);
        const proximaHora = horaCelulaNum + 1;
        
        // Se a atividade termina nesta célula, retorna o horário de término real
        if (horaFimNum <= proximaHora && horaFimNum > horaCelulaNum) {
            return atividade.horaFim;
        }
        
        // Se a atividade continua, retorna o final da célula
        return `${Math.floor(proximaHora).toString().padStart(2, '0')}:00`;
    }
    
    // Verificar se a atividade ocupa a célula inteira (da hora cheia à próxima hora cheia)
    isCelulaCompleta(atividade, horaCelula) {
        const inicioNaCelula = this.calcularInicioNaCelula(atividade, horaCelula);
        const terminoNaCelula = this.calcularTerminoNaCelula(atividade, horaCelula);
        const proximaHora = `${(parseInt(horaCelula.split(':')[0]) + 1).toString().padStart(2, '0')}:00`;
        
        // Verifica se ocupa do início exato da célula até o final exato
        return inicioNaCelula === horaCelula && terminoNaCelula === proximaHora;
    }
    
    // Verificar se uma atividade cobre esta célula
    atividadeCobreCelula(atividade, horaCelula) {
        const horaInicioNum = this.horaParaNumero(atividade.horaInicio);
        const horaFimNum = this.horaParaNumero(atividade.horaFim);
        const horaCelulaNum = this.horaParaNumero(horaCelula);
        const proximaHora = horaCelulaNum + 1;
        
        // A atividade cobre esta célula se há intersecção entre [horaCelula, proximaHora] e [horaInicio, horaFim]
        return (horaCelulaNum < horaFimNum && proximaHora > horaInicioNum);
    }
    
    renderizarGrade() {
        const gradeContainer = document.getElementById('gradeHorarios');
        gradeContainer.innerHTML = '';
        
        this.horarios.forEach(hora => {
            // Linha de horário
            const horarioLabel = document.createElement('div');
            horarioLabel.className = 'horario-label';
            horarioLabel.textContent = hora;
            gradeContainer.appendChild(horarioLabel);
            
            // Células para cada dia
            this.dias.forEach(dia => {
                const celula = document.createElement('div');
                celula.className = 'celula';
                celula.setAttribute('data-dia', dia);
                celula.setAttribute('data-hora', hora);
                
                // Encontrar todas as atividades que cobrem esta célula
                const atividadesAqui = this.atividades.filter(atividade => {
                    return atividade.dia === dia && this.atividadeCobreCelula(atividade, hora);
                });
                
                // Ordenar atividades por horário de início
                atividadesAqui.sort((a, b) => a.horaInicio.localeCompare(b.horaInicio));
                
                atividadesAqui.forEach(atividade => {
                    const inicioNaCelula = this.calcularInicioNaCelula(atividade, hora);
                    const terminoNaCelula = this.calcularTerminoNaCelula(atividade, hora);
                    const celulaCompleta = this.isCelulaCompleta(atividade, hora);
                    const atividadeElement = this.criarElementoAtividade(atividade, inicioNaCelula, terminoNaCelula, celulaCompleta);
                    celula.appendChild(atividadeElement);
                });
                
                gradeContainer.appendChild(celula);
            });
        });
    }
    
    criarElementoAtividade(atividade, inicioNaCelula, terminoNaCelula, celulaCompleta) {
        const div = document.createElement('div');
        div.className = 'atividade';
        div.style.background = `${atividade.cor}20`;
        div.style.borderLeftColor = atividade.cor;
        div.setAttribute('data-id', atividade.id);
        
        // Se a atividade ocupa a célula inteira, aplicar altura total
        if (celulaCompleta) {
            div.style.height = '100%';
            div.style.display = 'flex';
            div.style.flexDirection = 'column';
            div.style.justifyContent = 'center';
            div.style.minHeight = '70px';
        }
        
        // Verificar se este é o início real da atividade
        const ehInicioReal = inicioNaCelula === atividade.horaInicio;
        
        div.innerHTML = `
            <div class="atividade-nome" style="">${ehInicioReal ? ' ' : ' '}${this.escapeHtml(atividade.nome)}</div>
            <div class="atividade-horario">${inicioNaCelula} - ${terminoNaCelula}</div>
            ${ehInicioReal ? `
                <div class="atividade-acoes">
                    <button class="btn-editar" onclick="organizador.editarAtividade('${atividade.id}')">✎</button>
                    <button class="btn-danger" onclick="organizador.removerAtividade('${atividade.id}')">×</button>
                </div>
            ` : ''}
        `;
        
        return div;
    }
    
    escapeHtml(texto) {
        const div = document.createElement('div');
        div.textContent = texto;
        return div.innerHTML;
    }
    
    adicionarEventos() {
        document.getElementById('btnAdicionar').onclick = () => this.mostrarModal();
        document.getElementById('btnLimpar').onclick = () => this.limparTudo();
        document.getElementById('btnCancelar').onclick = () => this.fecharModal();
        document.querySelector('.fechar').onclick = () => this.fecharModal();
        
        window.onclick = (event) => {
            const modal = document.getElementById('modal');
            if (event.target === modal) {
                this.fecharModal();
            }
        };
        
        document.getElementById('formAtividade').onsubmit = (e) => {
            e.preventDefault();
            this.salvarAtividade();
        };
    }
    
    abrirModal() {
        // Função vazia para compatibilidade
    }
    
    mostrarModal(atividadeId = null) {
        const modal = document.getElementById('modal');
        const form = document.getElementById('formAtividade');
        const titulo = modal.querySelector('h2');
        
        if (atividadeId) {
            const atividade = this.atividades.find(a => a.id === atividadeId);
            if (atividade) {
                titulo.textContent = 'Editar Atividade';
                document.getElementById('nomeAtividade').value = atividade.nome;
                document.getElementById('diaSemana').value = atividade.dia;
                document.getElementById('horaInicio').value = atividade.horaInicio;
                document.getElementById('horaFim').value = atividade.horaFim;
                document.getElementById('corAtividade').value = atividade.cor;
                form.setAttribute('data-editing', atividadeId);
            }
        } else {
            titulo.textContent = 'Adicionar Atividade';
            form.reset();
            document.getElementById('corAtividade').value = '#4CAF50';
            form.removeAttribute('data-editing');
        }
        
        modal.style.display = 'block';
    }
    
    fecharModal() {
        const modal = document.getElementById('modal');
        modal.style.display = 'none';
        document.getElementById('formAtividade').reset();
    }
    
    salvarAtividade() {
        const nome = document.getElementById('nomeAtividade').value.trim();
        const dia = document.getElementById('diaSemana').value;
        const horaInicio = document.getElementById('horaInicio').value;
        const horaFim = document.getElementById('horaFim').value;
        const cor = document.getElementById('corAtividade').value;
        const form = document.getElementById('formAtividade');
        const editingId = form.getAttribute('data-editing');
        
        if (!nome || !horaInicio || !horaFim) {
            alert('Por favor, preencha todos os campos!');
            return;
        }
        
        if (horaInicio >= horaFim) {
            alert('O horário de início deve ser anterior ao horário de término!');
            return;
        }
        
        // Verificar conflito de horário
        const conflito = this.atividades.some(atividade => {
            if (editingId && atividade.id === editingId) return false;
            return atividade.dia === dia && 
                   ((horaInicio >= atividade.horaInicio && horaInicio < atividade.horaFim) ||
                    (horaFim > atividade.horaInicio && horaFim <= atividade.horaFim) ||
                    (horaInicio <= atividade.horaInicio && horaFim >= atividade.horaFim));
        });
        
        if (conflito) {
            alert('Já existe uma atividade neste horário!');
            return;
        }
        
        if (editingId) {
            // Editar atividade existente
            const index = this.atividades.findIndex(a => a.id === editingId);
            if (index !== -1) {
                this.atividades[index] = {
                    ...this.atividades[index],
                    nome,
                    dia,
                    horaInicio,
                    horaFim,
                    cor
                };
            }
        } else {
            // Criar nova atividade
            const novaAtividade = {
                id: Date.now().toString(),
                nome,
                dia,
                horaInicio,
                horaFim,
                cor
            };
            this.atividades.push(novaAtividade);
        }
        
        this.salvarAtividades();
        this.renderizarGrade();
        this.fecharModal();
    }
    
    editarAtividade(id) {
        this.mostrarModal(id);
    }
    
    removerAtividade(id) {
        if (confirm('Tem certeza que deseja remover esta atividade?')) {
            this.atividades = this.atividades.filter(atividade => atividade.id !== id);
            this.salvarAtividades();
            this.renderizarGrade();
        }
    }
    
    limparTudo() {
        if (confirm('Tem certeza que deseja limpar todas as atividades?')) {
            this.atividades = [];
            this.salvarAtividades();
            this.renderizarGrade();
        }
    }
    
    resetarParaPadrao() {
        if (confirm('Isso irá substituir todas as atividades atuais pelas atividades padrão. Continuar?')) {
            if (typeof CONFIG !== 'undefined') {
                const tarefasPadrao = getTarefasConfiguradas();
                this.atividades = tarefasPadrao;
                this.salvarAtividades();
                this.renderizarGrade();
                alert('Atividades resetadas para o padrão!');
            }
        }
    }
}

// Inicializar o organizador quando a página carregar
let organizador;
document.addEventListener('DOMContentLoaded', () => {
    organizador = new OrganizadorSemanal();
});

window.resetarOrganizador = () => {
    if (organizador) {
        organizador.resetarParaPadrao();
    }
};