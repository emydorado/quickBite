import { Card, CardMedia, CardContent, Box, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SavedIcon from '../savedIcon/savedIcon';
import './smallCardDish.css';

const SmallCardDish = ({ id, img, title, time }) => {
	const navigate = useNavigate();

	const handleCardClick = () => {
		navigate(`/recipe/${id}`);
	};

	const handleSaveClick = (e) => {
		e.stopPropagation();
	};

	return (
		<Card
			className='small-card'
			onClick={handleCardClick}
			sx={{ borderRadius: 2, boxShadow: 'none', bgcolor: 'transparent' }}
		>
			<CardMedia component='img' image={img} alt='dish picture' className='small-card-image' />

			<CardContent sx={{ padding: '8px 0 8px 0' }}>
				<Box display='flex' justifyContent='space-between' alignItems='center'>
					<Box onClick={() => navigate(`/recipe/${id}`)} sx={{ maxWidth: 'calc(100% - 40px)', overflow: 'hidden' }}>
						<Typography className='small-card-title'>{title}</Typography>
						<Typography className='small-card-time' sx={{ fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>
							{time} minutes
						</Typography>
					</Box>
					<Box onClick={handleSaveClick}>
						<SavedIcon recipeId={id} />
					</Box>
				</Box>
			</CardContent>
		</Card>
	);
};

export default SmallCardDish;
