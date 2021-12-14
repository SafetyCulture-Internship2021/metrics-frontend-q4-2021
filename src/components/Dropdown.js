import React, { useState } from "react";
import MenuItems from './MenuItems';
import { Link } from 'react-router-dom'; 

function Dropdown() {
    const [click, setClick] = useState(false)

    const handleClick = () => setClick(!click) 
}

export default Dropdown;