

// function fetchWithTimeOut(url, timeout){

//     return new Promise(async (resolve,reject)=>{
//         const controller = new AbortController();
//         const signal = controller.signal;
//         let timerId;

//      try{
//         const response = await fetch(url, {signal});

//         const result = await response.json();
//         clearTimeout(timerId)
//         resolve(result)
//      }catch(error){
//           reject(error)
//      }

//      timerId = setTimeout(()=>{
//         console.log("Aborted")
//         controller.abort()
//      },timeout)
        

//     })

// }


async function fetchWithTimeOut(url, timeout =2000){
    const controller = new AbortController();
    const {signal} = controller;
    let timerId;

    //const fetchPromise =  await fetch(url, {signal});
    timerId = setTimeout(()=>{
     controller.abort()
    },timeout)

    try{
        const result = await fetch(url , {signal});
        

        console.log("result",result)
        const jsonResult = await result.json();
        clearTimeout(timerId)
        return jsonResult
    }catch(error){
      console.log("aborteddd",error)
      clearTimeout(timerId)
    }
}



async function hello(){
    try{
        const result =   await fetchWithTimeOut('https://jsonplaceholder.typicode.com/todos/1', 2000)
      console.log("Result",result)
    }catch(e){
        console.log("e",e)
    }
}
hello()