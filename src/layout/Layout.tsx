// ** React Imports
import { ReactNode } from "react";
import { styled } from "@mui/material/styles";
import Box, { BoxProps } from "@mui/material/Box";
import Footer from "../@core/components/footer";
import Typography from "@mui/material/Typography";

interface Props {
  children: ReactNode;
}

const LayoutWrapper = styled("div")({
  height: "100%",
  display: "flex",
});

const MainContentWrapper = styled(Box)<BoxProps>({
  flexGrow: 1,
  minWidth: 0,
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
});

const HeaderWrapper = styled("header")(({ theme }) => ({
  margin: `${theme.spacing(4)}  ${theme.spacing(6)} ${theme.spacing(2)}`,
  borderBottom: `2px solid ${theme.palette.divider}`,
}));

const ContentWrapper = styled("main")(({ theme }) => ({
  flexGrow: 1,
  width: "100%",
  padding: `${theme.spacing(2)} ${theme.spacing(6)}`,
  transition: "padding .25s ease-in-out",
  [theme.breakpoints.down("sm")]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
}));

const Layout = ({ children }: Props) => {
  return (
    <>
      <LayoutWrapper>
        <MainContentWrapper>
          <HeaderWrapper>
            <Typography color={"GrayText"} variant='h4' sx={{ ml: 2, mb: 2 }}>
              LOGO
            </Typography>
          </HeaderWrapper>
          <ContentWrapper
            sx={{
              mx: "auto",
              "@media (min-width:1200px)": { maxWidth: "100%" },
            }}
          >
            {children}
          </ContentWrapper>
          <Footer />
        </MainContentWrapper>
      </LayoutWrapper>
    </>
  );
};

export default Layout;
