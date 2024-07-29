import styles from "./Header.module.scss";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";
import NotificationMenu from "../NotificationMenu/NotificationMenu";

const Header = ({
  currentPage,
  setPage,
}: {
  currentPage: string;
  setPage: Function;
}) => {
  const [isNotificationMenuOpen, setNotificationMenuOpen] = useState(false);

  const toggleNotificationMenu = () => {
    setNotificationMenuOpen(!isNotificationMenuOpen);
  };

  return (
    <div className={styles.header__container}>
      <nav className={styles.nav}>
        <ul className={styles.nav__list + " " + styles[currentPage]}>
          <li className={styles.logo}>
            <img src="logo.png" alt="" />
          </li>
          <li onClick={() => setPage("suppliers")} className={styles.nav__item}>
            Поставщики
          </li>
          <li onClick={() => setPage("clients")} className={styles.nav__item}>
            Клиенты
          </li>
          <li onClick={() => setPage("items")} className={styles.nav__item}>
            Товарные позиции
          </li>
        </ul>
      </nav>
      <div className={styles.header__auth}>
        <ul className={styles.auth__list}>
          <li className={styles.notification} onClick={toggleNotificationMenu}>
            {isNotificationMenuOpen ? (
              <NotificationsActiveIcon />
            ) : (
              <NotificationsActiveIcon sx={{ color: "gray" }} />
            )}
          </li>
          {isNotificationMenuOpen && <NotificationMenu />}
          <li className={styles.profile}>
            <PersonIcon sx={{ color: "gray" }} />
            <p className={styles.name}>Name Name</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
