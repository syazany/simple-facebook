<template>

    <modal name="deleteConfirmationDialog" class="sm:w-full md:w-1/6" :adaptive="true" :scrollable="true"
           :shiftY="0.3" height="auto" width="400px">
        <div class="container md:mx-auto sm:w-full  py-2 overflow-y-auto">
            <p class="default-dialog-title mt-2">Delete {{ type }}</p>
            <div class="mt-2">
                <p class="px-4">Are you sure you want to permanently delete this {{
                        type
                    }}? This cannot be undone</p>
            </div>
            <div class="inline-flex text-right px-4 pt-4 pb-5 float-right">
                <button @click="$modal.hide('deleteConfirmationDialog')" class="btn btn-tertiary pr-3">
                    <span>Cancel</span>
                </button>
                <div class="divider"></div>
                <button @click="deleteObject" class="btn btn-danger bg-red-700">
                    Delete {{ type }}
                </button>
            </div>
        </div>

    </modal>

</template>

<script>
export default {
    props: {
        objectType: {
            type: String,
            default: 'Post'
        }
    },
    computed: {
        type() {
            return this.objectType.toLowerCase();
        }
    },
    name: "DeleteConfirmationDialog",
    methods: {
        deleteObject() {
            this.$emit('delete');
        }
    }
}
</script>

<style scoped>

</style>
