function BottomNav({ activeTab, setActiveTab, onAddExpense }) {
    return (
        <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t border-slate-100 dark:border-zinc-800 px-6 py-3 flex justify-between items-center z-20 shrink-0">
            
            <button 
                onClick={() => setActiveTab('inicio')}
                className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'inicio' ? 'text-[#0e6f64] dark:text-[#a7f3d0]' : 'text-gray-400 hover:text-gray-600'}`}
            >
                <i className="ph-fill ph-house-line text-xl"></i>
                <span className="text-[9px] font-black uppercase tracking-wider">Inicio</span>
            </button>

            <div className="relative -top-5">
                <button 
                    onClick={onAddExpense}
                    className="w-14 h-14 rounded-full bg-[#0e6f64] hover:bg-[#0c5c53] text-white flex items-center justify-center text-2xl shadow-[0_8px_20px_-4px_rgba(14,111,100,0.5)] border-4 border-slate-100 dark:border-zinc-950 transition-transform active:scale-90"
                >
                    <i className="ph-bold ph-plus"></i>
                </button>
            </div>

            <button 
                onClick={() => setActiveTab('luccy_ai')}
                className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'luccy_ai' ? 'text-[#0e6f64] dark:text-[#a7f3d0]' : 'text-gray-400 hover:text-gray-600'}`}
            >
                <i className="ph-bold ph-sparkle text-xl"></i>
                <span className="text-[9px] font-black uppercase tracking-wider">Luccy AI</span>
            </button>

            <button 
                onClick={() => setActiveTab('historial')}
                className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'historial' ? 'text-[#0e6f64] dark:text-[#a7f3d0]' : 'text-gray-400 hover:text-gray-600'}`}
            >
                <i className="ph-fill ph-clock-counter-clockwise text-xl"></i>
                <span className="text-[9px] font-black uppercase tracking-wider">Historial</span>
            </button>

        </div>
    );
}
