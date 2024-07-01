class Account {
    constructor(accountHolderName, initialDeposit) {

        if (typeof accountHolderName !== "string" || typeof initialDeposit !== "number" || initialDeposit <= 0) {
            throw new Error("Please provide a valid username and deposit");
        } else {
            this._accountNumber = Math.floor(Math.random() * 1000000);;
            this.accountHolderName = accountHolderName;
            this._balance = initialDeposit;
            this.transactionHistory = [];

            this.transactionHistory.push({ "action": "deposit", "amount": initialDeposit, "date": new Intl.DateTimeFormat("en-UK").format() })
            this.accountCreationDate = new Intl.DateTimeFormat("en-UK").format() 
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
        if (typeof newName !== "string") {
            throw new Error("Please provide a valid username");
        } else {
            return this.accountHolderName = newName;
        }



    }
    addFunds(amount) {
        if (amount <= 0 || typeof amount !== 'number') {
            throw new Error("Please enter a valid amount") ;
        } else {
            this._balance += amount;
            this.transactionHistory.push({ "action": "deposit", "amount": amount, "date": new Intl.DateTimeFormat("en-UK").format() })
            return `You have succesfully added ${amount} USD to your account. Your current balance is ${this._balance} USD`;
        }

    }

    withdrawFunds(amount) {
        if (amount <= 0 || typeof amount !== 'number') {
            throw new Error("Enter a valid amount");
        } else if (amount > this._balance) {
            throw new Error(`You do not have enough funds. Your available balance is ${this._balance}USD`);
        }
        else {
            this._balance -= amount;
            this.transactionHistory.push({ "action": "withdrawal", "amount": amount, "date": new Intl.DateTimeFormat("en-UK").format() })
            return `Withdrawal successful. Your available balance is ${this._balance}`
        }
    }

    accountSummary() {
        let summary = `Your account summary for account ${this._accountNumber}:`;
        summary += `Account balance: ${this.balance}`;
        summary += `Transaction history:`;

        for (let i = 0; i < this.transactionHistory.length; i++) {
            let transactionAction = this.transactionHistory[i].action;
            let transactionAmount = this.transactionHistory[i].amount;
            let transactionHistory = this.transactionHistory[i].date;

            summary += `- ${transactionAction} of $${transactionAmount} on ${transactionHistory}`;
        }

        return summary;
    }

    getDeposits() {
        return this.transactionHistory.filter((item) => item.action == "deposit")
    }

    getWithdrawals() {
        return this.transactionHistory.filter((item) => item.action == "withdrawal")
    }
}

module.exports = Account;




