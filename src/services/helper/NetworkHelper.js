import { store } from '@redux/store'
import qs from 'query-string'
import { Alert } from 'react-native'
import * as RootNavigation from '../../RootNavigation'
import * as Actions from '@redux/actions'
import { API_URL } from '@common'

class NetworkHelper {
    static post(url, params, needAuth, headers = null){        
        return NetworkHelper.httpRequest('post', url, params, needAuth, headers)
    }

    static get(url, needAuth, headers = null){
        return NetworkHelper.httpRequest('GET', url, null, needAuth, headers)
    }

    static httpRequest(method, url, params, needAuth, headers){
        const baseUrl = API_URL;

        return new Promise((resolve, reject) => {
            var options = {
                method,
                headers : {
                    'Accept':'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    // 'x-api-key' : "462c6ec5-c207-4f7a-9949-7a7391468679"
                }
            }

            if (needAuth) {
                const { authReducers } = store.getState();
                
                if(authReducers.isLoggedIn) {
                    options.headers["Authorization"] = `Bearer ${authReducers.token}`;
                }
            }
          
            if(params) {
                options.body = qs.stringify(params);
            }

            var status = 0;

            fetch(baseUrl + url, options)
                .then((response) => {
                    status = response.status;
                    return response.json();
                })
                .then((body) => {
                    if (status == 403) {
                        Alert.alert('Token abgelaufen. Nochmal anmelden.');
                        setTimeout(() => {
                            store.dispatch(Actions.Auth.logout());
                            RootNavigation.navigate('Login');
                        }, 2000);
                        reject({});
                    } else if (status != 200) {
                        console.log(url, body, status);
                        Alert.alert(body.error);
                        reject({});
                    } else {
                        resolve(body);
                    }
                })
                .catch(err => {
                    Alert('Interner Serverfehler');
                    reject(err);
                });
        });
    }

    static upload(url, params){
        return new Promise((resolve, reject) => {
            var options = {
                method:"POST",
                headers : {
                    'Accept':'application/json',
                    'Content-Type': 'multipart/form-data',
                    'x-api-key' : "462c6ec5-c207-4f7a-9949-7a7391468679"
                }
            };

            const {authReducers} = store.getState();

            if(authReducers.isLogedin || authReducers.userInfo) {
                options.headers["secret-key"] = authReducers.userInfo.secret;
            }

            const form_data = new FormData();
            form_data.append('file', params);
            options.body = form_data;

            fetch(url, options)
                .then((response) => {
                    return response.json()
                })
                .then((body) => {
                    resolve({statusCode:body.status, body}) 
                })
                .catch(err => { 
                    reject(err)
                });
        });
    }
}

export default NetworkHelper;
