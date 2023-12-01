"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import s from "./searchbar.module.scss";

import { Search34 } from "../images";
import { IoCloseCircleOutline } from "react-icons/io5";

const SearchBar = () => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setValue(value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValue("");
    if (value) {
      router.push(`/search?keyword=${value}`);
    } else {
      router.push(`/search`);
    }
  };

  const onClear = () => {
    setValue("");
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex items-center w-full h-full ">
        <div className="relative pt-2 mx-auto text-gray-600">
          <input
            className="px-12 pr-16 text-sm bg-white border-2 border-gray-300 rounded-lg h-30 focus:outline-none"
            type="text"
            placeholder="Search"
            onChange={onChange}
            value={value}
          />
          {value && (
            <button
              type="button"
              className="absolute transform -translate-y-1/2 right-2 top-1/2"
              onClick={onClear}
            >
              <IoCloseCircleOutline />
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
