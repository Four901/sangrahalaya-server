import React,{useEffect , useState} from 'react'

import CreatePage from './CreatePage';
import Row1 from './Row1';
var image=require('./iocl.ico')

const GatePage = () => {
 /* const refOpen = useRef(null);
  const refClose= useRef(null);*/
  const host="https://sangrahalaya.herokuapp.com";
  const StringAuthToken=localStorage.getItem("token")
  const [date,setDate]=useState("")
 const getDate=()=>{
   //console.log("nithing")
   var date = new Date().toDateString();
      //console.log(date)
      setDate(date)
  }
  const [user,SetUser]=useState({Address:"",Department:"",Location:"",NoOfIssues:0,NoOfMrns:  0,Region: ""})
  const getuser=async()=>{
    //console.log("getting ornot")
    
      const response=await fetch(`${host}/api/auth/getbasicuser`,{
      method:"GET",
      headers:{
        'auth-token': StringAuthToken,
        'Content-Type': 'application/json'
      }
       });
    const json=await response.json();

    if(json.Success)
    {
      SetUser(json.opt);
      //console.log("want user")
      //console.log(user)
    }
    else
    {
      
    }

  }
  
  const [addClicked,setAddClicked]=useState("F");

 

  const  makeid=(length)=> {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
const [dropDownlist,setdropDownlist]=useState([])
const fetchAllItemsDescriptions=async()=>{

  const response=await fetch(`${host}/api/items/fetchallitemsdescriptions`,{
    method:"GET",
    headers:{
      'auth-token': StringAuthToken,
      'Content-Type': 'application/json'
    }});
    const json=await response.json();
    setdropDownlist(json)
     //console.log(json)
 }
  
  const addNewItem=async(str)=>{
    if(addClicked==='F')
    {
      setAddClicked("T")
    }
    else if(str!=null){

     //check for duplication 
      const barcode=makeid(8);
      
      //console.log(str)
      const response=await fetch(`${host}/api/items/additems`,{
        method:"POST",
        headers:{
          'auth-token': StringAuthToken,
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({Description:str,barCode:barcode})});
       

       //console.log(json)
     //creating new item with desc
     setAddClicked("F");
     fetchAllItemsDescriptions();

      setAddClicked("F");

    }
    else{
      setAddClicked("F");
    }

  }


  const [supplierNameAndAddress,setSupplierNameAndAddress]=useState({type:""})
  const [issuedBy,setIssuedBy]=useState({type:""})
  
  const onChange1=(e)=>{
    setSaved("F");
    setSupplierNameAndAddress({...supplierNameAndAddress,[e.target.name]:e.target.value})
  }

  const onChange2=(e)=>{
    setSaved("F");
    setIssuedBy({...issuedBy,[e.target.name]:e.target.value})
  }

const initialProducts=[{AsPerPo:"",RecdUptoDate:"",Description:"",Code:"",QtyReceived:"",QtyAccepted:"",Rs:"",P:""}];
     
const [products,setProducts]=useState(initialProducts);
     
const done=(str)=>{
  if(str==='T')
  {
    //console.log("it is printed")
    setSaved("F");
    setSupplierNameAndAddress({type:""})
    setIssuedBy({type:""})
    setProducts(initialProducts)
  }
}
const handleAddRow=()=>{
  setSaved("F");
  //refOpen.current.click();
  setProducts(products.concat({AsPerPo:"",RecdUptoDate:"",Description:"",Code:"",QtyReceived:"",QtyAccepted:"",Rs:"",P:""}));
}

const [saved,setSaved]=useState("F")

const saveHandle=()=>{
  setSaved("T");
}

const [clickedIndex,setClickedIndex]=useState("");



const descriptionSetter=(str)=>{
  if(str[0]!=null)
  {
     //console.log(str[0]+" "+clickedIndex)
  let newArr=[...products];
  //console.log(newArr)
   
 newArr[clickedIndex-1].Description=str[0];

  setProducts(newArr)
  }
  
}


const onChange=(e)=>{
        setSaved("F");
        let newArr=[...products];
       
         let str=e.target.name;

        // setProducts(...newArr,{...newArr[clickedIndex-1],[e.target.name]:e.target.value})
        newArr[clickedIndex-1][str]=e.target.value;
        //newArr[clickedIndex-1].[e.target.name]=e.target.value;
        setProducts(newArr)
     
      
}

useEffect(() => {
  getuser();
  getDate();
  fetchAllItemsDescriptions();

  // eslint-disable-next-line
}, []);

  return (
    <div className="full-window"  style={{width:'100%',height:'100%',backgroundColor:'#e6ffee'}}>
   
    <div className='container  '>
        <table className="table table-bordered" style={{borderStyle:'solid'}}>
  <tbody>
  <tr>
    <th rowSpan="2" colSpan='4'>
       <div>
        <span >
        
            <img src={image} alt={'iocl'} style={{height:'70px',width:'70px',marginLeft:'10px',marginTop:'10px'}} />
        </span>
       
        <span style={{float:'right',padding:'5px',marginRight:'150px'}}>
   
    <h2><b>सामग्री प्राप्ति नोट</b></h2>
    <span><h4>MATERIAL RECEIPT NOTE</h4></span>
    <div><b><h4>पूर्णतः/अंशतः FULL/PARTIAL</h4></b></div>
    
        </span>
        

       </div>
    </th>
    <td colSpan='3'>
        <div style={{display:'flex'}}>
        <div>
         <div>
        <b>स्थान/विभाग </b>
         </div>
         <div>
           <b>LOCATION/DEPTT.</b> 
         </div>
        </div>
        <div style={{fontSize:'15px',marginLeft:'30px',marginTop:'5px'}}><b>{user.Department+" "+user.Location}</b></div>
        </div>
        
    </td>
    <td colSpan='2'>
      <div style={{display:'flex'}}>
        <div>
            <div>
            <b>संख्या</b> 
            </div>
            <div>
               <b>NO.</b> 
            </div>
        </div>
        <div style={{fontSize:'15px',marginLeft:'30px',marginTop:'5px'}}><b>{user.Location+"/"+user.NoOfMrns}</b></div>
        </div>
        
    </td>
  </tr>
  <tr>
    <td colSpan='3'>
      <div style={{display:'flex'}}>
         <div>
        <div>
      <b>रीजन </b>  
           </div>
           <div>
           <b >REGION</b>   
           </div>
        </div>
        <div style={{fontSize:'15px',marginLeft:'30px',marginTop:'5px'}}><b>{user.Region+" "}Region</b></div>
        </div>
      
        
    </td>
    <td colSpan='2'>
      <div style={{display:'flex'}}>
        <div>
            <div>
           <b>दिनांक</b> 
            </div>
            <div>
              <b>DATE</b>  
            </div>
        </div>
        
        <div style={{fontSize:'15px',marginLeft:'30px',marginTop:'5px'}}><b>{date}</b></div>
        </div>
      
        
    </td>
  </tr>
  <tr>
    <th rowSpan="2" colSpan='5' >
 
      <div style={{display:'flex',paddingTop:'10px'}}>
        <span>
        <div >
       पुर्तिकार का नाम व पता 
        </div>
        <div >
            SUPPLIER'S NAME & ADDRESS
        </div>
        </span>
        <div  style={{marginLeft:'15px',width:'370px',paddingTop:'15px'}}>
        <form className="form" >
      <textarea style={{fontSize:'15px'}} rows={'3'} className="form-control" id="supplierNameAndAddress"  value={supplierNameAndAddress.type}  name="type" onChange={onChange1} />
      </form>
        </div>
      </div>
     
      
     
        
    </th>
    <td colSpan='4'>
      <div>
        <div>
         <b>क्रय आदेश और तिथि </b>
        </div>
        <div>
          <b>PURCHASE ORDER/DES.</b>
        </div>
        <div>
          <b>ADV. NO. AND DATE</b>
        </div>
      </div>
    </td>
   
  </tr>
  <tr>
   
    <td colSpan='4'>
    <div style={{display:'flex'}}>
      <span>
        <div>
         <b>जारीकर्ता</b>
        </div>
        <div>
          <b>ISSUED BY</b>
        </div>
        </span>
        <span style={{marginLeft:'20px',width:'300px'}}>
        <form className='form'>

<input type='text'style={{fontSize:'15px'}} className="form-control" id="issuedBy" value={issuedBy.type}  name="type" onChange={onChange2}/>
</form>
  
        </span>

       
      </div>
    </td>
  </tr>
  <tr>
    <td rowSpan="2" style={{width:'5%'}}>
      <div style={{paddingTop:'20px'}}>
        <div>
       <b>क्रम संख्या</b> 
        </div>
        <div>
          <b>S. NO.</b>
        </div>
      </div>
    </td>
    <td colSpan='2' style={{width:'20%'}}>
      <div style={{display:'flex',paddingLeft:'30px'}} >
        <div>
          <b>मात्रा</b>
        </div>
        <div className='mx-3'>
          <b>QUANTITY</b>
        </div>
      </div>
    </td>
    <td rowSpan="2" style={{width:'25%'}}>
      <div style={{display:'block',marginLeft:'80px',marginTop:'15px'}}>
        <div style={{marginLeft:'25px'}}>
      <b>वर्णन</b>
        </div>
        <div>
          <b>DESCRIPTION</b>
        </div>
      </div>
      </td>
    <td rowSpan="2" style={{width:'10%'}}>
    <div style={{display:'block',marginLeft:'20px',marginTop:'15px'}}>
        <div style={{marginLeft:'5px'}}>
      <b>कोड</b>
        </div>
        <div>
          <b>CODE</b>
        </div>
      </div>
    </td>
    <td rowSpan="2" style={{width:'10%'}}>
    <div style={{display:'block',marginLeft:'10px',marginTop:'15px'}}>
        <div style={{marginLeft:'10px'}}>
      <b>प्राप्त मात्रा</b>
        </div>
        <div style={{display:'inline'}}>
          <b>Qty.RECEIVED</b>
        </div>
      </div></td>
    <td rowSpan="2" style={{width:'10%'}}>
    <div style={{display:'block',marginLeft:'10px',marginTop:'15px'}}>
        <div style={{marginLeft:'10px'}}>
        <b>स्वीकृत मात्रा</b> 
        </div>
        <div>
         <b>Qty.ACCEPTED</b>
        </div>
      </div>
    </td>
    <td colSpan='2' style={{width:'20%'}}>
    <div style={{marginLeft:'50px'}}>
        <span >
        <b>मूल्य</b> 
        </span>
        <span className='mx-3'>
          <b >VALUE</b>
        </span>
      </div>
    </td>
    
  </tr>
    <tr>
      
      <td style={{width:'10%'}}>
        <div>
          <div>
          <b>आदेशित</b>
          </div>
          <div>
          <b>AS PER P.O.</b>   
          </div>
        </div>
      </td>
      <td style={{width:'10%'}}>
        <div>
          <div>
        <b>अब तक प्राप्ति</b>
          </div>
          <div>
      <b>RECD. UPTO DATE</b>
          </div>
        </div>
      </td>
      
    <td style={{width:'70px'}}>
    <div style={{display:'block',marginLeft:'10px',marginTop:'15px'}}>
        <span>
        <b>रूo</b> 
        </span>
        <span className='mx-3'>
          <b >Rs.</b>
        </span>
      </div>
    </td>
    <td style={{width:'30px'}}>
    <div style={{display:'block',marginLeft:'10px',marginTop:'15px'}}>
        <span>
        <b>पैo</b> 
        </span>
        <span className='mx-3'>
          <b >P.</b>
        </span>
      </div>
    </td>
    </tr>
      
      {products.map((pro,index)=>{
        
         return  <Row1 key={index} len={products.length} dropDownlist={dropDownlist} addClicked={addClicked} addNewItem={addNewItem} descriptionSetter={descriptionSetter} index={(index+1)} pro={pro} onChange={onChange} setClickedIndex={setClickedIndex}/>
      })}
  </tbody>
</table>
  <div>
    <span>
        <button className="btn btn-primary" onClick={handleAddRow}>Add Row</button>
    </span>


    
    <span>
        <button className="btn btn-primary mx-5" disabled={!products.length} onClick={saveHandle}>Save</button>
    </span>
  </div>



{/*
  <button type="button" ref={refOpen} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
  <div className="modal-dialog modal-lg" style={{
        display:'flex',
        alignContent:'center',
        justifyContent:'center',
        
        
    }} >
    <div className="modal-content"  >
      <div className="modal-header" style={{backgroundColor:'#ff8080'}}>
        <h5 className="modal-title" id="exampleModalLabel">Search or Add Description</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>




      <div className="modal-body"  style={{backgroundColor:'#80aaff'}}>
      
     {//console.log("svergb")}
     <form className='my-3'>
      <div className="mb-3">
    <label htmlFor="question" className="form-label">Query</label>
    <input type="text" className="form-control" id="question"    name="question" />
    </div>
  
  <div className="mb-3">
    <label htmlFor="type" className="form-label">Type</label>
    <input type="text" className="form-control" id="type"  name="type" />
  </div>
  <div className="mb-3">
    <label htmlFor="division" className="form-label">Division</label>
    <input type="text" className="form-control" id="division"   name="division" />
  </div>
</form>
{i need to create the list here}
    
      </div>
      <div className="modal-footer">
        <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
         </div>
    </div>
  </div>
</div>*/}




  {saved==='T'?<CreatePage date={date}  done={done} supplierNameAndAddress={supplierNameAndAddress.type} issuedBy={issuedBy.type} products={products} />:""}
   

  



    </div>
    </div>
  )
}

export default GatePage