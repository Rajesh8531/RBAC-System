import { cn } from "@/lib/utils";
import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckBox = React.forwardRef<HTMLInputElement, InputProps>(
  ({ onChange, label, id, ...props }, ref) => {
    return (
      <div className="check-box__group">
        <input
          id={id}
          className={cn("check-box border")}
          ref={ref}
          {...props}
          onChange={onChange}
          type="checkbox"
        />
        <label className="check-box__label" htmlFor={id}>
          <span className="check-box__icon">&#10003;</span>
          {label}
        </label>
      </div>
    );
  }
);

CheckBox.displayName = "Input";

export { CheckBox };
