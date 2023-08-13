import { AiOutlineCloseCircle } from "react-icons/ai";

interface AsideProps {
  setMenu: (menu: boolean) => void;
}

export function Aside({ setMenu }: AsideProps) {
  return (
    <>
      <div className="flex h-full flex-col justify-between border-e border-zinc-500">
        <div className="px-4 py-6">
          <div className="w-full flex items-center justify-between">
            <div className="w-min flex gap-2 group">
              <button className="w-3 h-3 rounded-full bg-zinc-300  group-hover:bg-red-400"></button>
              <button className="w-3 h-3 rounded-full bg-zinc-300  group-hover:bg-yellow-400"></button>
              <button className="w-3 h-3 rounded-full bg-zinc-300  group-hover:bg-green-400"></button>
            </div>

            <AiOutlineCloseCircle
              className="w-7 h-7 cursor-pointer"
              onClick={() => setMenu(false)}
            />
          </div>

          <ul className="mt-6 space-y-1">
            <li>
              <a
                href=""
                className="block rounded-lg py-2 text-xl font-medium text-gray-50"
              >
                General
              </a>
            </li>

            <li>
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-300 hover:bg-gray-600 hover:text-gray-50">
                  <span className="text-sm font-medium"> Teams </span>

                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </summary>

                <ul className="mt-2 space-y-1 px-4">
                  <li>
                    <a
                      href=""
                      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-600 hover:text-gray-50"
                    >
                      Banned Users
                    </a>
                  </li>

                  <li>
                    <a
                      href=""
                      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-600 hover:text-gray-50"
                    >
                      Calendar
                    </a>
                  </li>
                </ul>
              </details>
            </li>

            <li>
              <a
                href=""
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-600 hover:text-gray-50"
              >
                Billing
              </a>
            </li>

            <li>
              <a
                href=""
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-600 hover:text-gray-50"
              >
                Invoices
              </a>
            </li>

            <li>
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-300 hover:bg-gray-600 hover:text-gray-50">
                  <span className="text-sm font-medium"> Account </span>

                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </summary>

                <ul className="mt-2 space-y-1 px-4">
                  <li>
                    <a
                      href=""
                      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-600 hover:text-gray-50"
                    >
                      Details
                    </a>
                  </li>

                  <li>
                    <a
                      href=""
                      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-600 hover:text-gray-50"
                    >
                      Security
                    </a>
                  </li>

                  <li>
                    <form action="/logout">
                      <button
                        type="submit"
                        className="w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-300 [text-align:_inherit] hover:bg-gray-600 hover:text-gray-50"
                      >
                        Logout
                      </button>
                    </form>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>

        <div className="sticky inset-x-0 bottom-0 border-t border-gray-500">
          <a href="#" className="flex items-center gap-2 p-4 hover:bg-gray-50">
            <img
              alt="Man"
              src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              className="h-10 w-10 rounded-full object-cover"
            />

            <div>
              <p className="text-xs">
                <strong className="block font-medium">Eric Frusciante</strong>

                <span> eric@frusciante.com </span>
              </p>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}
