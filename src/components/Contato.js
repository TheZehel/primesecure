import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faHandPeace } from "@fortawesome/free-solid-svg-icons";

export default function Contato() {
  return (
    <div className="relative isolate overflow-hidden  py-16 sm:py-24 lg:py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className=" font-bold tracking-tight text-2xl text-grayPrime sm:text-2xl">
              Inscreva-se em Nossa Newsletter.
            </h2>
            <p className="mt-4 text-lg leading-8 text-grayPrime">
              Nostrud amet eu ullamco nisi aute in ad minim nostrud adipisicing
              velit quis. Duis tempor incididunt dolore.
            </p>
            <div className="mt-6 flex max-w-md gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-grayPrime shadow-sm ring-1 ring-inset ring-grayPrime/25 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:text-sm sm:leading-6"
                placeholder="Enter your email"
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-bluePrime px-3.5 py-2.5 text-sm font-semibold text-grayPrimee shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bluePrime"
              >
                Inscrever
              </button>
            </div>
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-bluePrime">
                <FontAwesomeIcon
                  icon={faCalendar}
                  className="h-6 w-6 text-bluePrime"
                  aria-hidden="true"
                />
              </div>
              <dt className="mt-4 font-semibold text-grayPrime">
                Weekly articles
              </dt>
              <dd className="mt-2 leading-7 text-grayPrime text-left">
                Non laboris consequat cupidatat laborum magna. Eiusmod non irure
                cupidatat duis commodo amet.
              </dd>
            </div>
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-bluePrime">
                <FontAwesomeIcon
                  icon={faHandPeace}
                  className="h-6 w-6 text-bluePrime"
                  aria-hidden="true"
                />
              </div>
              <dt className="mt-4 font-semibold text-grayPrime">No spam</dt>
              <dd className="mt-2 leading-7 text-grayPrime text-left">
                Officia excepteur ullamco ut sint duis proident non adipisicing.
                Voluptate incididunt anim.
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="absolute  xl:-top-6 bg-grayPrime" aria-hidden="true">
        <div className="" />
      </div>
    </div>
  );
}
