import { useState, useCallback } from 'react';
import Modal, { ModalProps } from './Modal';

export const MyModal = ({ children, ...rest }: ModalProps) => {
  return <Modal {...rest}>{children}</Modal>;
};

export const useModal = (): UseModalResult => {
  let [visible, setVisible] = useState(false);
  let openModal = useCallback(() => {
    setVisible(true);
  }, [setVisible]);

  let escape = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  let modalProps = {
    visible,
    escape,
    openModal,
  };

  return {
    visible,
    openModal,
    escape,
    modalProps,
    Modal: MyModal,
  };
};

export interface UseModalResult {
  visible: boolean;
  openModal: () => void;
  escape: () => void;
  modalProps: ModalProps;
  Modal: React.FC<ModalProps>;
}
