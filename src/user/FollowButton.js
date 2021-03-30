import React from 'react';
import {follow, unfollow} from './apiUser'


const FollowButton = ({ following , onButtonClick}) => {
    
    let followClick = () => {
        onButtonClick(follow)
    }
    let unFollowClick = () => {
        onButtonClick(unfollow)
    }


    return (
        <div className="d-inline-block mt-5">
            {!following
                ? <button className="btn btn-success btn-raised mr-5" onClick={followClick}>Follow</button>
                : <button className="btn btn-danger btn-raised" onClick={unFollowClick} >UnFollow</button>
            }
        </div>
    );
}

export default FollowButton;