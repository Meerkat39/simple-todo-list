// オブジェクトの取得
const todoInput = document.querySelector("#todo-input");
const addButton = document.querySelector("#add-button");
const todoList = document.querySelector("#todo-list");
const template = document.querySelector("#todo-template");
const editTemplate = document.querySelector("#todo-edit-template");

// 変数の宣言
let id = 0;
let todoArray = [];

// todoArrayに要素を追加
const addTodoArray = (todoItem) => {
  // 要素の追加
  todoArray.push({
    id: id,
    name: todoItem.querySelector(".todo-name").textContent,
  });

  // idの更新
  id++;
};

// todoArrayの要素を削除
const deleteTodoArray = (todoItem) => {
  // 削除するidの取得
  const taskId = Number(todoItem.dataset.id);

  // 削除するtodoArray内のインデックスの取得
  const index = todoArray.findIndex((item) => item.id === taskId);

  // 要素の削除
  if (index !== -1) {
    todoArray.splice(index, 1);
  }
};

// todoArrayの要素を編集
const editTodoArray = (todoItem) => {
  // 編集するidの取得
  const taskId = Number(todoItem.dataset.id);

  // 編集するtodoArray内のインデックスの取得
  const index = todoArray.findIndex((item) => item.id === taskId);

  // 要素の編集
  if (index !== -1) {
    // 編集後のTodoの名前を取得
    const newTodoName = todoItem.querySelector(".todo-name");

    // todoArrayのターゲットの要素の名前を編集後のTodoの名前に更新
    todoArray[index].name = newTodoName.textContent;
  }
};

// Todoアイテムの作成
const createTodoItem = (id, name) => {
  // Todoアイテムのテンプレートを取得
  const clone = template.content.cloneNode(true);
  const todoItem = clone.querySelector(".todo-item");
  const todoName = clone.querySelector(".todo-name");

  // idと名前の更新
  todoItem.dataset.id = id;
  todoName.textContent = name;

  return todoItem;
};

// 編集用Todoアイテムの作成
const createEditItem = (id, name) => {
  // Todoアイテムのテンプレートを取得
  const clone = editTemplate.content.cloneNode(true);
  const todoItem = clone.querySelector(".todo-item");
  const todoName = clone.querySelector(".todo-name");

  // idと名前の更新
  todoItem.dataset.id = id;
  todoName.value = name;

  return todoItem;
};

// 追加ボタンが押されたらTodoリストに追加
addButton.addEventListener("click", (event) => {
  // フォームの自動送信をキャンセル
  event.preventDefault();

  // Todoアイテムの作成
  const todoItem = createTodoItem(id, todoInput.value);

  // HTML上にTodoアイテムを追加
  todoList.append(todoItem);

  // todoArrayに追加
  addTodoArray(todoItem);

  // todoInputの初期化
  todoInput.value = "";
});

// 削除ボタンが押されたらTodoリストから削除
todoList.addEventListener("click", (event) => {
  // 削除ボタンの部分ならば
  if (event.target.classList.contains("delete-button")) {
    // Todoアイテムの取得
    const todoItem = event.target.closest(".todo-item");

    // todoArrayの要素の削除
    deleteTodoArray(todoItem);

    // HTML上のTodoアイテムを削除
    todoItem.remove();
  }
});

// 編集ボタンが押されたらTodoリストを編集できるように変更
todoList.addEventListener("click", (event) => {
  // 編集ボタンの部分ならば
  if (event.target.classList.contains("edit-button")) {
    // Todoアイテムの取得
    const todoItem = event.target.closest(".todo-item");
    const todoName = todoItem.querySelector(".todo-name");

    // 編集用Todoアイテムの作成
    const newTodoItem = createEditItem(
      todoItem.dataset.id,
      todoName.textContent
    );

    // HTML上で編集用のTodoアイテムに書き換える
    todoItem.parentElement.replaceChild(newTodoItem, todoItem);
  }
});

// 保存ボタンが押されたら更新して元に戻す
todoList.addEventListener("click", (event) => {
  if (event.target.classList.contains("save-button")) {
    // Todoアイテムの取得
    const todoItem = event.target.closest(".todo-item");
    const todoName = todoItem.querySelector(".todo-name");

    // Todoアイテムの作成
    const newTodoItem = createTodoItem(todoItem.dataset.id, todoName.value);

    // todoArrayの更新
    editTodoArray(newTodoItem);

    // HTML上で編集用のTodoアイテムに書き換える
    todoItem.parentElement.replaceChild(newTodoItem, todoItem);
  }
});

// キャンセルボタンが押されたら更新せずに元に戻す
todoList.addEventListener("click", (event) => {
  if (event.target.classList.contains("cancel-button")) {
    // Todoアイテムの取得
    const todoItem = event.target.closest(".todo-item");
    const taskId = Number(todoItem.dataset.id);

    // 編集前のTodoの名前を取得
    const index = todoArray.findIndex((item) => item.id === taskId);
    const originalTodoName = todoArray[index].name;

    // Todoアイテムの作成
    const newTodoItem = createTodoItem(taskId, originalTodoName);

    // HTML上で編集用のTodoアイテムに書き換える
    todoItem.parentElement.replaceChild(newTodoItem, todoItem);
  }
});

// チェックボックスが押されたら
todoList.addEventListener("click", (event) => {
  if (event.target.classList.contains("complete-checkbox")) {
    // Todoアイテムの取得
    const todoItem = event.target.closest(".todo-item");
    const todoName = todoItem.querySelector(".todo-name");

    // Todoの名前の更新
    if (event.target.checked) {
      todoName.style.textDecoration = "line-through";
      todoName.style.color = "grey";
    } else {
      todoName.style.textDecoration = "none";
      todoName.style.color = "black";
    }
  }
});
