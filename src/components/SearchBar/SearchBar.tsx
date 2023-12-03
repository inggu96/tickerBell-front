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
      <div className="flex items-center w-full h-full ">
        <div className="relative pt-2 mx-auto text-gray-600">
          {!value && (
            <div
              className="absolute transform translate-y-1/2 right-8"
              onClick={onClear}
            >
              <FaSearch />
            </div>
          )}
          <input
            className="px-12 pr-16 text-sm bg-white border-gray-500 rounded-full border-1 h-30 focus:outline-none focus:border-primary"
            type="text"
            placeholder="Search"
            onChange={onChange}
            value={value}
          />
          {value && (
            <button
              type="button"
              className="absolute transform -translate-y-1/2 right-5 top-1/2"
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
