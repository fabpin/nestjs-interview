'use client'

import {useState, useEffect } from "react";
import { ILogin, IToken } from "@ocmi/frontend/login/Login.interface";
import axios from "axios";
import { enviroment } from '../../env';
import validator from "validator";

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>('');
  const [token, setToken] = useState<IToken>();
  const [validEmail, setValidEmail] = useState<boolean>(false);
  const [validPassword, setValidPassword] = useState<boolean>(false);

  useEffect(() => {
    console.log('validEmail: ',validEmail);
    setValidEmail(validEmail)
  },[validEmail]);

  useEffect(() => {
    console.log('validPassword: ',validPassword);
    setValidPassword(validPassword)
  },[validPassword]);

  const signIn = async (ParametersLogin: ILogin) => {
    console.log('url: ',enviroment.API+'/auth');
    await axios.post(enviroment.API+'/auth', ParametersLogin)
      .then( response => {
        console.log('response.data: ',response.data);
        setToken(response.data);
      }).catch(error => {
        setError(error);
      });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('validator.isEmail(email.toString()): ',validator.isEmail(email.toString()));
    console.log('email: ',email);
    if(
      (validator.isEmail(email.toString()) && email) &&
      (validator.isStrongPassword(password.toString()) && password)
    ){
      setValidEmail(false);
      setValidPassword(false);
      await signIn({
        email,
        password
      });
    } else {
      console.log();
      if(!(validator.isEmail(email.toString()) && email)) {
        setValidEmail(true);
      }

      if(!(validator.isStrongPassword(password.toString()) && password)) {
        setValidPassword(true);
      }
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-12 w-full sm:w-[400px]">
      <div className="grid w-full items-center gap-1.5">
        <label htmlFor="email">Email</label>
        <input
          className="w-full shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          type="email"
        />
        { validEmail && <p className="text-red-500 text-xs italic">Please choose a valid email.</p> }
      </div>
      <div className="grid w-full items-center gap-1.5">
        <label htmlFor="password">Password</label>
        <input
          className="w-full shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          type="password"
        />
        { validPassword && <p className="text-red-500 text-xs italic">Please choose a valid password, a strong password is required.</p> }
      </div>
      { error && <div className="bg-white-900 text-center py-4 lg:px-4">
        <div className="p-2 bg-red-800 items-center text-red-100 leading-none lg:rounded-full flex lg:inline-flex"
             role="alert">
          <span className="flex rounded-full bg-red-500 uppercase px-2 py-1 text-xs font-bold mr-3">Info</span>
          <span
            className="font-semibold mr-2 text-left flex-auto">
            Error on the auth of the api
          </span>
        </div>
      </div> }
      <div className="w-full">
        <button className="grid w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          Button
        </button>
      </div>
    </form>
  );
}
