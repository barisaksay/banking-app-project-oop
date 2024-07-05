const testData = require ('../data.json')

const { toBeExtensible } = require("jest-extended");

const Account = require("../account")

describe("Account class tests",()=>{

    beforeEach(()=>{

        //a beforeEach hook to be implemented with an if/else block:
        //todo: add word "negative" to negative test cases which throw error.
        //code will read the name of the test, if it detects "negative" inside, will use different logic for creation
        //let userAccount = new Account(testData.validAccountHolderName,testData.validBalance);
    })
    
    // Constructor Tests
    test.only("should create an account with valid inputs",()=>{
    let userAccount = new Account(testData.validAccountHolderName,testData.validBalance);
    expect(userAccount.accountHolderName).toBe("Jack")
    expect(userAccount.balance).toBe(100);
    expect(userAccount.transactionHistory.length).toBe(1);
    expect(userAccount.accountNumber).toBeDefined()
    //expect(userAccount.accountCreationDate).toBeInstanceOf(Date)
})
    //why wrap new Account() to arrow function?
// By wrapping the createAccount(100, 100) call inside an arrow function, you ensure that the function is not executed immediately. 
// Jest will then call the function and correctly catch and verify the error.
    test.only("should throw an error if accountHolderName is not a string",()=>{
    expect(()=>{new Account(testData.invalidAccountHolderName,testData.validBalance)}).toThrow(testData.invalidValueOnCreationError);
})
    
test.only("should throw an error if initialDeposit is 0",()=>{
    expect(()=>{new Account(testData.validAccountHolderName,testData.invalidBalanceZero)}).toThrow(testData.invalidValueOnCreationError);
})
    test.only("should throw an error if initialDeposit is negative integer",()=>{
    expect(()=>{new Account(testData.validAccountHolderName,testData.invalidBalanceNegative)}).toThrow(testData.invalidValueOnCreationError);
})

     test.only("should throw an error if initialDeposit is not a number: string",()=>{
    expect(()=>{new Account(testData.validAccountHolderName,testData.invalidBalanceString)}).toThrow(testData.invalidValueOnCreationError);
})
     test("should throw an error if initialDeposit is not a number: boolean",()=>{
    expect(()=>{new Account(validAccountHolderName,invalidBalanceBoolean)}).toThrow(invalidValueOnCreationError);
})

    //Getter tests;

    test("should return correct balance",()=>{
    let testAccount = new Account(validAccountHolderName,validBalance)
    expect(testAccount.balance).toBe(100)
})
     test('should return correct account number', () => {
        const account = new Account(validAccountHolderName, validBalance);
        expect(account.accountNumber).toBeGreaterThanOrEqual(0);
        expect(account.accountNumber).toBeLessThan(1000000);
    });

     test('should return correct account holder name', () => {
        const account = new Account(validAccountHolderName, validBalance);
        expect(account.accountHolderName).toBe('Jack');
    });
    
    // Setter Tests
    test('should correctly update the account holder name', () => {
        const account = new Account(validAccountHolderName, validBalance);
        account.accountHolder = 'John Doe';
        expect(account.accountHolderName).toBe('John Doe');
    });

    test('should throw an error if new name is not a string', () => {
        const account = new Account(validAccountHolderName, validBalance);
       expect(()=>account.accountHolder=123).toThrow(setNameInvalidUsernameError);
    });

    //addFunds method tests
test("addFunds with positive integer",()=>{
    let testAccount = new Account(validAccountHolderName,validBalance)
    testAccount.addFunds(50);
    expect(testAccount.balance).toBe(150)
})

test('cannot add invalid balance negative integer',()=>{
    let testAccount = new Account(validAccountHolderName,validBalance)
    expect(()=>{testAccount.addFunds(-1)}).toThrow("Please enter a valid amount");
})

test('cannot add invalid balance string input',()=>{
    let testAccount = new Account(validAccountHolderName,validBalance)
    expect(()=>{testAccount.addFunds("one")}).toThrow("Please enter a valid amount");
})

test('cannot add invalid balance input:0',()=>{
    let testAccount = new Account(validAccountHolderName,validBalance)
    expect(()=>{testAccount.addFunds(0)}).toThrow("Please enter a valid amount");
})

})


