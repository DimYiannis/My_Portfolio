<template>
  <div class="bg-gradient-to-r from-[#1a1919f6] to-[#3a3737f6] h-full w-screen">
    <!--Header-->
    <header class="w-screen tablet:px-4 laptop:px-32">
      <nav
        class="bg-transparent w-full flex flex-col mobile:flex-row mobile:justify-around tablet:justify-between justify-self-center pt-5 desktop:justify-around"
      >
        <div
          class="font-semibold text-white/40 hover:text-sky-500 text-xl justify-center flex cursor-pointer"
        >
          <NuxtLink to="https://github.com/DimYiannis"
            >Yiannis Dimitrakopoulos</NuxtLink
          >
        </div>

        <div class="flex gap-2 justify-center">
          <NuxtLink
            to="https://github.com/DimYiannis"
            class="text-white/40 hover:text-sky-500"
          >
            <LogosGithub />
          </NuxtLink>

          <NuxtLink
            to="https://www.linkedin.com/in/dim-yiannis/"
            class="text-white/40 hover:text-sky-500"
          >
            <LogosLinkein />
          </NuxtLink>
        </div>
      </nav>
    </header>

    <!--Hero section-->
    <HeroSection />

    <!--Skills section-->
    <webstack />

    <!--Projects-->
    <Projects />

    <!--Contact-->
    <div
      class="my-10 tablet:px-4 laptop:px-64 flex flex-col tablet:flex-row lgdesk:px-[550px] place-content-center desktop:justify-center"
    >
      <!--Contact details-->
      <div
        class="flex flex-col self-center tablet:self-start text-white text-center gap-10 my-10 w-1/2"
      >
        <h1 class="text-4xl font-semibold">Contact</h1>
        <h2 class="">
          Don't hesitate to contact me, i would love to help and contribute.
          <br />
          Please fill in the form and i will reach out to you as soon as
          possible. <br />
          Thank you for considering me for your project, i look forward to the
          possibility of working with you.
        </h2>
      </div>

      <!--Contact form-->
      <div
        id="contact"
        class="m-5 text-white w-full tablet:w-1/2 flex self-center"
      >
        <ContactForm />
      </div>
    </div>

    <!--Footer-->
    <div>
      <div
        class="bg-transparent w-full flex flex-col mobile:flex-row mobile:justify-around justify-self-center py-5 desktop:justify-around"
      >
        <div
          class="font-semibold text-white/40 hover:text-sky-500 justify-center flex"
        >
          <NuxtLink to="https://www.linkedin.com/in/dim-yiannis/"
            >Yiannis Dimitrakopoulos</NuxtLink
          >
        </div>

        <div class="flex gap-2 justify-center">
          <NuxtLink
            to="https://github.com/DimYiannis"
            class="text-white/40 hover:text-sky-500"
          >
            <LogosGithub />
          </NuxtLink>

          <NuxtLink
            to="https://www.linkedin.com/in/dim-yiannis/"
            class="text-white/40 hover:text-sky-500"
          >
            <LogosLinkein />
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
      open: false,
    };
  },
};
</script>

<style>
/* Tooltip styles */
[v-show] {
  opacity: 0;
  transition: opacity 1s ease;
}
[v-show].active {
  opacity: 1;
}
</style>