import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { NavLink } from 'react-router-dom';
import { IoMdMenu } from 'react-icons/io';
import Sidebar from './components/Sidebar/Sidebar';
import './styles.css';

function AdminLayout({ children, links = [] }) {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const [isSidebarActive, setisSidebarActive] = useState(!isMobile);

  const sidebarToggle = () => setisSidebarActive(!isSidebarActive);

  useEffect(() => {
    isMobile ? setisSidebarActive(false) : setisSidebarActive(true);
  }, [isMobile]);

  return (
    <div className="page-container">
      <div
        className={`content${
          isMobile ? ' content--mobile' : ' content--shift'
        }`}
      >
        <header className="header">
          <button className="sidebar-toggle" onClick={sidebarToggle}>
            <IoMdMenu
              style={{ width: '100%', height: '100%', color: '#fff' }}
            />
          </button>
          <h2 className="header__title">Админ-панель</h2>
        </header>
        <div className="content__wrapper">
          <main className="content__container">{children}</main>
        </div>
      </div>

      <Sidebar
        isMobile={isMobile}
        isActive={isSidebarActive}
        hide={sidebarToggle}
      >
        {links.map((link) => {
          if (!link.name) {
            return;
          }

          return (
            <NavLink
              to={link.path}
              key={link.path}
              className="sidebar__nav-link"
              onClick={isMobile ? sidebarToggle : null}
            >
              {link.name}
            </NavLink>
          );
        })}
      </Sidebar>
    </div>
  );
}

export default AdminLayout;
