import { useState, useEffect } from 'react';
import { Avatar, Dropdown, Button, Input, Label } from '@heroui/react';
import { ArrowLeft, PaperPlane } from '@gravity-ui/icons';
import { useNavigate, useParams } from 'react-router-dom';

interface Message {
  id: string;
  userId: string;
  content: string;
  timestamp: number;
  type: 'text' | 'image';
}

const users = [
  { id: '1', name: 'Bob', avatar: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg' },
  { id: '2', name: 'Fred', avatar: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg' },
  { id: '3', name: 'Martha', avatar: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg' },
];

const isAppUA = () => typeof (window as any).AppBridgeNative !== 'undefined';

function Chat() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', userId: userId!, content: 'Hello!', timestamp: Date.now() - 10000, type: 'text' },
    { id: '2', userId: 'me', content: 'Hi there!', timestamp: Date.now() - 5000, type: 'text' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

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

  const handleAction = (key: string, message: Message) => {
    if (key === 'copy' && isAppUA()) {
      (window as any).AppBridgeNative.copyToClipboard(message.content);
    } else if (key === 'share' && isAppUA()) {
      if (message.type === 'text') (window as any).AppBridgeNative.shareText(message.content);
      else if (message.type === 'image') (window as any).AppBridgeNative.shareImage(message.content);
    }
  };

  const sendMessage = () => {
    if (!inputValue.trim()) return;
    setMessages([...messages, { id: Date.now().toString(), userId: 'me', content: inputValue, timestamp: Date.now(), type: 'text' }]);
    setInputValue('');
  };

  return (
      <div className={`flex flex-col ${isAppUA() ? '' : 'pt-[28px]'}`} style={{ height: `${viewportHeight}px` }}>
        <div className="p-4 border-b flex items-center gap-2">
          <Button isIconOnly variant="tertiary" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5"/>
          </Button>
          <Avatar size="sm">
            <Avatar.Image alt={user?.name} src={user?.avatar} />
          </Avatar>
          <span className="font-semibold">{user?.name}</span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2" onTouchMove={handleScroll}>
          {messages.map(msg => (
            <Dropdown key={msg.id}>
              <div className={`flex ${msg.userId === 'me' ? 'justify-end' : 'justify-start'}`}>
                <Button variant="tertiary" className={`max-w-[70%] ${msg.userId === 'me' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-2xl px-4 py-2`}>
                  {msg.content}
                </Button>
              </div>
              <Dropdown.Popover>
                <Dropdown.Menu onAction={(key) => handleAction(key as string, msg)}>
                  <Dropdown.Item id="copy" textValue="Copy"><Label>复制</Label></Dropdown.Item>
                  <Dropdown.Item id="reply" textValue="Reply"><Label>回复</Label></Dropdown.Item>
                  <Dropdown.Item id="todo" textValue="Todo"><Label>设为待办</Label></Dropdown.Item>
                  <Dropdown.Item id="share" textValue="Share"><Label>分享</Label></Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          ))}
        </div>

        <div className="p-4 border-t flex gap-2">
          <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && sendMessage()} placeholder="输入消息..." className="flex-1"/>
          <Button isIconOnly onClick={sendMessage}><PaperPlane className="w-5 h-5"/></Button>
        </div>
      </div>
  );
}

export default Chat;
