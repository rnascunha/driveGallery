import { Button, ButtonProps, SxProps } from "@mui/material";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import { forwardRef, ReactNode } from "react";

interface ColorButtonProps extends Omit<ButtonProps, "onChange"> {
  value: string;
  onChange: (color: string) => void;
  icon?: ReactNode;
  // sx?: SxProps;
}

const ColorButton = forwardRef<HTMLButtonElement, ColorButtonProps>(
  (props, ref) => {
    const { sx, onChange, value, ...others } = props;
    return (
      <Button
        ref={ref}
        {...others}
        value="color"
        aria-label="color"
        sx={{
          p: 0,
          minWidth: 0,
          border: "1px solid rgba(0, 0, 0, 0.2)",
          bgcolor: value,
          ...sx,
        }}
      >
        <label
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          {props.icon ?? (
            <FormatColorTextIcon
              sx={{
                color: "#000",
                width: "40px",
              }}
            />
          )}
          <input
            type="color"
            style={{
              width: 0,
              height: 0,
              border: "none",
            }}
            value={props.value}
            onChange={(ev) => onChange(ev.target.value)}
          />
        </label>
      </Button>
    );
  }
);

ColorButton.displayName = "ColorButton";
export default ColorButton;
