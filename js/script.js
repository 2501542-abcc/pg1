// 記録データ用配列
let records = [];

let button = document.querySelector("button");
let recordList = document.getElementById("recordlist");

let saved = localStorage.getItem("records");
if (saved) {
  records = JSON.parse(saved);
  displayRecords();
}

button.addEventListener("click", function () {
  let dateInput = document.getElementById("date");
  let weightInput = document.getElementById("weight");
  let sleepInput = document.getElementById("sleep");
  let memoInput = document.getElementById("memo");

  let date = dateInput.value;
  let weight = parseFloat(weightInput.value);
  let sleep = parseFloat(sleepInput.value);
  let memo = memoInput.value;

  if (weightInput.value === "" || sleepInput.value === "") {
    alert("体重と睡眠時間は必ず入力してください");
    return;
  }

  if (isNaN(weight) || isNaN(sleep)) {
    alert("体重と睡眠時間は数値で入力してください");
    return;
  }

  if (date === "") {
    let today = new Date();
    let y = today.getFullYear();
    let m = String(today.getMonth() + 1).padStart(2, "0");
    let d = String(today.getDate()).padStart(2, "0");
    date = `${y}-${m}-${d}`;
  }

  let record = {
    date: date,
    weight: weight,
    sleep: sleep,
    memo: memo
  };

  records.push(record);

  localStorage.setItem("records", JSON.stringify(records));

  displayRecords();

  dateInput.value = "";
  weightInput.value = "";
  sleepInput.value = "";
  memoInput.value = "";
});

function displayRecords() {
  recordList.innerHTML = "";

  records.forEach(function (record, index) {
    let div = document.createElement("div");
    div.className = "record-item";

    let text = document.createElement("span");
    text.textContent =
      record.date +
      " / 体重: " +
      record.weight +
      "kg / 睡眠: " +
      record.sleep +
      "時間 / " +
      record.memo;

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "削除";
    deleteBtn.addEventListener("click", function () {
      records.splice(index, 1);
      localStorage.setItem("records", JSON.stringify(records));
      displayRecords();
    });

    div.appendChild(text);
    div.appendChild(deleteBtn);
    recordList.appendChild(div);
  });

  let countDiv = document.createElement("div");
  countDiv.textContent = `記録件数：${records.length} 件`;
  recordList.appendChild(countDiv);
}
