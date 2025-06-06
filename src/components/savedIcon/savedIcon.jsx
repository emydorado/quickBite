import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { checkIfRecipeSaved, saveRecipe, removeSavedRecipe } from '../../services/firebaseUtils';

const SavedIcon = ({ recipeId, iconSize = '24px' }) => {
	const [isSaved, setIsSaved] = useState(false);
	const uid = useSelector((state) => state.auth.uid);

	useEffect(() => {
		if (!uid) return;

		const checkSaved = async () => {
			const saved = await checkIfRecipeSaved(uid, recipeId);
			setIsSaved(saved);
		};
		checkSaved();
	}, [recipeId, uid]);

	const handleClick = async () => {
		if (!uid) {
			console.warn('Usuario no autenticado, no se puede guardar la receta');
			return;
		}

		if (isSaved) {
			await removeSavedRecipe(uid, recipeId);
			setIsSaved(false);
		} else {
			await saveRecipe(uid, recipeId);
			setIsSaved(true);
		}
	};

	return (
		<IconButton onClick={handleClick} sx={{ color: '#6b6967', padding: 0 }}>
			{isSaved ? <BookmarkIcon sx={{ fontSize: iconSize }} /> : <BookmarkBorderIcon sx={{ fontSize: iconSize }} />}
		</IconButton>
	);
};

export default SavedIcon;
