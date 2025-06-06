import { useEffect, useState, useRef } from 'react';
import NavMenu from '../../components/navMenu/navMenu';
import { Suspense, lazy } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {
	Box,
	Container,
	TextField,
	Typography,
	Grid,
	IconButton,
	useMediaQuery,
	useTheme,
	CircularProgress,
} from '@mui/material';
const BigCardDish = lazy(() => import('../../components/bigCardDish/bigCardDish'));
const CategorieButton = lazy(() => import('../../components/categorieButton/categorieButton'));
const IngredientButton = lazy(() => import('../../components/ingredientButton/ingredientButton'));
import { fetchIngredients, fetchCategories, fetchRecipes, fetchRecipesByCategory } from '../../services/firebaseUtils';

function Search() {
	const [searchIngredient, setSearchIngredient] = useState('');
	const [ingredients, setIngredients] = useState([]);
	const [categories, setCategories] = useState([]);
	const [recipes, setRecipes] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [selectedIngredients, setSelectedIngredients] = useState([]);
	const [loading, setLoading] = useState(true);

	const ingredientContainerRef = useRef(null);
	const theme = useTheme();
	const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
	useEffect(() => {
		const loadInitialData = async () => {
			try {
				const [ingredientsData, categoriesData, recipesData] = await Promise.all([
					fetchIngredients(),
					fetchCategories(),
					fetchRecipes(),
				]);
				setIngredients(ingredientsData);
				setCategories(categoriesData);
				setRecipes(recipesData);
			} catch (error) {
				console.error('Error loading data:', error);
			} finally {
				setLoading(false);
			}
		};
		loadInitialData();
	}, []);

	const handleSearchChange = (event) => {
		setSearchIngredient(event.target.value);
	};

	const handleCategoryClick = async (category) => {
		setLoading(true);
		try {
			if (category === selectedCategory) {
				setSelectedCategory(null);
				const allRecipes = await fetchRecipes();
				setRecipes(allRecipes);
			} else {
				setSelectedCategory(category);
				const filteredByCategory = await fetchRecipesByCategory(category);
				setRecipes(filteredByCategory);
			}
		} catch (error) {
			console.error('Error filtering recipes:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleIngredientToggle = (ingredient) => {
		setSelectedIngredients((prev) =>
			prev.some((i) => i.id === ingredient.id) ? prev.filter((i) => i.id !== ingredient.id) : [ingredient, ...prev]
		);
	};

	const scrollLeft = () => {
		ingredientContainerRef.current?.scrollBy({ left: -200, behavior: 'smooth' });
	};

	const scrollRight = () => {
		ingredientContainerRef.current?.scrollBy({ left: 200, behavior: 'smooth' });
	};

	const filteredIngredients = [
		...selectedIngredients,
		...ingredients.filter(
			(ingredient) =>
				!selectedIngredients.some((i) => i.id === ingredient.id) &&
				ingredient.name?.toLowerCase().includes(searchIngredient.toLowerCase())
		),
	];

	const filteredRecipes = recipes.filter(
		(recipe) =>
			selectedIngredients.length === 0 ||
			selectedIngredients.every((selectedIng) =>
				recipe.ingredients?.some((ing) => ing.name.toLowerCase() === selectedIng.name.toLowerCase())
			)
	);

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
				<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					<Typography
						variant='h1'
						component='h1'
						gutterBottom
						sx={{
							fontWeight: 600,
							mb: 3,
							textAlign: 'center',
							color: theme.palette.text.primary,
						}}
					>
						Search for recipes
					</Typography>

					<TextField
						fullWidth
						variant='outlined'
						placeholder="What's in your fridge?..."
						value={searchIngredient}
						onChange={handleSearchChange}
						sx={{
							maxWidth: 800,
							mb: 3,
							'& .MuiOutlinedInput-root': {
								borderRadius: '50px',
								backgroundColor: theme.palette.background.paper,
								'& fieldset': {
									borderColor: theme.palette.grey[400],
								},
								'&:hover fieldset': {
									borderColor: theme.palette.grey[600],
								},
								'&.Mui-focused fieldset': {
									borderColor: theme.palette.primary.main,
								},
							},
						}}
						InputProps={{
							style: {
								height: isSmallScreen ? '48px' : '56px',
								fontSize: isSmallScreen ? '0.9rem' : '1rem',
							},
						}}
					/>

					<Box
						sx={{
							position: 'relative',
							width: '100%',
							maxWidth: 800,
							mb: 3,
						}}
					>
						<IconButton
							onClick={scrollLeft}
							sx={{
								position: 'absolute',
								left: -20,
								top: '50%',
								transform: 'translateY(-50%)',
								zIndex: 2,
								backgroundColor: theme.palette.background.paper,
								boxShadow: 2,
								'&:hover': {
									backgroundColor: theme.palette.grey[100],
								},
								display: isSmallScreen ? 'none' : 'flex',
							}}
						>
							<ArrowBackIosNewIcon fontSize='small' />
						</IconButton>

						<Box
							ref={ingredientContainerRef}
							sx={{
								display: 'flex',
								gap: 1,
								overflowX: 'auto',
								scrollBehavior: 'smooth',
								scrollbarWidth: 'none',
								'&::-webkit-scrollbar': {
									display: 'none',
								},
								px: isSmallScreen ? 0 : 4,
								py: 1,
							}}
						>
							{filteredIngredients.map((ingredient) => (
								<IngredientButton
									key={ingredient.id}
									name={ingredient.name}
									emoji={ingredient.emoji}
									isSelected={selectedIngredients.some((i) => i.id === ingredient.id)}
									onToggle={() => handleIngredientToggle(ingredient)}
								/>
							))}
						</Box>

						<IconButton
							onClick={scrollRight}
							sx={{
								position: 'absolute',
								right: -20,
								top: '50%',
								transform: 'translateY(-50%)',
								zIndex: 2,
								backgroundColor: theme.palette.background.paper,
								boxShadow: 2,
								'&:hover': {
									backgroundColor: theme.palette.grey[100],
								},
								display: isSmallScreen ? 'none' : 'flex',
							}}
						>
							<ArrowForwardIosIcon fontSize='small' />
						</IconButton>
					</Box>

					<Box
						sx={{
							width: '100%',
							maxWidth: 800,
							overflowX: 'auto',
							whiteSpace: 'nowrap',
							scrollbarWidth: 'none',
							'&::-webkit-scrollbar': {
								display: 'none',
							},
							py: 1,
							mb: 4,
						}}
					>
						<Box sx={{ display: 'flex', gap: 2 }}>
							{categories.map((category) => (
								<CategorieButton
									key={category.id}
									emoji={category.emoji}
									categorie={category.name}
									onClick={handleCategoryClick}
									isActive={selectedCategory === category.name}
								/>
							))}
						</Box>
					</Box>
				</Box>

				{loading ? (
					<Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
						<CircularProgress size={60} />
					</Box>
				) : (
					<Suspense
						fallback={
							<Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
								<CircularProgress size={60} />
							</Box>
						}
					>
						<Grid
							container
							spacing={3}
							sx={{
								display: 'grid',
								gridTemplateColumns: {
									xs: 'repeat(1, 1fr)',
									sm: 'repeat(2, 1fr)',
									md: 'repeat(2, 1fr)',
									lg: 'repeat(3, 1fr)',
								},
								gap: 3,
								justifyItems: 'center',
							}}
						>
							{filteredRecipes.map((recipe) => (
								<Grid key={recipe.id}>
									<BigCardDish
										id={recipe.id}
										img={recipe.img}
										title={recipe.recipe_name}
										time={recipe.prep_time_minutes}
									/>
								</Grid>
							))}
						</Grid>
					</Suspense>
				)}
			</Container>
		</>
	);
}

export default Search;
