export function LoginIcon({ filled }: { filled: boolean }) {
	return (
		<svg
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Login</title>
			{filled ? (
				<>
					<path
						d="M11.5045 16.6099C11.5881 16.6581 11.6652 16.7192 11.7327 16.7947C11.7362 16.7959 11.7389 16.7988 11.742 16.8022L11.7455 16.8059C12.1134 17.2172 12.0781 17.8486 11.6668 18.2182C10.4298 19.3252 8.79268 20 6.99976 20C3.13439 20 0 16.867 0 12.9997V7.00032C0 3.13303 3.13439 0 6.99976 0C8.79268 0 10.4298 0.674807 11.6668 1.78181C12.0781 2.14974 12.1134 2.78278 11.7455 3.19409L11.7423 3.1973C11.6716 3.27603 11.5913 3.3403 11.5045 3.3901C11.5045 3.3901 11.5013 3.39211 11.4997 3.39332C11.4981 3.39452 11.4949 3.39653 11.4949 3.39653C11.2812 3.56362 10.9342 3.81105 10.4812 4.06973C10.0233 4.33162 9.49795 4.43123 8.971 4.39749C8.91799 4.39428 8.86497 4.39267 8.81195 4.39267C8.24966 4.39267 7.69218 4.57905 7.24396 4.91806C6.08884 5.78245 5.04137 6.79306 4.13206 7.91613C3.65652 8.49936 3.39304 9.24325 3.39304 10C3.39304 10.7567 3.65491 11.4958 4.13206 12.0855C5.04137 13.2069 6.08884 14.2175 7.24717 15.0852C7.69218 15.4209 8.24966 15.6073 8.81195 15.6073C8.86497 15.6073 8.91799 15.6057 8.971 15.6025C9.49795 15.5688 10.0233 15.6684 10.4812 15.9303C10.9342 16.1889 11.2812 16.4364 11.4949 16.6035C11.4949 16.6035 11.4981 16.6055 11.4997 16.6067C11.5013 16.6079 11.5045 16.6099 11.5045 16.6099Z"
						className="fill-current"
					/>
					<path
						d="M9.59957 8.99902H18.9995C19.5522 8.99902 20.0004 9.44729 20.0004 9.99999C20.0004 10.5527 19.5522 10.9993 18.9995 10.9993H9.59957C9.62848 11.3303 9.66704 11.6661 9.70881 12.0164C9.7165 12.0841 9.72438 12.1523 9.73233 12.2212C9.75759 12.4401 9.78359 12.6654 9.80681 12.9001C9.84698 13.2953 9.64937 13.6761 9.30235 13.8705C9.19311 13.9315 9.07744 13.9717 8.95855 13.9894C8.91035 13.9974 8.86055 14.0006 8.81235 14.0006C8.60029 14.0006 8.38822 13.9331 8.2115 13.7998C7.15921 13.0109 6.20813 12.0951 5.38075 11.0733C5.12692 10.7599 5 10.3808 5 9.99999C5 9.6192 5.12692 9.23842 5.38075 8.92672C6.20813 7.90487 7.15921 6.98906 8.2115 6.20018C8.38822 6.06682 8.60029 5.99934 8.81235 5.99934C8.86055 5.99934 8.91035 6.00256 8.95855 6.01059C9.07744 6.02826 9.19311 6.06843 9.30235 6.12949C9.64937 6.32389 9.84698 6.70468 9.80681 7.09992C9.78359 7.33456 9.75759 7.55991 9.73233 7.77878C9.72438 7.84767 9.7165 7.91591 9.70881 7.9836C9.66704 8.33385 9.62848 8.66965 9.59957 8.99902Z"
						className="fill-current"
					/>
				</>
			) : (
				<>
					<path
						d="M11.7327 16.7947C11.6652 16.7192 11.5881 16.6581 11.5045 16.6099C11.5013 16.6083 11.4981 16.6051 11.4949 16.6035C11.2812 16.4364 10.9342 16.1889 10.4812 15.9303C10.0233 15.6684 9.49795 15.5688 8.971 15.6025C8.91799 15.6057 8.86497 15.6073 8.81195 15.6073C8.24966 15.6073 7.69219 15.421 7.24717 15.0852C6.08884 14.2175 5.04137 13.2069 4.13206 12.0855C3.65491 11.4958 3.39304 10.7567 3.39304 10C3.39304 9.24325 3.65652 8.49936 4.13206 7.91613C5.04137 6.79306 6.08884 5.78245 7.24396 4.91806C7.69219 4.57905 8.24966 4.39267 8.81195 4.39267C8.86497 4.39267 8.91799 4.39428 8.971 4.39749C9.49795 4.43123 10.0233 4.33162 10.4812 4.06973C10.9342 3.81105 11.2812 3.56362 11.4949 3.39653C11.4981 3.39492 11.5013 3.39171 11.5045 3.3901C11.5913 3.3403 11.6716 3.27603 11.7423 3.1973L11.7455 3.19409C12.1134 2.78278 12.0781 2.14974 11.6668 1.78181C10.4298 0.674807 8.79268 0 6.99976 0C3.13439 0 0 3.13303 0 7.00032V12.9997C0 16.867 3.13439 20 6.99976 20C8.79268 20 10.4298 19.3252 11.6668 18.2182C12.0781 17.8486 12.1134 17.2172 11.7455 16.8059C11.7407 16.8011 11.7375 16.7963 11.7327 16.7947Z"
						className="fill-current"
						fillOpacity="0.5"
					/>
					<path
						d="M18.9995 8.99902H9.59957C9.62848 8.66965 9.66704 8.33386 9.70881 7.9836C9.74094 7.70082 9.77629 7.40841 9.80681 7.09992C9.84698 6.70468 9.64937 6.32389 9.30235 6.12949C9.19311 6.06843 9.07744 6.02826 8.95855 6.01059C8.91035 6.00256 8.86055 5.99934 8.81235 5.99934C8.60029 5.99934 8.38822 6.06682 8.2115 6.20018C7.15921 6.98906 6.20813 7.90487 5.38075 8.92672C5.12692 9.23842 5 9.6192 5 9.99999C5 10.3808 5.12692 10.7599 5.38075 11.0733C6.20813 12.0951 7.15921 13.0109 8.2115 13.7998C8.38822 13.9331 8.60029 14.0006 8.81235 14.0006C8.86055 14.0006 8.91035 13.9974 8.95855 13.9894C9.07744 13.9717 9.19311 13.9315 9.30235 13.8705C9.64937 13.6761 9.84698 13.2953 9.80681 12.9001C9.77629 12.5916 9.74094 12.2992 9.70881 12.0164C9.66704 11.6661 9.62848 11.3303 9.59957 10.9993H18.9995C19.5522 10.9993 20.0004 10.5527 20.0004 9.99999C20.0004 9.44729 19.5522 8.99902 18.9995 8.99902Z"
						className="fill-current"
					/>
				</>
			)}
		</svg>
	);
}
