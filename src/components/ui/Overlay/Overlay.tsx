/* eslint-disable react/display-name */
import { memo } from 'react';

import cls from './Overlay.module.scss';

interface OverlayProps {
	className?: string;
	onClick?: () => void;
}

export const Overlay = memo((props: OverlayProps) => {
	const {className, onClick} = props;

	return (
		<div 
			className={cls.overlay}
			onClick={onClick}
		>
		
		</div>
	);
});