/* eslint-disable prettier/prettier */
import Slider from "@/components/slider";
import { Color, EngineName } from "@/types/enums";
import {
	MenuItem,
	Select,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	FormControl,
	InputLabel,
	OutlinedInput,
	DialogActions,
	Typography,
	Grid,
	FormGroup,
	FormControlLabel,
	Switch,
} from "@mui/material";
import { useAtomLocalStorage } from "@/hooks/useAtomLocalStorage";
import { useAtom, useSetAtom } from "jotai";
import {
	engineSkillLevelAtom,
	playerColorAtom,
	isGameInProgressAtom,
	gameAtom,
	enginePlayNameAtom,
} from "../states";
import { useChessActions } from "@/hooks/useChessActions";
import { playGameStartSound } from "@/lib/sounds";
import { Stockfish16 } from "@/lib/engine/stockfish16";
import { useEffect } from "react";

interface Props {
	open: boolean;
	onClose: () => void;
}

export default function GameSettingsDialog({ open, onClose }: Props) {
	const [skillLevel, setSkillLevel] = useAtomLocalStorage(
		"engine-skill-level",
		engineSkillLevelAtom
	);
	const [engineName, setEngineName] = useAtomLocalStorage(
		"engine-play-name",
		enginePlayNameAtom
	);
	const [playerColor, setPlayerColor] = useAtom(playerColorAtom);
	const setIsGameInProgress = useSetAtom(isGameInProgressAtom);
	const { reset: resetGame } = useChessActions(gameAtom);

	const handleGameStart = () => {
		onClose();
		resetGame({
			whiteName:
				playerColor === Color.White ? "You" : `Stockfish level ${skillLevel}`,
			blackName:
				playerColor === Color.Black ? "You" : `Stockfish level ${skillLevel}`,
		});
		playGameStartSound();
		setIsGameInProgress(true);
	};

	useEffect(() => {
		if (!Stockfish16.isSupported()) {
			setEngineName(EngineName.Stockfish11);
		}
	}, [setEngineName]);

	return (
		<Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
			<DialogTitle marginY={1} variant="h5">
				Set game parameters
			</DialogTitle>
			<DialogContent sx={{ paddingBottom: 0 }}>
				<Typography>
					Stockfish 16 Lite (HCE) is the default engine. It offers the best
					balance between speed and strength. Stockfish 16 is the strongest
					engine available, but please note that it requires a one time download
					of 40MB.
				</Typography>
				<Grid
					marginTop={4}
					item
					container
					justifyContent="center"
					alignItems="center"
					xs={12}
					rowGap={3}
				>
					<Grid item container xs={12} justifyContent="center">
						<FormControl variant="outlined">
							<InputLabel id="dialog-select-label">Bot's engine</InputLabel>
							<Select
								labelId="dialog-select-label"
								id="dialog-select"
								displayEmpty
								input={<OutlinedInput label="Engine" />}
								value={engineName}
								onChange={(e) => setEngineName(e.target.value as EngineName)}
								sx={{ width: 280, maxWidth: "100%" }}
							>
								{Object.values(EngineName).map((engine) => (
									<MenuItem
										key={engine}
										value={engine}
										disabled={
											engine.includes("stockfish_16")
												? !Stockfish16.isSupported()
												: false
										}
									>
										{engineLabel[engine]}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>

					<Slider
						label="Bot skill level"
						value={skillLevel}
						setValue={setSkillLevel}
						min={1}
						max={21}
						marksFilter={2}
					/>

					<FormGroup>
						<FormControlLabel
							control={
								<Switch
									color="default"
									checked={playerColor === Color.White}
									onChange={(e) => {
										setPlayerColor(
											e.target.checked ? Color.White : Color.Black
										);
									}}
								/>
							}
							label={
								playerColor === Color.White
									? "You play as White"
									: "You play as Black"
							}
						/>
					</FormGroup>
				</Grid>
			</DialogContent>
			<DialogActions sx={{ m: 2 }}>
				<Button variant="outlined" sx={{ marginRight: 2 }} onClick={onClose}>
					Cancel
				</Button>
				<Button variant="contained" onClick={handleGameStart}>
					Start game
				</Button>
			</DialogActions>
		</Dialog>
	);
}

const engineLabel: Record<EngineName, string> = {
	[EngineName.Stockfish16]: "Stockfish 16 Lite (HCE)",
	[EngineName.Stockfish16NNUE]: "Stockfish 16 (40MB download)",
	[EngineName.Stockfish11]: "Stockfish 11",
};
