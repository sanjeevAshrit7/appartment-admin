import React, { Suspense } from 'react'

// ** Router Import
import Router from './router/Router'
import { UserProvider } from './utility/context/adminContext'

const App = () => {
  return (
    <Suspense fallback={null}>
      <UserProvider>
        <Router />
      </UserProvider>
    </Suspense>
  )
}

export default App
