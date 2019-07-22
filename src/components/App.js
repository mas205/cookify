import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import Dishes from './cookify/Dishes'
import Home from './cookify/Home'
import PublicDishes from './cookify/PublicDishes'
import DishForm from './cookify/DishForm'
import Header from './Header'


const App = () => {
    return (
        <div style={{width:'100 vw', height:'100 vh'}}>
            <BrowserRouter>
                <CssBaseline />
                <Header />
                <Route path="/" exact component={Home} />
                <Route path="/dishes" exact component={Dishes} />
                <Route path="/public_dishes" exact component={PublicDishes} />
                <Route path="/dishes/new" exact component={DishForm} />
            </BrowserRouter>
        </div> 
    )
};

export default App;