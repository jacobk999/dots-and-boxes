"use client";

import type * as React from "react";
import { useMediaQuery } from "~/lib/use-media-query";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
} from "./dialog";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerPortal,
	DrawerTitle,
	DrawerTrigger,
} from "./drawer";

const useIsDesktop = () => useMediaQuery("(min-width: 768px)");

export function Modal(props: React.ComponentProps<typeof Dialog>) {
	const isDesktop = useIsDesktop();

	if (isDesktop) return <Dialog {...props} />;

	return <Drawer {...props} />;
}

export function ModalHeader(props: React.ComponentProps<typeof DialogHeader>) {
	const isDesktop = useIsDesktop();

	if (isDesktop) return <DialogHeader {...props} />;
	return <DrawerHeader {...props} />;
}

export function ModalTrigger(
	props: React.ComponentProps<typeof DialogTrigger>,
) {
	const isDesktop = useIsDesktop();

	if (isDesktop) return <DialogTrigger {...props} />;
	return <DrawerTrigger {...props} />;
}

export function ModalDescription(
	props: React.ComponentProps<typeof DialogDescription>,
) {
	const isDesktop = useIsDesktop();

	if (isDesktop) return <DialogDescription {...props} />;
	return <DrawerDescription {...props} />;
}

export function ModalPortal({ children }: { children: React.ReactNode }) {
	const isDesktop = useIsDesktop();

	if (isDesktop) return <DialogPortal>{children}</DialogPortal>;

	return <DrawerPortal>{children}</DrawerPortal>;
}

export function ModalContent(
	props: React.ComponentProps<typeof DialogContent> &
		React.ComponentProps<typeof DrawerContent>,
) {
	const isDesktop = useIsDesktop();

	if (isDesktop) return <DialogContent {...props} />;

	return <DrawerContent {...props} />;
}

export function ModalClose(props: React.ComponentProps<typeof DialogClose>) {
	const isDesktop = useIsDesktop();

	if (isDesktop) return <DialogClose {...props} />;
	return <DrawerClose {...props} />;
}

export const ModalFooter = (
	props: React.ComponentProps<typeof DialogFooter>,
) => {
	const isDesktop = useIsDesktop();

	if (isDesktop) return <DialogFooter {...props} />;
	return <DrawerFooter {...props} />;
};

export function ModalTitle(props: React.ComponentProps<typeof DrawerTitle>) {
	const isDesktop = useIsDesktop();

	if (isDesktop) return <DialogTitle {...props} />;
	return <DrawerTitle {...props} />;
}
