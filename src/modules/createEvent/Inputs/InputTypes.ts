import { ModalProps } from 'ScoutDesign/library/Widgets/Modal/Modal';

export interface EventInputProps {
  id: string;
  Modal: React.FC<ModalProps>;
  modalProps: ModalProps;
  questionText: string;
}
