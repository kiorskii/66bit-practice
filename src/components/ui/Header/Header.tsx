import styles from "./Header.module.scss";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import PersonIcon from "@mui/icons-material/Person";

const Header = () => {
  return (
    <div className={styles.header__container}>
      <nav className={styles.nav}>
        <ul className={styles.nav__list}>
          <li className={styles.logo}>
            <img src="logo.png" alt="" />
          </li>
          <li className={styles.nav__item}>
            <a href="">Поставщики</a>
          </li>
          <li className={styles.nav__item}>
            <a href="">Клиенты</a>
          </li>
          <li className={styles.nav__item}>
            <a href="">Товарные позиции</a>
          </li>
        </ul>
      </nav>
      <div className={styles.header__auth}>
        <ul className={styles.auth__list}>
          <li className={styles.notification}>
            <NotificationsActiveIcon />
          </li>
          <li className={styles.profile}>
            <PersonIcon />
            <p className={styles.name}>Name Name</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
