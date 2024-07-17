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
