import React, { useState } from 'react';

export default function Calculator() {
  const [num1, setNum1] = useState<string>('');
  const [num2, setNum2] = useState<string>('');
  const [operation, setOperation] = useState<string>('+');
  const [result, setResult] = useState<number | string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (value: string) => void) => {
    setter(e.target.value);
  };

  const handleOperationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOperation(e.target.value);
  };

  const calculate = () => {
    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);

    if (isNaN(number1) || (operation !== 'sqrt' && operation !== 'sq' && isNaN(number2))) {
      setResult('Invalid Input');
      return;
    }

    switch (operation) {
      case '+':
        setResult(number1 + number2);
        break;
      case '-':
        setResult(number1 - number2);
        break;
      case '*':
        setResult(number1 * number2);
        break;
      case '/':
        if (number2 === 0) {
          setResult('Cannot divide by zero');
        } else {
          setResult(number1 / number2);
        }
        break;
      case 'sq':
        setResult(number1 * number1);
        break;
      case 'sqrt':
        if (number1 < 0) {
          setResult('Invalid input: cannot take square root of negative number');
        } else {
          setResult(Math.sqrt(number1));
        }
        break;
      default:
        setResult('Invalid Operation');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Calculator</h1>

        <div className="mb-4">
          <label htmlFor="num1" className="block text-gray-700 text-sm font-bold mb-2">
            Number 1:
          </label>
          <input
            type="number"
            id="num1"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter number"
            value={num1}
            onChange={(e) => handleInputChange(e, setNum1)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="operation" className="block text-gray-700 text-sm font-bold mb-2">
            Operation:
          </label>
          <select
            id="operation"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={operation}
            onChange={handleOperationChange}
          >
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="*">*</option>
            <option value="/">/</option>
            <option value="sq">Square</option>
            <option value="sqrt">Square Root</option>
          </select>
        </div>

        {operation !== 'sq' && operation !== 'sqrt' && (
          <div className="mb-4">
            <label htmlFor="num2" className="block text-gray-700 text-sm font-bold mb-2">
              Number 2:
            </label>
            <input
              type="number"
              id="num2"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter number"
              value={num2}
              onChange={(e) => handleInputChange(e, setNum2)}
            />
          </div>
        )}

        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={calculate}
          >
            Calculate
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-700 font-bold">Result: {result}</p>
        </div>
      </div>
    </div>
  );
}