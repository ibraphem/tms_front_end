import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, email, password, ...rest }) => {
  // console.log(email + "..." + password);
  // const [authToken, setAuthToken] = useState("");

  /*  {
     const aunthenticate = async () => {
    let formData = {
      email: email,
      password: password,
    };
    try {
      const resp = await axios.post(
        "http://tmsapi.db/api/user/login",
        formData
      );
    //  console.log(resp.data.token);
      setAuthToken(resp.data.token);
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };

  useEffect(() => {
    aunthenticate();
  });
  } */

  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.getItem("userToken")) {
          return <Component {...props} />;
        } else {
          return <Redirect to={{ pathname: "/" }} />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
