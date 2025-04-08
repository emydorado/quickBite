import ChecklistCardDish from '../../components/checklistCardDish/checklistCardDish';
import { recipes } from '../../data/recipes';
import NavMenu from '../../components/navMenu/navMenu';

function Profile() {
	return (
		<>
			<NavMenu></NavMenu>
			<h1>profile</h1>
			{recipes[4] && (
				<ChecklistCardDish
					key={recipes[4].id}
					img={recipes[4].img}
					title={recipes[4].recipe_name}
					time={recipes[4].prep_time_minutes}
					description={recipes[4].description}
				/>
			)}{' '}
		</>
	);
}

export default Profile;
