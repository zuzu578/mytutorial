const Main = () => {
    let summonerName = '';
    const getNames = (e) =>{
        summonerName = e.target.value;
    }
    const findByName = () => {
        if(!summonerName){
            return false;
        }
        window.location.href=`/find?name=${summonerName}`;
    }

    return(
        <div>
            <div className="banner_image">  
                <img src="https://opgg-static.akamaized.net/logo/20220331151842.a9c05f944cbb4e4cb283c341d34dbd07.png?image=q_auto,f_webp,w_1176&v=1650333355280"></img>
            </div>
            <div className="find">
                <div className="input-group mb-3">
                    <input type="text" onChange={getNames} className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
                    <button type="button" onClick={findByName} className="btn btn-info">검색 </button>
                </div>
            </div>
        </div>
    )
}

export {Main};