<template>
    <button @click="handleClick"
            :class="'btn ' + type + ' ' + btnClass"
            aria-label="Remove">
        <svg v-if="hasIcon" class="w-6 h-6" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24"
             xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  :d="icon ? icon : 'M12 6v6m0 0v6m0-6h6m-6 0H6'"></path>
        </svg>
        <slot/>
    </button>
</template>

<script>
export default {
    props: {
        icon: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            required: false,
            default: 'Add something'
        },
        btnClass: {
            type: String,
            default: ''
        },
        btnType : {
            type : String,
            default : 'primary'
        }
    },
    computed: {
        hasIcon() {
            return this.icon !== '';
        },
        type() {
            return 'btn-' + this.btnType
        }
    },
    name: "PrimaryButton",

    methods: {
        handleClick() {
            this.$emit('click');
        }
    }
}
</script>

<style scoped>

</style>
