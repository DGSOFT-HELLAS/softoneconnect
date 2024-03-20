import { MdDashboard } from "react-icons/md";
import { BsFillCartFill } from "react-icons/bs";
import { IoSettingsSharp } from "react-icons/io5";




export const menuData = [
    {
        id: 1,
        title: 'Dashboard',
        icon: <MdDashboard />,
        
    },
    {
        id: 2,
        title: 'Προϊόντα',
        icon: <BsFillCartFill />,
        links: [
            {
                title: 'Login2',
                href: '/login'
            },

            {
                title: 'Login3',
                href: '/login'
            },

        ]
    },
    {
        id: 3,
        title: 'Settings',
        icon: <IoSettingsSharp />,
    },
]

