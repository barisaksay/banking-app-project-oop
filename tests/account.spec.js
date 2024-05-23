const Account = require("../account")

test("success: creates account with valid data",()=>{
    let userAccount = new Account("testAccount",100);
    expect(userAccount.accountHolderName).toBe("testAccount")
    expect(userAccount.balance).toBe(100);
    expect(userAccount.accountNumber).toBeDefined()
})


