import { BrowserRouter  as Router, Routes, Route } from "react-router-dom";
import Account from "./assessme/Account";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Questions from "./assessme/Questions";

function App() {
 
   return(
    <>
     <Router>
        <Routes>
          <Route path="/account" element={<Account />} />
          <Route path="/" element={<Questions/>}/>
        </Routes>
      </Router>
      <ToastContainer/>
    </>
   )
  
}

export default App
