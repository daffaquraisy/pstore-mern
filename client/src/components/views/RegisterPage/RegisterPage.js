import React from "react";
import moment from "moment";
import { Formik } from "formik";
import * as Yup from "yup";
import { registerUser } from "../../../_actions/user_actions";
import { useDispatch } from "react-redux";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function RegisterPage(props) {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        email: "",
        address: "",
        name: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("Name is required"),
        address: Yup.string().required("Address Name is required"),
        email: Yup.string()
          .email("Email is invalid")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Confirm Password is required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password,
            name: values.name,
            address: values.address,
            image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`,
          };

          dispatch(registerUser(dataToSubmit)).then((response) => {
            if (response.payload.success) {
              props.history.push("/login");
            } else {
              alert(response.payload.err.errmsg);
            }
          });

          setSubmitting(false);
        }, 500);
      }}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;
        return (
          <div className="container">
            <h3 className="text-center">Register</h3>
            <div className="row d-flex justify-content-center">
              <div className="col-md-4">
                <form {...formItemLayout} onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label for="name">Name</label>
                    <input
                      type="text"
                      className={
                        errors.name && touched.name
                          ? "form-control is-valid"
                          : "form-control"
                      }
                      id="name"
                      placeholder="Name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    {errors.name && touched.name && (
                      <div className="text-danger">{errors.name}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label for="">Email address</label>
                    <input
                      type="email"
                      className={
                        errors.email && touched.email
                          ? "form-control is-valid"
                          : "form-control"
                      }
                      id="email"
                      placeholder="Email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    {errors.email && touched.email && (
                      <div className="text-danger">{errors.email}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label for="">Address</label>
                    <input
                      type="text"
                      className={
                        errors.address && touched.address
                          ? "form-control is-valid"
                          : "form-control"
                      }
                      id="address"
                      placeholder="Address"
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    {errors.address && touched.address && (
                      <div className="text-danger">{errors.address}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.password && touched.password
                          ? "form-control is-valid"
                          : "form-control"
                      }
                      placeholder="Password"
                    />
                    {errors.password && touched.password && (
                      <div className="text-danger">{errors.password}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label for="exampleInputPassword1">Confirm Password</label>
                    <input
                      type="password"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.confirmPassword && touched.confirmPassword
                          ? "form-control is-valid"
                          : "form-control"
                      }
                      id="confirmPassword"
                      placeholder="Password"
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                      <div className="text-danger">
                        {errors.confirmPassword}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleSubmit}
                    type="primary"
                    disabled={isSubmitting}
                    className="btn my-btn"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        );
      }}
    </Formik>
  );
}

export default RegisterPage;
