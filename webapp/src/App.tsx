
import { siteConfig } from './config/site';
import { BottomNav } from './layout/BottomNav';
import AppRoutes from './routes';

export function setTitle(title: string){
  document.title = siteConfig.name + (title ? ` - ${title}` : '');
}

function App() {
  return (
    //  className="bg-[url('02.jpg')] bg-cover bg-center"
    <div>
      {/* <Navbar /> */}
      <AppRoutes/>
      <BottomNav/>
    </div>
  );
}

export default App;