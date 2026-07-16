function EditMonthModal({ setupIncome, setSetupIncome, onClose, onSubmit }) {
    return (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 fade-in">
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-2xl border border-slate-100 dark:border-zinc-800 w-full max-w-md">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-base font-bold text-[#0e6f64] dark:text-[#5eead0]">Modificar Presupuesto de Ingresos</h3>
                    <button 
                        onClick={onClose}
                        className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800"
                    >
                        <i className="ph-bold ph-x text-lg"></i>
                    </button>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold mb-1 text-gray-500 dark:text-zinc-400">Ingresos Mensuales Actualizados ($)</label>
                        <input 
                            type="number" 
                            value={setupIncome}
                            onChange={(e) => setSetupIncome(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl text-lg font-bold text-emerald-600 focus:ring-2 focus:ring-[#0e6f64]"
                            required
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
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
                            Actualizar Saldo
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
