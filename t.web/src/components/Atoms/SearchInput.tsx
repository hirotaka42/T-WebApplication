import { ChangeEvent, Ref } from 'react';
import TextField from '@mui/material/TextField';

interface SearchInputProps {
  id: string;
  label: string;
  variant: 'standard' | 'filled' | 'outlined';
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  inputRef: Ref<HTMLInputElement>;
  style: React.CSSProperties;
}

export const SearchInput: React.FC<SearchInputProps> = ({ id, label, variant, value, onChange, inputRef, style }) => (
  <TextField 
    id={id} 
    label={label} 
    variant={variant} 
    value={value}
    onChange={onChange}
    inputRef={inputRef}
    style={style}
  />
);