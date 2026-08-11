// =====================================
// NOVAPAY
// SCRIPT.JS — PART 1 OF 2
// =====================================

let user = JSON.parse(
    localStorage.getItem("novapayUser")
) || null;

let balance = Number(
    localStorage.getItem("novapayBalance")
) || 125450;

let transactions = JSON.parse(
    localStorage.getItem("novapayTransactions")
) || [];

let balanceHidden = false;


// =====================================
// START APP
// =====================================

window.addEventListener("DOMContentLoaded", () => {

    setTimeout(() => {

        const splash =
            document.getElementById("splash");

        if (splash) {
            splash.classList.add("hidden");
        }

        if (user) {
            showApp();
        } else {

            const auth =
                document.getElementById("auth");

            if (auth) {
                auth.classList.remove("hidden");
            }

            showLogin();
        }

    }, 2200);

});


// =====================================
// SAVE DATA
// =====================================

function save() {

    localStorage.setItem(
        "novapayUser",
        JSON.stringify(user)
    );

    localStorage.setItem(
        "novapayBalance",
        balance.toString()
    );

    localStorage.setItem(
        "novapayTransactions",
        JSON.stringify(transactions)
    );
}


// =====================================
// REGISTER
// =====================================

function register() {

    const name =
        document
        .getElementById("regName")
        .value
        .trim();

    const phone =
        document
        .getElementById("regPhone")
        .value
        .trim();

    const password =
        document
        .getElementById("regPassword")
        .value
        .trim();

    const confirm =
        document
        .getElementById("regConfirm")
        .value
        .trim();

    const pin =
        document
        .getElementById("regPin")
        .value
        .trim();

    const confirmPin =
        document
        .getElementById("regConfirmPin")
        .value
        .trim();


    // -------------------------------
    // REQUIRED FIELDS
    // -------------------------------

    if (
        !name ||
        !phone ||
        !password ||
        !confirm ||
        !pin ||
        !confirmPin
    ) {

        alert(
            "Please complete all fields."
        );

        return;
    }


    // -------------------------------
    // PHONE
    // -------------------------------

    if (!/^[0-9]{10,11}$/.test(phone)) {

        alert(
            "Enter a valid phone number."
        );

        return;
    }


    // -------------------------------
    // PASSWORD
    // EXACTLY 6 NUMBERS
    // -------------------------------

    if (!/^[0-9]{6}$/.test(password)) {

        alert(
            "Password must contain exactly 6 numbers."
        );

        return;
    }


    // -------------------------------
    // PASSWORD CONFIRM
    // -------------------------------

    if (password !== confirm) {

        alert(
            "Incorrect password confirmation."
        );

        return;
    }


    // -------------------------------
    // PIN
    // EXACTLY 4 NUMBERS
    // -------------------------------

    if (!/^[0-9]{4}$/.test(pin)) {

        alert(
            "Transaction PIN must contain exactly 4 numbers."
        );

        return;
    }


    // -------------------------------
    // PIN CONFIRM
    // -------------------------------

    if (pin !== confirmPin) {

        alert(
            "Incorrect transaction PIN confirmation."
        );

        return;
    }


    // -------------------------------
    // CREATE ACCOUNT
    // -------------------------------

    user = {

        name: name,

        phone: phone,

        password: password,

        pin: pin
    };


    balance = 125450;


    transactions = [

        {
            name: "Welcome bonus",

            date: "Today • 10:30 AM",

            amount: 5000,

            type: "in",

            icon: "+"
        }

    ];


    save();


    alert(
        "Account created successfully!"
    );


    showApp();
}


// =====================================
// LOGIN
// =====================================

function login() {

    const phone =
        document
        .getElementById("loginPhone")
        .value
        .trim();

    const password =
        document
        .getElementById("loginPassword")
        .value
        .trim();


    // -------------------------------
    // CHECK ACCOUNT
    // -------------------------------

    if (!user) {

        alert(
            "No account found. Please register first."
        );

        return;
    }


    // -------------------------------
    // PHONE CHECK
    // -------------------------------

    if (phone !== user.phone) {

        alert(
            "Incorrect phone number or password."
        );

        return;
    }


    // -------------------------------
    // PASSWORD CHECK
    // -------------------------------

    if (
        !/^[0-9]{6}$/.test(password) ||
        password !== user.password
    ) {

        alert(
            "Incorrect password."
        );

        return;
    }


    // -------------------------------
    // LOGIN SUCCESS
    // -------------------------------

    showApp();
}


