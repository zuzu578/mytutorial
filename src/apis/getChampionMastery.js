import axios from 'axios';
import api_key from '../common/api_key';
const getChampionMastery =  (id) => {
    return new Promise((resolve , reject)=>{
        resolve(axios.get(`https://kr.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}?api_key=${api_key}`))
    })
   
  }
export {getChampionMastery};
