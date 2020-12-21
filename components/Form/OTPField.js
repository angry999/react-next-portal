import React from "react";
import Input from "./Input";
import Field from "./Field";

const OTPField = React.forwardRef(
  ({
    className,
    error,
    name,
    onChange,
    lessSpace,
    inverseError,
    defaultValue,
    noIcon,
    ...rest
  },
    ref
  ) => {
    // const [prefix, number] = (defaultValue || "").split(" ");
    const [value, setValue] = React.useState(defaultValue);
    const codeInput = React.useRef(null);
    const phoneInput = React.useRef(null);
    const updateValue = () => {
      const val = `${phoneInput.current.value}`;
      setValue(val);
      onChange && onChange({ target: { value: val } });
    };

    return (
      <Field
        icon={!noIcon && "fal fa-lock-alt flex-grow-0 text-2xl pt-2 pl-1"}
        error={error}
        inverseError={inverseError}
        className={className}
        lessSpace={lessSpace}
      >
        <Input
          ref={phoneInput}
          {...rest}
          onChange={updateValue}
          grow
          withIcon
          type="password"
        // defaultValue={number || prefix}
        />
        <input ref={ref} name={name} value={value} type="hidden" />
      </Field>
    );
  }
);

export default OTPField;