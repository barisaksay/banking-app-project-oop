const { toBeExtensible } = require("jest-extended");
const Account = require("../account")

test("success: creates account with valid data",()=>{
    let userAccount = new Account("testAccount",100);
    expect(userAccount.accountHolderName).toBe("testAccount")
    expect(userAccount.balance).toBe(100);
    expect(userAccount.accountNumber).toBeDefined()
    expect(userAccount.accountCreationDate).toBeTruthy()
})

test("correct amount is set for balance ",()=>{
    let userAccount = new Account("Baris",10);
    expect(userAccount._balance).toEqual(10)
})

test("correct account holder name is set for accountHolderName ",()=>{
    let userAccount = new Account("Baris",10);
    expect(userAccount.accountHolderName).toMatch("Baris")
})

test("accountNumber is set correctly",()=>{
    let userAccount = new Account("Baris",10);
    expect(userAccount.accountNumber).toBeTruthy()
})


//Commented test fails because: createAccount(100, 100) is called immediately, and if it throws an error, the error is thrown before Jest can apply the toThrow matcher. 
//The expect statement never gets executed because the error occurs outside of Jest's error handling context.
//Test after this one is the correct usage
// test("invalid username",()=>{
//     //expect(()=>{new new Account(123,100)}).toThrow("Please provide a valid username and deposit");
//     expect(createAccount(100,100)).toThrow("Please provide a valid username and deposit");
// })

//why wrap createAccount() function call to arrow function?
// By wrapping the createAccount(100, 100) call inside an arrow function, you ensure that the function is not executed immediately. 
// Jest will then call the function and correctly catch and verify the error.
test("invalid username",()=>{
    expect(()=>{new Account(100,100)}).toThrow("Please provide a valid username and deposit");
})

test("invalid deposit 0",()=>{
    expect(()=>{new Account("test",0)}).toThrow("Please provide a valid username and deposit");
})

test("invalid deposit negative integer",()=>{
    expect(()=>{new Account("test",-10)}).toThrow("Please provide a valid username and deposit");
})

//getter setter tests;

test("get balance method",()=>{
    let testAccount = new Account("test",200)
    expect(testAccount.balance).toBe(200)
})

test("set name method",()=>{
    let testAccount = new Account("test",200)
    testAccount.accountHolder="user"
    expect(testAccount.accountHolderName).toBe("user")
})


//addFunds functionality tests
test("addFunds with positive integer",()=>{
    let testAccount = new Account("test",200)
    testAccount.addFunds(50);
    expect(testAccount.balance).toBe(250)
})

test('cannot add invalid balance negative integer',()=>{
    let testAccount = new Account('test',100)
    expect(testAccount.addFunds(-1)).toMatch("Please enter a valid amount")
})

test('cannot add invalid balance string input',()=>{
    let testAccount = new Account('test',100)
    expect(testAccount.addFunds("one")).toMatch("Please enter a valid amount")
})

test('cannot add invalid balance input:0',()=>{
    let testAccount = new Account('test',100)
    expect(testAccount.addFunds(0)).toMatch("Please enter a valid amount")
})

//tests for transactionHistory

test('initial deposit is recorded in transactionHistory correctly',()=>{
    let testAccount = new Account('test',100)

    expect(testAccount.transactionHistory.length).toBe(1)
    expect(testAccount.transactionHistory[0].amount).toBe(100)
})

test('initial deposit date is recorded in transactionHistory correctly',()=>{
    let testAccount = new Account('test',100)
    expect(testAccount.transactionHistory[0].date).toBeValidDate()
})

test('addFunds call recorded in transactionHistory - amount ',()=>{
    let testAccount = new Account('test',100)
    testAccount.addFunds(50)
    expect(testAccount.transactionHistory.length).toBe(2)
    expect(testAccount.transactionHistory[1].amount).toBe(50)
})

test('addFunds call recorded in transactionHistory - date ',()=>{
    let testAccount = new Account('test',100)
    testAccount.addFunds(50)
    expect(testAccount.transactionHistory.length).toBe(2)
    expect(testAccount.transactionHistory[1].date).toBeValidDate()
})

test('transactionHistory records are objects',()=>{
    let testAccount = new Account('test',100)
    expect(testAccount.transactionHistory[0]).toBeObject()
})

test('transactionHistory contains correct keys',()=>{
    let testAccount = new Account('test',100)
    expect(testAccount.transactionHistory[0]).toContainAllKeys(["action","amount","date"])
})

//tests for withdrawFunds
test('withdrawFunds successful with positive int',()=>{
    let testAccount = new Account('test',100)
    testAccount.withdrawFunds(40)
    expect(testAccount._balance).toBe(60)
})

test('withdrawFunds error with  amount>balance',()=>{
    let testAccount = new Account('test',100)
    let errorMessage = `You do not have enough funds. Your available balance is ${testAccount._balance}USD`;
    expect(()=>{testAccount.withdrawFunds(101)}).toThrow(errorMessage);
})

test('withdrawFunds error with  negative int',()=>{
    let testAccount = new Account('test',100)
    let errorMessage ="enter a valid amount";
    expect(()=>{testAccount.withdrawFunds(-1)}).toThrow(errorMessage);
})


test('withdrawFunds error with  string',()=>{
    let testAccount = new Account('test',100)
    let errorMessage ="enter a valid amount";
    expect(()=>{testAccount.withdrawFunds("two")}).toThrow(errorMessage);
})

test('withdrawFunds error with amount 0',()=>{
    let testAccount = new Account('test',100)
    let errorMessage ="enter a valid amount";
    expect(()=>{testAccount.withdrawFunds(0)}).toThrow(errorMessage);
})

// test.only('accountSummary function works as expected',()=>{
//     let testAccount = new Account('test',100)
//     testAccount.addFunds(50)
//     testAccount.withdrawFunds(80)
//     testAccount.withdrawFunds(20)
//     testAccount.addFunds(30)
//     expect(testAccount.accountSummary()).toBe(`Your account summary for account ${testAccount._accountNumber},
//         Account balance: ${testAccount.balance},
//         Transaction history: ${testAccount.transactionHistory}
//         `)
// })