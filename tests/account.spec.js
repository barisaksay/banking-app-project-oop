const { toBeExtensible } = require("jest-extended");
const Account = require("../account")
const {createAccount} = require("../account")

test("success: creates account with valid data",()=>{
    let userAccount = new Account("testAccount",100);
    expect(userAccount.accountHolderName).toBe("testAccount")
    expect(userAccount.balance).toBe(100);
    expect(userAccount.accountNumber).toBeDefined()
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

test("createAccount function works as expected",()=>{
   let testAccount = createAccount("Baris account",50);
    expect(testAccount.accountHolderName).toBe("Baris account")
    expect(testAccount._balance).toBe(50)

})

test("createAccount function works as expected", () => {
    const account = createAccount("test-account", 50);
    expect(account.accountHolder).toBe("test-account");
    expect(account.balance).toBe(50); 
    expect(account._accountNumber).toBeTruthy()
});


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
    expect(()=>{createAccount(100,100)}).toThrow("Please provide a valid username and deposit");
})

test("invalid deposit 0",()=>{
    expect(()=>{createAccount("test",0)}).toThrow("Please provide a valid username and deposit");
})

test("invalid deposit negative integer",()=>{
    expect(()=>{createAccount("test",-10)}).toThrow("Please provide a valid username and deposit");
})

//getter setter tests;

test("get balance method",()=>{
    let testAccount = createAccount("test",200)
    expect(testAccount.balance).toBe(200)
})

test("set name method",()=>{
    let testAccount = createAccount("test",200)
    testAccount.accountHolder="user"
    expect(testAccount.accountHolderName).toBe("user")
})


//addBalance functionality tests
test("addBalance with positive integer",()=>{
    let testAccount = createAccount("test",200)
    testAccount.addBalance(50);
    expect(testAccount.balance).toBe(250)
})

test('cannot add invalid balance negative integer',()=>{
    let testAccount = createAccount('test',100)
    expect(testAccount.addBalance(-1)).toMatch("Please enter a valid amount")
})

test('cannot add invalid balance string input',()=>{
    let testAccount = createAccount('test',100)
    expect(testAccount.addBalance("one")).toMatch("Please enter a valid amount")
})

test('cannot add invalid balance input:0',()=>{
    let testAccount = createAccount('test',100)
    expect(testAccount.addBalance(0)).toMatch("Please enter a valid amount")
})