// =====================================
// SHOW REGISTER
// =====================================

function showRegister() {

    const loginScreen =
        document.getElementById(
            "loginScreen"
        );

    const registerScreen =
        document.getElementById(
            "registerScreen"
        );


    if (loginScreen) {

        loginScreen.classList.add(
            "hidden"
        );

    }


    if (registerScreen) {

        registerScreen.classList.remove(
            "hidden"
        );

    }
}


// =====================================
// SHOW LOGIN
// =====================================

function showLogin() {

    const registerScreen =
        document.getElementById(
            "registerScreen"
        );

    const loginScreen =
        document.getElementById(
            "loginScreen"
        );


    if (registerScreen) {

        registerScreen.classList.add(
            "hidden"
        );

    }


    if (loginScreen) {

        loginScreen.classList.remove(
            "hidden"
        );

    }
}


// =====================================
// SHOW APP
// =====================================

function showApp() {

    const auth =
        document.getElementById(
            "auth"
        );

    const app =
        document.getElementById(
            "app"
        );


    if (auth) {

        auth.classList.add(
            "hidden"
        );

    }


    if (app) {

        app.classList.remove(
            "hidden"
        );

    }


    if (user) {

        const userName =
            document.getElementById(
                "userName"
            );

        const avatar =
            document.getElementById(
                "avatar"
            );

        const profileAvatar =
            document.getElementById(
                "profileAvatar"
            );

        const profileName =
            document.getElementById(
                "profileName"
            );

        const profilePhone =
            document.getElementById(
                "profilePhone"
            );


        const firstLetter =
            user.name
            .charAt(0)
            .toUpperCase();


        if (userName) {

            userName.textContent =
                user.name;

        }


        if (avatar) {

            avatar.textContent =
                firstLetter;

        }


        if (profileAvatar) {

            profileAvatar.textContent =
                firstLetter;

        }


        if (profileName) {

            profileName.textContent =
                user.name;

        }


        if (profilePhone) {

            profilePhone.textContent =
                "+234 " + user.phone;

        }

    }


    updateBalance();

    renderTransactions();
}


// =====================================
// LOGOUT
// =====================================

function logout() {

    const app =
        document.getElementById(
            "app"
        );

    const auth =
        document.getElementById(
            "auth"
        );


    if (app) {

        app.classList.add(
            "hidden"
        );

    }


    if (auth) {

        auth.classList.remove(
            "hidden"
        );

    }


    showLogin();


    const password =
        document.getElementById(
            "loginPassword"
        );

    if (password) {

        password.value = "";

    }


    alert(
        "You have been logged out."
    );
}


// =====================================
// BALANCE
// =====================================

function updateBalance() {

    const element =
        document.getElementById(
            "balance"
        );


    if (!element) return;


    if (balanceHidden) {

        element.textContent =
            "₦••••••";

    } else {

        element.textContent =
            "₦" +
            balance.toLocaleString(
                "en-NG",
                {
                    minimumFractionDigits: 2
                }
            );

    }
}


// =====================================
// HIDE BALANCE
// =====================================

function hideBalance() {

    balanceHidden =
        !balanceHidden;


    updateBalance();


    const eye =
        document.getElementById(
            "balanceEye"
        );


    if (eye) {

        eye.textContent =
            balanceHidden
            ? "🙈"
            : "👁";

    }
}


// =====================================
// DARK MODE
// =====================================

function toggleDark() {

    document.body.classList.toggle(
        "dark"
    );


    localStorage.setItem(
        "novapayDark",
        document.body.classList.contains(
            "dark"
        )
    );
}


if (
    localStorage.getItem(
        "novapayDark"
    ) === "true"
) {

    document.body.classList.add(
        "dark"
    );

}


// =====================================
// PASSWORD VALIDATION HELPERS
// =====================================

