import React from "react";

const Skeleton = () => {
  return (
    <section className="bg-white">
      <div className="container px-6 py-10 mx-auto animate-pulse">
        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-5 lg:grid-cols-3">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="w-full">
              <div className="w-full bg-gray-300 rounded-lg h-250 "></div>
              <h1 className="mt-4 bg-gray-200 rounded-lg h-15 w-200"></h1>
              <p className="h-10 mt-4 bg-gray-200 rounded-lg w-150"></p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skeleton;
