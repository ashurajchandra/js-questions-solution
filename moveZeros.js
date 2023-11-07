

function moveZeros(arr){
    let nonZeroCount = 0;
   // move non-zeros towards start 
    for(let i =0; i<arr.length; i++){
        arr[nonZeroCount] = arr[i];
        nonZeroCount++
    }


    //fill remaining slots with zero
    for(let j=nonZeroCount ; j<arr.length; j++){
        arr[j] = 0
    }
}