function onlyNumbers(input) {

    input.value =
        input.value
        .replace(/\D/g, "");
}


// =====================================
// LIMIT PASSWORD TO 6 NUMBERS
// =====================================

document.addEventListener(
    "input",
    function(event) {

        const id =
            event.target.id;


        if (
            id === "regPassword" ||
            id === "regConfirm" ||
            id === "loginPassword"
        ) {

            onlyNumbers(
                event.target
            );

            if (
                event.target.value.length > 6
            ) {

                event.target.value =
                    event.target.value
                    .slice(0, 6);

            }

        }


        if (
            id === "regPin" ||
            id === "regConfirmPin"
        ) {

            onlyNumbers(
                event.target
            );

            if (
                event.target.value.length > 4
            ) {

                event.target.value =
                    event.target.value
                    .slice(0, 4);

            }

        }

    }
);


// =====================================
// NOVAPAY SCRIPT — PART 2A
// =====================================


// =====================================
// HOME
// =====================================

function home() {

    hidePages();

    const page =
        document.getElementById("homePage");

    if (page) {
        page.classList.remove("hidden");
    }

    setActive(0);
}


// =====================================
// TRANSFER
// =====================================

function transfer() {

    openModal(`

        <h2>Transfer Money</h2>

        <p>
            Send money securely to another account.
        </p>

        <input
            id="recipient"
            class="modal-input"
            type="tel"
            placeholder="Recipient phone number"
        >

        <input
            id="transferAmount"
            class="modal-input"
            type="number"
            placeholder="Amount"
            min="1"
        >

        <button
            class="main-btn"
            onclick="prepareTransfer()"
        >
            Continue
        </button>

    `);
}


// =====================================
// PREPARE TRANSFER
// =====================================

function prepareTransfer() {

    const recipient =
        document
        .getElementById("recipient")
        .value
        .trim();

    const amount =
        Number(
            document
            .getElementById("transferAmount")
            .value
        );


    if (!recipient || !amount) {

        alert(
            "Please complete all fields."
        );

        return;
    }


    if (amount <= 0) {

        alert(
            "Enter a valid amount."
        );

        return;
    }


    if (amount > balance) {

        alert(
            "Insufficient balance."
        );

        return;
    }


    openPinModal(
        "Confirm Transfer",
        amount,
        function() {

            balance -= amount;

            transactions.unshift({

                name:
                    "Transfer to " +
                    recipient,

                date:
                    "Just now",

                amount:
                    amount,

                type:
                    "out",

                icon:
                    "↗"

            });

            save();

            updateBalance();

            renderTransactions();

            closeModal();

            alert(
                "Transfer successful.\n₦" +
                amount.toLocaleString("en-NG") +
                " sent."
            );

        }
    );
}


// =====================================
// DEPOSIT
// =====================================

function deposit() {

    openModal(`

        <h2>Add Money</h2>

        <p>
            Add money to your NovaPay wallet.
        </p>

        <input
            id="depositAmount"
            class="modal-input"
            type="number"
            placeholder="Amount"
            min="1"
        >

        <button
            class="main-btn"
            onclick="makeDeposit()"
        >
            Add Money
        </button>

    `);
}


function makeDeposit() {

    const amount =
        Number(
            document
            .getElementById("depositAmount")
            .value
        );


    if (!amount || amount <= 0) {

        alert(
            "Enter a valid amount."
        );

        return;
    }


    openPinModal(
        "Confirm Funding",
        amount,
        function() {

            balance += amount;

            transactions.unshift({

                name:
                    "Wallet funding",

                date:
                    "Just now",

                amount:
                    amount,

                type:
                    "in",

                icon:
                    "+"

            });

            save();

            updateBalance();

            renderTransactions();

            closeModal();

            alert(
                "₦" +
                amount.toLocaleString("en-NG") +
                " added successfully."
            );

        }
    );
}


// =====================================
// AIRTIME
// =====================================

