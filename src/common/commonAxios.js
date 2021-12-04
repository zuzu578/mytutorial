
import axios from 'axios'
/**
 * axios 공통 모듈 
 * @param {*} url 
 * @param {*} callback 
 * @returns 
 */
const axiosFetchFnc = async(url,callback) =>{

  try{

    const fetchData = await axios.get(url);
   // console.log('fechted data =>' , fetchData);

    return callback(fetchData);

  }catch(error){
    console.log(error);
  }


}

export default axiosFetchFnc