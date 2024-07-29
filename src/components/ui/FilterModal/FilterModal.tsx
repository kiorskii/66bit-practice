import { useState } from "react";
import {
  Modal,
  Box,
  Button,
  Typography,
  IconButton,
  Select,
  MenuItem,
  Input,
} from "@mui/material";
import { Add, Close } from "@mui/icons-material";
import styles from "./FilterModal.module.scss";

const FilterModal = ({ open, handleClose }) => {
  const [filters, setFilters] = useState([
    { id: 1, field: "city.name", value: "" },
  ]);

  const addFilter = () => {
    setFilters([
      ...filters,
      { id: filters.length + 1, field: "city.name", value: "" },
    ]);
  };

  const removeFilter = (id) => {
    setFilters(filters.filter((filter) => filter.id !== id));
  };

  const handleFilterChange = (id, field, value) => {
    setFilters(
      filters.map((filter) =>
        filter.id === id ? { ...filter, [field]: value } : filter
      )
    );
  };

  const applyFilters = () => {
    const appliedFilters = filters.reduce((acc, filter) => {
      if (filter.field && filter.value) {
        acc[filter.field] = filter.value;
      }
      return acc;
    }, {});
    handleClose(appliedFilters);
  };

  return (
    <Modal open={open} onClose={() => handleClose(null)}>
      <Box className={styles.modal}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ marginBottom: "20px" }}
        >
          <Typography variant="h6">Фильтры поиска</Typography>
          <IconButton onClick={() => handleClose(null)}>
            <Close />
          </IconButton>
        </Box>
        {filters.map((filter) => (
          <Box
            key={filter.id}
            display="flex"
            alignItems="center"
            sx={{ marginBottom: "10px" }}
            justifyContent={"space-between"}
          >
            <Select
              size={"small"}
              value={filter.field}
              onChange={(e) =>
                handleFilterChange(filter.id, "field", e.target.value)
              }
              sx={{ width: "200px", marginRight: "10px" }}
            >
              <MenuItem value="city.name">Город</MenuItem>
              <MenuItem value="phoneNumber">Телефон</MenuItem>
              <MenuItem value="status">Статус</MenuItem>
              <MenuItem value="isBlocked">Заблокирован</MenuItem>
              <MenuItem value="webSite">Сайт</MenuItem>
              {/* Добавьте остальные поля, которые есть в таблице */}
            </Select>
            <Input
              placeholder="Значение фильтра"
              size={"small"}
              sx={{ width: "40%", marginRight: "10px" }}
              value={filter.value}
              onChange={(e) =>
                handleFilterChange(filter.id, "value", e.target.value)
              }
            />
            <Button
              size={"small"}
              variant="contained"
              color="error"
              onClick={() => removeFilter(filter.id)}
            >
              — Удалить
            </Button>
          </Box>
        ))}
        <Box
          display="flex"
          justifyContent="space-between"
          sx={{ marginTop: "40px" }}
        >
          <Button variant="contained" startIcon={<Add />} onClick={addFilter}>
            Добавить фильтр
          </Button>
          <Button variant="contained" color="primary" onClick={applyFilters}>
            Применить
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default FilterModal;
