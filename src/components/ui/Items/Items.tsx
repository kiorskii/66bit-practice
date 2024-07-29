import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import styles from "./Items.module.scss";
import Table from "../Table/Table";
import { Add } from "@mui/icons-material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterModal from "../FilterModal/FilterModal";

const Items = () => {
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);

  const handleOpenFilterModal = () => {
    setFilterModalOpen(true);
  };

  const handleCloseFilterModal = () => {
    setFilterModalOpen(false);
  };

  return (
    <div className={styles.hero}>
      <h1 className={styles.title}>Раздел в разработке :)</h1>
    </div>
  );
};

export default Items;
