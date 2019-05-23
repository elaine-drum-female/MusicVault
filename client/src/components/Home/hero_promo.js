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
                background: `url(${promotion.img})`,
                position:'relative'
            }}
        >
            
            <div className="featured_action">
                <p className="tag title"
                style={{margin:0}}>{promotion.lineOne}</p>
                <p className="tag low_title"
                style={{margin:0, marginBottom:20}}
                >{promotion.lineTwo}</p>
                    </div>
            <div>
                <LinkButton
                    type="promo"
                    title={promotion.linkTitle}
                    linkTo={promotion.linkTo}
                    addStyles={{
                        margin:'40px 0 0 0',
                        padding:'30px'
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