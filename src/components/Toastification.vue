<script lang="ts">
import { useToast } from 'vue-toastification'

export default defineComponent ({
  setup() {
    const toast = useToast();

    const showError = (message:string) => {
      toast.error(message);
    }

    const showSuccess = (message:string) => {
      toast.success(message);
    }
  }
})
</script>