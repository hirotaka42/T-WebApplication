import React, { ChangeEvent, Ref, FormEvent } from 'react';
import { SearchBar } from '../molecules/SearchBar';

interface HeaderProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  inputRef: Ref<HTMLInputElement>;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export const Header: React.FC<HeaderProps> = ({ value, onChange, inputRef, onSubmit }) => (
  <>
    <SearchBar 
      value={value} 
      onChange={onChange} 
      inputRef={inputRef}
      onSubmit={onSubmit}
    />
  </>
);