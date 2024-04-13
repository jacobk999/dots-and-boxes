"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MonitorIcon } from "~/components/icons/monitor";
import { MoonIcon } from "~/components/icons/moon";
import { SunIcon } from "~/components/icons/sun";
import { Button } from "~/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
} from "~/components/ui/select";

export function ThemeSwitcher() {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<Select value={theme} onValueChange={setTheme}>
			<SelectTrigger asChild>
				<Button
					variant="secondary"
					size="icon"
					type="button"
					name="Theme Switcher"
				>
					{theme === "light" && <SunIcon filled />}
					{theme === "dark" && <MoonIcon filled />}
					{theme === "system" && <MonitorIcon filled />}
					<span className="sr-only">Theme is currently set to {theme}</span>
				</Button>
			</SelectTrigger>
			<SelectContent>
				<div className="flex flex-row gap-2">
					<SelectItem value="light">
						<SunIcon filled={theme === "light"} />
					</SelectItem>
					<SelectItem value="dark">
						<MoonIcon filled={theme === "dark"} />
					</SelectItem>
					<SelectItem value="system">
						<MonitorIcon filled={theme === "system"} />
					</SelectItem>
				</div>
			</SelectContent>
		</Select>
	);
}
