function AuthScreen({ user, authTab, setAuthTab, authEmail, setAuthEmail, authPassword, setAuthPassword, authName, setAuthName, onAuthSubmit, triggerToast }) {
    return (
        <div className="flex-grow flex flex-col p-6 fade-in justify-between h-full bg-slate-50 dark:bg-zinc-900">
            
            <div className="text-center pt-8 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-100 to-[#a7f3d0] flex items-center justify-center shadow-md mb-4 dark:from-emerald-900 dark:to-[#0e6f64]">
                    <svg className="w-12 h-12 text-[#0e6f64] dark:text-[#a7f3d0]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM12 4C13.657 4 15 5.343 15 7C15 8.657 13.657 10 12 10C10.343 10 9 8.657 9 7C9 5.343 10.343 4 12 4ZM12 20C8.324 20 5.157 17.915 3.585 14.85C4.78 13.167 7.032 12 9.5 12H14.5C16.968 12 19.22 13.167 20.415 14.85C18.843 17.915 15.676 20 12 20Z" fill="currentColor"/>
                    </svg>
                </div>
                <h1 className="text-3xl font-extrabold text-[#0e6f64] dark:text-[#a7f3d0] tracking-tight">Luccy</h1>
                <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">Finanzas inteligentes y seguras</p>
            </div>

            <div className="bg-white dark:bg-zinc-800 rounded-3xl p-6 shadow-lg border border-slate-100 dark:border-zinc-700 my-4">
                
                <div className="flex bg-slate-100 dark:bg-zinc-700 rounded-2xl p-1 mb-6">
                    <button 
                        onClick={() => setAuthTab('login')}
                        className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all duration-200 ${authTab === 'login' ? 'bg-white dark:bg-zinc-600 text-[#0e6f64] dark:text-white shadow-sm' : 'text-gray-500 dark:text-zinc-400'}`}
                    >
                        Iniciar Sesión
                    </button>
                    <button 
                        onClick={() => setAuthTab('register')}
                        className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all duration-200 ${authTab === 'register' ? 'bg-white dark:bg-zinc-600 text-[#0e6f64] dark:text-white shadow-sm' : 'text-gray-500 dark:text-zinc-400'}`}
                    >
                        Registrarse
                    </button>
                </div>

                <form onSubmit={onAuthSubmit} className="space-y-4">
                    {authTab === 'register' && (
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold text-gray-400 dark:text-zinc-400 uppercase tracking-wider block">Tu Nombre</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                    <i className="ph-bold ph-user-circle"></i>
                                </span>
                                <input 
                                    type="text" 
                                    value={authName}
                                    onChange={(e) => setAuthName(e.target.value)}
                                    className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-2xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e6f64] dark:text-white"
                                    placeholder="Ej. Juan Pérez"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <div className="space-y-1">
                        <label className="text-[11px] font-bold text-gray-400 dark:text-zinc-400 uppercase tracking-wider block">Correo Electrónico</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                <i className="ph-bold ph-envelope"></i>
                            </span>
                            <input 
                                type="email" 
                                value={authEmail}
                                onChange={(e) => setAuthEmail(e.target.value)}
                                className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-2xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e6f64] dark:text-white"
                                placeholder="tu@correo.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-[11px] font-bold text-gray-400 dark:text-zinc-400 uppercase tracking-wider block">Contraseña</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                <i className="ph-bold ph-lock-key"></i>
                            </span>
                            <input 
                                type="password" 
                                value={authPassword}
                                onChange={(e) => setAuthPassword(e.target.value)}
                                className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-2xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e6f64] dark:text-white"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button 
                        type="submit"
                        className="w-full bg-[#0e6f64] hover:bg-[#0c5c53] text-white py-3.5 rounded-2xl font-semibold text-sm transition-all duration-250 shadow-md mt-6 flex justify-center items-center gap-2 active:scale-95"
                    >
                        {authTab === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
                        <i className="ph-bold ph-arrow-right"></i>
                    </button>
                </form>
            </div>

            <div className="text-center pb-4">
                <span className="text-[10px] text-gray-400 dark:text-zinc-500 font-medium tracking-wide block">
                    🔐 No se requiere conexión a internet. Datos 100% locales.
                </span>
            </div>
        </div>
    );
}
