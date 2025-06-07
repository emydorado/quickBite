import { CircularProgress, Box, Typography } from '@mui/material';

const Loader = () => {
	return (
		<Box
			sx={{
				position: 'fixed',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				zIndex: 1000,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<CircularProgress
				size={60}
				thickness={5}
				sx={{
					color: '#8bc652',
					marginBottom: 2,
				}}
			/>
			<Typography
				variant='h6'
				sx={{
					color: '#333',
					fontWeight: 500,
					fontFamily: '"Radio Canada", sans-serif',
				}}
			>
				Loading...
			</Typography>
		</Box>
	);
};

export default Loader;
