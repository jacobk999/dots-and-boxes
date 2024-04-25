"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { motion } from "framer-motion";
import { createContext, useContext, useState } from "react";
import type { ComponentProps } from "react";
import { cn } from "~/lib/utils";

const TabContext = createContext<{ selected?: string }>({
	selected: undefined,
});

export function Tabs(props: ComponentProps<typeof TabsPrimitive.Root>) {
	const [selected, setSelected] = useState(props.defaultValue);

	return (
		<TabContext.Provider value={{ selected }}>
			<TabsPrimitive.Root
				{...props}
				value={props.value}
				onValueChange={(value) => {
					setSelected(value);
					props.onValueChange?.(value);
				}}
			/>
		</TabContext.Provider>
	);
}

export function TabsList({
	className,
	...props
}: ComponentProps<typeof TabsPrimitive.List>) {
	return (
		<TabsPrimitive.List
			{...props}
			className={cn(
				"inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground w-full",
				className,
			)}
		/>
	);
}

export function TabsTrigger({
	className,
	children,
	...props
}: ComponentProps<typeof TabsPrimitive.Trigger>) {
	const { selected } = useContext(TabContext);
	const isActive = selected === props.value;

	return (
		<TabsPrimitive.Trigger
			className="relative grow rounded-sm px-3 py-1.5 font-medium text-sm ring-offset-background transition-all disabled:pointer-events-none data-[state=active]:text-foreground disabled:opacity-50 data-[state=active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
			{...props}
		>
			{isActive && (
				<motion.div
					className="absolute inset-0 rounded-sm bg-background"
					layoutId="selectedTab"
					transition={{ type: "spring", bounce: 0.1, duration: 0.6 }}
				/>
			)}
			<div
				className={cn(
					"relative flex items-center justify-center gap-1 whitespace-nowrap",
					className,
				)}
			>
				{children}
			</div>
		</TabsPrimitive.Trigger>
	);
}

export function TabsContent({
	className,
	...props
}: ComponentProps<typeof TabsPrimitive.Content>) {
	return (
		<TabsPrimitive.Content
			{...props}
			className={cn(
				"mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
				className,
			)}
		/>
	);
}
