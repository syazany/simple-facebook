<x-guest-layout>
    <x-auth-card>
        <x-slot name="logo">
            <a href="/">
                <x-application-logo class="w-20 h-20 fill-current text-gray-500" />
            </a>
        </x-slot>

        <!-- Validation Errors -->
        <x-auth-validation-errors class="mb-4" :errors="$errors" />

        <form method="POST" action="{{ route('register') }}">
            @csrf

            <h2 class="text-2xl font-medium tracking-tight pb-4">
                Register a new account
            </h2>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-full px-3 mb-6">
                    <label class="block tracking-wide text-gray-700 text-sm font-medium mb-2" for='name'>Name
                    </label>
                    <input
                            class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                            type='text' value="{{isset($name)  ? $name : ''}}" name="name" id="name" required>

                </div>
                <div class="w-full md:w-full px-3 mb-6">
                    <label class="block tracking-wide text-gray-700 text-sm font-medium mb-2" for='email'>Email
                    </label>
                    <input
                            class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                            type='email' value="{{isset($email)  ? $email : ''}}" name="email" id="email" required>

                </div>
                <div class="w-full md:w-full px-3 mb-6">
                    <label class="block tracking-wide text-gray-700 text-sm font-medium mb-2"
                           for='password'>Password</label>
                    <input
                            class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                            type='password' value="{{isset($password) ? $password : ''}}" name='password' id='password'
                            required>
                </div>
                <div class="w-full md:w-full px-3 mb-6">
                    <label class="block tracking-wide text-gray-700 text-sm font-medium mb-2"
                           for='password_confirmation'>Confirm Password</label>
                    <input
                            class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                            type='password' value="{{isset($password) ? $password : ''}}" name='password_confirmation' id='_confirmation'
                            required>
                </div>
                <div class="w-full flex items-center justify-between px-3 mb-3 ">
                    <label for="remember" class="flex items-center w-1/2">
                        <input type="checkbox" name="remember" id="remember" class="mr-1 bg-white shadow">
                        <span class="text-sm text-gray-700 pt-1">Remember Me</span>
                    </label>
                </div>
                <div class="w-full md:w-full px-3 mb-6">
                    <button type="submit"
                            class="appearance-none block w-full bg-blue-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-blue-500 focus:outline-none focus:bg-white focus:border-gray-500">
                        Continue
                    </button>
                </div>

            </div>
        </form>
    </x-auth-card>
</x-guest-layout>
