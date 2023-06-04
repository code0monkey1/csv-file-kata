describe("Filter Unique Entries",()=>{
   
   test("given a files array , only write entries that are not duplicates",()=>{
        const entries =["a","b","a"]
        const result=[]
        const mySet = new Set()
        
        for( let entry of entries){
           
          if (!mySet.has(entry)){
               result.push(entry)
            }
        }
         expect(result.length).toBe(2)

         expect(result).toContain("a")
         expect(result).toContain("b")

  })
  }

)