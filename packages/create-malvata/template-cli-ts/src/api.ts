import axios from "axios";

const baseUrl: string = ""
const timeout: number = 10000;
const service = axios.create({
    baseURL: baseUrl,
    timeout: timeout
});

service.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
service.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});
export default class Api {

    public static request(url: string, data: any, config: any, method: string) {
        if (method === "get") {
            return service.get(url, {
                params: data,
                ...config
            })
        } else if (method === "post") {
            return service.post(url, data, config)
        } else {
            return service.request({
                url: url,
                params: data,
                method: method,
                ...config
            })
        }
    }


    public static async post(url: string, data: any, config: any = undefined) {
        let respones = await Api.request(url, data, config, 'post');
        return respones.data as IResponse;
    }

    public static async get<T = IResponse>(url: string, data: any, config: any = undefined) {
        let respones = await Api.request(url, data, config, 'get');
        return respones.data as T;
    }

    //上传文件

    public static pollTask(time: number, predicate: any) {
        return new Promise<IResponse>((resolve, reject) => {
            let poll = () => {
                setTimeout(function () {
                    predicate((res: any) => { resolve(res) }, () => { poll() })
                }, time);
            }
            poll();
        })
    }
}

interface IResponse {
    data: any;
    code: number;
    msg: string;
}

