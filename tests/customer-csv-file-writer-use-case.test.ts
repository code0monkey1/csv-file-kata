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
                expect(()=>sut.writeCustomers(fileName,null!)).toThrowError("argument is null : `customers`")

         })
    })
   describe('No Customer',()=>{

             test("When no customers are present , no entries should be written",()=>{
                  
                //Arrange
                const mockFileWriter:FileWriter=createFileWriter()
        
                const sut = createCsvFileWriter(mockFileWriter)

                const fileName = 'customers.csv';
        
                //Act
                sut.writeCustomers(fileName,[])
                    
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
              sut.writeCustomers(fileName,[customer])
    
        //Assert
            expect(mockFileWriter.writeLine).toHaveBeenCalledTimes(1)
                    
            assertCustomerWasWrittenToFile(mockFileWriter,"customers.csv",customer)
    
        })

  })

    describe("many customers",()=>{
        test.each([
    
        {
            customers:CustomerTestHelper.customers,
    
        },
        
        
    
    ])("for customer: $customer._name $customer._contactNumber",({customers})=>{
            
            //Arrange
            
            const mockFileWriter:FileWriter=createFileWriter()
            
            const sut = createCsvFileWriter(mockFileWriter)
            const fileName = 'customers.csv';

            //Act
                sut.writeCustomers(fileName,customers)

            //Assert

             assertCustomersWereWrittenToFile(mockFileWriter,fileName,customers)

    })

  })

  describe("writeCustomersBatched",()=>{
          
      test("If the customers are 11 , then the name of the last file will be `customers1.csv`",()=>{
            
            const mockFileWriter:FileWriter=createFileWriter()
            
            const sut = createCsvFileWriter(mockFileWriter)
            
            const fileName = 'customers.csv';
            
            const  LAST_INDEX = 10

            const lastCustomer = CustomerTestHelper.customers11[LAST_INDEX]
            
            //Act
            sut.writeCustomersBatched(fileName,CustomerTestHelper.customers11)
      
            expect(mockFileWriter.writeLine)
            .lastCalledWith('customers1.csv',csvFileWriter.formatAsCsvRow(lastCustomer))
            
            assertCustomersWereWrittenToFile(mockFileWriter,fileName,CustomerTestHelper.customers11.slice(0,10))
            assertCustomersWereWrittenToFile(mockFileWriter,'customers1.csv',CustomerTestHelper.customers11.slice(10,))

            expect(mockFileWriter.writeLine).toHaveBeenCalledTimes(CustomerTestHelper.customers11.length)

      })

         test("If the customers are 26 , then the name of the last file will be `customers2.csv`",()=>{
            
            const mockFileWriter:FileWriter=createFileWriter()
            
            const sut = createCsvFileWriter(mockFileWriter)
            
            const fileName = 'customers.csv';
            
            const  LAST_INDEX = CustomerTestHelper.customers20.length-1

            const lastCustomer = CustomerTestHelper.customers20[LAST_INDEX]
            
            //Act
            sut.writeCustomersBatched(fileName,CustomerTestHelper.customers20)
      
            expect(mockFileWriter.writeLine)
            .lastCalledWith('customers2.csv',csvFileWriter.formatAsCsvRow(lastCustomer))
            
            assertCustomersWereWrittenToFile(mockFileWriter,fileName,CustomerTestHelper.customers20.slice(0,10))
            assertCustomersWereWrittenToFile(mockFileWriter,'customers1.csv',CustomerTestHelper.customers20.slice(10,20))

            assertCustomersWereWrittenToFile(mockFileWriter,'customers2.csv',CustomerTestHelper.customers20.slice(20,))

            expect(mockFileWriter.writeLine).toHaveBeenCalledTimes(CustomerTestHelper.customers20.length)

      })

      test("If file extension is missing , an error is thrown `File Extension Missing`",()=>{
            const mockFileWriter:FileWriter=createFileWriter()
            
            const sut = createCsvFileWriter(mockFileWriter)
            
            const fileName = 'customers';
            
            const customer = createCustomer("a","1")
            
            //Act         
            expect(()=>sut.writeCustomersBatched(fileName,[customer])).toThrow("File Extension Missing") 
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
        
   }

   function createCustomers(numberOfCustomers:number){
        const customers=[]

        for(let i=0;i<numberOfCustomers;i++){
            customers.push(createCustomer(i.toString(),i.toString()))
        }

        return customers
   }
