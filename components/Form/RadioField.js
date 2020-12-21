import React, { useState } from "react";
import cx from "classnames";
import styles from "./RadioField.module.scss";

const RadioField = React.forwardRef(
  (
    { name, options, defaultValue, className, horizontal, error, lessSpace, inverseError, handleOtpChange },
    ref
  ) => {
    const [val, setVal] = useState(defaultValue);
    const handleChange = (value) => {
      setVal(value)
      handleOtpChange(value)
    }

    return (
      <div className="mt-auto mb-auto">
        <div className={cx("flex", !horizontal && "flex-col")}>
          {options.map(({ value, label, view }) => (
            <span key={value}>
              <label
                className={cx(styles.radioLabel, className, horizontal ? "pr-6" : "pb-6")}
              >
                <span className={styles.radioInput}>
                  <input
                    type="radio"
                    name={name}
                    value={value}
                    checked={value === val}
                    onChange={() => handleChange(value)}
                    ref={ref}
                  />
                  <span className={styles.radioControl} />
                </span>
                <span className={val === value ? styles.radioLabelChecked : styles.radioLabelUnchecked}>{label}</span>
              </label>
              {view && (
                <span className={val === value ? "" : "hidden"}>{view}</span>
              )}
            </span>
          ))}
        </div>
        {error && (
          <small
            className={cx(
              "absolute text-xs",
              lessSpace ? "pt-1" : "pt-2",
              inverseError ? "text-j-orange" : "text-j-red"
            )}
          >
            {error}
          </small>
        )}
      </div>
    );
  }
);

export default RadioField;
