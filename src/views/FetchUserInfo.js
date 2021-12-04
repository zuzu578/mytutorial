import { useState, useEffect } from 'react';
import axios from 'axios'
import AxiosFetchFnc from '../common/commonAxios';
import FetchUserInfoRendering from '../views/FetchUserInfoRendering';
const api_key = 'RGAPI-d0c308ae-0ebf-470f-a459-17a9ab6edd09';
/**
 * 유저의 닉네임을 받아서 , 해당 닉네임에 대한 데이터를 fetch 한다. 그런다음 , state 에 저장한다. 
 * 역할 : 데이터 fetch / 저장 
 * @returns 
 */
const FetchUserData = () => {
    let [userName, setUserName] = useState('');
    let [findData, setFindData] = useState('');
    let [matchList , setMatchList] = useState('');

    const search = () => {
        let matchList = [];
        let promises = [];

        AxiosFetchFnc(userName, api_key, function (result, result2) {

            setFindData(result.data);
            // match id List 를 이용하여 전적 list 데이터를 가져온다. 
            for (let i = 0; i < result2.data.length; i++) {
                promises.push(
                    axios.get('https://asia.api.riotgames.com/lol/match/v5/matches/' + result2.data[i] + '', {
                        params: {
                            api_key: api_key,
                        }
                    })
                        .then(response => {
                            matchList.push(response);
                        })
                )
            }
            Promise.all(promises).then(() => {
             //console.log('matchList ==>',matchList);
             setMatchList(matchList);
            })
        });

    }
    return (
        <div>
            <h1>search</h1>
            <input type="text" onChange={(e) => { setUserName(e.target.value) }} ></input>
            <button type="button" onClick={search} name="button" id="button"> 검색</button>
            <FetchUserInfoRendering findData={findData} matchList = {matchList} />
        </div>

    )

}

export default FetchUserData;