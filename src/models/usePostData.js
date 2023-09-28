import axios from "axios";

export const PostData= (url,data)=>{
  axios({
    method: 'post',
    url:url,
    data:data
  });
}