function DashboardHistory({ expenses, onDeleteExpense, onExportData, onResetApp }) {
    return (
        <div className="space-y-4 fade-in">
            <div className="flex justify-between items-center px-1">
                <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest">Historial Completo</h3>
                <span className="text-[10px] bg-[#ccfbf0] dark:bg-emerald-950/50 text-[#0d9488] dark:text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                    {expenses.length} Transacciones
                </span>
            </div>

            {expenses.length === 0 ? (
                <div className="bg-white dark:bg-zinc-800/50 rounded-2xl p-12 border border-slate-100 dark:border-zinc-700 text-center text-xs text-gray-400">
                    No hay transacciones guardadas. Todos tus gastos agregados se listarán aquí localmente.
                </div>
            ) : (
                <div className="space-y-2">
                    {expenses.map((item) => (
                        <div key={item.id} className="bg-white dark:bg-zinc-800 rounded-2xl p-3 border border-slate-100 dark:border-zinc-700/50 shadow-sm flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-zinc-900 flex items-center justify-center text-lg text-slate-600 dark:text-zinc-400">
                                    <i className="ph-bold ph-tag"></i>
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

            <div className="pt-4 space-y-2">
                <button 
                    onClick={onExportData}
                    className="w-full bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-white py-3 rounded-xl text-xs font-bold transition-all flex justify-center items-center gap-2 border border-slate-200 dark:border-zinc-700"
                >
                    <i className="ph-bold ph-download-simple"></i> Exportar Respaldo Local (JSON)
                </button>

                <button 
                    onClick={onResetApp}
                    className="w-full bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white py-3 rounded-xl text-xs font-bold transition-all flex justify-center items-center gap-2 border border-red-500/20"
                >
                    <i className="ph-bold ph-warning-circle"></i> Restablecer Aplicación
                </button>
            </div>
        </div>
    );
}
