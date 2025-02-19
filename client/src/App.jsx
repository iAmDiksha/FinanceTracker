import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route, Link, Navigate} from 'react-router-dom'
import { Dashboard } from './pages/dashboard'
import { Auth } from './pages/auth'
import { FinancialRecordProvider } from './contexts/financial-record-context'
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'

function App() {
  return (
    <Router>
      <div className="navbar">
        <Link to='/'>Dashboard</Link>
        <SignedIn>
            <UserButton/>
        </SignedIn>
        <SignedOut>
           <Navigate to='/auth'/>
        </SignedOut>
      </div>
      <div className='app-container'>
        <Routes>
          <Route path='/' element={
            <FinancialRecordProvider>
              <Dashboard/>
            </FinancialRecordProvider>
          } />
          <Route path='/auth' element={<Auth/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
