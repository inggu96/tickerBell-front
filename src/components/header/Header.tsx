"use clent";

import Image from "next/image";
import NavTab from "../NavTab/NavTab";
import SearchBar from "../SearchBar/SearchBar";
import Menu from "./Menu";
import MobileMenu from "./MobileMenu";

const Header = () => {
  return (
    <header className="box-border flex items-center w-full m-auto border-b border-red-500 h-60">
      <div className="items-center justify-between hidden w-full px-20 m-auto max-w-1280 md:flex lg:flex xl:flex 2xl:flex">
        <div className="flex items-center gap-80">
          <a href="/">
            <Image
              src="/logo.png"
              alt="logo"
              width={200}
              height={150}
              objectFit="none"
            />
          </a>

          <NavTab />
        </div>
        {/* <SearchBar /> */}
        <Menu />
      </div>
      <div className="z-50 flex">
        <MobileMenu />
      </div>
    </header>
  );
};

export default Header;
