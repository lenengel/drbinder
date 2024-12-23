<template>
  <div class="main-wrap">
    <main-header :invert="invert"/>
    <div class="container-wrap" :class="{ 'scroll-nav-content' : navScroll }">
      <slot />
    </div>
    <main-footer />
  </div>
</template>

<style lang="scss" scoped>
.main-wrap {
  position: relative;
  width: 100%;
  overflow: hidden;
  @include palette-text-primary;
  .v-theme--dark & {
    background-color: $dark-background-default;
  }
  .v-theme--light & {
    background-color: $light-background-paper;
  }
}
</style>

<script setup>
import MainHeader from '@/components/Header';
import MainFooter from '@/components/Footer';

const { invert, navScroll } = defineProps({
  invert: {
    type: Boolean,
    default: false,
  },
  navScroll: {
    type: Boolean,
    default: false,
  }
});
</script>