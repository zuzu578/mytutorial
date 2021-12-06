import { useState } from 'react';
import axios from 'axios'
import AxiosFetchFnc from '../common/commonAxios';
import FetchUserInfoRendering from '../views/FetchUserInfoRendering';
import api_key from '../common/api_key';
/**
 * 유저의 닉네임을 받아서 , 해당 닉네임에 대한 데이터를 fetch 한다. 그런다음 , state 에 저장한다. 
 * 역할 : 데이터 fetch / 저장 
 * @returns 
 */
const FetchUserData = () => {
    let [userName, setUserName] = useState('');
    let [findData, setFindData] = useState('');
    let [matchList, setMatchList] = useState('');
    let [encryptedSummonerId , setEncryptedSummonerId] = useState('');

    const search = () => {
        let matchList = [];
        let promises = [];
        // callback() => 다른 함수의 인자로 전달되는 함수 
        let hashParams = {
            userName : userName,
            api_key : api_key,
        }
        AxiosFetchFnc(hashParams, function (result, result2) {
            // fetch한 result 데이터를 callback 으로 받은후 , state 에 저장 
            setFindData(result.data);
            // fetch 한 유저 정보중에서 encrytedSummoner id 를 빼와서 state 에 저장 ( 공통 값 사용 )
            setEncryptedSummonerId(result.data.id);
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
            <FetchUserInfoRendering encryptedSummonerId ={encryptedSummonerId} findData={findData} matchList={matchList} />
        </div>

    )

}

export default FetchUserData;