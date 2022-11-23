import React from 'react'

const Row2 = (props) => {
   const  indexi=props.item.indexi;
   const item=props.item;
   const description=item.description;
   const issued=item.issued;
   const index=props.index
  
   const issueClicked=props.issueClicked;

  
   
    //console.log(item)
    const onremarkChange=(e)=>{
    props.RemarkSetter({index:indexi,remark:e.target.value})
  }
  
  return (
    
  <tr>
    <td>
{index+1}
    </td>
    <td>
{description}
    </td>
    <td>

    </td>
    <td>
        {description}
        </td>
        <td>
        
        </td>
        <td>
        {issued}
        </td>
        <td>
        {issued}
        </td>
        <td>
            {issueClicked==='F'?<textarea rows={'2'} value={item.remark} onChange={onremarkChange}/>
        :<div>{item.remark}</div>}
        </td>
   </tr>

  )
}

export default Row2