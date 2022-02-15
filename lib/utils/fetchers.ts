import axios from "axios";

export const getFetcher = (url: string) => axios.get(url).then(res => res.data)
export const postFetcher = (url: string) => axios.post(url).then(res => res.data)
export const patchFetcher = (url: string) => axios.patch(url).then(res => res.data)
export const deleteFetcher = (url: string) => axios.delete(url).then(res => res.data)