// 소환사 게임정보 data fetch function module import 
import { useState } from 'react';
import FetchInagmeData from './FetchInagmeData';
import IngameRenderComponent from './IngameRenderComponent';
import FetchChampionMastery from './FetchChampionMastery';
import FetchChampionMasteryRendering from './FetchChampionMasteryRendering';
/**
 * fetch 하고 ,state 에 저장한 데이터를 rendering 해주는 역할을 하는 컴포넌트 
 * 역할 : fetch 한 데이터를 rendering 해주는 역할 
 * @param {*} props 
 * @returns 
 */
const FetchUserInfoRendering = (props) => {
    let [ingameData, setIngameData] = useState('');
    let [fetchIngameDataButton, setFetchIngameDataButton] = useState(false);
    let [fetchChapMasteryBtn, setChampionMasteryBtn] = useState(false);
    let [championMastery, setChampionMastery] = useState('');

    let tempArr = [];
    let obj = {};

    //console.log('props =>' , props.encryptedSummonerId);
    for (let i = 0; i < props.matchList.length; i++) {

        for (let j = 0; j < props.matchList[i].data.info.participants.length; j++) {

            if (props.findData.name === props.matchList[i].data.info.participants[j].summonerName) {

                obj = {
                    gameStartTimestamp: props.matchList[i].data.info.gameStartTimestamp,
                    gameType: props.matchList[i].data.info.gameType,
                    championName: props.matchList[i].data.info.participants[j].championName,
                    role: props.matchList[i].data.info.participants[j].role,
                    item0: props.matchList[i].data.info.participants[j].item0,
                    item1: props.matchList[i].data.info.participants[j].item1,
                    item2: props.matchList[i].data.info.participants[j].item2,
                    item3: props.matchList[i].data.info.participants[j].item3,
                    item4: props.matchList[i].data.info.participants[j].item4,
                    item5: props.matchList[i].data.info.participants[j].item5,
                    item6: props.matchList[i].data.info.participants[j].item6,
                }
                //console.log('matchList => ', props.matchList[i].data.info.participants[j].item0);
            }
        }

        tempArr.push(obj);

    }
    if (props.findData) {
        return (
            <div className="resultArea">

                <button onClick={(e) => {
                    FetchInagmeData(props.encryptedSummonerId, e, function (result) {

                        setIngameData(result);
                        /**
                         * setFetchIngameDataButton 
                         * 인게임정보 modal 의 상태 값 true , false 를 설정합니다. 
                         */
                        if (fetchIngameDataButton === false) {
                            setFetchIngameDataButton(true);
                        } else {
                            setFetchIngameDataButton(false);
                        }

                    })
                }}>인게임 정보가져오기 </button><br />

                <button onClick={(e) => {
                    FetchChampionMastery(props.encryptedSummonerId, e, promise => {
                        setChampionMastery(promise);

                        if (fetchChapMasteryBtn === false) {
                            setChampionMasteryBtn(true);
                        } else {
                            setChampionMasteryBtn(false);
                        }

                    })
                }}>챔피언 숙련도 가져오기</button><br />


                { /**
                   * 인게임 정보 rendering component 
                   */
                    fetchIngameDataButton === true
                        ? <IngameRenderComponent ingameData={ingameData} searchNameData={props.findData.name} />
                        : null
                }

                { /**
                   * 챔피언 숙련도 정보 rendering component 
                   */
                    fetchChapMasteryBtn === true
                        ? <FetchChampionMasteryRendering userName={props.findData.name} championMastery={championMastery}/>
                        : null

                }

                <img src={'https://opgg-static.akamaized.net/images/profile_icons/profileIcon' + props.findData.profileIconId + '.jpg?image=q_auto:best&v=1518361200'} />
                <span>{props.findData.name}</span>
                {props.findData.summonerLevel}
                <h1 className="matchTitle">매치정보</h1>
                <div className="table_items">
                    <table>
                        <tbody>
                            {tempArr.map(function (items, index) {
                                return (
                                    <tr key={index}>
                                        <td>{items.gameStartTimestamp}</td>
                                        <td>{items.gameType}</td>
                                        <td>{items.championName}</td>
                                        <td>{items.role}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )

    } else {
        return (
            <div>

            </div>
        )
    }



}

export default FetchUserInfoRendering