import React from 'react';
import useForm from './../hook/useForm';
import styled from 'styled-components';
import InputGroup from '../components/shared/forms/InputGroup';
import Button from '../components/ui/buttons/Button';
const Container = styled.div`
  width: 100%;
  padding: 1rem;
  border: 1px solid #e1e1e1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const init = {
  firstName: '',
  lastName: '',
  email: '',
  checked: false,
  password: '',
};

const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'FirstName is required';
  }
  if (!values.lastName) {
    errors.lasttName = 'LastName is required';
  }
  if (!values.email) {
    errors.email = 'email is required';
  }
  if (!values.password) {
    errors.password = 'password is required';
  }
  return errors;
};

const App = () => {
  const {
    formState: state,
    handleBlur,
    handleChange,
    handleFocused,
    handleSubmit,
    clear,
  } = useForm({ init, validate });

  const cb = ({ hasError, values, errors }) => {
    if (hasError) {
      alert('Error' + JSON.stringify(errors));
    } else {
      alert('Succes' + JSON.stringify(values));
    }
  };

  return (
    <div className="root">
      <form onSubmit={(e) => handleSubmit(e, cb)}>
        <Container className="formGroup">
          <InputGroup
            value={state.firstName.value}
            label={'First Name:'}
            name={'firstName'}
            placeholder={'John'}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocused}
            error={state.firstName.error}
          />
          <InputGroup
            value={state.lastName.value}
            label={'Last Name:'}
            name={'lastName'}
            placeholder={'Doe'}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocused}
            error={state.lastName.error}
          />
          <InputGroup
            value={state.email.value}
            label={'Email:'}
            name={'email'}
            placeholder={'johndoe@gmail.com'}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocused}
            error={state.email.error}
          />
          <InputGroup
            value={state.password.value}
            label={'Password:'}
            name={'password'}
            placeholder={'******'}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocused}
            error={state.password.error}
          />
          <Button type="submit">Submit </Button>
        </Container>
      </form>
    </div>
  );
};

export default App;
