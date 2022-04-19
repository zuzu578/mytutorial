import { useEffect, useState } from 'react';
import './App.css';
import {changeNameByIds}  from './util/changeNameByIds';
import { Main } from './component/main';
import { getFreeChampions } from './apis/getRotationChampions';
import { RotationChampionList } from './component/rotationChampionList';
import { SummonerInfo } from './page/summonerInfo';
import { Route } from 'react-router-dom';
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
       <Route exact path="/find"> 
        <SummonerInfo/>
      </Route>
      <Route exact path="/"> 
        <Main/>
        <RotationChampionList getRotationChamps= {getRotationChamps}/>
      </Route>
      
      
    </div>

  );
}





export default App;
