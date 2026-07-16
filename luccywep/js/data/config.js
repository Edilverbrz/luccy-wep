const TAILWIND_CONFIG = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                luccy: {
                    50: '#f0fdf9',
                    100: '#ccfbf0',
                    200: '#99f6e0',
                    300: '#5eead0',
                    400: '#2dd4bf',
                    500: '#14b8a6',
                    600: '#0d9488',
                    700: '#0f6f64',
                    800: '#115e56',
                    900: '#134e4a',
                    darkBg: '#121212',
                    darkCard: '#1e1e1e'
                }
            },
            borderRadius: {
                '4xl': '2rem',
            }
        }
    }
};

const EXPENSE_CATEGORIES = ['General', 'Alimentación', 'Transporte', 'Ocio / Entretenimiento', 'Compras', 'Otros'];

const DEFAULT_USER = {
    name: 'ghgh',
    email: 'tu@correo.com',
    isAuthenticated: false,
    isOnboarded: false
};

const DEFAULT_INCOME = 220.00;

const STORAGE_KEYS = {
    USER: 'luccy_user',
    INCOME: 'luccy_income',
    FIXED_EXPENSES: 'luccy_fixed_expenses',
    EXPENSES: 'luccy_expenses',
    THEME: 'luccy_theme'
};
