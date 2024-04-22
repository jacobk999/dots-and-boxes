"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { SettingsSchema, UsernameSchema } from "~/app/validation";
import { EmojiPicker } from "~/components/emoji-picker";
import { SettingsIcon } from "~/components/icons/settings";
import type { PlayerDto } from "~/components/player";
import { Button } from "~/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
	Modal,
	ModalContent,
	ModalDescription,
	ModalFooter,
	ModalHeader,
	ModalTitle,
	ModalTrigger,
} from "~/components/ui/modal";

export interface SettingsProps {
	player?: PlayerDto;
	mutatePlayer: (player: Partial<PlayerDto>) => void;
}

export function Settings({ player, mutatePlayer }: SettingsProps) {
	const [open, setOpen] = useState(false);

	const form = useForm<z.infer<typeof SettingsSchema>>({
		resolver: zodResolver(SettingsSchema),
		defaultValues: {
			username: player?.username,
			emoji: player?.emoji,
		},
	});

	useEffect(() => {
		if (!player) return;
		form.setValue("username", player.username);
		form.setValue("emoji", player.emoji);
	}, [player, form.setValue]);

	const emoji = form.watch("emoji");

	function onSubmit(data: z.infer<typeof SettingsSchema>) {
		mutatePlayer(data);
		setOpen(false);
	}

	return (
		<Modal open={open} onOpenChange={setOpen}>
			<ModalTrigger asChild>
				<Button variant="secondary" size="icon" className="group">
					<SettingsIcon className="group-hover:animate-spin" />
					<span className="sr-only">Settings</span>
				</Button>
			</ModalTrigger>
			<ModalContent>
				<ModalHeader>
					<ModalTitle>Settings</ModalTitle>
					<ModalDescription>
						Configure your room and game settings.
					</ModalDescription>
				</ModalHeader>
				<Form {...form}>
					<form
						className="my-2 flex flex-col items-center gap-8"
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Profile</FormLabel>
									<div className="flex gap-2">
										<FormControl>
											<Input
												{...field}
												type="text"
												min={UsernameSchema.minLength!}
												max={UsernameSchema.maxLength!}
											/>
										</FormControl>
										<EmojiPicker
											emoji={emoji}
											onEmojiChange={(emoji) => form.setValue("emoji", emoji)}
										/>
									</div>
									<FormDescription>
										Your public display name ({UsernameSchema.minLength} -{" "}
										{UsernameSchema.maxLength} characters)
									</FormDescription>
								</FormItem>
							)}
						/>
						<ModalFooter>
							<Button className="w-full" type="submit">
								Save Changes
							</Button>
						</ModalFooter>
					</form>
				</Form>
			</ModalContent>
		</Modal>
	);
}
