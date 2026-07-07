import { useState, useEffect } from "react";
import AutoSetupPage from "./AutoSetupPage.jsx";
import LoginPage from "./LoginPage.jsx";

export default function PageRenderer() {

  const [currentPage, setCurrentPage] = useState("login");

   function changePage(page) {
    setCurrentPage(page);
  }

  return (
        <>
            {currentPage === "login" &&
                <LoginPage changePage={changePage} />

            }

            {currentPage === "autoSetup" &&
                <AutoSetupPage changePage={changePage} />

            }
        </>
    );
}
