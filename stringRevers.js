function reverseString(str){
  if(str.length==0){
    return 
  }

  let reversedString = ''

  for(let i= str.length-1 ; i>=0; i--){
    reversedString = reversedString + str[i]
  }
  return reversedString
}

const str="hello"
const result = reverseString(str)
console.log("result",result)


function checkPalindrom(){
    const result = reverseString("hello")
    console.log("str ==result",str ==result)
    if(str ==result){
        console.log("string is pallindrom")
    }
}

checkPalindrom()