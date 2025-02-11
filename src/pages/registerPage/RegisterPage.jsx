import { TextField, Box, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./style.css";
import { FormError } from "../../components/errors/Errors";
import { Link, useNavigate } from "react-router-dom";
import useAction from "../../hooks/useAction";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const RegisterPage = () => {
    const navigate = useNavigate();
    const { register, googleLogin } = useAction();

    const formHandler = (values) => {
        delete values.confirmPassword;
        values.role = "user";
        register(values);
        navigate("/");
    };

    // init values
    const initValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        image: "",
    };

    // google login
    const googleLoginHandler = (response) => {
        const jwtToken = response.credential;
        googleLogin(jwtToken);
        navigate("/");
    };

    const googleErrorHandler = () => {
        console.log("Google login error");
    };

    // validation yup scheme
    const yupValidationSchema = Yup.object({
        firstName: Yup.string().max(50, "Максимум 50 символів"),
        lastName: Yup.string().max(50, "Максимум 50 символів"),
        email: Yup.string()
            .required("Пошта обов'язкова")
            .email("Невірний формат пошти"),
        password: Yup.string()
            .required("Пароль обов'зковий")
            .min(6, "Пароль повинен містити не менше 6 символів"),
        confirmPassword: Yup.string()
            .required("Підтвердіть пароль")
            .oneOf([Yup.ref("password")], "Паролі не збігаються"),
    });

    // formik
    const formik = useFormik({
        initialValues: initValues,
        onSubmit: formHandler,
        validationSchema: yupValidationSchema,
    });

    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <Box
                component="form"
                onSubmit={formik.handleSubmit}
                className="form-container"
            >
                <Box>
                    <h1>Register page</h1>
                </Box>
                <Box className="form-control">
                    <TextField
                        id="firstName"
                        name="firstName"
                        label="First name"
                        variant="filled"
                        fullWidth
                        onChange={formik.handleChange}
                        value={formik.values.firstName}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.firstName && formik.errors.firstName ? (
                        <FormError text={formik.errors.firstName} />
                    ) : null}
                </Box>
                <Box className="form-control">
                    <TextField
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        variant="filled"
                        fullWidth
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.lastName && formik.errors.lastName ? (
                        <FormError text={formik.errors.lastName} />
                    ) : null}
                </Box>
                <Box className="form-control">
                    <TextField
                        type="email"
                        id="email"
                        name="email"
                        label="Email"
                        variant="filled"
                        fullWidth
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <FormError text={formik.errors.email} />
                    ) : null}
                </Box>
                <Box className="form-control">
                    <TextField
                        type="password"
                        id="password"
                        name="password"
                        label="Password"
                        variant="filled"
                        fullWidth
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <FormError text={formik.errors.password} />
                    ) : null}
                </Box>
                <Box className="form-control">
                    <TextField
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirm Password"
                        variant="filled"
                        fullWidth
                        onChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword ? (
                        <FormError text={formik.errors.confirmPassword} />
                    ) : null}
                </Box>
                <Box className="form-control">
                    <TextField
                        type="text"
                        id="image"
                        name="image"
                        label="Image"
                        variant="filled"
                        fullWidth
                        onChange={formik.handleChange}
                        value={formik.values.image}
                        onBlur={formik.handleBlur}
                    />
                </Box>
                <Box className="form-control">
                    <Button
                        color="secondary"
                        type="submit"
                        variant="contained"
                        fullWidth
                    >
                        Register
                    </Button>
                </Box>
                <Box>
                    <Typography>
                        Вже зареєстровані? <Link to="/login">Увійти</Link>
                    </Typography>
                </Box>
                <Box sx={{ mt: 2 }}>
                    <GoogleLogin
                        onSuccess={googleLoginHandler}
                        onError={googleErrorHandler}
                        type="standard"
                        theme="outline"
                        size="large"
                        text="signup_with"
                        shape="rectangular"
                        logo_alignment="left"
                        useOneTap={true}
                    />
                </Box>
            </Box>
        </GoogleOAuthProvider>
    );
};

export default RegisterPage;