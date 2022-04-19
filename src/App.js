import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import api_key from './common/api_key';
import {changeNameByIds}  from './util/changeNameByIds';
import { Main } from './component/main';


const App = () => {
  const [getRotationChamps,setRotationChamps] = useState([]);
  
  useEffect(()=>{
    getFreeChampions()
    .then((res)=>{
      const rotationChampionList = changeNameByIds(res.data.freeChampionIds);
      setRotationChamps(rotationChampionList);
    })
    .catch((error)=>{
      console.log(error.message);
    })
  
  },[])
  return (

    <div className="App">
      <Main/>
      
     
    {getRotationChamps.map((item)=>{
      return (
        <div key={item.id}>
            <div className="rotation_champion_image">
              <div className="flex-box">
                <img src={'https://opgg-static.akamaized.net/images/lol/champion/'+item.champions+'.png?image=q_auto:best&v=1635906101'}/> 
              </div>
            </div>

          </div>
      )
    })}
    </div>

  );
}

const getFreeChampions =  () => {
  return new Promise((resolve , reject)=>{
    resolve(axios.get(`https://kr.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${api_key}`))
  })
 
}



export default App;