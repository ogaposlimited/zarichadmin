import { Helmet } from "react-helmet-async";
// @mui
import { styled } from "@mui/material/styles";
import { Container, Typography, Divider, Stack, Button } from "@mui/material";
// hooks
import useResponsive from "../hooks/useResponsive";
// components
import Logo from "../components/logo";
import Iconify from "../components/iconify";
// sections
import { LoginForm } from "../sections/auth/login";
import logs from "./on.png";
import { Link } from "react-router-dom";
import Register from "src/sections/auth/Register";

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const StyledSection = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: 480,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function RegisterPage() {
  const mdUp = useResponsive("up", "md");

  return (
    <>
      <Helmet>
        <title> Register | Safe Oil </title>
      </Helmet>

      <StyledRoot>
        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              <img
                src={logs}
                alt="logo"
                style={{
                  width: "300px",
                }}
              />
            </Typography>
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign up to Safe Oil
            </Typography>

            <Register />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
