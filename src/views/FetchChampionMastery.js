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
const FetchChampionMastery = async (encryptedSummonerId, e, promise) => {
    // axios => promise 기반  === promise object return 
    try {

        let fetchData = await axios.get('https://kr.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/' + encryptedSummonerId + '?api_key=' + api_key + '');
        //axios 통신후 , promise 객체를 return 한 object를 변수에 담고 , 콜백으로 인자값을 전달한다.
        return promise(fetchData.data);

    } catch (error) {

        console.log(error);
    }

}

export default FetchChampionMastery;