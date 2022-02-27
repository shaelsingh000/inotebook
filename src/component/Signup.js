import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword:""}) 
    let history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name,email,password}= credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        });
        const json = await response.json()
        console.log(json);
        if(json){
            localStorage.setItem('token', json.authtoken); 
            history("/");
            props.showAlert("Account Created","Success")
        }
        else{
          props.showAlert("Invalid","danger")
        }
            
    }

    const onChange=(e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
  return(
    <div>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="exampleInputEmail1">Name</label>
            <input className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="name" placeholder="Enter Name" onChange={onChange} value={credentials.name}/>
            
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" placeholder="Enter email" onChange={onChange} value={credentials.email}/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group my-2">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name="password" onChange={onChange} value={credentials.password}/>
          </div>
          <div className="form-group my-2">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="confirm Password" name="cpassword" onChange={onChange} value={credentials.cpassword}/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
   
  ); 
};

export default Signup;
