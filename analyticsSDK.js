
function mySDK(){
    let queue = [];
    let count = 1;

    function logEvent(event){
        queue.push(event)
    }
   
    //function to delay the execution
   async function timeDelay(){

      return  new Promise((resolve,reject)=>{
            setTimeout(()=>{
            if(count % 5 ===0){
                reject(count)
            }else{
                resolve()
            }
            },1000)
        })
    }

   async function send(){

    //base case
    if(queue.length ==0){
        return "no events found"
    }
    const currentEvent = queue.shift();
     try{
         const result = await timeDelay();
        console.log("result",result)
        count++;
        console.log("Analytics sent ", currentEvent)


     }catch(error){
        console.log("error",error)
        console.log("Analytics sent  failed", currentEvent)
        console.log("......retrying event", currentEvent)
        count = 1
        queue.unshift(currentEvent)
     }finally{
        //recursively call function again
        send()
     }
    }

    return{logEvent, send}
}


const sdk = mySDK();

sdk.logEvent("hello event 1");
sdk.logEvent("hello event 2");
sdk.logEvent("hello event 3");
sdk.logEvent("hello event 4");
sdk.logEvent("hello event 5");

sdk.logEvent("hello event 6");
sdk.logEvent("hello event 7");
sdk.logEvent("hello event 8");
sdk.logEvent("hello event 9");
sdk.logEvent("hello event 10");

sdk.send()