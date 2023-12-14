import { useState } from "react"

interface ButtonProps {
	text: string
	type?: "submit" | "reset" | "button"
}

export function Button({ text, type }: ButtonProps) {

	const [counter, setCounter] = useState(0)

	function increment() {
		setCounter(counter + 1)
	}

	return (
		<button
			type={type}
			onClick={increment}
		>
			{counter}
		</button>
	)
}