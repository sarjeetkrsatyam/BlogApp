import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, TextField } from '@mui/material';
import axios from 'axios';
const Register = () => {
  const navigate = useNavigate()
  //state
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: ''
  });

  // handle change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // form handle
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/user/register", { username: inputs.name, email: inputs.email, password: inputs.password })
      if (data.success) {
        alert('User Register successfully')
        navigate('/login');
      }
    } catch (error) {
      console.log(error)

    }
  }



  return (
    <>
      <form onSubmit={handleSubmit} >


        <Box maxWidth={450}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          margin={'auto'}
          marginTop={5}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          borderRadius={5}
        >
          <Typography variant='h4' padding={3} textAlign={'center'} sx={{ textTransform: 'uppercase' }} >
            Register
          </Typography>
          <TextField
            placeholder='name'
            value={inputs.name}
            name='name'
            margin='normal'
            type='text'
            required
            onChange={handleChange}

          />
          <TextField
            placeholder='email'
            value={inputs.email}
            name='email'
            margin='normal'
            type='email'
            required
            onChange={handleChange}

          />
          <TextField
            placeholder='password'
            value={inputs.password}
            name='password'
            margin='normal'
            type='password'
            required
            onChange={handleChange}
          />

          <Button
            type='submit'
            variant='contained'
            color='primary'
            sx={{ borderRadius: 2, marginTop: 3 }}
          >Submit</Button>

          <Button sx={{ borderRadius: 2, marginTop: 3 }}
            onClick={() => navigate('/login')} >
            Already Register ? Please Login
          </Button>
        </Box>
      </form>
    </>
  )
}

export default Register
