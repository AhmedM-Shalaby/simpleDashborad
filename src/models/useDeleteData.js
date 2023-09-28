import axios from 'axios';

export const DeleteData = (url,id)=>{
  axios({
    url : url,
    method:"delete",
  })
    .then(response => {
      console.log(response);
      console.log(`Deleted post with ID ${id}`);
    })
    .catch(error => {
      console.error(error);
    });
}