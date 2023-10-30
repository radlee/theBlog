import { useState, useContext } from 'react';
import { Box, TextField, Button, styled, Typography } from '@mui/material';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const Component = styled(Box)`
width: 400px;
margin: auto;
box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;
const Image = styled('img')({
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
const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`;

const Text = styled(Typography)`
    color: #878787;
    font-sie: 16px;
`;

const loginInitialValues = {
    username: '',
    password: ''
}

const signupInitialValues = {
    name: '',
    username: '',
    password: ''
}

function Login() {

    const imageURL = 'https://mir-s3-cdn-cf.behance.net/project_modules/max_632/61ac58164464737.63f72d649fbb1.png';

    const [account, toggleAccount] = useState('login');
    const [signup, setSignup] = useState(signupInitialValues);
    const [login, setLogin] = useState(loginInitialValues);
    const [error, setError] = useState('');

    const { setAccount } = useContext(DataContext);

    const toggleSignup = () => {
        account ===  'signup' ? toggleAccount('login') : toggleAccount('signup');
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name] : e.target.value })
    }
    
    const signupUser = async () => {
        let response = await API.userSignup(signup);
        if(response.isSuccess) {
            setError('');
            setSignup(signupInitialValues);
            toggleAccount('login');
        } else {
            setError('Something went wrong! Please try again later');
        }
    }

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value  })
    }

    const loginUser = async () => {
        let response = await API.userLogin(login);
        if(response.isSuccess) {
            setError('');

            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken }`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken }`);

            setAccount({ username: response.data.username, name: response.data.name });

        } else {
            setError('Something went wrong! Please try again later');
        }
    }

  return (
    <Component>
        <Box>
            <img src={ imageURL } height="250px" alt="" style={{ display: 'block', margin: '0 auto' }}/>
            {
            account === 'login' ? 
                <Wrapper>
                    <TextField variant='standard' value={login.username} onChange={(e) => onValueChange(e)} name="username" label='Enter Username'/>
                    <TextField variant='standard' value={login.password} onChange={(e) => onValueChange(e)} name="password" label='Enter Password'/>
                    { error && <Error>{ error }</Error> }
                    <LoginButton variant='contained' onClick={() =>  loginUser()}>Login</LoginButton>
                    <Text style={{ textAlign: 'center' }}>OR</Text>
                    <SignUpButton onClick={() => toggleSignup()}>Create an account</SignUpButton>
                </Wrapper> 
            :
                <Wrapper>
                    <TextField variant='standard' name='name' onChange={(e) => onInputChange(e)} label='Enter Name'/>
                    <TextField variant='standard' name='username' onChange={(e) => onInputChange(e)} label='Enter Username'/>
                    <TextField variant='standard' name='password' onChange={(e) => onInputChange(e)} label='Enter Password'/>
                    { error && <Error>{ error }</Error> }
                    <SignUpButton onClick={() => signupUser()}>Signup</SignUpButton>
                    <Text style={{ textAlign: 'center' }}>OR</Text>
                    <LoginButton variant='contained' onClick={() => toggleSignup()}>Already have an account</LoginButton>
                </Wrapper>
            }
        </Box>
    </Component>
  )
}

export default Login