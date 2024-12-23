<template>
  <theme-wrapper theme="fresh">
    <v-app>
      <main-container invert>
        <Error
          error-code="errObj.statusCode"
          :text="$t('common.404')"
        />
      </main-container>
    </v-app>
  </theme-wrapper>
</template>

<script>
import brand from './assets/text/brand';
import ThemeWrapper from './components/ThemeWrapper';
import MainContainer from './components/MainContainer';
import Error from './components/Error';
import { useHead, useError, defineNuxtComponent } from '#app';

export default defineNuxtComponent({
  components: {
    MainContainer,
    ThemeWrapper,
    Error,
  },
  setup() {
    const error = useError();
    const errObj = error._object.error;
    console.log(errObj);
    useHead({
      title: errObj.statusCode === 404
        ? brand.medical.name + ' - Not Found'
        : brand.medical.name + ' - An error occurred',
    });
  },
});
</script>
