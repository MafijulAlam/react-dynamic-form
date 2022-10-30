import { useState } from 'react';
import { deepClone } from '../utils/object-utils';
import { isObjValid } from './../utils/object-utils';

const useForm = ({ init, validate }) => {
  const [state, setState] = useState(mapValuesToState(init));

  const handleChange = (e) => {
    const { name: key, value, type, checked } = e.target;

    const oldState = deepClone(state);

    if (type === 'checkbox') {
      oldState[key].value = checked;
    } else {
      oldState[key].value = value;
    }

    const { errors } = getErrors();

    if (oldState[key].touched && errors[key]) {
      oldState[key].error = errors[key];
    } else {
      oldState[key].error = '';
    }
    setState(oldState);
  };

  const handleSubmit = (e, cb) => {
    e.preventDefault();
    const { values, errors, hasError } = getErrors();
    cb({
      values,
      errors,
      hasError,
      touched: mapStateToKeys(state, 'value'),
      focused: mapStateToKeys(state, 'value'),
    });
  };

  const handleFocused = (e) => {
    const { name: key } = e.target;

    const oldState = deepClone(state);
    oldState[key].focused = true;

    if (!oldState[key].touched) {
      oldState[key].touched = true;
    }
    setState(oldState);
  };

  const handleBlur = (e) => {
    const key = e.target.name;

    const { errors } = getErrors();

    const oldState = deepClone(state);

    if (oldState[key].touched && errors[key]) {
      oldState[key].error = errors[key];
    } else {
      oldState[key].error = '';
    }
    oldState[key].focused = false;
    setState(oldState);
  };

  const clear = () => {
    const clearState = mapValuesToState(init, true);
    setState(clearState);
  };

  const getErrors = () => {
    let hasError = null,
      errors = null;
    const values = mapStateToKeys(state, 'value');

    if (typeof validate === 'boolean') {
      hasError = validate;
      errors = mapStateToKeys(state, 'error');
    } else if (typeof validate === 'function') {
      const errorsFormCb = validate(values);
      hasError = !isObjValid(errorsFormCb);
      errors = errorsFormCb;
    } else {
      throw new Error('validate property must be boolen or function');
    }
    return {
      values,
      errors,
      hasError,
    };
  };

  return {
    formState: state,
    handleChange,
    handleBlur,
    handleSubmit,
    handleFocused,
    clear,
  };
};

export default useForm;

//helper function
const mapValuesToState = (values, shouldClear) => {
  return Object.keys(values).reduce((acc, cur) => {
    acc[cur] = {
      value: shouldClear ? '' : values[cur],
      error: '',
      focused: false,
      touched: false,
    };
    return acc;
  }, {});
};

const mapStateToKeys = (state) => {
  return Object.keys(state).reduce((acc, cur) => {
    acc[cur] = state[cur].value;
    return acc;
  }, {});
};