function airtime() {

    openModal(`

        <h2>Buy Airtime</h2>

        <p>
            Select your network and amount.
        </p>

        <select
            class="modal-input"
            id="airNetwork"
        >

            <option>MTN</option>
            <option>Airtel</option>
            <option>Glo</option>
            <option>9mobile</option>

        </select>

        <input
            id="airPhone"
            class="modal-input"
            type="tel"
            placeholder="Phone number"
        >

        <input
            id="airAmount"
            class="modal-input"
            type="number"
            placeholder="Amount"
            min="1"
        >

        <button
            class="main-btn"
            onclick="buyAirtime()"
        >
            Buy Airtime
        </button>

    `);
}


function buyAirtime() {

    const phone =
        document
        .getElementById("airPhone")
        .value
        .trim();

    const amount =
        Number(
            document
            .getElementById("airAmount")
            .value
        );


    if (!phone || !amount) {

        alert(
            "Please complete all fields."
        );

        return;
    }


    if (amount <= 0) {

        alert(
            "Enter a valid amount."
        );

        return;
    }


    if (amount > balance) {

        alert(
            "Insufficient balance."
        );

        return;
    }


    openPinModal(
        "Confirm Airtime Purchase",
        amount,
        function() {

            balance -= amount;

            transactions.unshift({

                name:
                    "Airtime - " +
                    phone,

                date:
                    "Just now",

                amount:
                    amount,

                type:
                    "out",

                icon:
                    "📞"

            });

            save();

            updateBalance();

            renderTransactions();

            closeModal();

            alert(
                "Airtime purchase successful."
            );

        }
    );
}


// =====================================
// DATA
// =====================================

function dataPage() {

    openModal(`

        <h2>Buy Data</h2>

        <p>
            Select a data plan.
        </p>

        <select
            id="dataPlan"
            class="modal-input"
        >

            <option value="1000">
                1GB — ₦1,000
            </option>

            <option value="2000">
                2GB — ₦2,000
            </option>

            <option value="3500">
                5GB — ₦3,500
            </option>

            <option value="6000">
                10GB — ₦6,000
            </option>

        </select>

        <input
            id="dataPhone"
            class="modal-input"
            type="tel"
            placeholder="Phone number"
        >

        <button
            class="main-btn"
            onclick="buyData()"
        >
            Buy Data
        </button>

    `);
}


function buyData() {

    const phone =
        document
        .getElementById("dataPhone")
        .value
        .trim();

    const amount =
        Number(
            document
            .getElementById("dataPlan")
            .value
        );


    if (!phone) {

        alert(
            "Enter phone number."
        );

        return;
    }


    if (amount > balance) {

        alert(
            "Insufficient balance."
        );

        return;
    }


    openPinModal(
        "Confirm Data Purchase",
        amount,
        function() {

            balance -= amount;

            transactions.unshift({

                name:
                    "Data purchase",

                date:
                    "Just now",

                amount:
                    amount,

                type:
                    "out",

                icon:
                    "📶"

            });

            save();

            updateBalance();

            renderTransactions();

            closeModal();

            alert(
                "Data purchase successful."
            );

        }
    );
}


// =====================================
// ELECTRICITY
// =====================================

function electricity() {

    openModal(`

        <h2>Electricity</h2>

        <p>
            Pay your electricity bill.
        </p>

        <select
            id="electricProvider"
            class="modal-input"
        >

            <option>PHED</option>
            <option>EEDC</option>
            <option>EKEDC</option>
            <option>AEDC</option>

        </select>

        <input
            id="meterNumber"
            class="modal-input"
            placeholder="Meter number"
        >

        <input
            id="electricAmount"
            class="modal-input"
            type="number"
            placeholder="Amount"
            min="1"
        >

        <button
            class="main-btn"
            onclick="payElectricity()"
        >
            Pay Bill
        </button>

    `);
}


function payElectricity() {

    const meter =
        document
        .getElementById("meterNumber")
        .value
        .trim();

    const amount =
        Number(
            document
            .getElementById("electricAmount")
            .value
        );


    if (!meter || !amount) {

        alert(
            "Complete all fields."
        );

        return;
    }


    if (amount > balance) {

        alert(
            "Insufficient balance."
        );

        return;
    }


    openPinModal(
        "Confirm Electricity Payment",
        amount,
        function() {

            balance -= amount;

            transactions.unshift({

                name:
                    "Electricity payment",

                date:
                    "Just now",

                amount:
                    amount,

                type:
                    "out",

                icon:
                    "💡"

            });

            save();

            updateBalance();

            renderTransactions();

            closeModal();

            alert(
                "Electricity payment successful."
            );

        }
    );
}


