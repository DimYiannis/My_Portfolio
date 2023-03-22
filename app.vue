<template>
  <div class="bg-gradient-to-r from-[#1a1919f6] to-[#3a3737f6] h-full w-screen">
    <!--Header-->
    <header class="w-screen tablet:px-4 laptop:px-32">
      <nav class="bg-transparent w-full flex flex-col mobile:flex-row 
      mobile:justify-around tablet:justify-between justify-self-center 
      py-5 desktop:justify-around ">
      
        <div class="font-semibold text-white/40 
        hover:text-sky-500 justify-center flex">
          <h1>Yiannis Dimitrakopoulos</h1>
        </div>

        <div class="flex gap-2 justify-center ">
          <NuxtLink to="https://github.com/DimYiannis"
          class="text-white/40 hover:text-sky-500">
            <LogosGithub/>
          </NuxtLink>

          <NuxtLink to="https://www.linkedin.com/in/dim-yiannis/"
          class="text-white/40  hover:text-sky-500">
            <LogosLinkein/>
          </NuxtLink>
        </div>
    
      </nav>
    </header>

    <!--Hero section-->
    <div class="w-screen desktop:justify-center flex h-max 
    tablet:px-4 laptop:px-32 
    tablet:flex-row tablet:justify-between flex-col">
        
      <!--Info-->
      <div class="text-white mt-10 flex flex-col gap-5">

        <h1 class="text-5xl tablet:text-6xl
        grid self-center tablet:self-start"
        >Hey i am Yiannis. <br> Nice to meet you! </h1>
        
        <h2 class="text-sm mobile:text-lg tablet:text-lg
        grid self-center tablet:self-start text-center tablet:text-start"
        >I am a frontend web developer based in Thessaloniki, Greece.
          <br> I am passionate about building interactive web pages and apps.
          <br>I love to learn and contribute. 
        </h2>

        <a href="#contact" 
          class="uppercase font-semibold underline 
          decoration-sky-500/40 hover:decoration-sky-500 
          underline-offset-4 decoration-2 grid self-center"
          >Contact me
        </a>

      </div>

      <!--Heroimage-->
      <div class="grid justify-center 
        order-first tablet:order-last">
        <blob/>
      </div>

    </div>

    <!--Skills section-->
    <div class="mt-10 border-y-2 border-sky-500 group 
      hover:border-white grid lgdesk:border-0" >
      <div class="text-white text-3xl group-hover:text-sky-500/90 
      font-semibold text-center my-5 "
      >Web Stack</div>

      <div class="grid tablet:grid-cols-2 laptop:grid-cols-3
      place-items-center  font-bold
      text-white/40 text-4xl my-5
      gap-5 max-w-[1000px] justify-self-center">

        <div class="hover:text-white" >
          <p>HTML</p>
        </div>

        <div class="hover:text-white">
          <p>JavaScript</p>
        </div>

        <div class="hover:text-white">
          <p>Vue js</p>
        </div>

        <div class="hover:text-white">
          <p>Nuxt 3</p>
        </div>

        <div class="hover:text-white">
          <p>Tailwind</p>
        </div>

        <div class="hover:text-white">
          <p>Figma</p>
        </div>

      </div>

    </div>

    <!--Projects-->
    <Projects/>

    <!--Contact-->
    <div class="my-10 tablet:px-4 laptop:px-64 flex flex-col 
    tablet:flex-row lgdesk:px-[550px] 
    place-content-center desktop:justify-center ">

      
      <!--Contact details-->
      <div class="flex flex-col self-center tablet:self-start  
        text-white text-center gap-10 my-10 w-1/2">
        <h1 class="text-4xl font-semibold">Contact</h1>
        <h2 class="">Don't hesitate to contact me, i would love to help and contribute.
          <br> Please fill in the form and i will reach out to you as soon as possible.
        </h2>
      </div>

      <!--Contact form-->
      <div id="contact" 
      class="m-5 text-white w-full tablet:w-1/2 flex 
      self-center ">
        <ContactForm/>
      </div>
      
    </div>
    
    <!--Footer-->
    <div>
      <div class="bg-transparent w-full flex flex-col mobile:flex-row 
      mobile:justify-around justify-self-center 
      py-5 desktop:justify-around">
      
        <div class="font-semibold text-white/40 
        hover:text-sky-500 justify-center flex">
          <h1>Yiannis Dimitrakopoulos</h1>
        </div>

        <div class="flex gap-2 justify-center ">
          <NuxtLink to="https://github.com/DimYiannis"
          class="text-white/40 hover:text-sky-500">
            <LogosGithub/>
          </NuxtLink>

          <NuxtLink to="https://www.linkedin.com/in/dim-yiannis/"
          class="text-white/40 hover:text-sky-500">
            <LogosLinkein/>
          </NuxtLink>
        </div>
    
      </div>
    </div>



  </div>
</template>


<style>
/* Tooltip styles */
[v-show] {
  opacity: 0;
  transition: opacity 0.3s ease;
}
[v-show].active {
  opacity: 1;
}


</style>