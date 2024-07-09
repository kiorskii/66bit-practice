import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import styles from "./AuthForm.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  login: string;
  password: string;
};

const AuthForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className={styles.form}>
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="login"
          label="Логин"
          autoComplete="login"
          autoFocus
          {...register("login", { required: true })}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Пароль"
          type="password"
          id="password"
          autoComplete="current-password"
          {...register("password", { required: true })}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Запомнить меня"
        />
        {errors.login && (
          <p className={styles.error}>Неправильный логин или пароль.</p>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ color: "gray", backgroundColor: "#F0F0F0" }}
          className="button"
        >
          Войти
        </Button>
      </Box>
    </div>
  );
};

export default AuthForm;
