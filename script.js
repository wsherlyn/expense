let transaction =
    JSON.parse(localStorage.getItem("transaction")) || [];



let selectedType = "income";




function income() {

    selectedType = "income";

    document.getElementById("result").innerHTML =
        "Income Selected";
}




function expense() {

    selectedType = "expense";

    document.getElementById("result").innerHTML =
        "Expense Selected";
}




function showdata() {

    const description =
        document.getElementById("des").value;

    const amount =
        parseFloat(document.getElementById("amt").value);

    const category =
        document.getElementById("category").value;


    if (description === "") {

        document.getElementById("result").innerHTML =
            "Please enter description";

        return;
    }

    if (isNaN(amount) || amount <= 0) {

        document.getElementById("result").innerHTML =
            "Please enter valid amount";

        return;
    }

   

    const obj = {

        description: description,

        amount: amount,

        category: category,

        type: selectedType
    };

    

    transaction.push(obj);

   

    localStorage.setItem(
        "transaction",
        JSON.stringify(transaction)
    );

    

    renderTransaction();

    updateCards();


    document.getElementById("des").value = "";

    document.getElementById("amt").value = "";

    document.getElementById("result").innerHTML =
        "Transaction Added Successfully";
}




function renderTransaction() {

    const demo =
        document.getElementById("demo");

    demo.innerHTML = "";

  

    if (transaction.length === 0) {

        demo.innerHTML =
           "<h2><br><br><i><b> <center>No Transaction Yet !!!</center></h2>";

        return;
    }

    

    transaction.forEach(function (obj, index) {

        demo.innerHTML +=

            "<div class='transaction-item'>" +

            "<p><b>Description:</b> " +
            obj.description + "</p>" +

            "<p><b>Amount:</b> ₹" +
            obj.amount + "</p>" +

            "<p><b>Category:</b> " +
            obj.category + "</p>" +

            "<p><b>Type:</b> " +
            obj.type + "</p>" +

            "<button onclick='deleteTransaction(" + index + ")'>" +

            "Delete</button>" +

            "<hr></div>";
    });
}



function deleteTransaction(index) {

    transaction.splice(index, 1);

    localStorage.setItem(
        "transaction",
        JSON.stringify(transaction)
    );

    renderTransaction();

    updateCards();
}




function updateCards() {

    let totalIncome = 0;

    let totalExpense = 0;

    transaction.forEach(function (obj) {

        if (obj.type === "income") {

            totalIncome += obj.amount;
        }

        else {

            totalExpense += obj.amount;
        }
    });

    let balance =
        totalIncome - totalExpense;

   

    document.getElementById("incomeTotal").innerHTML =
        "₹" + totalIncome;

    document.getElementById("expenseTotal").innerHTML =
        "₹" + totalExpense;

    document.getElementById("bal").innerHTML =
        "₹" + balance;
}




renderTransaction();

updateCards();



