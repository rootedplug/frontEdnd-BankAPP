"use strict";

const containerMovements = document.querySelector(".movements");
const accountBalance = document.querySelector(".balance-value");
const labelAllDeposits = document.querySelector(".in");
const labelAllWithdrawal = document.querySelector(".out");
const labelInterest = document.querySelector(".interest");
const labelLoginUser = document.querySelector(".login__input--user");
const labelUserPin = document.querySelector(".login__input--pin");
const loginBtn = document.querySelector(".login__btn");
const labelWelcomeMessage = document.querySelector(".welcome");
const containerApp = document.querySelector(".app");
const footerApp = document.querySelector(".summary");
const transferBtn = document.querySelector(".form_button--transfer");
const inputTransferTo = document.querySelector(".transfer-input");
const inputTransferAmount = document.querySelector(".transfer-amount");
const closeAccountBtn = document.querySelector(".form__btn--close");
const inputConfirmUser = document.querySelector(".form__input--user");
const inputConfirmPin = document.querySelector(".form__input--pin");
const loanBtn = document.querySelector(".form__btn--loan");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const sortBtn = document.querySelector(".btn-sort");
const allMovements = document.querySelectorAll(".movement-rows");
const balanceDate = document.querySelector(".balance-date");
const summaryTimer = document.querySelector(".summary-time");
// data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2022-12-27T14:43:26.374Z",
    "2022-12-28T18:49:59.371Z",
    "2022-12-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

let timer;
//Implementing A countdown Timer
const startLogoutTimer = function () {
  const tick = () => {
    const min = time / 60;
    const sec = time % 60;
    summaryTimer.textContent = `${String(Math.trunc(min)).padStart(
      2,
      0
    )}:${String(Math.trunc(sec)).padStart(2, 0)}`;

    if (time === 0) {
      clearInterval(timer);
      labelWelcomeMessage.textContent = "Login in to proceed";
      containerApp.style.opacity = 0;
      footerApp.style.opacity = 0;
    }
    time--;
  };
  let time = 30;
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};
const accounts = [account1, account2];
// Experimenting with the API
const now = new Date();
const options = {
  hour: "numeric",
  minute: "numeric",
  day: "numeric",
  month: "short",
  year: "numeric",
};
const locale = navigator.language;
balanceDate.textContent = `As of ${new Intl.DateTimeFormat(
  "en-US",
  locale,
  options
).format(now)}`;

