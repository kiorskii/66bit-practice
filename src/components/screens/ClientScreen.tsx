import { useState } from "react";
import Footer from "../ui/Footer/Footer";
import Header from "../ui/Header/Header";
import Suppliers from "../ui/Suppliers/Suppliers";
import Clients from "../ui/Clients/Clients";
import Itmes from "../ui/Items/Items";

const ClientScreen = () => {
  const [currentPage, setCurrentPage] = useState("suppliers");

  return (
    <>
      <Header currentPage={currentPage} setPage={setCurrentPage} />
      {currentPage === "suppliers" && <Suppliers />}
      {currentPage === "clients" && <Clients />}
      {currentPage === "items" && <Itmes />}
      <Footer />
    </>
  );
};

export default ClientScreen;
