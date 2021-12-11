import AxiosFetchFnc from '../common/commonAxios';
import api_key from '../common/api_key';
import axios from 'axios';
const FetchChampionMastery = async (encryptedSummonerId,e,callback) =>{
console.log('callback',callback);
let fetchData = await axios.get('https://kr.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/'+encryptedSummonerId+'?api_key='+api_key+'');
    return new Promise((resolve, reject)=>{
        resolve(fetchData.data);
    })
    
    .then((res)=>{
        return callback(res);
    })
    
    
}

export default FetchChampionMastery;