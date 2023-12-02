import React, { HTMLProps } from "react";
import { IoCloseSharp } from "react-icons/io5";

type TagField = {
  id: string;
  name: string;
};

type props = {
  label: string;
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
  fields: TagField[];
  remove: (index: number) => void;
} & HTMLProps<HTMLInputElement>;

export const InputField = ({
  label,
  placeholder,
  onKeyDown,
  fields,
  remove,
  ...attr
}: props) => {
  return (
    <div>
      <label
        htmlFor={attr.id}
        className="block mb-2 text-sm font-medium text-gray-900 "
      >
        {label}
      </label>
      <input
        placeholder={placeholder}
        {...attr}
        className="w-full p-16 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
        onKeyDown={onKeyDown}
      />
      {fields && (
        <div className="flex flex-row">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center mt-2 space-x-2">
              <div className="px-3 py-1 text-sm text-gray-900 bg-gray-100 border border-gray-300 rounded-lg">
                {field.name}
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="px-3 py-1 text-sm font-medium text-center text-black bg-red-500 rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-red-300"
                >
                  <IoCloseSharp />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
