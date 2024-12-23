<template>
  <v-app-bar
    id="header"
    v-scroll="handleScroll"
    :class="{ fixed: fixed, 'open-drawer': openDrawer }"
    class="header"
    app
  >
    <v-container :class="{ 'fixed-width': mdUp }">
      <div class="header-content">
        <nav
          :class="{ invert: invert }"
          class="nav-logo"
        >
          <div class="logo">
            <nuxt-link
              v-if="invert"
              :to="localePath(link.medical.home)"
            >
              <img
                :src="logo"
                alt="logo"
              >
              {{ brand.medical.name }}
            </nuxt-link>
            <span v-if="!invert && loaded">
              <a
                v-smooth-scroll="{ offset: 100 }"
                href="#home"
                class="anchor-link scrollactive-item"
              >
                <img
                  :src="logo"
                  alt="logo"
                >
                {{ brand.medical.name }}
              </a>
            </span>
          </div>
        </nav>
        <nav
          :class="{ invert: invert }"
          class="nav-menu"
        >
          
        </nav>
      </div>
    </v-container>
  </v-app-bar>
</template>

<style lang="scss" scoped>
@import './header-style.scss';
</style>

<script>
import { inject } from "vue";
import logo from "@/assets/images/medical-logo.png";
import link from "@/assets/text/link";
import brand from "@/assets/text/brand";
import { useRouter } from "#app";
import { useLocalePath } from "#imports";
import navMenu from "./menu";
import Settings from "./Settings";
import MobileMenu from "./MobileMenu";

let counter = 0;
function createData(name, url, offset) {
	counter += 1;
	return {
		id: counter,
		name,
		url,
		offset,
	};
}

export default {
	components: {
		"setting-menu": Settings,
		MobileMenu,
	},
	props: {
		invert: {
			type: Boolean,
			default: false,
		},
	},
	setup() {
		const localePath = useLocalePath();
		const smoothScroll = inject("smoothScroll");
		function scrollToMyEl(elemId) {
			const myEl = document.getElementById(elemId);
			const router = useRouter();

			router.push(`#${elemId}`);
			smoothScroll({
				scrollTo: myEl, // scrollTo is also allowed to be number
				hash: `#${elemId}`, // required if updateHistory is true
				offset: -100,
			});
		}

		return {
			scrollToMyEl,
			localePath,
		};
	},
	data() {
		return {
			logo,
			link,
			loaded: false,
			brand,
			sections: {},
			fixed: false,
			openDrawer: null,
			navOffset: 20,
			activeMenu: "",
			menuList: [createData(navMenu[0], "#" + navMenu[0])],
		};
	},
	computed: {
		isMobile() {
			const smDown = this.$vuetify.display.smAndDown;
			return smDown;
		},
		isDesktop() {
			const mdUp = this.$vuetify.display.mdAndUp;
			return mdUp;
		},
		mdUp() {
			const mdUp = this.$vuetify.display.mdAndUp;
			return mdUp;
		},
	},
	mounted() {
		this.loaded = true;
		const id = window.location.hash;
		const content = id.replace("#", "");
		const element = document.getElementById(content);
		if (element) {
			element.scrollIntoView();
		}

		const section = document.querySelectorAll(".scroll-nav-content > *");
		Array.prototype.forEach.call(section, (e) => {
			this.sections[e.id] = e.offsetTop;
		});
	},
	methods: {
		handleScroll() {
			const scrollPosition =
				document.documentElement.scrollTop || document.body.scrollTop;
			const topPosition = scrollPosition + 100;

			Object.keys(this.sections).forEach((i) => {
				if (this.sections[i] <= topPosition) {
					this.activeMenu = i;
				}
			});

			if (scrollPosition > 70) {
				this.fixed = true;
			} else {
				this.fixed = false;
			}
		},
		handleToggleOpen() {
			this.openDrawer = !this.openDrawer;
		},
	},
};
</script>
