const { useState, useEffect, useMemo } = React;

function App() {
    const [user, setUser] = useState(() => loadFromStorage(STORAGE_KEYS.USER, { ...DEFAULT_USER }));
    const [income, setIncome] = useState(() => loadFromStorage(STORAGE_KEYS.INCOME, DEFAULT_INCOME));
    const [fixedExpenses, setFixedExpenses] = useState(() => loadFromStorage(STORAGE_KEYS.FIXED_EXPENSES, []));
    const [expenses, setExpenses] = useState(() => loadFromStorage(STORAGE_KEYS.EXPENSES, []));
    const [theme, setTheme] = useState(() => loadFromStorage(STORAGE_KEYS.THEME, 'light'));

    const [currentView, setCurrentView] = useState('auth');
    const [activeTab, setActiveTab] = useState('inicio');

    const [authTab, setAuthTab] = useState('login');
    const [authEmail, setAuthEmail] = useState(user.email);
    const [authPassword, setAuthPassword] = useState('password123');
    const [authName, setAuthName] = useState(user.name);

    const [setupIncome, setSetupIncome] = useState(income.toString());
    const [fixedExpName, setFixedExpName] = useState('');
    const [fixedExpAmount, setFixedExpAmount] = useState('');

    const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
    const [isEditMonthOpen, setIsEditMonthOpen] = useState(false);
    const [toast, setToast] = useState(null);

    const [expenseAmount, setExpenseAmount] = useState('');
    const [expenseDesc, setExpenseDesc] = useState('');
    const [expenseCategory, setExpenseCategory] = useState('General');

    const [luccyInput, setLuccyInput] = useState('');
    const [luccyMessages, setLuccyMessages] = useState([
        { sender: 'luccy', text: '¡Hola! Soy Luccy, tu asistente personal de finanzas offline. Evalué tus finanzas del mes. ¿Quieres algún consejo para maximizar tu ahorro hoy?', time: 'Ahora' }
    ]);
    const [isLuccyTyping, setIsLuccyTyping] = useState(false);

    useEffect(() => saveToStorage(STORAGE_KEYS.USER, user), [user]);
    useEffect(() => saveToStorage(STORAGE_KEYS.INCOME, income), [income]);
    useEffect(() => saveToStorage(STORAGE_KEYS.FIXED_EXPENSES, fixedExpenses), [fixedExpenses]);
    useEffect(() => saveToStorage(STORAGE_KEYS.EXPENSES, expenses), [expenses]);
    useEffect(() => {
        saveToStorage(STORAGE_KEYS.THEME, theme);
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    useEffect(() => {
        if (!user.isAuthenticated) {
            setCurrentView('auth');
        } else if (!user.isOnboarded) {
            setCurrentView('setup');
        } else {
            setCurrentView('dashboard');
        }
    }, [user]);

    const triggerToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3500);
    };

    const totalFixed = useMemo(() => calculateTotalFixed(fixedExpenses), [fixedExpenses]);
    const freeBudget = useMemo(() => calculateFreeBudget(income, totalFixed), [income, totalFixed]);
    const totalSpent = useMemo(() => calculateTotalSpent(expenses), [expenses]);
    const availableToSpend = useMemo(() => calculateAvailableToSpend(freeBudget, totalSpent), [freeBudget, totalSpent]);
    const consumptionPercentage = useMemo(() => calculateConsumptionPercentage(totalSpent, freeBudget), [totalSpent, freeBudget]);
    const assistantTip = useMemo(() => generateAssistantTip(consumptionPercentage, freeBudget), [consumptionPercentage, freeBudget]);

    const handleAuthSubmit = (e) => {
        e.preventDefault();
        if (!authEmail) {
            triggerToast('Por favor, ingresa tu correo electrónico.', 'error');
            return;
        }
        const updatedUser = {
            name: authTab === 'register' ? (authName || 'Usuario') : user.name,
            email: authEmail,
            isAuthenticated: true,
            isOnboarded: user.isOnboarded
        };
        setUser(updatedUser);
        triggerToast(authTab === 'register' ? '¡Cuenta creada con éxito offline!' : '¡Bienvenido de nuevo a Luccy!');
    };

    const handleLogout = () => {
        setUser({ ...DEFAULT_USER });
        triggerToast('Sesión cerrada de forma segura.');
    };

    const handleAddFixedExpense = () => {
        if (!fixedExpName || !fixedExpAmount) {
            triggerToast('Completa el nombre y el monto del gasto fijo.', 'warning');
            return;
        }
        const newExp = { id: generateId(), name: fixedExpName, amount: parseFloat(fixedExpAmount) };
        setFixedExpenses([...fixedExpenses, newExp]);
        setFixedExpName('');
        setFixedExpAmount('');
        triggerToast('Gasto fijo agregado.');
    };

    const handleDeleteFixedExpense = (id) => {
        setFixedExpenses(fixedExpenses.filter(item => item.id !== id));
        triggerToast('Gasto fijo eliminado.');
    };

    const handleFinishSetup = () => {
        const parsedIncome = parseFloat(setupIncome);
        if (isNaN(parsedIncome) || parsedIncome <= 0) {
            triggerToast('Por favor, ingresa un ingreso mensual válido mayor a cero.', 'warning');
            return;
        }
        setIncome(parsedIncome);
        setUser(prev => ({ ...prev, isOnboarded: true }));
        triggerToast('¡Mes configurado exitosamente! Listo para ahorrar.');
    };

    const handleSaveExpense = (e) => {
        e.preventDefault();
        const amount = parseFloat(expenseAmount);
        if (isNaN(amount) || amount <= 0) {
            triggerToast('Ingresa un monto válido para tu gasto.', 'warning');
            return;
        }
        if (!expenseDesc.trim()) {
            triggerToast('Ingresa una descripción del gasto.', 'warning');
            return;
        }
        const newExpense = {
            id: generateId(),
            amount,
            description: expenseDesc,
            category: expenseCategory,
            date: formatDateShort()
        };
        setExpenses([newExpense, ...expenses]);
        setIsAddExpenseOpen(false);
        setExpenseAmount('');
        setExpenseDesc('');
        setExpenseCategory('General');

        const remaining = availableToSpend - amount;
        if (remaining < 0) {
            triggerToast('Gasto registrado. ¡Atención! Has excedido tu presupuesto libre.', 'error');
        } else if (remaining < (freeBudget * 0.2)) {
            triggerToast('Gasto registrado. Alerta: Tu presupuesto libre está por agotarse.', 'warning');
        } else {
            triggerToast('¡Gasto registrado con éxito!');
        }
    };

    const handleDeleteExpense = (id) => {
        setExpenses(expenses.filter(item => item.id !== id));
        triggerToast('Transacción eliminada de la base de datos offline.');
    };

    const handleUpdateMonth = (e) => {
        e.preventDefault();
        const parsedIncome = parseFloat(setupIncome);
        if (isNaN(parsedIncome) || parsedIncome <= 0) {
            triggerToast('Monto de ingresos inválido.', 'error');
            return;
        }
        setIncome(parsedIncome);
        setIsEditMonthOpen(false);
        triggerToast('Presupuesto de ingresos actualizado.');
    };

    const handleResetApp = () => {
        if (window.confirm('¿Seguro de que deseas restaurar la app al estado inicial? Se borrarán todos los datos offline.')) {
            localStorage.clear();
            setUser({ ...DEFAULT_USER });
            setIncome(DEFAULT_INCOME);
            setFixedExpenses([]);
            setExpenses([]);
            setTheme('light');
            triggerToast('Aplicación reiniciada por completo.');
        }
    };

    const handleLuccyChat = (e) => {
        e.preventDefault();
        if (!luccyInput.trim()) return;

        const userMsg = luccyInput.trim();
        setLuccyMessages(prev => [...prev, { sender: 'user', text: userMsg, time: 'Ahora' }]);
        setLuccyInput('');
        setIsLuccyTyping(true);

        setTimeout(() => {
            const cleanMsg = userMsg.toLowerCase();
            const reply = generateLuccyReply(cleanMsg, user, availableToSpend, consumptionPercentage, fixedExpenses, totalSpent, income, freeBudget, totalFixed);
            setLuccyMessages(prev => [...prev, { sender: 'luccy', text: reply, time: 'Ahora' }]);
            setIsLuccyTyping(false);
        }, 1000);
    };

    return (
        <div className={`min-h-screen flex flex-col transition-colors duration-300 ${theme === 'dark' ? 'dark text-gray-100 bg-zinc-950' : 'text-gray-800 bg-slate-50'}`}>
            
            <Toast toast={toast} />

            <div className="w-full flex-grow flex flex-col">
                
                <header className="bg-[#0e6f64] dark:bg-zinc-900 text-white px-6 py-4 shadow-md flex justify-between items-center shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-xl text-emerald-300">
                            🤖
                        </div>
                        <div>
                            <h1 className="text-xl font-extrabold tracking-tight">Luccy</h1>
                            <p className="text-[10px] text-emerald-300/90 font-bold tracking-wider flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                SECURE OFFLINE SYSTEM
                            </p>
                        </div>
                    </div>
                    
                    {user.isAuthenticated && (
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white"
                                title="Cambiar tema"
                            >
                                <i className={`ph-bold ${theme === 'light' ? 'ph-moon' : 'ph-sun'} text-lg`}></i>
                            </button>

                            <button 
                                onClick={handleResetApp}
                                className="p-2 rounded-xl bg-white/10 hover:bg-red-500/20 hover:text-red-300 transition-colors text-white hidden md:flex items-center gap-1.5 text-xs font-semibold"
                                title="Reiniciar aplicación"
                            >
                                <i className="ph-bold ph-arrow-counter-clockwise text-sm"></i>
                                Reiniciar App
                            </button>

                            <div className="flex items-center gap-3 pl-2 border-l border-white/20">
                                <div className="hidden sm:block text-right">
                                    <p className="text-xs font-bold">{user.name}</p>
                                    <p className="text-[10px] text-emerald-200">{user.email}</p>
                                </div>
                                <button 
                                    onClick={handleLogout}
                                    className="p-2 rounded-xl bg-red-600/80 hover:bg-red-600 transition-colors text-white"
                                    title="Cerrar sesión"
                                >
                                    <i className="ph-bold ph-sign-out text-lg"></i>
                                </button>
                            </div>
                        </div>
                    )}
                </header>

                <main className="flex-grow flex flex-col md:flex-row w-full max-w-7xl mx-auto p-4 md:p-8 gap-6">
                    
                    <div className="w-full flex-grow flex flex-col">

                        {currentView === 'auth' && (
                            <AuthScreen 
                                user={user}
                                authTab={authTab}
                                setAuthTab={setAuthTab}
                                authEmail={authEmail}
                                setAuthEmail={setAuthEmail}
                                authPassword={authPassword}
                                setAuthPassword={setAuthPassword}
                                authName={authName}
                                setAuthName={setAuthName}
                                onAuthSubmit={handleAuthSubmit}
                            />
                        )}

                        {currentView === 'setup' && (
                            <SetupScreen 
                                user={user}
                                setupIncome={setupIncome}
                                setSetupIncome={setSetupIncome}
                                fixedExpName={fixedExpName}
                                setFixedExpName={setFixedExpName}
                                fixedExpAmount={fixedExpAmount}
                                setFixedExpAmount={setFixedExpAmount}
                                fixedExpenses={fixedExpenses}
                                totalFixed={totalFixed}
                                onAddFixedExpense={handleAddFixedExpense}
                                onDeleteFixedExpense={handleDeleteFixedExpense}
                                onFinishSetup={handleFinishSetup}
                            />
                        )}

                        {currentView === 'dashboard' && (
                            <div className="flex-grow flex flex-col gap-6 fade-in">
                                
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-zinc-900 p-4 rounded-3xl shadow-sm border border-slate-100 dark:border-zinc-800">
                                    <div className="flex bg-slate-100 dark:bg-zinc-800 rounded-2xl p-1 w-full sm:w-auto">
                                        <button 
                                            onClick={() => setActiveTab('inicio')}
                                            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold rounded-xl transition-all ${activeTab === 'inicio' ? 'bg-white dark:bg-zinc-700 text-[#0e6f64] dark:text-white shadow-sm' : 'text-gray-500 dark:text-zinc-400'}`}
                                        >
                                            <i className="ph-bold ph-chart-pie-slice"></i>
                                            Panel Inicial
                                        </button>
                                        <button 
                                            onClick={() => setActiveTab('historial')}
                                            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold rounded-xl transition-all ${activeTab === 'historial' ? 'bg-white dark:bg-zinc-700 text-[#0e6f64] dark:text-white shadow-sm' : 'text-gray-500 dark:text-zinc-400'}`}
                                        >
                                            <i className="ph-bold ph-receipt"></i>
                                            Historial de Gastos
                                        </button>
                                        <button 
                                            onClick={() => setActiveTab('luccy_ai')}
                                            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold rounded-xl transition-all ${activeTab === 'luccy_ai' ? 'bg-white dark:bg-zinc-700 text-[#0e6f64] dark:text-white shadow-sm' : 'text-gray-500 dark:text-zinc-400'}`}
                                        >
                                            <i className="ph-bold ph-robot"></i>
                                            Conversar con Luccy AI
                                        </button>
                                    </div>

                                    <div className="flex gap-2 w-full sm:w-auto">
                                        <button 
                                            onClick={() => setIsEditMonthOpen(true)}
                                            className="flex-1 sm:flex-none border border-[#0e6f64] text-[#0e6f64] dark:text-emerald-300 dark:border-emerald-500/30 hover:bg-emerald-50 dark:hover:bg-zinc-800 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                                        >
                                            <i className="ph-bold ph-gear"></i>
                                            Configurar Mes
                                        </button>
                                        <button 
                                            onClick={() => setIsAddExpenseOpen(true)}
                                            className="flex-1 sm:flex-none bg-[#0e6f64] hover:bg-[#0b544b] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5"
                                        >
                                            <i className="ph-bold ph-plus-circle text-sm"></i>
                                            Registrar Gasto
                                        </button>
                                    </div>
                                </div>

                                {activeTab === 'inicio' && (
                                    <DashboardHome 
                                        income={income}
                                        totalFixed={totalFixed}
                                        freeBudget={freeBudget}
                                        totalSpent={totalSpent}
                                        availableToSpend={availableToSpend}
                                        consumptionPercentage={consumptionPercentage}
                                        assistantTip={assistantTip}
                                        expenses={expenses}
                                        setActiveTab={setActiveTab}
                                    />
                                )}

                                {activeTab === 'historial' && (
                                    <DashboardHistory 
                                        expenses={expenses}
                                        totalSpent={totalSpent}
                                        onDeleteExpense={handleDeleteExpense}
                                    />
                                )}

                                {activeTab === 'luccy_ai' && (
                                    <LuccyAIChat 
                                        luccyInput={luccyInput}
                                        setLuccyInput={setLuccyInput}
                                        luccyMessages={luccyMessages}
                                        setLuccyMessages={setLuccyMessages}
                                        isLuccyTyping={isLuccyTyping}
                                        onSend={handleLuccyChat}
                                    />
                                )}

                            </div>
                        )}

                    </div>
                </main>
            </div>

            {isAddExpenseOpen && (
                <AddExpenseModal 
                    expenseAmount={expenseAmount}
                    setExpenseAmount={setExpenseAmount}
                    expenseDesc={expenseDesc}
                    setExpenseDesc={setExpenseDesc}
                    expenseCategory={expenseCategory}
                    setExpenseCategory={setExpenseCategory}
                    onClose={() => setIsAddExpenseOpen(false)}
                    onSave={handleSaveExpense}
                />
            )}

            {isEditMonthOpen && (
                <EditMonthModal 
                    setupIncome={setupIncome}
                    setSetupIncome={setSetupIncome}
                    onClose={() => setIsEditMonthOpen(false)}
                    onSubmit={handleUpdateMonth}
                />
            )}

        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
