import axios from 'axios';
import { AppsConst } from '../shared/AppsConst';



export const createComments = async (data) => {
    try {

        console.log('data register service', data);

        const res = await axios.post(`${AppsConst.baseUrl}/comment/create-comment`, data, {
            withCredentials: true
        })
        return res.data

    } catch (error) {

        if ((error).response?.status === 500) {
            console.error(error.response?.data?.msg)
        } else {
            console.error(error)
        }
        return false
    }
}

export const getAllMovieComments = async (index) => {
    try { 

        const res = await axios.get(`${AppsConst.baseUrl}/comment/get-all-comments`,{}, {
            withCredentials: true
        })
        return res.data.data

    } catch (error) {
        if ((error).response?.status === 500) {

            console.error(error.response?.data?.msg)
        } else {

            console.error(error)
        }
        return false
    }
}