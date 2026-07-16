function DashboardScreen({ user, income, totalFixed, freeBudget, totalSpent, availableToSpend, consumptionPercentage, assistantTip, expenses, activeTab, setActiveTab, onEditMonth, onThemeToggle, theme, onDeleteExpense, onExportData, onResetApp, onAddExpense, luccyInput, setLuccyInput, luccyMessages, isLuccyTyping, onLuccyChat }) {
    return (
        <div className="flex-grow flex flex-col justify-between h-full relative">
            
            <div className="bg-[#0e6f64] dark:bg-zinc-900 rounded-b-[2.5rem] px-5 pt-4 pb-6 shadow-lg text-white">
                
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-emerald-500/20 text-white border border-emerald-400/30 flex items-center justify-center text-xl">
                            <i className="ph-bold ph-android-logo"></i>
                        </div>
                        <div>
                            <p className="text-[10px] text-white/75 font-medium leading-none mb-1">Hola, {user.name}</p>
                            <h2 className="text-base font-bold leading-none tracking-tight">Tu Resumen</h2>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={onEditMonth}
                            className="bg-white/15 hover:bg-white/20 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide transition-all border border-white/10 active:scale-90"
                        >
                            Editar Mes
                        </button>
                        <button 
                            onClick={onThemeToggle}
                            className="w-9 h-9 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center text-lg shadow-inner focus:outline-none hover:scale-105 active:scale-90 transition-transform"
                            title="Alternar Tema"
                        >
                            {theme === 'light' ? (
                                <i className="ph-fill ph-sun"></i>
                            ) : (
                                <i className="ph-bold ph-moon-stars text-slate-800"></i>
                            )}
                        </button>
                    </div>
                </div>

                <div className="bg-white/10 dark:bg-black/20 rounded-3xl p-5 border border-white/10 shadow-sm relative overflow-hidden">
                    <p className="text-xs text-emerald-100 font-medium">Disponible para gastar</p>
                    <div className="text-3xl font-extrabold tracking-tight mt-1 mb-4 flex items-baseline gap-1">
                        <span>{formatCurrency(availableToSpend)}</span>
                        <span className="text-lg font-medium text-emerald-100">$</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-3">
                        <div>
                            <p className="text-[10px] text-emerald-200">Presupuesto Libre</p>
                            <p className="text-sm font-bold text-white mt-0.5">${formatCurrency(freeBudget)}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] text-emerald-200">Ya Gastado</p>
                            <p className="text-sm font-bold text-emerald-200 mt-0.5">${formatCurrency(totalSpent)}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-5 py-4 flex-1 overflow-y-auto no-scrollbar pb-24">
                
                {activeTab === 'inicio' && (
                    <DashboardHome 
                        income={income} 
                        totalFixed={totalFixed} 
                        consumptionPercentage={consumptionPercentage} 
                        assistantTip={assistantTip} 
                        expenses={expenses} 
                        setActiveTab={setActiveTab} 
                        onDeleteExpense={onDeleteExpense} 
                    />
                )}

                {activeTab === 'historial' && (
                    <DashboardHistory 
                        expenses={expenses} 
                        onDeleteExpense={onDeleteExpense} 
                        onExportData={onExportData} 
                        onResetApp={onResetApp} 
                    />
                )}

                {activeTab === 'luccy_ai' && (
                    <LuccyAIChat 
                        luccyInput={luccyInput}
                        setLuccyInput={setLuccyInput}
                        luccyMessages={luccyMessages}
                        isLuccyTyping={isLuccyTyping}
                        onSend={onLuccyChat}
                    />
                )}

            </div>

            <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} onAddExpense={onAddExpense} />
        </div>
    );
}
