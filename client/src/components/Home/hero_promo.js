import React from 'react';
import LinkButton from '../utils/button';

const HeroPromo = (props) => {

    const promotion = {

        img:'/images/featured/featured_home_3.jpg',
        lineOne:'Up to 40% off',
        lineTwo:'In second hand guitars',
        linkTitle:'Shop now',
        linkTo:'/shop'
    }

    const displayPromo = () => (
        promotion ?
        <div className="home_promotion_img"
            style={{
                background: `url(${promotion.img})`
            }}
        >
            
            <div className="tag title">{promotion.lineOne}</div>
            <div className="tag low_title">{promotion.lineTwo}</div>
            <div>
                <LinkButton
                    type="default"
                    title={promotion.linkTitle}
                    linkTo={promotion.linkTo}
                    addStyles={{
                        margin:'10px 0 0 0'
                    }}
                />
            </div>
        
        </div>
        : null 
    )

    return (
        <div className="home_promotion">
            { displayPromo() }
        </div>
    );
};

export default HeroPromo;