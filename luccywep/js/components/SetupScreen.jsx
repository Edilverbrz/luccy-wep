function SetupScreen({ user, setupIncome, setSetupIncome, fixedExpName, setFixedExpName, fixedExpAmount, setFixedExpAmount, fixedExpenses, totalFixed, onAddFixedExpense, onDeleteFixedExpense, onFinishSetup }) {
    return (
        <div className="flex-grow flex items-center justify-center py-10 fade-in">
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-2xl border border-slate-100 dark:border-zinc-800 max-w-2xl w-full">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-[#0e6f64] dark:text-[#5eead0]">Configura tu Mes Financiero</h2>
                    <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">
                        Para que Luccy pueda ayudarte a ahorrar, necesitamos estimar tus ingresos mensuales y tus gastos obligatorios fijos.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold mb-1 text-gray-500 dark:text-zinc-400">Tus Ingresos Mensuales ($)</label>
                            <input 
                                type="number" 
                                value={setupIncome}
                                onChange={(e) => setSetupIncome(e.target.value)}
                                className="w-full px-4 py-3 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl text-lg font-bold focus:ring-2 focus:ring-[#0e6f64]"
                                placeholder="Monto total, ej. 220"
                            />
                        </div>

                        <div className="bg-emerald-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-emerald-100 dark:border-zinc-800">
                            <h3 className="text-xs font-bold text-[#0e6f64] dark:text-[#5eead0] mb-2">¿Cómo funciona Luccy?</h3>
                            <ul className="text-[11px] space-y-1.5 text-gray-600 dark:text-zinc-300">
                                <li>✨ <strong>Presupuesto Libre:</strong> Es tu ingreso mensual menos tus gastos fijos obligatorios.</li>
                                <li>💵 <strong>Gastos Diarios:</strong> Se restan en tiempo real de tu presupuesto libre.</li>
                                <li>📈 <strong>Meta de Ahorro:</strong> Es el remanente libre que evitas gastar.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-gray-600 dark:text-zinc-300">Registrar Gasto Fijo Obligatorio (Alquiler, Servicios, Streaming...)</h3>
                        <div className="flex gap-2">
                            <input 
                                type="text" 
                                placeholder="Ej. Renta" 
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
                            />
                            <button 
                                onClick={onAddFixedExpense}
                                type="button"
                                className="bg-[#0e6f64] hover:bg-[#0b544b] text-white px-3 rounded-xl text-xs font-bold"
                            >
                                Añadir
                            </button>
                        </div>

                        <div className="bg-slate-50 dark:bg-zinc-800 rounded-2xl p-4 max-h-[160px] overflow-y-auto no-scrollbar border border-slate-100 dark:border-zinc-700">
                            <h4 className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-wider mb-2">Gastos Fijos Registrados ({fixedExpenses.length})</h4>
                            {fixedExpenses.length === 0 ? (
                                <p className="text-xs text-gray-400 dark:text-zinc-500 italic">No has agregado gastos fijos todavía.</p>
                            ) : (
                                <div className="space-y-2">
                                    {fixedExpenses.map(item => (
                                        <div key={item.id} className="flex justify-between items-center text-xs py-1 border-b border-slate-100 dark:border-zinc-700/50">
                                            <span className="font-semibold">{item.name}</span>
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-red-500">-${item.amount.toFixed(2)}</span>
                                                <button onClick={() => onDeleteFixedExpense(item.id)} className="text-red-500 hover:text-red-700">
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

                <div className="border-t border-slate-100 dark:border-zinc-800 mt-8 pt-6 flex justify-between items-center">
                    <div className="text-left">
                        <p className="text-xs text-gray-400 dark:text-zinc-500">Total Gastos Fijos:</p>
                        <p className="text-lg font-bold text-red-500">${totalFixed.toFixed(2)}</p>
                    </div>
                    <button 
                        onClick={onFinishSetup}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl text-sm font-bold shadow-md transition-colors"
                    >
                        Guardar y Continuar
                    </button>
                </div>
            </div>
        </div>
    );
}
