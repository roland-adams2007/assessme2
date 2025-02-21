/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import CourseSelection from './CourseSelection';
import Profile from './Profile';
import Questions from './Questions';
import Score from './Score';
import History from './ScroreHistory';

const Home = ({ setMainTab }) => {
    const currentYear = new Date().getFullYear();
    const [navTab, setNavTab] = useState(localStorage.getItem('navTab') || 'courseSelection');
    // const [isQuestionsActive, setIsQuestionsActive] = useState(false);
    const [userDetails, setUserDetails] = useState({});
    const [activeTab, setActiveTab] = useState(false);
    const [results, setResults] = useState(null);

    useEffect(() => {
        if (navTab) {
            const params = new URLSearchParams(window.location.search);
            params.set('navtab', navTab);
            window.history.replaceState(null, '', `?${params.toString()}`);
        }
    }, [navTab]);



    useEffect(() => {
        localStorage.setItem('navTab', navTab);
    }, [navTab]);

    useEffect(() => {
        const storedUserDetails = localStorage.getItem('userDetails');
        if (storedUserDetails) {
            setUserDetails(JSON.parse(storedUserDetails));
        } else {
            console.warn('No user details found in localStorage');
        }
    }, []);

    // const handleIsQuestionsActive = useCallback((isActive) => {
    //     setIsQuestionsActive(isActive);
    // }, []);

    const handleSetNavTab = (tab) => {
        setNavTab(tab);
    };

    const handleSetActiveTab = (active) => {
        setActiveTab(active);
    };

    useEffect(() => {
        handleSetActiveTab(false);
    }, [navTab]);

    const handleSetResult = (result) =>{
      setResults(result);
    }

    return (
        <div className="h-screen bg-gray-100 overflow-hidden">
            <div className="flex h-full">
                <Navbar setNavTab={handleSetNavTab} setActiveTab={handleSetActiveTab} activeTab={activeTab} setMainTab={setMainTab} />

                <div className="flex-1">
                    <div className="w-full h-full flex flex-col">
                        <header className="flex items-center justify-between h-20 bg-white shadow p-4 shadow-md sticky top-0">
                            <button id="menuOpen" onClick={() => handleSetActiveTab(true)} className="md:hidden text-gray-600 text-2xl border bg-blue-500 text-white text-sm md:text-lg">
                               Menu
                            </button>
                            <div className="flex items-center space-x-4">
                                <p className="text-gray-800 font-medium">Welcome, {userDetails.name || 'Loading...'}!</p>
                            </div>
                        </header>

                        {navTab === 'courseSelection' && (
                            <CourseSelection setNavTab={handleSetNavTab} />
                        )}

                        {navTab === 'profile' && (
                            <Profile setMainTab={setMainTab} />
                        )}

                        {navTab === 'history' && (
                            <History />
                        )}

                        {navTab === 'questions' && (
                            
                            <Questions  setResults={handleSetResult} setNavTab={handleSetNavTab} />
                        )}

                        {navTab === 'score' && (
                            <Score results={results} setNavTab={handleSetNavTab} />
                        )}

                        <footer className="h-16 flex-col flex items-center justify-center bg-white shadow-md sticky bottom-0 px-3 py-6 mt-4 text-center">
                            <p className="text-sm text-gray-600">© {currentYear} AssessMe. All Rights Reserved.</p>
                            <p className="text-xs">Made with ❤️ by DOCMOS, Department of Educational Technology.</p>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
