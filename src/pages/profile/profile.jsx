import ChecklistCardDish from '../../components/checklistCardDish/checklistCardDish';
import { recipes } from '../../data/recipes';

function Profile() {
	return (
		<>
			<h1>profile</h1>
			{recipes[4] && (
				<ChecklistCardDish
					key={recipes[4].id}
					img={recipes[4].img}
					title={recipes[4].recipe_name}
					time={recipes[4].id}
				/>
			)}{' '}
		</>
	);
}

export default Profile;
