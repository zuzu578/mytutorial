import axios from 'axios';
import './App.css';
import { useState, useEffect } from 'react';
//import axios from 'axios'
//import FetchData from './views/Temp';
//import axiosFetchFnc from './common/commonAxios';
import FetchUserData from './views/FetchUserInfo';

function App() {
  const [getModal, setModal] = useState(false);
  //test component 
  const TestComponent = () => {

    const [testState, setTestState] = useState({ freeChampionIdsForNewPlayers: '' });

    useEffect(() => {

      function fetchData() {
        axios.get('https://kr.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=RGAPI-21fdeb58-7962-4831-8ca8-f14ef688d4e7')
        .then((res)=>{
          setTestState(res.data);
        })
      }
      fetchData();
    }, []);

    return (
      <div>
        <h1> test </h1>
        {testState.freeChampionIdsForNewPlayers}
      </div>

    )

  }

  return (

    <div className="App">

      {/*temp.freeChampionIdsForNewPlayers.map((championId, index) => (
        <div key={index}>
          {championId}
        </div>
      ))
      */}

      <button onClick={() => {
        if (getModal === false) {
          setModal(true)
        } else {
          setModal(false)
        }
      }}>button</button>

      {
      getModal === true
          ? <TestComponent/>
          : null
      }
      <FetchUserData />

    </div>

  );
}

export default App;
