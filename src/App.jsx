import { useEffect, useState } from "react";
import Account from "./assessme2/Account";
import Home from "./assessme2/Home";
import { Cookies } from "react-cookie";
import { Analytics } from '@vercel/analytics/react';

const cookies = new Cookies();

function App() {
  const [mainTab, setMainTab] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("tab") || localStorage.getItem("mainTab") || "account";
  });

  useEffect(() => {
    const userStatus = cookies.get("userStatus");
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));


    if (userStatus !== "Active" || !userStatus) {
      setMainTab("account");
    } else {
      if(!userDetails){
        cookies.set("userStatus", "NotActive", { path: "/", maxAge: 432000 });
        setMainTab("account");
      }
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

  const validTabs = ["account", "home"]; 
  const isValidTab = validTabs.includes(mainTab);

  return (
    <>
      {isValidTab && mainTab === "account" && <Account setMainTab={handleSetMainTab} />}
      {isValidTab && mainTab === "home" && <Home setMainTab={handleSetMainTab} />}
      {!isValidTab && <NotFound />}
      <Analytics />
    </>
  );
}

function NotFound() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px", fontFamily: "Arial, sans-serif" }}>
    <h1 style={{ fontSize: "3rem", color: "#ff6b6b" }}>404 - Page Not Found</h1>
    <p style={{ fontSize: "1.2rem", color: "#555" }}>
      The page you are looking for does not exist or may have been removed.
    </p>
    <button
      onClick={() => window.history.back()}
      style={{
        marginTop: "20px",
        padding: "10px 20px",
        fontSize: "1rem",
        color: "#fff",
        backgroundColor: "#007bff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
      }}
      onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
      onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
    >
      Return Back
    </button>
  </div>
  
  );
}

export default App;
