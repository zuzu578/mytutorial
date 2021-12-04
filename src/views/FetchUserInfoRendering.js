/**
 * fetch 하고 ,state 에 저장한 데이터를 rendering 해주는 역할을 하는 컴포넌트 
 * 역할 : fetch 한 데이터를 rendering 해주는 역할 
 * @param {*} props 
 * @returns 
 */
const FetchUserInfoRendering = (props) =>{

   console.log('props => ', props.findData);
    if(props.findData){
        return(

            <div> 
                <h1> rendering userinfoData </h1>
                <img src={'https://opgg-static.akamaized.net/images/profile_icons/profileIcon'+props.findData.profileIconId+'.jpg?image=q_auto:best&v=1518361200'}/>
                {props.findData.name}<br/>
                <br/>
                {props.findData.summonerLevel}
            </div>
        )

    }else{
        return(
            <div>
                
            </div>
        )
    }
    


}

export default FetchUserInfoRendering