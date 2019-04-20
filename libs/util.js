//axios的ajax封装
import axios from 'axios'

const Util = {
    imgPath: 'http://127.0.0.1:8011/img/',
    apiPath: 'http://127.0.0.1:8010/'
}


Util.ajax = axios.create({
    baseURL: Util.apiPath
});

// 添加响应拦截器
Util.ajax.interceptors.response.use(res => {
    return res.data;
});
//拦截器
// console.log(instance);
// instance.interceptors.reponse.use( res => { ???/你他么response都不会拼？！
//     return res.data;
// });

//获取当天0点时间
Util.getTodayTime = function() {
    const date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    // console.log(date.getTime());
    return date.getTime();
};

//获取日期'yyyymmdd'
Util.prevDay = function(timestamp = (new Date()).getTime()) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1;
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    //getDate()	从 Date 对象返回一个月中的某一天 (1 ~ 31)。
    // getDay()	从 Date 对象返回一周中的某一天 (0 ~ 6)。
    return year+month+day;
};

export default Util;