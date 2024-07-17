export default function ServerDownFallback() {
  return (
    <>
      <div className="flex flex-col items-center justify-center px-2 text-center">
        <h1 className="flex h-full items-center align-middle text-sm font-bold text-slate-400">
          Can't connect to server
        </h1>
        <div className="mt-4 flex gap-2">
          <button
            className="rounded bg-slate-400 px-2 py-1 text-sm text-white active:scale-[.9]"
            onClick={() => {
              window.location.reload();
            }}
          >
            Retry
          </button>
        </div>
      </div>
    </>
  );
}
