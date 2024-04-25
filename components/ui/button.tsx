import type { ComponentProps } from "react";
import { cn } from "~/lib/utils";

const ButtonVariant = {
	default: "bg-primary text-primary-foreground hover:bg-primary/90",
	destructive:
		"bg-destructive text-destructive-foreground hover:bg-destructive/90",
	outline:
		"border border-input bg-background hover:bg-accent hover:text-accent-foreground",
	secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
	accent: "bg-accent text-accent-foreground hover:bg-accent/80",
	ghost: "hover:bg-accent/50 hover:text-accent-foreground",
	link: "text-primary underline-offset-4 border border-primary hover:underline hover:bg-accent/50",
} as const;

const ButtonSize = {
	default: "h-10 px-4 py-2",
	sm: "h-9 px-3",
	lg: "h-11 px-8",
	icon: "h-10 w-10",
} as const;

export interface ButtonProps extends ComponentProps<"button"> {
	variant?: keyof typeof ButtonVariant;
	size?: keyof typeof ButtonSize;
}

export function Button({
	className,
	variant = "default",
	size = "default",
	...props
}: ButtonProps) {
	return (
		<button
			className={cn(
				"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
				ButtonVariant[variant],
				ButtonSize[size],
				className,
			)}
			{...props}
		/>
	);
}
