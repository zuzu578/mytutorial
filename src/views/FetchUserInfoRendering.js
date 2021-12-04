/**
 * fetch 하고 ,state 에 저장한 데이터를 rendering 해주는 역할을 하는 컴포넌트 
 * 역할 : fetch 한 데이터를 rendering 해주는 역할 
 * @param {*} props 
 * @returns 
 */
const FetchUserInfoRendering = (props) => {
    //console.log('name => ', props.findData.name);
    let tempArr = [];
    let obj = {};
    let filterMatchInfo = [];

    for (let i = 0; i < props.matchList.length; i++) {

        for(let j = 0 ; j < props.matchList[i].data.info.participants.length ; j++){

            if(props.findData.name === props.matchList[i].data.info.participants[j].summonerName){

                obj = {
                    gameStartTimestamp: props.matchList[i].data.info.gameStartTimestamp,
                    gameType: props.matchList[i].data.info.gameType,
                    championName:props.matchList[i].data.info.participants[j].championName,
                    role:props.matchList[i].data.info.participants[j].role,
                    
                }
                //console.log('matchList => ', props.matchList[i].data.info.participants[j]);
           }
            
        }
        
        tempArr.push(obj);

    }

   // console.log('tempArr =>' , tempArr);


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
                        {items.championName}
                        {items.role}
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