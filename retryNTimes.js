//Requirement

/*
Make an api call
if it fails for N number of times
close the service for particular amount of time
once time-limit over ---retry again
*/


function retryMultipleTimes(fun, retryCount, thresholdTime){
    let isServiceClose = false;
    let failureCount = 0;
    let timeSinceLastFailure;


    return function(...args){
       if(isServiceClose){
        let timeDifference = Date.now() - timeSinceLastFailure;
        if(timeDifference> thresholdTime){
            isServiceClose = false;
        }else{
            console.log("service is down")
             return 
        }
       }

       try{
        const result = fun(...args);
        failureCount = 0;
        return result;
       }catch(error){
         failureCount++;
         timeSinceLastFailure = Date.now();
         if(failureCount>=retryCount){
            isServiceClose = true;
         }
         console.log("error:",error)
       }
    }





}


// test function
const testFunction = () => {
    let count = 0;
    
    return function(){
      count++;
      if(count < 4){
        throw "failed";
      }else{
        return "hello";
      }
    }
  };
  
  
  let t = testFunction();
  let c = retryMultipleTimes(t, 3, 200);
  c()
  c()
  c()
  c()

  // service is closed for 200 MS
c(); // "service unavailable" 
c(); // "service unavailable"
c(); // "service unavailable"
c(); // "service unavailable"
c(); // "service unavailable"

// service becomes available after 300ms
setTimeout(() => {console.log(c());}, 300);
