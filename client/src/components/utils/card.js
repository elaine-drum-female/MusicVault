import React, { Component } from 'react';

class Card extends Component {

    renderCardimage(images) {
        if(images.length > 0) {
            return images[0].url
        } else {
            return '/images/image_not_availble.png'
        }
    }

    render() {

        const props = this.props;

        return (
            <div className={`card_item_wrapper ${props.grid}`}>
              <div className="image"
                style={{
                    background:`url(${this.renderCardimage(props.images)})
                    no-repeat`
                }}
              >

              </div>
            </div>
        );
    }
}

export default Card;