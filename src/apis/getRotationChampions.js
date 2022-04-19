import axios from 'axios';
import api_key from '../common/api_key';
const getFreeChampions =  () => {
    return new Promise((resolve , reject)=>{
        resolve(axios.get(`https://kr.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${api_key}`))
    })
   
  }
export {getFreeChampions};
