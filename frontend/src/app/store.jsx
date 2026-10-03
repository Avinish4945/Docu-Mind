import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from '../features/auth/state/AuthSlice'
import { documentSlice } from '../features/admin/state/documentsSlice'

export default configureStore({
  reducer: {
    auth:authSlice.reducer,
     documents: documentSlice.reducer,
  },


})
