import { ReactNode } from "react";
import { ButtonVariant } from "../../Button/Button";

export type DropdownDirection = "top left" | "top right" | "bottom left" | "bottom right";
export interface DropdownItem {
	disabled?: boolean;
	content?: ReactNode;
	onClick?: () => void;
	href?: string;
	variant?: ButtonVariant;
  }
