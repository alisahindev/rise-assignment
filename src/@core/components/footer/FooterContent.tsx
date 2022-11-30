// ** MUI Imports
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const FooterContent = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography color={"GrayText"} sx={{ mr: 2 }}>
        <Link
          target='_blank'
          href='https://github.com/alisahindev/rise-assignment'
        >
          alisahindev
        </Link>
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {`© ${new Date().getFullYear()}`}
        <Box component='span' sx={{ color: "GrayText", ml: 1 }}>
          Ali Şahin
        </Box>
      </Box>
    </Box>
  );
};

export default FooterContent;
