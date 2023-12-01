"use clent";

import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import Menu from "./Menu";
import Link from "next/link";
import NavTab from "../NavTab/NavTab";

const Header = () => {
  return (
    <header className="box-border flex items-center w-full px-20 m-auto border-b border-red-500 h-60">
      <div className="flex items-center justify-between w-full m-auto max-w-1280">
        <div className="flex items-center gap-20">
          <Link href="/">TickerBell</Link>
          <SearchBar />
          <NavTab />
        </div>
        <Menu />
      </div>
    </header>
  );
};

export default Header;
