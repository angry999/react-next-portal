import React, { useState } from "react";
import cx from "classnames";
import styles from "./StepField.module.scss";
import {
    Check as CheckIcon
} from 'react-feather';

const StepField = React.forwardRef(
    (
        { options, horizontal, checkedStep }
    ) => {

        return (
            <div className="mt-auto mb-auto">
                <div className={cx("flex", !horizontal && "flex-col")}>
                    {options.map(({ value, label, checked, focuse }) => (
                        <span key={value}>
                            <label
                                className={cx(styles.radioLabel, horizontal ? "pr-6" : "pb-6")}
                            >{value < checkedStep ?
                                <>
                                    <span className={styles.radioInput}>
                                        <CheckIcon className={styles.checkedStep} />
                                    </span>
                                    <span className={styles.radioLabelChecked}>{label}</span>
                                </>
                                :
                                <>
                                    <span className={styles.radioInput}>
                                        <span className={value == checkedStep ? styles.radioControl : styles.radioControlDisabled} />
                                    </span>
                                    <span className={(value == checkedStep ? styles.radioLabelUnchecked : styles.radioLabelDisabled)}>{label}</span>

                                </>
                                }
                            </label>
                        </span>
                    ))}
                </div>
            </div>
        );
    }
);

export default StepField;
