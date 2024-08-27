import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

// components

// ----------------------------------------------------------------------
const Register = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });
  const [showPassword, setShowPassword] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL;

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${apiUrl}/api/auth/register`, credentials);
      navigate("/");
    } catch (err) {}
  };
  return (
    <>
      <Stack spacing={3}>
        <TextField
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
        />
        <TextField
          type="text"
          placeholder="email address"
          id="email"
          onChange={handleChange}
        />
        <TextField
          type="text"
          placeholder="Phone Number"
          id="phone"
          onChange={handleChange}
        />

        <TextField
          label="Password"
          onChange={handleChange}
          type="password"
          placeholder="password"
          id="password"
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      ></Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleClick}
        style={{ backgroundColor: "red" }}
      >
        Create an account
      </LoadingButton>
    </>
  );
};
export default Register;
