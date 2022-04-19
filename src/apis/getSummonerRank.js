import api_key from "../common/api_key";
import axios from 'axios';
const getSummonerRank = (id) => {
    return new Promise((resolve, reject)=>{
        resolve(axios.get(`https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${api_key}`));
    })
}

export {getSummonerRank};