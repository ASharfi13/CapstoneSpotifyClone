import { useRef, useState, useContext, createContext } from 'react';
import ReactDOM from 'react-dom';
import "./TopModal.css";

const ModalContext = createContext();

export function TopModalProvider({ children }) {
    const modalRef = useRef();
    const [modalContent, setModalContent] = useState(null);
    const [onModalClose, setOnModalClose] = useState(null);

    const closeModal = () => {
        setModalContent(null);

        if (typeof onModalClose === 'function') {
            setOnModalClose(null);
            onModalClose();
        }
    };

    const contextValue = {
        modalRef,
        modalContent,
        setModalContent,
        setOnModalClose,
        closeModal
    };

    return (
        <>
            <ModalContext.Provider value={contextValue}>
                {children}
            </ModalContext.Provider>
            <div ref={modalRef} />
        </>
    )
}

export function TopModal() {
    const { modalRef, modalContent, closeModal } = useContext(ModalContext);

    if (!modalRef || !modalRef?.current || !modalContent) return null;

    return ReactDOM.createPortal(
        <div id='top-modal'>
            <div id='modal-background' onClick={closeModal} />
            <div id='top-modal-content' onClick={closeModal}>
                {modalContent}
            </div>
        </div>,
        modalRef?.current
    )
}

export const useTopModal = () => useContext(ModalContext);