// =====================================
// TV
// =====================================

function tv() {

    openModal(`

        <h2>TV Subscription</h2>

        <p>
            Pay for your TV subscription.
        </p>

        <select
            id="tvProvider"
            class="modal-input"
        >

            <option>DStv</option>
            <option>GOtv</option>
            <option>Startimes</option>

        </select>

        <input
            id="smartCard"
            class="modal-input"
            placeholder="Smart card number"
        >

        <input
            id="tvAmount"
            class="modal-input"
            type="number"
            placeholder="Amount"
            min="1"
        >

        <button
            class="main-btn"
            onclick="payTV()"
        >
            Continue
        </button>

    `);
}


function payTV() {

    const card =
        document
        .getElementById("smartCard")
        .value
        .trim();

    const amount =
        Number(
            document
            .getElementById("tvAmount")
            .value
        );


    if (!card || !amount) {

        alert(
            "Complete all fields."
        );

        return;
    }


    if (amount > balance) {

        alert(
            "Insufficient balance."
        );

        return;
    }


    openPinModal(
        "Confirm TV Payment",
        amount,
        function() {

            balance -= amount;

            transactions.unshift({

                name:
                    "TV subscription",

                date:
                    "Just now",

                amount:
                    amount,

                type:
                    "out",

                icon:
                    "📺"

            });

            save();

            updateBalance();

            renderTransactions();

            closeModal();

            alert(
                "TV payment successful."
            );

        }
    );
}


// =====================================
// TRANSACTION PIN
// =====================================

function openPinModal(
    title,
    amount,
    successFunction
) {

    openModal(`

        <div class="pin-screen">

            <h2>
                ${title}
            </h2>

            <p>
                Enter your 4-digit transaction
                PIN to continue.
            </p>

            <div class="pin-amount">
                ₦${amount.toLocaleString("en-NG")}
            </div>

            <input
                id="transactionPin"
                class="modal-input"
                type="password"
                inputmode="numeric"
                maxlength="4"
                placeholder="Enter 4-digit PIN"
            >

            <button
                class="main-btn"
                onclick="confirmTransaction()"
            >
                Confirm
            </button>

        </div>

    `);

    window.pendingTransaction =
        successFunction;
}


// =====================================
// CONFIRM PIN
// =====================================

function confirmTransaction() {

    const pinInput =
        document.getElementById(
            "transactionPin"
        );


    if (!pinInput) {
        return;
    }


    const enteredPin =
        pinInput.value.trim();


    if (!/^[0-9]{4}$/.test(
        enteredPin
    )) {

        alert(
            "PIN must contain exactly 4 numbers."
        );

        return;
    }


    if (
        !user ||
        enteredPin !== user.pin
    ) {

        alert(
            "Incorrect transaction PIN. Transaction cancelled."
        );

        return;
    }


    if (
        typeof window.pendingTransaction
        === "function"
    ) {

        const action =
            window.pendingTransaction;

        window.pendingTransaction =
            null;

        action();
    }
}


// =====================================
// NOVAPAY SCRIPT — PART 2B
// =====================================


// =====================================
// CARDS
// =====================================

function cards() {

    openModal(`

        <h2>NovaPay Card</h2>

        <p>
            Your virtual demo card.
        </p>

        <div class="bank-card">

            <small>NOVAPAY</small>

            <h2>
                •••• •••• •••• 2048
            </h2>

            <span>
                ${
                    user
                    ? user.name.toUpperCase()
                    : "NOVA USER"
                }
            </span>

        </div>

        <button
            class="main-btn"
            onclick="closeModal()"
        >
            Done
        </button>

    `);
}


// =====================================
// QR SCANNER
// =====================================

