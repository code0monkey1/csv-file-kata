describe("Filter Unique Entries",()=>{
   
   test("given a files array , only write entries that are not duplicates",()=>{
        const entries =["a","b","a"]
        
        const mySet = new Set(entries)
     
         expect(mySet.size).toBe(2)

         expect(mySet).toContain("a")
         expect(mySet).toContain("b")

  })
  }

)