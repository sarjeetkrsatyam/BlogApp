import { Box, InputLabel, TextField, Typography, Button } from '@mui/material'
// import { useNavigation } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

import React, { useState } from 'react'

const CreateBlog = () => {
    const id = localStorage.getItem('userID')
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({
        title: '',
        description: '',
        image: '',

    });
    // input change
    const handleChange = (e) => {
        setInputs(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    // form
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post('/api/v1/blog/create-blog', {
                title: inputs.title,
                description: inputs.description,
                image: inputs.image,
                user: id,
            });
            if (data?.success) {
                alert("Blog Created")
                navigate('/my-blog')
            }
        } catch (error) {
            console.log(error)
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit} >
                <Box border={3}
                    width={'55%'}

                    borderRadius={10}
                    padding={3}
                    margin={'auto'}
                    boxShadow={'10px 10px 20px #ccc'}
                    display={'flex'}
                    flexDirection={'column'}
                    marginTop={4}
                >
                    <Typography variant='h2'
                        textAlign={'center'}
                        fontWeight={'bold'}
                        padding={3}
                        color={'gray'}
                    >
                        Create A Post

                    </Typography>
                    <InputLabel sx={{ mb: 1, mt: 1, fontSize: '24px', fontWeight: 'bold' }} >
                        Title
                    </InputLabel>
                    <TextField name='title' value={inputs.title} onChange={handleChange} margin='normal' variant='outlined' required />
                    <InputLabel sx={{ mb: 1, mt: 1, fontSize: '24px', fontWeight: 'bold' }} >
                        Description
                    </InputLabel>
                    <TextField name='description' value={inputs.description} onChange={handleChange} margin='normal' variant='outlined' required />
                    <InputLabel sx={{ mb: 1, mt: 1, fontSize: '24px', fontWeight: 'bold' }} >
                        Image URL
                    </InputLabel>
                    <TextField name='image' value={inputs.image} onChange={handleChange} margin='normal' variant='outlined' required />

                    <Button type='submit' color='primary' variant='contained' >
                        SUBMIT
                    </Button>
                </Box>
            </form>
        </>
    )
}

export default CreateBlog
