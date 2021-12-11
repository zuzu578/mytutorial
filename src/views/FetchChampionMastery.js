import AxiosFetchFnc from '../common/commonAxios';
import api_key from '../common/api_key';
import axios from 'axios';
/**
 * 검색한 소환사의 챔피언 숙련도 정보 data 를 fetch 한다 , 그리고 promise 로 return 하고 , callback 으로 전달해준다.
 * @param {*} encryptedSummonerId 
 * @param {*} e 
 * @param {*} promise 
 * @returns 
 */
const FetchChampionMastery = async (encryptedSummonerId,e,promise) =>{

let fetchData = await axios.get('https://kr.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/'+encryptedSummonerId+'?api_key='+api_key+'');
    return new Promise((resolve, reject)=>{
        resolve(fetchData.data);
    })
    
    .then((res)=>{
        return promise(res);
    })
    
    
}

export default FetchChampionMastery;