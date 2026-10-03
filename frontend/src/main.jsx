import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { Provider } from 'react-redux'
import store from './app/store.jsx'
import AppRoute from './routes/AppRoute.jsx'

createRoot(document.getElementById('root')).render(

 <Provider store={store}>
   <AppRoute/>
 </Provider>
   
 
)
