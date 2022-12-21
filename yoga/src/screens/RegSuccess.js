import React from 'react'
import { useSelector } from 'react-redux'
import { userSigninReducer } from '../reducers/userReducers';

export default function RegSuccess() {
  const userSign = useSelector((state)=> state.userSignin);
  const {userInfo} = userSign;
  console.log(userInfo);
  return (
    <div className='onboard-container1'>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
      <img src='/images/regsuccess.png' style={{width:'75px', height:'75px'}}></img>
      <div style={{fontSize:"40px"}}>Registration Successful</div></div>
      <div style={{fontSize:"25px", padding:"2rem 0 1rem", color:'white'}}>Your details:</div>
      <div>
        {userInfo? 
        <div>
        <div style={{color:'white'}}><span className='bold'>Name:</span> {userInfo.name}</div>
        <div style={{color:'white'}}><span className='bold'>DOB:</span> {userInfo.dob}</div>
        <div style={{color:'white'}}><span className='bold'>Email:</span> {userInfo.email}</div>
        <div style={{color:'white'}}><span className='bold'>Gender:</span> {userInfo.gender}</div>
        <div style={{color:'white'}}><span className='bold'>Batch:</span> {userInfo.batch}</div>
        </div>
        : ""}
      </div>
      </div>
  )
}
