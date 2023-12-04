"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { IoCloseCircleOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
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
      <div className="flex items-center w-1/2 h-full mx-auto bg-whitemb-30">
        <div className="relative w-4/5 pt-2 mx-auto text-gray-600 ">
          <input
            className="w-full h-40 px-12 pr-16 text-sm bg-white border-none rounded-full shadow-lg focus:outline-none drop-shadow-md"
            type="text"
            placeholder="Search"
            onChange={onChange}
            value={value}
          />
          {value ? (
            <button
              type="button"
              className="absolute transform -translate-y-1/2 right-15 top-1/2"
              onClick={onClear}
            >
              <IoCloseCircleOutline />
            </button>
          ) : (
            <FaSearch className="absolute transform -translate-y-1/2 right-15 top-1/2" />
          )}
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
