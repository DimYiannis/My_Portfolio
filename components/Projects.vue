<template>
   <div class="grid mx-5 desktop:justify-around ">
      
      <div class="my-5">
        <h1 class="text-white text-4xl text-center mb-5">Projects</h1>
      </div>

      <div class="grid gap-5 tablet:grid-cols-2
      justify-center ">

        <div v-for="i in data" :key="i">
          <div class="flex place-content-center my-4 container ">
            
              <div class="grid group"> 
                <img :src="i.img" 
                  class="h-[200px] w-[200px]
                  mobile:w-[350px] laptop:w-[400px]
                   tablet:h-[300px] rounded-lg "/>
                  
                  <div class="absolute bg-black/80 z-10 
                  place-items-center justify-center 
                  h-[200px] w-[200px] flex gap-2
                  mobile:w-[350px] laptop:w-[400px]
                  tablet:h-[300px] rounded-lg text-white 
                  tablet:text-base text-sm                  
                  group-hover:opacity-100 opacity-0
                  transition ease-in-out delay-300">
                  
                  <NuxtLink :to="i.url" 
                    class="w-[60px] h-[30px] border-2 border-sky-500 
                    bg-transparent hover:bg-sky-500 text-sky-500
                  hover:text-black rounded-md text-center ">
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
            
          <div class="grid place-content-center gap-2 my-2
          font-semibold text-white text-lg">
            <h1>{{i.title}}</h1> 
            <h2 class="text-xs ">{{i.info}}</h2>
            

          </div>
                      
        </div>

      </div>

    </div>
</template>


<script>
export default {
  data() {
    return {
      showTip:false,
      data: [
      {
          id: 'AugustsV2',
          img: 'https://github.com/user-attachments/assets/f4ccc3d2-bb85-406d-a0c1-a17d45d8001c',
          url:'https://augustsv2.netlify.app/',
          giturl: 'https://github.com/DimYiannis/Augusts',
          title: 'Augusts οnline clothing store.',
          info: "Built with Nuxt.js, Pinia, Tailwind CSS and Node.js",
        },
      {
          id: 'Academia',
          img: 'https://github.com/DimYiannis/academia_v2/assets/107484245/2afc226c-cf6f-46ed-9cf6-28d7f148cf2e',
          url:'https://academiav2.netlify.app/',
          giturl: 'https://github.com/DimYiannis/academia_v2',
          title: 'A social platform for scientific posts.',
          info: 'Built with Nuxt 3, Tailwind CSS and Node.js',
        },
        {
          id: 'Meet-in-Thessaloniki',
          img: 'https://repository-images.githubusercontent.com/605200372/253f22e6-55ad-4449-a55d-3cd0ff5746a7',
          url:'https://meet-in-thessaloniki.netlify.app/',
          giturl: 'https://github.com/DimYiannis/Meet-in-Thessaloniki',
          title: 'Tourist guide website.',
          info: 'Built with Nuxt 3 and Tailwind CSS',
        },
      ],
      
    }
  },
}
</script>

