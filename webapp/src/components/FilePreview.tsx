import { Modal, useOverlayState, Button } from '@heroui/react';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { ArrowDownToSquare, File } from '@gravity-ui/icons';
import { AppBridgeNative } from '../service/native';
import { isAppUA } from '../service/appUA';

interface FileInfo {
  url: string;
  fileName?: string;
  fileSize?: number;
  fileType?: string;
  timestamp?: number;
}

interface FilePreviewContextType {
  showFile: (file: FileInfo) => void;
}

const FilePreviewContext = createContext<FilePreviewContextType | null>(null);

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
};

const formatTime = (ts: number) => {
  const d = new Date(ts);
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

export function FilePreviewProvider({ children }: { children: ReactNode }) {
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const state = useOverlayState();

  const showFile = (file: FileInfo) => {
    setFileInfo(file);
    state.open();
    window.history.pushState({ modal: true }, '');
  };

  const handleDownload = async () => {
    if (!fileInfo) return;
    if (isAppUA() && fileInfo.url.startsWith('blob:')) {
      const response = await fetch(fileInfo.url);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = (reader.result as string).split(',')[1];
        AppBridgeNative.saveFile(base64, fileInfo.fileName);
      };
      reader.readAsDataURL(blob);
    } else {
      const link = document.createElement('a');
      link.href = fileInfo.url;
      link.download = fileInfo.fileName || 'file';
      link.click();
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      if (state.isOpen) state.close();
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [state.isOpen]);

  useEffect(() => {
    if (!state.isOpen && window.history.state?.modal) {
      window.history.back();
    }
  }, [state.isOpen]);

  return (
    <FilePreviewContext.Provider value={{ showFile }}>
      {children}
      <Modal.Backdrop variant="blur" isOpen={state.isOpen} onOpenChange={state.setOpen}>
        <Modal.Container placement="center">
          <Modal.Dialog className="max-w-[85vw] w-80">
            <Modal.Body className="p-6">
              <div className="flex flex-col items-center gap-4">
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl">
                  <File className="w-12 h-12 text-gray-500" />
                </div>
                <div className="text-center w-full">
                  <div className="font-medium text-sm break-all">{fileInfo?.fileName}</div>
                  <div className="text-xs text-gray-400 mt-2">
                    {fileInfo?.fileSize ? formatFileSize(fileInfo.fileSize) : ''}
                    {fileInfo?.fileSize && fileInfo?.timestamp ? ' · ' : ''}
                    {fileInfo?.timestamp ? formatTime(fileInfo.timestamp) : ''}
                  </div>
                </div>
                <Button className="w-full mt-2" onPress={handleDownload}>
                  <ArrowDownToSquare className="w-4 h-4" />
                  下载文件
                </Button>
              </div>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </FilePreviewContext.Provider>
  );
}

export function useFilePreview() {
  const context = useContext(FilePreviewContext);
  if (!context) throw new Error('useFilePreview must be used within FilePreviewProvider');
  return context;
}
