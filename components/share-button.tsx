import { useEffect, useState } from "react";
import { CheckIcon } from "~/components/icons/check";
import { LinkIcon } from "~/components/icons/link";
import { Button } from "~/components/ui/button";

export interface ShareButtonProps {
	// @default window.location.href
	link?: string;
}

export function ShareButton({ link }: ShareButtonProps) {
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		if (copied) {
			const timeout = setTimeout(() => setCopied(false), 1500);
			return () => clearTimeout(timeout);
		}
	}, [copied]);

	return (
		<Button
			variant="link"
			size="icon"
			onClick={() => {
				navigator.clipboard.writeText(
					link ? `${window.location.origin}${link}` : window.location.href,
				);
				setCopied(true);
			}}
		>
			<div className="relative flex h-[24px] w-[24px] items-center justify-center">
				<CheckIcon
					animate={copied ? "visible" : "hidden"}
					className="absolute"
				/>
				<LinkIcon
					animate={copied ? "hidden" : "visible"}
					className="absolute"
				/>
			</div>
		</Button>
	);
}
