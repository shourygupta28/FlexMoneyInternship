import React, { useEffect } from 'react'
import { useState } from 'react';
import DialogueBox from '../Components/DialogueBox';
import Axios from "axios";
import MessageBox from '../Components/MessageBox';
import { register } from '../actions/userActions';
import { useDispatch } from 'react-redux';

export default function RegistrationScreen() {
    // const location = useLocation();
    // console.log(location)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(null);
    const [dob, setBirthday] = useState(null);
    const [gender, setGender] = useState(null);
    const [profileImg, setImage] = useState('');
    const [batch, setBatch] = useState('');
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);
    const [next, setNext] = useState(false);
    const [dobError, setDOBerror] = useState(false);
    const dispatch = useDispatch();
    const Dialogue = (e) => {
        e.preventDefault();
        if (dob) {
            if (Math.round((new Date().getTime() - new Date(dob).getTime()) / (1000 * 3600 * 24 * 365.25)) >=18 && Math.round((new Date().getTime() - new Date(dob).getTime()) / (1000 * 3600 * 24 * 365.25)) <=65) {
                setNext(true);
            } else {
                setDOBerror(true);
            }
        }
    }

    const showPass = () => {
        setPasswordShown(!passwordShown);
    }

    // useEffect(() => {
    //     if (dob) {
    //         if (Math.round((new Date().getTime() - new Date(dob).getTime()) / (1000 * 3600 * 24 * 365.25)) >=18 && Math.round((new Date().getTime() - new Date(dob).getTime()) / (1000 * 3600 * 24 * 365.25)) <=65) {
    //             if(name && email && dob && gender && password && batch){
    //                 const {data} = Axios.post('/api/users/register', {name, email, dob, gender, password, batch});
    //                 console.log(data);
    //             }
    //         } else {
    //             setDOBerror(true);
    //         }
    //     }
    // })

    const uploadFileHandler = async(e) => {
        const files = e.target.files;
        console.log(files);
        const formData = new FormData();
        
        for(let i=0; i<files.length; i++ ){
            const element = files[i];
            console.log(element);
            formData.append('images', element);
        }

        setLoadingUpload(true);

        try{
            const { data } = await Axios.post('/api/uploads', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            setImage(data);
            setLoadingUpload(false);
        } catch (error){
            setErrorUpload(error.message);
            setLoadingUpload(false);
        }
    }
    


  return (
    <div className='container'>
        <div className="overflow onboard-container">
            <div style={{ margin: "3rem 1rem 2rem 1rem" }} className="left-text">
                <img src='/images/LogoYoga.png' style={{width:'250px', height:'125px'}}></img>
                <p style={{ fontWeight: "600", fontSize: "2rem", margin: "0", color: 'black' }}>Batch Registration</p>
                <p style={{ fontWeight: "600", fontSize: "1.5rem", margin: "0", color:'white' }}>Sign Up</p>
            </div>
            {dobError && (Math.round((new Date().getTime() - new Date(dob).getTime()) / (1000 * 3600 * 24 * 365.25)) <18 || Math.round((new Date().getTime() - new Date(dob).getTime()) / (1000 * 3600 * 24 * 365.25)) > 65) &&
            <MessageBox variant="danger">{"Your age must be between 18 to 65 years."}</MessageBox>
            }
            
            {/* {error && <MessageBox variant="danger">{error}</MessageBox>}
            {emailError && !EmailValidator.validate(email) && <MessageBox variant="danger">{"Email is not valid"}</MessageBox>}
            {dobError && Math.round((new Date().getTime() - new Date(dob).getTime()) / (1000 * 3600 * 24 * 365.25)) < 8 && <MessageBox variant="danger">{"Age must be between 18-65 years"}</MessageBox>} */}
            <form className="signinform" style={{ top: "0px" }} onSubmit={Dialogue}>
                {/* <div className="form-group">
                    <label htmlFor="image-input" style={{ marginLeft: "0" }}>
                        <img src={profileImg ? profileImg : image} alt="profile" className="image"></img>
                        <i class="fa fa-user" aria-hidden='true' style={{fontSize:"30px",color:"#00365b"}}></i>
                        <p>Upload your profile photo</p>

                    </label>
                    <input className="display" type="file" name="image-upload" id="image-input" accept="image/*" onChange={uploadFileHandler}  />
                </div> */}
                <div className="form-group">
                    <label htmlFor="Name">Name<span className='required' style={{ marginLeft: "0.25rem" }}>*</span></label>
                    <input type="text" id="name" className="form-control" placeholder="Full name" value={name} required
                        onChange={(e) => setName(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="Email">Email<span className='required' style={{ marginLeft: "0.25rem" }}>*</span></label>
                    <input type="email" id="email" className="form-control" placeholder="Enter your email" value={email} required
                        onChange={e => setEmail(e.target.value)}></input>
                    {/* <p className="required">*Required</p> */}
                </div>
                <div className="form-group">
                    <label htmlFor="birthday">Date of Birth<span className='required' style={{ marginLeft: "0.25rem" }}>*</span></label>
                    <input type="date" id="birthday" className="form-control" placeholder="Enter Date of Birth"
                        onChange={e => setBirthday(e.target.value)} required></input>
                </div>
                <div className="form-group">
                    <label htmlFor="gender">Select Gender<span className='required' style={{ marginLeft: "0.25rem" }}>*</span></label>
                    {/* <input type="text" id="gender"  className="form-control" placeholder="Enter Gender" 
                    onChange={ e => setGender(e.target.value)}></input> */}
                    <select className="form-control" onChange={e => setGender(e.target.value)} required>
                        <option value="" disabled selected>Choose your gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                    </select>
                </div>
                <div className="form-group" style={{ position: "relative" }}>
                    <label htmlFor="Password">Password<span className='required' style={{ marginLeft: "0.25rem" }}>*</span></label>
                    <input style={{ padding: "0.5rem 2rem" }} type={passwordShown ? "text" : "password"} id="password" className="form-control" placeholder="Create Password"
                        onChange={e => setPassword(e.target.value)} required></input>
                    <i style={{ top: "36px" }} className="fa fa-unlock-alt font-icon" aria-hidden="true"></i>
                    <i style={{ top: "36px", right:"10px", left:"auto", cursor:"pointer" }} class="fa fa-eye font-icon" onClick={showPass}></i>
                </div>
                <div className="form-group" style={{ position: "relative" }}>
                    <label htmlFor="batch">Batch<span className='required' style={{ marginLeft: "0.25rem" }}>*</span></label>
                    <select className="form-control" onChange={e => setBatch(e.target.value)} required>
                        <option value="" disabled selected>Choose your batch</option>
                        <option value="6-7AM">6-7AM</option>
                        <option value="7-8AM">7-8AM</option>
                        <option value="8-9AM">8-9AM</option>
                        <option value="5-6PM">5-6PM</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-size" style={{ minWidth: "100%" }}>Proceed To Payment</button>
                {next && <DialogueBox trigger={next} setTrigger={setNext} name={name} dob={dob} password={password} email={email} batch={batch} gender={gender}></DialogueBox>}
            </form>
        </div>
    </div>
  )
}
