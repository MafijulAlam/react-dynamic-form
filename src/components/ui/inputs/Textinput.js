import styled from 'styled-components';

const Textinput = styled.input`
  width: 100%;
  font-size: 1rem;
  background: transparent;
  padding: 0.5rem 0.5rem;
  outline: none;
  border-radius: 3px;
  border: ${(props) =>
    props.error ? '1px solid #ff0000' : '1px solid #e2e2e2'};
  color: #222;
  &:focus {
    border: 2px solid skyblue;
  }
`;

export default Textinput;
