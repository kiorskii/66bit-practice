import React, { useState } from "react";
import { Box, Button, TextField, CircularProgress } from "@mui/material";
import styles from "./Suppliers.module.scss";
import Table from "../Table/Table";
import { Add } from "@mui/icons-material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
  useAddSupplier,
  useSuppliers,
  usePatchSupplier,
} from "../../../api/useSuppliers";
import FilterModal from "../FilterModal/FilterModal";
import SupplierModal from "../SupplierModal/SupplierModal";

const Suppliers = () => {
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [currentSupplier, setCurrentSupplier] = useState(null);
  const [newSupplier, setNewSupplier] = useState({
    name: "",
    director: "",
    contactPerson: "",
    phoneNumber: "",
    email: "",
    warehouseAddress: "",
    warehouseHours: "",
    officeAddress: "",
    officeHours: "",
    inn: "",
    ogrn: "",
    kpp: "",
    account: "",
    bank: "",
    correspondentAccount: "",
    bic: "",
  });
  const [filters, setFilters] = useState({});
  const [filteredData, setFilteredData] = useState([]);

  const { data: suppliersData, isLoading, error } = useSuppliers();

  const { mutate: addSupplier } = useAddSupplier();
  const { mutate: patchSupplier } = usePatchSupplier();

  const handleOpenFilterModal = () => {
    setFilterModalOpen(true);
  };

  const handleCloseFilterModal = (appliedFilters) => {
    setFilters(appliedFilters || {});
    setFilterModalOpen(false);
  };

  const handleOpenEditModal = (supplier) => {
    const meta = supplier.meta.reduce((acc, { key, value }) => {
      acc[key] = value;
      return acc;
    }, {});

    setCurrentSupplier(supplier);
    setNewSupplier({
      name: supplier.name || "",
      director: supplier.director || "",
      contactPerson: supplier.contactPerson || "",
      phoneNumber: supplier.phoneNumber || "",
      email: supplier.email || "",
      warehouseAddress: supplier.warehouseAddress || "",
      warehouseHours: supplier.warehouseHours || "",
      officeAddress: supplier.officeAddress || "",
      officeHours: supplier.officeHours || "",
      inn: supplier.inn || "",
      ogrn: meta.ogrn || "",
      kpp: meta.kpp || "",
      account: meta.account || "",
      bank: meta.bank || "",
      correspondentAccount: meta.correspondentAccount || "",
      bic: meta.bic || "",
    });
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setCurrentSupplier(null);
  };

  const handleSaveSupplier = (supplier) => {
    const {
      inn,
      name,
      phoneNumber,
      webSite,
      email,
      director,
      contactPerson,
      warehouseAddress,
      warehouseHours,
      officeAddress,
      officeHours,
      ogrn,
      kpp,
      account,
      bank,
      correspondentAccount,
      bic,
      contactsNote,
      addressNote,
      requisitesNote,
    } = supplier;
    const meta = [
      { key: "director", value: director },
      { key: "contactPerson", value: contactPerson },
      { key: "warehouseAddress", value: warehouseAddress },
      { key: "warehouseHours", value: warehouseHours },
      { key: "officeAddress", value: officeAddress },
      { key: "officeHours", value: officeHours },
      { key: "ogrn", value: ogrn },
      { key: "kpp", value: kpp },
      { key: "account", value: account },
      { key: "bank", value: bank },
      { key: "correspondentAccount", value: correspondentAccount },
      { key: "bic", value: bic },
      { key: "contactsNote", value: contactsNote },
      { key: "addressNote", value: addressNote },
      { key: "requisitesNote", value: requisitesNote },
      { key: "updatedAt", value: new Date().toISOString() },
    ].filter(
      ({ value }) => value !== undefined && value !== null && value !== ""
    );

    const formattedSupplier = {
      id: currentSupplier.id,
      webSite: { value: webSite },
      name: { value: name },
      phoneNumber: { value: phoneNumber },
      email: { value: email },
      inn: { value: parseFloat(inn) },
      meta: { value: meta },
    };

    patchSupplier(formattedSupplier, {
      onSuccess: () => {
        handleCloseEditModal();
      },
    });
  };

  const handleAddSupplier = (supplier) => {
    const {
      name,
      phoneNumber,
      email,
      inn,
      director,
      contactPerson,
      warehouseAddress,
      warehouseHours,
      officeAddress,
      officeHours,
      ogrn,
      kpp,
      account,
      bank,
      correspondentAccount,
      bic,
      contactsNote,
      addressNote,
      requisitesNote,
    } = supplier;
    const meta = [
      { key: "director", value: director },
      { key: "contactPerson", value: contactPerson },
      { key: "warehouseAddress", value: warehouseAddress },
      { key: "warehouseHours", value: warehouseHours },
      { key: "officeAddress", value: officeAddress },
      { key: "officeHours", value: officeHours },
      { key: "ogrn", value: ogrn },
      { key: "kpp", value: kpp },
      { key: "account", value: account },
      { key: "bank", value: bank },
      { key: "correspondentAccount", value: correspondentAccount },
      { key: "bic", value: bic },
      { key: "contactsNote", value: contactsNote },
      { key: "addressNote", value: addressNote },
      { key: "requisitesNote", value: requisitesNote },
    ].filter(
      ({ value }) => value !== undefined && value !== null && value !== ""
    );

    const formattedSupplier = {
      name,
      phoneNumber,
      email,
      inn: parseFloat(inn),
      meta,
    };

    addSupplier(formattedSupplier, {
      onSuccess: () => {
        handleCloseEditModal();
      },
    });
  };

  const handleSearch = () => {
    if (suppliersData) {
      const allFilters = {
        ...filters,
        name: newSupplier.name,
        inn: newSupplier.inn,
        email: newSupplier.email,
      };

      const filtered = suppliersData.filter((supplier) => {
        return Object.keys(allFilters).every((key) => {
          if (!allFilters[key]) return true;
          return supplier[key]
            ?.toLowerCase()
            .includes(allFilters[key].toLowerCase());
        });
      });

      setFilteredData(filtered);
    }
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <div>Error loading suppliers</div>;

  return (
    <div className={styles.hero}>
      <h3 className={styles.title}>Каталог поставщиков</h3>
      <Box className={styles.form} component="form" noValidate>
        <TextField
          size="small"
          id="company"
          label="Компания"
          value={newSupplier.name}
          onChange={(e) =>
            setNewSupplier({ ...newSupplier, name: e.target.value })
          }
          autoFocus
        />
        <TextField
          size="small"
          label="ИНН"
          type="inn"
          id="inn"
          value={newSupplier.inn}
          onChange={(e) =>
            setNewSupplier({ ...newSupplier, inn: e.target.value })
          }
        />
        <TextField
          size="small"
          label="Email"
          type="email"
          id="email"
          value={newSupplier.email}
          onChange={(e) =>
            setNewSupplier({ ...newSupplier, email: e.target.value })
          }
        />
        <Button
          size="small"
          type="button"
          variant="contained"
          className="button"
          onClick={handleSearch}
        >
          Найти
        </Button>
        <Button
          size="small"
          type="button"
          variant="contained"
          className="button"
          startIcon={<Add sx={{ color: "white" }} />}
          onClick={() => setEditModalOpen(true)}
        >
          Добавить
        </Button>
        <Button
          variant="contained"
          sx={{ color: "gray", backgroundColor: "#F0F0F0", marginRight: "5vw" }}
          className="button"
          startIcon={<FilterAltIcon sx={{ color: "gray" }} />}
          onClick={handleOpenFilterModal}
        >
          Фильтры поиска
        </Button>
      </Box>
      <Table
        data={filteredData.length > 0 ? filteredData : suppliersData}
        onRowClick={handleOpenEditModal}
      />
      <FilterModal
        open={isFilterModalOpen}
        handleClose={handleCloseFilterModal}
      />
      <SupplierModal
        open={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSubmit={currentSupplier ? handleSaveSupplier : handleAddSupplier}
        supplier={currentSupplier}
      />
    </div>
  );
};

export default Suppliers;
