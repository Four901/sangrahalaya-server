import React,{useState,useEffect,useRef} from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'; 
import ReactToPrint from 'react-to-print';
var Barcode = require('react-barcode');

const Row = (props) => {
  const componentRef1 = useRef(null);
  const host="https://sangrahalaya.herokuapp.com";
  const StringAuthToken=localStorage.getItem("token")
   const onChange=props.onChange;
   const saved=props.saved;
   const setClickedIndex=props.setClickedIndex;
   const descriptionSetter=props.descriptionSetter;
  const addClicked=props.addClicked;
  const addNewItem=props.addNewItem;
  const dropDownlist=props.dropDownlist;
  const [desc,setDesc]=useState({type:""})

  
  const[barCodeNumber,setbarCodeNumber]=useState("");
  
  const generate=async()=>{
      //console.log("hello brps")
       const response=await fetch(`${host}/api/items/fetchbarcodewithdescription`,{
        method:"PUT",
        headers:{
          'auth-token': StringAuthToken,
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({description:props.pro.Description})});
        const json=await response.json();
        //console.log("at bar "+json)
       setbarCodeNumber(json)
  }
  useEffect(() => {
    generate();
    
    // eslint-disable-next-line
  }, []);
  const onChange1=(e)=>{
    setDesc({type:e.target.value})
    //console.log("desc "+desc)
  }
  

  return (
<>

    <tr  onClick={()=> setClickedIndex(props.index)}>
          <td > 
          {props.index}
          
        </td>
      <td>
      <form className='form '>
    <div className="mb-3">
      <input type="number" style={{fontSize:'15px'}} className="form-control" id="AsPerPo"  value={props.pro.AsPerPo}  name="AsPerPo" onClick={()=>{setClickedIndex(props.index)}} onChange={onChange}/>

   </div>
    </form>
      </td>
      <td> <form className='form '>
    <div className="mb-3">
    <input type="number" style={{fontSize:'15px'}} className="form-control" id="RecdUptoDate"  value={props.pro.RecdUptoDate}  name="RecdUptoDate" onClick={()=>{setClickedIndex(props.index)}} onChange={onChange}/>
    </div>
    </form></td>
      <td><form className='form '>
    <div className="mb-3" style={{display:'flex',height:'30px'}}>
  {/* <input type="hidden" style={{fontSize:'15px'}} className="form-control" id="Description"  value={props.pro.Description} onClick={()=>{setClicked(props.index)}} name="Description" />
   */}
   
  
   {saved!=='T'&&props.index===props.len?<>
  {addClicked==='F'?   <> <Typeahead id={props.index} style={{width:'90%'}}
 defaultSelected={[props.pro.Description]}
  onChange={(selected) => {
    setClickedIndex(props.index)
    descriptionSetter(selected)
    generate()
  }}
  options={dropDownlist}
  
  />
  <div className="btn btn-info mx-2 " onClick={addNewItem}> Add New</div>
  </>
:<> <input type="text" style={{fontSize:'15px',width:'90%'}} className="form-control" id="desc"  value={desc.type}  name="desc" onChange={onChange1} />
<div className="btn btn-info mx-2 " onClick={()=>{addNewItem(desc.type)}}>Save</div></>
}
</>
:
<>
<Typeahead id={props.index} style={{width:'95%'}}
 defaultSelected={[props.pro.Description]}
  onChange={(selected) => {
    setClickedIndex(props.index)
    descriptionSetter(selected)
    generate()
  }}
  options={dropDownlist}
  
  />
</>
}


    </div>
    </form></td>
      <td><form className='form '>
    <div className="mb-3">
    <input type="text" style={{fontSize:'15px'}} className="form-control" id="Code"  value={props.pro.Code}  name="Code" onClick={()=>{setClickedIndex(props.index)}} onChange={onChange} />
</div>
    </form></td>
      <td><form className='form '>
    <div className="mb-3">
  <input type="number" style={{fontSize:'15px'}} className="form-control" id="QtyReceived"  value={props.pro.QtyReceived}  name="QtyReceived" onClick={()=>{setClickedIndex(props.index)}} onChange={onChange} />
</div>
    </form></td>
      <td><form className='form '>
    <div className="mb-3">
  <input type="number" style={{fontSize:'15px'}} className="form-control" id="QtyAccepted"  value={props.pro.QtyAccepted}  name="QtyAccepted" onClick={()=>{setClickedIndex(props.index)}} onChange={onChange}/>
</div>
    </form></td>
      <td><form className='form '>
    <div className="mb-3">
    <input type="number" style={{fontSize:'15px'}} className="form-control" id="Rs"  value={props.pro.Rs}  name="Rs" onClick={()=>{setClickedIndex(props.index)}}onChange={onChange} />
    </div>
    </form></td>
      <td><form className='form '>
    <div className="mb-3">
   <input type="number" style={{fontSize:'15px'}} className="form-control" id="P"  value={props.pro.P}  name="P" onClick={()=>{setClickedIndex(props.index)}} onChange={onChange}/>
</div>
    </form></td>
    
    <td>
    
  <div style={{display:'flex'}}>
   <span ref={componentRef1}>
    <Barcode  height='20px' className='ss' width='1px' displayValue={false}  value={barCodeNumber} />
    
    </span> 
    < span>
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
        </tr>
   {/* <tr >
          <td > 
          {props.index}
        </td>
      <td>
      <form className='form '>
    <div className="mb-3">
        {saved==='F'? <input type="number" style={{fontSize:'15px'}} className="form-control" id="AsPerPo"  value={props.pro.AsPerPo}  name="AsPerPo" onClick={()=>{setClickedIndex(props.index)}} onChange={onChange}/>
    :<div style={{fontSize:'15px'}}>{props.pro.AsPerPo}</div>}
   </div>
    </form>
      </td>
      <td> <form className='form '>
    <div className="mb-3">
    {saved==='F'?<input type="number" style={{fontSize:'15px'}} className="form-control" id="RecdUptoDate"  value={props.pro.RecdUptoDate}  name="RecdUptoDate" onClick={()=>{setClickedIndex(props.index)}} onChange={onChange}/>
    :<div style={{fontSize:'15px'}}>{props.pro.RecdUptoDate}</div>}</div>
    </form></td>
      <td><form className='form '>
    <div className="mb-3">
    {saved==='F'?<input type="text" style={{fontSize:'15px'}} className="form-control" id="Description"  value={props.pro.Description} onClick={()=>{setClickedIndex(props.index)}} name="Description" onChange={onChange}/>
    :<div style={{fontSize:'15px'}}>{props.pro.Description}</div>}</div>
    </form></td>
      <td><form className='form '>
    <div className="mb-3">
    {saved==='F'?<input type="text" style={{fontSize:'15px'}} className="form-control" id="Code"  value={props.pro.Code}  name="Code" onClick={()=>{setClickedIndex(props.index)}} onChange={onChange} />
:<div style={{fontSize:'15px'}}>{props.pro.Code}</div>}</div>
    </form></td>
      <td><form className='form '>
    <div className="mb-3">
    {saved==='F'?<input type="number" style={{fontSize:'15px'}} className="form-control" id="QtyReceived"  value={props.pro.QtyReceived}  name="QtyReceived" onClick={()=>{setClickedIndex(props.index)}} onChange={onChange} />
:<div style={{fontSize:'15px'}}>{props.pro.QtyReceived}</div>}</div>
    </form></td>
      <td><form className='form '>
    <div className="mb-3">
   {saved==='F'?<input type="number" style={{fontSize:'15px'}} className="form-control" id="QtyAccepted"  value={props.pro.QtyAccepted}  name="QtyAccepted" onClick={()=>{setClickedIndex(props.index)}} onChange={onChange}/>
:<div style={{fontSize:'15px'}}>{props.pro.QtyAccepted}</div>}</div>
    </form></td>
      <td><form className='form '>
    <div className="mb-3">
    {saved==='F'?<input type="number" style={{fontSize:'15px'}} className="form-control" id="Rs"  value={props.pro.Rs}  name="Rs" onClick={()=>{setClickedIndex(props.index)}}onChange={onChange} />
    :<div style={{fontSize:'15px'}}>{props.pro.Rs}</div>}</div>
    </form></td>
      <td><form className='form '>
    <div className="mb-3">
    {saved==='F'?<input type="number" style={{fontSize:'15px'}} className="form-control" id="P"  value={props.pro.P}  name="P" onClick={()=>{setClickedIndex(props.index)}} onChange={onChange}/>
:<div style={{fontSize:'15px'}}>{props.pro.P}</div>}</div>
    </form></td>
  </tr>*/}
  </>
  )
}

export default Row