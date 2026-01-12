/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                paper: '#FAFAF8',
                ink: '#1A1A1A',
                concrete: '#E2E2E2',
                line: '#D4D2CC',
            },
            fontFamily: {
                // English first, Chinese fallback
                serif: ['var(--font-bodoni)', 'var(--font-noto-serif)', 'serif'],
                sans: ['var(--font-inter)', 'var(--font-noto-sans)', 'sans-serif'],
                mono: ['var(--font-jetbrains)', 'monospace'],
            },
        },
    },
    plugins: [],
}
