import React, { Component } from 'react';

class Wrapper extends Component {
    render() {
        return (
            <div>
                 HEADER
                <div className="page_container">
                    {this.props.children}
                </div>
                FOOTER
            </div>
        );
    }
}

export default Wrapper;