import { DropdownDirection } from "../types/dropdownDirections";
import styles from "../ui/Dropdown.module.scss";

export const mapDirectionClass: Record<DropdownDirection, string> = {
  "bottom left": styles.optionsBottomLeft,
  "bottom right": styles.optionsBottomRight,
  "top right": styles.optionsTopRight,
  "top left": styles.optionsTopLeft,
};
