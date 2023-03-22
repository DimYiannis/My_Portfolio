<template>
    <form class="min-w-max  mx-auto tablet:mx-20 "
    name="contact" 
    method="POST"
    data-netlify="true"
    data-netlify-honeypot="bot-field" 
    @submit.prevent="submitForm">
      
      <input type="hidden" name="form-name" value="contact"/>
      
          <div class="mb-4">
            <label class="block font-bold mb-2" for="name">
              Name
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter your name"
              v-model="name"
              >
          </div>
          <div class="mb-4">
            <label class="block font-bold mb-2" name="email">
              Email
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              v-model="email"
            >
          </div>
          <div class="mb-4">
            <label class="block font-bold mb-2" name="message">
              Message
            </label>
            <textarea
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="message"
              placeholder="Enter your message"
              v-model="message"
            ></textarea>
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-sky-500/40 hover:bg-sky-500/80 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              @click="submitForm"
            >
              Submit
            </button>
          </div>
          <div
            class="bg-sky-500/40 text-white rounded-lg p-3 mt-3"
            v-show="showTooltip"
          >
            Form submitted successfully!
          </div>
        </form>
</template>

<script>

export default {
  data() {
    return {
      name: '',
      email: '',
      message: '',
      showTooltip: false, // initialize to false
    }
  },
  methods: {
    submitForm() {
        // do something with the form data
        console.log(`Name: ${this.name}`);
        console.log(`Email: ${this.email}`);
        console.log(`Message: ${this.message}`);

        // Reset the form
        this.name = '';
        this.email = '';
        this.message = '';
        
        // show the tooltip
        this.showTooltip = true;

    // hide the tooltip after 3 seconds
    setTimeout(() => {
        this.showTooltip = false;
      }, 5000);
    },
    
  },
}
</script>