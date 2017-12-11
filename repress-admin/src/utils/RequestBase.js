import axios from 'axios'
import AppConfig from '../configs/App';
import CommonUtil from './CommonUtil';
import store from '../redux/store';

// 网络请求基类
export default class RequestBase {

    static async base(url, method, args, showLoading = true, auth = true) {
        try {

            console.log(url, args);

            if (showLoading) {
                CommonUtil.showLoading();
            }

            let config = {};

            config.method = method;
            config.url = url;
            if (config.method === 'get') {
                config.data = {};
                config.params = args;
            } else {
                config.data = args;
            }

            let res = await axios(config);

            if (showLoading) {
                CommonUtil.hideLoading();
            }

            console.log(res,res.data);

            if (res.status !== 200) {
                return {status: -3, msg: '网络请求异常'};
            }

            if (res.status === -999) {

                // todo no login
            }

            return res.data;
        } catch (e) {
            console.log(e);
            if (showLoading) {
                CommonUtil.hideLoading();
            }
            return {status: -3, msg: '网络请求异常'};
        }
    }

    static async get(url, args, showLoading, auth) {
        return await this.base(url, 'get', args, showLoading, auth);
    }

    static async post(url, args, showLoading, auth) {
        return await this.base(url, 'post', args, showLoading, auth);
    }
}