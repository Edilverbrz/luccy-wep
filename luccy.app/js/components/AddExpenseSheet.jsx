function AddExpenseSheet({ expenseAmount, setExpenseAmount, expenseDesc, setExpenseDesc, expenseCategory, setExpenseCategory, onClose, onSave }) {
    return (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-end justify-center transition-all">
            <div className="bg-white dark:bg-zinc-900 rounded-t-[2.5rem] w-full p-6 slide-up border-t border-slate-200 dark:border-zinc-800 shadow-2xl">
                
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-base font-extrabold text-slate-800 dark:text-white">Añadir Gasto</h3>
                    <button 
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-slate-500 dark:text-zinc-400 hover:scale-105 active:scale-90 transition-transform"
                    >
                        <i className="ph-bold ph-x"></i>
                    </button>
                </div>

                <form onSubmit={onSave} className="space-y-5">
                    
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 dark:text-zinc-300">¿Cuánto gastaste?</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-[#0e6f64] font-bold text-lg">$</div>
                            <input 
                                type="number" 
                                step="any"
                                value={expenseAmount}
                                onChange={(e) => setExpenseAmount(e.target.value)}
                                className="w-full bg-[#ccfbf0] dark:bg-emerald-950/40 text-[#0e6f64] dark:text-emerald-300 font-extrabold text-xl rounded-2xl pl-10 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#0e6f64]"
                                placeholder="0.00"
                                required
                                autoFocus
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 dark:text-zinc-300">¿En qué?</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                                <i className="ph-bold ph-equals"></i>
                            </span>
                            <input 
                                type="text" 
                                value={expenseDesc}
                                onChange={(e) => setExpenseDesc(e.target.value)}
                                className="w-full bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl pl-10 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e6f64] dark:text-white"
                                placeholder="Ej. Café, Uber, Cine..."
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 dark:text-zinc-300">Categoría</label>
                        <div className="grid grid-cols-3 gap-2">
                            {EXPENSE_CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setExpenseCategory(cat)}
                                    className={`py-2 text-[10px] font-bold rounded-xl border transition-all ${
                                        expenseCategory === cat 
                                            ? 'bg-[#0e6f64] text-white border-[#0e6f64]' 
                                            : 'bg-slate-50 dark:bg-zinc-800 text-gray-500 border-slate-200 dark:border-zinc-700'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button 
                        type="submit"
                        className="w-full bg-[#0e6f64] hover:bg-[#0c5c53] text-white py-4 rounded-2xl font-semibold text-xs transition-all duration-250 shadow-md flex justify-center items-center gap-2 active:scale-95 mt-4"
                    >
                        Guardar Gasto
                    </button>
                </form>

            </div>
        </div>
    );
}
