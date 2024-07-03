/* eslint-disable prettier/prettier */
import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link rel="icon" type="image/x-icon" href="/favicon.ico" />
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					// eslint-disable-next-line prettier/prettier
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<meta
					name="description"
					content="Chess app to play, view and analyze your chess games for free from anywhere with Stockfish !"
				/>

				{/* Balises OG (Facebook & Twitter) */}
				<meta property="og:type" content="website" />
				<meta property="og:title" content="AnalyseChess" />
				<meta property="og:site_name" content="" />
				<meta property="og:url" content="" />
				<meta property="og:image" content="" />
				<meta
					property="og:description"
					content="Chess app to play, view and analyze your chess games for free from anywhere with Stockfish !"
				/>

				{/* Balise Twitter */}
				<meta name="twitter:card" content="summary_large_image" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
