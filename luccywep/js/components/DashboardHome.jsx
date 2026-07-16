function DashboardHome({ income, totalFixed, freeBudget, totalSpent, availableToSpend, consumptionPercentage, assistantTip, expenses, setActiveTab }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 fade-in">
            
            <div className="lg:col-span-2 space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-xs font-bold text-gray-400 dark:text-zinc-500">INGRESOS NETOS</span>
                            <span className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-[#0e6f64] dark:text-emerald-300"><i className="ph-bold ph-trend-up"></i></span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">${income.toFixed(2)}</h3>
                            <p className="text-[10px] text-gray-400 dark:text-zinc-500 mt-1">Configurado para este mes</p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-xs font-bold text-gray-400 dark:text-zinc-500">GASTOS FIJOS</span>
                            <span className="w-8 h-8 rounded-full bg-red-50 dark:bg-red-950 flex items-center justify-center text-red-600 dark:text-red-300"><i className="ph-bold ph-lock"></i></span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-extrabold text-red-500">${totalFixed.toFixed(2)}</h3>
                            <p className="text-[10px] text-gray-400 dark:text-zinc-500 mt-1">Apartados del saldo general</p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-xs font-bold text-gray-400 dark:text-zinc-500">DISPONIBLE LIBRE</span>
                            <span className="w-8 h-8 rounded-full bg-amber-50 dark:bg-amber-950 flex items-center justify-center text-amber-600 dark:text-amber-300"><i className="ph-bold ph-piggy-bank"></i></span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-extrabold text-amber-500">${freeBudget.toFixed(2)}</h3>
                            <p className="text-[10px] text-gray-400 dark:text-zinc-500 mt-1">Máximo de gasto diario libre</p>
                        </div>
                    </div>

                </div>

                <div className="bg-white dark:bg-zinc-900 p-6 rounded-4xl border border-slate-100 dark:border-zinc-800 shadow-sm">
                    <div className="flex justify-between items-end mb-4">
                        <div>
                            <h4 className="text-sm font-bold">Consumo de Presupuesto Diario</h4>
                            <p className="text-xs text-gray-400 dark:text-zinc-500">Gasto cotidiano vs Presupuesto libre disponible</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xl font-extrabold text-[#0e6f64] dark:text-[#5eead0]">${totalSpent.toFixed(2)} / ${freeBudget.toFixed(2)}</p>
                            <p className="text-xs font-bold text-[#0e6f64] dark:text-emerald-400">{consumptionPercentage}% gastado</p>
                        </div>
                    </div>

                    <div className="w-full bg-slate-100 dark:bg-zinc-800 h-4 rounded-full overflow-hidden">
                        <div 
                            className={`h-full rounded-full transition-all duration-500 ${
                                consumptionPercentage > 85 ? 'bg-red-500' :
                                consumptionPercentage > 50 ? 'bg-amber-500' : 'bg-[#0e6f64]'
                            }`}
                            style={{ width: `${consumptionPercentage}%` }}
                        ></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-100 dark:border-zinc-800">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-zinc-800 flex items-center justify-center text-emerald-600 dark:text-emerald-300 text-lg">
                                <i className="ph-bold ph-shield-check"></i>
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400 dark:text-zinc-500 font-bold">SALDO REMANENTE (AHORRO PROYECTADO)</p>
                                <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">${availableToSpend.toFixed(2)}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-zinc-800 flex items-center justify-center text-rose-600 dark:text-rose-300 text-lg">
                                <i className="ph-bold ph-chart-line-down"></i>
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400 dark:text-zinc-500 font-bold">PROMEDIO DIARIO CONSUMIDO</p>
                                <p className="text-lg font-bold text-rose-500">${expenses.length > 0 ? (totalSpent / 30).toFixed(2) : '0.00'}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="space-y-6">
                
                <div className="bg-gradient-to-br from-[#0e6f64] to-[#134e4a] text-white p-6 rounded-4xl shadow-md border-0 relative overflow-hidden">
                    <div className="absolute right-[-10px] top-[-10px] text-9xl text-white/5 pointer-events-none">🤖</div>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="bg-white/20 text-white border border-white/20 px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider">
                            LUCCY FINANZAS AI
                        </span>
                    </div>
                    <p className="text-sm leading-relaxed font-medium">
                        "{assistantTip}"
                    </p>
                    <div className="mt-6 flex justify-between items-center">
                        <span className="text-[10px] text-emerald-200">Asistente Offline de Ahorro</span>
                        <button 
                            onClick={() => setActiveTab('luccy_ai')}
                            className="text-xs bg-white text-[#0e6f64] px-4 py-2 rounded-xl font-bold hover:bg-emerald-50 transition-colors shadow-sm flex items-center gap-1"
                        >
                            Hablar con Luccy
                            <i className="ph-bold ph-arrow-right"></i>
                        </button>
                    </div>
                </div>

                <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-xs font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-wider">ÚLTIMOS GASTOS REGISTRADOS</h4>
                        <button onClick={() => setActiveTab('historial')} className="text-xs text-[#0e6f64] dark:text-emerald-400 font-bold hover:underline">Ver Todos</button>
                    </div>

                    {expenses.length === 0 ? (
                        <p className="text-xs text-gray-400 dark:text-zinc-500 italic text-center py-6">No has registrado gastos en este mes todavía.</p>
                    ) : (
                        <div className="space-y-3">
                            {expenses.slice(0, 3).map(item => (
                                <div key={item.id} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-zinc-800 rounded-2xl">
                                    <div className="flex items-center gap-3">
                                        <span className="w-8 h-8 rounded-full bg-rose-50 dark:bg-rose-950/50 flex items-center justify-center text-rose-500 text-xs font-bold">G</span>
                                        <div>
                                            <p className="text-xs font-bold">{item.description}</p>
                                            <span className="text-[10px] text-gray-400 dark:text-zinc-500">{item.category} • {item.date}</span>
                                        </div>
                                    </div>
                                    <span className="text-xs font-extrabold text-red-500">-${item.amount.toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>

        </div>
    );
}
