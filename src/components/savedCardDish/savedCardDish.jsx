import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, styled } from '@mui/material';
import SavedIcon from '../savedIcon/savedIcon';

const StyledCard = styled(Card)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	borderRadius: '6px',
	overflow: 'hidden',
	width: '100%',
	maxWidth: 330,
	height: 200,
	boxShadow: 'none',
	backgroundColor: 'transparent',
	transition: 'transform 0.2s ease',
	cursor: 'pointer',
	'&:hover': {
		transform: 'translateY(-4px)',
		boxShadow: theme.shadows[4],
	},
	[theme.breakpoints.down('sm')]: {
		width: 170,
		height: 160,
	},
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
	height: 140,
	[theme.breakpoints.down('sm')]: {
		height: 100,
	},
}));

const TextContent = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: '12px 0',
	[theme.breakpoints.down('sm')]: {
		padding: '5px 0',
		width: 150,
	},
}));

const SavedCardDish = ({ id, img, title, time }) => {
	return (
		<StyledCard>
			<StyledCardMedia component='img' image={img} alt='dish picture' />
			<CardContent sx={{ p: 0, flexGrow: 1, boxShadow: 'none' }}>
				<TextContent>
					<Box>
						<Typography
							variant='body1'
							component='h3'
							sx={{
								color: '#6b6967',
								fontFamily: '"DM Sans", sans-serif',
								fontSize: 13,
								fontWeight: 500,
								textAlign: 'left',
								mb: 0.5,
								width: { xs: 150, sm: 260 },
								whiteSpace: 'nowrap',
								overflow: 'hidden',
								textOverflow: 'ellipsis',
							}}
						>
							{title}
						</Typography>
						<Typography
							variant='body2'
							sx={{
								color: '#b5b2ae',
								fontFamily: '"DM Sans", sans-serif',
								fontWeight: 500,
								fontSize: 11,
								textAlign: 'left',
								width: { xs: 100, sm: 200 },
							}}
						>
							{time} minutes
						</Typography>
					</Box>
					<Box sx={{ height: 24, width: 24 }}>
						<SavedIcon recipeId={id} />
					</Box>
				</TextContent>
			</CardContent>
		</StyledCard>
	);
};

export default SavedCardDish;
