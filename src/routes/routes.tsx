import React from 'react';
import { Route } from 'react-router-dom';

import WithNav from './WithNav.tsx';
import WithoutNav from './WithoutNav.tsx';

import Login from '../components/Login.tsx';
import RecipeList from '../components/RecipeList.tsx';
import RecipeForm from '../components/RecipeForm.tsx';
import SignUp from '../components/SignUp.tsx';
import PasswordReset from '../components/PasswordReset.tsx';
import Main from '../components/Main.tsx';
import AboutUs from '../components/AboutUs.tsx';
import ShoppingCart from '../components/ShoppingCart.tsx';
import LogoutLoad from '../components/LogoutLoad.tsx';
import Profile from '../components/Profile.tsx';

export const withNavRoutes: JSX.Element[] = [
    <Route element={<WithNav />}>
        <Route path="/home" element={<Main />} key="home" />,
        <Route path="/recipes" element={<RecipeList />} key="recipes" />,
        <Route path="/recipes/add" element={<RecipeForm />} key="recipe-add" />,
        <Route path="/reset-password" element={<PasswordReset />} key="reset-password" />,
        <Route path="/about" element={<AboutUs />} key="about" />,
        <Route path="/shoppinglist" element={<ShoppingCart />} key="shoppinglist" />,
        <Route path="/logout" element={<LogoutLoad />} key="logout" />,
        <Route path="/profile" element={<Profile />} key="profile" />
    </Route>
];

export const withoutNavRoutes: JSX.Element[] = [
    <Route element={<WithoutNav />}>
        <Route path="/" element={<Login />} key="login" />,
        <Route path="/signup" element={<SignUp />} key="signup" />
    </Route>
];
