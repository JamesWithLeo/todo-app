import { todoTypeFace } from "../App";
import * as React from "react";

interface ITodo {
  todoObj: todoTypeFace;
  refresh: () => Promise<void>;
}
export default function Todo({ todoObj, refresh }: ITodo): JSX.Element {
  async function markAsFinish() {
    const id: string = todoObj._id;
    let status: string = "false";
    if (todoObj.status === false) {
      status = "true";
    }
    const response: Response = await fetch(
      "/todo/strike/" + id + "/?strike=" + status,
    );
    await response.json().then((value) => {
      console.log(value);
      refresh();
    });
  }
  async function deleteTodo() {
    const id: string = todoObj._id;
    const response: Response = await fetch("/todo/delete/" + id);
    await response.json().then((value) => {
      console.log(value);
      refresh();
    });
  }

  return (
    <div className="group flex w-full gap-1 sm:h-full">
      <div
        onClick={markAsFinish}
        className="group flex h-auto w-full cursor-default select-none items-center justify-between rounded bg-white p-2 duration-300 ease-in-out sm:p-2 lg:h-max"
      >
        <>
          {todoObj.status === false ? (
            <>
              <h1>{todoObj.todo}</h1>
            </>
          ) : (
            <>
              <h1 className="text-sm line-through">{todoObj.todo} </h1>
            </>
          )}
        </>
      </div>
      <div className="hidden h-full w-max flex-col justify-center gap-2 text-center group-hover:flex">
        <button
          onClick={deleteTodo}
          className="h-full w-full items-center justify-center rounded bg-orange-200 px-2 py-0 text-center text-orange-500"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

interface INewTodo {
  isVisible: boolean;
  refresh: () => Promise<void>;
}

export function NewTodo({ isVisible, refresh }: INewTodo): JSX.Element {
  function clear() {
    const titleValue = document.getElementById(
      "titleElement",
    ) as HTMLInputElement;
    titleValue.value = "";
    titleValue.focus();
  }
  async function saveNewTodo() {
    const titleValue = document.getElementById(
      "titleElement",
    ) as HTMLInputElement;
    if (titleValue.value !== "") {
      const todoObj = JSON.stringify({
        todo: titleValue.value,
        status: false,
      });
      console.log(todoObj);
      await fetch("/todo/append", {
        method: "POST",
        body: todoObj,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((result) => {
        refresh();
        clear();
        result.json().then((value) => {
          console.log(value);
        });
      });
    }
  }
  return (
    <>
      {isVisible ? (
        <div className="flex h-max w-full justify-between md:h-full md:w-max lg:w-full lg:py-0">
          <div className="flex w-full flex-col gap-4 rounded-lg border px-2 py-4 shadow sm:flex-row md:flex-col">
            <div className="flex w-full items-center justify-between gap-2 sm:flex-col sm:items-start sm:justify-start md:flex-col lg:flex-row lg:items-center">
              <h1 className="w-max text-gray-500">Todo</h1>
              <input
                placeholder="Brew Coffee"
                id="titleElement"
                autoFocus
                className="md:max-h-1/2 sm:max-h-auto max-h-full min-h-12 w-full text-pretty rounded border bg-white px-2 py-1 shadow-inner outline-slate-400 focus:h-full active:h-full lg:max-h-full"
              />
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={saveNewTodo}
                className="w-full rounded bg-blue-300 px-2 py-1 text-gray-100 shadow hover:text-white active:bg-blue-200"
              >
                Save
              </button>
              <button
                onClick={clear}
                className="w-full rounded bg-red-300 px-2 py-1 text-gray-100 shadow hover:text-white active:bg-red-200"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
