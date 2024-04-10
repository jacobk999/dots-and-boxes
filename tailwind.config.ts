import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";
import { fontFamily } from "tailwindcss/defaultTheme";

const config = {
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
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				red: {
					DEFAULT: "hsl(var(--red))",
					scenery: "hsl(var(--red-scenery))",
					foreground: "hsl(var(--red-foreground))",
				},
				orange: {
					DEFAULT: "hsl(var(--orange))",
					scenery: "hsl(var(--orange-scenery))",
					foreground: "hsl(var(--orange-foreground))",
				},
				yellow: {
					DEFAULT: "hsl(var(--yellow))",
					scenery: "hsl(var(--yellow-scenery))",
					foreground: "hsl(var(--yellow-foreground))",
				},
				green: {
					DEFAULT: "hsl(var(--green))",
					scenery: "hsl(var(--green-scenery))",
					foreground: "hsl(var(--green-foreground))",
				},
				blue: {
					DEFAULT: "hsl(var(--blue))",
					scenery: "hsl(var(--blue-scenery))",
					foreground: "hsl(var(--blue-foreground))",
				},
				indigo: {
					DEFAULT: "hsl(var(--indigo))",
					scenery: "hsl(var(--indigo-scenery))",
					foreground: "hsl(var(--indigo-foreground))",
				},
				purple: {
					DEFAULT: "hsl(var(--purple))",
					scenery: "hsl(var(--purple-scenery))",
					foreground: "hsl(var(--purple-foreground))",
				},
				pink: {
					DEFAULT: "hsl(var(--pink))",
					scenery: "hsl(var(--pink-scenery))",
					foreground: "hsl(var(--pink-foreground))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
			fontFamily: {
				sans: ["var(--font-sans)", ...fontFamily.sans],
			},
		},
	},
	plugins: [tailwindAnimate],
} satisfies Config;

export default config;
