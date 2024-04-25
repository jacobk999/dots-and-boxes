import type { ComponentProps } from "react";
import { cn } from "~/lib/utils";

export function Card({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"rounded-lg border bg-card text-card-foreground shadow-sm",
				className,
			)}
			{...props}
		/>
	);
}

export function CardHeader({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			className={cn("flex flex-col space-y-1.5 p-6", className)}
			{...props}
		/>
	);
}

export function CardTitle({ className, ...props }: ComponentProps<"h3">) {
	return (
		<h3
			className={cn(
				"font-semibold text-2xl leading-none tracking-tight",
				className,
			)}
			{...props}
		/>
	);
}

export function CardDescription({ className, ...props }: ComponentProps<"p">) {
	return (
		<p className={cn("text-muted-foreground text-sm", className)} {...props} />
	);
}

export function CardContent({ className, ...props }: ComponentProps<"div">) {
	return <div className={cn("p-6 pt-0", className)} {...props} />;
}

export function CardFooter({ className, ...props }: ComponentProps<"div">) {
	return (
		<div className={cn("flex items-center p-6 pt-0", className)} {...props} />
	);
}