//date functions
const formatMovementDates = function (date) {
  const calcDaysPast = function (date1, date2) {
    return Math.round((date2 - date1) / (1000 * 60 * 60 * 24));
  };
  const daysPassed = Math.abs(calcDaysPast(new Date(), date));
  console.log(daysPassed);
  if (daysPassed === 0) {
    return `today`;
  } else if (daysPassed === 1) {
    return `yesterday`;
  } else if (daysPassed <= 7) {
    `${daysPassed}Ago`;
  } else {
    const day = `${date.getDate()}`.padStart(2, 0);
    const month = `${date.getMonth()}`.padStart(2, 0);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
};
// Display movements in the Movement Container
const displayMovements = function (accs, sort = false) {
  containerMovements.innerHTML = "";
  const movs = sort
    ? accs.movements.slice().sort(function (a, b) {
        if (a > b) {
          return -1;
        } else {
          return 1;
        }
      })
    : accs.movements;

  for (const [i, val] of movs.entries()) {
    const date = new Date(accs.movementsDates[i]);
    const displayDate = formatMovementDates(date);
    const type = val > 0 ? `deposit` : `withdraw`;
    const html = `
    <div class="movement-rows">
        <div class="movement-action action-${type}">${i + 1} ${type}</div>
        <div class="movement-date">${displayDate}</div>
        <div class="movement-amount">${+val.toFixed(2)}€</div>
    </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  }
};

// Create Username of the Account owners

const createUsername = function (accts) {
  accts.forEach(function (accts) {
    accts.username = accts.owner
      .toLowerCase()
      .split(" ")
      .map(function (x) {
        return x[0];
      })
      .join("");
  });
};
createUsername(accounts);

// Deposits and Withdrawals
const accountMovementsType = function (movement) {
  const withdrawal = movement.filter(function (mov) {
    return mov < 0;
  });
  //   console.log(withdrawal);
};
accountMovementsType(account1.movements);
// Calculating Account Balance
const accBalance = function (accs) {
  accs.balance = accs.movements.reduce(function (acc, cur) {
    return acc + cur;
  }, 0);

  accountBalance.textContent = `${accs.balance.toFixed(2)}€`;
};

// finding the maximum value using the reduce method
const max = account2.movements.reduce(function (acc, cur) {
  if (acc > cur) return acc;
  else return cur;
}, account1.movements[0]);
// console.log(max);

//Calculating the Deposits/Withdrawal
const allDeposits = function (accs) {
  const depositMovement = accs.movements
    .filter(function (val) {
      return val > 0;
    })
    .reduce(function (acc, val) {
      return acc + val;
    }, 0);

  const withdrawMovement = accs.movements
    .filter(function (val) {
      return val < 0;
    })
    .reduce(function (acc, val) {
      return acc + val;
    }, 0);

  const depositInterest = accs.movements
    .filter(function (val) {
      return val > 0;
    })
    .map(function (val) {
      return (val * accs.interestRate) / 100;
    })
    .filter(function (val) {
      return val >= 1;
    })
    .reduce(function (acc, val) {
      return acc + val;
    }, 0);
  labelAllDeposits.textContent = `${+depositMovement.toFixed(2)}€`;
  labelAllWithdrawal.textContent = `${Math.abs(+withdrawMovement.toFixed(2))}€`;
  labelInterest.textContent = `${+depositInterest.toFixed(2)}€`;
};

const account = accounts.find(function (acc) {
  return acc.owner === "Jessica Davis";
});
// console.log(account);
// Update UI Function
let updateUI = function (currentAccount) {
  displayMovements(currentAccount);
  accBalance(currentAccount);
  allDeposits(currentAccount);
};
//Creating Event Handlers For Login
let currentAccount;
loginBtn.addEventListener("click", function (e) {
  //prevent form from submitting
  e.preventDefault();
  currentAccount = accounts.find(function (val) {
    return val.username === labelLoginUser.value;
  });
  console.log(currentAccount);
  if (currentAccount?.pin === Number(labelUserPin.value)) {
    // Display Movements
    // Display Balance
    // Display Summary
    labelWelcomeMessage.textContent = `Welcome ${
      currentAccount.owner.split(" ")[0]
    }`;

    containerApp.style.opacity = 100;
    footerApp.style.opacity = 100;
    if (timer) clearInterval(timer);
    timer = startLogoutTimer();
    updateUI(currentAccount);
    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    const locale = navigator.language;
    balanceDate.textContent = `As of ${new Intl.DateTimeFormat(
      "en-US",
      currentAccount.locale,
      options
    ).format(now)}`;
    // balanceDate.textContent = `As of ${date}/${month}/${year}, ${hour}:${min}`;
    //clearing the input fields
    labelLoginUser.value = labelUserPin.value = "";
    labelUserPin.blur();
  }
});
// Tranfer Operation
transferBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(function (val) {
    return val.username === inputTransferTo.value;
  });
  console.log(amount, receiverAccount);
  if (
    amount > 0 &&
    receiverAccount &&
    currentAccount.balance >= amount &&
    receiverAccount?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);
    receiverAccount.movementsDates.push(new Date().toISOString());
    updateUI(currentAccount);
  }
  inputTransferAmount.value = inputTransferTo.value = "";
  clearInterval(timer);
  timer = startLogoutTimer();
});
// Request Loan Operation
loanBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = inputLoanAmount.value;
  setTimeout(function () {
    if (
      amount > 0 &&
      currentAccount.movements.some(function (val) {
        return val >= amount * 0.1;
      })
    ) {
      currentAccount.movements.push(Math.floor(Number(amount)));
      currentAccount.movementsDates.push(new Date().toISOString());
      updateUI(currentAccount);
      inputLoanAmount.value = "";
    }
  }, 2500);
  clearInterval(timer);
  timer = startLogoutTimer();
});

// FindIndex Method to close account (Closing Account Operation)
closeAccountBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    inputConfirmUser.value === currentAccount.username &&
    Number(inputConfirmPin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(function (acc) {
      return acc.username === currentAccount.username;
    });
    console.log(index);
    // Delete Account
    accounts.splice(index, 1);
    // Hide UI
    containerApp.style.opacity = 0;
    labelWelcomeMessage.textContent = "Login in to proceed";
    inputConfirmPin.value = inputConfirmUser.value = "";
  }
});
// Flat & FlatMap Methods Implementation
const arr = accounts
  .map(function (acc) {
    return acc.movements;
  })
  .flat()
  .reduce(function (acc, curr) {
    return acc + curr;
  }, 0);

//Sorting Arrays
let sorted = false;
sortBtn.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

accountBalance.addEventListener("click", function (e) {
  e.preventDefault();
  const movementUI = Array.from(document.querySelectorAll(".movement-amount"));
  console.log(movementUI);
  console.log(
    movementUI.map(function (val) {
      return Number(val.textContent.replace("€", ""));
    })
  );
});
// Internalizing Numbers
