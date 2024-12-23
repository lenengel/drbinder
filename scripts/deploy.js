import { Client } from "basic-ftp";
import * as fs from "node:fs";
import * as path from "node:path";
import "dotenv/config";

// Validate required environment variables
const requiredEnvVars = [
	"FTP_HOST",
	"FTP_USER",
	"FTP_PASSWORD",
	"FTP_REMOTE_DIR",
];
for (const envVar of requiredEnvVars) {
	if (!process.env[envVar]) {
		console.error(`Error: ${envVar} is not set in environment variables`);
		process.exit(1);
	}
}

async function uploadDirectory(client, localDir, remoteDir) {
	const files = fs.readdirSync(localDir);

	for (const file of files) {
		const localPath = path.join(localDir, file);
		const remotePath = path.join(remoteDir, file).replace(/\\/g, "/");

		if (fs.statSync(localPath).isDirectory()) {
			try {
				await client.ensureDir(remotePath);
				await uploadDirectory(client, localPath, remotePath);
			} catch (err) {
				console.error(`Error processing directory ${localPath}:`, err);
			}
		} else {
			try {
				await client.uploadFrom(localPath, remotePath);
				console.log(`Uploaded: ${remotePath}`);
			} catch (err) {
				console.error(`Error uploading ${localPath}:`, err);
			}
		}
	}
}

async function deploy() {
	const client = new Client();
	client.ftp.verbose = true;

	try {
		console.log("Connecting to FTP...");
		await client.access({
			host: process.env.FTP_HOST,
			user: process.env.FTP_USER,
			password: process.env.FTP_PASSWORD,
			secure: false,
		});

		console.log("Connected! Starting upload...");
		const localDir = path.join(process.cwd(), "dist");
		const remoteDir = process.env.FTP_REMOTE_DIR;

		await uploadDirectory(client, localDir, remoteDir);

		console.log("Deployment completed successfully!");
	} catch (err) {
		console.error("Error during deployment:", err);
		process.exit(1);
	} finally {
		client.close();
	}
}

deploy();
