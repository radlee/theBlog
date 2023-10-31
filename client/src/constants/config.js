export const API_NOTIFICATION_MESSAGES = {
    loading: {
        title: 'Loading...',
        messgae: 'Data is being loaded, Please wait'
    },
    success: {
        title: 'Success',
        message: 'Data successfully loaded'
    },
    responseFailure: {
        title: 'Error',
        message: 'An Error occured while parsing request data'
    },
    networkError: {
        title: 'Error',
        message: 'Unable to connect with the server. Please check internet connectivity and try again later.'
    }
}

//API SERVICE CALL
// SAMPLE REQUEST 
// NEED SERVICE CALL: { url: '/', method: 'POST/GET/PUT/DELETE'  params: true/false, query: true/false }

export const SERVICE_URLS = {
    userSignup: { url: '/signup', method: 'POST' },
    userLogin: { url: '/login', method: 'POST' },
    uploadFile: { url: 'file/upload', method: 'POST' }
}