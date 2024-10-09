import { cn } from "@/lib/utils";
import { type FormEvent } from "react";
import { Input } from "./Input";

const isNumber = (s: string, decimals = 10): boolean => {
  const reg = new RegExp(
    `(^[0-9]{0,9}$)|(^[0-9]{0,9}[.][0-9]{0,${decimals}}$)`
  );
  return reg.test(s) && !isNaN(parseFloat(s)) && isFinite(parseFloat(s));
};

export const InputGroup = ({
  postfix,
  value,
  placeholder,
  disabled,
  onChange,
  onMax,
  icon,
  inputReadonly,
  inputDisabled,
  decimals,
  type = "number",
  className,
}: {
  value: string;
  type?: "text" | "number";
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  onMax?: () => void;
  postfix?: React.ReactNode;
  icon?: React.ReactNode;
  inputReadonly?: boolean;
  inputDisabled?: boolean;
  decimals?: number;
  className?: string;
}) => {
  return (
    <div className="flex w-full items-center rounded-md border border-input bg-transparent px-3 py-0 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
      <input
        inputMode="decimal"
        placeholder={placeholder}
        readOnly={inputReadonly === undefined ? false : inputReadonly}
        disabled={inputDisabled === undefined ? disabled : inputDisabled}
        onInput={(v: FormEvent<HTMLInputElement>) => {
          if (type === "number") {
            if (v.currentTarget.value === ".") {
              v.currentTarget.value = "0.";
            }

            v.currentTarget.value =
              !!v.currentTarget.value &&
              isNumber(v.currentTarget.value, decimals) &&
              parseFloat(v.currentTarget.value) >= 0
                ? v.currentTarget.value
                : "";
          }
        }}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        className={cn("h-full flex-1 text-xl outline-none", className, {
          "bg-gray-200": disabled,
        })}
        type="text"
      />
      {postfix && (
        <span
          onClick={!disabled ? onMax : undefined}
          className={cn(
            "cursor-pointer select-none px-3 text-base font-medium text-page-link",
            {
              "bg-gray-200": disabled,
              "bg-white": !disabled,
            }
          )}
        >
          {postfix}
        </span>
      )}
      {icon}
    </div>
  );
};
