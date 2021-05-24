import { store } from '@redux/store'
import qs from 'query-string'
import { API_URL, displayToast } from '@common'
import * as RootNavigation from '../../RootNavigation'

class NetworkHelper {
    static post(url, params, headers = null){        
        return NetworkHelper.httpRequest('post', url, params, headers)
    }

    static get(url, headers = null){
        return NetworkHelper.httpRequest('GET', url, null, headers)
    }

    static httpRequest(method, url, params, headers){
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

            const { authReducers } = store.getState();
            
            if(authReducers.isLoggedIn) {
                options.headers["Authorization"] = `Bearer ${authReducers.userInfo.accessToken}`;
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
                        reject({});
                        displayToast('Token timeout.');
                        setTimeout(() => {
                            RootNavigation.navigate('login');
                        }, 2000);
                    } else if (status != 200) {
                        reject({});
                        displayToast(body.message ? body.message : 'Server error. Try again later.');
                    } else {
                        resolve(body);
                    }
                })
                .catch(err => {
                    reject(err);
                    displayToast('Server error. Try again later.');
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
