import { BottomNav } from './components/BottomNav';
import Navbar from './components/Navbar';
import AppRoutes from './routes';

function App() {
  return (
    <>
      <Navbar />
      <AppRoutes />
      <BottomNav/>
    </>
  );
}

export default App;