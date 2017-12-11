import AppConfig from '../configs/App'
import RequestBase from './RequestBase'

export default class Request extends RequestBase {
    // 登录
    static async login(args={}, flag = true) {
        return await this.post(AppConfig.MY_LOGIN, args, flag, false)
    }
}
