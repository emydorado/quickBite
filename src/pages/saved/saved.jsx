import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../services/firebaseConfig';
import { fetchRecipes } from '../../services/firebaseUtils';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Box, Container, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import SavedCardDish from '../../components/savedCardDish/savedCardDish';
import NavMenu from '../../components/navMenu/navMenu';
import Loader from '../../components/loader/Loader';

function Saved() {
	const [savedRecipeIds, setSavedRecipeIds] = useState([]);
	const [recipes, setRecipes] = useState([]);
	const [loading, setLoading] = useState(true);
	const uid = useSelector((state) => state.auth.uid);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	useEffect(() => {
		const loadRecipes = async () => {
			const recipes = await fetchRecipes();
			setRecipes(recipes);
		};
		loadRecipes();
	}, []);

	useEffect(() => {
		if (!uid) return;

		const fetchSavedRecipes = async () => {
			const q = query(collection(db, 'savedRecipes'), where('uid', '==', uid));
			const querySnapshot = await getDocs(q);
			const ids = querySnapshot.docs.map((doc) => doc.data().recipeId);
			setSavedRecipeIds(ids);
			setLoading(false);
		};
		fetchSavedRecipes();
	}, [uid]);

	const savedRecipes = recipes.filter((recipe) => savedRecipeIds.includes(recipe.id));

	if (loading) {
		return <Loader />;
	}

	return (
		<>
			<NavMenu />
			<Container
				maxWidth='lg'
				sx={{
					mt: 4,
					mb: 4,
					pt: {
						xs: 0,
						sm: 0,
						md: '80px',
					},
				}}
			>
				<Typography
					variant='h1'
					component='h1'
					gutterBottom
					sx={{
						fontWeight: 600,
						mb: 4,
						pl: isMobile ? 2 : 0,
					}}
				>
					Saved recipes
				</Typography>

				<Grid
					container
					spacing={{ xs: 2, md: 1 }}
					sx={{
						display: 'grid',
						gridTemplateColumns: {
							xs: 'repeat(2, 1fr)',
							sm: 'repeat(2, 1fr)',
							md: 'repeat(3, 1fr)',
							lg: 'repeat(3, 1fr)',
						},
						justifyItems: 'center',
					}}
				>
					{savedRecipes.map((recipe) => (
						<Grid
							item
							xs={6}
							key={recipe.id}
							sx={{
								display: 'flex',
								justifyContent: 'center',
							}}
						>
							<SavedCardDish
								id={recipe.id}
								img={recipe.img}
								title={recipe.recipe_name}
								time={recipe.prep_time_minutes}
							/>
						</Grid>
					))}
				</Grid>

				{savedRecipes.length === 0 && (
					<Box sx={{ textAlign: 'center', mt: 4 }}>
						<Typography variant='body1'>You don't have any saved recipes yet.</Typography>
					</Box>
				)}
			</Container>
		</>
	);
}

export default Saved;
