class FilterUniqueEntries{
       private _set = new Set()
       private _files:string[] = []
       constructor(){}

       public execute( entries:string[]){
           this._files=files
         
          const result=[]
          const mySet = new Set()
          
          for( let entry of entries){

                if (!mySet.has(entry)){  
                    result.push(entry)
                    mySet.add(entry)
                  }
              }
              
        }

       }
