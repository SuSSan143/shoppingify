import Head from "next/head";
import React from "react";

const Statistics = () => {
  return (
    <>
      <Head>
        <title>Shoppingify | Statistics</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-full flex-1 flex-col gap-12 bg-[#fafafe] px-16 py-8">
        <div className="grid grid-cols-2 gap-24">
          <div className="flex flex-col items-start gap-5">
            <h3 className="text-2xl">Top Items</h3>
            <div className="flex w-full flex-col items-center gap-3">
              <span className="flex w-full flex-row items-center justify-between">
                <h6 className="">Banana</h6>
                <span>12%</span>
              </span>
              <div className="h-2.5 w-full rounded-full bg-gray-200">
                <div className="h-2.5 w-[12%] rounded-full bg-[#f9a109]"></div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-5">
            <h3 className="text-2xl">Top Category</h3>
            <div className="flex w-full flex-col items-center gap-3">
              <span className="flex w-full flex-row items-center justify-between">
                <h6 className="">Friuts and Vegetables</h6>
                <span>12%</span>
              </span>
              <div className="h-2.5 w-full rounded-full bg-gray-200">
                <div className="h-2.5 w-[12%] rounded-full bg-blue-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Statistics;