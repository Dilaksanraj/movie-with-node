import axios from 'axios';
import { AppsConst } from '../shared/AppsConst';


export const getAllUser = async () => {
    try {
        const res = await axios.get(`${AppsConst.baseUrl}/user/get-all-user`, {
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