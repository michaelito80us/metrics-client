export default function Home({ setStart }) {
  return (
    <div>
      <header className="flex min-h-screen flex-col items-center justify-center bg-bgpri text-white">
        <p className="bg-gradient-to-r from-emerald-300 to-sky-300 bg-clip-text pb-4 text-center text-5xl font-black leading-[3.5rem] text-transparent selection:bg-transparent">
          Welcome to the Factorial HR Home Assignment
        </p>
        <p className="pb-2">Prepared by: Michael Epelboim</p>
        <p>Date: Agust 10-17, 2023</p>
        <p className="mt-3 flex w-full items-center justify-center text-center text-[#8d96a7]">
          <button
            className="w-32 rounded-md border border-[#1fb6ae] py-2 text-[#1fb6ae] transition-all hover:cursor-pointer hover:border-[#1fb6ae]  hover:bg-[#1fb6ae] hover:text-white active:border-[#1fb6ae]/60 active:bg-[#1fb6ae]/60"
            onClick={() => setStart(true)}
          >
            Let&apos;s start
          </button>
        </p>
      </header>
    </div>
  );
}
