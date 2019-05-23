import React from 'react';
import Slider from 'react-slick';
import LinkButton from '../utils/button';

const HeroSlider = (props) => {

    const slides = [
        {
            img:'/images/featured/guitars-for-sale.jpg',
            lineOne:'"One Musician\'s Outgrowth',
            lineTwo:'can be Someone else\'s beginning"',
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
        dots: false,
        infinite: true,
        speed: 3000,
        slidesToShow:1,
        slidesToScroll:1,
        arrows:false
    }

    const generateSlides = () => (
        slides ?
        slides.map((item, i) => (
            <div key={i}>
                <div className="featured_image"
                    style={{
                        background:`url(${item.img}) `,
                        height:`100vh`,
                    }}
                >
                    <div className="featured_action">
                        <p className="tag title"
                        style={{margin:0}}>{item.lineOne}</p>
                        <p className="tag low_title"
                        style={{margin:0, marginBottom:20}}
                        >{item.lineTwo}</p>
                    <div>
                        <LinkButton
                            type="default"
                            title={item.linkTitle}
                            linkTo={item.linkTo}
                            addStyles={{
                                margin:'10px 0 0 0'
                            }}
                         />
                    </div>
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