class BankAccount {
    private _balance: number;
    constructor(initialBalance: number) {
        this._balance = initialBalance;
    }

    public deposit(amount: number): void {

        if(amount<0){
            console.log("Deposit amount cannot be negative.");
            return
        }
        if (this._balance<0){
            console.log("Account balance cannot be negative.");
            return
        }
        this._balance += amount;
        console.log(`Deposited: ${amount}, New Balance: ${this._balance}`);
       
    }

    public withdraw(amount: number): void {

        if(amount<0){
            console.log("Withdrawal amount cannot be negative.");
            return
        }
        else if (amount > this._balance) {
            console.log("Insufficient funds.");
            return
        } 

        this._balance -= amount;
        console.log(`Withdrew: ${amount}, New Balance: ${this._balance}`);
    }   

    public get balance(): number {
        return this._balance;
    }
}

let Account = new BankAccount(1000);
Account.deposit(500);       
Account.withdraw(200);
Account.withdraw(2000);
Account.deposit(-100);
Account.withdraw(-50);
console.log(`Final Balance: ${Account.balance}`);