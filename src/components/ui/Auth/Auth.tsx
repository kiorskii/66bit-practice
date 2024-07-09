import styles from "./Auth.module.scss";
import AuthForm from "./AuthForm/AuthForm";

export const Auth = () => {
  return (
    <div className={styles.container}>
      <div className={styles.auth}>
        <h1 className={styles.title}>Стали Урала система обработки данных</h1>
        <h2 className={styles.pretitle}>Авторизация</h2>
        <AuthForm />
        <img src="logo.svg" alt="" />
      </div>
    </div>
  );
};
