const Account = require("../account")

beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterEach(() => {
    consoleSpy.mockRestore();
});

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


test("invalid username",()=>{
    let userAccount = new Account(123,100);
    expect(consoleSpy).toBeCalledWith("Please provide a valid username and deposit")
})


test("invalid deposit 0",()=>{
    let userAccount = new Account("Baris",0);
    expect(consoleSpy).toBeCalledWith("Please provide a valid username and deposit")
  
})


test("invalid deposit negative integer",()=>{
    let userAccount = new Account("Baris",-10);
    expect(consoleSpy).toBeCalledWith("Please provide a valid username and deposit")
  
})




