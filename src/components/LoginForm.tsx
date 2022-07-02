import { Button, Form, Input } from "antd";
import axios from "axios";
import { ChangeEvent, FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IUser } from "../models/IUser";
import { AuthActionCreators } from "../store/reducers/auth/action-creators";
import { rules } from "../utils/rules";

const LoginForm: FC = () => {
    const { error, isLoading } = useTypedSelector(state => state.auth);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useActions();

    const submit = () => {
        login(username, password);
    }

    return (
        <Form labelCol={{ span: 8 }}
            onFinish={submit}>
            {error &&
                <div style={{ color: 'red' }}>
                    {error}
                </div>
            }
            <Form.Item
                label="Логин"
                name="username"
                rules={[rules.required('Пожалуйста введите логин!')]}
            >
                <Input value={username} onChange={(event: ChangeEvent<HTMLInputElement>) => { setUsername(event.target.value) }} />
            </Form.Item>
            <Form.Item
                label="Пароль"
                name="password"
                rules={[rules.required('Пожалуйста введите пароль!')]}
            >
                <Input value={password} onChange={(event: ChangeEvent<HTMLInputElement>) => { setPassword(event.target.value) }} type={'password'} />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Войти
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;