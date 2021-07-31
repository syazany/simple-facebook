<template>
    <div>
        <div class="text-center mt-24">

        </div>
        <div class="flex justify-center my-2 mx-4 md:mx-0">
            <form class="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <h2 class="text-2xl font-medium tracking-tight pb-4">
                    Create New Account
                </h2>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-full px-3 mb-6">
                        <label class="block tracking-wide text-gray-700 text-sm font-medium mb-2" for='email'>Email
                        </label>
                        <input
                         class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                         type='email' v-model="email" name="email" id="email" required>

                    </div>
                    <div class="w-full md:w-full px-3 mb-6">
                        <label class="block tracking-wide text-gray-700 text-sm font-medium mb-2"
                               for='password'>Password</label>
                        <input
                         class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                         type='password' v-model="password" name='password' id='password' required>
                    </div>
                    <div class="w-full md:w-full px-3 mb-6">
                        <label class="block tracking-wide text-gray-700 text-sm font-medium mb-2"
                               for='password'>Confirm Password</label>
                        <input
                         class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                         type='password' v-model="confirmPassword" name='confirm_password' id='confirm_password'
                         required>
                    </div>
                    <div class="w-full flex items-center justify-between px-3 mb-3 ">
                        <label for="remember" class="flex items-center w-1/2">
                            <input type="checkbox" name="remember" id="remember" class="mr-1 bg-white shadow">
                            <span class="text-sm text-gray-700 pt-1">Remember Me</span>
                        </label>
                    </div>
                    <div class="w-full md:w-full px-3 mb-6">
                        <button
                         @click="registerUser"
                         :disabled="invalidPassword"
                         :class="{
                             'bg-blue-500' : invalidPassword,
                             'bg-blue-600' : !invalidPassword
                         }"
                         class="appearance-none block w-full text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-blue-500 focus:outline-none focus:bg-white focus:border-gray-500">
                            Continue
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: "Register",
    data() {
        return {
            email: "",
            password: "",
            action: "login",
            register: "register",
            confirmPassword: ""
        }
    },
    computed: {
        invalidPassword() {
            return !(this.confirmPassword.length && this.password.length && this.confirmPassword === this.password);
        },
    },
    methods: {
        async registerUser() {

            try {
                const response = await axios.post('/api/register', {
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.confirmPassword
                });

                this.$store.commit("notification/showNotification", {
                    message : "Registration successful please login using your credentials"
                })

                console.log({response});

                await this.$router.push({name: 'login'});

            } catch (e) {
                this.$store.commit("notification/showNotification", e.response.data.message);
            }


        }
    }
}
</script>

<style scoped>

</style>