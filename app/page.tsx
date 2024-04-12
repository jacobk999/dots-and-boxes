"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BoardIcon } from "~/components/icons/board";
import { LoginIcon } from "~/components/icons/login";
import { LogoIcon } from "~/components/icons/logo";
import { PlusIcon } from "~/components/icons/plus";
import { ThemeSwitcher } from "~/components/theme-switcher";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export default function Home() {
	const [tab, setTab] = useState("create");

	return (
		<>
			<div className="absolute top-1/2 left-1/2 flex w-[95%] max-w-[700px] translate-x-[-50%] translate-y-[-50%] flex-col items-center gap-6">
				<LogoIcon flat={false} />
				<Tabs defaultValue="create" onValueChange={setTab} className="w-full">
					<TabsList className="w-full">
						<TabsTrigger value="create">
							<PlusIcon filled={tab === "create"} />
							Create
						</TabsTrigger>
						<TabsTrigger value="join">
							<LoginIcon filled={tab === "join"} />
							Join
						</TabsTrigger>
					</TabsList>
					<TabsContent value="create" className="h-[600px]">
						<CreateGameCard />
					</TabsContent>
					<TabsContent value="join" className="h-[600px]">
						<JoinGameCard />
					</TabsContent>
				</Tabs>
			</div>
			<div className="fixed right-4 bottom-4">
				<ThemeSwitcher />
			</div>
		</>
	);
}

const SIZE_DEFAULT = 5;

const RoomNameSchema = z.string().min(3).max(16);
const UsernameSchema = z.string().min(3).max(8);
const SizeSchema = z.coerce.number().min(3).max(11);

const CreateGameSchema = z.object({
	roomName: RoomNameSchema,
	username: UsernameSchema,
	width: SizeSchema,
	height: SizeSchema,
});

function CreateGameCard() {
	const form = useForm<z.infer<typeof CreateGameSchema>>({
		resolver: zodResolver(CreateGameSchema),
		defaultValues: {
			width: SIZE_DEFAULT,
			height: SIZE_DEFAULT,
		},
	});

	const width = Math.max(
		Math.min(form.watch("width"), SizeSchema.maxValue!),
		SizeSchema.minValue!,
	);

	const height = Math.max(
		Math.min(form.watch("height"), SizeSchema.maxValue!),
		SizeSchema.minValue!,
	);

	const router = useRouter();

	async function onSubmit(values: z.infer<typeof CreateGameSchema>) {
		alert(JSON.stringify(values, null, 2));
		router.push("/room");
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Create a New Game</CardTitle>
			</CardHeader>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<CardContent className="flex flex-col gap-2">
						<FormField
							control={form.control}
							name="roomName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Room Name</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormDescription>The room name</FormDescription>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormDescription>
										Your public display name ({UsernameSchema.minLength} -{" "}
										{UsernameSchema.maxLength} characters)
									</FormDescription>
								</FormItem>
							)}
						/>
						<div className="flex items-center gap-4">
							<div className="flex grow flex-col gap-2">
								<FormField
									control={form.control}
									name="width"
									render={({ field }) => (
										<FormItem className="grow">
											<FormLabel>Width</FormLabel>
											<FormControl>
												<Input
													{...field}
													type="number"
													min={SizeSchema.minValue!}
													max={SizeSchema.maxValue!}
												/>
											</FormControl>
											<FormDescription>
												The width of the board ({SizeSchema.minValue} -{" "}
												{SizeSchema.maxValue})
											</FormDescription>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="height"
									render={({ field }) => (
										<FormItem className="grow">
											<FormLabel>Height</FormLabel>
											<FormControl>
												<Input
													{...field}
													type="number"
													min={SizeSchema.minValue!}
													max={SizeSchema.maxValue!}
												/>
											</FormControl>
											<FormDescription>
												The height of the board ({SizeSchema.minValue} -{" "}
												{SizeSchema.maxValue})
											</FormDescription>
										</FormItem>
									)}
								/>
							</div>
							<BoardIcon rows={height} columns={width} />
						</div>
					</CardContent>
					<CardFooter>
						<Button className="w-full gap-2" type="submit">
							<PlusIcon filled />
							Create Game
						</Button>
					</CardFooter>
				</form>
			</Form>
		</Card>
	);
}
const JoinGameSchema = z.object({
	roomName: RoomNameSchema,
	username: UsernameSchema,
});

function JoinGameCard() {
	const form = useForm<z.infer<typeof JoinGameSchema>>({
		resolver: zodResolver(JoinGameSchema),
	});

	const router = useRouter();

	async function onSubmit(values: z.infer<typeof JoinGameSchema>) {
		alert(JSON.stringify(values, null, 2));
		router.push("/room");
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Join an Existing Game</CardTitle>
			</CardHeader>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<CardContent className="space-y-2">
						<FormField
							control={form.control}
							name="roomName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Room Name</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormDescription>The room name</FormDescription>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormDescription>
										Your public display name ({UsernameSchema.minLength} -{" "}
										{UsernameSchema.maxLength} characters)
									</FormDescription>
								</FormItem>
							)}
						/>
					</CardContent>
					<CardFooter>
						<Button className="w-full gap-2" type="submit">
							<LoginIcon filled />
							Join Game
						</Button>
					</CardFooter>
				</form>
			</Form>
		</Card>
	);
}
