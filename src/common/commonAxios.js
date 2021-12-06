
import axios from 'axios'

//import { useState } from 'react';
/**
 * axios 공통 모듈 
 * @param {*} url 
 * @param {*} callback 
 * @returns 
 */

const AxiosFetchFnc = async (hashParams, callback) => {
  try {
    //console.log('userName , api_key 가 있을경우 유저 기본정보 , 매치 리스트를 가져온다.');
    if (hashParams.userName && hashParams.api_key) {
      // 검색한 소환사의 정보를 가져온다.(기본정보)
      const fetchData = await axios.get('https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + hashParams.userName + '?api_key=' + hashParams.api_key + '');
      //console.log('fetchData =>' , fetchData);
      // 검색한 소환사 정보중 puuId 를 이용하여 match id List 를 가져온다.
      const fetchData2 = await axios.get('https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/' + fetchData.data.puuid + '/ids?start=0&count=18&api_key=' + hashParams.api_key + '');

      return callback(fetchData, fetchData2);

    } else if (hashParams.encryptedSummonerId) {
      //console.log('encryptedSummonerId 가 있을경우 , 인게임 정보리스트를 가져온다. ')

      const fetchIngameData = await axios.get('https://kr.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/' + hashParams.encryptedSummonerId + '?api_key=' + hashParams.api_key + '')

      return callback(fetchIngameData);

    }


  } catch (error) {
    console.log(error);
  }

}

export default AxiosFetchFnc