export function fallbackRender({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.
  return (
    <div className="bg-red-100  text-red-700 px-4 py-3  w-screen h-screen flex flex-col justify-center items-center">
      <p className="font-bold text-3xl">Something went wrong:</p>
      <div>
        <p className="">{error.message}</p>
      </div>
      <button onClick={resetErrorBoundary} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4">Try again</button>
    </div>
  );
}
