import React from "react";
import "../styles/RegisterStyle.css";
import { Form, Input, message } from "antd";
import { useDispatch} from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom"

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

//form hanler
const onfinishHandler = async (values) => {
  try {
    dispatch(showLoading());
    const res = await axios.post("https://doc-app-e0b3dzhxd6e4etaz.centralus-01.azurewebsites.net/login", values);
    window.location.reload();
    dispatch(hideLoading());
    if(res.data.success){
      localStorage.setItem("token", res.data.token)
      message.success("Login successfully");
      navigate("/");
      
    }else{
      message.error(res.data.message);
    }
  } catch (error) {
    dispatch(hideLoading());
    console.log(error);
    message.error("something went wrong");
  }
}
  return (
     <>
          <div className="form-container">
            <Form layout="vertical" onFinish={onfinishHandler} className="register-form">
              <h3 className="text-center">Login form</h3>
              <Form.Item label="Email" name="email">
                <Input type="email" required/>
              </Form.Item>
              <Form.Item label="Password" name="password">
                <Input type="password" required/>
              </Form.Item>
              <Link to="/register" className="m-2">Not a user Register here here</Link>
              <button className="btn btn-primary" type="submit">Login</button>
            </Form>
          </div>
     </>    
  );
};

export default Login; 