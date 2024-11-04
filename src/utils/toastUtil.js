import { useToast } from 'vue-toastification';
export const showError = (message) => {
    const toast = useToast();
    toast.error(message);
};
export const showSuccess = (message) => {
    const toast = useToast();
    toast.success(message);
};
//# sourceMappingURL=toastUtil.js.map