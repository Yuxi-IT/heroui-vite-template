import { ListBox, Avatar, Label, Description } from '@heroui/react';
import { useNavigate } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';

interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
}

const users: User[] = [
  { id: '1', name: 'Bob', avatar: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg', email: 'bob@heroui.com' },
  { id: '2', name: 'Fred', avatar: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg', email: 'fred@heroui.com' },
  { id: '3', name: 'Martha', avatar: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg', email: 'martha@heroui.com' },
];

function Messages() {
  const navigate = useNavigate();

  return (
    <DefaultLayout>
      <ListBox aria-label="Users" selectionMode="single" onSelectionChange={(keys) => navigate(`/chat/${Array.from(keys)[0]}`)}>
        {users.map(user => (
          <ListBox.Item key={user.id} id={user.id} textValue={user.name}>
            <Avatar size="sm">
              <Avatar.Image alt={user.name} src={user.avatar} />
              <Avatar.Fallback>{user.name[0]}</Avatar.Fallback>
            </Avatar>
            <div className="flex flex-col">
              <Label>{user.name}</Label>
              <Description>{user.email}</Description>
            </div>
          </ListBox.Item>
        ))}
      </ListBox>
    </DefaultLayout>
  );
}

export default Messages;
