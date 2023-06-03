import Customer from "../Customer";

function formatAsCsvRow(customer:Customer):string{
           return `${customer.name},${customer.contactNumber}`
       }

export default {

  formatAsCsvRow
}