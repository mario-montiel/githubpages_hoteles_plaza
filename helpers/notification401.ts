import { toast } from 'react-toastify';

export const unauthorized = () => {
    setTimeout(() => {
        toast('No cuenta con los permisos necesarios', {
            position: "top-right",
            autoClose: 2000,
            closeOnClick: true,
            type: 'error'
        })
    }, 300);
}