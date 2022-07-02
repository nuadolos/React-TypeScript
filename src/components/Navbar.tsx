import { Layout, Menu, Row } from "antd";
import { MenuProps } from "rc-menu";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { RouteNames } from "../routers";
import { AuthActionCreators } from "../store/reducers/auth/action-creators";

const Navbar: FC = () => {
    const router = useNavigate();
    const { isAuth, user } = useTypedSelector(state => state.auth);
    const { logout } = useActions();

    return (
        <Layout.Header>
            <Row justify="end">
                {isAuth ?
                    <Menu mode="horizontal" selectable={false}>
                        <Menu.Item key={1}>{user.username}</Menu.Item>
                        <Menu.Item key={2} onClick={logout}>Выйти</Menu.Item>
                    </Menu>
                    :
                    <Menu mode="horizontal" selectable={false}>
                        <Menu.Item key={1} onClick={() => router(RouteNames.LOGIN)}>Войти</Menu.Item>
                    </Menu>
                }
            </Row>
        </Layout.Header>
    );
};

export default Navbar;