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
            const reply = generateLuccyReply(cleanMsg, user, availableToSpend, consumptionPercentage, fixedExpenses, totalSpent, income, freeBudget);
            setLuccyMessages(prev => [...prev, { sender: 'luccy', text: reply, time: 'Ahora' }]);
            setIsLuccyTyping(false);
        }, 1000);
    };

    const handleExportData = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ income, fixedExpenses, expenses }));
        const dlAnchorElem = document.createElement('a');
        dlAnchorElem.setAttribute("href", dataStr);
        dlAnchorElem.setAttribute("download", `Luccy_Finanzas_${new Date().toISOString().slice(0,10)}.json`);
        dlAnchorElem.click();
        triggerToast('Copia de seguridad local exportada.');
    };

    return (
        <div className={`min-h-screen flex flex-col items-center justify-center p-0 md:p-6 transition-colors duration-300 ${theme === 'dark' ? 'dark text-gray-100' : 'text-gray-800'}`}>
            
            <Toast toast={toast} />

            <div className="w-full max-w-[440px] h-[100vh] md:h-[860px] md:rounded-[45px] bg-[#f8fafc] dark:bg-zinc-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] relative overflow-hidden flex flex-col border-0 md:border-[10px] border-slate-700/80 dark:border-zinc-800">
                
                <div className="bg-[#0e6f64] dark:bg-zinc-950 px-6 pt-3 pb-1 flex justify-between items-center text-white/90 text-xs font-semibold z-30 shrink-0">
                    <span className="tracking-wide">Luccy 🤖</span>
                    <div className="flex items-center gap-2">
                        <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                            OFFLINE SECURE
                        </span>
                        <i className="ph-bold ph-wifi-high"></i>
                        <i className="ph-bold ph-battery-charging text-emerald-400"></i>
                    </div>
                </div>

                <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar relative bg-[#f1f5f9] dark:bg-zinc-950">
                    
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
                            triggerToast={triggerToast}
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
                        <DashboardScreen 
                            user={user}
                            income={income}
                            totalFixed={totalFixed}
                            freeBudget={freeBudget}
                            totalSpent={totalSpent}
                            availableToSpend={availableToSpend}
                            consumptionPercentage={consumptionPercentage}
                            assistantTip={assistantTip}
                            expenses={expenses}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            onEditMonth={() => {
                                setSetupIncome(income.toString());
                                setIsEditMonthOpen(true);
                            }}
                            onThemeToggle={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                            theme={theme}
                            onDeleteExpense={handleDeleteExpense}
                            onExportData={handleExportData}
                            onResetApp={handleResetApp}
                            onAddExpense={() => setIsAddExpenseOpen(true)}
                            luccyInput={luccyInput}
                            setLuccyInput={setLuccyInput}
                            luccyMessages={luccyMessages}
                            isLuccyTyping={isLuccyTyping}
                            onLuccyChat={handleLuccyChat}
                        />
                    )}

                </div>

                {isEditMonthOpen && (
                    <EditMonthModal 
                        setupIncome={setupIncome}
                        setSetupIncome={setSetupIncome}
                        onClose={() => setIsEditMonthOpen(false)}
                        onSubmit={handleUpdateMonth}
                    />
                )}

                {isAddExpenseOpen && (
                    <AddExpenseSheet 
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

            </div>

            <div className="hidden lg:flex flex-col fixed left-8 top-1/2 -translate-y-1/2 w-80 bg-white dark:bg-zinc-900 rounded-4xl p-6 shadow-2xl border border-slate-100 dark:border-zinc-800 gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#ccfbf0] text-[#0e6f64] flex items-center justify-center text-lg">
                        <i className="ph-fill ph-info"></i>
                    </div>
                    <div>
                        <h4 className="font-extrabold text-sm text-slate-800 dark:text-white leading-none">Luccy Workspace</h4>
                        <span className="text-[10px] text-gray-400">Modo Desarrollador Activo</span>
                    </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                    Esta aplicación es una fiel representación de las maquetas mostradas en tus archivos adjuntos. La experiencia ha sido enriquecida con almacenamiento offline persistente, alertas contextuales de Luccy AI y un sistema fluido SPA.
                </p>
                <div className="text-[11px] bg-slate-50 dark:bg-zinc-950/60 p-3 rounded-2xl space-y-1.5 border border-slate-100 dark:border-zinc-800/80">
                    <p className="font-bold text-[#0e6f64] dark:text-[#a7f3d0]">Sugerencias de Pruebas:</p>
                    <p>✔️ Prueba a recargar la pestaña. Verás que los datos no se pierden.</p>
                    <p>✔️ Haz clic en el sol del encabezado para activar el Modo Oscuro.</p>
                    <p>✔️ Ve a la sección "Luccy AI" para chatear con tu asistente offline.</p>
                </div>
            </div>

        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
