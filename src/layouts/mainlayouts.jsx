import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

function MainLayout({onLogout}) {
  return (
    <div className="app-wrapper">
      
      <Navbar onLogout={onLogout} />

      <main className="main-content">
        <Outlet />
      </main>

      
    </div>
  );
}

export default MainLayout;