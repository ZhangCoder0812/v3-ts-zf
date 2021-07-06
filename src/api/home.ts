import axios from '.'
import { ISlider, CATEGORY_TYPES } from '@/typings/home'

/* 获取轮播图的接口
    export function getSliders() {
        return axios.get('/slider/list')
    }
       鼠标放上去 这里data是个any 就不好提示 
    getSliders().then(data=>{

    })
*/

// 使用泛型 鼠标放在会有提示告诉你有几个参数 
export function getSliders<T>() {
    return axios.get<T, T>('/slider/list')
}

// getSliders<ISlider>().then(data => {

// })

export function getLessons<T>(category: CATEGORY_TYPES, offset: number = 0, limit: number = 5) {
    return axios.get<T, T>(`/lesson/list?category=${category}&offset=${offset}&limit=${limit}`)
}