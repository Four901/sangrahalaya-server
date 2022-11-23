import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faPlusCircle,faCancel,faSave } from '@fortawesome/free-solid-svg-icons';
import BarScanner from "./BarScanner";

import {useEffect , useState } from 'react';
import ItemsItem from './ItemsItem';


const Left = (props) => {
    const host="https://sangrahalaya.herokuapp.com";
    const StringAuthToken=localStorage.getItem("token")
    const SetItemsList=props.SetItemsList;
    const itemsList=props.itemsList;
  
    const[items,setItems]=useState([]);
    
    
    
    const [clicked,setClicked]=useState("F")
     
    const[addAdder,setAddAdder]=useState("");
    const[rep,setRep]=useState("");


    const  makeid=(length)=> {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
  }

 


    const handleBar=(data)=>{
   
      //console.log(rep+" "+data)
    if(rep===data)
    {
      //console.log("yessss")
      setRep(data)
      setAddAdder({id:makeid(4),data:data});
    }
    else
    {
      
  
  
     let newArr=[];
     let arr1=[...itemsList]
     items.map((item)=>{
      if(item.barCode===data)
      {
        
        newArr.unshift({description:item.description,barCode:item.barCode,inInventory:item.inInventory});
       var iss=0;
       var rm="";
       //arr1.unshift({description:item.description,issued:0,remark:""})
       
       for(let i=0;i<arr1.length;i++)
        {
          
          if(arr1[i].description===item.description)
          {
            //console.log("ohkhkhk")
           iss=arr1[i].issued;
           rm=arr1[i].remark
    
         arr1 = arr1.filter((it) => it.description !== item.description);

           // arr1=removeByAttr(arr1, arr1[i].description, item.description);
           //console.log("tttt "+arr1[i].description)
           //console.log(arr1)
            break;
          }
        }
          arr1.unshift({description:item.description,issued:iss,remark:rm})
        
        
      }
      else{
        newArr.push({description:item.description,barCode:item.barCode,inInventory:item.inInventory});
       }
     })
     //console.log("scanned "+data)
     //console.log(newArr)
     setItems(newArr)
     SetItemsList(arr1)
     //console.log("dsfrg")
     //console.log(arr1)
     setRep(data)
     setAddAdder({id:makeid(4),data:data});
    }
  }
   

    const changeItem=(it)=>{
     //console.log(it)
     let ind=it.index;
     let number=it.number;
     let newArr=[...itemsList];
     newArr[ind].issued=number;
     SetItemsList(newArr)
     //console.log("ohk2")
     //console.log(itemsList)
    }


   
    const [str,setStr]=useState("")
    
    const onChange1=(e)=>{
       setStr(e.target.value)
    }

    const addItem=async()=>{
      if(clicked==='F')
      {
        setStr("")
        setClicked("T")
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
       setClicked("F");
       fetchAllItems();
  
        setClicked("F");
        setStr("")
      }
      else{
        setClicked("F");
        setStr("")
      }
  
    }



   

    const fetchAllItems=async()=>{
       
        const response=await fetch(`${host}/api/items/fetchallitems`,{
            method:"GET",
            headers:{
              'auth-token': StringAuthToken,
              'Content-Type': 'application/json'
            }});

            const json=await response.json();
           
            const arr=[]
            const arr1=[]
           
            json.map((it)=>{
              arr.push({description:it.description,barCode:it.barCode,inInventory:it.inInventory});
              arr1.push({description:it.description,issued:0,remark:""})
            })
      
            setItems(arr);
            SetItemsList(arr1)
           
            //console.log(itemsList)

    }
    
  useEffect(() => {
    fetchAllItems();
    // eslint-disable-next-line
}, []);
  
  return (
    
    <div >
<div style={{backgroundColor:'#e6ffee'}}>


<div style={{
        display:'flex',
        alignContent:'center',
        justifyContent:'left',
        paddingLeft:'30px',
        paddingTop:'5px',
        marginLeft:'70px'
        
    }}>

 <button type="button" className="btn  border border-primary rounded btn-lg" onClick={()=>{setClicked("T")}}> Add Item <FontAwesomeIcon icon={faPlusCircle} /></button>
  
</div>
<div>
{clicked==='T'?<>
   <div style={{display:'flex',marginTop:'8px'}}>
   <form className="d-flex mx-5" data-toggle="tooltip" data-placement="bottom" title="Type To Add">
        
        <input className="form-control form-control-lg me-4 border border-info rounded-pill " type="text" placeholder="type to add" aria-label="Type to add" value={str}onChange={onChange1}/>
       </form>
   <button type="button" className="btn  border border-primary rounded btn-lg" onClick={addItem}>Save <FontAwesomeIcon icon={faSave} /></button>
   <button type="button" className="btn  border border-primary rounded btn-lg mx-3" onClick={()=>{setClicked("F")}}> Cancle<FontAwesomeIcon icon={faCancel} /></button>
  
    

   </div>
   </>:
   ""
   } 
</div>

     
     <div className='scroll' style={{display:'absolute',
  alignContent:'center',
  justifyContent:'center',
  backgroundColor:'#e6ffee',
  padding:'15px',marginTop:'10px',overflowY:'scroll',maxHeight:'467px'}}>



      <table  className="table  table-bordered table-responsive table-striped" >
 
  <tbody className="table  table-bordered table-responsive  " >
    
    <tr >
    {items.map((item,index)=> {return <ItemsItem key={item.barCode} index={index} addAdder={addAdder} changeItem={changeItem} obj={item} />})}
    </tr>
  </tbody>
</table>
</div>
<div>
        <BarScanner handleBar={handleBar}/>  
      </div>
     
    </div>
    </div>
    
  )
}

export default Left