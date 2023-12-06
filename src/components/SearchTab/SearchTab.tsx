import Image from "next/image";
import SearchBar from "../SearchBar/SearchBar";

export const SearchTab = () => {
  return (
    <div className="container flex flex-col pt-12 mx-auto my-5 bg-white rounded-lg ">
      <div className="container flex flex-col items-center gap-16 mx-auto my-32 pb-22">
        <div className="flex flex-col gap-7">
          <div className="flex flex-col items-center justify-center w-10/12 gap-2 px-6 mx-auto text-center">
            <Image
              src="/logo.png"
              alt="logo"
              width={250}
              height={200}
              objectFit="none"
              className="md:hidden lg:hidden xl:hidden 2xl:hidden sm:flex sm:mb-20"
            />
            <h2 className="text-3xl font-bold leading-tight text-gray-900 lg:text-4xl drop-shadow-md whitespace-nowrap">
              다양한 공연과 새로운 경험을 티켓벨을 <br /> 통해 즐겨보세요.
            </h2>
            <p className="text-base font-medium leading-7 text-gray-900 drop-shadow-md">
              새로운 경험이 티켓벨에서 시작됩니다.
            </p>
          </div>
        </div>
      </div>
      <SearchBar />
    </div>
  );
};
