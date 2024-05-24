class Account {
    constructor(accountHolderName, initialDeposit) {

this.accountHolderName;
this._accountNumber;
this._balance;


        function createAccountNumber() {
            return + Math.floor(Math.random() * 1000000);
        }

        if (typeof accountHolderName !== "string" || typeof initialDeposit !=="number" || initialDeposit <= 0) {
            const invalidValue = ("Please provide a valid username and deposit");
            console.log(invalidValue);
        } else{
            this._accountNumber=createAccountNumber()
        }
     
        this.accountHolderName = accountHolderName;
        this._balance=initialDeposit;
    }

    get balance(){
        return this._balance;
    }

   get accountNumber(){
       return this._accountNumber;
   }

    get accountHolder(){
        return this.accountHolderName;
    }

    set balance(amount){
        return this._balance+amount;
    }
}

module.exports = Account;