function scanQR() {

    openModal(`

        <h2>Scan QR</h2>

        <p>
            Scan a merchant QR code.
        </p>

        <div class="qr">
            ▦
        </div>

        <button
            class="main-btn"
            onclick="closeModal()"
        >
            Close
        </button>

    `);
}


// =====================================
// BENEFICIARIES
// =====================================

function beneficiaries() {

    openModal(`

        <h2>Beneficiaries</h2>

        <p>
            Your saved beneficiaries
            will appear here.
        </p>

        <button
            class="main-btn"
            onclick="closeModal()"
        >
            Done
        </button>

    `);
}


// =====================================
// ALL SERVICES
// =====================================

function allServices() {

    openModal(`

        <h2>All Services</h2>

        <p>
            Choose a service.
        </p>

        <button
            class="main-btn"
            onclick="airtime()"
        >
            📞 Airtime
        </button>

        <button
            class="main-btn"
            onclick="dataPage()"
        >
            📶 Data
        </button>

        <button
            class="main-btn"
            onclick="electricity()"
        >
            💡 Electricity
        </button>

        <button
            class="main-btn"
            onclick="tv()"
        >
            📺 TV
        </button>

        <button
            class="main-btn"
            onclick="cards()"
        >
            💳 Cards
        </button>

    `);
}


// =====================================
// REWARDS
// =====================================

function rewards() {

    openModal(`

        <h2>
            NovaPay Rewards 🎁
        </h2>

        <p>
            Earn reward points when you
            use NovaPay services.
        </p>

        <h2>
            1,250 Points
        </h2>

        <button
            class="main-btn"
            onclick="closeModal()"
        >
            Done
        </button>

    `);
}


// =====================================
// NOTIFICATIONS
// =====================================

function openNotifications() {

    openModal(`

        <h2>
            Notifications 🔔
        </h2>

        <p>
            🟢 Your account is active.
        </p>

        <p>
            🟢 Your transactions are up to date.
        </p>

        <p>
            🟢 Welcome to NovaPay.
        </p>

    `);
}


// =====================================
// PROFILE
// =====================================

function openProfile() {

    hidePages();

    const page =
        document.getElementById(
            "profilePage"
        );

    if (page) {

        page.classList.remove(
            "hidden"
        );

    }

    setActive(4);
}


// =====================================
// ACCOUNT SETTINGS
// =====================================

function accountSettings() {

    if (!user) {
        return;
    }

    openModal(`

        <h2>
            Account Settings
        </h2>

        <p>
            Name: ${user.name}
        </p>

        <p>
            Phone: +234 ${user.phone}
        </p>

        <button
            class="main-btn"
            onclick="closeModal()"
        >
            Done
        </button>

    `);
}


// =====================================
// SECURITY SETTINGS
// =====================================

function securitySettings() {

    openModal(`

        <h2>
            Security
        </h2>

        <p>
            Your login password must contain
            6 numbers.
        </p>

        <p>
            Your transaction PIN must contain
            4 numbers.
        </p>

        <button
            class="main-btn"
            onclick="closeModal()"
        >
            Done
        </button>

    `);
}


// =====================================
// HELP CENTER
// =====================================

function helpCenter() {

    openModal(`

        <h2>
            Help Center
        </h2>

        <p>
            This is a demonstration banking
            application created for a school project.
        </p>

        <button
            class="main-btn"
            onclick="closeModal()"
        >
            Close
        </button>

    `);
}


// =====================================
// HISTORY PAGE
// =====================================

function historyPage() {

    hidePages();

    const page =
        document.getElementById(
            "historyPage"
        );

    if (page) {

        page.classList.remove(
            "hidden"
        );

    }

    renderFullHistory();

    setActive(3);
}


// =====================================
// FULL HISTORY
// =====================================

