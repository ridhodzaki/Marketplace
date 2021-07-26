<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div class="text-h3" style="opacity:.4">
        404 - Cari apa kak ?
      </div>
      <q-img class="q-mt-xl" src="http://media.tumblr.com/2aeabc950dfb112dbf417bb958697748/tumblr_inline_mw6o11bqfT1rwwk99.gif"/>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error404'
}
</script>
