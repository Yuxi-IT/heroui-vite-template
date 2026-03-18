import { BottomNav } from './components/BottomNav';
import Navbar from './components/Navbar';
import { siteConfig } from './config/site';
import AppRoutes from './routes';

export function setTitle(title: string){
  document.title = siteConfig.name + (title ? ` - ${title}` : '');
}

function App() {
  return (
    //  className="bg-[url('02.jpg')] bg-cover bg-center"
    <div>
      {/* <Navbar /> */}
      <AppRoutes />
      <BottomNav/>
    </div>
  );
}

export default App;