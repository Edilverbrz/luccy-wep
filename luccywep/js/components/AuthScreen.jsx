function AuthScreen({ user, authTab, setAuthTab, authEmail, setAuthEmail, authPassword, setAuthPassword, authName, setAuthName, onAuthSubmit }) {
    return (
        <div className="flex-grow flex items-center justify-center py-10 fade-in">
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-2xl border border-slate-100 dark:border-zinc-800 max-w-md w-full transition-transform">
                <div className="text-center flex flex-col items-center mb-8">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-3xl mb-3 shadow-sm">
                        🤖
                    </div>
                    <h2 className="text-2xl font-bold text-[#0e6f64] dark:text-[#5eead0]">Comienza a Ahorrar</h2>
                    <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">
                        Tus datos no viajan a ningún servidor. Todo se almacena localmente de forma ultra-segura.
                    </p>
                </div>

                <div className="flex bg-slate-100 dark:bg-zinc-800 rounded-2xl p-1.5 mb-6">
                    <button 
                        onClick={() => setAuthTab('login')}
                        className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${authTab === 'login' ? 'bg-white dark:bg-zinc-700 text-[#0e6f64] dark:text-emerald-300 shadow-sm' : 'text-gray-500 dark:text-zinc-400'}`}
                    >
                        Iniciar Sesión
                    </button>
                    <button 
                        onClick={() => setAuthTab('register')}
                        className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${authTab === 'register' ? 'bg-white dark:bg-zinc-700 text-[#0e6f64] dark:text-emerald-300 shadow-sm' : 'text-gray-500 dark:text-zinc-400'}`}
                    >
                        Registrarse (Offline)
                    </button>
                </div>

                <form onSubmit={onAuthSubmit} className="space-y-4">
                    {authTab === 'register' && (
                        <div>
                            <label className="block text-xs font-semibold mb-1 text-gray-500 dark:text-zinc-400">Nombre de Usuario</label>
                            <input 
                                type="text" 
                                value={authName}
                                onChange={(e) => setAuthName(e.target.value)}
                                className="w-full px-4 py-3 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl text-sm focus:ring-2 focus:ring-[#0e6f64]"
                                placeholder="Tu nombre o apodo"
                            />
                        </div>
                    )}
                    <div>
                        <label className="block text-xs font-semibold mb-1 text-gray-500 dark:text-zinc-400">Email de Acceso</label>
                        <input 
                            type="email" 
                            value={authEmail}
                            onChange={(e) => setAuthEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl text-sm focus:ring-2 focus:ring-[#0e6f64]"
                            placeholder="tu@correo.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold mb-1 text-gray-500 dark:text-zinc-400">Contraseña Local</label>
                        <input 
                            type="password" 
                            value={authPassword}
                            onChange={(e) => setAuthPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl text-sm focus:ring-2 focus:ring-[#0e6f64]"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button 
                        type="submit"
                        className="w-full bg-[#0e6f64] hover:bg-[#0b544b] text-white py-3 rounded-xl text-sm font-bold shadow-md transition-colors mt-6"
                    >
                        {authTab === 'login' ? 'Acceder al Sistema' : 'Crear Cuenta Offline'}
                    </button>
                </form>
            </div>
        </div>
    );
}
