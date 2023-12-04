"use clent";

import Image from "next/image";
import NavTab from "../NavTab/NavTab";
import SearchBar from "../SearchBar/SearchBar";
import Menu from "./Menu";
import MobileMenu from "./MobileMenu";

const Header = () => {
  return (
    <header className="box-border flex items-center w-full m-auto border-red-500 h-60">
      <div className="items-center justify-between hidden w-full px-20 m-auto max-w-1280 md:flex lg:flex xl:flex 2xl:flex">
        <div className="flex items-center gap-80">
          <a href="/">
            <Image
              src="https://private-user-images.githubusercontent.com/122377401/287469285-4608a344-39ad-4d8d-ab53-201037272767.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTEiLCJleHAiOjE3MDE1NDM5NDcsIm5iZiI6MTcwMTU0MzY0NywicGF0aCI6Ii8xMjIzNzc0MDEvMjg3NDY5Mjg1LTQ2MDhhMzQ0LTM5YWQtNGQ4ZC1hYjUzLTIwMTAzNzI3Mjc2Ny5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBSVdOSllBWDRDU1ZFSDUzQSUyRjIwMjMxMjAyJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDIzMTIwMlQxOTAwNDdaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1lMzk0OThlZDgwMTQ5MWIzZjg2NjM2NDcyYTk3ODhlNTM0NTE1NGVjYzQyZmI4NmJiOWQyYzZlMTE2NjdkZjY1JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.2dH6rZ0rfQDvcyb8dmxA3eNxQiFMt2VrACLIqnYjypA"
              alt="logo"
              width={200}
              height={150}
              objectFit="none"
            />
          </a>

          <NavTab />
        </div>
        <SearchBar />
        <Menu />
      </div>
      <div className="z-50 flex">
        <MobileMenu />
      </div>
    </header>
  );
};

export default Header;
