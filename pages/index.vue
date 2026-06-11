<script setup lang="ts">
import { shallowRef } from "vue";
import NodejsLogo from "~/components/Logos/Nodejs.vue";
import NuxtjsLogo from "~/components/Logos/Nuxtjs.vue";
import TailwindLogo from "~/components/Logos/Tailwind.vue";
import VuejsLogo from "~/components/Logos/Vuejs.vue";
import JavascriptLogo from "~/components/Logos/Javascript.vue";
import PythonLogo from "~/components/Logos/Python.vue";
import ClangLogo from "~/components/Logos/Clang.vue";
import SupabaseLogo from "~/components/Logos/Supabase.vue";

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  live?: string;
  github: string;
  image?: string;
  snippet?: string; // shown on a code-style card when there is no screenshot
}

const projects: Project[] = [
  {
    id: "ema",
    title: "EMA — Real-Time Voice Intelligence",
    description:
      "Real-time voice assistant with live transcription and LLM responses.",
    tags: ["Nuxt.js", "TypeScript", "Three.js", "Whisper", "Llama 3.3", "Supabase"],
    live: "https://ema-ii.vercel.app",
    github: "https://github.com/DimYiannis/ema",
    image: "/previews/ema.jpg",
  },
  {
    id: "call-me-maybe",
    title: "call me maybe — LLM Function Calling",
    description:
      "Function calling for LLMs via constrained decoding — masks invalid tokens at the logit level so a 0.6B model emits 100% schema-compliant JSON.",
    tags: ["Python", "Qwen3", "Constrained Decoding", "LLM"],
    github: "https://github.com/DimYiannis/call_me_maybe",
    image: "/previews/call-me-maybe.svg",
  },
  {
    id: "medlake",
    title: "Medlake Training — Website Redesign",
    description:
      "Freelance redesign for a Swiss medical fitness centre — cinematic 3D hero, CMS, and automatic multilingual support (DE·EN·FR·IT).",
    tags: ["Nuxt 3", "Three.js", "Tailwind CSS", "Supabase", "DeepL"],
    live: "https://medlake.vercel.app",
    github: "https://github.com/DimYiannis/medlake",
    image: "/previews/medlake.jpg",
  },
  {
    id: "codexion",
    title: "Codexion — Concurrency Simulation",
    description:
      "Dining-philosophers variant in C: threads compete for shared resources under FIFO or earliest-deadline-first scheduling, with burnout deadlines.",
    tags: ["C", "POSIX Threads", "Mutexes", "Scheduling"],
    github: "https://github.com/DimYiannis/codexion",
    image: "/previews/codexion.svg",
  },
  {
    id: "academia",
    title: "Academia — AI Research Feed",
    description:
      "Daily AI research feed — arXiv and HuggingFace papers in one place.",
    tags: ["Nuxt 3", "Tailwind CSS", "Node.js"],
    live: "https://academiav2.netlify.app",
    github: "https://github.com/DimYiannis/academia_v2",
    image: "/previews/academia.jpg",
  },
  {
    id: "flyin",
    title: "Fly-in — Drone Routing Simulation",
    description:
      "Routes a fleet of drones through connected zones using Dijkstra's algorithm and a turn-by-turn simulation engine with capacity constraints.",
    tags: ["Python", "Dijkstra", "Simulation"],
    github: "https://github.com/DimYiannis/-Fly-in",
    image: "/previews/flyin.jpg",
  },
];

const webstack = shallowRef([
  { name: "Vue.js", logo: VuejsLogo },
  { name: "Nuxt 3", logo: NuxtjsLogo },
  { name: "JavaScript", logo: JavascriptLogo },
  { name: "Tailwind CSS", logo: TailwindLogo },
  { name: "Node.js", logo: NodejsLogo },
  { name: "Supabase", logo: SupabaseLogo },
  { name: "Python", logo: PythonLogo },
  { name: "C", logo: ClangLogo },
]);

