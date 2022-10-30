import { useState } from 'react';
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
  title: '',
  bio: '',
  skills: '',
};
function App() {
  const [values, setValues] = useState({ ...init });
  const [errors, setErrors] = useState({ ...init });
  const [focuses, setFocuses] = useState({
    title: false,
    bio: false,
    skills: false,
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    const key = e.target.name;
    const { errors } = checkValidity(values);
    if (!errors[key]) {
      setErrors((prev) => ({
        ...prev,
        [key]: '',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { isValid, errors } = checkValidity(values);
    if (isValid) {
      console.log(values);
      setErrors({ ...errors });
    } else {
      setErrors({ ...errors });
    }
    setValues({ ...init });
  };

  const handleFocues = (e) => {
    setFocuses((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleBlur = (e) => {
    const key = e.target.name;
    const { errors } = checkValidity(values);
    if (errors[key] && focuses[key]) {
      setErrors((prev) => ({
        ...prev,
        [key]: errors[key],
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [key]: '',
      }));
    }
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
            value={values.title}
            label={'Title:'}
            name={'title'}
            placeholder={'Software Engineer'}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocues}
            error={errors.title}
          />
          <InputGroup
            value={values.bio}
            label={'Bio:'}
            name={'bio'}
            placeholder={'I am a Software Engineer.'}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocues}
            error={errors.bio}
          />
          <InputGroup
            value={values.skills}
            label={'Skills:'}
            name={'skills'}
            placeholder={'JavaScript'}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocues}
            error={errors.skills}
          />
        </Container>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default App;
