import React from 'react';

const Comment = props => {     
    return (
        <div className='Comment'>
            <div className="Author">
                Author: {props.author}
            </div>
            <div className="Content">
                Comment: {props.comment}
            </div>
            <div className="Button">
                {props.edit_button}
                {props.delete_button}
            </div>
            <div className="LineBreak">
                <br></br>
            </div>
        </div>
    );
}
export default Comment;