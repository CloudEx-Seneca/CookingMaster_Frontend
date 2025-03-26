import React, { JSX } from 'react';
import { Route } from 'react-router-dom';

import WithNav from './WithNav.tsx';
import WithoutNav from './WithoutNav.tsx';

import Login from '../components/Login.tsx';
import RecipeList from '../components/RecipeList.tsx';
import RecipeForm from '../components/RecipeForm.tsx';
import Register from '../components/Register.tsx';
import ShoppingList from '../components/ShoppingList.tsx';
import Profile from '../components/Profile.tsx';
import RecipeDetail from '../components/RecipeDetail.tsx';
import EmailVerified from '../components/EmailVerified.tsx';
import EditRecipeForm from '../components/EditRecipeForm.tsx';

export const withNavRoutes: JSX.Element[] = [
    <Route element={<WithNav />}>
        <Route path="/recipes" element={<RecipeList />} key="recipes" />,
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/recipes/add" element={<RecipeForm />} key="recipe-add" />,  
        <Route path="/recipes/edit/:id" element={<EditRecipeForm />} key="recipe-edit" />,
        <Route path="/shoppinglist" element={<ShoppingList />} key="shoppinglist" />,
        <Route path="/profile" element={<Profile />} key="profile" />
       
    </Route>
];

export const withoutNavRoutes: JSX.Element[] = [
    <Route element={<WithoutNav />}>
        <Route path="/login" element={<Login />} key="login" />,
        <Route path="/" element={<Login />} key="login-alt" />,
        <Route path="/register" element={<Register />} key="register" />
        <Route path="/verify" element={<EmailVerified />} />
    </Route>
];
