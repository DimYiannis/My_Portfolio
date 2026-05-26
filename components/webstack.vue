<template>
  <!--Skills section-->
  <div class="mt-10 border-y-2 border-sky-500 group 
        hover:border-white grid desktop:border-0" >
        <div class="text-white text-3xl group-hover:text-sky-500/90 
        font-semibold text-center my-5 "
        >Web Stack</div>
  
        <div class="grid tablet:grid-cols-2 laptop:grid-cols-3
        place-items-center  font-bold
        text-white/40 text-4xl my-5
        gap-5 max-w-[1000px] justify-self-center">
  
          <div class="hover:text-white flex gap-2" >
            <p>HTML</p>
            <LogosHtml/>
          </div>
  
          <div class="hover:text-white flex gap-2">
            <p>JavaScript</p>
            <LogosJavascript/>
          </div>
  
          <div class="hover:text-white flex gap-2">
            <p>Vue js</p>
            <LogosVuejs/>
          </div>
  
          <div class="hover:text-white flex gap-2">
            <p>Nuxt 3</p>
            <LogosNuxtjs/>
          </div>
  
          <div class="hover:text-white flex gap-2">
            <p>Tailwind</p>
            <LogosTailwind/>
          </div>
  
          <div class="hover:text-white flex gap-2">
            <p>Node js</p>
            <LogosNodejs/>
          </div>
  
        </div>
  
      </div>
</template>

<script setup>
</script>
