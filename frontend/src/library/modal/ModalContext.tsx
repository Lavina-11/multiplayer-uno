// ModalContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import Modal from './Modal';

export type ModalButtonArgs = {
    text: string;
    onClick: () => void;
    type: 'submit' | 'reset' | 'button';
};
type ModalContextType = {
    show: (
        content: ReactNode,
        size: 'small' | 'large',
        buttons?: ModalButtonArgs[]
    ) => void;
    hide: () => void;
};

const ModalContext = createContext<ModalContextType>({
    show: () => {},
    hide: () => {},
});

// eslint-disable-next-line
export const useModal = () => useContext(ModalContext);

interface ModalProviderProps {
    children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
    const [modalContent, setModalContent] = useState<ReactNode>(null);
    const [modalButtons, setModalButtons] = useState<ModalButtonArgs[]>([]);
    const [modalSize, setModalSize] = useState<'small' | 'large'>('small');
    const [isVisible, setIsVisible] = useState(false);

    const show = (
        content: ReactNode,
        size: 'small' | 'large' = 'small',
        buttons: ModalButtonArgs[] = []
    ) => {
        setModalContent(content);
        setModalButtons(buttons);
        setModalSize(size);
        setIsVisible(true);
    };

    const hide = () => {
        setIsVisible(false);
        setModalContent(null);
    };

    return (
        <ModalContext.Provider value={{ show, hide }}>
            {children}
            {isVisible && (
                <Modal
                    content={modalContent}
                    buttons={modalButtons}
                    size={modalSize}
                />
            )}
        </ModalContext.Provider>
    );
};
