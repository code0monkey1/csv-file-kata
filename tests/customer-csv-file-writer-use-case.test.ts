import Customer from "../src/Customer";
import CustomerTestHelper from "../src/CustomerTestHelper";
import { FileWriter } from '../src/FileWriter';
import CustomerCsvFileWriter from "../src/customer-csv-file-writer-use-case";
import csvFileWriter from "../src/utils/csvFileWriter";
describe('Customer CSV File writer',()=>{
  
    describe('Null Customer',()=>{
         test("should throw ane exception",()=>{
          //Arrange
                const mockFileWriter:FileWriter=createFileWriter()
        
                const sut = createCsvFileWriter(mockFileWriter)

                const fileName = 'customers.csv';
        
                //Act
                expect(()=>sut.execute(fileName,null!)).toThrowError("argument is null : `customers`")

         })
    })
   describe('No Customer',()=>{

             test("When no customers are present , no entries should be written",()=>{
                  
                //Arrange
                const mockFileWriter:FileWriter=createFileWriter()
        
                const sut = createCsvFileWriter(mockFileWriter)

                const fileName = 'customers.csv';
        
                //Act
                sut.execute(fileName,[])
                    
                expect(mockFileWriter.writeLine).toBeCalledTimes(0)
                  
             })
   })
  describe("one customer",()=>{
        test.each([
    
        { customer:createCustomer("chinu","001") },
        { customer:createCustomer("jeevan",'002') }
    
    ])("for customer: $customer._name $customer._contactNumber",({customer})=>{
            
        //Arrange
            const mockFileWriter:FileWriter=createFileWriter()
    
            const sut = createCsvFileWriter(mockFileWriter)

             const fileName = 'customers.csv';
        
        //Act
              sut.execute(fileName,[customer])
    
        //Assert
            expect(mockFileWriter.writeLine).toHaveBeenCalledTimes(1)
                    
            assertCustomerWasWrittenToFile(mockFileWriter,"customers.csv",customer)
    
        })

  })


    describe("many customers",()=>{
        test.each([
    
        {
            customers:CustomerTestHelper.customers,
            expected:CustomerTestHelper.customerSignatures
        },
        
        
    
    ])("for customer: $customer._name $customer._contactNumber , expected: $expected",({customers})=>{
            
            //Arrange
            
            const mockFileWriter:FileWriter=createFileWriter()
            
            const sut = createCsvFileWriter(mockFileWriter)
            const fileName = 'customers.csv';

            //Act
                sut.execute(fileName,customers)

            //Assert

             assertCustomersWereWrittenToFile(mockFileWriter,fileName,customers)

    })

  })

  describe("when entries are less than 10",()=>{
          
      test("Only 1 file needs to be created with all entries",()=>{
         
              
          
      })

  })

})

   function createFileWriter():FileWriter{
       return {
            writeLine:jest.fn()
        }
   }  
   // this is done to isolate the construction details 
   function createCsvFileWriter(fileWriter:FileWriter):CustomerCsvFileWriter{
        return new CustomerCsvFileWriter(fileWriter)
   }

   // to remove the constructor details 
   function createCustomer(name:string,contactNumber:string):Customer{
     return  new Customer(name,contactNumber)
   }

   function assertCustomerWasWrittenToFile(fileWriter:FileWriter,fileName:string,customer:Customer){
         expect(fileWriter.writeLine)
                    .toHaveBeenCalledWith(fileName,csvFileWriter.formatAsCsvRow(customer))
   }

   function assertCustomersWereWrittenToFile(fileWriter:FileWriter,fileName:string,customers:Customer[]){
        customers.map( customer => assertCustomerWasWrittenToFile(fileWriter,fileName,customer))

        expect(fileWriter.writeLine).toHaveBeenCalledTimes(customers.length)
   }
