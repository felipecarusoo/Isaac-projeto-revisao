        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#386641', // Verde escuro
                        secondary: '#A7C957', // Verde claro
                        accent: '#F2E8CF', // Bege
                        dark: '#2B4D31', // Verde mais escuro para hover
                        light: '#FFFFFF',
                    },
                    fontFamily: {
                        sans: ['Poppins', 'sans-serif'],
                    },
                    keyframes: {
                        'slide-up': {
                            '0%': { opacity: '0', transform: 'translateY(20px)' },
                            '100%': { opacity: '1', transform: 'translateY(0)' },
                        },
                        'pulse-slow': {
                            '0%, 100%': { opacity: '1', transform: 'scale(1)' },
                            '50%': { opacity: '.9', transform: 'scale(1.02)' },
                        }
                    },
                    animation: {
                        'slide-up': 'slide-up 0.7s ease-out forwards',
                        'pulse-slow': 'pulse-slow 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    }
                }
            }
        }