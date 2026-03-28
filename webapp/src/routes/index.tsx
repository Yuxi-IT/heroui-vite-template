import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { setTitle } from '../App';
import { navItems } from '../config/site';

import Home from '../pages/HomePage';
import NotFound from '../pages/NotFoundPage';
import User from '../pages/UserPage';
import Square from '../pages/SquarePage';
import Publish from '../pages/PublishPage';
import Messages from '../pages/MessagesPage';
import ChatPage from '../pages/ChatPage';

function AppRoutes() {
  const location = useLocation();
  const navigate = useNavigate();

  setTitle("");

  const handleSwipe = (direction: number) => {
    const currentIndex = navItems.findIndex(item => item.url === location.pathname);
    if (currentIndex === -1) return;

    const nextIndex = currentIndex + direction;
    if (nextIndex >= 0 && nextIndex < navItems.length) {
      navigate(navItems[nextIndex].url);
    }
  };

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition onSwipe={handleSwipe}><Home /></PageTransition>} />
        <Route path="/square" element={<PageTransition onSwipe={handleSwipe}><Square /></PageTransition>} />
        <Route path="/user" element={<PageTransition onSwipe={handleSwipe}><User /></PageTransition>} />
        <Route path="/messages" element={<PageTransition onSwipe={handleSwipe}><Messages /></PageTransition>} />
        <Route path="/chat/:userId" element={<ChatPage />} />
        <Route path="/publish" element={<Publish />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

function PageTransition({ children, onSwipe }: { children: React.ReactNode; onSwipe: (direction: number) => void }) {
  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > 100) {
          onSwipe(info.offset.x > 0 ? -1 : 1);
        }
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="h-screen overflow-y-auto"
      style={{ touchAction: 'pan-y' }}
    >
      {children}
    </motion.div>
  );
}

export default AppRoutes;
