class User {
    #Status = true;
    #Root;
    #ID;
    static #UserCount = 0;

    constructor(root) {
        User.#UserCount++;
        this.#ID = User.#UserCount;
        this.Root = root;
        console.log('Пользователь ' +  this.ID + ' зарегистрирован. Со статусом ' + this.Root);
    }
    
    get Status() {
        return this.#Status;
    }

    get Root() {
        return this.#Root;
    }

    get ID() {
        return this.#ID;
    }
    
    set Status(status) {
        this.#Status = status;
    }

    set Root(root) {
        this.#Root = root;
    }

}

class Admin extends User {
    
    constructor() {
        super('admin');
    }
    
    viewTransactions(user) {
        if (user.History) {
            console.log('Транзакции пользователя ' + user.ID + ':', 
            user.History);
        } else {
            console.log('Пользователь ' + user.ID + ' не имеет транзакций.');
        }
    }

    blockUser(user) {        
        user.Status = false;
        console.log('Пользователь ' + user.ID + ' был заблокирован администратором ' + this.ID);
    }
}

class CommonUser extends User {
    constructor() {
        super('user');
        this.balance = 0;
        this.History = [];
    }

    checkBalance() {
        if (this.Status) {
            console.log('Баланс пользователя ' + this.ID + ': '
                + this.balance);
        } else {
            console.log('Пользователь ' + this.ID + ' заблокирован');
        }
        
    }

    ToDeposit(sum) {
        if (this.Status) {
            this.balance += sum;
            this.History.push({ sum: sum, type: 'пополнение' });
            console.log('Пользователь ' + this.ID +' пополнил баланс на ' + sum + '.');
        } else {
            console.log('Пользователь ' + this.ID + ' заблокирован');
        } 
    }

    ToWithdraw(sum) {
        if (this.Status) {
            if (this.balance >= sum) {
                this.balance -= sum;
                this.History.push({ sum: sum, type: 'снятие' });
                console.log('Пользователь ' + this.ID + ' снял ' + 
                sum + ' с баланса.');
            } else {
                console.log('Недостаточно средств для снятия у пользователя ' + this.ID + '.');
            }
        } else {
            console.log('Пользователь ' + this.ID + ' заблокирован');
        } 
    }
}




// Пример использования

// Создание пользователей
const user001 = new CommonUser(); // Обычный пользователь
const user002 = new CommonUser(); // Обычный пользователь
const admin001 = new Admin(); // Администратор

// Пополнение баланса
user001.ToDeposit(500); // Пополнение баланса на 500
user002.ToDeposit(1000); // Пополнение баланса на 1000

// Снятие средств
user001.ToWithdraw(200); // Снятие 200
user002.ToWithdraw(1500); // Попытка снятия 1500 (недостаточно средств)

// Проверка баланса
user001.checkBalance(); // Проверка баланса user001
user002.checkBalance(); // Проверка баланса user002

// Просмотр транзакций администратором
admin001.viewTransactions(user001); // Просмотр транзакций user001
admin001.viewTransactions(user002); // Просмотр транзакций user002

// Блокировка пользователя
admin001.blockUser(user001); // Блокировка user001

// Попытка действий заблокированным пользователем
user001.ToDeposit(100); // Попытка пополнения баланса
user001.ToWithdraw(50); // Попытка снятия средств
user001.checkBalance(); // Проверка баланса

// Создание еще одного пользователя и проверка ID
const user003 = new CommonUser(); // Новый пользователь
console.log('ID пользователя 3: ' + user003.ID); // Проверка ID

// Попытка снятия средств у пользователя с нулевым балансом
user003.ToWithdraw(100); // Попытка снятия 100

// Пополнение баланса и снятие средств у нового пользователя
user003.ToDeposit(300); // Пополнение баланса на 300
user003.ToWithdraw(100); // Снятие 100
user003.checkBalance(); // Проверка баланса

// Просмотр транзакций нового пользователя
admin001.viewTransactions(user003); // Просмотр транзакций user003