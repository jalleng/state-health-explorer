import { type TooltipContentProps } from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

type CustomTooltipProps = TooltipContentProps<ValueType, NameType> & {
  selectedCounty: string;
};

export default function CustomTooltip(props: CustomTooltipProps) {
  const { active, payload, label, selectedCounty } = props;
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e0e0e0",
        borderRadius: 6,
        padding: "10px 14px",
        fontSize: 13,
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 4, color: "#1a1a1a" }}>
        {label}
      </div>
      <div style={{ color: "#1a3a5c" }}>
        {payload[0].value}% crude prevalence
      </div>
      <div style={{ color: "#888", fontSize: 12, marginTop: 2 }}>
        {selectedCounty === "All Counties"
          ? "Statewide average"
          : `${selectedCounty} County`}
      </div>
    </div>
  );
}
