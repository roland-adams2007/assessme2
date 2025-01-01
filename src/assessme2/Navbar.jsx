import { Cookies } from "react-cookie";

const Navbar = ({setNavTab,setActiveTab,activeTab,setMainTab}) => {

    const cookies = new Cookies();

    const handleLogout = (e) => {
        e.preventDefault();
    
        const userStatus = cookies.get("userStatus");
    
        if (userStatus) {
            cookies.set("userStatus", "NotActive", { path: "/", maxAge: 432000 });
            window.history.replaceState(null, "", "/");
            setMainTab("account");
        }
    

    };
    
    
  return (
    <>

        <aside id="sidebar" className={`${!activeTab && 'hidden'} absolute h-full z-30 md:relative md:block w-[250px] bg-blue-600 text-white shadow-lg`}>
        <div className="h-full flex flex-col">
            <div className="p-4 text-center bg-blue-700">
                <div className="w-full h-full flex justify-between items-center">
                    <div className="flex items-center justify-center space-x-3">
                        <i className="fas fa-clipboard-list text-2xl"></i> 
                        
                        <h1 className="text-lg font-bold">AssessMe</h1>
                    </div>
                    <button id="menuClose" onClick={()=>setActiveTab(false)} className="md:hidden text-white text-2xl">
                        <i className="fas fa-x"></i>
                    </button>
                </div>
            </div>
            <nav className="flex-1 mt-6 px-4 space-y-4">
                <a href="#" onClick={(e)=>setNavTab(e,'courseSelection')} className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-blue-700 transition duration-200">
                    <i className="fas fa-home"></i>
                    <span>Dashboard</span>
                </a>
                <a href="#" onClick={(e)=>setNavTab(e,'history')} className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-blue-700 transition duration-200">
                    <i className="fas fa-history"></i>
                    <span>History</span>
                </a>
                <a href="#"  onClick={(e)=>setNavTab(e,'profile')} className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-blue-700 transition duration-200">
                    <i className="fas fa-user"></i>
                    <span>Profile</span>
                </a>
                <a href="#" onClick={e=>handleLogout(e)} className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-500 transition duration-200">
                    <i className="fas fa-sign-out-alt"></i>
                    <span>Logout</span>
                </a>
            </nav>
        </div>
       </aside> 
    
    </>
  )
}

export default Navbar
