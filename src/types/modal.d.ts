interface modalType {
  setOnModal: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
  dimClick?: boolean;
  isDim?: boolean;
  onClose?: boolean;
  className?: string;
}
