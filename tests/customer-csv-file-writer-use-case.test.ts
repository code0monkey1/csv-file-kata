import Customer from "../src/Customer"
import { FileWriter } from "../src/FileWriter"
import CustomerCsvFileWriter from "../src/customer-csv-file-writer-use-case"

describe('Customer CSV File writer',()=>{

    
   test('does exist',()=>{

          expect(CustomerCsvFileWriter).toBeInstanceOf(Function)
   })

   test("?",()=>{
       
    //Arrange
       const customer:Customer=new Customer("Chiranjeev","007");

       const mockFileWriter:FileWriter={
           writeLine:jest.fn()
       }

       const sut = new CustomerCsvFileWriter(mockFileWriter);
    
    //Act
         sut.execute('customers.csv',[customer])

         
    //Assert
        expect(mockFileWriter.writeLine).toHaveBeenCalledTimes(1)
        expect(mockFileWriter.writeLine).toHaveBeenCalledWith("customers.csv",customer.name)

   })


})