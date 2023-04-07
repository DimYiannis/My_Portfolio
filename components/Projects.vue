<template>
   <div class="grid mx-5 desktop:justify-around ">
      
      <div class="my-5">
        <h1 class="text-white text-4xl text-center mb-5">Projects</h1>
      </div>

      <div class="grid gap-5 tablet:grid-cols-2
      justify-center ">

        <div v-for="i in data" :key="i">
          <div class="flex place-content-center my-4">
            <img :src="i.img" 
            class="h-[200px] w-[200px]
            mobile:h-[200px] mobile:w-[350px]
            tablet:w-[400px] tablet:h-[300px] rounded-lg "/>
          </div>
            
          <div class="flex place-content-center gap-2 my-2
          font-semibold">

            <NuxtLink :to="i.url" 
              class="w-[60px] h-[30px] border-2 border-sky-500 
              bg-transparent hover:bg-sky-500 text-sky-500
            hover:text-black rounded-md text-center">
              Demo
          </NuxtLink>

          <NuxtLink :to="i.giturl"
          class="w-[50px] h-[30px] border-2 border-sky-500 
              bg-transparent hover:bg-sky-500 text-sky-500
            hover:text-black rounded-md text-center">
            Code
          </NuxtLink>

        </div>
            

           
        </div>

      </div>

    </div>
</template>


<script>
export default {
  data() {
    return {
      data: [
        {
          id: 'augusts-merch',
          img: 'https://repository-images.githubusercontent.com/578555983/e0afb375-2e1e-429b-a94c-8dba681297cc',
          url: 'https://dimyiannis.github.io/augusts-merch/',
          giturl:'https://github.com/DimYiannis/augusts-merch',
        },
        {
          id: 'Meet-in-Thessaloniki',
          img: 'https://repository-images.githubusercontent.com/605200372/253f22e6-55ad-4449-a55d-3cd0ff5746a7',
          url:'https://meet-in-thessaloniki.netlify.app/',
          giturl: 'https://github.com/DimYiannis/Meet-in-Thessaloniki',
        },
      ],
      
    }
  },
}
</script>
