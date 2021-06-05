import NetworkHelper from './helper/NetworkHelper'

export const getInfo = () => {
    return NetworkHelper.get('/profile', true);
}

export const saveInfo = (data) => {
    return NetworkHelper.post('/profile/save', data, true);
}
