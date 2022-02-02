import React, { useState } from "react";
import SignUpForm from "components/login/SignUpForm";
import LoginForm from "components/login/LoginForm";
import Image from "next/image";
import {
  Button,
  Drawer,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { Box } from "@mui/system";
import styled from "styled-components";
import logoImg from "public/imgs/chellogo.png";

const CustomTypo = styled(Typography)`
  color: #001487;
  font-weight: 600;
  margin: 20px 0;
`;

const LoginDrawer: React.FC = () => {
  const theme = useTheme();
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginState, setLoginState] = useState(true);
  const downLg = useMediaQuery(theme.breakpoints.down("lg"));
  const downMd = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setLoginOpen(open);
    };

  return (
    <>
      <Button onClick={toggleDrawer(true)} sx={{ color: '#fff', marginLeft: '6px' }}>log in</Button>
      <Drawer
        anchor={'right'}
        open={loginOpen}
        onClose={toggleDrawer(false)}
        sx={{ zIndex: 10 }}
      >
        <Box
          sx={
            downMd ? { width: '100vw', padding: '80px 20px' } 
            : downLg ? { width: '100vw', padding: '80px 20px' } 
            : { width: 640, padding: '80px 20px' }}
          role="presentation"
        >
          <div style={{ textAlign: 'end', marginBottom: '30px' }}>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Image src={logoImg} alt="chelsea" />
            { loginState ? (
                <>
                  {/** LOG IN */}
                    <CustomTypo variant="h4">Log In With Email</CustomTypo>
                    <LoginForm />
                </>
              ) : (
                <>
                  {/** JOIN */}
                    <CustomTypo variant="h4">Sign Up With Email</CustomTypo>
                    <SignUpForm />
                </>
              )
            }
            <Typography>
              {loginState ? "Don't have an account yet?" : "Already with us?"}
              {' '}
              <span 
                onClick={() => setLoginState(prev => !prev)} 
                style={{ cursor: "pointer", textDecoration: "underline", color: '#001487' }}
              >
                {loginState ? "Join Us" : "Log in"}
              </span>
            </Typography>
          </div>
        </Box>
      </Drawer>
    </>
  )
};

export default LoginDrawer;
