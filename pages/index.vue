<template>
  <div class="min-h-screen bg-dark-gray text-white">
    <header class="p-4">
      <nav class="flex justify-between items-center">
        <h1 class="text-2xl font-bold">Yiannis Dimitrakopoulos</h1>
        <ul class="flex space-x-4">
          <li>
            <NuxtLink
              to="https://github.com/DimYiannis"
              class="text-white/40 hover:text-sky-500"
            >
              <LogosGithub />
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="https://www.linkedin.com/in/dim-yiannis/"
              class="text-white/40 hover:text-sky-500"
            >
              <LogosLinkein />
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </header>

    <main class="container mx-auto px-4 py-8">
      <section class="mb-16 flex flex-col md:flex-row items-center">
        <div class="md:w-2/3 pr-8">
          <h2 class="text-4xl font-bold mb-4 text-animation">
            “Talk is cheap. Show me the code.” — Linus Torvalds
          </h2>
          <p class="mb-4">Currently based in Thessaloniki, Greece.</p>
          <div class="flex space-x-4 mb-4">
            <NuxtLink
              to="https://github.com/DimYiannis"
              class="bg-white text-black px-4 py-2 rounded"
            >
              Latest work on Github
            </NuxtLink>
            <a
              href="/DimYiannis_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              class="border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition-colors duration-300 inline-block"
            >
              View CV
            </a>
          </div>
          <div class="flex space-x-2">
            <span class="w-4 h-4 bg-blue-500 rounded-full"></span>
            <span class="w-4 h-4 bg-red-500 rounded-full"></span>
            <span class="w-4 h-4 bg-yellow-500 rounded-full"></span>
            <span class="w-4 h-4 bg-green-500 rounded-full"></span>
            <span class="w-4 h-4 bg-purple-500 rounded-full"></span>
            <span class="w-4 h-4 bg-pink-500 rounded-full"></span>
          </div>
        </div>
        <div class="md:w-1/3 mt-8 md:mt-0">
          <img
            src="/profile.jpeg"
            alt="Your Name"
            class="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section class="mb-16">
        <h3 class="text-2xl font-bold mb-4">PROJECTS</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10">
          <div
            v-for="project in projects"
            :key="project.id"
            class="bg-light-gray p-4 rounded"
          >
            <img
              :src="project.img"
              :alt="project.title"
              class="w-full h-48 object-cover mb-4 rounded"
            />
            <h4 class="text-xl font-semibold mb-2">{{ project.title }}</h4>
            <p class="text-sm mb-4">{{ project.info }}</p>
            <div class="flex space-x-4">
              <a
                :href="project.url"
                target="_blank"
                rel="noopener noreferrer"
                class="bg-white text-black px-3 py-1 rounded text-sm"
                >View Live</a
              >
              <a
                :href="project.giturl"
                target="_blank"
                rel="noopener noreferrer"
                class="border border-white px-3 py-1 rounded text-sm"
                >GitHub</a
              >
            </div>
          </div>
        </div>
        <NuxtLink
          to="https://github.com/DimYiannis?tab=repositories"
          class="mt-4 border border-white px-4 py-2 rounded"
        >
          View more on Github
        </NuxtLink>
      </section>

      <section class="mb-16">
        <h3 class="text-2xl font-bold mb-4">
          EXPERTISE IN WEB DEVELOPMENT TECHNOLOGIES
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="stack in webstack" class="mb-4">
            <h4 class="font-bold">{{ stack.name }}</h4>
            <component :is="stack.logo" class="mb-2" />
            <p class="text-sm text-gray-400">{{ stack.expertise }}</p>
          </div>
        </div>
      </section>

      <section>
        <h3 class="text-4xl font-bold mb-4">GET IN TOUCH</h3>
        <p class="mb-4">
          Let's talk about your project and how I can help you.t
        </p>
        <button
          @click="emailMe"
          class="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition-colors duration-300"
        >
          Email me
        </button>
      </section>
    </main>

    <footer class="mt-16 p-4 flex justify-between items-center">
      <p>© 2024 Yiannis Dimitrakopoulos</p>
      <ul class="flex space-x-4">
        <li>
          <NuxtLink
            to="https://github.com/DimYiannis"
            class="text-white/40 hover:text-sky-500"
          >
            <LogosGithub />
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="https://www.linkedin.com/in/dim-yiannis/"
            class="text-white/40 hover:text-sky-500"
          >
            <LogosLinkein />
          </NuxtLink>
        </li>
      </ul>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { shallowRef } from "vue";
