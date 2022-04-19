import axios from 'axios';
import api_key from '../common/api_key';
const getMatchListByPuuid =  (puuid) => {
    return new Promise((resolve , reject)=>{
        resolve(axios.get(`https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${api_key}`))
    })
   
  }
export {getMatchListByPuuid};
