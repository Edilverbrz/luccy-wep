function EditMonthModal({ setupIncome, setSetupIncome, onClose, onSubmit }) {
    return (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-end justify-center transition-all">
            <div className="bg-white dark:bg-zinc-900 rounded-t-[2rem] w-full p-6 slide-up border-t border-slate-200 dark:border-zinc-800">
                <div className="flex justify-between items-center mb-5">
                    <h3 className="text-sm font-bold text-gray-800 dark:text-white">Reconfigurar Mes</h3>
                    <button 
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-slate-500 dark:text-zinc-400"
                    >
                        <i className="ph-bold ph-x"></i>
                    </button>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Presupuesto de Ingresos ($)</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#0e6f64] font-bold">$</span>
                            <input 
                                type="number"
                                value={setupIncome}
                                onChange={(e) => setSetupIncome(e.target.value)}
                                className="w-full bg-[#ccfbf0] dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-300 font-bold text-base rounded-2xl pl-8 pr-4 py-3.5 focus:outline-none"
                                placeholder="0.00"
                                required
                            />
                        </div>
                    </div>

                    <button 
                        type="submit"
                        className="w-full bg-[#0e6f64] text-white py-3.5 rounded-2xl font-bold text-xs shadow-md transition-transform active:scale-95"
                    >
                        Actualizar Ingresos
                    </button>
                </form>
            </div>
        </div>
    );
}
