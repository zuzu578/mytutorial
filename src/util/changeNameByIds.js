/**
 * 
 * @param arrays 
 * @desc : 챔피언 id 를 챔피언 영문이름으로 변경하는 Utils 
 * @returns 
 */
let params = [];
const changeNameByIds = (ids) => {
    const championNamesArr = [] ;
    //console.log('test!!!! ㅅㅂ ------>',ids)
    if(!Array.isArray(ids)){
        params.push(ids)
    }
    const champions = {};
    ids.map((item)=>{
        if(item === 22) { championNamesArr.push({id:22,champions:"Ashe"})}
        if(item === 28) { championNamesArr.push({id:28,champions:"Evelynn"})}
        if(item === 34) { championNamesArr.push({id:34,champions:"Anivia"})}
        if(item === 36) { championNamesArr.push({id:36,champions:"drmundo"})}
        if(item === 48) { championNamesArr.push({id:48,champions:"Trundle"})}
        if(item === 50) { championNamesArr.push({id:50,champions:"Swain"})}
        if(item === 55) { championNamesArr.push({id:55,champions:"Katarina"})}
        if(item === 89) { championNamesArr.push({id:89,champions:"Leona"})}
        if(item === 96) { championNamesArr.push({id:96,champions:"KogMaw"})}
        if(item === 104) { championNamesArr.push({id:104,champions:"Graves"})}
        if(item === 112) { championNamesArr.push({id:112,champions:"Viktor"})}
        if(item === 141) { championNamesArr.push({id:141,champions:"Kayn"})}
        if(item === 412) { championNamesArr.push({id:412,champions:"Thresh"})}
        if(item === 516) { championNamesArr.push({id:516,champions:"Ornn"})}
        if(item === 517) { championNamesArr.push({id:517,champions:"Sylas"})}
        if(item === 555) { championNamesArr.push({id:555,champions:"Pyke"})}

        
    })
    return championNamesArr;
}

export {changeNameByIds};