import React from 'react'
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import  awsExports from '../aws-exports'

import { Navigate } from 'react-router-dom';

Amplify.configure(awsExports);

function Auth() {
  return (
    <div className="w-full h-full ">
      <div className="flex w-full h-screen">
       <div className= " bg-background w-7/12 h-screen"></div>
       <div className= " bg-secondary bg-opacity-60 w-5/12 h-screen flex">

       <Authenticator className="w-full">
      {({ signOut, user }) => (
        <Navigate to="/home" replace={true}/>
      )}
    </Authenticator>
       </div>
      </div>
    </div>
  )
}

export default Auth;
