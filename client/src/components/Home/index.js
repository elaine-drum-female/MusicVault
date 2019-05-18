import React, { Component } from 'react';
import HeroSlider from './hero_slider';
import HeroPromo from './hero_promo';

class Home extends Component {
    render() {
        return (
            <div>
                <HeroSlider/>
                <HeroPromo/>
            </div>
        );
    }
}

export default Home;