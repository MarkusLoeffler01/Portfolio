import { Formik } from "formik";


const GuestBook = ({color: _, viewHeight: __}: {color?: string, viewHeight?: number}) => {
  return (
    <div>
      <h1>Guestbook</h1>
      <p>Leave a message!</p>

      <Formik
      initialValues={{
        name: "",
        email: "",
        message: "",
        profilePicture: ""
      }}

      validate={values => {
        const errors: {name?: string, email?: string, message?: string} = {};
        if(!values.email) errors.email = "Required";
        else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) errors.email = "Invalid email address";

        return errors;
      }}

      onSubmit={(values, { setSubmitting}) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 400);
      }}
      >
        {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
        }) => (
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                />
                {errors.name && touched.name && errors.name}
                <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                />
                {errors.email && touched.email && errors.email}

                <textarea
                    name="message"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.message}
                />
                {errors.message && touched.message && errors.message}
                
                <button type="submit" disabled={isSubmitting}>
                    Submit
                </button>
            </form>
        )}
      </Formik>
    </div>
  )
}

export default GuestBook;