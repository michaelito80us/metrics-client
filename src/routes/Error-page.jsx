import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col items-center justify-center w-full bg-bgpri min-h-screen text-white">
      <h1 className="bg-gradient-to-r from-emerald-300 to-sky-300 bg-clip-text pb-4 text-center text-5xl font-black leading-[3.5rem] text-transparent selection:bg-transparent">
        Oops!
      </h1>
      <p className="pb-2">Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
