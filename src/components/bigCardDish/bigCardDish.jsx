import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Box, IconButton } from '@mui/material';
import SavedIcon from '../savedIcon/savedIcon';

const BigCardDish = ({ img, title, time, id }) => {
	const navigate = useNavigate();
	const handleNavigate = () => navigate(`/recipe/${id}`);

	return (
		<Card
			sx={{
				display: 'flex',
				flexDirection: 'column',
				borderRadius: 1.5,
				width: 'clamp(290px, 90vw, 410px)',
				overflow: 'hidden',
				cursor: 'pointer',
				scrollSnapAlign: 'start',
				transition: 'transform 0.2s ease',
				boxShadow: 'none',
			}}
			role='button'
			tabIndex={0}
			onClick={handleNavigate}
			onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleNavigate()}
			aria-label={`Ver receta de ${title}`}
		>
			<CardMedia
				component='img'
				image={img}
				alt={`Imagen del platillo ${title}`}
				loading='lazy'
				sx={{
					width: '100%',
					height: 'clamp(120px, 40vw, 160px)',
					objectFit: 'cover',
					borderRadius: 1.5,
					'@media (max-width: 768px)': {
						height: 'auto',
						aspectRatio: '3 / 1',
					},
				}}
				onClick={(e) => {
					e.stopPropagation();
					handleNavigate();
				}}
			/>

			<CardContent
				sx={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '8px 0 8px 0',
				}}
			>
				<Box sx={{ display: 'flex', flexDirection: 'column', width: '70%' }}>
					<Typography
						sx={{
							fontFamily: 'DM Sans, sans-serif',
							fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
							color: '#6b6967',
							fontWeight: 500,
							textAlign: 'left',
							whiteSpace: 'nowrap',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
						}}
					>
						{title}
					</Typography>
					<Typography
						sx={{
							color: '#575757',
							fontFamily: 'DM Sans, sans-serif',
							fontWeight: 500,
							fontSize: 'clamp(0.875rem, 2vw, 1rem)',
							textAlign: 'left',
							mt: '2px',
						}}
					>
						{time} minutos
					</Typography>
				</Box>
				<SavedIcon recipeId={id} iconSize='30px' />
			</CardContent>
		</Card>
	);
};

BigCardDish.propTypes = {
	img: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	time: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default BigCardDish;
