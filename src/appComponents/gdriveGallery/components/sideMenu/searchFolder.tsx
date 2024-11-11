import {
  Autocomplete,
  CircularProgress,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { debounce } from "ts-dom-libs/lib/debounce";
import { searchFolderByNameOrId } from "../../functions/search";

interface StateFolderProps {
  dir: gapi.client.drive.File | null;
  setDir: Dispatch<SetStateAction<gapi.client.drive.File | null>>;
}

export default function SearchFolder({ dir, setDir }: StateFolderProps) {
  const [options, setOptions] = useState<readonly gapi.client.drive.File[]>([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [helperText, setHelperText] = useState(" ");

  const request = useMemo(
    () =>
      debounce(async (v: string) => {
        console.log("input", v);
        if (v === "") {
          setOptions([]);
          return;
        }

        setLoading(true);
        const resp = await searchFolderByNameOrId(v);
        setLoading(false);

        console.log("resp", resp);

        if ("error" in resp) {
          setHelperText(resp.message);
          setOptions([]);
          return;
        }

        setOptions(resp);
      }, 400),
    []
  );

  useEffect(() => {
    if (inputValue === dir?.name) return;
    request(inputValue);
  }, [inputValue, request, dir]);

  return (
    <Autocomplete
      filterOptions={(x) => x}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name as string}
      options={options}
      loading={loading}
      inputValue={inputValue}
      onInputChange={(e, ivalue) => setInputValue(ivalue)}
      value={dir}
      onChange={(ev, value) => {
        setHelperText(value === null ? "Not selected" : (value.id as string));
        setDir(value);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          fullWidth
          label="Search by ID / Link / Name"
          helperText={helperText}
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            },
          }}
        />
      )}
      renderOption={(props, option) => {
        return (
          <ListItem {...props} key={option.id}>
            <ListItemText primary={option.name} secondary={option.id} />
          </ListItem>
        );
      }}
    />
  );
}
