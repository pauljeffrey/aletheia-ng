import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "375px",
      md: "768px",
      lg: "1200px",
    },
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "20px",
          lg: "80px",
        },
      },
      colors: {
        // Premium futuristic color scheme - Green & Blue
        // Emerald/Cyan Greens
        'primary-green': '#00D9A5', // Electric Cyan Green
        'secondary-green': '#10B981', // Emerald Green
        'accent-green': '#00FF88', // Neon Green
        'green-dark': '#059669', // Deep Emerald
        
        // Electric Blues
        'primary-blue': '#00B8FF', // Electric Blue
        'secondary-blue': '#0066FF', // Deep Blue
        'accent-blue': '#3B82F6', // Bright Blue
        'blue-dark': '#1E40AF', // Navy Blue
        'cyan': '#00FFE5', // Neon Cyan
        
        // Dark backgrounds
        'bg-dark': '#0A0E27', // Deep Dark Blue
        'bg-dark-secondary': '#1A1F3A', // Dark Blue Gray
        'bg-card': '#0F1629', // Card Background
        
        // Light backgrounds (for contrast)
        'bg-cream': '#F8FAFC', // Very Light Gray
        'bg-light': '#F1F5F9', // Light Gray
        'bg-white-overlay': 'rgba(255, 255, 255, 0.05)', // White overlay on dark
        
        // Text colors
        'text-dark': '#0F172A', // Almost Black
        'text-medium': '#475569', // Medium Gray
        'text-light': '#94A3B8', // Light Gray
        'text-white': '#FFFFFF', // White
        'text-glow': '#00FFE5', // Cyan Glow
      },
      backgroundImage: {
        'gradient-futuristic': 'linear-gradient(135deg, #00D9A5 0%, #10B981 25%, #00B8FF 50%, #0066FF 75%, #3B82F6 100%)',
        'gradient-hero': 'linear-gradient(135deg, #0A0E27 0%, #1A1F3A 50%, #0F1629 100%)',
        'gradient-card': 'linear-gradient(145deg, rgba(26, 31, 58, 0.8) 0%, rgba(15, 22, 41, 0.9) 100%)',
        'gradient-hover': 'linear-gradient(135deg, #00D9A5 0%, #00B8FF 100%)',
        'gradient-cyber': 'linear-gradient(135deg, #00FFE5 0%, #00D9A5 50%, #00B8FF 100%)',
        'gradient-neon': 'radial-gradient(circle at 50% 50%, rgba(0, 217, 165, 0.15) 0%, rgba(0, 184, 255, 0.15) 50%, transparent 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.6s ease-in',
        'shimmer': 'shimmer 2s linear infinite',
        'rotate-slow': 'rotate 20s linear infinite',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 10px rgba(0, 217, 165, 0.4), 0 0 20px rgba(0, 184, 255, 0.2)' },
          '100%': { boxShadow: '0 0 30px rgba(0, 217, 165, 0.7), 0 0 60px rgba(0, 184, 255, 0.4), 0 0 90px rgba(0, 255, 229, 0.2)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 217, 165, 0.4), 0 0 40px rgba(0, 184, 255, 0.2)',
        'glow-lg': '0 0 40px rgba(0, 217, 165, 0.6), 0 0 80px rgba(0, 184, 255, 0.3)',
        'glow-cyan': '0 0 30px rgba(0, 255, 229, 0.5)',
        'hover': '0 10px 40px rgba(0, 0, 0, 0.3)',
        'neon-green': '0 0 20px rgba(0, 217, 165, 0.5), 0 0 40px rgba(0, 255, 136, 0.3)',
        'neon-blue': '0 0 20px rgba(0, 184, 255, 0.5), 0 0 40px rgba(0, 102, 255, 0.3)',
      },
    },
  },
  plugins: [],
};

export default config;
