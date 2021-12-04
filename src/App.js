import './App.css';
//import { useState, useEffect } from 'react';
//import axios from 'axios'
//import FetchData from './views/Temp';
//import axiosFetchFnc from './common/commonAxios';
import FetchUserData from './views/FetchUserInfo';

function App() {

  //let [temp, setTemp] = useState({ freeChampionIdsForNewPlayers: [] });

  // useEffect 한번만 실행 => [] 추가시 첫 렌더링일때만 실행 
  /* 

  useEffect(()=>{

    let url = 'https://kr.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=RGAPI-d0c308ae-0ebf-470f-a459-17a9ab6edd09';
    axiosFetchFnc(url,function(result){
      
    setTemp(result.data);
    });

  },[]);
*/
  return (

    <div className="App">

      {/*temp.freeChampionIdsForNewPlayers.map((championId, index) => (
        <div key={index}>
          {championId}
        </div>
      ))
      */}
      <FetchUserData />
    </div>

  );
}

export default App;