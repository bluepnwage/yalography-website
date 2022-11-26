export function Nav() {
  return (
    <div className="bg-zinc-800 w-1/5 h-screen fixed top-16 left-0 pt-10">
      <ul className="w-full flex gap-4 flex-col items-center">
        <li className="bg-red-600 bg-opacity-50 text-red-200 text-center w-4/5 py-2 rounded-md">
          <a className="">Dashboard</a>
        </li>
        <li className="text-center w-4/5 py-2 rounded-md hover:bg-red-600 hover:bg-opacity-50 hover:text-red-200 duration-200 ease-out">
          <a className="">Dashboard</a>
        </li>
        <li className="text-center w-4/5 py-2 rounded-md hover:bg-red-600 hover:bg-opacity-50 hover:text-red-200 duration-200 ease-out">
          <a className="">Dashboard</a>
        </li>
      </ul>
    </div>
  );
}
