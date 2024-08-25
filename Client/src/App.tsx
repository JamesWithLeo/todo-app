import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Todo from "./components/Todo";
import { NewTodo } from "./components/NewTodo";
import { useQuery } from "@tanstack/react-query";
export type todoTypeFace = {
  todo: string;
  _id: string;
  status: boolean;
};

function App() {
  const query = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await fetch("/todo").then((response) =>
        response.json().then((value) => value),
      );
      console.log(response);
      return response.todos;
    },
  });

  const [newTodo, setNewTodo] = useState<Boolean>(false);

  return (
    <div className="flex h-svh w-full flex-col items-center justify-end gap-4 bg-gray-50 p-4 sm:justify-center lg:flex-col">
      <h1 className="text-3xl font-bold text-slate-400">To do</h1>
      <div className="flex h-full w-full flex-col-reverse sm:h-max sm:w-auto sm:gap-2 md:flex-row lg:h-max lg:flex-col">
        {newTodo ? <NewTodo isVisible={true} /> : null}
        <div className="flex h-full flex-col gap-2 sm:max-h-96 sm:py-0 md:h-max lg:h-full lg:flex-row">
          {!query.isLoading ? (
            <>
              {query && query.data ? (
                <div className="flex h-full w-full flex-col gap-2 overflow-y-auto rounded-lg border px-2 py-4 shadow sm:w-96 lg:h-auto lg:max-h-96 lg:w-96 lg:gap-2">
                  <>
                    {query.data.map((value: todoTypeFace) => {
                      return (
                        <>
                          <Todo todoObj={value} />
                        </>
                      );
                    })}
                  </>
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
            </>
          ) : (
            <div className="flex">
              <FontAwesomeIcon
                icon={faGear}
                className="text- animate-spin text-slate-400"
              />
            </div>
          )}
          {!query.isSuccess ? null : (
            <div className="max-w flex h-max w-full flex-col gap-4 rounded-lg border shadow lg:h-full lg:w-max lg:px-2 lg:py-4">
              {newTodo ? (
                <>
                  <button
                    onClick={() => {
                      setNewTodo(false);
                    }}
                    className="rounded px-2 py-1 text-gray-500 hover:bg-white hover:text-gray-600"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className="rounded px-2 py-1 text-gray-500 hover:bg-white hover:text-gray-600"
                  onClick={() => {
                    setNewTodo(true);
                  }}
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
