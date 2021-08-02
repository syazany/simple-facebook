<template>
    <div class="container md:mx-auto sm:w-full py-2 overflow-y-auto">

        <div class="py-4">
            <span class="default-dialog-title">{{ edit ? 'Update' : 'Add' }} Post</span>
        </div>

        <hr>

        <div class="bg-white px-4 mt-3">

            <quill-editor id="description"
                          height="200"
                          v-model="content"
                          :options="editorOptions"
                          class="primary-rich-text">
            </quill-editor>

            <div class="modal-button-alignment">
                <button @click="$modal.hide('create_post_dialog')" class="btn btn-tertiary pr-3">
                    <span>Cancel</span>
                </button>
                <div class="divider"></div>
                <button @click="createPost" class="btn btn-primary">
                    <span>{{ edit ? 'Update' : 'Create' }}</span>
                </button>
            </div>
        </div>

    </div>
</template>

<script>
import {editorOptions} from "../../../helper";
import PrimaryText from "../../core/PrimaryText";
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import {quillEditor} from 'vue-quill-editor'
import postRepository from "../../../repositories/postRepository";
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
    name: "CreatePostDialog",
    components: {
        PrimaryText,
        quillEditor
    },
    data() {
        return {
            editorOptions,
        }
    },
    computed: {
        ...mapGetters({
            editPostId: "posts/editPostId",
            postContent : "posts/content",
        }),
        edit() {
            return this.editPostId !== null;
        },
        content : {
            get() {
                return this.postContent
            },
            set(e) {
                return this.setContent(e);
            }
        }
    },
    methods: {
        ...mapActions({
            fetchPosts: "posts/fetchPosts"
        }),
        ...mapMutations({
           setContent : "posts/SET_CONTENT",
           resetContent : "posts/RESET_CONTENT"
        }),
        async createPost() {
            this.edit ?
             await postRepository.update(this.editPostId, {
                 content: this.content
             }) :
             await postRepository.store({content: this.content});

            this.$store.commit("notification/showNotification", {
                message: "Post "  + (this.edit ? "updated" : "created")
            })

            this.resetContent();

            await this.fetchPosts();

            this.$modal.hide("create_post_dialog");
        }
    }
}
</script>

<style scoped>

</style>