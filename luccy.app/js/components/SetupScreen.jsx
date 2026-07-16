function SetupScreen({ user, setupIncome, setSetupIncome, fixedExpName, setFixedExpName, fixedExpAmount, setFixedExpAmount, fixedExpenses, totalFixed, onAddFixedExpense, onDeleteFixedExpense, onFinishSetup }) {
    return (
        <div className="flex-grow flex flex-col p-5 fade-in bg-slate-50 dark:bg-zinc-900 justify-between min-h-full">
            
            <div>
                <div className="bg-gradient-to-r from-emerald-500/10 to-[#0e6f64]/10 dark:from-emerald-950/20 dark:to-[#0e6f64]/20 rounded-3xl p-4 flex items-center gap-3 border border-emerald-500/20 mb-6">
                    <div className="w-10 h-10 rounded-full bg-[#a7f3d0] dark:bg-[#0e6f64] flex items-center justify-center text-xl text-[#0e6f64] dark:text-[#a7f3d0]">
                        <i className="ph-bold ph-android-logo"></i>
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-gray-800 dark:text-white">Hola, {user.name}</h2>
                        <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">Configuremos tu mes</p>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="text-sm font-bold text-gray-800 dark:text-white mb-2">1. Tus Ingresos</h3>
                    <p className="text-xs text-gray-500 dark:text-zinc-400 mb-3">¿Cuánto dinero entra este mes?</p>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-emerald-600 dark:text-emerald-400 font-bold text-lg">$</span>
                        <input 
                            type="number" 
                            value={setupIncome}
                            onChange={(e) => setSetupIncome(e.target.value)}
                            className="w-full bg-[#ccfbf0] dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-300 font-bold text-lg rounded-2xl pl-10 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#0e6f64]"
                            placeholder="0.00"
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <div className="flex justify-between items-center mb-1">
                        <h3 className="text-sm font-bold text-gray-800 dark:text-white">2. Gastos Fijos</h3>
                        <span className="text-xs font-bold text-red-500">${totalFixed.toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-zinc-400 mb-3">Añade renta, servicios, suscripciones, etc.</p>
                    
                    <div className="flex gap-2 mb-4">
                        <div className="relative flex-grow">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                <i className="ph-bold ph-note"></i>
                            </span>
                            <input 
                                type="text" 
                                value={fixedExpName}
                                onChange={(e) => setFixedExpName(e.target.value)}
                                className="w-full bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs rounded-xl pl-8 pr-2 py-3 focus:outline-none"
                                placeholder="Ej. Renta"
                            />
                        </div>
                        <div className="relative w-28">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">$</span>
                            <input 
                                type="number" 
                                value={fixedExpAmount}
                                onChange={(e) => setFixedExpAmount(e.target.value)}
                                className="w-full bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs rounded-xl pl-6 pr-2 py-3 focus:outline-none"
                                placeholder="0.00"
                            />
                        </div>
                        <button 
                            type="button"
                            onClick={onAddFixedExpense}
                            className="w-11 h-11 rounded-xl bg-[#0e6f64] hover:bg-[#0c5c53] text-white flex items-center justify-center text-xl shadow-md transition-transform active:scale-90"
                        >
                            <i className="ph-bold ph-plus"></i>
                        </button>
                    </div>

                    <div className="bg-white dark:bg-zinc-800 rounded-2xl p-3 border border-slate-100 dark:border-zinc-700 min-h-[110px] max-h-[160px] overflow-y-auto no-scrollbar">
                        {fixedExpenses.length === 0 ? (
                            <div className="h-20 flex items-center justify-center text-xs text-gray-400 dark:text-zinc-500">
                                No has añadido gastos fijos aún.
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {fixedExpenses.map((exp) => (
                                    <div key={exp.id} className="flex justify-between items-center text-xs bg-slate-50 dark:bg-zinc-900 px-3 py-2 rounded-xl border border-slate-100 dark:border-zinc-700/50">
                                        <span className="font-semibold text-gray-700 dark:text-zinc-300">{exp.name}</span>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-red-500">${exp.amount.toFixed(2)}</span>
                                            <button 
                                                type="button" 
                                                onClick={() => onDeleteFixedExpense(exp.id)}
                                                className="text-gray-400 hover:text-red-500"
                                            >
                                                <i className="ph-bold ph-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="pt-4">
                <button 
                    type="button"
                    onClick={onFinishSetup}
                    className="w-full bg-[#0e6f64] hover:bg-[#0c5c53] text-white py-3.5 rounded-2xl font-semibold text-sm transition-all duration-250 shadow-md text-center flex justify-center items-center gap-2 active:scale-95"
                >
                    Listo, Continuar
                    <i className="ph-bold ph-arrow-right"></i>
                </button>
            </div>
        </div>
    );
}
