import React from 'react';
import Slider from 'react-slick';
// import LinkButton from '../utils/button';

const HeroSlider = (props) => {

    const slides = [
        {
            img:'/images/featured/featured_home.jpg',
            lineOne:'Fender',
            lineTwo:'Custom shop',
            linkTitle:'Shop now',
            linkTo:'/shop'
        },

        {
            img:'/images/featured/featured_home_2.jpg',
            lineOne:'B-Stock',
            lineTwo:'Awesome discounts',
            linkTitle:'View offers',
            linkTo:'/shop'
        },

        {
            img:'/images/featured/featured_home_4.jpg',
            lineOne:'Pearl Gray Musical Drumset',
            lineTwo:'Buy the set get the Vic Firth sticks off half price',
            linkTitle:'View discounts',
            linkTo:'/shop'
        },

        {
            img:'/images/featured/featured_home_5.jpg',
            lineOne:'Microphone DJ Controller',
            lineTwo:'Need a mic for tonight?',
            linkTitle:'See the selection',
            linkTo:'/shop'
        }
    
    ]

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow:1,
        slidesToScroll:1,
        arrow:true
    }

    const generateSlides = () => (
        slides ?
        slides.map((item, i) => (
            <div key={i}>
                <div className="featured_image"
                    style={{
                        background:`url(${item.img})`,
                        height:`${window.innerHeight}px`
                    }}
                >
                    <div className="featured_action">

                    </div>
                </div>
            </div>
        ))
        :null
    )

    return (
        <div className="featured_container">
            <Slider {...settings}>
                { generateSlides() }
            </Slider>
            
        </div>
    );
};

export default HeroSlider;