import NodejsLogo from "~/components/Logos/Nodejs.vue";
import JavascriptLogo from "~/components/Logos/Javascript.vue";
import NuxtjsLogo from "~/components/Logos/Nuxtjs.vue";
import TailwindLogo from "~/components/Logos/Tailwind.vue";
import VuejsLogo from "~/components/Logos/Vuejs.vue";
import Html5Logo from "~/components/Logos/Html.vue";

const projects = [
  {
    id: "Arts Gallery",
    img: "https://github.com/user-attachments/assets/1a553256-cba0-424f-b2b7-afd32ccd3598",
    url: "https://artsygallery.netlify.app",
    giturl: "https://github.com/DimYiannis/Arts",
    title: "A diverse collection of artworks.",
    info: "Built with HTMX, Javascript, Tailwind CSS and HTML5",
  },
  {
    id: "AugustsV2",
    img: "https://github.com/user-attachments/assets/f4ccc3d2-bb85-406d-a0c1-a17d45d8001c",
    url: "https://augustsv2.netlify.app/",
    giturl: "https://github.com/DimYiannis/Augusts",
    title: "Augusts οnline clothing store.",
    info: "Built with Nuxt.js, Pinia, Tailwind CSS and Node.js",
  },
  {
    id: "Academia",
    img: "https://github.com/DimYiannis/academia_v2/assets/107484245/2afc226c-cf6f-46ed-9cf6-28d7f148cf2e",
    url: "https://academiav2.netlify.app/",
    giturl: "https://github.com/DimYiannis/academia_v2",
    title: "A social platform for scientific posts.",
    info: "Built with Nuxt 3, Tailwind CSS and Node.js",
  },
  {
    id: "Meet-in-Thessaloniki",
    img: "https://repository-images.githubusercontent.com/605200372/253f22e6-55ad-4449-a55d-3cd0ff5746a7",
    url: "https://meet-in-thessaloniki.netlify.app/",
    giturl: "https://github.com/DimYiannis/Meet-in-Thessaloniki",
    title: "Tourist guide website.",
    info: "Built with Nuxt 3 and Tailwind CSS",
  },
];

const webstack = shallowRef([
  {
    name: "Node.js",
    logo: NodejsLogo,
    expertise: "Backend Development",
  },
  {
    name: "JavaScript",
    logo: JavascriptLogo,
    expertise: "Frontend & Backend Scripting",
  },
  {
    name: "Nuxt.js",
    logo: NuxtjsLogo,
    expertise: "Server-Side Rendering & Static Site Generation",
  },
  {
    name: "Tailwind CSS",
    logo: TailwindLogo,
    expertise: "Utility-First CSS Framework",
  },
  {
    name: "Vue.js",
    logo: VuejsLogo,
    expertise: "Progressive JavaScript Framework",
  },
  {
    name: "HTML5",
    logo: Html5Logo,
    expertise: "Markup Language",
  },
]);

const redirectToLinkedIn = () => {
  window.open("https://linkedin.com/in/dim-yiannis", "_blank");
};

const downloadCV = () => {
  // Create a link element
  const link = document.createElement("a");
  // Set the href to the path of your CV file
  link.href = "/DimYiannis_CV.pdf";
  // Set the download attribute
  link.download = "DimYiannis_CV.pdf";
  // Append to the body
  document.body.appendChild(link);
  // Trigger the download
  link.click();
  // Clean up
  document.body.removeChild(link);
};

const emailMe = () => {
  const email = "yiannisdimitrakopoulos@yahoo.com";
  const subject = "Project Inquiry";
  const body = "Hello Yiannis,\n\nI would like to discuss a project with you.";

  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoLink;
};

</script>
