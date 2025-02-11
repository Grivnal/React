import React, {useState} from "react";
import {Box, Container, Grid, Typography, TextField, Button, IconButton, Snackbar, Alert, useTheme} from "@mui/material";
import {styled} from "@mui/system";
import {FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube} from "react-icons/fa";

const StyledFooter = styled(Box)(({theme}) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.main,
    padding: "64px 0 32px",
}));

const FooterColumn = styled(Box)(({theme}) => ({
    "& h6": {
        fontWeight: 600,
        marginBottom: "24px",
    },
    "& ul": {
        listStyle: "none",
        padding: 0,
        margin: 0,
    },
    "& li": {
        marginBottom: "12px",
        cursor: "pointer",
        transition: "color 0.3s ease",
        "&:hover": {
            //color: "#4dabf5",
            color: theme.palette.text.hover,
        },
    },
}));

const NewsletterSection = styled(Box)(({theme}) => ({
    backgroundColor: theme.palette.primary.dark,
    padding: "32px",
    borderRadius: "8px",
    marginTop: "32px",
}));

const SocialIcon = styled(IconButton)(({theme}) => ({
    color: "#ffffff",
    margin: "0 8px",
    transition: "transform 0.3s ease, color 0.3s ease",
    "&:hover": {
        transform: "translateY(-4px)",
        color: "#4dabf5",
    },
}));

const Footer = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const theme = useTheme();

    const handleSubscribe = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address");
            return;
        }
        setError("");
        setOpenSnackbar(true);
        setEmail("");
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <StyledFooter component="footer" role="contentinfo">
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={3}>
                        <FooterColumn>
                            <Typography variant="h6">Product Features</Typography>
                            <ul>
                                <li role="link" tabIndex={0}>Solutions</li>
                                <li role="link" tabIndex={0}>Integrations</li>
                                <li role="link" tabIndex={0}>Pricing Plans</li>
                                <li role="link" tabIndex={0}>Product Updates</li>
                            </ul>
                        </FooterColumn>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <FooterColumn>
                            <Typography variant="h6">Company Information</Typography>
                            <ul>
                                <li role="link" tabIndex={0}>About Us</li>
                                <li role="link" tabIndex={0}>Careers</li>
                                <li role="link" tabIndex={0}>Press Kit</li>
                                <li role="link" tabIndex={0}>Contact Us</li>
                            </ul>
                        </FooterColumn>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <FooterColumn>
                            <Typography variant="h6">Customer Support</Typography>
                            <ul>
                                <li role="link" tabIndex={0}>Help Center</li>
                                <li role="link" tabIndex={0}>Documentation</li>
                                <li role="link" tabIndex={0}>Community Forums</li>
                                <li role="link" tabIndex={0}>Status Page</li>
                            </ul>
                        </FooterColumn>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <FooterColumn>
                            <Typography variant="h6">Legal & Policies</Typography>
                            <ul>
                                <li role="link" tabIndex={0}>Privacy Policy</li>
                                <li role="link" tabIndex={0}>Terms of Service</li>
                                <li role="link" tabIndex={0}>Cookie Policy</li>
                                <li role="link" tabIndex={0}>Security</li>
                            </ul>
                        </FooterColumn>
                    </Grid>
                </Grid>

                <NewsletterSection>
                    <Typography variant="h6" gutterBottom>
                        Subscribe to Our Newsletter
                    </Typography>
                    <Typography variant="body2" sx={{mb: 3}}>
                        Stay updated with our latest news, updates, and exclusive offers.
                    </Typography>
                    <Box sx={{display: "flex", gap: 2}}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={Boolean(error)}
                            helperText={error}
                            sx={{
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                                input: {color: "#ffffff"},
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {borderColor: "rgba(255, 255, 255, 0.3)"},
                                    "&:hover fieldset": {borderColor: "rgba(255, 255, 255, 0.5)"},
                                }
                            }}
                        />
                        <Button
                            variant="contained"
                            onClick={handleSubscribe}
                            sx={{
                                color: theme.palette.text.light,
                                minWidth: "120px",
                                backgroundColor: theme.palette.secondary.main,
                                "&:hover": {backgroundColor: theme.palette.secondary.dark}
                            }}
                        >
                            Subscribe
                        </Button>
                    </Box>
                </NewsletterSection>

                <Box sx={{mt: 4, textAlign: "center"}}>
                    <Box sx={{mb: 2}}>
                        <SocialIcon aria-label="Facebook" component="a" href="#">
                            <FaFacebook size={24}/>
                        </SocialIcon>
                        <SocialIcon aria-label="Twitter" component="a" href="#">
                            <FaTwitter size={24}/>
                        </SocialIcon>
                        <SocialIcon aria-label="Instagram" component="a" href="#">
                            <FaInstagram size={24}/>
                        </SocialIcon>
                        <SocialIcon aria-label="LinkedIn" component="a" href="#">
                            <FaLinkedin size={24}/>
                        </SocialIcon>
                        <SocialIcon aria-label="YouTube" component="a" href="#">
                            <FaYoutube size={24}/>
                        </SocialIcon>
                    </Box>
                    <Typography variant="body2" color="text.main">
                        © {new Date().getFullYear()} Your Company Name. All rights reserved.
                    </Typography>
                </Box>

                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity="success" sx={{width: "100%"}}>
                        Thank you for subscribing to our newsletter!
                    </Alert>
                </Snackbar>
            </Container>
        </StyledFooter>
    );
};

export default Footer;