import React, { useState } from "react";
import cx from "classnames";
import Button from "../Button/Button";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import PropTypes from 'prop-types';
import OTPInput from "../OTPInput/OTPInput";
import styles from "./SignUp.module.scss";

function PAN2View({
    children,
    theme,
    className,
    onNext,
    pan,
    ...rest
}) {
    const [otp, setOTP] = useState("");
    const [isSubmit, setIsSubmit] = useState(false)

    const handleChange = (e) => {
        setOTP(e)
        if (e.length == 4)
            setIsSubmit(true)
    }

    const handleContinue = () => {
        if (isSubmit)
            onNext()
    }

    return (
        <div
            className={cx(styles.rcontainer)}
            {...rest}
        >
            <p className={cx(styles.rtitle)}>PAN Verification</p>
            <p className={cx("mt-8 mb-4", styles.step2TopP)}>This is the information associated with your PAN <b>{pan}</b></p>
            <div className={cx(styles.step2Note)}>
                <p className={cx(styles.step2NoteP)}>SHIVAM TRAVELS PVT LTD</p>
                <p className={cx(styles.step2NoteP)}>13/242, RAJESHWARI AVENUE </p>
                <p className={cx(styles.step2NoteP)}>NEAR SBI BANK</p>
                <p className={cx(styles.step2NoteP)}>TILAK ROAD, HYDERABAD </p>
                <p className={cx(styles.step2NoteP)}>Andhra Pradesh 500082 </p>
            </div>
            <p className={cx("mt-8 mb-4 font-medium", styles.step2TopP)}>A verification OTP has been sent to <span className="text-orange-600">+91 XXXXX X9762</span></p>
            <p className={cx("mt-8 mb-4", styles.rdesc)}>Please confirm you are authorized to use this PAN by entering the OTP</p>
            <div className={cx(styles.otpWidth)}>
                <OTPInput
                    name="otp"
                    onChange={(otp) => handleChange(otp)}
                    // error={error}
                    fields={4}
                />
            </div>
            {isSubmit ?
                <Button
                    className={cx(styles.rbtnEnable)}
                    onClick={handleContinue}
                >
                    Continue
                </Button>
                :
                <Button
                    className={cx(styles.rbtnDisable)}
                    disabled
                >
                    Continue
                </Button>
            }
        </div>
    )
}

PAN2View.propTypes = {
    className: PropTypes.string,
    onNext: PropTypes.func
};

export default PAN2View;
