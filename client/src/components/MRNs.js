import React,{useState,useEffect,useRef} from 'react'

import ReactToPrint from 'react-to-print';

const MRNs = (props) => {
    const componentRef=useRef(null)
    const host="https://sangrahalaya.herokuapp.com";
    const StringAuthToken=localStorage.getItem("token")
    const startDate=JSON.stringify(props.startDate).substring(1,11)
    const endDate=JSON.stringify(props.endDate).substring(1,11)
    //console.log(startDate)
    //console.log(endDate)
    
    const [showingReports,SetShowingReports]=useState([])
    const[preStartDate,SetPreStartDate]=useState("")
    const[preEndDate,SetPreEndDate]=useState("")

   
   
   
    



    const fetchAllMRNs=async()=>{

        const response=await fetch(`${host}/api/inventory/fetchallinventory`,{
          method:"GET",
          headers:{
            'auth-token': StringAuthToken,
            'Content-Type': 'application/json'
          }});
          const json=await response.json();
       
          SetShowingReports(json)
          //console.log(json)
          //console.log(reports)
       }



       const filterWithDate=()=>{
        //console.log("DSVERG")
        let sarr=startDate.split('-')
        let earr=endDate.split('-')
        let syear=Number(sarr[0])
        let smonth=Number(sarr[1])
        let sday=Number(earr[2])
        let eyear=Number(earr[0])
        let emonth=Number(earr[1])
        let eday=Number(earr[2])
        var result=[]
      
        for(let i=0;i<showingReports.length;i++){
          let report=showingReports[i]
          let cdate=(report.secondDate).substring(0,10)
        
          let carr=cdate.split('-');
         let cyear=Number(carr[0])
         let cmonth=Number(carr[1])
         let cday=Number(carr[2])
      
         if(cyear>=syear&&cmonth>=smonth&&cday>=sday&&cyear<=eyear&&cmonth<=emonth&&cday<=eday)
         {
          result.push(report)
         }
         if(!(cyear<=eyear&&cmonth<=emonth&&cday<=eday))
         {
          break;
         }
        }
        //console.log("result")
        //console.log(result)
         /* let sd = new Date(startDate.date).getTime()
        let ed = new Date(endDate.date).getTime()
        //console.log("herher ")
        //console.log(sd)
        //console.log(ed)
      let result = reports.filter(d => {var time =new Date(d.secondDate).getTime();
                               return (sd <= time && time <= ed);
                              });*/
      
                              //SetShowingReports(result)
      
      }
      
      if((preStartDate!==startDate)||(preEndDate!==endDate))
      {
        SetPreEndDate(endDate)
        SetPreStartDate(startDate)
        filterWithDate()
      }
      



useEffect(() => {
    fetchAllMRNs()
     // eslint-disable-next-line
   }, []);

  return (
   <div className="full-window"  style={{width:'100%',height:'84.5vh',backgroundColor:'#e6ffee'}}>



  <div ref={componentRef}>
  <div style={{display:'flex',marginTop:'10px',marginLeft:'40px'}} >
      <div>
        List of MRNs
      </div>
    </div>
    
    
   
    <div className='scroll' style={{display:'absolute',
  alignContent:'center',
  justifyContent:'center',
  backgroundColor:'#e6ffee',
  padding:'15px',marginTop:'10px',overflowY:'scroll',maxHeight:'467px'}}>
 

     {showingReports.map((report)=>{
        return <div className='container'> <table className='table table-bordered table-responsive' style={{marginLeft:'10px',width:'900px',backgroundColor:'#e6ffee'}}>
             <tbody>
               
              <tr >
                <td colSpan={'4'}>
                 barcode
                </td>
                <td colSpan={'4'}>
              Date- {report.date}
                </td>
              </tr>
              <tr>
                <td colSpan={'4'}>
                 issuedBy- {report.issuedBy}
                </td>
                <td colSpan={'4'}>
               supplier- {report.supplierNameAndAddress}
                </td>
              </tr>
              <tr>
              <td>
              AS PER P.O.
</td>
<td>
RECD. UPTO DATE
</td>
<td>
DESCRIPTION
</td>
<td>
CODE
</td>
<td>
Qty.RECEIVED
</td>
<td>
Qty.ACCEPTED
</td>
<td>
Rs.
</td>
<td>
    P.
</td>
              </tr>
              {report.Entry.map((entry)=>{
                return <tr>
                    <td>
                        {entry.AsPerPo}
                    </td>
                    <td>
                    {entry.RecdUptoDate}
                    </td>
                    <td>
                    {entry.Description}
                    </td>
                    <td>
                    {entry.Code}
                    </td>
                    <td>
                        {entry.QtyReceived
}

                    </td>
                    <td>
                    {entry.QtyAccepted}
                    </td>
                    <td>
                    {entry.Rs}
                    </td>
                    <td>
                    {entry.P}
                    </td>
                </tr>
              })}
                

                </tbody>
                </table>
       
            </div>
       

     })}
     

      </div>
    

        </div>
        <ReactToPrint
       trigger={() => {
         // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
         // to the root node of the returned component as it will be overwritten.
         return <i className="fa fa-print fa-lg my-4"  aria-hidden="true">Print</i>
    
       }}
       content={() => componentRef.current}
     />
</div>
     
  )
}

export default MRNs