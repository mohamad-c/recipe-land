import Button from "../../components/Button";
import Card from "../../components/Card";
import TextInput from "../../components/TextInput";
import { UserModel } from "../../utils/interface";

export default function RegisterPage(): JSX.Element {
  const userModel = {
    fullName: "",
    email: "",
    phoneNumber: "",
    username: "",
    password: "",
    confirmPassword: "",
  };

  const registerUser = async () => {
    const response = await fetch("http://localhost:3000/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(userModel),
    });

    const result: UserModel = await response.json();
    console.log(result);
  };

  return (
    <div className="flex justify-between items-center h-screen">
      <Card
        title="Create an account"
        description="Enter your info below to create your account"
      >
        <TextInput model={userModel} id="fullName" label="Full Name" />
        <TextInput model={userModel} id="email" label="Email" />
        <TextInput model={userModel} id="phoneNumber" label="Phone Number" />
        <TextInput model={userModel} id="username" label="Username" />
        <TextInput model={userModel} id="password" label="Password" />
        <TextInput
          model={userModel}
          id="confirmPassword"
          label="Confirm Password"
        />
        <Button variant="success" title="submit" onClick={registerUser} />
      </Card>
    </div>
  );
}
