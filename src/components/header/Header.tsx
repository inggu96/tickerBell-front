"use clent";

import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import Menu from "./Menu";
import Link from "next/link";
import NavTab from "../NavTab/NavTab";
import Image from "next/image";

const Header = () => {
  return (
    <header className="box-border flex items-center w-full px-20 m-auto border-b border-red-500 h-60">
      <div className="flex items-center justify-between w-full m-auto max-w-1280">
        <div className="flex items-center gap-20">
          <a>
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
    </header>
  );
};

export default Header;
