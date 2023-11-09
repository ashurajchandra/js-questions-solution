// const url ='https://jsonplaceholder.typicode.com/todos/1'


// function generateKey(url,config){
//     const key = Object.keys(config)
//     .sort((a,b)=>a.localeCompare(b))
//     .map((item)=>item + ":"+ config[item].toString())
//     .join("&");

//     return url+key;
// }

//  async function makeApiCall(url,config){
//   try{
//     let response = await fetch(url,config)
//     response = await response.json()
//     return response
//   }catch(e){
//     return e
//   }
// }

// function cachedApi(timeDelay){
//     const cache = {}


//     return async function(url, config={}){
//       const key = generateKey(url,config);

//       const keyExist = cache[key];

//       if(!keyExist || Date.now()>cache.expiryTime){
//         console.log("Dat-now", Date.now())
//         console.log("cache.expiryTime+timeDelay",cache.expiryTime,timeDelay,cache.expiryTime+timeDelay)
//         //make new api call
//         console.log("making new api call as time is expired")

//         try{
//             const result = await makeApiCall(url,config)
//             cache[key]={result, expiryTime: Date.now()+timeDelay}
//             console.log("ecpiry-time", cache[key].expiryTime)

//         }catch(error){
//             console.log("hi error",error)

//         }


//       }
//       return cache[key].result
//     }

// }



// const call = cachedApi(1500)
// call('https://jsonplaceholder.typicode.com/todos/1', {method:"GET",test:"hii"}).then((a) => console.log("response-1",a));

// // it will be quick
// setTimeout(() => {
//     call('https://jsonplaceholder.typicode.com/todos/1', {}).then((a) => console.log("response-2-should be quick",a));
//   }, 700);

//   setTimeout(() => {
//     call('https://jsonplaceholder.typicode.com/todos/1', {}).then((a) => console.log("response-3",a));
//   }, 2000)

// helper function to create a key from the input
const generateKey = (path, config) => {
    const key = Object.keys(config)
      .sort((a, b) => a.localeCompare(b))
      .map((k) => k + ":" + config[k].toString())
      .join("&");
    return path + key;
  };


  // helper function to make api call
const makeApiCall = async (path, config) => {
    try{
      let response = await fetch(path, config);
      response = await response.json();
      return response;
    }catch(e){
      console.log("error " + e);
    }
    
    return null;
  };

const cachedApiCall = (time) => {
    // to cache data
    const cache = {};
    
    // return a new function
    return async function(path, config = {}) {
      // get the key
      const key = generateKey(path, config);
      
      // get the value of the key
      let entry = cache[key];
    
      // if there is no cached data
      // or the value is expired
      // make a new API call
      if(!entry || Date.now() > entry.expiryTime){
        console.log("making new api call");
        
        // store the new value in the cache
        try {
          const value = await makeApiCall(path, config)
          cache[key] = { value, expiryTime: Date.now() + time };
        }catch(e){
         console.log(e); 
        }
      }
      
      //return the cache
      return cache[key].value;
    }
  };

  const call = cachedApiCall(1500);

// first call
// an API call will be made and its response will be cached
call('https://jsonplaceholder.typicode.com/todos/1', {}).then((a) => console.log(a));
//"making new api call"
/*
{
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
}
*/

// cached response will be returned
// it will be quick
setTimeout(() => {
  call('https://jsonplaceholder.typicode.com/todos/1', {}).then((a) => console.log(a));
}, 700);
/*
{
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
}
*/

// a fresh API call is made
// as time for cached entry is expired
setTimeout(() => {
  call('https://jsonplaceholder.typicode.com/todos/1', {}).then((a) => console.log(a));
}, 2000);
//"making new api call"
/*
{
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
}
*/