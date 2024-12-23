<template>
  <v-container class="max-lg footer">
    <v-row class="spacing4">
      <v-col
        class="pa-4"
        md="3"
        cols="12"
      >
        <div class="logo">          
          <h6 class="use-text-subtitle2 font-weight-bold">
            {{ brand.medical.projectName }}
          </h6>          
        </div> 
        <ul>
          <li>
            Rottenhof 29
          </li>
          <li>
            3681 Hofamt Priel
          </li>
        </ul>               
      </v-col>
      <v-col
        class="pa-6"
        md="6"
        cols="12"
      >
        <v-row justify="space-around">
          <v-col cols="12">            
            
          </v-col>
        </v-row>
      </v-col>
      <v-col
        md="3"
        cols="12"
        class="pa-4"
      >
        <div class="socmed">   
          <v-btn
            text
            icon
            class="button"
          >
            <span class="ion-logo-linkedin icon" />
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <p v-if="isDesktop" class="body-2">
          &copy;&nbsp;
        {{ brand.medical.footerText }}
    </p>
  </v-container>
</template>

<style scoped lang="scss">
@import './footer-style';
</style>

<script>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useSwitchLocalePath } from "vue-i18n-routing";
import { setRtl } from "@/composables/uiTheme";
import logo from "@/assets/images/medical-logo.png";
import brand from "@/assets/text/brand";
import { navigateTo } from "#app";

export default {
	setup() {
		const switchLocalePath = useSwitchLocalePath();

		const i18n = useI18n();
		const curLang = i18n.locale.value;
		const lang = ref(curLang);

		function switchLang(locale) {
			navigateTo(switchLocalePath(locale));
			lang.value = locale;

			// Set RTL and Document attr
			document.documentElement.setAttribute("lang", locale);

			if (locale === "ar") {
				setRtl(true);
				document.documentElement.setAttribute("dir", "rtl");
			} else {
				setRtl(false);
				document.documentElement.setAttribute("dir", "ltr");
			}
		}

		return {
			curLang,
			switchLang,
			lang,
		};
	},
	data: () => ({
		logo,
		brand,
		footers: [
			{
				title: "Company",
				description: ["Team", "History", "Contact us", "Locations"],
				link: ["#team", "#history", "#contact-us", "#locations"],
			},
			{
				title: "Resources",
				description: [
					"Resource",
					"Resource name",
					"Another resource",
					"Final resource",
				],
				link: [
					"#resource",
					"#resource-name",
					"#another-resource",
					"#final-resource",
				],
			},
			{
				title: "Legal",
				description: ["Privacy policy", "Terms of use"],
				link: ["#privacy-policy", "#terms-of-use"],
			},
		],
	}),
	computed: {
		isDesktop() {
			const mdUp = this.$vuetify.display.mdAndUp;
			return mdUp;
		},
		isMobile() {
			const smDown = this.$vuetify.display.smAndDown;
			return smDown;
		},
		langList() {
			const list = [];
			const i18n = this.$i18n.locales;

			i18n.map((locale) => {
				list.push({
					title: this.$t("common." + locale.code),
					value: locale.code,
				});
				return false;
			});
			return list;
		},
	},
};
</script>
