// Highlight the given word from string

const str = "Ultimate JavaScript / FrontEndMasters Guide";
// const words = ['Front', 'End', 'JavaScript',"End", "Java", "Javas"];
const words = ["Front","JavaScript", "End","End", "Java", "Javas", "Masters"];

function highlightWord(str, words){

    const uniqueKeywords = new Set(words);

    const arr = str.split(" ");
    console.log("arr",arr)
    console.log("words",words)

    const result = arr.map((item)=>{
        let output = ""
        if(uniqueKeywords.has(item)){
            console.log("item-js",item)
            output = `<strong>${item}</strong>`
            // return
        }else{
             for(let i = 0; i<item.length; i++){
                const prefix = item.slice(0,i+1);
                const suffix = item.slice(i+1);

                if(uniqueKeywords.has(prefix) && uniqueKeywords.has(suffix)){
                    output = `<strong>${prefix}${suffix}</strong>`

                }else if(uniqueKeywords.has(prefix) && !uniqueKeywords.has(suffix)){
                     output = `<strong>${prefix}</strong>${suffix}`
                    // output = `<strong>${prefix}${suffix}</strong>`
                }else if(!uniqueKeywords.has(prefix) && uniqueKeywords.has(suffix)){
                    // output = `${prefix}<strong>${suffix}</strong>`
                    output = `<strong> ${prefix}${suffix}</strong>`
                }
             }
            console.log("output",output)
           
        }
        return output !==''?output:item

    })
   console.log("result",result)
    return result.join(" ")
}




const result = highlightWord(str,words)

console.log("result",result)
const para = document.createElement('p')
para.innerText = str;
document.body.append(para)
document.body.append(result)