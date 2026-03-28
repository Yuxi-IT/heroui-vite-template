import { useState, useEffect, useRef, useCallback } from 'react';
import { Avatar, Button } from '@heroui/react';
import { ArrowLeft } from '@gravity-ui/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { isAppUA } from '../../service/appUA';
import { Message, users } from './types';
import MessageBubble from './MessageBubble';
import MessageContextMenu from './MessageContextMenu';
import ChatInput from './ChatInput';

export default function ChatPage() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', userId: userId!, content: 'Hello!', timestamp: Date.now() - 10000, type: 'text' },
    { id: '2', userId: 'me', content: 'Hi there!', timestamp: Date.now() - 5000, type: 'text' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [replyTo, setReplyTo] = useState<Message | null>(null);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const [menuMsgId, setMenuMsgId] = useState<string | null>(null);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const user = users.find(u => u.id === userId);

  useEffect(() => {
    const handleResize = () => setViewportHeight(window.visualViewport?.height || window.innerHeight);
    window.visualViewport?.addEventListener('resize', handleResize);
    return () => window.visualViewport?.removeEventListener('resize', handleResize);
  }, []);

  const handleScroll = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const handleContextMenu = useCallback((e: React.MouseEvent, msgId: string) => {
    e.preventDefault();
    setMenuMsgId(msgId);
  }, []);

  const handleTouchStart = useCallback((msgId: string) => {
    longPressTimer.current = setTimeout(() => setMenuMsgId(msgId), 500);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }, []);

  const sendMessage = () => {
    if (!inputValue.trim()) return;
    setMessages([...messages, {
      id: Date.now().toString(),
      userId: 'me',
      content: inputValue,
      timestamp: Date.now(),
      type: 'text',
      replyToId: replyTo?.id
    }]);
    setInputValue('');
    setReplyTo(null);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const url = URL.createObjectURL(file);
      let type: Message['type'] = 'file';

      if (file.type.startsWith('image/')) type = 'image';
      else if (file.type.startsWith('video/')) type = 'video';

      setMessages(prev => [...prev, {
        id: Date.now().toString() + Math.random(),
        userId: 'me',
        content: url,
        timestamp: Date.now(),
        type,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type
      }]);
    });
  };

  return (
    <div className={`flex flex-col ${isAppUA() ? 'pt-[28px]' : ''}`} style={{ height: `${viewportHeight}px` }}>
      <div className="p-4 border-b flex items-center gap-2">
        <Button isIconOnly variant="tertiary" size="sm" onClick={() => navigate("/messages")}>
          <ArrowLeft className="w-5 h-5"/>
        </Button>
        <Avatar size="sm">
          <Avatar.Image alt={user?.name} src={user?.avatar} />
        </Avatar>
        <span className="font-semibold">{user?.name}</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2" onTouchMove={handleScroll}>
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.userId === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className="max-w-[70%]">
              <MessageContextMenu
                msg={msg}
                isOpen={menuMsgId === msg.id}
                onClose={() => setMenuMsgId(null)}
                onReply={setReplyTo}
                onContextMenu={(e) => handleContextMenu(e, msg.id)}
                onTouchStart={() => handleTouchStart(msg.id)}
                onTouchEnd={handleTouchEnd}
              >
                <MessageBubble msg={msg} messages={messages} />
              </MessageContextMenu>
            </div>
          </div>
        ))}
      </div>

      <ChatInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        replyTo={replyTo}
        setReplyTo={setReplyTo}
        onSend={sendMessage}
        onFileSelect={handleFileSelect}
      />
    </div>
  );
}
