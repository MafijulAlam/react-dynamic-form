import { useState } from 'react';
import styled from 'styled-components';
import InputGroup from '../components/shared/forms/InputGroup';
import Button from '../components/ui/buttons/Button';
import { deepClone } from '../utils/object-utils';
const Container = styled.div`
  width: 100%;
  padding: 1rem;
  border: 1px solid #e1e1e1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const init = {
  title: {
    value: '',
    error: '',
    focuses: false,
  },
  bio: {
    value: '',
    error: '',
    focuses: false,
  },
  skills: {
    value: '',
    error: '',
    focuses: false,
  },
};
function App() {
  const [state, setState] = useState({ ...init });

  const mapStateToValue = (state) => {
    return Object.keys(state).reduce((acc, cur) => {
      acc[cur] = state[cur].value;
      return acc;
    }, {});
  };

  const handleChange = (e) => {
    const { name: key, value } = e.target;
    const oldState = deepClone(state);
    const values = mapStateToValue(oldState);
    const { errors } = checkValidity(values);
    oldState[key].value = value;
    if (oldState[key].focuses && errors[key]) {
      oldState[key].error = errors[key];
    } else {
      oldState[key].error = '';
    }
    setState(oldState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = mapStateToValue(state);
    const { isValid, errors } = checkValidity(values);

    if (isValid) {
      console.log(state);
    } else {
      const oldState = deepClone(state);
      Object.keys(errors).forEach((key) => {
        oldState[key].error = errors[key];
      });
      setState(oldState);
    }
    // setState({ ...init });
  };

  const handleFocues = (e) => {
    const { name: key } = e.target;
    const oldState = deepClone(state);
    oldState[key].focuses = true;
    setState(oldState);
  };

  const handleBlur = (e) => {
    const key = e.target.name;
    const values = mapStateToValue(state);

    const { errors } = checkValidity(values);
    const oldState = deepClone(state);
    if (oldState[key].focuses && errors[key]) {
      oldState[key].error = errors[key];
    } else {
      oldState[key].error = '';
    }
    setState(oldState);
  };

  const checkValidity = (values) => {
    const errors = {};
    const { title, bio, skills } = values;
    if (!title) {
      errors.title = 'Invalid title';
    }
    if (!bio) {
      errors.bio = 'Invalid bio';
    }
    if (!skills) {
      errors.skills = 'Invalid skills';
    }
    return {
      errors,
      isValid: Object.keys(errors).length === 0,
    };
  };

  return (
    <div className="root">
      <form onSubmit={handleSubmit}>
        <Container className="formGroup">
          <InputGroup
            value={state.title.value}
            label={'Title:'}
            name={'title'}
            placeholder={'Software Engineer'}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocues}
            error={state.title.error}
          />
          <InputGroup
            value={state.bio.value}
            label={'Bio:'}
            name={'bio'}
            placeholder={'I am a Software Engineer.'}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocues}
            error={state.bio.error}
          />
          <InputGroup
            value={state.skills.value}
            label={'Skills:'}
            name={'skills'}
            placeholder={'JavaScript'}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocues}
            error={state.skills.error}
          />
        </Container>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default App;
