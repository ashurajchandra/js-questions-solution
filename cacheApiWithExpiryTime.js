/*
Implement a function in JavaScript,
 that caches the API response for the given amount of time.
  If a new call is made between that time, 
  the response from the cache will be returned, 
  else a fresh API call will be made.
*/

// create a cacheResponse function which will take expiry time

// maintain a counter variable and update value after first api call


const generateKey=(url,config)=>{

    const key = Object.keys(config).sort((a,b)=>a.localeCompare(b))
    .map((item)=> item + ":" + config[item].toString())
    .join("&");

// console.log("key",key)
// console.log("url+key",url+key)
    return url+key;
}

const makeApiCall= async(path,config)=>{
    try{
        let response  = await fetch(path,config)
        response = await response.json();
        return response;
    }catch(error){
      console.log("error",error)
      return error
    }
}

const cachedApi = (time)=>{
    const cache = {};

    return async(url, config = {})=>{
       
        //generate key from config
        const key =  generateKey(url,config)

        //check if key is present in cache
        const entry = cache[key];

        //if key ie not in cache or time has expired
        //make a new api call

        if(!entry || Date.now()>entry.expiryTime){
            console.log("making new api call")
            
            //store new value in cache after making api call
            try{
                const response = await makeApiCall(url,config)
                cache[key] = {response, expiryTime: Date.now()+time}
            }catch(e){
                console.log("error",e)
            }
        }
            //return the cache
            // console.log("cache",cache[key].response)
    return cache[key].response
    }


}


const call = cachedApi(1500)
call('https://jsonplaceholder.typicode.com/todos/1', {method:"GET",test:"hii"}).then((a) => console.log("response-1",a));

// it will be quick
setTimeout(() => {
    call('https://jsonplaceholder.typicode.com/todos/1', {}).then((a) => console.log("response-2",a));
  }, 700);

  setTimeout(() => {
    call('https://jsonplaceholder.typicode.com/todos/1', {}).then((a) => console.log("response-3",a));
  }, 2000);