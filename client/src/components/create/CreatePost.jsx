import { useState, useEffect, useContext } from 'react';
import { Box, Button, FormControl, InputBase, styled, TextareaAutosize } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useLocation } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider';
import { API } from '../../service/api';

const Container = styled(Box)`
    margin: 50px 100px;
`;

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`;

const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 25px;
`;

const Textarea = styled(TextareaAutosize)`
    width: 100%;
    margin-top: 50px;
    font-size: 18px;
    border: none;
    &:focus-visible {
        outline: none;
    }
`;

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date()
}

const CreatePost = () => {

    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');
    
    const { account } = useContext(DataContext);
    
    const location = useLocation();

    const url = post.picture ? post.picture : 'https://images.pexels.com/photos/459654/pexels-photo-459654.jpeg?auto=compress&cs=tinysrgb&w=400';

    useEffect(() => {
        const getImage = async () => {
            if(file) {
                const data = new FormData();
                data.append('name', file.name);
                data.append('file', file);

                //API Call
                const response = await API.uploadFile(data);
                post.picture = response.data;
            }
        }
        getImage();
        post.categories = location.search?.split?.('=')[1] || 'All';
        post.username = account.username;
    },[file]);

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value })
    }
    return (
        <Container>
            <Image src={url} alt="banner" />
            <StyledFormControl>
                <label htmlFor='fileInput'>
                    <FileUploadIcon fontSize='large' color='action'/>
                </label>
                <input type='file' id='fileInput' style={{ display: 'none' }} onChange={(e) => setFile(e.target.files[0])} />
                <InputTextField placeholder='Title' onChange={(e) => handleChange(e)} name='title' />
                <Button variant='contained'>Publish</Button>
            </StyledFormControl>
            <Textarea 
                minRows={5}
                placeholder='Tell your story...'
                onChange={(e) => handleChange(e)}
                name='description'
            />
        </Container>
    )
}

export default CreatePost;