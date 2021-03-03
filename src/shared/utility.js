export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

const checkValidity = (value, rules) => {
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.required) { 
    isValid = value.trim() !== '' && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }

  return isValid;
};

export const changeHandler = (e, form) => {
  const updateForm = updateObject(form, {
    [e.target.name]: updateObject(form[e.target.name], {
      value: e.target.value,
      touched: true,
      valid: checkValidity(e.target.value, form[e.target.name].validation),
    }),
  });

  let formValid = true;
  for (const key in updateForm) {
    formValid = updateForm[key].valid && formValid;
  }

  return [updateForm, formValid];
};
