import { useState } from 'react';   

function Dropdown( {selected, setSelected}) {
    const [isActive, setIsActive] = useState(false);
    const options = ['Authorization', 'Users', 'Cart', 'Suggestions', 'Billing']

    return (
        <div className='dropdown'>
            <div className='dropdown-btn' onClick={(e) => setIsActive(!isActive)} >
                {selected} <i class="fa">&#xf0d7;</i>
            </div>

            {isActive && (
                <div className='dropdown-content'>
                    {options.map((option) => (
                        <div
                            onClick={(e)  => {
                                setSelected(option);
                                setIsActive(false);
                            }}
                            className='dropdown-item'>{option}
                        </div>
                    ))}
                </div> 
            )}
        </div>
    );
}

export default Dropdown;