class FilterUniqueEntries{
       private _set = new Set()
       
       constructor(){}

       public execute( entries:string[]){
         
          const result=[]
                 
          for( let entry of entries){

                if (!this._set.has(entry)){  
                    result.push(entry)
                    this._set.add(entry)
                  }
              }
          return result  
        }

       }
export default FilterUniqueEntries
