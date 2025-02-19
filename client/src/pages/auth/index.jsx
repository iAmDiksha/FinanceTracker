import {SignedIn, SignedOut,SignInButton, SignOutButton, UserButton, SignUpButton} from '@clerk/clerk-react'
import { Navigate } from 'react-router-dom'
export const Auth = () => {
    return <div className='sign-in-container'>
        <SignedOut>
            <SignUpButton mode='modal' className="signup"/>
            <SignInButton mode='modal' className="signin"/>
        </SignedOut>
        <SignedIn>
            <Navigate to='/'/>
        </SignedIn>
    </div>
}