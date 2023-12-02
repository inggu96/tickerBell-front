import React, { HTMLProps, forwardRef, Ref } from "react";
type InputType = {
  children?: React.ReactNode;
  label?: string;
} & HTMLProps<HTMLInputElement>;

export const Radio = forwardRef(
  ({ label, ...attr }: InputType, ref: Ref<HTMLInputElement>) => {
    return (
      <div>
        <label
          htmlFor={attr.id}
          className="flex items-center gap-4 cursor-pointer"
        >
          <input type="radio" ref={ref} className="cursor-pointer" {...attr} />
          <span>{label}</span>
        </label>
      </div>
    );
  }
);
Radio.displayName = "Radio";

export const CheckBox = forwardRef(
  ({ label, ...attr }: InputType, ref: Ref<HTMLInputElement>) => {
    return (
      <div>
        <label
          htmlFor={attr.id}
          className="flex items-center gap-4 cursor-pointer"
        >
          <input
            type="checkbox"
            ref={ref}
            className="cursor-pointer"
            {...attr}
          />
          <span>{label}</span>
        </label>
      </div>
    );
  }
);
CheckBox.displayName = "CheckBox";

export const Input = forwardRef(
  ({ label, ...attr }: InputType, ref: Ref<HTMLInputElement>) => {
    return (
      <div className="flex flex-col">
        {label && (
          <label htmlFor={attr.id} className="m-w-80">
            {label}
          </label>
        )}
        <input type="text" ref={ref} className="h-26" {...attr} />
      </div>
    );
  }
);
Input.displayName = "Input";
