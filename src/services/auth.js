import NetworkHelper from './helper/NetworkHelper'

export const signin = (credentials) => {
    return NetworkHelper.post('/login', credentials, false);
}

export const signup = (info) => {
    return NetworkHelper.post('/register', info, false);
}
