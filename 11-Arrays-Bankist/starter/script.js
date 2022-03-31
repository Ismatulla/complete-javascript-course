'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const displayMovements = (movements) => {
    containerMovements.innerHTML = ''
    movements.forEach((move, i) => {
        const type = move > 0 ? 'deposit' : 'withdrawal';
        const html = ` <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} deposit</div>
    <div class="movements__value">${move} €</div>
    </div>
`;
        containerMovements.insertAdjacentHTML('afterbegin', html)
    })
}


const createUserName = function(accs) {
    accs.forEach(acc => {
        acc.username = acc.owner.toLowerCase().split(' ').map(word => word[0]).join('')
    })

}
createUserName(accounts);
const calcPrintBalance = (movements) => {
    const calcBalance = movements.reduce((acc, curr) => acc + curr, 0)
    labelBalance.textContent = `${calcBalance} €`
}

const calcDisplaySummary = (acc) => {
    const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0)
    labelSumIn.textContent = `${incomes} €`
    const spends = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0)
    labelSumOut.textContent = `${Math.abs(spends)} €`
    const interests = acc.movements.filter(int => int > 0).map(int => int * acc.interestRate / 100).reduce((acc, int) => acc + int, 0)
    labelSumInterest.textContent = `${interests} €`
}


let currentAccount
btnLogin.addEventListener('click', (e) => {
        e.preventDefault()
        currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value)
        if (currentAccount.pin === Number(inputLoginPin.value)) {
            labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(' ')[0]}`
            containerApp.style.opacity = '100'
                // clear input fileds
            inputLoginUsername.value = inputLoginPin.value = ''
                //Display movements
            displayMovements(currentAccount.movements)

            // Display balance
            calcPrintBalance(currentAccount.movements)
                // Display summary
            calcDisplaySummary(currentAccount)
        }

    })
    // transfer functionality
btnTransfer.addEventListener('click', (e) => {
    e.preventDefault()
    const amount = Number(inputTransferAmount.value)
    const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value)

})
btnClose.addEventListener('click', (e) => {
    e.preventDefault()



})


/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
]);


/////////////////////////////////////////////////


// const movementsToUSD = account1.movements.map(mov => {
//     return mov * euroTOUSD
// })
// console.log(movementsToUSD);
// console.log(account1.movements)