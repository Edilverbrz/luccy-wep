function LuccyAIChat({ luccyInput, setLuccyInput, luccyMessages, setLuccyMessages, isLuccyTyping, onSend }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 fade-in flex-grow">
            
            <div className="lg:col-span-1 bg-white dark:bg-zinc-900 p-6 rounded-4xl border border-slate-100 dark:border-zinc-800 shadow-sm space-y-4">
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-gray-400">Temas Recomendados</h3>
                <div className="space-y-2">
                    <button 
                        onClick={() => setLuccyInput('¿Cuál es mi saldo actual disponible y mayor gasto fijos?')}
                        className="w-full text-left text-xs p-3 bg-slate-50 dark:bg-zinc-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded-2xl transition-colors text-gray-600 dark:text-zinc-300 font-medium border border-slate-100 dark:border-zinc-700"
                    >
                        📊 Mayor gasto fijo y consumo actual
                    </button>
                    <button 
                        onClick={() => setLuccyInput('¿Me das un consejo para ahorrar este mes?')}
                        className="w-full text-left text-xs p-3 bg-slate-50 dark:bg-zinc-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded-2xl transition-colors text-gray-600 dark:text-zinc-300 font-medium border border-slate-100 dark:border-zinc-700"
                    >
                        💡 Tip para maximizar ahorro hoy
                    </button>
                    <button 
                        onClick={() => setLuccyInput('Explícame la regla 50/30/20 según mi presupuesto')}
                        className="w-full text-left text-xs p-3 bg-slate-50 dark:bg-zinc-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded-2xl transition-colors text-gray-600 dark:text-zinc-300 font-medium border border-slate-100 dark:border-zinc-700"
                    >
                        📐 Aplicación de regla de presupuesto
                    </button>
                    <button 
                        onClick={() => setLuccyInput('¿Cómo funciona la seguridad offline de mis datos?')}
                        className="w-full text-left text-xs p-3 bg-slate-50 dark:bg-zinc-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded-2xl transition-colors text-gray-600 dark:text-zinc-300 font-medium border border-slate-100 dark:border-zinc-700"
                    >
                        🔒 ¿Es seguro el almacenamiento?
                    </button>
                </div>
            </div>

            <div className="lg:col-span-3 bg-white dark:bg-zinc-900 rounded-4xl border border-slate-100 dark:border-zinc-800 shadow-sm flex flex-col h-[600px] overflow-hidden">
                
                <div className="px-6 py-4 border-b border-slate-100 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-sm">
                            🤖
                        </div>
                        <div>
                            <h4 className="text-xs font-bold">Luccy - Analista Offline</h4>
                            <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Listo para responder heurísticamente</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setLuccyMessages([{ sender: 'luccy', text: '¡Conversación reiniciada! ¿Cómo te guío con tus ahorros ahora?', time: 'Ahora' }])}
                        className="text-xs font-bold text-gray-400 hover:text-gray-600 dark:hover:text-white"
                    >
                        Limpiar Chat
                    </button>
                </div>

                <div className="flex-grow overflow-y-auto p-6 space-y-4 no-scrollbar">
                    {luccyMessages.map((msg, idx) => (
                        <div 
                            key={idx} 
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} fade-in`}
                        >
                            <div className={`max-w-lg rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                                msg.sender === 'user' 
                                    ? 'bg-[#0e6f64] text-white rounded-tr-none shadow-sm' 
                                    : 'bg-slate-100 dark:bg-zinc-800 text-gray-800 dark:text-zinc-200 rounded-tl-none border border-slate-100 dark:border-zinc-700/50'
                            }`}>
                                <p>{msg.text}</p>
                                <span className={`block text-[8px] text-right mt-1.5 ${msg.sender === 'user' ? 'text-white/60' : 'text-gray-400'}`}>{msg.time}</span>
                            </div>
                        </div>
                    ))}

                    {isLuccyTyping && (
                        <div className="flex justify-start items-center gap-2 text-xs text-gray-400 dark:text-zinc-500 py-1 italic">
                            <div className="w-2 h-2 rounded-full bg-[#0e6f64] animate-bounce"></div>
                            <div className="w-2 h-2 rounded-full bg-[#0e6f64] animate-bounce delay-100"></div>
                            <div className="w-2 h-2 rounded-full bg-[#0e6f64] animate-bounce delay-200"></div>
                            Luccy está analizando tu presupuesto...
                        </div>
                    )}
                </div>

                <form onSubmit={onSend} className="p-4 border-t border-slate-100 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50 flex gap-2">
                    <input 
                        type="text" 
                        value={luccyInput}
                        onChange={(e) => setLuccyInput(e.target.value)}
                        className="flex-grow px-4 py-3 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl text-xs focus:ring-2 focus:ring-[#0e6f64]"
                        placeholder="Escribe aquí tu consulta financiera (ej. 'dame un consejo de ahorro')"
                    />
                    <button 
                        type="submit"
                        className="bg-[#0e6f64] hover:bg-[#0b544b] text-white px-5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
                    >
                        <i className="ph-bold ph-paper-plane-right"></i>
                    </button>
                </form>
            </div>

        </div>
    );
}
