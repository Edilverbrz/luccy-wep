function DashboardHistory({ expenses, totalSpent, onDeleteExpense }) {
    return (
        <div className="bg-white dark:bg-zinc-900 rounded-4xl p-6 shadow-sm border border-slate-100 dark:border-zinc-800 fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-zinc-800">
                <div>
                    <h3 className="text-lg font-bold">Base de Datos Offline de Gastos</h3>
                    <p className="text-xs text-gray-400 dark:text-zinc-500">Lista completa de todas tus transacciones financieras del mes en curso.</p>
                </div>
                <div className="bg-slate-100 dark:bg-zinc-800 px-4 py-2 rounded-2xl flex items-center gap-3 text-xs font-bold">
                    <span>Gastos totales en el historial:</span>
                    <span className="text-red-500 text-sm font-extrabold">${totalSpent.toFixed(2)}</span>
                </div>
            </div>

            {expenses.length === 0 ? (
                <div className="text-center py-20">
                    <span className="text-5xl">📑</span>
                    <h4 className="text-sm font-bold text-gray-500 dark:text-zinc-400 mt-4">No hay datos que mostrar</h4>
                    <p className="text-xs text-gray-400 dark:text-zinc-500 mt-1">Agrega tu primer gasto para comenzar el tracking del historial.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 dark:border-zinc-800 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                <th className="py-3 px-4">Descripción / Concepto</th>
                                <th className="py-3 px-4">Categoría</th>
                                <th className="py-3 px-4">Fecha</th>
                                <th className="py-3 px-4 text-right">Monto</th>
                                <th className="py-3 px-4 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.map(item => (
                                <tr key={item.id} className="border-b border-slate-50 dark:border-zinc-800/50 hover:bg-slate-50/50 dark:hover:bg-zinc-800/20 text-xs transition-colors">
                                    <td className="py-4 px-4 font-bold">{item.description}</td>
                                    <td className="py-4 px-4">
                                        <span className="bg-slate-100 dark:bg-zinc-800 px-2.5 py-1 rounded-lg font-semibold text-gray-600 dark:text-zinc-300">
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-gray-400 dark:text-zinc-500">{item.date}</td>
                                    <td className="py-4 px-4 text-right font-extrabold text-red-500">-${item.amount.toFixed(2)}</td>
                                    <td className="py-4 px-4 text-center">
                                        <button 
                                            onClick={() => onDeleteExpense(item.id)}
                                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors"
                                            title="Eliminar registro"
                                        >
                                            <i className="ph-bold ph-trash text-sm"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
