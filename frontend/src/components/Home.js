import React,{useState} from 'react'
import Left from './Left'
import Right from './Right'

const Home = () => {
  
  const [itemsList,SetItemsList]=useState([])
  
  

  
  return (
    
    <div className='full-window' style={{width:'100%',height:'84.5vh',backgroundColor:'#e6ffee'}} >


<table className='table table-bordered border-secondary' style={{width:'100%',height:'84.5vh',backgroundColor:'#e6ffee'}}>
 <tbody  >
      <tr>

         <td style={{width:'30%'}}>
          <Left SetItemsList={SetItemsList} itemsList={itemsList} />
          </td>
    
          <td style={{width:'70%'}}>
          <Right  itemsList={itemsList} SetItemsList={SetItemsList}/>
          </td>
          </tr>
         
          </tbody>
          </table>


    </div>
  )
}

export default Home