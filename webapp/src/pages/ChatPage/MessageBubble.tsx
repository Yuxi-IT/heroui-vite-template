import { Button } from '@heroui/react';
import { File } from '@gravity-ui/icons';
import { useImagePreview } from '../../components/ImagePreview';
import { useFilePreview } from '../../components/FilePreview';
import { Message, formatFileSize, getReplyPreview, getReplyUserName } from './types';

interface MessageBubbleProps {
  msg: Message;
  messages: Message[];
}

export default function MessageBubble({ msg, messages }: MessageBubbleProps) {
  const { showImage } = useImagePreview();
  const { showFile } = useFilePreview();

  const replyMsg = msg.replyToId ? messages.find(m => m.id === msg.replyToId) : null;
  const replyBlock = replyMsg ? (
    <div className="text-xs mb-1 px-2 py-1 rounded bg-black/10 border-l-2 border-gray-400 truncate">
      <span className="font-medium">{getReplyUserName(replyMsg.userId)}</span>: {getReplyPreview(replyMsg)}
    </div>
  ) : null;

  if (msg.type === 'image') {
    return <>{replyBlock}<img src={msg.content} alt="" className="max-h-[140px] rounded-lg object-cover cursor-pointer" onClick={() => showImage(msg.content, 'image')} /></>;
  }
  if (msg.type === 'video') {
    return <>{replyBlock}<video src={msg.content} className="max-h-[140px] rounded-lg cursor-pointer" onClick={() => showImage(msg.content, 'video')} /></>;
  }
  if (msg.type === 'file') {
    return (
      <Button onClick={() => showFile({ url: msg.content, fileName: msg.fileName, fileSize: msg.fileSize, fileType: msg.fileType, timestamp: msg.timestamp })} className="cursor-pointer min-h-[100px] h-auto">
        <div className='text-left flex items-center gap-3'>
          <div className='bg-white/20 p-2 rounded-lg'>
            <File className='mx-auto w-8 h-8'/>
            <div className="text-xs text-white">{msg.fileName?.split('.')?.pop()?.toUpperCase()}文件</div>
          </div>
          <div className="flex-1">
            <div className="font-medium text-sm truncate text-pretty">{msg.fileName?.length ? msg.fileName.length > 14 ? msg.fileName.substring(0, 14) + '...' : msg.fileName : msg.fileName}</div>
            <div className="text-xs text-gray-200 mt-1">{formatFileSize(msg.fileSize || 0)}</div>
          </div>
        </div>
      </Button>
    );
  }
  return <>{replyBlock}<span className='break-all'>{msg.content}</span></>;
}
