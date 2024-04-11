import { Button } from "~/components/ui/button";
import {
	Popover,
	PopoverClose,
	PopoverContent,
	PopoverTrigger,
} from "~/components/ui/popover";

export interface EmojiPickerProps {
	emoji: string;
	onEmojiChange?: (emoji: string) => void;
}

export function EmojiPicker({ emoji, onEmojiChange }: EmojiPickerProps) {
	return (
		<Popover modal>
			<PopoverTrigger asChild>
				<Button id="avatar" variant="outline" size="icon">
					{emoji}
				</Button>
			</PopoverTrigger>
			<PopoverContent>
				<div className="grid h-[300px] grid-cols-8 overflow-y-auto p-2">
					{emojis.map((emoji, index) => (
						<PopoverClose asChild>
							{/* TODO: add focusing with arrow keys */}
							<Button
								key={`${emoji}-${index}`}
								variant="ghost"
								size="icon"
								className="text-2xl"
								onClick={() => onEmojiChange?.(emoji)}
							>
								{emoji}
							</Button>
						</PopoverClose>
					))}
				</div>
			</PopoverContent>
		</Popover>
	);
}

// A list of emojis that can be used as avatars for players.
export const emojis = [
	"😀",
	"😃",
	"😄",
	"😁",
	"😆",
	"😅",
	"🤣",
	"😂",
	"🙂",
	"😉",
	"😊",
	"😇",
	"🥰",
	"😍",
	"🤩",
	"😘",
	"😗",
	"😚",
	"😙",
	"🥲",
	"😏",
	"😋",
	"😛",
	"😜",
	"🤪",
	"😝",
	"🤗",
	"🤭",
	"🫢",
	"🫣",
	"🤫",
	"🤔",
	"🫡",
	"🤤",
	"🤠",
	"🥳",
	"🥸",
	"😎",
	"🤓",
	"🧐",
	"🙃",
	"🫠",
	"🤐",
	"🤨",
	"😐",
	"😑",
	"😶",
	"🫥",
	"😶‍🌫️",
	"😒",
	"🙄",
	"😬",
	"😮‍💨",
	"🤥",
	"😌",
	"😔",
	"😪",
	"😴",
	"😷",
	"🤒",
	"🤕",
	"🤢",
	"🤮",
	"🤧",
	"🥵",
	"🥶",
	"🥴",
	"😵",
	"😵‍💫",
	"🤯",
	"🥱",
	"😕",
	"🫤",
	"😟",
	"🙁",
	"☹️",
	"😮",
	"😯",
	"😲",
	"😳",
	"🥺",
	"🥹",
	"😦",
	"😧",
	"😨",
	"😰",
	"😥",
	"😢",
	"😭",
	"😱",
	"😖",
	"😣",
	"😞",
	"😓",
	"😩",
	"😫",
	"😤",
	"😡",
	"😠",
	"🤬",
	"👿",
	"😈",
	"👿",
	"💀",
	"☠️",
	"💩",
	"🤡",
	"👹",
	"👺",
	"👻",
	"👽",
	"👾",
	"🤖",
	"😺",
	"😸",
	"😹",
	"😻",
	"😼",
	"😽",
	"🙀",
	"😿",
	"😾",
	"🙈",
	"🙉",
];
