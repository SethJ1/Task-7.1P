import React, { useState } from 'react';
import Input from '../components/Input';
import { Link } from 'react-router-dom'; 
import { createAuthUserWithEmailAndPassword, createUserDocFromAuth, signInWithGooglePopup } from '../Utils/firebase';
import '../components/Login.css'

const Signup = (props) =>{
      const [contact, setContact] = useState({
        displayName:'',
        email: '',
        password: '',
        confirmPassword:''
      })

    const {displayName, email, password, confirmPassword} = contact;

      console.log(contact);

      const handleChange = (event) => {
        const { name, value } = event.target;
        setContact((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
    const handleSubmit = async(event) =>
    {
      event.preventDefault();

      if (password !== confirmPassword){
        alert('Passwords do not match')
        return;
      }
      try{
        const {user} = await createAuthUserWithEmailAndPassword(email, password)
        await createUserDocFromAuth (user, {displayName});
      }
      catch(error){
        console.log('error in creating user', error.message)
      }
    }
    const logGoogleUser = async () =>{
      const {user} = await signInWithGooglePopup();
      const userDocRef = await createUserDocFromAuth(user)
    }

    return <div className= 'header-div'>

    <h1>Create Account</h1>
    <br></br>  
    <Input
      name= 'displayName'
      type= 'text'
      placeholder ='name'
      onChange = {handleChange}
      value = {contact.displayName}
      />
      <br></br>
      <Input
      name= 'email'
      type= 'email'
      placeholder ='email'
      onChange = {handleChange}
      value = {contact.email}
      />
      <br></br>    
      <Input
      name= 'password'
      type= 'password'
      placeholder ='password'
      onChange = {handleChange}
      value = {contact.password}
      />
      <br></br>    
      <Input
      name= 'confirmPassword'
      type= 'password'
      placeholder ='confirm password'
      onChange = {handleChange}
      value = {contact.confirmPassword}
      />
      <br></br>
      
      <button onClick={handleSubmit}>Sign Up</button>
      <br></br>  
      <button onClick={logGoogleUser}>Sign in with Google</button>
      <br></br> 
      <p>Already have an account? <Link to="/login">Login</Link></p>
      
    </div>
}
export default Signup;

