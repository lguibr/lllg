import styled from "styled-components";
import { PropsWithChildren, FC } from "react";

export interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({
  isOpen,
  onRequestClose,
  children,
}) => {
  return (
    <>
      <Overlay show={isOpen} onClick={onRequestClose} />
      <ModalWrapper show={isOpen}>
        <CloseButton onClick={onRequestClose}>&times;</CloseButton>
        {children}
      </ModalWrapper>
    </>
  );
};

export default Modal;

interface ModalStyledProps {
  show: boolean;
}

export const Overlay = styled.div<ModalStyledProps>`
  display: ${({ show }) => (show ? "block" : "none")};
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: ${({ theme }) => theme.zIndices.modal};
`;

export const ModalWrapper = styled.div<ModalStyledProps>`
  display: ${({ show }) => (show ? "flex" : "none")};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: ${({ theme }) => theme.zIndices.modal};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  width: 80%;
  max-width: 500px;
  max-height: 90vh;
  border-radius: ${({ theme }) => theme.radii.large};
  overflow: auto;
  padding: ${({ theme }) => theme.space.lg};
  box-sizing: border-box;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.space.md};
  right: ${({ theme }) => theme.space.md};
  background-color: transparent;
  border: none;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
`;
