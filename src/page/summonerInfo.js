import { useEffect, useState } from 'react';
import { getSummonerInfo } from '../apis/getSummonerInfo';
import { getSummonerRank } from '../apis/getSummonerRank';
import { getMatchListByPuuid } from '../apis/getMatchListByPuuid';
import { getMatchDetailByMatchId } from '../apis/getMatchDetailByMatchId';
import { InputGroup,FormControl,Nav,NavDropdown,Button,Table,Modal} from 'react-bootstrap';
const url = new URL(window.location.href);
const urlParams = url.searchParams;
const summonerName = urlParams.getAll('name');

const SummonerInfo = () => {
    const [summonerInfo , setSummonerInfo] = useState({});
    const [summonerRankInfo , setSummonerRankInfo] = useState([]);
    const [getMatchDetailData, setMatchDetail] = useState([]);
    const [puuid,setpuuid] = useState('');
    const tempp = [];
    /**
     * 
     getMatchListByPuuid(res.puuid)
     */
    useEffect(()=>{
        getSummonerInfo(summonerName[0])
        .then((res)=>{
            setSummonerInfo(res.data);
            return res.data;
        })
        .then((res)=>{
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
            })
            return getSummonerRank(res.id);
        })
        .then((res)=>{
            setSummonerRankInfo(res.data);
        })
        
    },[])
    
    console.log(getMatchDetailData);
        return (
            <div>
              <div className="main_background">
                <div className="left">
                {getSummonerInfo.length !==0 ?
               <>
                <p> 갱신일자 : {summonerInfo.revisionDate}</p>
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

                </div>

                <div className="right">
                <Table striped bordered hover>
          <h1 className="matchTitle">매치정보</h1>
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
                              <p>{item.totalMinionsKilled+item.neutralMinionsKilled} </p>
                                 <p className="kdaPara">{item.kills}/{item.deaths}/{item.assists} <p className="winstatus">{item.win === true ? '승리': '패배'}</p></p>
                            
                            </div>: ''}
                         
                         </td>

                         <p className="myChampName">
                        {
                         item.summonerName === summonerInfo.name ? 
                         
                         <div>
                             {item.championName}({item.individualPosition})<br/>
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
                })}</td>
              </tr>
            );
          })}
          
                 
        </tbody>
        </Table>
                       
        
                </div>
              
               </div>
            </div>
        )

   
    
}

export{SummonerInfo};