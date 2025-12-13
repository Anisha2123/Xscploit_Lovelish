import React from "react";

interface Props {
  label: string;
  type?: string;
  value: string;
  setValue: (v: string) => void;
}

const AuthInput: React.FC<Props> = ({ label, type = "text", value, setValue }) => {
  return (
    <div className="mb-4">
      <label className="text-[#00ff9d] text-sm font-mono">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full mt-1 px-3 py-2 bg-[#0d1218] border border-[#00ff9d44] 
                   text-white rounded-md outline-none focus:border-[#00ff9d] 
                   transition-all font-mono"
      />
    </div>
  );
};

export default AuthInput;
