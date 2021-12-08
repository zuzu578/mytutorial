const IngameRenderComponent = (props) =>{
    console.log('props data =>' , props.ingameData);
    if(props.ingameData){
        return(
            <div>
                <h1>인게임정보</h1>
            </div>
        )
    }else{
        return(
            <div> 
                <h1> 해당 소환사는 게임중이 아닙니다.</h1>
            </div>
        )
    }
    
}
export default IngameRenderComponent;