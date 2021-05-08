import './styles/newPassword.scss';

import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';

import MetaData from '../../../../components/util/MetaData';
import { Route } from '../../../../router/route';
import { clearErrors, resetPassword } from '../../../../store/actions/authActions';

const NewPassword = ({ history, match }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, success } = useSelector((state) => state.password);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success('Password updated succesfully!');
            history.push(Route.LOGIN);
        }
    }, [dispatch, error, alert, success, history]);

    const submitHandler = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.set('password', password);
        formData.set('confirmPassword', confirmPassword);

        dispatch(resetPassword(match.params.token, formData));
    };

    return (
        <>
            <MetaData tite="New password" />
            <div className="">
                <div className="">
                    <form className="" onSubmit={submitHandler}>
                        <h1 className="">New Password</h1>

                        <div className="">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className=""
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                          />
                      </div>

                        <div className="">
                            <label htmlFor="confirm_password_field">Confirm Password</label>
                            <input
                                type="password"
                                id="confirm_password_field"
                                className=""
                                value={confirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                          />
                      </div>

                        <button id="new_password_button" type="submit" className="">
                        Set Password
                        </button>
                  </form>
              </div>
          </div>
      </>
    );
};

export default NewPassword;
