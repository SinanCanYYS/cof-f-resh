<script setup>
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <main>
    <Suspense>
      <div style="margin: auto; text-align: center">
        <img
          src="../../public/coffresh.png"
          alt="A description of your image"
          width="300"
          height="300"
          margin-bottom="200px"
        />

        <p style="color: brown; font-size: 32px">Welcome to</p>
        <p style="color: brown; font-size: 64px">Cof~f~resh</p>
      </div>
      <!-- <TheWelcome /> -->
    </Suspense>
  </main>
</template>
