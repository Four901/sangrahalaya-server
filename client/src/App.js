import React,{useState} from 'react'
import Navbar from './components/Navbar'

import FetchPage from './components/FetchPage';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import GatePage from './components/GatePage';
import Home from './components/Home';
import Reports from './components/Reports';
import SignUp from './components/SignUp';
import Login from './components/Login';


function App() {

  const [alert, setalert] = useState("");


  const showAlert=(message,type)=>{
    //console.log("yaahin par")
    setalert({
      text:message,
      type:type
    })
    setTimeout(()=>{
    setalert(null);
    },1500);
    
   }


/*
const loadHTML = async () => {
    const filePath = path.resolve(__dirname, 'BarCodeInventory/barcodeinventory/src/components/vidBarCode.html');
    const html = await fs.readFile(filePath, 'utf8');
    return html;
}*/
//C:\Users\Ashish Meena\React\BarCodeInventory\barcodeinventory\src\components\vidBarCode.html


/*
  let code = "";
  let reading = false;
  
  document.addEventListener('keypress', e => {
    //usually scanners throw an 'Enter' key at the end of read
     if (e.keyCode === 13) {
            if(code.length > 10) {
              //console.log("code")
              //console.log(code);
              /// code ready to use                
              code = "";
           }
      } else {
          code += e.key; //while this is not an 'enter' it stores the every key            
      }
  
      //run a timeout of 200ms at the first read and clear everything
      if(!reading) {
          reading = true;
          setTimeout(() => {
              code = "";
              reading = false;
          }, 200);  //200 works fine for me but you can adjust it
      }
  });*/
/*
  const [result, setResult] = useState("No Result");

  var barcode="";
  var interval;
  const handleBarcode=(scanned_barcode)=>{
     setResult(scanned_barcode)
     //console.log(" kmnf")
     //console.log(scanned_barcode)
  }
 
      
    var num= document.addEventListener('keydown',function(evt){
         //console.log(evt)
          if(interval)
          { 
              clearInterval(interval)
          }
  
          if(evt.code=='Enter')
          {
              if(barcode)
              {
                  handleBarcode(barcode)
                  barcode="";
                  return ;
              }
          }
          if(evt.key!='shift')
          {
              barcode +=evt.key;
              interval=setInterval(()=>barcode='',5);
          }
        });
    
  // //console.log(num)*/

  return (
<Router>
<Navbar  />

<div >


  {localStorage.getItem('token')?
  <Routes>
<Route exact path="/scan"  element={ <FetchPage  />} />
<Route  exact path="/create"  element={ <GatePage />} />
<Route  exact path="/reports"  element={ <Reports />} />
<Route   path="/"  element={ <Home />} />
</Routes>:<Routes> 
<Route exact path="/sign-up"  element={ <SignUp showAlert={showAlert} />} />

<Route  exact path="/sign-in"  element={ <Login showAlert={showAlert} />} />

<Route  path="/"  element={ <SignUp showAlert={showAlert} />} />

  </Routes>}

</div>

</Router>
     
  );
}

export default App;
