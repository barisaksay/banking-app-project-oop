class Account {
    constructor(accountHolderName, initialDeposit) {

        if (typeof accountHolderName !== "string" || typeof initialDeposit !== "number" || initialDeposit <= 0) {
            throw new Error("Please provide a valid username and deposit");
        } else {
            this._accountNumber = createAccountNumber();
            this.accountHolderName = accountHolderName;
            this._balance = initialDeposit;
            this.transactionHistory=[];
            this.transactionHistory.push({"amount":initialDeposit,"date":new Date()})
        }

        function createAccountNumber() {
            return Math.floor(Math.random() * 1000000);
        }
    }

    get balance() {
        return this._balance;
    }

    get accountNumber() {
        return this._accountNumber;
    }

    get accountHolder() {
        return this.accountHolderName;
    }

    set accountHolder(newName) {
        return this.accountHolderName = newName;

    }
    addBalance(amount) {
        if (amount <= 0 || typeof amount !== 'number') {
            return "Please enter a valid amount";
        } else {
            this._balance += amount;
            this.transactionHistory.push({"amount":amount,"date":new Date()})
            return `You have succesfully added ${amount} USD to your account. Your current balance is ${this._balance} USD`;
        }

    }
}

function createAccount(accountHolderName, initialDeposit) {
    return new Account(accountHolderName, initialDeposit)
}

module.exports = Account;

module.exports.createAccount = createAccount;


