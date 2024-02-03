import { useEffect, useRef, useState } from "react";
import "./OtpForm.css"
import { MdVerifiedUser } from "react-icons/md";

const OtpInput = ({ length = 4, onOtpSubmit = () => { } }) => {
    const [otp, setOtp] = useState(new Array(length).fill(""));
    const inputRefs = useRef([]);

    useEffect(() => {
        inputRefs.current[0].focus();
    }, []);

    const handleClick = (index) => {
        inputRefs.current[index].setSelectionRange(1, 1);
        if (index > 0 && !otp[index - 1]) {
            inputRefs.current[otp.indexOf("")].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key.match(/^[0-9]$/)) {
            const newOtp = [...otp];
            newOtp[index] = e.key;
            console.log(newOtp);
            setOtp(newOtp);
            if (e.key && index < length - 1 && inputRefs.current[index + 1]) {
                inputRefs.current[index + 1].focus();
            }
        }
        if (e.key === "Backspace") {
            const newOtp = [...otp];
            newOtp[index] = '';
            console.log(newOtp);
            setOtp(newOtp);

            if (index > 0 && inputRefs.current[index - 1]) {
                inputRefs.current[index - 1].focus();
            }
        }
        if (e.key === "ArrowLeft" &&
            index > 0
        ) {
            inputRefs.current[index - 1].focus();
            inputRefs.current[index].setSelectionRange(1, 1);

        }
        if (e.key === "ArrowRight" &&
            index < 4
        ) {
            inputRefs.current[index + 1].focus();
            inputRefs.current[index].setSelectionRange(1, 1);
        }
    };

    return (
        <div className="body">
            <div className="form-container">
                <div className="lable">
                    <MdVerifiedUser className="verify-icon" />
                    <p>Verify OTP</p>
                </div>
                <div className="otp-container">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            className="otp-block"
                            readOnly
                            type="text"
                            ref={(input) => (inputRefs.current[index] = input)}
                            value={digit}
                            maxLength={1}
                            onClick={() => handleClick(index)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                        />
                    ))}

                </div>
                <div>
                    <button className="verify-btn"
                        onClick={onOtpSubmit(otp)}
                    >
                        Verify OTP
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OtpInput;