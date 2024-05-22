class Account {
    constructor(accountHolderName,initialDeposit){

       function createAccountNumber(){
            return + Math.floor(Math.random()*1000000);
        }
        
        if(typeof balance !=="number" || initialDeposit <= 0){
           const balanceError= ("Please provide a valid balance")
            console.log(balanceError)
        } else{
            this.accountNumber = createAccountNumber()
             }
             this.accountHolderName= accountHolderName;
             this.balance = initialDeposit;
        }
      
    }

    module.exports = Account;