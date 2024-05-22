const Account = require ("../account")

test("positive: create and assign values",()=>{
    let userAccount = new Account("testAccount",100);
    expect(userAccount.balance).toBe(100);
})


