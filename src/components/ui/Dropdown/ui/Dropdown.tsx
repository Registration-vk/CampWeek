"use client"
import { MouseEvent, MouseEventHandler, ReactNode, useEffect, useRef, useState } from 'react';
import styles from './Dropdown.module.scss';
import { DropdownDirection } from '../types/dropdownDirections';
import clsx from 'clsx';
import { mapDirectionClass } from '../consts/consts';
import { Button } from '../../Button/Button';
import Link from 'next/link';
import { useOnClickOutside } from '@/core/hooks/useClickOutside';

export interface DropdownItem {
    disabled?: boolean;
    content?: ReactNode;
    onClick?: () => void;
    href?: string;
}

interface DropdownProps {
    className?: string;
    items: DropdownItem[];
    direction?: DropdownDirection;
    trigger: ReactNode;
	// isOpen: boolean;
	// setIsOpen: (isOpen: boolean) => void;
}

export function Dropdown(props: DropdownProps) {
	const {
		className, 
		trigger, 
		items,
		direction = 'bottom left',
		// isOpen,
		// setIsOpen
	} = props;
	const menuClasses = [mapDirectionClass[direction]];
	const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
	const menuRef = useRef<HTMLDivElement>(null);

	const onHandleDropdown = () => {
		setIsDropdownOpen(prev => !prev);
	}

	const onClose = () => {
		setIsDropdownOpen(false);
	}

	const onCloseWithLogout = (onClick: () => void) => {
		onClick();
		onClose();
	}

	useOnClickOutside(menuRef, onClose)

	return (
		<div className={clsx(styles.dropdown, [className])} ref={menuRef}>
			<Button className={styles.trigger} onClick={onHandleDropdown}>
				{trigger}
			</Button>
			{isDropdownOpen && (
				<div className={clsx(styles.menu, [menuClasses])}>
					{items.map((item, index) => {
						if (item.href) {
							return (
								<Link
									href={item.href}
									key={`dropwdown-key-${index}`}
									className={styles.item}
									onClick={onClose}
								>
									{item.content}
								</Link>
							);
						}

						return (
							<Button
								disabled={item.disabled} 
								key={`dropwdown-key-${index}`}
								className={styles.item}
								onClick={() => onCloseWithLogout(item.onClick!)}
							>
								{item.content}
							</Button>
						);
					})}
			</div>
			)}			
		</div>
	);
}
