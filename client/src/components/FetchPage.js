import React,{useState,useEffect,useRef} from "react";
import ReactToPrint from 'react-to-print';
import BarCodeGenerate from './BarCodeGenerate';
import BarScanner from "./BarScanner";

import Row from "./Row";
var image=require('./iocl.ico')

const FetchPage=()=> {
  
  const [supplierNameAndAddress,setSupplierNameAndAddress]=useState({type:""})
  const [issuedBy,setIssuedBy]=useState({type:""})
  const [storeRoomAddress,setStoreRoomAddress]=useState({type:""})
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
    
 }
  
  const addNewItem=async(str)=>{
    if(addClicked==='F')
    {
      setAddClicked("T")
    }
    else if(str!=null){

     //check for duplication 

      const barcode=makeid(8);
      
      
      const response=await fetch(`${host}/api/items/additems`,{
        method:"POST",
        headers:{
          'auth-token': StringAuthToken,
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({Description:str,barCode:barcode})});
      

      
     //creating new item with desc
     fetchAllItemsDescriptions();

      setAddClicked("F");

    }
    else{
      setAddClicked("F");
    }

  }

  const descriptionSetter=(str)=>{
  

   
   if(str[0]!=null)
   {   let newArr=[...products];
    //console.log(newArr)
    newArr[clickedIndex-1].Description=str[0];
    setProducts(newArr)
   }
  
 
   
 }







  const onChange1=(e)=>{
    //setSaved("F")
    setSupplierNameAndAddress({...supplierNameAndAddress,[e.target.name]:e.target.value})
  }
  const onChange2=(e)=>{
    //setSaved("F")
    setIssuedBy({...issuedBy,[e.target.name]:e.target.value})
  }
  const onChange3=(e)=>{
   // setSaved("F")
    setStoreRoomAddress({...storeRoomAddress,[e.target.name]:e.target.value})
  }

  
  
  const host="https://sangrahalaya.herokuapp.com";
  const StringAuthToken=localStorage.getItem("token")
  const [id,setId]=useState("")
  const[barCodeNumber,setBarCodeNumber]=useState("");

  const [products,setProducts]=useState([])

  const[saved,setSaved]=useState("F")
  
  const componentRef = useRef(null);
  const componentRef1 = useRef(null);
  
  const[date,setDate]=useState("")
  
  const removeCurrent=async()=>{
   
    const response=await fetch(`${host}/api/current/removecurrent`,{
      method:"POST",
      headers:{
        'auth-token': StringAuthToken,
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({decodedText:"Scan Something"})
 
    });
  
   
  }
  
  const saveHandle1=async()=>{
   
    let newarr=[];
     products.map((product)=>{
      if(product!==null&&product.Description&&(product.QtyReceived||product.QtyAccepted))
      {
       newarr.push(product)
      }
    })
   
  if(!newarr.length)return;

   const response=await fetch(`${host}/api/inventory/updateinventory/${id}`,{
    method:"PUT",
    headers:{
      'auth-token': StringAuthToken,
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({Entry:newarr,supplierNameAndAddress:supplierNameAndAddress.type,issuedBy:issuedBy.type,storeAddress:storeRoomAddress.type})
  });
 
  const response1=await fetch(`${host}/api/auth/addissues`,{
    method:"POST",
    headers:{
      'auth-token': StringAuthToken,
      'Content-Type': 'application/json'
    }
     });
 // console.log(json)

  
     setSaved("T");
     removeCurrent();
     
  }

  const ItemsUpdater=async(it)=>{
     
    const response=await fetch(`${host}/api/items/updateitem`,{
      method:"PUT",
      headers:{
        'auth-token': StringAuthToken,
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({Description:it.desc,inInventory:it.qty,reports:{curdate:new Date().toDateString(),type:"Add",number:it.qty,remains:Number(it.qty),remark:""}})});
      const json=await response.json();
      //console.log("After update")
      //console.log(json)
   
    }



   const updateReceivedItems=()=>{
    products.map((product)=>{
    //  console.log(product.Description+" "+product.QtyAccepted)
    if(product.QtyAccepted!=null)
    {
      ItemsUpdater({desc:product.Description,qty:product.QtyAccepted})
    }
    else if(product.QtyReceived!=null)
    {
      ItemsUpdater({desc:product.Description,qty:product.QtyReceived})
    }
   })
  }

  const saveHandle=()=>{
    saveHandle1();
    updateReceivedItems();
}
  
const fetchCurrentItem=async()=>{
  setSaved("F")
  const response=await fetch(`${host}/api/current/getcurrentshow`,{
    method:"GET",
    headers:{
      'auth-token': StringAuthToken,
      'Content-Type': 'application/json'
    }
  });

  const json=await response.json();
        //console.log(json.inventory[0])
        
        //setMRN(json)
        setIssuedBy({"type":json.inventory[0].issuedBy})
        setSupplierNameAndAddress({"type":json.inventory[0].supplierNameAndAddress})
        setStoreRoomAddress({"type":json.inventory[0].storeAddress})
        setBarCodeNumber(json.inventory[0].barCode)
        setProducts(json.inventory[0].Entry)
        setId(json.inventory[0]._id)
        setDate(json.inventory[0].date)
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
     //console.log(json)
    if(json.Success)
    {
      SetUser(json.opt);
     // console.log("want user")
     // console.log(user)
    }
    else
    {
      
    }

  }

useEffect(() => {
  fetchCurrentItem();
  fetchAllItemsDescriptions();
  getuser();
  // eslint-disable-next-line
}, []);

const checkBar=async(barcode)=>{
  
  const response=await fetch(`${host}/api/current/putcurrentshow`,{
    method:"POST",
    headers:{
      'auth-token': StringAuthToken,
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({decodedText:barcode})
  });
  setSupplierNameAndAddress({type:""})
  setIssuedBy({type:""})
  setStoreRoomAddress({type:""})
  setDate("");
  fetchCurrentItem();
  setBarCodeNumber(barcode)
  //console.log("everything done")
}


const [clickedIndex,setClickedIndex]=useState("");
const onChange=(e)=>{
 // setSaved("F")
        let newArr=[...products];
       
         let str=e.target.name;
        // setProducts(...newArr,{...newArr[clickedIndex-1],[e.target.name]:e.target.value})
        newArr[clickedIndex-1][str]=e.target.value;
        //newArr[clickedIndex-1].[e.target.name]=e.target.value;
        setProducts(newArr)
     
}
           
const handleBar=(data)=>{
   //console.log("barcode 3434 "+data)
   checkBar(data)

}
          
           

  return (
    <div className="full-window"  style={{width:'100%',height:'100%',backgroundColor:'#e6ffee'}}>
    <div className="container full-window"  style={{width:'100%',height:'84.5vh',backgroundColor:'#e6ffee'}}>

<div className='container  ' ref={componentRef}>
        <table className="table table-bordered" style={{borderStyle:'solid'}}>
  <tbody>
  <tr>
    <th rowSpan="2" colSpan='4'>
       <div>
        <span >
        
            <img src={image}  alt={'iocl'}style={{height:'70px',width:'70px',marginLeft:'10px',marginTop:'10px'}} />
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
    <td colSpan='3'>
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
    <td colSpan='3'>
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
    <th rowSpan="2" colSpan='6' >
 
      <div style={{display:'flex',paddingTop:'10px'}}>
        <span>
        <div style={{fontSize:'12px'}}>
       पुर्तिकार का नाम व पता 
        </div>
        <div style={{fontSize:'12px'}}>
            SUPPLIER'S NAME & ADDRESS
        </div>
        </span>
        {saved==='F'?<div  style={{marginLeft:'20px',width:'420px',paddingTop:'15px'}}>
        <form className="form" >
      <textarea style={{fontSize:'15px'}} rows={'3'} className="form-control" id="supplierNameAndAddress"  value={supplierNameAndAddress.type}  name="type" onChange={onChange1} />
      </form>
        </div>:<div  style={{marginLeft:'15px',width:'370px',paddingTop:'15px'}}>
      
      <div style={{fontSize:'15px'}} >{supplierNameAndAddress.type}</div>
        </div>}
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

        <span style={{marginLeft:'30px',width:'320px'}}>
        {saved==='F'?<form className='form'>
        
<input type='text'style={{fontSize:'15px'}} className="form-control" id="issuedBy" value={issuedBy.type}  name="type" onChange={onChange2}/>
</form>:
<b style={{fontSize:'15px'}} >{issuedBy.type}</b>

}
  
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
    <td rowSpan={'2'} style={{width:'20%'}}>
      <div style={{marginLeft:'35px',marginTop:'15px'}}>
        <div style={{marginLeft:'30px'}}>
      <b>बारकोड</b>
        </div>
        <div style={{marginLeft:'25px'}}>
          <b>BARCODE</b>
        </div>
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
        
         return  <Row key={index} saved={saved}dropDownlist={dropDownlist} len={products.length} addClicked={addClicked} addNewItem={addNewItem} descriptionSetter={descriptionSetter} index={(index+1)} pro={pro} onChange={onChange} setClickedIndex={setClickedIndex}/>
      })}
       
      <tr >
        <td colSpan={'4'}>
        <div style={{display:'flex',paddingTop:'10px'}}>
        <span>
        <div style={{fontSize:'12px'}}>
       <b>संघ्रालय का पता </b>  
        </div>
        <div style={{fontSize:'12px'}}>
            <b>STORE ROOM ADDRESS</b>
        </div>
        </span>
        <div  style={{marginLeft:'15px',width:'370px',paddingTop:'15px'}}>
        {saved==='F'?<form className="form" >
      <textarea style={{fontSize:'15px'}} rows={'4'} className="form-control" id="storeRoomAddress"  value={storeRoomAddress.type}  name="type" onChange={onChange3} />
      </form>
      :<div style={{fontSize:'15px'}}><b>{storeRoomAddress.type}</b></div>}
        </div>
      </div>
        </td>
        <td colSpan={'3'} >
          <div style={{display:'flex'}}>
          <span ref={componentRef1}>
       <BarCodeGenerate  height='20px' className='ss' width='1px' displayValue={false}   barcodeNumber={barCodeNumber}/>
      
       </span>
       <span style={{marginTop:'100px'}}>
         <ReactToPrint
       trigger={() => {
         // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
         // to the root node of the returned component as it will be overwritten.
         return <i className="fa fa-print fa-lg my-4"  aria-hidden="true"></i>
    
       }}
       content={() => componentRef1.current}
     />
       </span>
      
          </div>
    
        </td>
        <td colSpan={'4'}>
         <div className="mx-5">
          <span style={{fontSize:'15px'}}>
            वितरण 
          </span>
          <span style={{fontSize:'15px'}} className='mx-3'>
            Distribution
          </span>
         </div>
         <div>
          <div style={{fontSize:'15px'}}>
           1. बिल पास करने वाले प्राधिकारी 
          </div>
          <div  style={{fontSize:'15px',marginLeft:'5px'}}>
          Bill Passing Authority
          </div>
          
         </div>
         <div>
          <span style={{fontSize:'15px'}}>
          2. पुर्तिकार
          </span>
          <span style={{fontSize:'15px',marginLeft:'3px'}}>
            Supplier
          </span>
         </div>
         <div>
          <span style={{fontSize:'15px'}}>
         3. सी.आई.पी. 
          </span>
          <span style={{fontSize:'15px',marginLeft:'5px'}}>
            C. I. P.
          </span>
         </div>
         <div>
          <span style={{fontSize:'15px'}}>
          4. कार्यालय प्रति 
          </span>
          <span  style={{fontSize:'15px',marginLeft:'6px'}}>
            Location Copy
          </span>
         </div>

        </td>
      </tr>
      {saved==='T'?<tr>
        <td colSpan={'2'}>
          <div>
            <div style={{fontSize:'12px'}}>
         निरीक्षणकर्ता 
         </div>
         <div style={{fontSize:'12px'}}>
          INSPECTED BY
         </div>
          </div>
          </td>
          <td colSpan={'2'}>
          <div >
            <div style={{fontSize:'12px'}}>
            अनुलग्नक
         </div>
         <div style={{fontSize:'12px'}}>
          ENCLOSURES
         </div>
          </div>
        </td>
        <td colSpan={'2'} >
          <div>
            <div style={{fontSize:'12px'}}>
            प्राप्तकर्ता  
         </div>
         <div style={{fontSize:'12px'}}>
          RECEIVED BY
         </div>
          </div>
          </td>
          <td colSpan={'3'}>
          <div >
            <div>
             
           <span style={{fontSize:'12px'}}>हस्ताक्षर</span>
           <span className="mx-3"  style={{fontSize:'12px'}}>SIGNATURE</span>
         </div>
         <div>
          <div style={{fontSize:'12px'}}>
            स्थल के प्रभारी अधिकारी
          </div>
         <div style={{fontSize:'12px'}}>
          Officer-in-Charge of Location
         </div>
         </div>
          </div>
       
        </td>
      </tr>:""}
  </tbody>
</table>
  {/*saved==='T'?<CreatePage supplierNameAndAddress={supplierNameAndAddress.type} issuedBy={issuedBy.type} products={products} />:""*/}
   
    </div>

  

      {saved==='F'?<div> 
      <button className="btn btn-secondary my-3 mx-3" disabled={!barCodeNumber} onClick={saveHandle}>Save</button>
     </div>:
       <ReactToPrint
       trigger={() => {
         // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
         // to the root node of the returned component as it will be overwritten.
         return <button className="btn btn-secondary my-3 mx-3">Print</button>;
       }}
       content={() => componentRef.current}
     />
      }
    
      <div>
        <BarScanner handleBar={handleBar}/>  
      </div>
     
     
    </div>
    </div>
  );
}

export default FetchPage;