import { useState } from "react";
import AxiosFetchFnc from '../common/commonAxios';
import api_key from '../common/api_key';
/**
 * 소환사의 인게임 정보를 가져오는 component  
 * @param {*} params 
 * @param {*} e 
 */
const FetchInageData = (encryptedSummonerId, e,callback) => {
    e.preventDefault();
    console.log(encryptedSummonerId);
    let hashParams = {
        encryptedSummonerId : encryptedSummonerId,
        api_key: api_key,
    }
    
    AxiosFetchFnc(hashParams,function(result){
        
        return callback(result);
    })
    
}
export default FetchInageData;