function LuccyAIChat({ luccyInput, setLuccyInput, luccyMessages, isLuccyTyping, onSend }) {
    return (
        <div className="flex flex-col h-[420px] fade-in justify-between">
            
            <div className="flex-grow overflow-y-auto no-scrollbar space-y-3 pb-4 pr-1">
                {luccyMessages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs ${
                            msg.sender === 'user' 
                                ? 'bg-[#0e6f64] text-white rounded-tr-none' 
                                : 'bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 border border-slate-100 dark:border-zinc-700/50 rounded-tl-none shadow-sm'
                        }`}>
                            <p className="leading-relaxed">{msg.text}</p>
                            <span className="text-[8px] text-gray-400 mt-1 block text-right">{msg.time}</span>
                        </div>
                    </div>
                ))}
                {isLuccyTyping && (
                    <div className="flex justify-start">
                        <div className="bg-white dark:bg-zinc-800 rounded-2xl px-4 py-3 border border-slate-100 dark:border-zinc-700/50 rounded-tl-none shadow-sm flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '0s' }}></span>
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '0.15s' }}></span>
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-2 shrink-0">
                <button 
                    onClick={() => setLuccyInput('¿Cuál es la regla 50/30/20?')}
                    className="bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-600 dark:text-zinc-300 px-3 py-1.5 rounded-full text-[10px] font-semibold tracking-wide shrink-0 border border-slate-200/50 dark:border-zinc-700"
                >
                    Regla 50/30/20 📊
                </button>
                <button 
                    onClick={() => setLuccyInput('Dame un consejo para ahorrar hoy')}
                    className="bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-600 dark:text-zinc-300 px-3 py-1.5 rounded-full text-[10px] font-semibold tracking-wide shrink-0 border border-slate-200/50 dark:border-zinc-700"
                >
                    Consejo de Hoy 💡
                </button>
                <button 
                    onClick={() => setLuccyInput('¿Cuál es mi mayor gasto?')}
                    className="bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-600 dark:text-zinc-300 px-3 py-1.5 rounded-full text-[10px] font-semibold tracking-wide shrink-0 border border-slate-200/50 dark:border-zinc-700"
                >
                    Analizar Gastos Fijos 🔍
                </button>
            </div>

            <form onSubmit={onSend} className="flex gap-2 shrink-0 pt-2 border-t border-slate-100 dark:border-zinc-800">
                <input 
                    type="text" 
                    value={luccyInput}
                    onChange={(e) => setLuccyInput(e.target.value)}
                    className="flex-grow bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#0e6f64] dark:text-white"
                    placeholder="Pregúntale a Luccy..."
                />
                <button 
                    type="submit"
                    className="w-11 h-11 rounded-xl bg-[#0e6f64] hover:bg-[#0c5c53] text-white flex items-center justify-center text-lg shadow-md transition-transform active:scale-95 shrink-0"
                >
                    <i className="ph-bold ph-paper-plane-right"></i>
                </button>
            </form>
        </div>
    );
}
