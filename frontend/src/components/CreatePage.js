import React,{useState,useRef,useEffect} from 'react'
import ReactToPrint from 'react-to-print';
import BarCodeGenerate from './BarCodeGenerate';


const CreatePage = (props) => {
  
  
  
    
    const host="https://sangrahalaya.herokuapp.com";
    const StringAuthToken=localStorage.getItem("token")

    const [saved,setSaved]=useState("T")
    const [barCodeNumber,setBarCodeNumber]=useState("")
    const componentRef = useRef(null);
    
  const  makeid=(length)=> {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
  }
  

      const handleNewMRN=async()=>{
       
       //generating barCode number
      // setProduct({barCodeNumber:product.productName})
      // console.log(product)

      
      
       
      
     


   
      


       let newarr=[];
      props.products.map((product)=>{
        if(product!=null&&product.Description&&(product.QtyReceived||product.QtyAccepted))
        {
         newarr.push(product)
        }
      })
    
      if(!newarr.length)return

      let num=makeid(10);
      setBarCodeNumber(num)



      const response=await fetch(`${host}/api/inventory/addinventory`,{
        method:"POST",
        headers:{
          'auth-token': StringAuthToken,
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({barCode:num,Entry:newarr,supplierNameAndAddress:props.supplierNameAndAddress,issuedBy:props.issuedBy,date:props.date})
      });
      
    
      
       //setting into db
       //then navigate to print barcode
      
       const response1=await fetch(`${host}/api/auth/addmrns`,{
        method:"POST",
        headers:{
          'auth-token': StringAuthToken,
          'Content-Type': 'application/json'
        }
         });
      //const json1=await response1.json();


       setSaved("T")
       

      }
     
const printed=()=>{
  
  props.done("T")
}
   useEffect(() => {
        handleNewMRN();
        // eslint-disable-next-line
    }, []);

    return (
    <div className='container full-window'  style={{width:'100%',height:'100%',backgroundColor:'#e6ffee'}} >
      
    {saved==='T'?
    <div>

       <span >
          
           <div ref={componentRef}>
         < BarCodeGenerate  barcodeNumber={barCodeNumber}/>
            </div>
   
    <ReactToPrint
          trigger={() => {
            // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
            // to the root node of the returned component as it will be overwritten.
            return <button className='btn btn-primary' onClick={printed} >Print this out!</button>;
          }}
          content={() => componentRef.current}
        />

       
        
        </span>
        <span>
        <button className='btn btn-primary btn-lg' style={{marginLeft:'500px'}} onClick={printed}>Add New</button>
        </span>

        </div>
        :"Data Not Saved ! Try Again Please"

    }
   
    
    </div>
  )
}





export default CreatePage