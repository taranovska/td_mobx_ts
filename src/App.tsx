import TodoInput from "./Todo/TodoInput/TodoInput";
import ToDoList from "./Todo/ToDoList/ToDoList";
import styles from "./App.module.css";
import { observer, useLocalObservable } from "mobx-react-lite";
import { useStore } from "./stores";

function App() {
  const { todos } = useStore();

  const appUi = useLocalObservable(() => ({
    todosVisible: true,
    loading: false,
    receiveData() {
      this.loading = false;
      this.todosVisible = !this.todosVisible;
    },
    toggleTodoVisibility() {
      this.loading = true;
      new Promise((resolve) => setTimeout(() => resolve(void 0), 1000)).then(
        this.receiveData
      );
    },
  }));

  return (
    <div className="app">
      <TodoInput />
      <div className={styles["todo-list-wrapper"]}>
        <h2 onClick={appUi.toggleTodoVisibility}>
          <span>{appUi.todosVisible ? "-" : "+"}</span>
          Todos (unfinished {todos.unfinishedTodos.length})
        </h2>
        {appUi.todosVisible && <ToDoList />}
      </div>
    </div>
  );
}

export default observer(App);
