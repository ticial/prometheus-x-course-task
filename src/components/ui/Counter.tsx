type Props = {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
};

const CounterButton = ({
  text,
  disabled,
  onClick,
}: {
  text: string;
  disabled: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="min-w-fit w-8 bg-slate-500 text-white hover:bg-slate-500/80 disabled:bg-gray-300 active:bg-slate-400 transition-colors">
      {text}
    </button>
  );
};

const Counter = ({ min, max, value, onChange }: Props) => {
  const setAmountChecked = (newValue: number) => {
    if (newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };
  const blurHandle = () => {
    if (value < min) {
      onChange(min);
    } else if (value > max) {
      onChange(max);
    } else {
      onChange(value);
    }
  };
  const formatNum = (value: number) => {
    const numStr = String(value);
    if (numStr.length > 1) return numStr.replace(/^0+/, "");
    else return numStr;
  };
  return (
    <div className="counter overflow-hidden rounded-lg flex h-8 font-semibold ring-1 ring-gray-300 w-fit">
      <CounterButton
        disabled={min >= value}
        text="-"
        onClick={() => setAmountChecked(value - 1)}
      />
      <input
        type="number"
        className="outline-none focus:outline-none text-center w-12 bg-white font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700"
        name="custom-input-number"
        onChange={(e) => onChange(Number(e.target.value))}
        // value={String(value).replace(/^0+/, "")}
        value={formatNum(value)}
        onBlur={blurHandle}
      />
      <CounterButton
        disabled={max <= value}
        text="+"
        onClick={() => setAmountChecked(value + 1)}
      />
    </div>
  );
};

export default Counter;
