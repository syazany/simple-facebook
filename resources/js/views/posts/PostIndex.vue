<template>
    <div class="overflow-x-hidden bg-gray-100">
        <nav class="px-6 py-4 bg-white shadow">
            <div class="container flex flex-col mx-auto md:flex-row md:items-center md:justify-between">
                <div class="flex items-center justify-between">
                    <div>
                        <a href="#" class="text-xl font-bold text-gray-800 md:text-2xl">Newsoft</a>
                    </div>
                    <div>
                        <button type="button" class="block text-gray-800 hover:text-gray-600 focus:text-gray-600 focus:outline-none md:hidden">
                            <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                                <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z">
                                </path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="flex-col md:flex md:flex-row md:-mx-4">
                    <form action="/logout" method="POST">
                        <input type="hidden" name="_token" :value="csrf">
                        <button class="my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0" type="submit">
                            Log out
                        </button>
                    </form>
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
                            <PrimaryButton @click="createPost">
                                Add Post
                            </PrimaryButton>
                        </div>
                    </div>
                    <div v-for="post in posts" :key="post.id" class="mt-6">
                        <Post :post="post"/>
                    </div>

                    <div v-if="pagination.meta" class="sm:flex-1  sm:flex sm:items-center sm:justify-between pt-3">
                        <div>
                            <p class="text-sm leading-5 text-gray-700">
                                Showing
                                <span class="font-medium">{{ pagination.meta.from }}</span>
                                to
                                <span class="font-medium">{{ pagination.meta.to }}</span>
                                of
                                <span class="font-medium">{{ pagination.meta.total }}</span>
                                results
                            </p>
                        </div>
                        <div>
                            <button class="btn btn-tertiary border border-gray-400"
                                    :class="pagination.links.prev === null ? 'btn-disabled' : ''"
                                    @click="fetchPosts(pagination.links.prev)">Previous
                            </button>

                            <div class="divider"></div>

                            <button class="btn btn-tertiary border border-gray-400"
                                    :class="pagination.links.next === null ? 'btn-disabled' : ''"
                                    @click="fetchPosts(pagination.links.next)">Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import CreatePostDialog from "../../components/posts/dialog/CreatePostDialog";
import PrimaryButton from "../../components/core/PrimaryButton";
import Post from "./Post";

export default {
    name: "PostIndex",
    components: {Post, PrimaryButton, CreatePostDialog},
    data() {
      return {
          csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      }
    },
    created() {
        this.fetchPosts();
    },
    computed: {
        ...mapGetters({
            posts: "posts/posts",
            pagination : "posts/pagination"
        }),
        // csrf() {
        //     return document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        // }
    },
    methods: {
        ...mapActions({
            fetchPosts: "posts/fetchPosts",
            deletePost : "posts/deletePost"
        }),
        ...mapMutations({
           setEditPostId : "posts/SET_EDIT_POST_ID",
           resetContent : "posts/RESET_CONTENT",
        }),
        async postDelete() {
            await this.deletePost();
            await this.fetchPosts();
            this.$store.commit("notification/showNotification", {
                message : "Post deleted"
            })
        },
        createPost() {
            this.setEditPostId(null);
            this.resetContent();
            this.$modal.show('create_post_dialog');
        }
    },
}
</script>

<style scoped>

</style>