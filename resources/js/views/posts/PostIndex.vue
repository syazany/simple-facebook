<template>

</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name: "PostIndex",
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
            fetchPosts: "posts/fetchPosts"
        })
    },
}
</script>

<style scoped>

</style>