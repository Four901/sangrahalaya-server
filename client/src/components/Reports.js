import React,{useState} from 'react'

import MEM from './MEM'
import MRNs from './MRNs'


const Reports = () => {
 

 const [startDate,SetStartDate]=useState({date:new Date()})
 const [endDate,SetEndDate]=useState({date:new Date()})


 const [mrns,SetMrns]=useState("F")

 const [mem,SetMem]=useState("T")
 const thismonth=()=>{
    var x = new Date();
    x.setDate(1);
   SetStartDate({date:x})
   SetEndDate({date:new Date()});
 }
 const lastMonth=()=>{
    var x = new Date();
    //console.log(x)
    x.setDate(1);
    x.setMonth(x.getMonth()-1);
    SetStartDate({date:x})
    SetEndDate({date:new Date()});
    
   
 }
 const months3=()=>{
    var x = new Date();
    x.setDate(1);
    x.setMonth(x.getMonth()-3);
    SetStartDate({date:x})
    SetEndDate({date:new Date()});
 }
 const months6=()=>{
    var x = new Date();
    x.setDate(1);
    x.setMonth(x.getMonth()-6);
    SetStartDate({date:x})
    SetEndDate({date:new Date()});
 }

 const startDateOnchange=(e)=>{

     SetStartDate({date:new Date(e.target.value)})
    //console.log(startDate)
   
 }
 const endDateOnchange=(e)=>{
   SetEndDate({date:new Date(e.target.value)})
 }


const one=()=>{
    SetMrns("T")
    
    SetMem("F")
}
const three=()=>{
    SetMrns("F")
    
     SetMem("T")
}

  
  return (
    
    <div className='full-window' style={{width:'100%',height:'84.5vh',backgroundColor:'#e6ffee'}} >
    

<table className='table table-bordered border-secondary' style={{width:'100%',height:'84.5vh',backgroundColor:'#e6ffee'}}>
 <tbody  >
        <tr>
         <td style={{width:'15%'}}>
         <div >
    <div className='my-3'>
   <button className='btn btn-success btn-lg mx-2' onClick={one}>MRNs</button>
    </div>
   
    <div className='my-3'>
    <button className='btn btn-success btn-lg mx-2' onClick={three}>MEM</button>
    </div>
<div className='my-5'>
<div className='my-3'>
   <button className='btn btn-secondary btn-lg mx-2' onClick={thismonth}>This Month's</button>
    </div>
     <div className='my-3'>
   <button className='btn btn-secondary btn-lg mx-2' onClick={lastMonth}>Last Month's</button>
    </div>
    <div className='my-3'>
    <button className='btn btn-secondary btn-lg mx-2' onClick={months3}>Last 3 Month's</button> 
    </div>
    <div className='my-3'>
    <button className='btn btn-secondary btn-lg mx-2' onClick={months6}>Last 6 Month's</button>
    </div>
    <div style={{display:'flex'}}>
        <span>
<div> 
    Start
</div>
 <div>
    <input type="date"  onChange={startDateOnchange}/>
</div>
        </span>
        <span className='mx-3' >
        <div> 
    End
</div>
<div>
    <input type="date"  onChange={endDateOnchange}/>
</div>
        </span>
        
    </div>
</div>
   
    </div>
         </td>
         <td style={{width:'85%'}}>
      
      {mrns==='T'?<><MRNs startDate={startDate.date} endDate={endDate.date} /></>:""}
      {mem==='T'?<><MEM startDate={startDate.date} endDate={endDate.date} /></>:""}

         </td>
        
          </tr>
         
          </tbody>
          </table>


    </div>
  )
}

export default Reports