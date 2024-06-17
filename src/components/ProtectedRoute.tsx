import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../store/store';

interface ProtectedRouteProps extends PropsFromRedux {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: React.ComponentType<any>;
}

// eslint-disable-next-line react-refresh/only-export-components
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, userLogin, ...rest }) => {
    return userLogin ? <Component {...rest} /> : <Navigate to="/" />;
};

const mapStateToProps = (state: RootState) => ({
    userLogin: state.userLogin.data?.id, // Adjust this according to your state structure
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

// eslint-disable-next-line react-refresh/only-export-components
export default connector(ProtectedRoute);
