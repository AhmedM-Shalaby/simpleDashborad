import axios from 'axios';
export const editData= (url,data)=>{
  axios.put(url, data)
}