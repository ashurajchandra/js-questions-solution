

const createElement = (htmlElement,value)=>{
    const element =  document.createElement(htmlElement);
    element.innerText = value;
    return element
}


const throttle = (arr, limit, callback, delay )=>{
    let lastRan, timerId;
    const queue = [...arr];

    return (...args)=>{

        if(!lastRan){
            const execute = queue.splice(0,limit);
            // callback.call(this,args, execute)
            callback(execute)
            console.log("inside-if")
            lastRan = Date.now();
        }else{
            clearTimeout(timerId);
            timerId = setTimeout(()=>{
            const execute = queue.splice(0,limit);
            //  callback.call(this,args, execute)
            callback(execute)
             lastRan = Date.now()
             console.log("insidee-else",)
            },delay - (Date.now()-lastRan))
        }
    }
}

function logThrottledValue(tasks){
    console.log("throttle-task",tasks)
}

const handleButtonClick = (e)=>{
 return throttle([1,2,3,4,5,6,7,8,9,10] , 2 , logThrottledValue, 2000)
}

const  renderElement=()=>{
    const button = createElement("button", "clickMe!!");
    console.log("button",button)
    document.body.append(button)
     button.addEventListener("click", handleButtonClick())
    //button.addEventListener("click",throttle([1,2,3,4,5,6,7,8,9,10] , 2 , (value)=>{ console.log("throttle-value",value)}, 2000))
}

renderElement()