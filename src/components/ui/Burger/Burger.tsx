import clsx from "clsx";
import { useState } from "react";
import styles from './Burger.module.scss'
import { Button } from "../Button/Button";

interface BurgerProps {
	className?: string;
	onClick?: () => void
}

export const Burger = (props: BurgerProps) => {
	const {
		className,
		onClick
	} = props;
	const [isOpen, setIsOpen] = useState<boolean>(false)
	// const isOpen = useSelector(getBurgerIsOpen);

	return (
		<Button 
			className={clsx(styles.burger, [className], {
				[styles.active]: isOpen
			})} 
			onClick={onClick}
		>
			<span></span>
			<span></span>
			<span></span>
		</Button>
	);
};