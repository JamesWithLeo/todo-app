import * as React from "react";
import { useState, useEffect } from "react";
import Todo from "./components/Todo";
import { NewTodo } from "./components/NewTodo";
import ServerDownFallback from "./components/ServerDownFallback";
export type todoTypeFace = {
  todo: string;
  _id: string;
  status: boolean;
};

function App() {
  const [todos, setTodos] = useState<JSX.Element[] | null>(null);
  const [newTodo, setNewTodo] = useState<JSX.Element | null>(null);
  const [IsConnectedToServer, setIsConnectedToServer] =
    useState<boolean>(false);
  async function fetchTodo() {
    await fetch("/todo")
      .then(async (response) => {
        await response.json().then((value) => {
          console.log(value);

          const todoElements: JSX.Element[] = value.todos.map(
            (todo: todoTypeFace) => {
              return (
                <>
                  <Todo todoObj={todo} refresh={fetchTodo} />
                </>
              );
            },
          );
          setTodos(todoElements);
          setIsConnectedToServer(true);
        });
      })
      .catch((rejResponse) => {
        setTodos([<ServerDownFallback />]);
      });
  }
  useEffect(() => {
    fetchTodo();
  }, []);
  function openNewTodo() {
    setNewTodo(<NewTodo isVisible={true} refresh={fetchTodo} />);
  }

  function cancelNewTodo() {
    setNewTodo(null);
  }
  return (
    <div className="flex h-svh w-full flex-col items-center justify-end gap-4 bg-gray-50 p-4 sm:justify-center lg:flex-col">
      <h1 className="text-3xl font-bold text-slate-400">To do App</h1>
      <div className="flex h-full w-full flex-col-reverse sm:h-max sm:w-auto sm:gap-2 md:flex-row lg:h-max lg:flex-col">
        {newTodo ? newTodo : null}
        <div className="flex h-full flex-col gap-2 sm:max-h-96 sm:py-0 md:h-max lg:h-full lg:flex-row">
          {todos?.length !== 0 ? (
            <div className="flex h-full w-full flex-col gap-2 overflow-y-auto rounded-lg border px-2 py-4 shadow sm:w-96 lg:h-auto lg:max-h-96 lg:w-96 lg:gap-2">
              {todos}
            </div>
          ) : (
            <>
              {newTodo ? null : (
                <>
                  <h1 className="flex h-full items-center justify-center align-middle text-base font-bold text-slate-400">
                    No to do yet
                  </h1>
                </>
              )}
            </>
          )}
          {!IsConnectedToServer ? null : (
            <div className="max-w flex h-max w-full flex-col gap-4 rounded-lg border shadow lg:h-full lg:w-max lg:px-2 lg:py-4">
              {newTodo ? (
                <>
                  <button
                    onClick={cancelNewTodo}
                    className="rounded px-2 py-1 text-gray-500 hover:bg-white hover:text-gray-600"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className="rounded px-2 py-1 text-gray-500 hover:bg-white hover:text-gray-600"
                  onClick={openNewTodo}
                >
                  New
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
