import {useState,useEffect} from 'react';

import axiosFetchFnc from '../common/commonAxios';
import FetchUserInfoRendering from '../views/FetchUserInfoRendering';
/**
 * 유저의 닉네임을 받아서 , 해당 닉네임에 대한 데이터를 fetch 한다. 그런다음 , state 에 저장한다. 
 * 역할 : 데이터 fetch / 저장 
 * @returns 
 */
const FetchUserData = ()=>{
    let [userName, setUserName] = useState('');
    let [findData , setFindData] = useState('');
   
    const search = ()=>{

       

        let url = 'https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+userName+'?api_key=RGAPI-d0c308ae-0ebf-470f-a459-17a9ab6edd09';
        axiosFetchFnc(url,function(result){
        setFindData(result.data);
        

        });
    }
    return(
        <div>
   
            <h1>hello</h1>
            <input type="text"  onChange={ (e)=>{ setUserName(e.target.value) } } ></input>
            <button type="button" onClick={search} name="button" id="button"> 검색</button>
            <FetchUserInfoRendering findData = {findData}/>
        </div>

    )
   
}

export default FetchUserData;