import { Bell } from '@gravity-ui/icons';
import { Button, Card } from '@heroui/react';
import DefaultLayout from '../../layout/DefaultLayout';
import AcrylicBubble from '../../layout/AcrylicBubble';
import { AppBridgeNative } from '../../service/native';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <DefaultLayout header={
      <>
        <AcrylicBubble className='w-full rounded-[15px] px-4 py-2 text-'>
          <Link className='w-full text-gray-500' to="/search">搜索</Link>
        </AcrylicBubble>
        <AcrylicBubble className='w-[48px]'>
          <Bell onClick={()=>{
            AppBridgeNative.getStatusBarHeight();
          }}/>
        </AcrylicBubble>
      </>
    }>
      <div className="container mx-auto py-8 pt-20">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-4">Welcome to HeroUI3</h1>
          <p className="mb-6">This is a basic example of HeroUI3 with Vite and React Router.</p>
          <Button>Get Started</Button>
        </Card>
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-4">Welcome to HeroUI3</h1>
          <p className="mb-6">This is a basic example of HeroUI3 with Vite and React Router.</p>
          <Button>Get Started</Button>
        </Card>
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-4">Welcome to HeroUI3</h1>
          <p className="mb-6">This is a basic example of HeroUI3 with Vite and React Router.</p>
          <Button>Get Started</Button>
        </Card>
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-4">Welcome to HeroUI3</h1>
          <p className="mb-6">This is a basic example of HeroUI3 with Vite and React Router.</p>
          <Button>Get Started</Button>
        </Card>
      </div>
    </DefaultLayout>
  );
}

export default Home;

