<template>
    <div>
        <div class="max-w-4xl px-10 py-6 mx-auto bg-white rounded-lg shadow-md">
            <div class="flex items-center justify-between ">
                <a href="#" class="flex items-center"><img
             src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=731&amp;q=80"
             alt="avatar" class="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block">
                <h1 class="font-bold text-gray-700 hover:underline">{{ post.user.name }}</h1>
            </a>
                <post-popover :post="post"/>
            </div>
            <div class="mt-2">
                <span v-html="post.content"></span>
            </div>
            <div class="flex items-center justify-between mt-4">
                <a @click="showCommentTextField = !showCommentTextField" href="#"
                   class="text-blue-500 hover:underline">Add comments ({{post.comments.length}} comments)</a>
                <button
                 @click="likePost"
                 class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white
                 py-2 px-4 border border-blue-500 hover:border-transparent rounded inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/>
                    </svg>
                    <span>{{liked ? 'Liked' : 'Like'}} ({{post.likes_count}})</span>
                </button>
            </div>

            <div class="container">

                <div v-for="comment in post.comments" v-bind:key="comment.id" class="flex mt-3">
                    <div class="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                        <strong>{{ comment.user.name }}</strong> <span class="text-xs text-gray-400">{{
                            comment.created_at |
                             formatDateTime
                        }}</span>
                        <p class="text-sm">
                            {{ comment.content }}
                        </p>
                    </div>
                </div>

                <div v-if="showCommentTextField">
                    <div class="text-right">
                        <button
                         @click="showCommentTextField = !showCommentTextField"
                         class="px-1 py-2 bg-white hover:bg-gray-300">
                            <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M6 18L18 6M6 6l12 12"/>
                            </svg>

                        </button>

                    </div>

                    <textarea v-model="comment"
                              placeholder="Add comment"
                              class="primary-text-area">
            </textarea>

                    <div class="text-right">
                        <button class="btn btn-secondary" @click="postComment">Post</button>
                    </div>
                </div>


            </div>

        </div>


    </div>
</template>

<script>
import commentRepository from "../../repositories/commentRepository";
import {mapActions} from "vuex";
import PostPopover from "../../components/posts/PostPopover";
import likeRepository from "../../repositories/likeRepository";

export default {
    name: "Post",
    components: {PostPopover},
    props: {
        post: {
            type: Object
        }
    },
    data() {
        return {
            showCommentTextField: false,
            comment: ""
        }
    },
    computed : {
        liked() {
            return this.post.liked_by_user;
        }
    },
    methods: {
        ...mapActions({
            fetchPosts: "posts/fetchPosts"
        }),
        async postComment() {
            await commentRepository.store(this.post.id, {
                content: this.comment
            })

            await this.fetchPosts();

            this.$store.commit("notification/showNotification", {
                message : "Comment added"
            })

            this.showCommentTextField = false;

        },
        async likePost() {
            this.liked ? await likeRepository.delete(this.post.id) :  await likeRepository.store(this.post.id);
            await this.fetchPosts();
        },
    }
}
</script>

<style scoped>

</style>