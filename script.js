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

    horaParaDecimal(horaStr) {
        const [h, m] = horaStr.split(':');
        return parseInt(h) + (parseInt(m) / 60);
    }

    horaParaMinutos(horaStr) {
        const [h, m] = horaStr.split(':');
        return parseInt(h) * 60 + parseInt(m);
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
    
    calcularInicioNaCelula(atividade, horaCelula) {
        const horaInicioNum = this.horaParaNumero(atividade.horaInicio);
        const horaCelulaNum = this.horaParaNumero(horaCelula);
        
        if (horaCelulaNum <= horaInicioNum && horaCelulaNum + 1 > horaInicioNum) {
            return atividade.horaInicio;
        }
        
        return horaCelula;
    }
    
    calcularTerminoNaCelula(atividade, horaCelula) {
        const horaFimNum = this.horaParaNumero(atividade.horaFim);
        const horaCelulaNum = this.horaParaNumero(horaCelula);
        const proximaHora = horaCelulaNum + 1;
        
        if (horaFimNum <= proximaHora && horaFimNum > horaCelulaNum) {
            return atividade.horaFim;
        }
        
        return `${Math.floor(proximaHora).toString().padStart(2, '0')}:00`;
    }
    
    isCelulaCompleta(atividade, horaCelula) {
        const inicioNaCelula = this.calcularInicioNaCelula(atividade, horaCelula);
        const terminoNaCelula = this.calcularTerminoNaCelula(atividade, horaCelula);
        const proximaHora = `${(parseInt(horaCelula.split(':')[0]) + 1).toString().padStart(2, '0')}:00`;
        
        return inicioNaCelula === horaCelula && terminoNaCelula === proximaHora;
    }
    
    atividadeCobreCelula(atividade, horaCelula) {
        const horaInicioNum = this.horaParaNumero(atividade.horaInicio);
        const horaFimNum = this.horaParaNumero(atividade.horaFim);
        const horaCelulaNum = this.horaParaNumero(horaCelula);
        const proximaHora = horaCelulaNum + 1;
        
        return (horaCelulaNum < horaFimNum && proximaHora > horaInicioNum);
    }
    
    renderizarGrade() {
        const gradeContainer = document.getElementById('gradeHorarios');
        gradeContainer.innerHTML = '';
        
        // 1. Calcular a altura necessária para cada hora
        const alturasPorHora = [];
        for (let idx = 0; idx < this.horarios.length; idx++) {
            const hora = this.horarios[idx];
            let maxAtividadesNaHora = 0;
            
            for (const dia of this.dias) {
                const atividadesNaCelula = this.atividades.filter(atividade => 
                    atividade.dia === dia && this.atividadeCobreCelula(atividade, hora)
                );
                maxAtividadesNaHora = Math.max(maxAtividadesNaHora, atividadesNaCelula.length);
            }
            
            // Altura base: 30px se não houver atividades; caso contrário, 90px por atividade
            const altura = maxAtividadesNaHora === 0 ? 20 : 90 * maxAtividadesNaHora;
            alturasPorHora.push(altura);
        }
        
        // Aplicar grid-template-rows dinamicamente
        const gridRows = alturasPorHora.map(h => `${h}px`).join(' ');
        gradeContainer.style.gridTemplateRows = gridRows;
        
        // 2. Construir as células normalmente
        this.horarios.forEach((hora, index) => {
            const horarioLabel = document.createElement('div');
            horarioLabel.className = 'horario-label';
            horarioLabel.textContent = hora;
            gradeContainer.appendChild(horarioLabel);
            
            this.dias.forEach(dia => {
                const celula = document.createElement('div');
                celula.className = 'celula';
                celula.setAttribute('data-dia', dia);
                celula.setAttribute('data-hora', hora);
                
                const atividadesAqui = this.atividades.filter(atividade => {
                    return atividade.dia === dia && this.atividadeCobreCelula(atividade, hora);
                });
                
                atividadesAqui.sort((a, b) => a.horaInicio.localeCompare(b.horaInicio));
                
                atividadesAqui.forEach(atividade => {
                    const inicioNaCelula = this.calcularInicioNaCelula(atividade, hora);
                    const terminoNaCelula = this.calcularTerminoNaCelula(atividade, hora);
                    const celulaCompleta = this.isCelulaCompleta(atividade, hora);
                    const atividadeElement = this.criarElementoAtividade(atividade, inicioNaCelula, terminoNaCelula, celulaCompleta, hora);
                    celula.appendChild(atividadeElement);
                });
                
                gradeContainer.appendChild(celula);
            });
        });
    }
    
    criarElementoAtividade(atividade, inicioNaCelula, terminoNaCelula, celulaCompleta, horaCelula) {
        const div = document.createElement('div');
        div.className = 'atividade';
        div.style.background = `${atividade.cor}20`;

        div.style.borderLeftColor = atividade.cor;
        
        div.setAttribute('data-id', atividade.id);
        
        // Cálculo da posição vertical e altura (percentuais relativos à célula)
        const minutosCelula = this.horaParaMinutos(horaCelula);
        const minutosInicio = this.horaParaMinutos(inicioNaCelula);
        const minutosTermino = this.horaParaMinutos(terminoNaCelula);
        
        let topPercent = ((minutosInicio - minutosCelula) / 60) * 100;
        let heightPercent = ((minutosTermino - minutosInicio) / 60) * 100;
        
        topPercent = Math.max(0, Math.min(100, topPercent));
        heightPercent = Math.max(2, Math.min(100, heightPercent));
        
        div.style.top = `${topPercent}%`;
        div.style.height = `${heightPercent}%`;
        
        const ehInicioReal = inicioNaCelula === atividade.horaInicio;
        
        div.innerHTML = `
            <div class="atividade-nome">${this.escapeHtml(atividade.nome)}</div>
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
        
        const btnAjuda = document.getElementById('btnAjuda');
        const modalAjuda = document.getElementById('modalAjuda');
        const fecharAjuda = document.querySelector('.fechar-ajuda');
        const btnFecharAjuda = document.getElementById('btnFecharAjuda');
        
        if (btnAjuda) {
            btnAjuda.onclick = () => {
                modalAjuda.style.display = 'block';
            };
        }
        
        if (fecharAjuda) {
            fecharAjuda.onclick = () => {
                modalAjuda.style.display = 'none';
            };
        }
        
        if (btnFecharAjuda) {
            btnFecharAjuda.onclick = () => {
                modalAjuda.style.display = 'none';
            };
        }
        
        window.onclick = (event) => {
            const modal = document.getElementById('modal');
            const modalAjuda = document.getElementById('modalAjuda');
            if (event.target === modal) {
                this.fecharModal();
            }
            if (event.target === modalAjuda) {
                modalAjuda.style.display = 'none';
            }
        };
        
        document.querySelector('.fechar').onclick = () => this.fecharModal();
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

let organizador;
document.addEventListener('DOMContentLoaded', () => {
    organizador = new OrganizadorSemanal();
});

window.resetarOrganizador = () => {
    if (organizador) {
        organizador.resetarParaPadrao();
    }
};