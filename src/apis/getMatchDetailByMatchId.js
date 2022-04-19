import axios from 'axios';
import api_key from '../common/api_key';
const getMatchDetailByMatchId =  (matchId) => {
    return new Promise((resolve , reject)=>{
        resolve(axios.get(`https://asia.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${api_key}`))
    })
   
  }
export {getMatchDetailByMatchId};
