<template>


</template>
<script>
import 'vue-toast-notification/dist/theme-sugar.css';
import {mapGetters} from "vuex";
export default {
    name : 'ToastNotification',
    computed: {
        ...mapGetters(
         'notification', [
             'variant', 'message', 'duration', 'show'
         ]
        ),
    },
    watch : {
        show() {
            return this.$toast.open({
                type: this.variant,
                message: this.message,
                position: "top",
                duration: this.duration
            });
        }
    }
};
</script>
