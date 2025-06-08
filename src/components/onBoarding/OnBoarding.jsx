import { useEffect } from 'react';
import { getDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { driver as Driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import './OnBoarding.css';

const TUTORIAL_STEPS = {
	search: [
		{
			element: '#input-search-ingredient',
			popover: {
				title: 'Search your ingredients',
				description: 'Look at your fridge and tell us what you see',
				position: 'bottom',
			},
		},
		{
			element: '#ingredients-container-search',
			popover: {
				title: 'Add it to your search',
				description: 'Now select the ingredient you want',
				position: 'right',
			},
		},
		{
			element: '#categories-container-search',
			popover: {
				title: 'What do you feel like eating right now?',
				description: 'Select the category that you want to cook',
				position: 'right',
			},
		},
	],
	recipe: [
		{
			element: '#servings',
			popover: {
				title: 'Ready to start?',
				description: 'How big is your party? Add the number here so you can have exact measurements',
				position: 'left',
			},
		},
		{
			element: '.recipe-checkbutton',
			popover: {
				title: 'Are you finished?',
				description: 'Dont forget to check this recipe from your list so you can repeat it later',
				position: 'top',
			},
		},
		{
			element: '.save-recipe-button',
			popover: {
				title: 'Or save it for later!',
				description: 'Maybe you dont feel like cooking today, but this recipe looks delicious!',
				position: 'bottom',
			},
		},
	],
};

function waitForElement(selector, timeout = 5000) {
	return new Promise((resolve, reject) => {
		const interval = 100;
		let elapsed = 0;

		const check = () => {
			const el = document.querySelector(selector);
			if (el) return resolve(el);
			elapsed += interval;
			if (elapsed >= timeout) return reject('Elemento no encontrado: ' + selector);
			setTimeout(check, interval);
		};

		check();
	});
}

async function checkTutorialStatus(userId, tutorialType) {
	const userRef = doc(db, 'users', userId);
	const docSnap = await getDoc(userRef);

	if (docSnap.exists()) {
		const data = docSnap.data();
		return data[`hasSeen${tutorialType}Tutorial`] || false;
	}
	return false;
}

async function markTutorialAsSeen(userId, tutorialType) {
	const userRef = doc(db, 'users', userId);
	await setDoc(
		userRef,
		{
			[`hasSeen${tutorialType}Tutorial`]: true,
		},
		{ merge: true }
	);
}

function OnBoarding({ tutorialType }) {
	useEffect(() => {
		const auth = getAuth();

		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (!user || !TUTORIAL_STEPS[tutorialType]) {
				console.log('Usuario no autenticado o pasos no cargados');
				return;
			}

			const driver = new Driver({
				animate: true,
				opacity: 0.75,
				allowClose: true,
				doneBtnText: 'Done',
				nextBtnText: 'Next',
				prevBtnText: 'Previous',
				className: 'driverjs-tour', // Clase contenedora principal
				popoverClass: 'driverjs-popover-custom', // Contenedor del popover
				overlayClass: 'driverjs-overlay-custom', // Capa de overlay
				stageClass: 'driverjs-stage-custom', // Elemento resaltado
				arrowClass: 'driverjs-arrow-custom', // Flecha del popover
				titleClass: 'driverjs-title-custom', // Título
				descriptionClass: 'driverjs-description-custom', // Descripción
				footerClass: 'driverjs-footer-custom', // Pie de popover
				nextBtnClass: 'driverjs-next-btn-custom', // Botón siguiente
				prevBtnClass: 'driverjs-prev-btn-custom', // Botón anterior
				closeBtnClass: 'driverjs-close-btn-custom', // Botón cerrar
				progressClass: 'driverjs-progress-custom', // Barra de progreso

				stageBackground: 'transparent', // Fondo del elemento resaltado
				showProgress: true,

				onHighlightStarted: (element) => {
					element.classList.add('driverjs-element-highlighted');
					element.style.zIndex = '2147483645';
					element.style.position = 'relative';
				},

				onReset: (element) => {
					if (element) {
						element.classList.remove('driverjs-element-highlighted');
						element.style.zIndex = '';
						element.style.position = '';
					}
				},
			});

			try {
				const hasSeenTutorial = await checkTutorialStatus(user.uid, tutorialType);

				if (!hasSeenTutorial) {
					setTimeout(async () => {
						await Promise.all(TUTORIAL_STEPS[tutorialType].map((step) => waitForElement(step.element)));

						driver.setSteps(TUTORIAL_STEPS[tutorialType]);
						driver.drive();
						await markTutorialAsSeen(user.uid, tutorialType);
					}, 1000);
				}
			} catch (error) {
				console.error('Error checking tutorial status:', error);
			}
		});

		return () => unsubscribe();
	}, [tutorialType]);

	return null;
}

export default OnBoarding;
