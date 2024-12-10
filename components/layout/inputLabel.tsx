import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  id: string;
  label?: string;
  inputType?: "text" | "email";
  placeholder: string;
  disabled?: boolean;
};
export function InputLabel(props: Props) {
  const { inputType = "text", disabled = false } = props;

  return (
    <div className="grid w-full items-center gap-1.5 mb-2">
      {props.label !== undefined && (
        <Label htmlFor="email">{props.label}</Label>
      )}
      <Input
        type={inputType}
        id={props.id}
        placeholder={props.placeholder}
        disabled={disabled}
      />
    </div>
  );
}
