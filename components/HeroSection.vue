<template>
  <section class="py-16 px-4 sm:px-6 lg:px-8">
    <div
      class="w-screen desktop:justify-center flex h-max tablet:px-4 laptop:px-32 tablet:flex-row tablet:justify-between flex-col"
    >
      <!--Info-->
      <div class="text-white mt-10 flex flex-col gap-5">
        <h1
          class="text-5xl tablet:text-6xl text-center grid self-center tablet:self-start tablet:text-start"
        >
          Hey i am Yiannis. <br />
          Nice to meet you!
        </h1>

        <h2
          class="text-sm mobile:text-lg tablet:text-lg tablet:w-[500px] w-[250px] mobile:w-[420px] self-center tablet:self-start text-center tablet:text-start"
        >
          I am a web developer based in
          <a
            class="text-sky-400 after:content"
            href="https://www.google.com/maps/place/Θεσσαλονίκη/@40.6187484,22.9249924,11.72z/data=!4m6!3m5!1s0x14a838f41428e0ed:0x9bae715b8d574a9!8m2!3d40.6400629!4d22.9444191!16zL20vMGIybWM"
            target="_blank"
            >Thessaloniki</a
          >, Greece. <br />I have experience in developing web pages and
          applications with a focus on delivering quality and interactivity.
          <br />My passion for web development drives me to constantly learn and
          keep current with the latest trends and technologies in the field.
        </h2>

        <a
          href="#contact"
          @mouseover="open = true"
          @mouseleave="open = false"
          class="uppercase font-semibold underline decoration-sky-500/40 hover:decoration-sky-500 underline-offset-4 decoration-2 grid self-center"
          >Contact me
        </a>
        <contacttip v-if="open" />
        <Teleport to="body"> </Teleport>
      </div>

      <!--Heroimage-->
      <div class="grid justify-center order-first tablet:order-last">
        <blob />
      </div>
    </div>
  </section>
</template>

<script setup>

const scrollToContact = () => {
  const contactSection = document.getElementById('contact')
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>