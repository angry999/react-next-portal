import React from "react";
import Select from "./Select";
import Field from "./Field";

const InputField = React.forwardRef(
  (
    {
      children,
      className,
      dropIcon,
      inputClassName,
      defaultValue,
      handleChangeSelect,
      icon,
      error,
      lessSpace,
      inverseError,
      ...rest
    },
    ref
  ) => (
      <Field
        icon={icon}
        error={error}
        inverseError={inverseError}
        className={className}
        lessSpace={lessSpace}
      >
        <Select withIcon={!!icon} ref={ref} className={inputClassName} dropIcon={dropIcon} defaultValue={defaultValue} handleChangeSelect={handleChangeSelect} {...rest}>
          {children}
        </Select>
      </Field>
    )
);

export default InputField;
