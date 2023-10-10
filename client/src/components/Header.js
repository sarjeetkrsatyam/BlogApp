import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, AppBar, Toolbar, Button, Typography, Tabs, Tab } from '@mui/material'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../redux/store';

const Header = () => {
    //global store
    const isLogin = useSelector(state => state.isLogin)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [value, setValue] = useState()

    const handleLogout = () => {
        try {
            dispatch(authActions.logout())
            alert('Logout successfully')
            navigate('/login')

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <AppBar position='sticky' >
                <Toolbar>
                    <Typography variant='h4' >
                        My Blog App
                    </Typography>
                    {
                        isLogin && (
                            <Box display={'flex'} marginLeft='auto' marginRight='auto' >
                                <Tabs textColor='inherit' value={value} onChange={(e, val) => {
                                    setValue(val)
                                }} >
                                    <Tab label="Blog" LinkComponent={Link} to="/blog" />
                                    <Tab label=" My Blog" LinkComponent={Link} to="/my-blog" />
                                    <Tab label=" Create Blog" LinkComponent={Link} to="/create-blog" />



                                </Tabs>
                            </Box>
                        )
                    }
                    <Box display={"flex"} marginLeft="auto" >
                        {
                            !isLogin && (
                                <>
                                    <Button sx={{ margin: 1, color: 'white' }} LinkComponent={Link} to="/login" >Login </Button>
                                    <Button sx={{ margin: 1, color: 'white' }} LinkComponent={Link} to="/register" >Register </Button>
                                </>
                            )
                        }
                        {
                            isLogin && (
                                <Button sx={{ margin: 1, color: 'white' }} onClick={handleLogout}  >Logout </Button>
                            )
                        }

                    </Box>
                </Toolbar>

            </AppBar>
        </>
    )
}

export default Header
