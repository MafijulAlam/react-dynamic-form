import styled from 'styled-components';
const fontSize = {
  sm: '0.8rem',
  md: '1rem',
  lg: '1.2rem',
};
const lineHeight = {
  sm: 1.2,
  md: 1.4,
  lg: 1.6,
};
const Text = styled.p`
  font-family: 'Times New Roman', Times, serif;
  font-size: ${(props) => fontSize[props.size] ?? '1.2rem'};
  line-height: ${(props) => lineHeight[props.line] ?? 1.3};
  color: #555;
`;

export default Text;
