import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input: React.FC<InputProps> = ({ error, ...props }) => (
  <div>
    <input
      {...props}
      className="outline w-full p-3 rounded-lg focus:outline-neutral-500 transition-all duration-200 ease-in-out"
    />
    {error && <p className="text-red-700 px-3 text-sm mt-1">{error}</p>}
  </div>
);

export default Input;
