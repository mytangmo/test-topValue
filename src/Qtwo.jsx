import React, { useEffect, useState } from "react";
import { Input, Select, Button } from "antd";

export default function Qtwo() {
  const [inputValue, setInputValue] = useState("");
  const [inputTypeValue, setInputTypeValue] = useState("");
  const [result, setResult] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [type, setType] = useState("isPrime");
  const [flexDirection, setFlexDirection] = useState(false);

  useEffect(() => {
    let typingTimer;
    const handleTypingFinished = () => {
      setIsTyping(false);
      console.log("finished typing:", inputTypeValue);
      const floatNum = parseFloat(inputTypeValue);
      if (!isNaN(floatNum)) {
        const roundedValue = Math.max(Math.round(floatNum), 1);
        setInputTypeValue(roundedValue.toString());
        columnTwoSelect(type, roundedValue.toString());
      } else {
        setInputTypeValue("");
      }
    };

    if (isTyping) {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(handleTypingFinished, 1000);
    }

    return () => {
      clearTimeout(typingTimer);
    };
  }, [isTyping, inputTypeValue]);

  const changeFlex = () => {
    setFlexDirection(!flexDirection);
  };
  const columnOneChange = (e) => {
    setInputValue(e.target.value);
    setInputTypeValue("");
  };

  const columnOneFinishType = (e) => {
    setInputValue("");
    setInputTypeValue(e.target.value);
    setIsTyping(true);
  };

  const onBlurInput = () => {
    const floatNum = parseFloat(inputValue);
    if (!isNaN(floatNum)) {
      const roundedValue = Math.max(Math.round(floatNum), 1);
      setInputValue(roundedValue.toString());
      columnTwoSelect(type, roundedValue.toString());
    } else {
      setInputValue("");
    }
  };
  const columnTwoSelect = (type, roundNum) => {
    let roundNumber =
      typeof roundNum == "object"
        ? inputValue !== ""
          ? inputValue
          : inputTypeValue !== ""
          ? inputTypeValue
          : "noValue"
        : roundNum;
    setType(type);
    if (type === "isPrime") {
      let prime = isPrime(roundNumber);
      setResult(roundNumber == "noValue" ? false : prime);
    } else {
      let fibonacci = isFibonacci(roundNumber);
      setResult(roundNumber == "noValue" ? false : fibonacci);
      console.log("fibonacci", fibonacci);
    }
  };
  const isPrime = (prime) => {
    if (prime <= 1) return false;
    if (prime <= 3) return true;
    if (prime % 2 === 0 || prime % 3 === 0) return false;
    for (let i = 5; i * i <= prime; i += 6) {
      if (prime % i === 0 || prime % (i + 2) === 0) return false;
    }
    return true;
  };

  const isFibonacci = (fibo) => {
    let setFibo = fibo !== "" || fibo !== undefined ? fibo : 0;
    const isPerfectSquare = (value) => {
      const sqrt = Math.sqrt(value);
      return sqrt === parseInt(sqrt);
    };
    return (
      isPerfectSquare(5 * setFibo * setFibo + 4) ||
      isPerfectSquare(5 * setFibo * setFibo - 4)
    );
  };

  return (
    <div className="scroll">
      <div className={flexDirection == false ? "columnFlex" : "columnFlex2"}>
        <div className="oneColumn" style={{ padding: "10px" }}>
          {/* อันนี้ในinputสองแบบเพื่อให้ดูว่าทำได้สองแบบนะคะ */}
          <div>input change when onBlur</div>
          <Input
            onChange={columnOneChange}
            placeholder="number"
            value={inputValue}
            onBlur={onBlurInput}
          />
          <br />
          <br />
          <div>input change time pass one second</div>
          <Input
            onChange={columnOneFinishType}
            placeholder="number"
            value={inputTypeValue}
          />
          <br />
          <br />
          {/* ปุ่มนี้จะปรับpage dircttion เมื่อหน้าเท้่กับ 600px เป็นcolumn*/}
          <Button onClick={changeFlex} type="primary">
            Change page direction
          </Button>
        </div>
        <div className="twoColumn">
          <div style={{ padding: "10px" }}>
            <Select
              className="btn-width"
              onSelect={columnTwoSelect}
              defaultValue={[
                {
                  value: "isPrime",
                  label: "isPrime",
                },
              ]}
              options={[
                {
                  value: "isPrime",
                  label: "isPrime",
                },
                {
                  value: "isFibonacci",
                  label: "isFibonacci",
                },
              ]}
            />
          </div>
        </div>
        <div className="threeColumn" style={{ padding: "10px" }}>
          <b>{result == true ? "true" : "false"}</b>
        </div>
      </div>
    </div>
  );
}
