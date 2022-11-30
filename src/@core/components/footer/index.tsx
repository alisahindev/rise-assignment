// ** React Imports
import { ReactNode } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";

// ** Footer Content Component
import FooterContent from "./FooterContent";

interface Props {
  footerContent?: (props?: any) => ReactNode;
}

const Footer = (props: Props) => {
  // ** Props
  const { footerContent: userFooterContent } = props;

  return (
    <Box
      component='footer'
      className='layout-footer'
      sx={{
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        className='footer-content-container'
        sx={{
          py: 4,
          px: [4, 6],
          width: "100%",
          borderTopLeftRadius: 14,
          borderTopRightRadius: 14,
        }}
      >
        {userFooterContent ? userFooterContent(props) : <FooterContent />}
      </Box>
    </Box>
  );
};

export default Footer;
