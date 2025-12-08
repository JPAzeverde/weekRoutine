document.getElementById('selectDay').addEventListener('click', function(event) {
// Evita o comportamento padrão do link (que adicionaria # na URL)
event.preventDefault();

// 1. Array com os IDs dos dias na ordem que o JavaScript entende
// O getDay() retorna 0 para Domingo, 1 para Segunda, etc.
const daysIds = [
    "sunday",    // 0
    "monday",    // 1
    "tuesday",   // 2
    "wednesday", // 3
    "thursday",  // 4
    "friday",    // 5
    "saturday"   // 6
];

// 2. Descobre o dia atual (0 a 6)
const todayIndex = new Date().getDay();

// 3. Pega o ID correspondente
const currentDayId = daysIds[todayIndex];

// 4. Encontra o elemento no HTML
const targetElement = document.getElementById(currentDayId);

// 5. Se o elemento existir, rola até ele
if (targetElement) {
    targetElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' // Tenta centralizar o card na tela
    });

    // Efeito visual extra: Pisca a borda azul para destacar
    targetElement.classList.remove('border-gray-200');
    targetElement.classList.add('ring-4', 'ring-blue-300', 'border-blue-500');
    
    // Remove o destaque após 2 segundos
    setTimeout(() => {
        targetElement.classList.remove('ring-4', 'ring-blue-300', 'border-blue-500');
        targetElement.classList.add('border-gray-200');
    }, 2000);
}
});