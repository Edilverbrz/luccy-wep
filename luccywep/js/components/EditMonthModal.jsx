function EditMonthModal({ 
    setupIncome, 
    setSetupIncome, 
    fixedExpenses, 
    fixedExpName, 
    setFixedExpName, 
    fixedExpAmount, 
    setFixedExpAmount,
    onAddFixedExpense,
    onDeleteFixedExpense,
    onClose, 
    onSubmit 
}) {
    return (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 fade-in">
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-2xl border border-slate-100 dark:border-zinc-800 w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-base font-bold text-[#0e6f64] dark:text-[#5eead0]">Configurar Mes</h3>
                    <button 
                        onClick={onClose}
                        className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800"
                    >
                        <i className="ph-bold ph-x text-lg"></i>
                    </button>
                </div>

                <form onSubmit={onSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold mb-1 text-gray-500 dark:text-zinc-400">Ingresos Mensuales ($)</label>
                        <input 
                            type="number" 
                            value={setupIncome}
                            onChange={(e) => setSetupIncome(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl text-lg font-bold text-emerald-600 focus:ring-2 focus:ring-[#0e6f64]"
                            required
                        />
                    </div>

                    <div className="border-t border-slate-100 dark:border-zinc-800 pt-6">
                        <h4 className="text-xs font-bold text-gray-600 dark:text-zinc-300 mb-4">Gastos Fijos Obligatorios</h4>
                        
                        <div className="flex gap-2 mb-4">
                            <input 
                                type="text" 
                                placeholder="Ej. Renta, Streaming, Gimnasio..." 
                                value={fixedExpName}
                                onChange={(e) => setFixedExpName(e.target.value)}
                                className="flex-grow px-3 py-2 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl text-xs"
                            />
                            <input 
                                type="number" 
                                placeholder="Monto" 
                                value={fixedExpAmount}
                                onChange={(e) => setFixedExpAmount(e.target.value)}
                                className="w-24 px-3 py-2 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl text-xs font-bold"
                                step="0.01"
                            />
                            <button 
                                type="button"
                                onClick={onAddFixedExpense}
                                className="bg-[#0e6f64] hover:bg-[#0b544b] text-white px-3 rounded-xl text-xs font-bold"
                            >
                                Añadir
                            </button>
                        </div>

                        <div className="bg-slate-50 dark:bg-zinc-800 rounded-2xl p-4 max-h-[200px] overflow-y-auto no-scrollbar border border-slate-100 dark:border-zinc-700">
                            <p className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-wider mb-3">
                                Gastos Fijos Registrados ({fixedExpenses.length})
                            </p>
                            {fixedExpenses.length === 0 ? (
                                <p className="text-xs text-gray-400 dark:text-zinc-500 italic text-center py-4">
                                    No hay gastos fijos registrados para este mes.
                                </p>
                            ) : (
                                <div className="space-y-2">
                                    {fixedExpenses.map(item => (
                                        <div key={item.id} className="flex justify-between items-center text-xs py-2 border-b border-slate-100 dark:border-zinc-700/50 last:border-0">
                                            <span className="font-semibold">{item.name}</span>
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-red-500">-${item.amount.toFixed(2)}</span>
                                                <button 
                                                    type="button"
                                                    onClick={() => onDeleteFixedExpense(item.id)}
                                                    className="text-red-500 hover:text-red-700 p-1"
                                                >
                                                    <i className="ph-bold ph-trash text-xs"></i>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-zinc-800">
                        <button 
                            onClick={onClose}
                            type="button"
                            className="flex-1 py-3 border border-slate-200 dark:border-zinc-700 text-xs font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit"
                            className="flex-1 py-3 bg-[#0e6f64] hover:bg-[#0b544b] text-white text-xs font-bold rounded-xl shadow-md transition-colors"
                        >
                            Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}