export interface Message {
  id: string;
  userId: string;
  content: string;
  timestamp: number;
  type: 'text' | 'image' | 'video' | 'file';
  fileName?: string;
  fileSize?: number;
  fileType?: string;
  replyToId?: string;
}

export interface UserInfo {
  id: string;
  name: string;
  avatar: string;
}

export const users: UserInfo[] = [
  { id: '1', name: 'Bob', avatar: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg' },
  { id: '2', name: 'Fred', avatar: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg' },
  { id: '3', name: 'Martha', avatar: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg' },
];

export const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
};

export const getReplyPreview = (replyMsg: Message) => {
  if (replyMsg.type === 'image') return '[图片]';
  if (replyMsg.type === 'video') return '[视频]';
  if (replyMsg.type === 'file') return `[文件] ${replyMsg.fileName || ''}`;
  return replyMsg.content.length > 30 ? replyMsg.content.substring(0, 30) + '...' : replyMsg.content;
};

export const getReplyUserName = (uid: string) => {
  if (uid === 'me') return '我';
  return users.find(u => u.id === uid)?.name || uid;
};
