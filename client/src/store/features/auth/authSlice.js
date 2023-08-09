import authService from './authService'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Register user
export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const response = await authService.registerServ(userData)
      return response.data;
    } catch (error) {
    
      return thunkAPI.rejectWithValue( error.toString())
    }
  }
)

export const verifyEmail = createAsyncThunk(
  'auth/verify-email',
  async (userData, thunkAPI) => {
    try {
      const response = await authService.verifyEmailServ(userData)
      return response.data;
    } catch (error) {
    
      return thunkAPI.rejectWithValue( error.toString())
    }
  }
)

export const verify = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const response = await authService.registerServ(userData)
      return response.data;
    } catch (error) {
    
      return thunkAPI.rejectWithValue( error.toString())
    }
  }
)

export const doctorRegister = createAsyncThunk(
  'auth/apply-doctor',
  async (userData, thunkAPI) => {
    try {
     return await authService.doctorRegisterServ(userData, user.token)//buraya user?.token yazılabilir kontrol et
    }
    catch (error) {     
      console.log(error)
      return thunkAPI.rejectWithValue( error.toString())
    }
  }
)

// Login user
export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
  try {
    const response = await authService.loginServ(userData);
    return response.data
  }
  catch (error) {
    const message = `login işlemi başarısız oldu: ${error}`
    return thunkAPI.rejectWithValue(message)
  }
})

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logoutServ()
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(doctorRegister.pending, (state) => {
        state.isLoading = true
      })
      .addCase(doctorRegister.fulfilled, (state) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(doctorRegister.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
      // .addCase(verifyEmail.pending, (state) => {register işlemindeki stateler yeterli olacaktır
      //   state.isLoading = true
      // })
      // .addCase(verifyEmail.fulfilled, (state, action) => {
      //   state.isLoading = false
      //   state.isSuccess = true
      //   state.user = action.payload
      // })
      // .addCase(verifyEmail.rejected, (state, action) => {
      //   state.isLoading = false
      //   state.isError = true
      //   state.message = action.payload
      //   state.user = null
      // })
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer
