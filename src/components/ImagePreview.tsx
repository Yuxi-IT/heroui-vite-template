import { Modal, useOverlayState } from '@heroui/react';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface ImagePreviewContextType {
  showImage: (src: string) => void;
}

const ImagePreviewContext = createContext<ImagePreviewContextType | null>(null);

export function ImagePreviewProvider({ children }: { children: ReactNode }) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const state = useOverlayState();
  const location = useLocation();

  const showImage = (src: string) => {
    setImageSrc(src);
    state.open();
    window.history.pushState(null, '', location.pathname);
  };

  useEffect(() => {
    const handlePopState = () => {
      if (state.isOpen) {
        state.close();
        window.history.pushState(null, '', location.pathname);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [state.isOpen, state.close, location.pathname]);

  return (
    <ImagePreviewContext.Provider value={{ showImage }}>
      {children}
      <Modal.Backdrop isOpen={state.isOpen} onOpenChange={state.setOpen}>
        <Modal.Container>
          <Modal.Dialog className="max-w-[90vw] max-h-[90vh]">
            <Modal.CloseTrigger />
            <Modal.Body className="p-0">
              {imageSrc && <img src={imageSrc} alt="" className="w-full h-full object-contain rounded-lg" />}
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </ImagePreviewContext.Provider>
  );
}

export function useImagePreview() {
  const context = useContext(ImagePreviewContext);
  if (!context) throw new Error('useImagePreview must be used within ImagePreviewProvider');
  return context;
}
