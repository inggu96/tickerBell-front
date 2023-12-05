import Image from "next/image";
import SearchBar from "../SearchBar/SearchBar";

export const SearchTab = () => {
  return (
    <div className="container flex flex-col pt-12 mx-auto my-5 bg-white rounded-lg ">
      <div className="container flex flex-col items-center gap-16 mx-auto my-32 pb-22">
        <div className="flex flex-col gap-7">
          <div className="flex flex-col items-center justify-center w-10/12 gap-2 px-6 mx-auto text-center">
            <Image
              src="https://private-user-images.githubusercontent.com/122377401/287469285-4608a344-39ad-4d8d-ab53-201037272767.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTEiLCJleHAiOjE3MDE1NDM5NDcsIm5iZiI6MTcwMTU0MzY0NywicGF0aCI6Ii8xMjIzNzc0MDEvMjg3NDY5Mjg1LTQ2MDhhMzQ0LTM5YWQtNGQ4ZC1hYjUzLTIwMTAzNzI3Mjc2Ny5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBSVdOSllBWDRDU1ZFSDUzQSUyRjIwMjMxMjAyJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDIzMTIwMlQxOTAwNDdaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1lMzk0OThlZDgwMTQ5MWIzZjg2NjM2NDcyYTk3ODhlNTM0NTE1NGVjYzQyZmI4NmJiOWQyYzZlMTE2NjdkZjY1JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.2dH6rZ0rfQDvcyb8dmxA3eNxQiFMt2VrACLIqnYjypA"
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
