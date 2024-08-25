import { todoTypeFace } from "../App";
import { useDeleteTodo, useMarkTodo } from "../todoService";

export default function Todo({ todoObj }: { todoObj: todoTypeFace }) {
  const { mutateAsync: deleteTodo, isPending: isDeleting } = useDeleteTodo();
  const { mutateAsync: markTodo, isPending: isMarking } = useMarkTodo();
  async function markAsFinish() {
    if (!isMarking) markTodo({ id: todoObj._id, status: !todoObj.status });
  }
  async function HandeDeleteTodo() {
    const id: string = todoObj._id;
    if (!isDeleting) deleteTodo(id);
  }

  return (
    <div className="group flex w-full gap-1 sm:h-full">
      <div
        className="group flex h-auto w-full cursor-default select-none items-center justify-between rounded bg-white p-2 duration-300 ease-in-out sm:p-2 lg:h-max"
        onClick={markAsFinish}
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
          onClick={HandeDeleteTodo}
          className="h-full w-full items-center justify-center rounded bg-orange-200 px-2 py-0 text-center text-orange-500"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
