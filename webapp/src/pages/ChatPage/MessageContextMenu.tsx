import { Popover, ListBox, Label, Surface } from '@heroui/react';
import { Copy, ArrowShapeTurnUpRight, ArrowUturnCcwLeft } from '@gravity-ui/icons';
import { AppBridgeNative } from '../../service/native';
import { isAppUA } from '../../service/appUA';
import { Message } from './types';

interface MessageContextMenuProps {
  msg: Message;
  isOpen: boolean;
  onClose: () => void;
  onReply: (msg: Message) => void;
  children: React.ReactNode;
  onContextMenu: (e: React.MouseEvent) => void;
  onTouchStart: () => void;
  onTouchEnd: () => void;
}

export default function MessageContextMenu({
  msg, isOpen, onClose, onReply, children,
  onContextMenu, onTouchStart, onTouchEnd
}: MessageContextMenuProps) {

  const handleAction = (key: string | number) => {
    onClose();
    if (key === 'copy') {
      if (isAppUA()) {
        AppBridgeNative.copyToClipboard(msg.content);
      } else {
        navigator.clipboard.writeText(msg.content);
      }
    } else if (key === 'reply') {
      onReply(msg);
    }
  };

  const handleShare = async () => {
    onClose();
    if (!isAppUA()) return;
    if (msg.type === 'text') AppBridgeNative.shareText(msg.content);
    else if (msg.type === 'image' || msg.type === 'video') {
      const response = await fetch(msg.content);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUri = reader.result as string;
        AppBridgeNative.shareImage(dataUri, 'Share Image');
      };
      reader.readAsDataURL(blob);
    }
  };

  return (
    <Popover isOpen={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <Popover.Trigger>
        <div
          className={`${msg.type === 'text' ? `${msg.userId === 'me' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-2xl px-4 py-2` : ''}`}
          onContextMenu={onContextMenu}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onTouchMove={onTouchEnd}
        >
          {children}
        </div>
      </Popover.Trigger>
      <Popover.Content placement="top">
        <Popover.Dialog className="p-0">
          <Surface className="rounded-2xl shadow-surface">
            <ListBox
              aria-label="消息操作"
              className="w-full p-1"
              selectionMode="none"
              onAction={handleAction}
            >
              <ListBox.Item id="copy" textValue="复制">
                <Copy className="size-4 shrink-0 text-muted" />
                <Label>复制</Label>
              </ListBox.Item>
              <ListBox.Item id="reply" textValue="回复">
                <ArrowUturnCcwLeft className="size-4 shrink-0 text-muted" />
                <Label>回复</Label>
              </ListBox.Item>
              {msg.type !== 'file' && (
                <ListBox.Item id="share" textValue="转发" onAction={handleShare}>
                  <ArrowShapeTurnUpRight className="size-4 shrink-0 text-muted" />
                  <Label>转发</Label>
                </ListBox.Item>
              )}
            </ListBox>
          </Surface>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  );
}
