import { useState, useEffect } from "react";
import LoginPage from "./LoginPage";

export default function PageRenderer() {

  const [currentPage, setCurrentPage] = useState("login");

   function changePage(page) {
    setCurrentPage(page);
  }

  return (
    <>
      {currentPage === "login" && <LoginPage />}
    </>
  )
}