function renderFullHistory() {

    const box =
        document.getElementById(
            "fullHistory"
        );

    if (!box) {
        return;
    }

    box.innerHTML = "";


    if (transactions.length === 0) {

        box.innerHTML = `

            <div class="empty-page">

                <div>
                    📄
                </div>

                <h2>
                    No transactions
                </h2>

                <p>
                    Your transaction history
                    will appear here.
                </p>

            </div>

        `;

        return;
    }


    transactions.forEach(
        function(t) {

            const sign =
                t.type === "in"
                ? "+"
                : "-";

            const cls =
                t.type === "in"
                ? "money-in"
                : "money-out";


            box.innerHTML += `

                <div class="transaction">

                    <div class="
                        transaction-icon
                        ${
                            t.type === "in"
                            ? "in"
                            : ""
                        }
                    ">
                        ${t.icon}
                    </div>

                    <div
                        class="transaction-info"
                    >

                        <strong>
                            ${t.name}
                        </strong>

                        <small>
                            ${t.date}
                        </small>

                    </div>

                    <b class="${cls}">
                        ${sign}₦${Number(
                            t.amount
                        ).toLocaleString("en-NG")}
                    </b>

                </div>

            `;

        }
    );
}


// =====================================
// HOME TRANSACTIONS
// =====================================

function renderTransactions() {

    const box =
        document.getElementById(
            "transactions"
        );

    if (!box) {
        return;
    }

    box.innerHTML = "";


    transactions
        .slice(0, 5)
        .forEach(
            function(t) {

                const sign =
                    t.type === "in"
                    ? "+"
                    : "-";

                const cls =
                    t.type === "in"
                    ? "money-in"
                    : "money-out";


                box.innerHTML += `

                    <div class="transaction">

                        <div class="
                            transaction-icon
                            ${
                                t.type === "in"
                                ? "in"
                                : ""
                            }
                        ">
                            ${t.icon}
                        </div>

                        <div
                            class="transaction-info"
                        >

                            <strong>
                                ${t.name}
                            </strong>

                            <small>
                                ${t.date}
                            </small>

                        </div>

                        <b class="${cls}">
                            ${sign}₦${Number(
                                t.amount
                            ).toLocaleString("en-NG")}
                        </b>

                    </div>

                `;

            }
        );
}


// =====================================
// PAGE NAVIGATION
// =====================================

function hidePages() {

    document
        .querySelectorAll(".page")
        .forEach(
            function(page) {

                page.classList.add(
                    "hidden"
                );

            }
        );
}


// =====================================
// ACTIVE BOTTOM NAV
// =====================================

function setActive(index) {

    document
        .querySelectorAll(
            ".bottom-nav button"
        )
        .forEach(
            function(button, i) {

                button.classList.toggle(
                    "active",
                    i === index
                );

            }
        );
}


// =====================================
// MODAL
// =====================================

function openModal(html) {

    const modalBody =
        document.getElementById(
            "modalBody"
        );

    const modal =
        document.getElementById(
            "modal"
        );


    if (modalBody) {

        modalBody.innerHTML =
            html;

    }


    if (modal) {

        modal.classList.remove(
            "hidden"
        );

    }
}


// =====================================
// CLOSE MODAL
// =====================================

function closeModal() {

    const modal =
        document.getElementById(
            "modal"
        );

    if (modal) {

        modal.classList.add(
            "hidden"
        );

    }

    window.pendingTransaction =
        null;
}


// =====================================
// SHOW / HIDE PASSWORD
// =====================================

function showPassword(id) {

    const input =
        document.getElementById(id);

    if (!input) {
        return;
    }


    input.type =
        input.type === "password"
        ? "text"
        : "password";
}


// =====================================
// CLOSE MODAL OUTSIDE
// =====================================

document.addEventListener(
    "click",
    function(event) {

        const modal =
            document.getElementById(
                "modal"
            );


        if (
            modal &&
            event.target === modal
        ) {

            closeModal();

        }

    }
);


// =====================================
// ESC KEY
// =====================================

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {

            closeModal();

        }

    }
);


// =====================================
// PREVENT NON-NUMERIC PIN
// =====================================

document.addEventListener(
    "input",
    function(event) {

        const target =
            event.target;


        if (
            target.id ===
            "transactionPin"
        ) {

            target.value =
                target.value
                .replace(/\D/g, "")
                .slice(0, 4);

        }

    }
);


// =====================================
// PAGE LOAD
// =====================================

window.addEventListener(
    "load",
    function() {

        if (user) {

            updateBalance();

            renderTransactions();

        }

    }
);

