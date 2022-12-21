import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { register } from '../actions/userActions';
import { USER_REGISTER_RESET } from '../constants/userConstants';
export default function DialogueBox(props) {
    const dispatch = useDispatch();
    const userRegister = useSelector((state)=> state.userRegister);
    const {success} = userRegister;
    const navigate = useNavigate();

    const regSuccess = (e) =>{
        e.preventDefault();
        dispatch(register(props.name, props.email, props.dob, props.gender, props.password, props.batch));
    }

    useEffect(()=>{
        if(success){
            navigate('/RegSuccess');
            dispatch({type: USER_REGISTER_RESET});
        }
    })

  return (props.trigger)? (
    <div>
            <div className='popup-box'>
                <div className="close-icon"><i className="fa fa-times" onClick={() => props.setTrigger(false)}></i></div>
                <div className="popup-inner py-1" style={{ maxWidth: "500px" }}>
                    {/* <p className='itinery-name px-1' style={{ color: "#3A3A3A", fontWeight: "600", textAlign: "center" }}>Enter your Youtube URL.</p> */}
                    {/* <div className="iten-text px-1" style={{ color: "#00365B", textAlign: "center" }}> Are you sure you want to proceed with this action? </div> */}
                <form className="signinform" style={{top:"0px"}}>
                <div className="form-group">
                    <label htmlFor="url" style={{fontSize:"14px", letterSpacing:"0.03em", color:"#353535", fontWeight:"600", margin:"01rem 0 1rem 0.75rem"}}>Disclaimer</label>
                     <p>- You can enroll for the monthly classes and you will be paying the fees on a month on month basis, i.e. an individual will have to pay the fees
                          every month and he can pay it any time of the month.</p>
                     <p>- You can enroll any day but they will have to pay for the entire month. The monthly fee is 500/- Rs INR.</p>
                     <p>- There are a total of 4 batches a day namely 6-7AM, 7-8AM, 8-9AM and 5-6PM.</p>
                     <p>- The participants can choose any batch in a month and can move to any other batch next month. i.e. participants can shift from one batch to another in different months but in
                          same month they need to be in same batch.</p>
                    {/* <input type="text" id="url"  className="form-control" placeholder={"Enter URL"} value={props.type? youtube : portfolio} required 
                    onChange={changeLink}></input> */}
                </div>
                <button type="submit" className="btn" onClick={regSuccess}>Proceed To payment</button>
                </form>
                </div>
            </div>
        </div>
  ) : "";
}
