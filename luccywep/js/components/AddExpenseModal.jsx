function AddExpenseModal({ expenseAmount, setExpenseAmount, expenseDesc, setExpenseDesc, expenseCategory, setExpenseCategory, onClose, onSave }) {
    return (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 fade-in">
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-2xl border border-slate-100 dark:border-zinc-800 w-full max-w-md">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-base font-bold text-[#0e6f64] dark:text-[#5eead0]">Registrar Nuevo Gasto Diario</h3>
                    <button 
                        onClick={onClose}
                        className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800"
                    >
                        <i className="ph-bold ph-x text-lg"></i>
                    </button>
                </div>

                <form onSubmit={onSave} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold mb-1 text-gray-500 dark:text-zinc-400">Monto del Gasto ($)</label>
                        <input 
                            type="number" 
                            value={expenseAmount}
                            onChange={(e) => setExpenseAmount(e.target.value)}
                            placeholder="0.00"
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl text-lg font-bold text-red-500 focus:ring-2 focus:ring-[#0e6f64]"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold mb-1 text-gray-500 dark:text-zinc-400">Descripción / Concepto</label>
                        <input 
                            type="text" 
                            value={expenseDesc}
                            onChange={(e) => setExpenseDesc(e.target.value)}
                            placeholder="Ej. Café con pan de bono"
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl text-xs focus:ring-2 focus:ring-[#0e6f64]"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold mb-1 text-gray-500 dark:text-zinc-400">Categoría del Gasto</label>
                        <select 
                            value={expenseCategory}
                            onChange={(e) => setExpenseCategory(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl text-xs focus:ring-2 focus:ring-[#0e6f64]"
                        >
                            {EXPENSE_CATEGORIES.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
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
                            Guardar Transacción
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
