import React, { useEffect, useState } from 'react';
import { clearErrors, loadUser, resetProfile, updateProfile } from '../../store/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';

import MetaData from '../common/MetaData';
import { useAlert } from 'react-alert';

const UpdateProfile = ({ history }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpeg');

    const alert = useAlert();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { error, isUpdated, loading } = useSelector((state) => state.user);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success('User updated successfully.');
            dispatch(loadUser());

            history.push('/me');
            dispatch(resetProfile());
        }
    }, [dispatch, error, alert, history, user, isUpdated]);

    const submitHandler = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('avatar', avatar);

        dispatch(updateProfile(formData));
    };

    const handleChange = (event) => {
        const reader = new FileReader();
        reader.onload = () => {
            // State = done
            if (reader.readyState === 2) {
                setAvatar(reader.result);
                setAvatarPreview(reader.result);
            }
        };
        reader.readAsDataURL(event.target.files[0]);
    };

    return (
        <>
            <MetaData title="Update profile" />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" encType="multipart/form-data" onSubmit={submitHandler}>
                        <h1 className="mt-2 mb-5">Update Profile</h1>

                        <div className="form-group">
                            <label htmlFor="email_field">Name</label>
                            <input
                                type="name"
                                id="name_field"
                                className="form-control"
                                name="name"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="avatar_upload">Avatar</label>
                            <div className="d-flex align-items-center">
                                <div>
                                    <figure className="avatar mr-3 item-rtl">
                                        <img src={avatarPreview} className="rounded-circle" alt="Avatar Preview" />
                                    </figure>
                                </div>
                                <div className="custom-file">
                                    <input
                                        type="file"
                                        name="avatar"
                                        className="custom-file-input"
                                        id="customFile"
                                        accept="images/*"
                                        onChange={handleChange}
                                    />
                                    <label className="custom-file-label" htmlFor="customFile">
                                        Choose Avatar
                                    </label>
                                </div>
                            </div>
                        </div>

                        <button disabled={loading} type="submit" className="btn update-btn btn-block mt-4 mb-3">
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default UpdateProfile;
