/* eslint-disable prettier/prettier */
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";
import NavMenu from "./NavMenu";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import NavLink from "@/components/NavLink";
import Image from "next/image";

interface Props {
	darkMode: boolean;
	switchDarkMode: () => void;
}

export default function NavBar({ darkMode, switchDarkMode }: Props) {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const router = useRouter();

	useEffect(() => {
		setDrawerOpen(false);
	}, [router.pathname]);

	return (
		<Box sx={{ flexGrow: 1, display: "flex" }}>
			<AppBar
				position="static"
				sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
				enableColorOnDark
			>
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
						onClick={() => setDrawerOpen((val) => !val)}
					>
						<Icon icon="mdi:menu" />
					</IconButton>
					<Image
						src="/favicon-32x32.png"
						alt="FreeChess logo"
						width={32}
						height={32}
					/>
					<NavLink href="/">
						<Typography
							variant="h6"
							component="div"
							sx={{ flexGrow: 1, ml: 1 }}
						>
							Analyse Chess
						</Typography>
					</NavLink>
					<IconButton
						color="inherit"
						sx={{ ml: 1 }}
						onClick={() =>
							window.open("https://github.com/vilakshan-gupta/Analyse-Chess")
						}
					>
						<Icon icon="mdi:github" />
					</IconButton>
					<IconButton sx={{ ml: 1 }} onClick={switchDarkMode} color="inherit">
						{darkMode ? (
							<Icon icon="mdi:brightness-7" />
						) : (
							<Icon icon="mdi:brightness-4" />
						)}
					</IconButton>
				</Toolbar>
			</AppBar>
			<NavMenu open={drawerOpen} onClose={() => setDrawerOpen(false)} />
		</Box>
	);
}
