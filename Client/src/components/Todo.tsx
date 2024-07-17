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
