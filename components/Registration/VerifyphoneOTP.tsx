import React, { useEffect, useState } from "react";

interface VerifyOTPFormProps {
  nextStep: () => void;
  prevStep: () => void;
  updateMobileNumber: boolean;
  handleUpdateMobileNumber: () => void;
}

const VerifyPhoneOTP = ({
  nextStep,
  prevStep,
  handleUpdateMobileNumber,
}: VerifyOTPFormProps) => {
  const [otp, setOtp] = useState("");
  const [otpValues, setOtpValues] = useState(new Array(6).fill(""));
  const [focusIndex, setFocusIndex] = useState(0);
  const noOfInputs = 6;

  const handlePaste = (event: React.ClipboardEvent, index: number) => {
    event.preventDefault();
    const pastedValue = event.clipboardData.getData("text");
    const otpValuesCopy = [...otpValues];
    otpValuesCopy[index] = pastedValue;
    setOtpValues(otpValuesCopy);
  };

  const handleKeyUp = (event: React.KeyboardEvent, index: number) => {
    if (event.key === "Backspace") {
      if (index > 0) {
        setFocusIndex(index - 1);
      }
    } else if (event.key === "ArrowRight") {
      if (index < noOfInputs - 1) {
        setFocusIndex(index + 1);
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === "Backspace") {
      event.preventDefault();
      const otpValuesCopy = [...otpValues];
      otpValuesCopy[index] = "";
      setOtpValues(otpValuesCopy);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.target.value.length === 1) {
      event.preventDefault();
    }
  };

  useEffect(() => {
    const inputs = document.querySelectorAll(".otp-input");
    if (inputs[focusIndex]) {
      inputs[focusIndex].focus();
    }
  }, [focusIndex]);

  const handleSubmit = () => {
    nextStep();
  };

  const handleUpdateNumber = () => {
    handleUpdateMobileNumber();
  };

  return (
    <div className="flex flex-col items-center text-center justify-center min-h-screen">
      <div className="flex flex-col px-8 py-6">
        <h1 className="text-[80px] font-extrabold sm:text-3xl sm:font-semibold mb-4">
          Verify mobile number
        </h1>
        <p className="mb-2 text-base leading-6 sm:text-md">
          We have sent an OTP to the registered mobile number
        </p>
        <span className="font-medium mb-4">
          {" "}
          9843763333.{" "}
          <span
            className="font-medium text-primary-600 cursor-pointer"
            onClick={handleUpdateNumber}
          >
            Change
          </span>
        </span>
        <div className="flex gap-4 mb-6">
          {otpValues.map((value, index) => (
            <input
              key={index}
              type="tel"
              className={`otp-input rounded-lg w-14 h-14 sm:w-10 sm:h-10 outline-none text-center border focus:border-primary`}
              value={value}
              onChange={(event) => {
                const otpValuesCopy = [...otpValues];
                otpValuesCopy[index] = event.target.value;
                setOtpValues(otpValuesCopy);
                if (index < noOfInputs - 1) {
                  setFocusIndex(index + 1);
                }
              }}
              onPaste={(event) => handlePaste(event, index)}
              onKeyUp={(event) => handleKeyUp(event, index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              onKeyPress={handleKeyPress}
              max="9"
              min="0"
              autoComplete="off"
            />
          ))}
        </div>

        <div className=" flex items-center justify-center">
          <p className="text-center">
            Haven't received OTP?{" "}
            <span className="text-center text-primary-600 cursor-pointer">
              {" "}
              Resend OTP
            </span>{" "}
          </p>
        </div>
        <div className="flex gap-4 mt-4">
          <button
            className="bg-primary-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline w-full"
            onClick={handleSubmit}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyPhoneOTP;