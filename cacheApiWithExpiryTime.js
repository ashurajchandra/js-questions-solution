/*
Implement a function in JavaScript,
 that caches the API response for the given amount of time.
  If a new call is made between that time, 
  the response from the cache will be returned, 
  else a fresh API call will be made.
*/

// create a cacheResponse function which will take expiry time

// maintain a counter variable and update value after first api call


async function cacheResponse(time=1000, url="https://jsonplaceholder.typicode.com/todos/1"){
    let counter =0;
    let timeSinceLastCall;
    // let apiResponse = new Map()
    let apiResponse 
    let timerId
    
    if(apiResponse){
      timerId=  setTimeout(()=>{
            apiResponse=null
        },time)
    }

    if(counter>0 && Date.now()-timeSinceLastCall<time){
        return apiResponse
    }

    async function api(){
       try{
        const response = await fetch(url)
        const jsonResponse = await response.json();
        return jsonResponse;
       }catch(error){
        return error
       }
     }


     try{

        const result = await api();
        timeSinceLastCall= Date.now()
       
        if(counter ==0){
            return result
        }else{
            apiResponse=result;
            counter++
            return apiResponse
        }
       
        
        

     }catch(error){
        console.log("error",error)
     }



}

console.log("hii-1",cacheResponse().then((result)=>console.log(result)))
console.log("hii-2",cacheResponse().then((result)=>console.log(result)))

