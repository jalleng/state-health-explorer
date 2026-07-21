import { type TooltipContentProps } from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

type CustomTooltipProps = TooltipContentProps<ValueType, NameType> & {
  valueLabel?: string;
  bottomText?: string;
};

export default function CustomTooltip(props: CustomTooltipProps) {
  const { active, payload, label, bottomText = "", valueLabel = "" } = props;
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-zinc-200 rounded-md px-[14px] py-[10px] text-[13px]">
      <div className="font-bold mb-1 text-zinc-900">{label}</div>
      <div className="text-[#1a3a5c]">
        {payload[0].value}
        {valueLabel}
      </div>
      <div className="text-zinc-400 text-xs mt-0.5">{bottomText}</div>
    </div>
  );
}
