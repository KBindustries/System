import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import ImageLight from "../assets/img/login-office.jpeg";
import ImageDark from "../assets/img/login-office-dark.jpeg";
import { Label, Input, Button } from "@windmill/react-ui";
import axios from "axios";

function Login() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: "",
    role: "admin",
    password: "",
    specialty: "all",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "role") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    // Perform form submission actions here (e.g., make API requests)
    try {
      await axios
        .post("http://localhost:4000/auth/users/login", formData)
        .then((response) => {
          console.log(response.status);
          if (response.status === 200) {
            console.log("login success");
            const user = response.data;
            localStorage.setItem("user", JSON.stringify(user));
            history.push("/app");
          } else {
            console.log("login failure");
          }
        });
    } catch (error) {
      alert(error);
    }

    // Clear the form inputs after submission
    // setFormData({ email: '', role: 'admin', password: '' , specialty:'all'});
  };
  useEffect(() => {
    const userInfo = localStorage.getItem("user");
    const info = JSON.parse(userInfo);
    const token = info?.accessToken;

    if (token) {
      // Perform token verification logic here
      localStorage.removeItem("user");
      // Continue with other necessary actions
    }
  }, [history]);
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Login
              </h1>
              <Label>
                <span>Email</span>
                <Input
                  className="mt-1"
                  type="email"
                  placeholder="john@doe.com"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Label>

              <Label className="mt-4">
                <span>Password</span>
                <Input
                  className="mt-1"
                  type="password"
                  placeholder="***************"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Label>
              <label
                for="role"
                class="block m-2 text-sm font-medium text-gray-500 "
              >
                Select a role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                class="bg-gray-50 border border-gray-500 text-gray-500 text-sm rounded-lg block w-full p-4 dark:bg-gray-700  placeholder-gray-400  "
              >
                <option selected disabled>
                  Choose a Role
                </option>
                <option value="admin">Admin</option>
                <option value="security">Security</option>
                <option value="delegate">Delegate</option>
              </select>

              <Button
                className="mt-4"
                onClick={handleSubmit}
                // block tag={Link}
                // to="/app"
              >
                Log in
              </Button>

              <hr className="my-8" />

              <p className="mt-1">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/create-account"
                >
                  Create account
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Login;
