import { Box } from '@mui/material';
import { Logo } from '../Atoms/Logo';
import { SearchInput } from '../Atoms/SearchInput';
import { LoginButton } from '../Atoms/Button/LoginButton'; 

export const SearchBar = ({ value, onChange, inputRef, onSubmit }) => (
  <Box 
    component="form"
    sx={{ 
      p: 2, 
      paddingLeft: '0px', 
      paddingRight: '0px', 
      display: 'flex', 
      justifyContent: 'center',
      alignItems: 'center'
    }}
    noValidate
    autoComplete="off"
    onSubmit={onSubmit}
    id="header"
  >
    <Logo />
    <SearchInput 
      id="search-form" 
      label="番組タイトル・出演者で検索" 
      variant="standard" 
      value={value}
      onChange={onChange}
      inputRef={inputRef}
      style={{ 
        width: '80%'
      }}
    />
    <LoginButton style={{
      width: '104px',
      height: '44px',
      lineHeight: '44px',
      borderRadius: '4px',
      fontSize: '16px',
      fontWeight: '700',
      background: '#21abe6',
      color: '#fff',
      whiteSpace: 'nowrap',
      marginLeft: '5px',
    }} />
  </Box>
);