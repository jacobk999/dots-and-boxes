"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BoardIcon } from "~/components/icons/board";
import { LoginIcon } from "~/components/icons/login";
import { PlusIcon } from "~/components/icons/plus";
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
		<Tabs
			defaultValue="create"
			className="w-[95%] max-w-[700px] translate-x-[-50%] left-1/2 absolute top-1/2 translate-y-[-50%]"
			onValueChange={setTab}
		>
			<TabsList className="w-full">
				<TabsTrigger value="create" className="grow gap-1">
					<PlusIcon filled={tab === "create"} />
					<p>Create</p>
				</TabsTrigger>
				<TabsTrigger value="join" className="grow gap-1">
					<LoginIcon filled={tab === "join"} />
					<p>Join</p>
				</TabsTrigger>
			</TabsList>
			<TabsContent value="create">
				<CreateGameCard />
			</TabsContent>
			<TabsContent value="join">
				<JoinGameCard />
			</TabsContent>
		</Tabs>
	);
}

const SIZE_DEFAULT = 5;

const RoomNameSchema = z.string().min(3).max(16);
const UsernameSchema = z.string().min(3).max(16);
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
						<div className="flex gap-4 items-center">
							<div className="flex flex-col gap-2 grow">
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
							<p>Create Game</p>
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
							<p>Join Game</p>
						</Button>
					</CardFooter>
				</form>
			</Form>
		</Card>
	);
}
