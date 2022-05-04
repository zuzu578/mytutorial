import { useEffect, useState } from 'react';
import { getSummonerInfo } from '../apis/getSummonerInfo';
import { getSummonerRank } from '../apis/getSummonerRank';
import { getMatchListByPuuid } from '../apis/getMatchListByPuuid';
import { getMatchDetailByMatchId } from '../apis/getMatchDetailByMatchId';
import { Table} from 'react-bootstrap';
import { Loading } from '../component/loading';
import { change } from '../util/changeNameByIds';
import { Spectator } from '../component/spectator';
import { getChampionMastery } from '../apis/getChampionMastery';
import { getChangeNameByIds2 } from '../util/changeNameByIds';


const url = new URL(window.location.href);
const urlParams = url.searchParams;
const summonerName = urlParams.getAll('name');
let mastery = [];
let banned = [];
const SummonerInfo = () => {

    // 매치 더가져오기 초기변수 
    const [count ,setCount] =useState(10);
    // 초기데이터 로딩 여부  
    const [loading , setLoading] = useState(true);
    // 더가져오기 버튼 로딩 여부 
    const [moreBtnLoading, setMoreBtnLoading] = useState(false);
    const [summonerInfo , setSummonerInfo] = useState({});
    const [summonerRankInfo , setSummonerRankInfo] = useState([]);
    const [getMatchDetailData, setMatchDetail] = useState([]);
    const tempp = [];
    const [puuid , setpuuid] = useState('');
    const [id, setId] = useState('');
    const [getChampMasteryData , setChampMastery] = useState([{}])
    const [banned,setBanned] = useState([]);


    // 매치 더가져오기 
    const getMoreMatchButtons = () =>{
        setMoreBtnLoading(true);
        setCount(count+5);
        getMatchListByPuuid(puuid,count)
        .then(async(res)=>{
            for(const param of res.data){
                const item = await getMatchDetailByMatchId(param)
                tempp.push(item.data.info);
            }
            setMatchDetail(tempp);
            setMoreBtnLoading(false);

        });
    }
    useEffect(()=>{
        getSummonerInfo(summonerName[0])
        .then((res)=>{
            setSummonerInfo(res.data);
            return res.data;
        })
        .then((res)=>{
            setId(res.id);
            getChampionMastery(res.id)
            .then((res)=>{
                setChampMastery(res.data);
            })
            setpuuid(res.puuid);
            getMatchListByPuuid(res.puuid)
            .then(async(res)=>{
                //matchList get by puuid
                    for (const param of res.data) {
                        const item = await getMatchDetailByMatchId(param);
                        tempp.push(item.data.info)
                    } 
               return tempp
              
            })
            .then((res)=>{
                
                setMatchDetail(res);
                setLoading(false);
                
            })
            return getSummonerRank(res.id);
        })
        .then((res)=>{
            setSummonerRankInfo(res.data);
        })

    },[])
    // 챔피언 Id 로 이름변경 
    let getMasteryArr = [];
    for(const param of getChampMasteryData){
        getMasteryArr.push(param.championId);
    }
    
    const masteryList = async() => {
        const mastery = await change(getMasteryArr , 'mastery');
        return mastery;
    }
    
    const setMastery = async() =>{
        mastery = await masteryList();
    }
    setMastery()
    let temp = [];
    getMatchDetailData.map((item)=>{
        item.teams.map((item)=>{
            item.bans.map((item)=>{
                temp.push(item.championId);
                //await getChangeNameByIds2(item.championId)
            })
        })
    })

    console.log('testestestestes=t==>',temp);
        return (
            <div>
              <div className="main_background">
                <div className="left">
                {getSummonerInfo.length !==0 ?
               <>
                  <div className="summoner_001">
                    <div className="summonerImage">
                        <img src={`https://opgg-static.akamaized.net/images/profile_icons/profileIcon${summonerInfo.profileIconId}.jpg?image=q_auto&image=q_auto,f_webp,w_auto&v=1650333355280`}/>
                    </div>
                    <div className="summonerName">
                        <p> {summonerInfo.name}</p>
                    </div>
                
                    
                   </div>
                   
                    <div className="summonerLevel">
                        <p>{summonerInfo.summonerLevel}.LV</p>
                    </div>
                    <Spectator props = {summonerInfo.id}/>
                    
                        {summonerRankInfo.length !==0 ?summonerRankInfo.map((item)=>{
                            return(
                            <div key={item.id}>
                              <div className="summonerRank">
                                  <div className="rank_image">
                                    <img src={`https://opgg-static.akamaized.net/images/medals/${item.tier}_1.png?image=q_auto&image=q_auto,f_webp,w_auto&v=1650333355280`}/>
                                  </div>
                                  <div className="queueType">
                                    <p class="rank_para">{item.queueType === 'RANKED_SOLO_5x5'? '솔로랭크' : '자유랭크'}</p>
                                    <p class="tier_para">{item.tier}</p>
                                    <p class="Lp">{item.leaguePoints}LP / {item.wins}승 {item.losses}패</p>
                                  </div>
                                  
                                </div>
                               
                            </div>
                            )
                        }):
                   
                        <div className="summonerRank">
                            <div className="rank_image">
                                <img src='https://opgg-static.akamaized.net/images/medals/default.png?image=q_auto&image=q_auto,f_webp,w_auto&v=1650333355280'/>
                            </div>
                            <div className="queueType">
                                <p class="rank_para">Unranked</p>
                            </div>
                        </div>
                        }
                    
                  
                    </>: <></>}
                    <div>
                        <h3> 챔피언숙련도 </h3>
                       {mastery.map((item)=>{
                           return(
                               <div>
                                   {item.map((item)=>{
                                       return(
                                           <div className="mastery">
                                               <img src={`https://opgg-static.akamaized.net/images/lol/champion/${item}.png?image=q_auto,f_webp,w_264&v=1650333355280`}/>
                                            </div>
                                       )
                                   })}
                                </div>
                           )
                       })}
                      
                        
                    </div>

                </div>
                

    <div className="right">
        {loading === true ? <Loading/> : <Table striped bordered hover>
        <tbody>
          {getMatchDetailData.map(function (listValue,index) {
            return (
              <tr key={index}>
                <td>{listValue.gameMode}
                {listValue.participants.map((item)=>{
                    return(
                        <div>
                            {item.summonerName === summonerInfo.name ? item.win : ''}
                        </div>
                    )
                })}
                </td>
                
                <td>{listValue.participants.map((item)=>{
                    return(
                        <div>
                        <td>{item.summonerName === summonerInfo.name ?
                            <div className="myPickChamp">
                              <img src={`https://opgg-static.akamaized.net/images/lol/champion/${item.championName}.png?image=q_auto,f_webp,w_264&v=1650333355280`} />

                              <img src={`https://z.fow.kr/spell/${item.summoner1Id}.png`}/>
                              <img src={`https://z.fow.kr/spell/${item.summoner2Id}.png`}/>
                              {item.perks.styles.map((item)=>{
                                  return(
                                      <div>

                                      </div>
                                  )
                              })}
                              <p>레벨{item.champLevel}</p>
                              <p>cs:{item.totalMinionsKilled+item.neutralMinionsKilled} </p> 
                                <div className="ward">
                                    <img src={"https://s-lol-web.op.gg/static/images/icon/common/icon-ward-blue.png?v=1650474678151"}/>
                                    제어와드 {item.wardsPlaced}
                                </div>
                                 <p className="kdaPara">{item.kills}/{item.deaths}/{item.assists} <p className="winstatus">{item.win === true ? <p style={{color:"blue"}}>승리</p>: <p style={{color:"red"}}>패배</p>}</p></p>
                            
                            </div>: ''}
                         
                         </td>

                         <p className="myChampName">
                        {
                         item.summonerName === summonerInfo.name ? 
                         
                         <div>
                             {item.championName} 포지션:({item.lane})<br/>
                             <div className="items">
                                <img src={'https://opgg-static.akamaized.net/images/lol/item/'+item.item0+'.png?image=q_auto:best&v=1635906101'}/> 
                                <img src={'https://opgg-static.akamaized.net/images/lol/item/'+item.item1+'.png?image=q_auto:best&v=1635906101'}/> 
                                <img src={'https://opgg-static.akamaized.net/images/lol/item/'+item.item2+'.png?image=q_auto:best&v=1635906101'}/>
                                <img src={'https://opgg-static.akamaized.net/images/lol/item/'+item.item3+'.png?image=q_auto:best&v=1635906101'}/>  <br/>
                                <img src={'https://opgg-static.akamaized.net/images/lol/item/'+item.item4+'.png?image=q_auto:best&v=1635906101'}/> 
                                <img src={'https://opgg-static.akamaized.net/images/lol/item/'+item.item5+'.png?image=q_auto:best&v=1635906101'}/> 
                                <img src={'https://opgg-static.akamaized.net/images/lol/item/'+item.item6+'.png?image=q_auto:best&v=1635906101'}/> 
                             </div>
                        </div>
                        :''
                         
                         }
                        
                         </p>
                        
                        </div>
                        
                    )
                })}</td>
                <td>{listValue.participants.map((item)=>{
                    return(
                        <div>
                        <div> 
                            <div className="champParticipantsImgs"> 
                                <img src={`https://opgg-static.akamaized.net/images/lol/champion/${item.championName}.png?image=q_auto,f_webp,w_264&v=1650333355280`}/>
                               <a href={`/find?name=${item.summonerName}`}> {item.summonerName}</a>
                            </div>
                        </div>
                        </div>
                        
                    )
                })}
                </td>
                <td>
                 <p>밴</p>
                 {listValue.teams.map((item)=>{
                     return(
                         <div>
                           {item.bans.map((item)=>{
                               return(
                                   <div>
                                       {item.championId}
                                       {/* {getChangeNameByIds2(item.championId)} */}
                                    </div>
                               )
                           })}
                         </div>
                     )
                    
                     
                 })}
                 
                </td>
                
              </tr>
            );
          })}
          
                 
        </tbody>
        </Table> }
            
        {loading === true ?<><Loading/></>
        : <div className="moreLoad">
            {moreBtnLoading === true ? <Loading/> : <button className="w-btn w-btn-indigo" onClick={(e)=>{getMoreMatchButtons(puuid.puuid, e)}}> 매치 더 가져오기 </button>}
             
        </div> }
         
                </div>
              
               </div>
            </div>
        )

   
    
}

export{SummonerInfo};