//transactionHistory tests

test('initial deposit is recorded in transactionHistory correctly',()=>{
    let testAccount = new Account(validAccountHolderName,validBalance)

    expect(testAccount.transactionHistory.length).toBe(1)
    expect(testAccount.transactionHistory[0].amount).toBe(100)
    //expect(testAccount.transactionHistory[0].date).toBeValidDate()

})

test('addFunds call recorded in transactionHistory - amount ',()=>{
    let testAccount = new Account(validAccountHolderName,validBalance)
    testAccount.addFunds(50)
    expect(testAccount.transactionHistory.length).toBe(2)
    expect(testAccount.transactionHistory[1].amount).toBe(50)
})

test('addFunds call recorded in transactionHistory - date ',()=>{
    let testAccount = new Account(validAccountHolderName,validBalance)
    testAccount.addFunds(50)
    expect(testAccount.transactionHistory.length).toBe(2)
    //expect(testAccount.transactionHistory[1].date).toBeValidDate()
})

test('transactionHistory records are objects',()=>{
    let testAccount = new Account(validAccountHolderName,validBalance)
    expect(testAccount.transactionHistory[0]).toBeObject()
})

test('transactionHistory contains correct keys',()=>{
    let testAccount = new Account(validAccountHolderName,validBalance)
    expect(testAccount.transactionHistory[0]).toContainAllKeys(["action","amount","date"])
})

//tests for withdrawFunds
test('withdrawFunds successful with positive int',()=>{
    let testAccount = new Account(validAccountHolderName,validBalance)
    testAccount.withdrawFunds(40)
    expect(testAccount._balance).toBe(60)
})

test('withdrawFunds error with  amount>balance',()=>{
    let testAccount = new Account(validAccountHolderName,validBalance)
    let errorMessage = `You do not have enough funds. Your available balance is ${testAccount._balance}USD`;
    expect(()=>{testAccount.withdrawFunds(101)}).toThrow(errorMessage);
})

test('withdrawFunds error with  negative int',()=>{
    let testAccount = new Account(validAccountHolderName,validBalance)
    let errorMessage ="Enter a valid amount";
    expect(()=>{testAccount.withdrawFunds(-1)}).toThrow(errorMessage);
})


test('withdrawFunds error with  string',()=>{
    let testAccount = new Account(validAccountHolderName,validBalance)
    let errorMessage ="Enter a valid amount";
    expect(()=>{testAccount.withdrawFunds("two")}).toThrow(errorMessage);
})

test('withdrawFunds error with amount 0',()=>{
    let testAccount = new Account(validAccountHolderName,validBalance)
    let errorMessage ="Enter a valid amount";
    expect(()=>{testAccount.withdrawFunds(0)}).toThrow(errorMessage);
})


//getDeposits test
test('getDeposits works',()=>{
    let testAccount = new Account(validAccountHolderName,validBalance)
    testAccount.addFunds(50)
    expect(testAccount.getDeposits()).toBeArrayOfSize(2)
    expect(testAccount.getDeposits()).toIncludeAnyMembers(testAccount.transactionHistory)
})


// test('getDeposits does not contain withdrawals',()=>{
// })



//getWithdrawals test
test('getWithdrawals works',()=>{
    let testAccount = new Account(validAccountHolderName,validBalance)
    testAccount.withdrawFunds(50)
    expect(testAccount.getWithdrawals()).toBeArrayOfSize(1)
    expect(testAccount.getWithdrawals()).toIncludeAnyMembers(testAccount.transactionHistory)
})

// test('getWithdrawals does not contain deposits',()=>{
// })