const emailMe = () => {
  const email = "yiannisdimitrakopoulos@yahoo.com";
  const subject = "Project Inquiry";
  const body = "Hello Yiannis,\n\nI would like to discuss a project with you.";
  window.location.href = `mailto:${email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
};

useHead({
  title: "Yiannis Dimitrakopoulos — Software Developer",
  meta: [
    {
      name: "description",
      content:
        "Portfolio of Yiannis Dimitrakopoulos, software developer and Codam College (42 Network) student in Amsterdam.",
    },
  ],
});
</script>

<template>
  <div class="min-h-screen bg-dark-gray text-white">
    <!-- Header -->
    <header class="mx-auto max-w-5xl px-6 py-6">
      <nav class="flex items-center justify-between">
        <h1 class="text-xl font-bold tracking-tight sm:text-2xl">
          Yiannis Dimitrakopoulos
        </h1>
        <ul class="flex items-center space-x-4">
          <li>
            <NuxtLink
              to="https://github.com/DimYiannis"
              target="_blank"
              class="text-white/40 transition-colors hover:text-sky-500"
            >
              <LogosGithub />
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="https://www.linkedin.com/in/dim-yiannis/"
              target="_blank"
              class="text-white/40 transition-colors hover:text-sky-500"
            >
              <LogosLinkedin />
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </header>

    <main class="mx-auto max-w-5xl px-6 py-10">
      <!-- Hero -->
      <section class="mb-20 flex flex-col items-center gap-10 md:flex-row">
        <div class="md:w-2/3 md:pr-8">
          <h2 class="mb-4 text-3xl font-bold leading-tight sm:text-4xl">
            Software Developer with a focus on building projects and learning
            new skills along the way.
          </h2>
          <p class="mb-6 text-white/60">
            Studying at Codam College (42 Network) — currently based in
            Amsterdam, NL.
          </p>
          <div class="mb-6 flex flex-wrap gap-4">
            <NuxtLink
              to="https://github.com/DimYiannis"
              target="_blank"
              class="rounded bg-white px-4 py-2 font-medium text-black transition-colors hover:bg-gray-200"
            >
              Latest work on Github
            </NuxtLink>
            <a
              href="/DimYiannis_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-block rounded border border-white px-4 py-2 transition-colors duration-300 hover:bg-white hover:text-black"
            >
              View CV
            </a>
          </div>
          <div class="flex space-x-2">
            <span class="h-4 w-4 rounded-full bg-blue-500"></span>
            <span class="h-4 w-4 rounded-full bg-red-500"></span>
            <span class="h-4 w-4 rounded-full bg-yellow-500"></span>
            <span class="h-4 w-4 rounded-full bg-green-500"></span>
            <span class="h-4 w-4 rounded-full bg-purple-500"></span>
            <span class="h-4 w-4 rounded-full bg-pink-500"></span>
          </div>
        </div>
        <div class="md:w-1/3">
          <img
            src="/profile.jpeg"
            alt="Yiannis Dimitrakopoulos"
            class="h-auto w-full rounded-lg shadow-lg"
          />
        </div>
      </section>

      <!-- Projects -->
      <section class="mb-20">
        <h3 class="mb-6 text-2xl font-bold tracking-wide">PROJECTS</h3>
        <div class="grid grid-cols-1 gap-6 pb-8 md:grid-cols-2">
          <article
            v-for="project in projects"
            :key="project.id"
            class="group flex flex-col overflow-hidden rounded-lg bg-light-gray transition-transform duration-300 hover:-translate-y-1"
          >
            <a
              :href="project.live ?? project.github"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                v-if="project.image"
                :src="project.image"
                :alt="`Screenshot of ${project.title}`"
                loading="lazy"
                class="h-48 w-full object-cover object-top transition-opacity group-hover:opacity-90"
              />
              <div
                v-else
                class="flex h-48 w-full items-center justify-center bg-gradient-to-br from-[#1a1a2e] to-[#16213e] px-6"
              >
                <pre
                  class="whitespace-pre-wrap text-sm leading-relaxed text-sky-400/80"
                ><code>{{ project.snippet }}</code></pre>
              </div>
            </a>
            <div class="flex flex-1 flex-col p-4">
              <h4 class="mb-2 text-xl font-semibold">{{ project.title }}</h4>
              <p class="mb-3 text-sm text-white/60">
                {{ project.description }}
              </p>
              <ul class="mb-4 flex flex-wrap gap-1.5">
                <li
                  v-for="tag in project.tags"
                  :key="tag"
                  class="rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-white/50"
                >
                  {{ tag }}
                </li>
              </ul>
              <div class="mt-auto flex space-x-4">
                <a
                  v-if="project.live"
                  :href="project.live"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="rounded bg-white px-3 py-1 text-sm font-medium text-black transition-colors hover:bg-gray-200"
                >
                  View Live
                </a>
                <a
                  :href="project.github"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="rounded border border-white px-3 py-1 text-sm transition-colors hover:bg-white hover:text-black"
                >
                  GitHub
                </a>
              </div>
            </div>
          </article>
        </div>
        <NuxtLink
          to="https://github.com/DimYiannis?tab=repositories"
          target="_blank"
          class="rounded border border-white px-4 py-2 transition-colors hover:bg-white hover:text-black"
        >
          View more on Github
        </NuxtLink>
      </section>

      <!-- Skills -->
      <section class="mb-20">
        <h3 class="mb-6 text-2xl font-bold tracking-wide">
          TECHNOLOGIES I WORK WITH
        </h3>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="stack in webstack"
            :key="stack.name"
            class="flex flex-col items-center gap-3 rounded-lg bg-light-gray p-6"
          >
            <component :is="stack.logo" />
            <h4 class="font-bold">{{ stack.name }}</h4>
          </div>
        </div>
      </section>

      <!-- Contact -->
      <section>
        <h3 class="mb-4 text-4xl font-bold">GET IN TOUCH</h3>
        <p class="mb-4 text-white/60">
          Let's talk about your project and how I can help you.
        </p>
        <button
          @click="emailMe"
          class="rounded bg-white px-4 py-2 font-medium text-black transition-colors duration-300 hover:bg-gray-200"
        >
          Email me
        </button>
      </section>
    </main>

    <!-- Footer -->
    <footer class="mx-auto mt-16 flex max-w-5xl items-center justify-between px-6 py-6 text-white/60">
      <p>© {{ new Date().getFullYear() }} Yiannis Dimitrakopoulos</p>
      <ul class="flex space-x-4">
        <li>
          <NuxtLink
            to="https://github.com/DimYiannis"
            target="_blank"
            class="text-white/40 transition-colors hover:text-sky-500"
          >
            <LogosGithub />
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="https://www.linkedin.com/in/dim-yiannis/"
            target="_blank"
            class="text-white/40 transition-colors hover:text-sky-500"
          >
            <LogosLinkedin />
          </NuxtLink>
        </li>
      </ul>
    </footer>
  </div>
</template>
