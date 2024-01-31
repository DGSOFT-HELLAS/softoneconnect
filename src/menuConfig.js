import { LayoutDashboard } from 'lucide-react';
export const menuData = [
    {
        id: 1,
        title: 'Dashboard',
        icon: <LayoutDashboard />,
        
    },
    {
        id: 2,
        title: 'Ειδικές Εργασίες',
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
]

