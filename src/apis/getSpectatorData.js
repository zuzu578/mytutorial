import axios from 'axios';
import api_key from '../common/api_key';
const getSpectatorData =  (id) => {
    return new Promise((resolve , reject)=>{
        resolve(axios.get(`https://kr.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${id}?api_key=${api_key}`))
    })
   
  }
export {getSpectatorData};
