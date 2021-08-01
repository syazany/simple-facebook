<template>
    <div class="overflow-x-hidden bg-gray-100">
        <nav class="px-6 py-4 bg-white shadow">
            <div class="container flex flex-col mx-auto md:flex-row md:items-center md:justify-between">
                <div class="flex items-center justify-between">
                    <div>
                        <a href="#" class="text-xl font-bold text-gray-800 md:text-2xl">Brand</a>
                    </div>
                    <div>
                        <button type="button"
                                class="block text-gray-800 hover:text-gray-600 focus:text-gray-600 focus:outline-none md:hidden">
                            <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                                <path
                                 d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z">
                                </path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>

        <modal name="create_post_dialog" class="sm:w-full md:w-1/4" :adaptive="true" :scrollable="true" height="auto">
            <create-post-dialog></create-post-dialog>
        </modal>

        <delete-confirmation-dialog object-type="Post"
                                    @delete="postDelete"></delete-confirmation-dialog>

        <div class="px-6 py-8">
            <div class="container flex justify-between mx-auto">
                <div class="w-full lg:w-8/12">
                    <div class="flex items-center justify-between">
                        <h1 class="text-xl font-bold text-gray-700 md:text-2xl">Post</h1>
                        <div>
                            <PrimaryButton @click="$modal.show('create_post_dialog')">
                                Add Post
                            </PrimaryButton>
                        </div>
                    </div>
                    <div v-for="post in posts" :key="post.id" class="mt-6">
                        <Post :post="post"/>
                    </div>

                    <div class="mt-8">
                        <div class="flex">
                            <a href="#"
                               class="px-3 py-2 mx-1 font-medium text-gray-500 bg-white rounded-md cursor-not-allowed">
                                previous
                            </a>

                            <a href="#"
                               class="px-3 py-2 mx-1 font-medium text-gray-700 bg-white rounded-md hover:bg-blue-500 hover:text-white">
                                1
                            </a>

                            <a href="#"
                               class="px-3 py-2 mx-1 font-medium text-gray-700 bg-white rounded-md hover:bg-blue-500 hover:text-white">
                                2
                            </a>

                            <a href="#"
                               class="px-3 py-2 mx-1 font-medium text-gray-700 bg-white rounded-md hover:bg-blue-500 hover:text-white">
                                3
                            </a>

                            <a href="#"
                               class="px-3 py-2 mx-1 font-medium text-gray-700 bg-white rounded-md hover:bg-blue-500 hover:text-white">
                                Next
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import CreatePostDialog from "../../components/posts/dialog/CreatePostDialog";
import PrimaryButton from "../../components/core/PrimaryButton";
import Post from "./Post";

export default {
    name: "PostIndex",
    components: {Post, PrimaryButton, CreatePostDialog},
    created() {
        this.fetchPosts();
    },
    computed: {
        ...mapGetters({
            'posts': "posts/posts"
        }),
    },
    methods: {
        ...mapActions({
            fetchPosts: "posts/fetchPosts",
            deletePost : "posts/deletePost"
        }),
        async postDelete() {
            await this.deletePost();
            await this.fetchPosts();
            this.$store.commit("notification/showNotification", {
                message : "Post deleted"
            })
        }
    },
}
</script>

<style scoped>

</style>