<template>
  <div class="hero-content">
    <hidden point="smUp">
      <figure class="mobile-cover">
        <img :src="cover" alt="Dr. Binder Office" />
      </figure>
    </hidden>
    <v-container :class="{ 'fixed-width': mdUp }">
      <v-row>
        <v-col cols="12" md="6">
          <div class="banner-text">
            <div class="title">
              <h3 class="text-helper use-text-title">
                {{ $t('medicalLanding.banner_title') }}
              </h3>
            </div>
            <h5 class="subtitle use-text-subtitle2">
              {{ $t('medicalLanding.banner_subtitle') }}
            </h5>
            <v-card class="search-banner">
              <v-text-field
                :label="isMobile2 ? 'Search...' : 'Search doctor, medicines or clinic...'"
                class="search"
                hide-details
                variant="filled"
              />
              <div class="action">
                <v-btn class="button" color="secondary">
                  <v-icon v-if="isMobile" class="icon">
                    mdi-magnify
                  </v-icon>
                  <span v-if="isDesktop">
                    {{ $t('medicalLanding.banner_search') }}
                  </span>
                </v-btn>
              </div>
            </v-card>
          </div>
        </v-col>
        <v-col
          v-if="isTablet"
          md="6"
          cols="12"
          class="pa-6 visual-content"
        >
          <div class="deco-banner">
            <div class="menu-bg" />
          </div>
          <div class="image-wrap">
            <div class="image-figure">
              <div class="inner-figure">
                <img :src="cover" alt="Dr. Binder Office" />
              </div>
            </div>
          </div>
          <div class="parallax-banner">
            <dots-parallax />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
@import './banner-style.scss';
</style>

<script>
import imgAPI from "@/assets/images/imgAPI";
import DotsParallax from "../Parallax/Dots";
import Hidden from "../Hidden";

export default {
	components: {
		Hidden,
		DotsParallax,
	},
	data() {
		return {
			cover: imgAPI.medical[0], // Using drbinder.png
		};
	},
	computed: {
		mdUp() {
			const mdUp = this.$vuetify.display.mdAndUp;
			return mdUp;
		},
		isDesktop() {
			const lgUp = this.$vuetify.display.lgAndUp;
			return lgUp;
		},
		isTablet() {
			const smUp = this.$vuetify.display.smAndUp;
			return smUp;
		},
		isMobile() {
			const mdDown = this.$vuetify.display.mdAndDown;
			return mdDown;
		},
		isMobile2() {
			const xsDown = this.$vuetify.display.smAndDown;
			return xsDown;
		},
	},
};
</script>
