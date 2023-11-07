

class InMemorySearch{
    constructor(){
        //to store key value pair or namespace and value
        this.entities = new Map ()
    }

    addDocuments(nameSpace, ...document){
        console.log("nameSpace", ...document)

        //check if nameSpace exist....append the documents
        // or create new key and corresponding value

        const isNameSpaceExist = this.entities.has(nameSpace)
        if(!isNameSpaceExist){
            this.entities.set(nameSpace, [...document])
        }else{
            const existingDocument = this.entities.get(nameSpace)
            this.entities.set(nameSpace, [...existingDocument,...document])
        }

        console.log("present-entities",this.entities)

    }


    search(searchTerm, filterFun , sortOrder){
        const documents = this.entities.has(searchTerm);
        if(!documents){
            return "no result found"
        }
         const {key, order} = sortOrder;
        const searchedDocuments = this.entities.get(searchTerm)


        console.log("documents",documents)
        console.log("searchedDocuments",searchedDocuments)
        const filteredResult = searchedDocuments.filter(item=>filterFun(item))
        console.log("filteredResult",filteredResult)
        filteredResult.sort((a,b)=>{
          if(order=="asc"){
            return a[key]-b[key]
          }else{
            return b[key]-a[key]
          }
        })

        return filteredResult
    }
}

const searchEngine = new InMemorySearch();
searchEngine.addDocuments('Movies', 
                    {name: 'Avenger', rating: 8.5, year: 2017}, 
                    {name: 'Black Adam', rating: 8.7, year: 2022}, 
                    {name: 'Jhon Wick 4', rating: 8.2, year: 2023}, 
                    {name: 'Black Panther', rating: 9.0, year: 2022}
                   );

                   searchEngine.addDocuments('Movies',{name: 'Andaj apna apna', rating: 8.1, year: 2007}, 
                   {name: 'Dhoom', rating: 6.8, year: 2002},)


              const searchResult= searchEngine.search('Movies', (item)=>item.rating>8.2, {key:"rating", order:"des"})

              console.log("searchResult",searchResult)


              function InMemorySearchUpdated(){
                const entities = new Map()

                function createDocumentUpdated(name, ...docs){
                    const nameExist = entities.has(name);

                    if(nameExist){
                        const existingDocs = entities.get(name);
                        entities.set(name, [...existingDocs, ...docs])
                    }else{
                        entities.set(name, [...docs] )
                    }

                    console.log("entites",entities)
                }

                function searchDoc(name, filterFn, orderBy){
                    const nameExist = entities.has(name);
                    if(!nameExist){
                        alert("hiii")
                        return 'record do not exist'
                    }

                    const resultDocs = entities.get(name);
                    console.log("resultDocs",resultDocs)

                    const filterDocs = resultDocs.filter((item)=>filterFn(item))

                    const {key,order} = orderBy;

                    filterDocs.sort((a,b)=>{
                        if(order=='asc'){
                            a[key] - b[key]
                        }else{
                            b[key]-a[key]
                        }
                    })
                    return filterDocs




                }

                return {createDocumentUpdated, searchDoc}
              }


              const SearchEngine =InMemorySearchUpdated()

              SearchEngine.createDocumentUpdated('Movies', 
              {name: 'Avenger', rating: 8.5, year: 2017}, 
              {name: 'Black Adam', rating: 8.7, year: 2022}, 
              {name: 'Jhon Wick 4', rating: 8.2, year: 2023}, 
              {name: 'Black Panther', rating: 9.0, year: 2022}
             );

        const resultMovie =     SearchEngine.searchDoc("Movies", (movie)=>movie.rating>8.5, {key:"rating", order:"asc"})

        console.log("result-movie",resultMovie)