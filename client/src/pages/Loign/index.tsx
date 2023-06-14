import { Form, Formik } from "formik";
import Button from "../../components/Button";
import Card from "../../components/Card";
import * as Yup from "yup";
import TextInput from "../../components/TextInput";
import { UserModelLogin } from "../../utils/interface";
import { Link } from "react-router-dom";

export default function LoginPage(): JSX.Element {
  const userModel = {
    username: "",
    password: "",
  };

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    password: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });

  const registerUser = async (data: UserModelLogin) => {
    const response = await fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    });

    const result: UserModelLogin = await response.json();
    console.log(result);
  };

  return (
    <div className="container flex justify-between items-center h-screen my-10">
      <Card
        title="Login to your acount"
        footerTitle="Don't have an account?"
        description="Enter your info below to login"
        cardFooter={
          <Link
            to="/register"
            className="font-medium text-sm pb-10 text-blue-500 font-poppins hover:underline"
          >
            Register
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
              <Button variant="primary" title="Login" />
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
}
