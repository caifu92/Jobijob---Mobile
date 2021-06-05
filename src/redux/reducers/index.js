import {persistCombineReducers} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

import authReducers from './auth'

const config = {
    key: 'root',
    storage: AsyncStorage,  
    whitelist: ["authReducers"]
};

const reducers = persistCombineReducers(config, {
    authReducers
});

export default reducers;
