import DrowdownTextFormat from "@/components/text/dropDownTextFormat";
import { FontConfig } from "@/components/text/types";
import { Stack, Switch, SxProps, Typography } from "@mui/material";

export interface TextConfig extends FontConfig {
  visibility: boolean;
}

interface InputFontProps {
  label: string;
  value: TextConfig;
  onChange: (
    val: Partial<TextConfig>
  ) => void;
  sx?: SxProps;
}

export default function InputFont({
  label,
  value,
  onChange,
  sx,
}: InputFontProps) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={sx}
    >
      <Typography>{label}</Typography>
      <Stack direction="row">
        <DrowdownTextFormat format={value} onChange={onChange} />
        <Switch
          color="primary"
          checked={value.visibility}
          onChange={(ev, checked) => onChange({ visibility: checked })}
        />
      </Stack>
    </Stack>
  );
}
