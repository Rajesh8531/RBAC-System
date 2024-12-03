import { cn } from "@/lib/utils";
import React from "react";
import { FieldError } from "react-hook-form";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error: FieldError | undefined;
  label: string;
  id: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, error, ...props }, ref) => {
    return (
      <div className="input__group">
        <input
          id={id}
          className={cn(
            "input border",
            !error?.message ? " border-transparent" : "border-red-500"
          )}
          ref={ref}
          {...props}
        />
        <label className="input__label" htmlFor={id}>
          {label}
        </label>
        {error && <p className={cn("input__error")}>{error.message}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
