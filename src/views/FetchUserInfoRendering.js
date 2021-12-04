/**
 * fetch 하고 ,state 에 저장한 데이터를 rendering 해주는 역할을 하는 컴포넌트 
 * 역할 : fetch 한 데이터를 rendering 해주는 역할 
 * @param {*} props 
 * @returns 
 */
const FetchUserInfoRendering = (props) => {
   
    let tempArr = [];
    let obj = {};
    for (let i = 0; i < props.matchList.length; i++) {
        //console.log('matchList => ', props.matchList[i].data.info.gameStartTimestamp)
        obj = {
            gameStartTimestamp : props.matchList[i].data.info.gameStartTimestamp,
            gameType : props.matchList[i].data.info.gameType,
        }
        tempArr.push(obj);
      
    }
    console.log(tempArr);
  
    if (props.findData) {
        return (
            <div className="resultArea">
                <img src={'https://opgg-static.akamaized.net/images/profile_icons/profileIcon' + props.findData.profileIconId + '.jpg?image=q_auto:best&v=1518361200'} />
                <span>{props.findData.name}</span>
                {props.findData.summonerLevel}

                {tempArr.map((items, index) => (
                    <div key={index}>
                         {items.gameStartTimestamp}
                        {items.gameType}
                    </div>
                ))
                }
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