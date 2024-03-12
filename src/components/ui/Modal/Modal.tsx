import { ReactNode } from "react";

import clsx from "clsx";

import { useModal } from "../../../core/hooks/useModal";
import { Overlay } from "../Overlay/Overlay";

import styles from "./Modal.module.scss";

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal = (props: ModalProps) => {
  const { children, isOpen, onClose, className } = props;

  const { close, isClosing } = useModal({
    animationDelay: 300,
    onClose,
    isOpen,
  });

  return (
    <div
      className={clsx(styles.modal, {
        [styles.opened]: isOpen,
        [styles.closed]: isClosing,
      })}
    >
      <Overlay onClick={close} />
      <div className={clsx(styles.content, [className])}>{children}</div>
    </div>
  );
};
