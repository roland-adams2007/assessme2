import { useEffect, useState } from "react";
import Account from "./assessme2/Account";
import Home from "./assessme2/Home";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

function App() {
  const [mainTab, setMainTab] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("tab") || localStorage.getItem("mainTab") || "account";
  });

  useEffect(() => {
    const userStatus = cookies.get("userStatus");

    if (userStatus === "notActive" || !userStatus) {
      setMainTab("account");
    } else {
      localStorage.setItem("mainTab", mainTab);
    }
  }, [mainTab]);

  useEffect(() => {
    if (mainTab) {
      const params = new URLSearchParams(window.location.search);
      params.set("tab", mainTab);
      window.history.replaceState(null, "", `?${params.toString()}`);
    }
  }, [mainTab]);

  const handleSetMainTab = (tab) => {
    setMainTab(tab);
  };

  return (
    <>
      {mainTab === "account" && <Account setMainTab={handleSetMainTab} />}
      {mainTab === "home" && <Home setMainTab={handleSetMainTab} />}
    </>
  );
}

export default App;
