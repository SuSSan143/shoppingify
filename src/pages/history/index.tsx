import React from "react";
import Head from "next/head";

import { BsCalendarDate, BsChevronRight } from "react-icons/bs";

const History = () => {
  return (
    <>
      <Head>
        <title>Shoppingify | History</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-full flex-1 flex-col gap-12 bg-[#fafafe] px-16 py-8">
        <h1 className="text-2xl">Shopping List</h1>

        <div className="flex flex-col items-center gap-7">
          <div className="flex w-full flex-col gap-5">
            <h6 className="text-sm">August 2020</h6>

            {[1, 2].map((number: number) => (
              <div
                key={number}
                className="w-full rounded-lg px-5 py-3 shadow-lg"
              >
                <div className="flex flex-row items-center justify-between gap-3">
                  <h6 className="text-lg">Grocery List</h6>
                  <div className="flex flex-row gap-9">
                    <span className="flex flex-row items-center gap-2 text-sm text-gray-400">
                      <BsCalendarDate size="1.3rem" />
                      Mon 27.08.2022
                    </span>

                    <button className="rounded-lg border border-blue-400 px-4 py-1 text-blue-400">
                      Completed
                    </button>

                    <button className="text-[#f9a109]">
                      <span className="hidden">Grocery list page</span>
                      <BsChevronRight className="stroke-1" size="1.3rem" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default History;