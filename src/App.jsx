
import Account from "./assessme/Account";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Course from "./assessme/Course";
import Questions from "./assessme/Questions";
import NotFound from "./assessme/NotFound";
import Score from "./assessme/Score";
import { Analytics } from '@vercel/analytics/react';




function App() {

   const [tabs,setTabs]=useState('account');
  const [results,setResults]=useState(null)

   const handleSetTabs = (tab) =>{
     setTabs(tab);
   }

 
   return(
    <>
     {tabs === 'account' ? (<Account setTab = {handleSetTabs} />) : 
     tabs === 'courses' ? (
      <Course setTab = {handleSetTabs} />
     ) : 
     tabs === 'questions' ? (
      <Questions setTab={handleSetTabs} setResults={setResults}/>
     ) : 
     tabs === 'score' ? (
      <Score setTab = {handleSetTabs} results={results}/>
     ):(<NotFound setTab = {handleSetTabs}/>)}
     <Analytics />
    </>
   )
  
}

export default App
