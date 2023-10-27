import { useState } from 'react';
import { Box, TextField, Button, styled, Typography } from '@mui/material';
const Component = styled(Box)`
width: 400px;
margin: auto;
box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;
const image = styled('img')({
    width: 100,
    margin: 'auto',
    display: 'flex',
    padding: '50px 0 0'

});

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    flex-direction: column;
    & > div, & > button, & p {
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #ea1111;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const SignUpButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`;

const Text = styled(Typography)`
    color: #878787;
    font-sie: 16px;
`;
function Login() {

    const imageURL = 'https://mir-s3-cdn-cf.behance.net/project_modules/max_632/61ac58164464737.63f72d649fbb1.png';

    const [account, toggleAccount] = useState('login');

    const toggleSignup = () => {
        account ===  'signup' ? toggleAccount('login') : toggleAccount('signup');
    }

    const onInputChange = (e) => {
        console.log(e.target.name, e.target.value)
    }

  return (
    <Component>
        <Box>
            <img src={ imageURL } height="250px" alt="" style={{ display: 'block', margin: '0 auto' }}/>
            {
            account === 'login' ? 
                <Wrapper>
                    <TextField variant='standard' label='Enter Username'/>
                    <TextField variant='standard' label='Enter Password'/>
                    <LoginButton variant='contained'>Login</LoginButton>
                    <Text style={{ textAlign: 'center' }}>OR</Text>
                    <SignUpButton onClick={() => toggleSignup()}>Create an account</SignUpButton>
                </Wrapper> 
            :
                <Wrapper>
                    <TextField variant='standard' name='name' onChange={(e) => onInputChange(e)} label='Enter Name'/>
                    <TextField variant='standard' name='username' onChange={(e) => onInputChange(e)} label='Enter Username'/>
                    <TextField variant='standard' name='password' onChange={(e) => onInputChange(e)} label='Enter Password'/>
                    <SignUpButton>Signup</SignUpButton>
                    <Text style={{ textAlign: 'center' }}>OR</Text>
                    <LoginButton variant='contained' onClick={() => toggleSignup()}>Already have an account</LoginButton>
                </Wrapper>
            }
        </Box>
    </Component>
  )
}

export default Login