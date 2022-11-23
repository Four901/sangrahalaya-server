import React from 'react'

const Row3 = (props) => {
    const index=props.index
    const report=props.report
    
  return (
    <tr>
     <td width='10%'>{index+1}</td>   
     <td width='10%'>{report.curdate}</td>   
     <td width='30%'>{props.description}</td>   
     <td width='15%'>{report.type==='Add'?
        <div className='bg-success'>Added</div>:<div className='bg-danger'>Deducted</div>}</td>  
    <td width='15%'>{report.number}</td>
    <td width='10%'>{report.remains}</td>
    <td width='10%'>{report.remark}</td>
    </tr>
  )
}

export default Row3