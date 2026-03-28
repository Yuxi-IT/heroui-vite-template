import { useRef } from 'react';
import { Button, Input } from '@heroui/react';
import { PaperPlane, Paperclip, Xmark } from '@gravity-ui/icons';
import { Message, getReplyPreview, getReplyUserName } from './types';

interface ChatInputProps {
  inputValue: string;
  setInputValue: (v: string) => void;
  replyTo: Message | null;
  setReplyTo: (msg: Message | null) => void;
  onSend: () => void;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ChatInput({ inputValue, setInputValue, replyTo, setReplyTo, onSend, onFileSelect }: ChatInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      {replyTo && (
        <div className="px-4 pt-2 pb-1 border-t flex items-center gap-2 bg-gray-50">
          <div className="flex-1 text-sm truncate border-l-2 border-blue-500 pl-2">
            <span className="font-medium text-blue-500">{getReplyUserName(replyTo.userId)}</span>
            <span className="text-gray-500 ml-1">{getReplyPreview(replyTo)}</span>
          </div>
          <Button isIconOnly size="sm" variant="tertiary" onPress={() => setReplyTo(null)}>
            <Xmark className="w-4 h-4" />
          </Button>
        </div>
      )}
      <div className="p-4 border-t flex gap-2 bg-white/60 backdrop-blur-sm">
        <Button isIconOnly variant="tertiary" onClick={() => fileInputRef.current?.click()}>
          <Paperclip className="w-5 h-5"/>
        </Button>
        <input
          title="file"
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*,video/*,.mp3,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.pdf,.md,.txt,.js,.ts,.json,.yaml,.xaml,.xml,.zip,.rar,.7z,"
          onChange={onFileSelect}
        />
        <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && onSend()} placeholder="输入消息..." className="flex-1"/>
        <Button isIconOnly onClick={onSend}><PaperPlane className="w-5 h-5"/></Button>
      </div>
    </>
  );
}
