import axios from 'axios';
import { AppsConst } from '../shared/AppsConst';


export const getAllMovieList = async () => {
    try {
        const res = await axios.get(`${AppsConst.baseUrl}/movie/get-all-movie`, {
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


export const getAllMovieListFilter = async () => {
    try {
        const res = await axios.get(`${AppsConst.baseUrl}/movie/get-all-movie-filter`, {
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

export const createMovie = async (data) => {
    try {
        console.log('data register service', data);
        const res = await axios.post(`${AppsConst.baseUrl}/movie/create-movie`, data, {
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

