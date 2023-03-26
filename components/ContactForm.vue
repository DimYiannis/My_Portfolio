<template>
    <form class="min-w-max  mx-auto tablet:mx-20 "
    netlify
    netlify-honeypot
    name="contact"
    method="POST" 
    action="/success"
    >
      
    <input type="hidden" name="form-name" value="contact" />
    <p hidden>
		  <label> 
        <input name="bot-field" />
      </label>
	  </p>
          <p class="mb-4">
            <label class="block font-bold mb-2" for="name" >
              Name
            </label>

            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
              leading-tight focus:outline-none focus:shadow-outline"
              name="name"
              id="name"
              type="text"
              placeholder="Enter your name"
              v-model="name"
              >
            
          </p>
          <p class="mb-4">
            <label class="block font-bold mb-2" for="email" >
              Email
              
            </label>

            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
              leading-tight focus:outline-none focus:shadow-outline"
              name="email"
              id="email"
              type="email"
              placeholder="Enter your email"
              v-model="email"
            >
          </p>
          <p class="mb-4">
            <label class="block font-bold mb-2" for="message">
              Message
              
            </label>

            <textarea
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
              leading-tight focus:outline-none focus:shadow-outline"
              name="message"
              id="message"
              placeholder="Enter your message"
              v-model="message"
            ></textarea>

          </p>
          <p class="flex items-center justify-between">
            <button
              class="bg-sky-500/40 hover:bg-sky-500/80 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              
            >
              Submit
            </button>
          </p>
          
        </form>
</template>

<script >

export default {
  data() {
    return {
      name: '',
      email: '',
      message: '',
    }
  },
}
</script>
