import { favicons } from "favicons";
import * as fs from "node:fs";
import * as path from "node:path";

const SOURCE = "public/favicon.svg";
const DEST = "public/favicons";

// Ensure the destination directory exists
if (!fs.existsSync(DEST)) {
	fs.mkdirSync(DEST, { recursive: true });
}

// Configuration for favicon generation
const configuration = {
	path: "/favicons", // Path where the files will be made available from the website
	appName: "Dr. Binder",
	appShortName: "Dr. Binder",
	background: "#fff",
	theme_color: "#6bd6b8",
	icons: {
		android: true,
		appleIcon: true,
		appleStartup: false,
		favicons: true,
		windows: true,
		yandex: false,
	},
};

console.log("Generating favicons...");

// Generate favicons
favicons(SOURCE, configuration)
	.then(({ images, files }) => {
		// Save images
		for (const image of images) {
			fs.writeFileSync(path.join(DEST, image.name), image.contents);
			console.log(`Generated: ${image.name}`);
		}

		// Save files (manifest, browserconfig etc)
		for (const file of files) {
			fs.writeFileSync(path.join(DEST, file.name), file.contents);
			console.log(`Generated: ${file.name}`);
		}

		// Also copy the favicon.ico to public root for traditional support
		const faviconIco = images.find((img) => img.name === "favicon.ico");
		if (faviconIco) {
			fs.writeFileSync("public/favicon.ico", faviconIco.contents);
			console.log("Copied favicon.ico to public root");
		}

		console.log("Favicon generation completed successfully!");
	})
	.catch((error) => {
		console.error("Error generating favicons:", error);
		process.exit(1);
	});
