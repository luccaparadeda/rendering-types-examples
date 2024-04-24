import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import staticPlugin from "@elysiajs/static";

interface MockImages {
	albumId: number;
	id: number;
	title: string;
	url: string;
	thumbnailUrl: string;
}

new Elysia()
	.use(staticPlugin())
	.use(html())
	.get("/html", () => {
		return `
        <html lang='en'>
            <head>
                <title>Hello World</title>
            </head>
            <body>
                <h1>Hello World</h1>
                <p>This is a simple HTML page</p>
                <span>Loading...</span>
                <script src="./public/js/index.js"></script>
            </body>
        </html>`;
	})
	.get("/", async () => {
		const testImages = await fetch(
			"https://jsonplaceholder.typicode.com/albums/1/photos",
		).then((res) => {
			console.log("Onde estou??");
			return res.json();
		});
		return `
            <html lang='en'>
                <head>
                    <title>Hello World</title>
                </head>
                <body>
                    <h1>Hello World</h1>
                    <p>This is a simple HTML page</p>
                    ${testImages.map((image: MockImages) => {
											return `<img key='${image.id}' src='${image.url}' alt='${image.title}' />`;
										})}
                </body>
            </html>`;
	})
	.listen(3000);
