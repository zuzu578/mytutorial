import api_key from "../common/api_key";
import axios from 'axios';
const getSummonerInfo = (summonername) => {
    return new Promise((resolve, reject)=>{
        resolve(axios.get(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonername}?api_key=${api_key}`));
    })
}

export {getSummonerInfo};