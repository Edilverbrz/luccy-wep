function Toast({ toast }) {
    if (!toast) return null;
    
    return (
        <div className={`fixed top-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-2xl transition-all transform fade-in ${
            toast.type === 'error' ? 'bg-red-500 text-white' : 
            toast.type === 'warning' ? 'bg-amber-500 text-white' : 'bg-emerald-600 text-white'
        }`}>
            <i className={`ph-bold ${toast.type === 'error' ? 'ph-x-circle' : toast.type === 'warning' ? 'ph-warning' : 'ph-check-circle'} text-lg`}></i>
            <span className="text-sm font-semibold">{toast.message}</span>
        </div>
    );
}
