
import axios from 'axios'
import { useState } from 'react';
/**
 * axios 공통 모듈 
 * @param {*} url 
 * @param {*} callback 
 * @returns 
 */

const AxiosFetchFnc = async (userName, api_key, callback) => {




  try {
    // 검색한 소환사의 정보를 가져온다.(기본정보)
    const fetchData = await axios.get('https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + userName + '?api_key=' + api_key + '');
    // 검색한 소환사 정보중 puuId 를 이용하여 match id List 를 가져온다.
    const fetchData2 = await axios.get('https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/' + fetchData.data.puuid + '/ids?start=0&count=15&api_key=' + api_key + '');


    return callback(fetchData, fetchData2);

  } catch (error) {
    console.log(error);
  }


}

export default AxiosFetchFnc