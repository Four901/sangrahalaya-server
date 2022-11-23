import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {faAnglesDown,faSign, faSignIn, faSignOut} from '@fortawesome/free-solid-svg-icons';

import {
   Link,
  useNavigate
  } from 'react-router-dom'

const Navbar = (props) => {
   const navigate=useNavigate()
  //  let location = useLocation();

   /* useEffect(() => {
      //console.log(location.pathname)
    }, [location]);*/
   
    const funti=()=>{
      localStorage.removeItem("token")
      
      navigate("/sign-in")
      window.location.reload();
      
    }
  
    
   
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{width:'100%',backgroundColor:'#ff5c33',textEmphasisColor:'#3333cc'}}>
  <div className="container-fluid">
     

             <ul className="navbar-nav me-auto mb-2 mb-lg-1">
        <li className="nav-item">
          <Link className="nav-link mx-2" style={{textDecoration:'none'}} aria-current="page" to="/"> <div>
          <span style={{color:"#000066",fontFamily:"Garamond",fontSize:"25px",textDecoration:'none'}} data-toggle="tooltip" data-placement="bottom" title="SangrahaLaya - Ioc Stores With Bar" >SangrahaLaya</span>
            </div>
            <i style={{color:"#ffffff",fontFamily:"Garamond",fontSize:"15px",textDecorationLine:'none'}} data-toggle="tooltip" data-placement="bottom" title="SangrahaLaya - Ioc Stores With Bar" >Ioc Stores With BarCode</i>
             </Link>
          
         
        </li>
   </ul>


    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

  
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item " >
        {localStorage.getItem('token')?<Link  className="nav-link mx-4"  style={{fontSize:'15px'}}  to="/create">Create</Link>
        : <Link className="nav-link mx-4" style={{fontSize:'15px'}} to="/sign-up">Create</Link>
      }  </li>
        <li className="nav-item">
          {localStorage.getItem('token')?<Link className="nav-link mx-4" style={{fontSize:'15px'}} to="/scan">Scan</Link>
           : <Link className="nav-link mx-4" style={{fontSize:'15px'}} to="/sign-up">Scan</Link>
           } 
       
        </li>
       
        <li className="nav-item">
           {localStorage.getItem('token')?<Link className="nav-link mx-4" style={{fontSize:'15px'}} to="/reports">Reports</Link>
          : <Link className="nav-link mx-4" style={{fontSize:'15px'}} to="/sign-up">Reports</Link>
           }
      
        </li>

        </ul>

        
        <ul className="navbar-nav   mb-lg-0">
      
        {localStorage.getItem("token")?
         <>
          <li className="nav-item">
          <Link className="nav-link " to="/user-functions"><FontAwesomeIcon className='fas  fa-1x' data-toggle="tooltip" data-placement="bottom" title="User Dropdown" icon={faAnglesDown} /></Link>
         </li>
          <li className="nav-item ">
         <Link className="nav-link" ><FontAwesomeIcon className='fas  fa-2x' icon={faSignOut} data-toggle="tooltip" data-placement="bottom" onClick={funti} title="Logout"/></Link>
         </li>

        

         </>:<>
         <li className="nav-item ">
         <Link className="nav-link" to="/sign-up"><FontAwesomeIcon className='fas  fa-2x' icon={faSign} title="SignUp"/></Link>
         </li>
          <li className="nav-item">
          <Link className="nav-link " to="/sign-in"><FontAwesomeIcon className='fas  fa-1x'  title="SignIn" icon={faSignIn} /></Link>
         </li>
         </>
        
        }
       

      </ul>
    
     </div>
    </div>
  </nav>

)
};

export default Navbar;
