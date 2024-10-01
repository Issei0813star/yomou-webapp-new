import { useToast } from 'vue-toastification';

export const showError = (message: string) => {
    const toast = useToast();
    toast.error(message);
};

export const showSuccess = (message: string) => {
    const toast = useToast();
    toast.success(message);
};
