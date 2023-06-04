describe("Filter Unique Entries",()=>{
   
   test("given a files array , only write entries that are not duplicates",()=>{
        const entries =["a","b","a"]
        
        const mySet = new Set(entries)
     
         expect(mySet).toHaveLength(2)

  })
  }

)