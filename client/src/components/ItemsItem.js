import React ,{useRef,useState,useEffect}from 'react'
import ReactToPrint from 'react-to-print';
var Barcode = require('react-barcode');

const ItemsItem = (props) => {
    const componentRef2 = useRef(null);
    const index=props.index;
    const description=props.obj.description
    const barCode=props.obj.barCode
    const addAdder=props.addAdder;
    const inInventory=props.obj.inInventory
    //console.log("frfg")
    //console.log(props.obj)
    const changeItem=props.changeItem
    const [number,setNumber]=useState(0)
    

   
   const addClicked=()=>{
     if(Number(number)<inInventory)
     {

      setNumber(Number(number)+1);
      //console.log("add cliced")
      //console.log(number)
      changeItem({index:index,number:Number(number)+1})
     }
   }
 
   const callme=()=>{
      //console.log(index+" "+"hello")
      if(addAdder.data===barCode)
      {
        //console.log("hello2")
        addClicked();
      }
  }

  //setPreAddAdder(addAdder);
   const minusClicked=()=>{
     if(Number(number)>0)
     {
      setNumber(Number(number)-1);
      changeItem({index:index,number:Number(number)-1})
     }

   }
     
  const onNumberChange=(e)=>{
    if(e.target.value>inInventory)
    {
      setNumber(inInventory)
      changeItem({index:index,number:inInventory})
    }
    else{
      //console.log("e "+e.target.value)
       setNumber(e.target.value)

       changeItem({index:index,number:e.target.value})
    }
   
   
    
   
  }


  useEffect(() => {
    callme();
    // eslint-disable-next-line
}, [addAdder]);
  return (
    <div className='container' style={{backgroundColor:'#e6ffee'}}>
     <div style={{fontSize:'20px'}}>
        {description}
     </div>
     <div style={{display:'flex'}}>
        <div style={{display:'flex',fontSize:'15px'}}><b>InStore-</b>{inInventory-number}</div>
        <div style={{display:'flex',marginLeft:'30px'}}>
            <b style={{fontSize:'15px'}}>Issue -</b>
            <button className='mx-3' onClick={addClicked}>+</button>
            <input style={{width:'50px'}} max={inInventory} type='number' value={number} onChange={onNumberChange}/>
           
            <button className='mx-3' onClick={minusClicked}>-</button>
        </div>
     </div>
     <div  >
   <span ref={componentRef2} >
    <Barcode  height='30px' background="#d1e0e0" className='ss' width='1px' displayValue={false}  value={barCode} />
    
    </span> 
    < span>
    <ReactToPrint
       trigger={() => {
         // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
         // to the root node of the returned component as it will be overwritten.
         return <i className="fa fa-print fa-lg my-4"  aria-hidden="true"></i>
    
       }}
       content={() => componentRef2.current}
     />
   </span>
  </div>
     
    </div>
    
  )
}

export default ItemsItem