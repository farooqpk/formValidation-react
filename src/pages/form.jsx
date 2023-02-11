import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const Form = () => {
    const SubmitData = (data) => {
        console.log(data);
    };

    const schema = yup.object().shape({
        Name: yup.string().required("name is required"),
        Email: yup.string().required("email is required").email("enter valid email"),
        Phone: yup
            .number()
            .typeError("Enter a valid phone number")
            .positive("Phone number should be a positive number")
            .integer()
            .test("len", "Phone number should be 10 digits", (value) => value.toString().length === 10),
        Password: yup
            .string()
            .required("password is required")
            .min(4, "password must be grater than or equal to 4")
            .max(8, "password should not be exceed 8"),
        ConfirmPassword: yup
            .string()
            .required("required")
            .oneOf([yup.ref("Password"), null], "enter above password to confirm"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    return (
        <div>
            <form onSubmit={handleSubmit(SubmitData)}>
                <input type="text" placeholder="enter yout name" {...register("Name")} />
                {errors.Name && <p style={{ color: "red" }}>{errors.Name.message}</p>}
                <br />
                <input type="number" placeholder="enter phone" {...register("Phone")} />
                {errors.Phone && <p style={{ color: "red" }}>{errors.Phone.message}</p>}
                <br />
                <input type="email" placeholder="enter email" {...register("Email")} />
                {errors.Email && <p style={{ color: "red" }}>{errors.Email.message}</p>}
                <br />
                <input type="password" placeholder="enter pass" {...register("Password")} />
                {errors.Password && <p style={{ color: "red" }}>{errors.Password.message}</p>}
                <br />
                <input type="password" placeholder="confirm password" {...register("ConfirmPassword")} />
                {errors.ConfirmPassword && <p style={{ color: "red" }}>{errors.ConfirmPassword.message}</p>}
                <br />
                <input type="submit" />
            </form>
        </div>
    );
};
