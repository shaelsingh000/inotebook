import React from 'react';

import Note  from './note';

export const Home = (props) => {
    return (
        
        <div className='text-light'>
            <Note showAlert={props.showAlert}/>
        </div>  
    )

};
export default Home
