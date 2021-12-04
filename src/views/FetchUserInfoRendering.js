/**
 * fetch 하고 ,state 에 저장한 데이터를 rendering 해주는 역할을 하는 컴포넌트 
 * 역할 : fetch 한 데이터를 rendering 해주는 역할 
 * @param {*} props 
 * @returns 
 */
const FetchUserInfoRendering = (props) => {
    //console.log('props1 =>', props.matchList);
    let tempArr = [];
    for (let i = 0; i < props.matchList.length; i++) {
        //console.log('matchList => ', props.matchList[i].data.info.gameMode)
        tempArr.push(props.matchList[i].data.info.gameMode);
    }
    //console.log('tempArr',tempArr);
    if (props.findData) {
        return (
            <div className="resultArea">
                <img src={'https://opgg-static.akamaized.net/images/profile_icons/profileIcon' + props.findData.profileIconId + '.jpg?image=q_auto:best&v=1518361200'} />
                <span>{props.findData.name}</span>
                {props.findData.summonerLevel}

                {tempArr.map((items, index) => (
                    <div key={index}>
                        {items}
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