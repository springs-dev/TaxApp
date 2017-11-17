const validate = values => {
  const errors = {}
  if (!values.address) {
    errors.address = 'Required'
  }
  if (!values.city & !values.zip) {
    errors.city = 'Zip or city name is required'
    errors.zip = 'Zip or city name is required'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.sex) {
    errors.sex = 'Required'
  }
  if (!values.favoriteColor) {
    errors.favoriteColor = 'Required'
  }
  return errors
}

export default validate
