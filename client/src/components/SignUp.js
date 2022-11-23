import React ,{useState}from 'react';

import { useNavigate} from 'react-router-dom';


const SignUp = (props) => {
       
      const {showAlert}=props
    
    const navigate=useNavigate()
    const [credentials,setcredentials]=useState({Code:"",Region:"",Location:"",Department:"",Address:"",Password:""})
      const host="https://sangrahalaya.herokuapp.com"
    
    
    const handleSubmit=async(e)=>{
      
        e.preventDefault();
        if(!credentials.Code||!credentials.Password||!credentials.Address)
        {
          showAlert("Not registered","error")
          alert("Please Enter Required Details")
        }
        else{
          //console.log("submit")
          //console.log(credentials)
          const response=await fetch(`${host}/api/auth/createuser`,{
            method:"POST",
            headers:{
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({Code:credentials.Code,Location:credentials.Location,Region:credentials.Region,Department:credentials.Department,Address:credentials.Address,Password:credentials.Password})
          
        
          });
          //console.log("p"+response)
          const json=await response.json();
        
        //  dispatch(register(credentials.name,credentials.email,credentials.Type,credentials.empNo,credentials.userName,credentials.dobDate,credentials.dateOfJoining,credentials.password))
          if(json.Success)
          {
            showAlert("Registered Successfully Please Sing-in","success")
            navigate('/sign-in')
          }
          else 
          {
            showAlert("Not registered","error")
            alert("xfvfbgf")
          }
        }
       
          
    }
    
    const onChange=(e)=>{
        //console.log("ohkhhh")
        
        setcredentials({...credentials,[e.target.name]:e.target.value});
       
        //console.log(credentials)
      }
  return (

  <div className='container' style={{backgroundColor:'#e6ffee'}}>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
    <label htmlFor="exampleInputName1" className="form-label">Unit Code</label>
    <input type="text" name='Code' className="form-control" onChange={onChange} value={credentials.Code} required={true} minLength={3}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputAddress1" className="form-label">Address</label>
    <input type="text" name='Address' className="form-control" onChange={onChange} value={credentials.Address} required={true} minLength={5}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputType1" className="form-label">Region</label>
    <table>
      <tbody>
        <tr>
          <td>
          <div className="form-check mx-3" id="filterRegion">
  <input className="form-check-input" type="radio" name="Region" id="Northern" value={"Northern"}onChange={onChange}/>
  <label className="form-check-label" htmlFor="yes">
    Northern 
  </label>
  </div>
          </td>
          <td>
          <div className="form-check mx-3" id="filterRegion">
  <input className="form-check-input" type="radio" name="Region" id="Southern"value={"Southern"}onChange={onChange}/>
  <label className="form-check-label" htmlFor="yes">
    Southern
  </label>
  </div>
          </td>
          <td>
          <div className="form-check mx-3" id="filterRegion">
  <input className="form-check-input" type="radio" name="Region" id="Eastern"value={"Eastern"}onChange={onChange}/>
  <label className="form-check-label" htmlFor="yes">
    Eastern
  </label>
  </div>
          </td>
          <td>
          <div className="form-check mx-3" id="filterRegion">
  <input className="form-check-input" type="radio" name="Region" id="Western"value={"Western"}onChange={onChange}/>
  <label className="form-check-label" htmlFor="yes">
    Western
  </label>
  </div>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  


    <div className="mb-3">
    <label htmlFor="exampleInputType2" className="form-label">Department</label>
    <table>
      <tbody>
        <tr>
          <td>
          <div className="form-check mx-3" id="filterDepartment">
  <input className="form-check-input" type="radio" name="Department" id="Marketing" value={"Marketing"}onChange={onChange}/>
  <label className="form-check-label" htmlFor="yes">
    Marketing 
  </label>
  </div>
          </td>
          <td>
          <div className="form-check mx-3" id="filterDepartment">
  <input className="form-check-input" type="radio" name="Department" id="Refinery"value={"Refinery"}onChange={onChange}/>
  <label className="form-check-label" htmlFor="yes">
    Refinery
  </label>
  </div>
          </td>
          <td>
          <div className="form-check mx-3" id="filterDepartment">
  <input className="form-check-input" type="radio" name="Department" id="Pipeline"value={"Pipeline"}onChange={onChange}/>
  <label className="form-check-label" htmlFor="yes">
    Pipeline
  </label>
  </div>
          </td>
          <td>
          <div className="form-check mx-3" id="filterDepartment">
  <input className="form-check-input" type="radio" name="Department" id="R&D"value={"R&D"}onChange={onChange}/>
  <label className="form-check-label" htmlFor="yes">
    R&D
  </label>
  </div>
          </td>
          <td>
          <div className="form-check mx-3" id="filterDepartment">
  <input className="form-check-input" type="radio" name="Department" id="B&D"value={"B&D"}onChange={onChange}/>
  <label className="form-check-label" htmlFor="yes">
    B&D
  </label>
  </div>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
    <div className="mb-3">
    <label htmlFor="exampleInputLocation1" className="form-label">Location</label>
    <input type="text" name='Location' className="form-control" onChange={onChange} value={credentials.Location} required={true} minLength={5}/>
  </div>


    <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" name='Password' className="form-control" onChange={onChange} value={credentials.Password} required={true} minLength={5}/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
<div>
<button type="submit" className="btn btn-primary my-5" onClick={()=>{navigate('/sign-in')}}>Already Have An Account?</button>

</div>

</div>)
};

export default SignUp;
