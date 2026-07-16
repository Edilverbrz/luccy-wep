function DashboardHome({ income, totalFixed, consumptionPercentage, assistantTip, expenses, setActiveTab, onDeleteExpense }) {
    return (
        <div className="space-y-4 fade-in">
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-zinc-800 rounded-3xl p-4 border border-slate-100 dark:border-zinc-700/50 shadow-sm flex flex-col justify-between h-28">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center text-xl text-[#0d9488]">
                        <i className="ph-bold ph-wallet"></i>
                    </div>
                    <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">INGRESOS</span>
                        <span className="text-base font-extrabold text-slate-800 dark:text-white mt-0.5 block">
                            {formatCurrency(income)} $
                        </span>
                    </div>
                </div>

                <div className="bg-white dark:bg-zinc-800 rounded-3xl p-4 border border-slate-100 dark:border-zinc-700/50 shadow-sm flex flex-col justify-between h-28">
                    <div className="w-9 h-9 rounded-xl bg-rose-100 dark:bg-rose-950/30 flex items-center justify-center text-xl text-rose-500">
                        <i className="ph-bold ph-trend-down"></i>
                    </div>
                    <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">FIJOS</span>
                        <span className="text-base font-extrabold text-slate-800 dark:text-white mt-0.5 block">
                            {formatCurrency(totalFixed)} $
                        </span>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-zinc-800 rounded-2xl p-4 border border-slate-100 dark:border-zinc-700/50 shadow-sm">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-zinc-300 mb-2">
                    <span>Consumo del presupuesto</span>
                    <span className="text-emerald-600 dark:text-emerald-400">{consumptionPercentage}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-zinc-700 h-2.5 rounded-full overflow-hidden">
                    <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                            consumptionPercentage > 85 ? 'bg-red-500' : 
                            consumptionPercentage > 50 ? 'bg-amber-500' : 'bg-[#0e6f64]'
                        }`}
                        style={{ width: `${consumptionPercentage}%` }}
                    ></div>
                </div>
            </div>

            <div className="bg-gradient-to-tr from-teal-50 to-[#ccfbf0] dark:from-zinc-800 dark:to-zinc-800/40 rounded-3xl p-4 border border-teal-200/50 dark:border-zinc-700 shadow-sm flex gap-3 relative overflow-hidden">
                <div className="w-10 h-10 rounded-full bg-[#0e6f64] text-[#ccfbf0] flex items-center justify-center text-lg shrink-0">
                    <i className="ph-fill ph-sparkle"></i>
                </div>
                <div>
                    <p className="text-[11px] font-extrabold text-[#0e6f64] dark:text-[#ccfbf0] uppercase tracking-wide leading-none mb-1">CONSEJO DE LUCCY</p>
                    <p className="text-xs text-slate-700 dark:text-zinc-300 font-medium leading-relaxed">{assistantTip}</p>
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex justify-between items-center px-1">
                    <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest">Últimos Gastos</h3>
                    <button onClick={() => setActiveTab('historial')} className="text-xs font-bold text-[#0e6f64] dark:text-emerald-400">Ver todo</button>
                </div>

                {expenses.length === 0 ? (
                    <div className="bg-white dark:bg-zinc-800/50 rounded-2xl p-6 border border-slate-100 dark:border-zinc-700 text-center text-xs text-gray-400">
                        No has registrado gastos diarios hoy. Presiona el botón verde central para comenzar.
                    </div>
                ) : (
                    <div className="space-y-2">
                        {expenses.slice(0, 3).map((item) => (
                            <div key={item.id} className="bg-white dark:bg-zinc-800 rounded-2xl p-3 border border-slate-100 dark:border-zinc-700/50 shadow-sm flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-zinc-900 flex items-center justify-center text-lg text-slate-600 dark:text-zinc-400">
                                        <i className="ph-bold ph-shopping-bag-open"></i>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-800 dark:text-white">{item.description}</p>
                                        <p className="text-[10px] text-gray-400 mt-0.5">{item.date} • <span className="bg-emerald-50 dark:bg-emerald-950/40 text-[#0d9488] dark:text-emerald-400 px-1.5 py-0.2 rounded-md font-semibold text-[8px] tracking-wide">{item.category}</span></p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-extrabold text-red-500">-${item.amount.toFixed(2)}</span>
                                    <button onClick={() => onDeleteExpense(item.id)} className="text-gray-300 hover:text-red-500 transition-colors p-1 text-sm">
                                        <i className="ph-bold ph-trash-simple"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
