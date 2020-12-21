import React, { useState } from "react";
import cx from "classnames";
import StepField from "../StepField";
import styles from "./SignUp.module.scss";
import PAN1View from "./PAN1View";
import PAN2View from "./PAN2View";
import PAN3View from "./PAN3View";
import ContactView from "./ContactView";
import LoginView from "./LoginView";
import BankView from "./BankView";
import BalanceView from "./BalanceView";
import AllSetView from "./AllSetView";

function SignUp({
  children,
  theme,
  className,
  ...rest
}) {
  const [steps, setSteps] = useState(
    [
      { value: 0, label: "PAN and GST", checked: false, focuse: true },
      { value: 1, label: "Contact Information", checked: false, focuse: false },
      { value: 2, label: "Login Credentials", checked: false, focuse: false },
      { value: 3, label: "Bank Details", checked: false, focuse: false },
      { value: 4, label: "Balance Top Up", checked: false, focuse: false },
    ]
  )
  const [activeStep, setActiveStep] = useState(0);
  const [checkedStep, setCheckedStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [sdata, setSdata] = useState({
    pan: null,
    otp: null,
    gst: null,
    email: null,
    phone: null,
    name: null,
    password: null,
    bankname: null,
    ifsc: null,
    banknumber: null
  });


  const handleSdata = (e) => {
    setSdata({ ...sdata, [e.target.name]: e.target.value })
  }

  const handlePhone = (value) => {
    setSdata({ ...sdata, phone: value })
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    if (activeStep >= 2) {
      setCheckedStep(activeStep - 1)
    } else {
      setCheckedStep(0)
    }
  };

  const handleComplete = () => {
    setCompleted(true)
  }; 

  return (
    <div className={cx(styles.container)}>
      <div className={cx(styles.containerItem)}>
        <div className={cx(styles.lcontainer)}>
          <StepField
            options={steps}
            vertical
            checkedStep={checkedStep}
          />
        </div>
      </div>
      <div className={cx(styles.containerItem)}>
        {activeStep === 0 &&
          <PAN1View onNext={handleNext} handleSdata={handleSdata} />
        }
        {activeStep === 1 &&
          <PAN2View onNext={handleNext} handleSdata={handleSdata} pan={sdata.pan} />
        }
        {activeStep === 2 &&
          <PAN3View onNext={handleNext} handleSdata={handleSdata} />
        }
        {activeStep === 3 &&
          <ContactView onNext={handleNext} handleSdata={handleSdata} handlePhone={handlePhone} />
        }
        {activeStep === 4 &&
          <LoginView onNext={handleNext} handleSdata={handleSdata} sdata={sdata} />
        }
        {activeStep === 5 &&
          <BankView onNext={handleNext} handleSdata={handleSdata}/>
        }
        {activeStep === 6 &&
          <BalanceView onNext={handleNext} handleSdata={handleSdata} sdata={sdata} />
        }
        {activeStep === 7 &&
          <AllSetView onComplete={handleComplete} sdata={sdata}/>
        }
      </div>
    </div>
  )
}

export default SignUp;
