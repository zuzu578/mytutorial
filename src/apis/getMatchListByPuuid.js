import axios from 'axios';
import api_key from '../common/api_key';
const getMatchListByPuuid =  (puuid,count) => {

  if(!count){
    count = 5;
  }

  
  console.log('count',count);
    return new Promise((resolve , reject)=>{
        resolve(axios.get(`https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${count}&api_key=${api_key}`))
    })
   
  }
export {getMatchListByPuuid};
