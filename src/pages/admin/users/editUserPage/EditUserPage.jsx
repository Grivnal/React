import { useParams, useNavigate } from "react-router-dom";
import { TextField, Box, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./style.css";
import { FormError } from "../../../../components/errors/Errors";
import { useEffect } from "react";
import useAction from "../../../../hooks/useAction";

const EditUserPage = ({ isEdit = false }) => {
    const navigate = useNavigate();
    const params = useParams();
    const {createUser, updateUser} = useAction();

    const formEditHandler = (values) => {
        updateUser(values);
        navigate("/admin/users");
    };

    const formCreateHandler = (values) => {
        createUser(values);
        navigate("/admin/users");
    };

    // init values
    const initValues = {
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "user",
        image: ""
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
    });

    // formik
    const formik = useFormik({
        initialValues: initValues,
        onSubmit: isEdit ? formEditHandler : formCreateHandler,
        validationSchema: yupValidationSchema,
    });

    useEffect(() => {
        if (isEdit) {
            const localData = localStorage.getItem("users");
            if (!localData) {
                navigate("/admin/users");
            }

            const id = params.id;
            const users = JSON.parse(localData);

            const user = users.find((u) => u.id == id);

            if (!user) {
                navigate("/admin/users");
            }

            formik.setValues(user);
        }
    }, []);

    return (
        <Box
            component="form"
            onSubmit={formik.handleSubmit}
            className="form-container"
        >
            <Box>
                <h1>{isEdit ? "Edit user" : "Create user"}</h1>
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
                <Button type="submit" variant="contained" fullWidth>
                    {isEdit ? "Save" : "Create"}
                </Button>
            </Box>
        </Box>
    );
};

export default EditUserPage;