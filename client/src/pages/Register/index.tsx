import { Link } from "react-router-dom";
import Button from "../../components/Button";
import Card from "../../components/Card";
import TextInput from "../../components/TextInput";
import { UserModel } from "../../utils/interface";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

export default function RegisterPage(): JSX.Element {
  const userModel = {
    fullName: "",
    email: "",
    phoneNumber: "",
    username: "",
    password: "",
    confirmPassword: "",
  };

  const SignupSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    phoneNumber: Yup.string()
      .matches(
        /(0|\+98)?([ ]|-|[()]){0,2}9[1|2|3|4]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/,
        "phone number not valid"
      )
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    username: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    password: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), undefined],
      "Passwords must match"
    ),
  });

  const registerUser = async (data: UserModel) => {
    const response = await fetch("http://localhost:3000/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    });

    const result: UserModel = await response.json();
    console.log(result);
  };

  return (
    <div className="container flex justify-between items-center h-screen my-10">
      <Card
        title="Create an account"
        footerTitle="Already have an account?"
        description="Enter your info below to create your account"
        cardFooter={
          <Link
            to="/login"
            className="font-medium text-sm pb-10 text-blue-500 font-poppins hover:underline"
          >
            Login
          </Link>
        }
      >
        <Formik
          initialValues={userModel}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            registerUser(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <TextInput
                model={userModel}
                id="fullName"
                name="fullName"
                label="Full Name"
                error={Boolean(errors.fullName && touched.fullName)}
                errorMessage={
                  errors.fullName && touched.fullName ? (
                    <div>{errors.fullName}</div>
                  ) : null
                }
              />
              <TextInput
                model={userModel}
                id="email"
                name="email"
                label="Email"
                error={Boolean(errors.email && touched.email)}
                errorMessage={
                  errors.email && touched.email ? (
                    <div>{errors.email}</div>
                  ) : null
                }
              />
              <TextInput
                model={userModel}
                id="phoneNumber"
                name="phoneNumber"
                label="Phone Number"
                error={Boolean(errors.phoneNumber && touched.phoneNumber)}
                errorMessage={
                  errors.phoneNumber && touched.phoneNumber ? (
                    <div>{errors.phoneNumber}</div>
                  ) : null
                }
              />
              <TextInput
                model={userModel}
                id="username"
                name="username"
                label="Username"
                error={Boolean(errors.username && touched.username)}
                errorMessage={
                  errors.username && touched.username ? (
                    <div>{errors.username}</div>
                  ) : null
                }
              />
              <TextInput
                model={userModel}
                id="password"
                name="password"
                label="Password"
                error={Boolean(errors.password && touched.password)}
                errorMessage={
                  errors.password && touched.password ? (
                    <div>{errors.password}</div>
                  ) : null
                }
              />
              <TextInput
                model={userModel}
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                error={Boolean(
                  errors.confirmPassword && touched.confirmPassword
                )}
                errorMessage={
                  errors.confirmPassword && touched.confirmPassword ? (
                    <div>{errors.confirmPassword}</div>
                  ) : null
                }
              />
              <Button variant="success" title="Register" />
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
}
