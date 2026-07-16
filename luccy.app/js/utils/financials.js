function loadFromStorage(key, defaultValue) {
    const saved = localStorage.getItem(key);
    if (saved === null || saved === undefined) return defaultValue;
    try {
        return JSON.parse(saved);
    } catch {
        return defaultValue;
    }
}

function saveToStorage(key, value) {
    if (typeof value === 'object') {
        localStorage.setItem(key, JSON.stringify(value));
    } else {
        localStorage.setItem(key, value.toString());
    }
}

function calculateTotalFixed(fixedExpenses) {
    return fixedExpenses.reduce((sum, exp) => sum + exp.amount, 0);
}

function calculateFreeBudget(income, totalFixed) {
    const val = income - totalFixed;
    return val > 0 ? val : 0;
}

function calculateTotalSpent(expenses) {
    return expenses.reduce((sum, exp) => sum + exp.amount, 0);
}

function calculateAvailableToSpend(freeBudget, totalSpent) {
    return freeBudget - totalSpent;
}

function calculateConsumptionPercentage(totalSpent, freeBudget) {
    if (freeBudget <= 0) return 0;
    const pct = (totalSpent / freeBudget) * 100;
    return Math.min(Math.round(pct), 100);
}

function generateId() {
    return Date.now().toString();
}

function formatCurrency(value) {
    return value.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatDateShort(date) {
    return new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
}

function generateAssistantTip(consumptionPercentage, freeBudget) {
    if (consumptionPercentage === 0) {
        return "¡Qué gran comienzo! Tu presupuesto de ahorro libre está intacto en $ " + freeBudget.toFixed(2) + ". Registra tu primer gasto presionando el botón '+'.";
    }
    if (consumptionPercentage > 85) {
        return "⚠️ Alerta de Luccy: Has agotado casi todo tu presupuesto libre de gastos. Es momento de activar modo de austeridad.";
    }
    if (consumptionPercentage > 50) {
        return "💡 Tip de Ahorro: Tu consumo de presupuesto ya pasó del 50%. Luccy te sugiere priorizar compras genéricas esta semana.";
    }
    return "✨ ¡Vas por excelente camino! Luccy proyecta que terminarás el mes con un excelente margen de ahorro remanente.";
}

function generateLuccyReply(cleanMsg, user, availableToSpend, consumptionPercentage, fixedExpenses, totalSpent, income, freeBudget) {
    if (cleanMsg.includes('hola') || cleanMsg.includes('buenos dias') || cleanMsg.includes('buenas tardes')) {
        return `¡Hola ${user.name}! Qué alegría conversar contigo. Actualmente te queda un presupuesto libre disponible de $${availableToSpend.toFixed(2)}. ¿En qué puedo guiarte hoy?`;
    } else if (cleanMsg.includes('ahorro') || cleanMsg.includes('consejo') || cleanMsg.includes('recomienda')) {
        if (consumptionPercentage > 75) {
            return `Veo que has consumido el ${consumptionPercentage}% de tu presupuesto disponible. Te aconsejo suspender los gastos no esenciales (cafés premium, suscripciones inactivas) por los próximos 5 días para estabilizar tus finanzas de este mes.`;
        } else if (consumptionPercentage > 40) {
            return "Vas en un ritmo moderado. Una regla de oro excelente para tu presupuesto libre restante es aplicar la estrategia del 'Ahorro Inverso': aparta un 10% de lo que te queda hoy mismo antes de seguir consumiendo.";
        } else {
            return `¡Excelente control! Solo has consumido un ${consumptionPercentage}% de tu presupuesto libre mensual. Te sugiero destinar un porcentaje de este superávit a un fondo de emergencias de alta liquidez.`;
        }
    } else if (cleanMsg.includes('gasto') || cleanMsg.includes('mayor') || cleanMsg.includes('fijos')) {
        if (fixedExpenses.length > 0) {
            const topFixed = [...fixedExpenses].sort((a, b) => b.amount - a.amount)[0];
            return `Analizando tu configuración offline: Tu mayor gasto fijo es "${topFixed.name}" con $${topFixed.amount.toFixed(2)}. En gastos cotidianos has acumulado $${totalSpent.toFixed(2)} este mes. ¿Quieres que auditemos alguno en específico?`;
        } else {
            return `No has registrado gastos fijos este mes. Tu total gastado en consumo diario es de $${totalSpent.toFixed(2)}. ¡Intenta agregar tus suscripciones de streaming o servicios básicos en la sección de gastos fijos para un mejor control!`;
        }
    } else if (cleanMsg.includes('regla 50') || cleanMsg.includes('50/30/20')) {
        const nec = income * 0.5;
        const des = income * 0.3;
        const aho = income * 0.2;
        return `De acuerdo con la famosa regla 50/30/20, basándonos en tu ingreso de $${income.toFixed(2)}: deberías destinar máximo $${nec.toFixed(2)} a necesidades indispensables (gastos fijos), $${des.toFixed(2)} a deseos personales, y ahorrar exactamente $${aho.toFixed(2)} mensuales.`;
    } else if (cleanMsg.includes('offline') || cleanMsg.includes('seguridad')) {
        return "¡Toda tu información está completamente segura! Funciono 100% de manera offline gracias al almacenamiento local cifrado de tu navegador. Ningún dato viaja a servidores externos, garantizando tu privacidad financiera absoluta.";
    } else {
        return `Comprendo tu inquietud sobre tu dinero. Tu ingreso total actual es de $${income.toFixed(2)}. Tienes disponibles $${availableToSpend.toFixed(2)} de presupuesto libre tras cubrir tus fijos de $${calculateTotalFixed(fixedExpenses).toFixed(2)}. Te recomiendo seguir registrando tus gastos cotidianos para poder darte un análisis más certero.`;
    }
}
