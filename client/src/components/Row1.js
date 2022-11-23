import React,{useState} from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'; 
//var Typeahead = require('react-bootstrap-typeahead').Typeahead;

const Row1 = (props) => {
  
   const onChange=props.onChange;
   const setClickedIndex=props.setClickedIndex;
   const descriptionSetter=props.descriptionSetter;
  const addClicked=props.addClicked;
  const addNewItem=props.addNewItem;
  const dropDownlist=props.dropDownlist;
  const [desc,setDesc]=useState({type:""})
  //console.log(props.len+" "+props.index)
  //console.log("addclicked "+addClicked)
  const onChange1=(e)=>{
    setDesc({type:e.target.value})
    //console.log("desc "+desc)
  }
   
  // const ll=["dfrfg","dsvreg","reggeg","fegtht4h","fvergt","Fvthtghtg","dfrfg","dsvreg","reggeg","fegtht4h","fvergt","Fvthtghtg","dfrfg","dsvreg","reggeg","fegtht4h","fvergt","Fvthtghtg"];
  return (
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
  {props.index===props.len?<>
  {addClicked==='F'?<> <Typeahead id={props.index} style={{width:'90%'}}
 defaultSelected={[props.pro.Description]}
 onClick={()=> setClickedIndex(props.index)}
  onChange={(selected) => {
   
    descriptionSetter(selected)
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
        </tr>

  )
}

export default Row1