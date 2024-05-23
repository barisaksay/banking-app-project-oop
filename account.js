class Account {
    constructor(accountHolderName, initialDeposit) {

this.accountHolderName;
this.accountNumber;
this.balance;


        function createAccountNumber() {
            return + Math.floor(Math.random() * 1000000);
        }

        if (typeof accountHolderName !== "string" || typeof initialDeposit !=="number" || initialDeposit <= 0) {
            const invalidValue = ("Please provide a valid username and deposit");
            console.log(invalidValue);
        } else{
            this.accountNumber=createAccountNumber()
        }
     
        this.accountHolderName = accountHolderName;
        this.balance=initialDeposit;
    }
}

module.exports = Account;