import { Box, Button, TextField } from "@mui/material";
import styles from "./Suppliers.module.scss";
import Table from "../Table/Table";
import { Add } from "@mui/icons-material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const Suppliers = () => {
  return (
    <div className={styles.hero}>
      <h3 className={styles.title}>Каталог поставщиков</h3>
      <Box className={styles.form} component="form" noValidate>
        <TextField size={"small"} id="company" label="Компания" autoFocus />
        <TextField size={"small"} label="ИНН" type="inn" id="inn" />
        <TextField size={"small"} label="Email" type="email" id="email" />

        <Button
          size={"small"}
          type="submit"
          variant="contained"
          sx={{ color: "gray", backgroundColor: "#F0F0F0" }}
          className="button"
        >
          Найти
        </Button>
        <Button
          sx={{ marginRight: "5vw" }}
          variant="contained"
          startIcon={<Add sx={{ color: "white" }} />}
        >
          Добавить
        </Button>
        <Button
          variant="contained"
          sx={{ color: "gray", backgroundColor: "#F0F0F0", marginRight: "5vw" }}
          className="button"
          startIcon={<FilterAltIcon sx={{ color: "gray" }} />}
        >
          Фильтры поиска
        </Button>
      </Box>
      <Table />
    </div>
  );
};

export default Suppliers;
