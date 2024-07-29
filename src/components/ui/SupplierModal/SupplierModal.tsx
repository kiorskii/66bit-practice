import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Modal,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import styles from "./SupplierModal.module.scss";

const SupplierModal = ({ open, onClose, onSubmit, supplier }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [formValues, setFormValues] = useState({
    name: "",
    director: "",
    contactPerson: "",
    phoneNumber: "",
    email: "",
    webSite: "",
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
    contactsNote: "",
    addressNote: "",
    requisitesNote: "",
  });

  useEffect(() => {
    if (supplier) {
      const meta = supplier.meta.reduce((acc, { key, value }) => {
        acc[key] = value;
        return acc;
      }, {});

      setFormValues({
        name: supplier.name || "",
        director: meta.director || "",
        contactPerson: meta.contactPerson || "",
        phoneNumber: supplier.phoneNumber || "",
        email: supplier.email || "",
        warehouseAddress: meta.warehouseAddress || "",
        webSite: supplier.webSite || "",
        warehouseHours: meta.warehouseHours || "",
        officeAddress: meta.officeAddress || "",
        officeHours: meta.officeHours || "",
        inn: supplier.inn || "",
        ogrn: meta.ogrn || "",
        kpp: meta.kpp || "",
        account: meta.account || "",
        bank: meta.bank || "",
        correspondentAccount: meta.correspondentAccount || "",
        bic: meta.bic || "",
        contactsNote: meta.contactsNote || "",
        addressNote: meta.addressNote || "",
        requisitesNote: meta.requisitesNote || "",
      });
    } else {
      setFormValues({
        name: "",
        director: "",
        contactPerson: "",
        phoneNumber: "",
        email: "",
        webSite: "",
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
        contactsNote: "",
        addressNote: "",
        requisitesNote: "",
      });
    }
  }, [supplier]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit(formValues);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className={styles.modal}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            {supplier ? "Редактировать поставщика" : "Добавить поставщика"}
          </Typography>
          <Button onClick={onClose}>
            <Close />
          </Button>
        </Box>
        <Tabs
          value={tabIndex}
          onChange={(e, newValue) => setTabIndex(newValue)}
        >
          <Tab label="Контакты" />
          <Tab label="Адрес" />
          <Tab label="Реквизиты" />
        </Tabs>
        {tabIndex === 0 && (
          <Box className={styles.tabContent}>
            <TextField
              size="small"
              label="Компания"
              required
              name="name"
              value={formValues.name}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              size="small"
              label="Директор"
              name="director"
              value={formValues.director}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              size="small"
              label="Контактное лицо"
              name="contactPerson"
              value={formValues.contactPerson}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              size="small"
              label="Телефон"
              name="phoneNumber"
              value={formValues.phoneNumber}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              size="small"
              label="Email"
              required
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              size="small"
              label="Сайт"
              name="webSite"
              value={formValues.webSite}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              size="small"
              label="Примечание"
              name="contactsNote"
              value={formValues.contactsNote}
              onChange={handleInputChange}
              fullWidth
            />
          </Box>
        )}
        {tabIndex === 1 && (
          <Box className={styles.tabContent}>
            <TextField
              size="small"
              label="Склад"
              name="warehouseAddress"
              value={formValues.warehouseAddress}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              size="small"
              label="Время работы склада"
              name="warehouseHours"
              value={formValues.warehouseHours}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              size="small"
              label="Офис"
              name="officeAddress"
              value={formValues.officeAddress}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              size="small"
              label="Время работы офиса"
              name="officeHours"
              value={formValues.officeHours}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              size="small"
              label="Примечание"
              name="addressNote"
              value={formValues.addressNote}
              onChange={handleInputChange}
              fullWidth
            />
          </Box>
        )}
        {tabIndex === 2 && (
          <Box className={styles.tabContent}>
            <TextField
              size="small"
              label="ИНН"
              name="inn"
              value={formValues.inn}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              size="small"
              label="ОГРН"
              name="ogrn"
              value={formValues.ogrn}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              size="small"
              label="КПП"
              name="kpp"
              value={formValues.kpp}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              size="small"
              label="р/с"
              name="account"
              value={formValues.account}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              size="small"
              label="Банк"
              name="bank"
              value={formValues.bank}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              size="small"
              label="к/с"
              name="correspondentAccount"
              value={formValues.correspondentAccount}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              size="small"
              label="БИК"
              name="bic"
              value={formValues.bic}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              size="small"
              label="Примечание"
              name="requisitesNote"
              value={formValues.requisitesNote}
              onChange={handleInputChange}
              fullWidth
            />
          </Box>
        )}
        <Box className={styles.modalActions}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {supplier ? "Сохранить" : "Добавить"}
          </Button>
          <Button variant="contained" color="secondary" onClick={onClose}>
            Отмена
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SupplierModal;
