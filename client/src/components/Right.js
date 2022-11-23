import React,{useRef,useState,useEffect} from 'react'
import Row2 from './Row2';
import ReactToPrint from 'react-to-print';
var image=require('./iocl.ico')

const Right = (props) => {
    const host="https://sangrahalaya.herokuapp.com";
    const StringAuthToken=localStorage.getItem("token")
    const itemsList=props.itemsList;
   
    const [issueClicked,setIssueClicked]=useState("F")
    const componentRef1 = useRef(null);
   
    const [date,setDate]=useState("")
 const getDate=()=>{
   //console.log("nithing")
   var date = new Date().toDateString();
      //console.log(date)
      setDate(date)
  }
    const [tempListItems,setTempListItems]=useState([]);

    const [user,SetUser]=useState({Address:"",Department:"",NoOfIssues:0,NoOfMrns:  0,Region: ""})
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


    const copyItemList=()=>{
        let newArr=[];
        itemsList.map((item,indexi)=>{
            if(Number(item.issued)>0)
            {   //console.log("item "+item)
                newArr.push({description:item.description,issued:item.issued,remark:item.remark,indexi:indexi})
            }
        }) 
        setTempListItems(newArr)
        //console.log("copied")
        //console.log(tempListItems)
        
    }

    const RemarkSetter=(it)=>{
      //console.log("dsf")
      //console.log(it)
       let ind=it.index;
       let remark=it.remark;
        let newArr=[...itemsList];
        newArr[ind].remark=remark;
        props.SetItemsList(newArr)
        copyItemList();
    }

   const doIt=async(it)=>{
    //console.log("dfdf")
    //console.log(it)
    const response=await fetch(`${host}/api/items/updateitem`,{
        method:"PUT",
        headers:{
          'auth-token': StringAuthToken,
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({Description:it.description,reports:{curdate:new Date().toDateString(),type:"Minus",number:Number(-it.issued),remark:it.remark}})});
       
        //console.log("After update")
        //console.log(json)
       
        
   }
 
    const IssueHandle=async()=>{
        //console.log("handle")
        //console.log(itemsList)
         itemsList.map((item)=>{
          if(Number(item.issued)!==0)doIt(item)
         })
         
        
         
        setIssueClicked("T");
        
    }
    
   
    useEffect(() => {
       copyItemList();
       getuser();
       getDate();
        // eslint-disable-next-line
      }, [itemsList]);



  return (
    <div  className="full-window"  style={{width:'100%',height:'84.5vh',backgroundColor:'#e6ffee'}}>
   
   <div className='scroll' ref={componentRef1} style={{display:'absolute',
  alignContent:'center',
  justifyContent:'center',
  backgroundColor:'#e6ffee',
  padding:'15px',marginTop:'10px',overflowY:'scroll',maxHeight:'467px'}}>
 

        <div style={{display:'flex',marginLeft:'100px'}}>
        <img src={image} alt={'iocl'} style={{height:'70px',width:'70px',marginLeft:'10px',marginTop:'10px'}} />
    
            <h1 className='mx-5 my-4'><b>INDIAN OIL CORPORATION LTD.</b></h1></div>
        <div style={{marginLeft:'200px',marginTop:'10px',width:'350px'}}>
        <h4>{user.Address}</h4>
        </div>
        <div style={{display:'flex'}}>
        <div style={{marginLeft:'50px',fontSize:'15px'}}>
        Requisition No. : {user.NoOfIssues}
        </div>
        <div style={{marginLeft:'350px',fontSize:'15px'}}>
                 Date : {date}
        </div>
        </div>
        <div style={{marginLeft:'250px',fontSize:'15px'}}>
        <u>Subject: MATERIAL DEMAND SLIP</u>
        </div>
        <div>
            <table className='table table-bordered table-responsive' style={{marginLeft:'10px',width:'700px',backgroundColor:'#e6ffee'}}>
            <tbody>
               <tr>
                <td rowSpan={'2'} style={{width:'10%'}}>
                    SI NO.
                </td>
                <td rowSpan={'2'} style={{width:'20%'}} >
                    <div>Required by</div> 
                     <div>(Name of equip)</div>
                </td>
                <td rowSpan={'2'} style={{width:'10%'}} >
                    Code No.
                </td>
                <td rowSpan={'2'} style={{width:'25%'}}>
                    Description
                </td>
                <td rowSpan={'2'} >
                    Unit
                </td>
                <td colSpan={'2'} style={{width:'15%'}}>
                  
                      Quantity
                  
                </td>
                <td rowSpan={'2'} style={{width:'20%'}} >
                    Remarks
                </td>
               </tr>
               <tr>
                <td>
                    Required
                </td>
                <td>
                    Issued
                </td>
              
                
               </tr>
               
                {tempListItems.map((item,index)=>{
                    return <Row2 key={index} issueClicked={issueClicked} index={index} item={item} RemarkSetter={RemarkSetter} />})}
               


               {issueClicked==='T'?
               <tr>
               <td colSpan={'2'}>
               <div>Requisition By</div>
                <div>..........</div>
               </td>
               <td colSpan={'2'}>
               <div>Approved By</div>
                <div>..........</div>
               </td>
               <td colSpan={'2'}>
               <div>Received By</div>
                <div>..........</div>
               </td>
               <td colSpan={'2'}>
               
                <div>Entered in Stock</div>
                <div>..........</div>
               </td>
               </tr>:""}
                           </tbody>
           
            </table>
            
        </div>
        </div>
        {tempListItems.length&&issueClicked!=='T'?<button style={{marginLeft:'50px'}} onClick={IssueHandle}>Issue</button>:""}
        {issueClicked==='T'?<>
        <ReactToPrint
       trigger={() => {
         // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
         // to the root node of the returned component as it will be overwritten.
         return <i className="fa fa-print fa-lg my-4"  aria-hidden="true">Print</i>
    
       }}
       content={() => componentRef1.current}
     />
        </>:""}
    </div>
  )
}

export default Right