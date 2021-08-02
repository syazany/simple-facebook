<template>
    <div>
        <div class="relative inline-block text-left">
            <div>
                <button @click.stop="isOpen = !isOpen" type="button"
                        class="btn-dropdown px-1 focus:outline-none"
                        id="menu-button" aria-expanded="true" aria-haspopup="true">

                    <!-- Heroicon name: solid/chevron-down -->
                    <svg viewBox="0 0 20 20" fill="currentColor" class="dots-horizontal w-6 h-6 px-1">
                        <path
                         d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                    </svg>
                </button>
            </div>


            <default-transition>
                <div v-if="isOpen"
                     class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                     role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                    <div v-click-outside="closeDropdown" class="py-1" role="none">
                        <div class="rounded-md bg-white bg-opacity-0 shadow-xs">
                            <div class="py-1" role="menu" aria-orientation="vertical"
                                 aria-labelledby="options-menu">
                                <a @click.stop="updatePost"
                                   class="block cursor-pointer font-medium px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100
                                           hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 bg-opacity-0"
                                   role="menuitem">Edit</a>
                                <a
                                 @click.stop="setId(); $modal.show('deleteConfirmationDialog');"
                                 href="#"
                                 class="block px-4 py-2 text-sm leading-5 text-red-700
                                                                       font-medium
                                                                       hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                 role="menuitem">Delete this post</a>
                            </div>
                        </div>
                    </div>
                </div>
            </default-transition>
        </div>
    </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
    name: "PostPopover",
    props: {
        post: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            isOpen: false
        }
    },
    methods: {
        ...mapMutations({
            setEditPostId: "posts/SET_EDIT_POST_ID",
            setContent: "posts/SET_CONTENT",
        }),
        setId() {
            this.$store.commit("posts/SET_POST_DELETE_ID", this.post.id)
        },
        closeDropdown() {
            this.isOpen = !this.isOpen;
        },
        updatePost() {
            this.isOpen = false;
            this.setEditPostId(this.post.id);
            this.setContent(this.post.content);
            this.$modal.show("create_post_dialog");
        },
    }
}
</script>

<style scoped>

</style>