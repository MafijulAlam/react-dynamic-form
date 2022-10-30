import styled from 'styled-components';
import Textinput from '../../ui/inputs/Textinput';
import Label from '../../ui/labels/Label';

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.9rem;
`;

const InputGroup = ({
  label,
  name,
  placeholder,
  value,
  onBlur,
  onChange,
  onFocus,
  error,
}) => {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Textinput
        name={name}
        id={name}
        placeholder={placeholder ?? ''}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        error={error}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

export default InputGroup;
