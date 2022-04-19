const Main = () => {
    return(
        <div>
            <div className="banner_image">  
                <img src="https://opgg-static.akamaized.net/logo/20220331151842.a9c05f944cbb4e4cb283c341d34dbd07.png?image=q_auto,f_webp,w_1176&v=1650333355280"></img>
            </div>
            <div className="findUser">
                <input type="text" class="form-control" placeholder="소환사이름" aria-label="Username" aria-describedby="basic-addon1"></input>
            </div>
        </div>
    )
}

export {Main};