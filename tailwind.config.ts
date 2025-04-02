
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom colors for our Dahej Calculator
				dahej: {
					red: '#D70040',
					gold: '#FFD700',
					orange: '#FF9933',
					blue: '#000080',
					green: '#50C878',
				}
			},
			fontFamily: {
				hindi: ['Hind', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'celebrate': {
					'0%, 100%': {
						transform: 'scale(1)'
					},
					'50%': {
						transform: 'scale(1.1)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'celebrate': 'celebrate 1s ease-in-out infinite'
			},
			backgroundImage: {
				'festive-pattern': "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIj48cGF0aCBkPSJNMzYgMzRjMCAxIDEgMiAyIDJzMi0xIDItMi0xLTItMi0yLTIgMS0yIDJ6bTAtMTJjMCAxIDEgMiAyIDJzMi0xIDItMi0xLTItMi0yLTIgMS0yIDJ6bTEyIDEyYzAgMSAxIDIgMiAyczItMSAyLTItMS0yLTItMi0yIDEtMiAyem0wLTEyYzAgMSAxIDIgMiAyczItMSAyLTItMS0yLTItMi0yIDEtMiAyem0tMjQgMGMwIDEgMSAyIDIgMnMyLTEgMi0yLTEtMi0yLTItMiAxLTIgMnptMCAxMmMwIDEgMSAyIDIgMnMyLTEgMi0yLTEtMi0yLTItMiAxLTIgMnptLTEyIDBjMCAxIDEgMiAyIDJzMi0xIDItMi0xLTItMi0yLTIgMS0yIDJ6bTAtMTJjMCAxIDEgMiAyIDJzMi0xIDItMi0xLTItMi0yLTIgMS0yIDJ6IiBzdHJva2U9IiNGRkQ3MDAiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjIiLz48cGF0aCBkPSJNMzAgMzBjMCAxIDEgMiAyIDJzMi0xIDItMi0xLTItMi0yLTIgMS0yIDJ6IiBmaWxsPSIjRkY5OTMzIiBmaWxsLW9wYWNpdHk9IjAuMSIvPjxwYXRoIGQ9Ik0xMiAzMGMwIDEgMSAyIDIgMnMyLTEgMi0yLTEtMi0yLTItMiAxLTIgMnptMTgtMTJjMCAxIDEgMiAyIDJzMi0xIDItMi0xLTItMi0yLTIgMS0yIDJ6bTE4IDBjMCAxIDEgMiAyIDJzMi0xIDItMi0xLTItMi0yLTIgMS0yIDJ6bS0xOCAyNGMwIDEgMSAyIDIgMnMyLTEgMi0yLTEtMi0yLTItMiAxLTIgMnptMTggMGMwIDEgMSAyIDIgMnMyLTEgMi0yLTEtMi0yLTItMiAxLTIgMnptLTM2LTEyYzAgMSAxIDIgMiAyczItMSAyLTItMS0yLTItMi0yIDEtMiAyem0zNiAwYzAgMSAxIDIgMiAyczItMSAyLTItMS0yLTItMi0yIDEtMiAyek0xMiA2YzAgMSAxIDIgMiAyczItMSAyLTItMS0yLTItMi0yIDEtMiAyem0wIDQ4YzAgMSAxIDIgMiAyczItMSAyLTItMS0yLTItMi0yIDEtMiAyek00OCA2YzAgMSAxIDIgMiAyczItMSAyLTItMS0yLTItMi0yIDEtMiAyem0wIDQ4YzAgMSAxIDIgMiAyczItMSAyLTItMS0yLTItMi0yIDEtMiAyeiIgc3Ryb2tlPSIjRDcwMDQwIiBzdHJva2Utb3BhY2l0eT0iMC4wNSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9nPjwvc3ZnPg==')"
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
