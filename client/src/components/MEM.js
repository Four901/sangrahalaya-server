import React,{useState,useEffect,useRef} from 'react'
import { Typeahead } from 'react-bootstrap-typeahead';
import BarScanner from "./BarScanner"; 
import ReactToPrint from 'react-to-print';
import Row3 from './Row3';
const MEM = (props) => {
    const componentRef=useRef(null)
    const host="https://sangrahalaya.herokuapp.com";
    const StringAuthToken=localStorage.getItem("token")
    const startDate=JSON.stringify(props.startDate).substring(1,11)
    const endDate=JSON.stringify(props.endDate).substring(1,11)
   
    //console.log("dates")
    //console.log(startDate)
    //console.log(endDate)
    const [reports,SetReports]=useState([])
    const [showingReports,SetShowingReports]=useState([])

    const [dropDownlist,SetDropDownlist]=useState([]);
     
    const[description,SetDescription]=useState("")
    
  

   


    const fetchAllItemsDescriptions=async()=>{

        const response=await fetch(`${host}/api/items/fetchallitemsdescriptions`,{
          method:"GET",
          headers:{
            'auth-token': StringAuthToken,
            'Content-Type': 'application/json'
          }});
          const json=await response.json();
          SetDropDownlist(json)
           //console.log(json)
       }


const fetchMems=async(description)=>{
    //console.log({description,startDate,endDate})
    const response=await fetch(`${host}/api/items/fetchreportswithdescription`,{
        method:"PUT",
        headers:{
          'auth-token': StringAuthToken,
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({Description:description})});
        const json=await response.json();
        //console.log(json)
        
       
        let newArr=[]
        json.map((js)=>{
            newArr.push(js)
        })
        //console.log(newArr)
        SetShowingReports(newArr)
        SetReports(newArr)
       
        
        //console.log("adding 123")
        
        //console.log(reports)
        
        //console.log(showingReports)
       // filterWithDate();

}
const handleBar=async(data)=>{
  //console.log("herer we are "+data)
  const response=await fetch(`${host}/api/items/fetchdescriptionwithbarcode`,{
    method:"PUT",
    headers:{
      'auth-token': StringAuthToken,
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({barCode:data})});

    const json=await response.json();
    //console.log("out "+json)
    //console.log(json)
    SetDescription(json)
    fetchMems(json);


}

const doit=(str)=>{
  if(str[0]==null)
  {
    SetDescription("")
       SetShowingReports([])
        SetReports([])
       
    return ;
  }
    fetchMems(str[0]);
}

const filterWithDate=(it)=>{
  //console.log("DSVERG")
  //console.log(it)
  let sarr=it.sd.split('-')
  let earr=it.ed.split('-')

  let syear=Number(sarr[0])
  let smonth=Number(sarr[1])
  let sday=Number(sarr[2])
  let eyear=Number(earr[0])
  let emonth=Number(earr[1])
  let eday=Number(earr[2])
  //console.log("sd "+syear+" "+smonth+" "+sday+" ")
  //console.log("ed "+eyear+" "+emonth+" "+eday )

  var result=[]

  for(let i=0;i<reports.length;i++){
   
    let report=reports[i]
    let cdate=(report.secondDate).substring(0,10)
    //console.log(report)
    let carr=cdate.split('-');
   let cyear=Number(carr[0])
   let cmonth=Number(carr[1])
   let cday=Number(carr[2])
   //console.log("cd "+cyear+" "+cmonth+" "+cday )
   if(cyear>=syear&&cmonth>=smonth&&cday>=sday&&cyear<=eyear&&cmonth<=emonth&&cday<=eday)
   {
    result.push(report)
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

                        SetShowingReports(result)

}


useEffect(() => {
  filterWithDate({sd:startDate,ed:endDate})
     // eslint-disable-next-line
   }, [startDate,endDate]);

const descfun=(str)=>{
  //console.log("str "+str)
  if(str[0]!=null)
  {

    SetDescription(str[0])
  }
}

useEffect(() => {
    fetchAllItemsDescriptions()
     // eslint-disable-next-line
   }, []);

  return (
       <div className="full-window"  style={{width:'100%',height:'84.5vh',backgroundColor:'#e6ffee'}}>
<div style={{marginLeft:'400px'}}>
    <Typeahead id={StringAuthToken} style={{width:'30%'}}

  onChange={(selected) => {
    doit(selected)
    descfun(selected)
 
   
  }}
  options={dropDownlist}
  
  />
</div>

  <div ref={componentRef}>
  
  <div style={{display:'flex',marginTop:'5px',marginLeft:'40px'}} >
    <div>
      <div>
        Name of Article
      </div>
      <div>
      वस्तु का नाम 
      </div>
    </div>
    <div style={{marginLeft:'20px',paddingTop:'5px',fontSize:'15px'}}>
    {description}
    </div>
    </div>
    <div>
    <table className='table table-bordered table-responsive' style={{marginLeft:'23px',width:'900px',backgroundColor:'#e6ffee'}}>
            <tbody>
            <tr>
              <td  width='10%'>
                <div>
                    S.I No.
                </div>
                <div>
                क्रम संख्या 
                </div>
               </td>
               <td  width='10%'>
                <div>
                    DATE
                </div>
                <div>
                दिनांक 
                </div>
               </td>
               <td  width='30%'>
                <div>
                PARTICULARS
                </div>
                <div>
                विवरण 
                </div>
               </td>
               <td  width='15%'>
               <div>
                Action
               </div>
               <div>
               क्रिया
               </div>
               </td>
               <td  width='15%'>
                <div>
                   Number's
                </div>
                <div>
                आंकड़े
                </div>
               </td>
               <td  width='10%'>
               <div>
                Balance
               </div>
               <div>
               शेष 
               </div>
               </td>
               <td  width='10%'>
                <div>
                    Remarks
                </div>
                <div>
                टिप्पणी
                </div>
               </td>
             
               
              </tr>
              </tbody>
              </table>
              </div>
    <div className='scroll'  style={{display:'absolute',
  alignContent:'center',
  justifyContent:'center',
  backgroundColor:'#e6ffee',
  paddingLeft:'15px',overflowY:'scroll',maxHeight:'400px'}}>
 

     <table className='table table-bordered table-responsive' style={{marginLeft:'10px',width:'900px',backgroundColor:'#e6ffee'}}>
            <tbody>
               
             
               {showingReports.map((report,index)=>{
                return <Row3 key={index} index={index} description={description} report={report}/>
             })}
             

           


                </tbody>
                </table>



    


      </div>
    

        </div>
       {showingReports.length?<ReactToPrint
       trigger={() => {
         // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
         // to the root node of the returned component as it will be overwritten.
         return <i className="fa fa-print fa-lg my-4"  aria-hidden="true">Print</i>
    
       }}
       content={() => componentRef.current}
     />:""}
     <div>
        <BarScanner handleBar={handleBar}/>  
      </div>
</div>
     
  )
}

export default MEM