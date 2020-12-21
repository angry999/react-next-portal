import React from "react";
import cx from "classnames";

const Select = React.forwardRef(
  ({ children, className, dropIcon,defaultValue, handleChangeSelect, withIcon, tiny, grow, ...rest }, ref) => {
    const [isFilled, setFilled] = React.useState(false);
    const [clear, setClear] = React.useState(false);
    const inputRef = React.useRef();

    React.useEffect(() => {
      if (!clear) return;
      const inputs =
        inputRef.current && inputRef.current.getElementsByTagName("select");
      if (inputs && inputs[0]) {
        inputs[0].value = "";
        inputs[0].focus();
        setFilled(false);
      }

      setClear(false);
    }, [clear]);

    React.useEffect(() => {
      let inputs =
      inputRef.current && inputRef.current.getElementsByTagName("select");
      inputs[0].value = defaultValue;
      console.log('inputs[0].value==>', inputs[0].value);
    }, [defaultValue]);

    const handleChange = (e) => {
      // console.log(e.target.value);
      setFilled(e.target.value.length > 0)
      handleChangeSelect(e)
    }

    return (
      <div
        className={cx(
          "flex",
          { "w-full": !tiny, "flex-grow": grow },
          className
        )}
        ref={inputRef}
      >
        <select
          style={{
            WebkitAppearance: 'none',
            appearance: 'none',
            marginLeft: '5px',
            lineHeight: '2'
          }}
          className={cx(
            "flex-grow max-w-full placeholder-j-gray-lighter bg-j-white text-gray-600 text-xl self-center pt-1 leading-none border-0 focus:outline-none",
            { "ml-2": withIcon }
          )}
          onChange={handleChange}
          ref={ref}
          {...rest}
        >
          {children}
        </select>
        {dropIcon &&
          <i
            className="fal fa-sort-down text-j-gray-light cursor-pointer text-5xl ml-2 mb-5 self-center"
          // onClick={() => setClear(true)}
          />
        }
      </div>
    );
  }
);

export default Select;
