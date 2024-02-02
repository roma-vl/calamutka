import {Fragment} from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import {BASE_URI} from "../../../constants";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href={BASE_URI}>
        Calamutka
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Footer = () => (
    <Fragment>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Fragment>
);

export default Footer;
