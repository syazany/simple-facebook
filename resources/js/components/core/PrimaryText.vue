<template>
    <div>
        <input class="primary-input"
               :class="className"
               :value="value"
               @input="handleTextChange"
               :id="id" :type="inputType" :placeholder="placeholder">
    </div>
</template>

<script>
export default {
    props: {
        id: {
            type: String,
            default: '',
            required: true
        },
        inputType: {
            type: String,
            default: 'text'
        },
        placeholder: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: '',
            required: true
        },
        className: {
            type: String,
            default: ''
        },
        value: {
            type: String | Number,
            default: ''
        }
    },
    name: "PrimaryText",
    methods: {
        handleTextChange(e) {
            this.$emit('input', e.target.value);
        }
    }
}
</script>